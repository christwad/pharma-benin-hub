
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/hooks/use-cart';
import { ShoppingBag, Trash2, PlusCircle, MinusCircle, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart();
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const taxAmount = subtotal * 0.05; // 5% tax
  const total = subtotal + taxAmount;
  const [isProcessing, setIsProcessing] = useState(false);

  const handleQuantityChange = (item: any, newQuantity: number) => {
    if (newQuantity > 0) {
      updateQuantity(item, newQuantity);
    }
  };

  const handleRemoveItem = (item: any) => {
    removeFromCart(item);
    toast({
      title: "Produit retiré",
      description: `${item.name} a été retiré du panier.`,
    });
  };

  const handleClearCart = () => {
    clearCart();
    toast({
      title: "Panier vidé",
      description: "Tous les produits ont été retirés du panier.",
    });
  };

  const handleCheckout = () => {
    if (!user) {
      toast({
        title: "Connexion requise",
        description: "Veuillez vous connecter pour continuer.",
        variant: "destructive",
      });
      navigate('/login');
      return;
    }

    if (cartItems.length === 0) {
      toast({
        title: "Panier vide",
        description: "Ajoutez des produits à votre panier avant de continuer.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    
    // Simuler un chargement
    setTimeout(() => {
      setIsProcessing(false);
      
      // Rediriger vers la page de livraison
      navigate('/delivery');
    }, 1000);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Votre Panier</h1>
        
        {cartItems.length === 0 ? (
          <div className="text-center py-16 bg-gray-50 rounded-lg">
            <ShoppingBag className="h-16 w-16 mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-medium text-gray-800 mb-2">Votre panier est vide</h3>
            <p className="text-gray-600 mb-6">
              Ajoutez des médicaments à votre panier pour passer commande.
            </p>
            <Button 
              onClick={() => navigate('/medicines')} 
              className="bg-benin-green hover:bg-benin-green/90"
            >
              Parcourir les médicaments
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow">
                <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                  <h2 className="text-xl font-semibold">Articles ({cartItems.length})</h2>
                  <Button variant="ghost" onClick={handleClearCart} className="text-red-500 hover:text-red-700">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Vider le panier
                  </Button>
                </div>
                
                <div className="divide-y divide-gray-200">
                  {cartItems.map((item) => (
                    <div key={item.id} className="p-4 flex flex-col sm:flex-row gap-4">
                      <div className="w-24 h-24 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                        {item.image && (
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                      <div className="flex-grow">
                        <div className="flex justify-between">
                          <h3 className="font-medium text-lg">{item.name}</h3>
                          <p className="font-bold text-benin-green">{item.price.toLocaleString()} FCFA</p>
                        </div>
                        <p className="text-gray-500 text-sm">{item.brand}</p>
                        <p className="text-xs text-gray-400 mt-1">Fourni par: {item.pharmacy}</p>
                        
                        <div className="mt-4 flex justify-between items-center">
                          <div className="flex items-center">
                            <Button
                              variant="outline"
                              size="icon"
                              className="rounded-full h-8 w-8"
                              onClick={() => handleQuantityChange(item, item.quantity - 1)}
                            >
                              <MinusCircle className="h-4 w-4" />
                            </Button>
                            <span className="mx-3 min-w-8 text-center font-medium">
                              {item.quantity}
                            </span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="rounded-full h-8 w-8"
                              onClick={() => handleQuantityChange(item, item.quantity + 1)}
                            >
                              <PlusCircle className="h-4 w-4" />
                            </Button>
                          </div>
                          
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-500 hover:bg-red-50 hover:text-red-700"
                            onClick={() => handleRemoveItem(item)}
                          >
                            <Trash2 className="h-4 w-4 mr-1" /> Supprimer
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Résumé de la commande</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span>Sous-total</span>
                    <span>{subtotal.toLocaleString()} FCFA</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>TVA (5%)</span>
                    <span>{taxAmount.toLocaleString()} FCFA</span>
                  </div>
                  <div className="border-t border-gray-200 pt-4 flex justify-between font-medium">
                    <span>Total</span>
                    <span className="text-xl text-benin-green">{total.toLocaleString()} FCFA</span>
                  </div>
                  
                  <Button 
                    className="w-full mt-6 bg-benin-green hover:bg-benin-green/90 flex items-center justify-center"
                    disabled={isProcessing || cartItems.length === 0}
                    onClick={handleCheckout}
                  >
                    {isProcessing ? (
                      "Traitement en cours..."
                    ) : (
                      <>
                        Passer à la livraison
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                  
                  <p className="text-xs text-gray-500 text-center mt-2">
                    Frais de livraison calculés à l'étape suivante
                  </p>
                </CardContent>
              </Card>
              
              <div className="mt-6 bg-gray-50 rounded-lg p-4">
                <h3 className="font-medium mb-2">Besoin d'aide ?</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Notre service client est disponible de 8h à 20h, 7j/7
                </p>
                <Button variant="outline" className="w-full" onClick={() => navigate('/contact')}>
                  Contacter le support
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CartPage;
