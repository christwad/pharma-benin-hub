
import { useState, useEffect } from 'react';
import { Tables } from '@/types/supabase';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import api from '@/services/api';

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
        const { data } = await api.get('/orders');
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
        const { data: orderData } = await api.get(`/orders/${orderId}`);
        setOrder(orderData);

        // Récupérer les articles de la commande
        const { data: itemsData } = await api.get(`/orders/${orderId}/items`);
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
      const orderData = {
        items: cartItems,
        delivery_method: deliveryMethod,
        delivery_address: deliveryAddress,
        payment_method: paymentMethod,
        notes: notes || null,
      };

      const { data } = await api.post('/orders', orderData);

      toast({
        title: 'Commande passée avec succès',
        description: 'Votre commande a été enregistrée et est en cours de traitement.',
      });

      return { success: true, orderId: data.id };
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
