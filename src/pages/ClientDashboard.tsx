
import React, { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { 
  ShoppingBag, 
  User, 
  Home, 
  Package, 
  Pill,
  Clock,
  CheckCircle2,
  AlertCircle,
  UserCog
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

const ClientDashboard = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profil");
  
  // Client data state
  const [clientData, setClientData] = useState({
    name: "Jean Dupont",
    email: localStorage.getItem("userEmail") || "client@example.com",
    status: "Approuvé", // ou "En attente"
    phone: "+229 97 12 34 56",
    address: "123 Rue des Palmiers, Cotonou",
    joinDate: "15 Mars 2025"
  });

  // Mock orders
  const [orders, setOrders] = useState([
    {
      id: "CMD-2025-001",
      date: "10 Avril 2025",
      total: "15000 FCFA",
      status: "Livré",
      items: [
        { name: "Paracétamol 500mg", quantity: 2, price: "2500 FCFA" },
        { name: "Vitamine C", quantity: 1, price: "5000 FCFA" },
        { name: "Bandages", quantity: 3, price: "2500 FCFA" }
      ]
    },
    {
      id: "CMD-2025-002",
      date: "5 Avril 2025",
      total: "8500 FCFA",
      status: "En cours de livraison",
      items: [
        { name: "Antibiotique", quantity: 1, price: "6000 FCFA" },
        { name: "Sirop contre la toux", quantity: 1, price: "2500 FCFA" }
      ]
    }
  ]);

  // Check if user is logged in
  useEffect(() => {
    const userType = localStorage.getItem("userType");
    if (!userType || userType !== "client") {
      toast({
        title: "Accès refusé",
        description: "Vous devez être connecté en tant que client pour accéder à cette page.",
        variant: "destructive"
      });
      navigate("/login");
    }
  }, [navigate, toast]);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("userType");
    localStorage.removeItem("userEmail");
    toast({
      title: "Déconnexion réussie",
      description: "Vous avez été déconnecté avec succès."
    });
    navigate("/");
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-benin-green">Tableau de bord client</h1>
            <p className="text-gray-600">
              Bienvenue {clientData.name}, gérez vos commandes et votre profil
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button 
              variant="outline" 
              onClick={handleLogout} 
              className="border-benin-green text-benin-green hover:bg-benin-green hover:text-white"
            >
              Se déconnecter
            </Button>
          </div>
        </div>

        {clientData.status === "En attente" && (
          <Card className="mb-8 border-orange-300 bg-orange-50">
            <CardContent className="flex items-center gap-3 p-4">
              <AlertCircle className="h-5 w-5 text-orange-500" />
              <div>
                <p className="font-medium text-orange-700">
                  Votre compte est en attente d'approbation par un administrateur.
                </p>
                <p className="text-sm text-orange-600">
                  Vous recevrez un email une fois que votre compte sera approuvé.
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
          {/* Sidebar */}
          <Card className="border-benin-green/20 md:col-span-1">
            <CardContent className="p-0">
              <div className="flex flex-col">
                <button
                  onClick={() => setActiveTab("profil")}
                  className={`flex items-center gap-3 p-4 text-left ${
                    activeTab === "profil" ? "bg-benin-green/10 text-benin-green" : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <User className="h-5 w-5" />
                  <span>Mon profil</span>
                </button>
                <button
                  onClick={() => setActiveTab("commandes")}
                  className={`flex items-center gap-3 p-4 text-left ${
                    activeTab === "commandes" ? "bg-benin-green/10 text-benin-green" : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <ShoppingBag className="h-5 w-5" />
                  <span>Mes commandes</span>
                </button>
                <button
                  onClick={() => setActiveTab("adresses")}
                  className={`flex items-center gap-3 p-4 text-left ${
                    activeTab === "adresses" ? "bg-benin-green/10 text-benin-green" : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <Home className="h-5 w-5" />
                  <span>Mes adresses</span>
                </button>
                <button
                  onClick={() => setActiveTab("parametres")}
                  className={`flex items-center gap-3 p-4 text-left ${
                    activeTab === "parametres" ? "bg-benin-green/10 text-benin-green" : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <UserCog className="h-5 w-5" />
                  <span>Paramètres</span>
                </button>
              </div>
            </CardContent>
          </Card>

          {/* Main Content */}
          <div className="md:col-span-3">
            {/* Profile */}
            {activeTab === "profil" && (
              <Card className="border-benin-green/20">
                <CardHeader>
                  <CardTitle>Informations personnelles</CardTitle>
                  <CardDescription>
                    Consultez et modifiez vos informations personnelles
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex flex-col md:flex-row md:justify-between">
                    <div className="mb-4 md:mb-0">
                      <h3 className="text-sm font-medium text-gray-500">Nom complet</h3>
                      <p className="text-lg font-medium">{clientData.name}</p>
                    </div>
                    <div className="mb-4 md:mb-0">
                      <h3 className="text-sm font-medium text-gray-500">Email</h3>
                      <p className="text-lg font-medium">{clientData.email}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Téléphone</h3>
                      <p className="text-lg font-medium">{clientData.phone}</p>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Adresse</h3>
                    <p className="text-lg font-medium">{clientData.address}</p>
                  </div>
                  <div className="flex flex-col md:flex-row md:justify-between">
                    <div className="mb-4 md:mb-0">
                      <h3 className="text-sm font-medium text-gray-500">Date d'inscription</h3>
                      <p className="text-lg font-medium">{clientData.joinDate}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Statut</h3>
                      <Badge className={clientData.status === "Approuvé" ? "bg-green-500" : "bg-orange-500"}>
                        {clientData.status}
                      </Badge>
                    </div>
                  </div>
                  <div className="pt-4">
                    <Button className="bg-benin-green hover:bg-benin-green/90">
                      Modifier mes informations
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Orders */}
            {activeTab === "commandes" && (
              <Card className="border-benin-green/20">
                <CardHeader>
                  <CardTitle>Mes commandes</CardTitle>
                  <CardDescription>
                    Consultez l'historique de vos commandes et leur statut
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {orders.length > 0 ? (
                    <div className="space-y-6">
                      {orders.map((order) => (
                        <Card key={order.id} className="border-gray-200">
                          <CardHeader className="bg-gray-50 pb-2 pt-3">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                              <div className="mb-2 md:mb-0">
                                <p className="text-sm font-medium text-gray-500">Commande</p>
                                <p className="font-bold">{order.id}</p>
                              </div>
                              <div className="mb-2 md:mb-0">
                                <p className="text-sm font-medium text-gray-500">Date</p>
                                <p>{order.date}</p>
                              </div>
                              <div className="mb-2 md:mb-0">
                                <p className="text-sm font-medium text-gray-500">Total</p>
                                <p className="font-bold text-benin-green">{order.total}</p>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-gray-500">Statut</p>
                                <Badge className={
                                  order.status === "Livré" 
                                    ? "bg-green-500" 
                                    : order.status === "En cours de livraison" 
                                    ? "bg-blue-500" 
                                    : "bg-orange-500"
                                }>
                                  {order.status === "Livré" && <CheckCircle2 className="mr-1 h-3 w-3" />}
                                  {order.status === "En cours de livraison" && <Clock className="mr-1 h-3 w-3" />}
                                  {order.status}
                                </Badge>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent className="pt-4">
                            <h4 className="mb-2 font-medium">Produits</h4>
                            <div className="space-y-2">
                              {order.items.map((item, idx) => (
                                <div key={idx} className="flex items-center justify-between rounded-lg bg-gray-50 p-2">
                                  <div className="flex items-center gap-2">
                                    <Pill className="h-4 w-4 text-benin-green" />
                                    <span>{item.name}</span>
                                    <span className="text-sm text-gray-500">x{item.quantity}</span>
                                  </div>
                                  <span className="font-medium">{item.price}</span>
                                </div>
                              ))}
                            </div>
                            <div className="mt-4 flex justify-end">
                              <Button variant="outline" className="border-benin-green text-benin-green hover:bg-benin-green hover:text-white">
                                Détails de la commande
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-8">
                      <Package className="mb-2 h-12 w-12 text-gray-400" />
                      <h3 className="text-xl font-medium">Aucune commande</h3>
                      <p className="text-gray-500">Vous n'avez pas encore passé de commande</p>
                      <Button 
                        onClick={() => navigate('/medicines')}
                        className="mt-4 bg-benin-green hover:bg-benin-green/90"
                      >
                        Découvrir les médicaments
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Addresses */}
            {activeTab === "adresses" && (
              <Card className="border-benin-green/20">
                <CardHeader>
                  <CardTitle>Mes adresses</CardTitle>
                  <CardDescription>
                    Gérez vos adresses de livraison et de facturation
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 md:grid-cols-2">
                    <Card className="border-gray-200">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between">
                          <CardTitle className="text-lg">Adresse principale</CardTitle>
                          <Badge>Par défaut</Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="font-medium">{clientData.name}</p>
                        <p className="text-gray-700">{clientData.address}</p>
                        <p className="text-gray-700">{clientData.phone}</p>
                        <div className="mt-4 flex gap-2">
                          <Button variant="outline" size="sm" className="border-benin-green text-benin-green hover:bg-benin-green hover:text-white">
                            Modifier
                          </Button>
                          <Button variant="outline" size="sm" className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white">
                            Supprimer
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="border-dashed border-gray-300 bg-gray-50">
                      <CardContent className="flex h-full flex-col items-center justify-center py-8">
                        <Home className="mb-2 h-8 w-8 text-gray-400" />
                        <p className="text-center text-gray-500">Ajouter une nouvelle adresse</p>
                        <Button className="mt-4 bg-benin-green hover:bg-benin-green/90">
                          Ajouter
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Settings */}
            {activeTab === "parametres" && (
              <Card className="border-benin-green/20">
                <CardHeader>
                  <CardTitle>Paramètres du compte</CardTitle>
                  <CardDescription>
                    Gérez les paramètres de votre compte
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="mb-2 font-medium">Mot de passe</h3>
                    <p className="mb-4 text-sm text-gray-500">
                      Mettez à jour votre mot de passe pour sécuriser votre compte
                    </p>
                    <Button variant="outline" className="border-benin-green text-benin-green hover:bg-benin-green hover:text-white">
                      Changer de mot de passe
                    </Button>
                  </div>
                  <div>
                    <h3 className="mb-2 font-medium">Notifications</h3>
                    <p className="mb-4 text-sm text-gray-500">
                      Choisissez les notifications que vous souhaitez recevoir
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <input 
                          type="checkbox" 
                          id="notif-orders" 
                          checked 
                          className="h-4 w-4 rounded border-gray-300 text-benin-green focus:ring-benin-green" 
                        />
                        <label htmlFor="notif-orders">Mises à jour des commandes</label>
                      </div>
                      <div className="flex items-center gap-2">
                        <input 
                          type="checkbox" 
                          id="notif-promos" 
                          checked 
                          className="h-4 w-4 rounded border-gray-300 text-benin-green focus:ring-benin-green" 
                        />
                        <label htmlFor="notif-promos">Promotions et offres spéciales</label>
                      </div>
                      <div className="flex items-center gap-2">
                        <input 
                          type="checkbox" 
                          id="notif-news" 
                          className="h-4 w-4 rounded border-gray-300 text-benin-green focus:ring-benin-green" 
                        />
                        <label htmlFor="notif-news">Actualités et nouveautés</label>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="mb-2 text-lg font-medium text-red-500">Danger</h3>
                    <p className="mb-4 text-sm text-gray-500">
                      Une fois supprimé, votre compte sera définitivement perdu
                    </p>
                    <Button variant="outline" className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white">
                      Supprimer mon compte
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ClientDashboard;
