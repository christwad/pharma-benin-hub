
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Tables } from '@/types/supabase';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';

export const useOrders = () => {
  const [orders, setOrders] = useState<Tables<'orders'>[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return;
      
      setLoading(true);
      setError(null);

      try {
        const { data, error } = await supabase
          .from('orders')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (error) {
          throw error;
        }

        setOrders(data || []);
      } catch (err: any) {
        console.error('Erreur lors du chargement des commandes:', err);
        setError(err.message);
        toast({
          title: 'Erreur',
          description: 'Impossible de charger vos commandes. Veuillez réessayer.',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchOrders();
    } else {
      setOrders([]);
      setLoading(false);
    }
  }, [user, toast]);

  return { orders, loading, error };
};

export const useOrderDetails = (orderId: string) => {
  const [order, setOrder] = useState<Tables<'orders'> | null>(null);
  const [orderItems, setOrderItems] = useState<Tables<'order_items'>[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (!user || !orderId) return;
      
      setLoading(true);
      setError(null);

      try {
        // Récupérer les informations de la commande
        const { data: orderData, error: orderError } = await supabase
          .from('orders')
          .select('*')
          .eq('id', orderId)
          .single();

        if (orderError) {
          throw orderError;
        }

        // Vérifier que la commande appartient bien à l'utilisateur
        if (orderData.user_id !== user.id) {
          throw new Error('Vous n\'êtes pas autorisé à accéder à cette commande');
        }

        setOrder(orderData);

        // Récupérer les articles de la commande
        const { data: itemsData, error: itemsError } = await supabase
          .from('order_items')
          .select('*, medicines(*), pharmacies(*)')
          .eq('order_id', orderId);

        if (itemsError) {
          throw itemsError;
        }

        setOrderItems(itemsData || []);
      } catch (err: any) {
        console.error('Erreur lors du chargement des détails de la commande:', err);
        setError(err.message);
        toast({
          title: 'Erreur',
          description: 'Impossible de charger les détails de la commande. Veuillez réessayer.',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    if (user && orderId) {
      fetchOrderDetails();
    }
  }, [user, orderId, toast]);

  return { order, orderItems, loading, error };
};

export const useCreateOrder = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  const { toast } = useToast();

  const createOrder = async (
    cartItems: Array<{
      id: string;
      name: string;
      price: number;
      quantity: number;
      pharmacy_id: string;
    }>,
    deliveryMethod: 'delivery' | 'pickup',
    deliveryAddress: string | null,
    paymentMethod: 'cash' | 'mobile_money' | 'card',
    notes?: string
  ) => {
    if (!user) {
      toast({
        title: 'Erreur',
        description: 'Vous devez être connecté pour passer une commande',
        variant: 'destructive',
      });
      return { success: false, orderId: null };
    }

    setLoading(true);
    setError(null);

    try {
      // Calculer le montant total et les frais de livraison
      const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
      const deliveryFee = deliveryMethod === 'delivery' ? 1000 : 0; // 1000 FCFA pour la livraison, 0 pour le retrait
      const totalAmount = subtotal + deliveryFee;

      // Créer la commande
      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: user.id,
          status: 'pending',
          total_amount: totalAmount,
          payment_status: 'pending',
          payment_method: paymentMethod,
          delivery_method: deliveryMethod,
          delivery_address: deliveryAddress,
          delivery_fee: deliveryFee,
          notes: notes || null,
        })
        .select()
        .single();

      if (orderError) {
        throw orderError;
      }

      // Créer les articles de la commande
      const orderItems = cartItems.map(item => ({
        order_id: orderData.id,
        medicine_id: item.id,
        quantity: item.quantity,
        price: item.price,
        subtotal: item.price * item.quantity,
        pharmacy_id: item.pharmacy_id,
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) {
        throw itemsError;
      }

      toast({
        title: 'Commande passée avec succès',
        description: 'Votre commande a été enregistrée et est en cours de traitement.',
      });

      return { success: true, orderId: orderData.id };
    } catch (err: any) {
      console.error('Erreur lors de la création de la commande:', err);
      setError(err.message);
      toast({
        title: 'Erreur',
        description: 'Impossible de finaliser votre commande. Veuillez réessayer.',
        variant: 'destructive',
      });
      return { success: false, orderId: null };
    } finally {
      setLoading(false);
    }
  };

  return { createOrder, loading, error };
};
