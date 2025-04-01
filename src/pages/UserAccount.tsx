
import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  User, 
  Settings, 
  ShoppingBag, 
  MapPin, 
  Phone, 
  Mail, 
  Heart, 
  LogOut, 
  Edit2, 
  Save,
  Package,
  Pill,
  Store,
  ClipboardList,
  Users,
  BarChart3,
  Plus,
  Search
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useNavigate } from 'react-router-dom';

// Type d'utilisateur (à adapter selon les besoins)
type UserType = 'client' | 'pharmacy' | 'admin';

const UserAccount = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  
  // Chargement du type d'utilisateur depuis le localStorage
  const [userType, setUserType] = useState<UserType>(() => {
    const savedUserType = localStorage.getItem('userType');
    return (savedUserType as UserType) || 'client';
  });
  
  const [isEditing, setIsEditing] = useState(false);

  // Informations de l'utilisateur (à remplacer par les données réelles)
  const [userInfo, setUserInfo] = useState({
    name: 'Jean Dupont',
    email: 'jean.dupont@example.com',
    phone: '+229 97 12 34 56',
    address: '123 Rue du Commerce, Cotonou',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&h=200&auto=format&fit=crop',
  });

  // Commandes factices (à remplacer par les données réelles)
  const orders = [
    { id: 'CMD-001', date: '2023-10-15', items: 3, total: 12500, status: 'Livrée' },
    { id: 'CMD-002', date: '2023-11-02', items: 1, total: 3500, status: 'En cours' },
    { id: 'CMD-003', date: '2023-11-20', items: 5, total: 15800, status: 'En préparation' },
  ];
  
  // Médicaments factices pour pharmacie
  const medicines = [
    { id: 'MED-001', name: 'Paracétamol 500mg', category: 'Analgésiques', price: 1500, stock: 45 },
    { id: 'MED-002', name: 'Amoxicilline 250mg', category: 'Antibiotiques', price: 3500, stock: 28 },
    { id: 'MED-003', name: 'Ibuprofène 400mg', category: 'Anti-inflammatoires', price: 1800, stock: 0 },
  ];

  // Statistiques factices pour admin et pharmacie
  const stats = {
    totalUsers: 1245,
    totalPharmacies: 48,
    totalMedicines: 1528,
    totalOrders: 3456,
    totalRevenue: 15750000,
    monthlyRevenue: 2450000,
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
    toast({
      title: "Profil mis à jour!",
      description: "Vos informations ont été mises à jour avec succès.",
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUserInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleLogout = () => {
    toast({
      title: "Déconnexion réussie",
      description: "Vous êtes maintenant déconnecté.",
    });
    localStorage.removeItem('userType');
    navigate('/login');
  };

  const renderTabs = () => {
    switch (userType) {
      case 'client':
        return (
          <TabsList className="grid w-full grid-cols-3 lg:w-auto">
            <TabsTrigger value="profile" onClick={() => setActiveTab('profile')}>
              <User className="h-4 w-4 mr-2" />
              Profil
            </TabsTrigger>
            <TabsTrigger value="orders" onClick={() => setActiveTab('orders')}>
              <ShoppingBag className="h-4 w-4 mr-2" />
              Commandes
            </TabsTrigger>
            <TabsTrigger value="favorites" onClick={() => setActiveTab('favorites')}>
              <Heart className="h-4 w-4 mr-2" />
              Favoris
            </TabsTrigger>
          </TabsList>
        );
      
      case 'pharmacy':
        return (
          <TabsList className="grid w-full grid-cols-4 lg:w-auto">
            <TabsTrigger value="profile" onClick={() => setActiveTab('profile')}>
              <Store className="h-4 w-4 mr-2" />
              Pharmacie
            </TabsTrigger>
            <TabsTrigger value="medicines" onClick={() => setActiveTab('medicines')}>
              <Pill className="h-4 w-4 mr-2" />
              Médicaments
            </TabsTrigger>
            <TabsTrigger value="orders" onClick={() => setActiveTab('orders')}>
              <Package className="h-4 w-4 mr-2" />
              Commandes
            </TabsTrigger>
            <TabsTrigger value="stats" onClick={() => setActiveTab('stats')}>
              <BarChart3 className="h-4 w-4 mr-2" />
              Statistiques
            </TabsTrigger>
          </TabsList>
        );
      
      case 'admin':
        return (
          <TabsList className="grid w-full grid-cols-4 lg:w-auto">
            <TabsTrigger value="profile" onClick={() => setActiveTab('profile')}>
              <User className="h-4 w-4 mr-2" />
              Profil
            </TabsTrigger>
            <TabsTrigger value="users" onClick={() => setActiveTab('users')}>
              <Users className="h-4 w-4 mr-2" />
              Utilisateurs
            </TabsTrigger>
            <TabsTrigger value="pharmacies" onClick={() => setActiveTab('pharmacies')}>
              <Store className="h-4 w-4 mr-2" />
              Pharmacies
            </TabsTrigger>
            <TabsTrigger value="stats" onClick={() => setActiveTab('stats')}>
              <BarChart3 className="h-4 w-4 mr-2" />
              Statistiques
            </TabsTrigger>
          </TabsList>
        );
    }
  };

  const renderContent = () => {
    // Contenu commun à tous les utilisateurs
    if (activeTab === 'profile') {
      return (
        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="space-y-1">
                <CardTitle>Informations personnelles</CardTitle>
                <CardDescription>
                  {userType === 'client' && "Gérez vos informations personnelles et vos préférences"}
                  {userType === 'pharmacy' && "Gérez les informations de votre pharmacie"}
                  {userType === 'admin' && "Gérez votre compte administrateur"}
                </CardDescription>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Annuler
                  </>
                ) : (
                  <>
                    <Edit2 className="h-4 w-4 mr-2" />
                    Modifier
                  </>
                )}
              </Button>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="flex flex-col md:flex-row gap-4 items-start">
                  <div className="flex flex-col items-center gap-2">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src={userInfo.avatar} alt={userInfo.name} />
                      <AvatarFallback>
                        {userInfo.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    {isEditing && (
                      <Button variant="outline" size="sm">
                        Changer photo
                      </Button>
                    )}
                  </div>
                  
                  <div className="flex-1 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Nom complet</Label>
                        <Input 
                          id="name" 
                          name="name" 
                          value={userInfo.name} 
                          onChange={handleInputChange}
                          readOnly={!isEditing}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input 
                          id="email" 
                          name="email" 
                          type="email" 
                          value={userInfo.email} 
                          onChange={handleInputChange}
                          readOnly={!isEditing}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="phone">Téléphone</Label>
                        <Input 
                          id="phone" 
                          name="phone" 
                          value={userInfo.phone} 
                          onChange={handleInputChange}
                          readOnly={!isEditing}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="address">Adresse</Label>
                        <Input 
                          id="address" 
                          name="address" 
                          value={userInfo.address} 
                          onChange={handleInputChange}
                          readOnly={!isEditing}
                        />
                      </div>
                    </div>
                    
                    {isEditing && (
                      <div className="pt-4">
                        <Button type="submit" className="bg-benin-green hover:bg-benin-green/90">
                          <Save className="h-4 w-4 mr-2" />
                          Enregistrer les modifications
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Sécurité du compte</CardTitle>
              <CardDescription>Gérez la sécurité de votre compte</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button variant="outline">
                  Changer le mot de passe
                </Button>
                
                <Button variant="outline">
                  Activer la double authentification
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Préférences</CardTitle>
              <CardDescription>Gérez vos préférences de notification</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="marketing" className="flex items-center">
                    Recevoir des notifications par email
                  </Label>
                  <input type="checkbox" id="marketing" className="toggle" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="updates" className="flex items-center">
                    Recevoir des notifications par SMS
                  </Label>
                  <input type="checkbox" id="updates" className="toggle" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      );
    }
    
    // Contenu spécifique aux types d'utilisateurs
    if (userType === 'client') {
      if (activeTab === 'orders') {
        return (
          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>Historique des commandes</CardTitle>
                <CardDescription>Consultez vos commandes récentes</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>N° Commande</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Articles</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>{order.date}</TableCell>
                        <TableCell>{order.items}</TableCell>
                        <TableCell>{order.total} FCFA</TableCell>
                        <TableCell>
                          <Badge variant={
                            order.status === 'Livrée' ? 'success' : 
                            order.status === 'En cours' ? 'default' : 'secondary'
                          }>
                            {order.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" size="sm">
                            Détails
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        );
      }
      
      if (activeTab === 'favorites') {
        return (
          <TabsContent value="favorites">
            <Card>
              <CardHeader>
                <CardTitle>Pharmacies et produits favoris</CardTitle>
                <CardDescription>Gérez vos favoris pour un accès rapide</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-gray-500">
                  <Heart className="h-10 w-10 mx-auto mb-4 text-gray-300" />
                  <p>Vous n'avez pas encore ajouté de favoris.</p>
                  <Button variant="outline" className="mt-4">
                    Explorer les pharmacies
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        );
      }
    }
    
    if (userType === 'pharmacy') {
      if (activeTab === 'medicines') {
        return (
          <TabsContent value="medicines">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div>
                  <CardTitle>Gestion des médicaments</CardTitle>
                  <CardDescription>Gérez votre catalogue de médicaments</CardDescription>
                </div>
                <Button className="bg-benin-green hover:bg-benin-green/90">
                  <Plus className="h-4 w-4 mr-2" />
                  Ajouter un médicament
                </Button>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Nom</TableHead>
                      <TableHead>Catégorie</TableHead>
                      <TableHead>Prix</TableHead>
                      <TableHead>Stock</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {medicines.map((medicine) => (
                      <TableRow key={medicine.id}>
                        <TableCell className="font-medium">{medicine.id}</TableCell>
                        <TableCell>{medicine.name}</TableCell>
                        <TableCell>{medicine.category}</TableCell>
                        <TableCell>{medicine.price} FCFA</TableCell>
                        <TableCell>
                          <Badge variant={medicine.stock > 0 ? 'success' : 'destructive'}>
                            {medicine.stock > 0 ? `${medicine.stock} en stock` : 'Rupture'}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" size="sm">
                              <Edit2 className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm" className="text-red-500">
                              Supprimer
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="text-sm text-gray-500">
                  Affichage de 1 à {medicines.length} sur {medicines.length} médicaments
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" disabled>
                    Précédent
                  </Button>
                  <Button variant="outline" size="sm" disabled>
                    Suivant
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
        );
      }
      
      if (activeTab === 'stats') {
        return (
          <TabsContent value="stats">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">
                    Total des ventes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalRevenue.toLocaleString()} FCFA</div>
                  <p className="text-xs text-green-500 mt-1">+15% depuis le mois dernier</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">
                    Ventes mensuelles
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.monthlyRevenue.toLocaleString()} FCFA</div>
                  <p className="text-xs text-green-500 mt-1">+8% depuis le mois dernier</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">
                    Commandes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalOrders}</div>
                  <p className="text-xs text-green-500 mt-1">+12% depuis le mois dernier</p>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Performance mensuelle</CardTitle>
                <CardDescription>Visualisez vos ventes et commandes</CardDescription>
              </CardHeader>
              <CardContent className="h-80 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <BarChart3 className="h-10 w-10 mx-auto mb-4 text-gray-300" />
                  <p>Les graphiques seront disponibles prochainement.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        );
      }
    }
    
    if (userType === 'admin') {
      if (activeTab === 'users') {
        return (
          <TabsContent value="users">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div>
                  <CardTitle>Gestion des utilisateurs</CardTitle>
                  <CardDescription>Gérez les comptes des utilisateurs</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <Input placeholder="Rechercher un utilisateur..." className="pl-10 w-60" />
                  </div>
                  <Button className="bg-benin-green hover:bg-benin-green/90">
                    <Plus className="h-4 w-4 mr-2" />
                    Nouvel utilisateur
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Nom</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">USR-001</TableCell>
                      <TableCell>Jean Dupont</TableCell>
                      <TableCell>jean.dupont@example.com</TableCell>
                      <TableCell>Client</TableCell>
                      <TableCell><Badge>Actif</Badge></TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm">
                            <Edit2 className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-500">
                            Suspendre
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">USR-002</TableCell>
                      <TableCell>Marie Dubois</TableCell>
                      <TableCell>marie.dubois@example.com</TableCell>
                      <TableCell>Client</TableCell>
                      <TableCell><Badge>Actif</Badge></TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm">
                            <Edit2 className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-500">
                            Suspendre
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">USR-003</TableCell>
                      <TableCell>Pierre Martin</TableCell>
                      <TableCell>pierre.martin@example.com</TableCell>
                      <TableCell>Pharmacie</TableCell>
                      <TableCell><Badge variant="secondary">En attente</Badge></TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm">
                            <Edit2 className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" className="text-green-500">
                            Approuver
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="text-sm text-gray-500">
                  Affichage de 1 à 3 sur {stats.totalUsers} utilisateurs
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" disabled>
                    Précédent
                  </Button>
                  <Button variant="outline" size="sm">
                    Suivant
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
        );
      }
      
      if (activeTab === 'pharmacies') {
        return (
          <TabsContent value="pharmacies">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div>
                  <CardTitle>Gestion des pharmacies</CardTitle>
                  <CardDescription>Gérez les pharmacies enregistrées</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <Input placeholder="Rechercher une pharmacie..." className="pl-10 w-60" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Nom</TableHead>
                      <TableHead>Localisation</TableHead>
                      <TableHead>Propriétaire</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">PHR-001</TableCell>
                      <TableCell>Pharmacie Centrale</TableCell>
                      <TableCell>Cotonou</TableCell>
                      <TableCell>Dr. Koffi</TableCell>
                      <TableCell><Badge>Approuvée</Badge></TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm">
                            <Edit2 className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-500">
                            Suspendre
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">PHR-002</TableCell>
                      <TableCell>Pharmacie du Port</TableCell>
                      <TableCell>Cotonou</TableCell>
                      <TableCell>Dr. Mensah</TableCell>
                      <TableCell><Badge>Approuvée</Badge></TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm">
                            <Edit2 className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-500">
                            Suspendre
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">PHR-003</TableCell>
                      <TableCell>Pharmacie Moderne</TableCell>
                      <TableCell>Parakou</TableCell>
                      <TableCell>Dr. Akplogan</TableCell>
                      <TableCell><Badge variant="secondary">En attente</Badge></TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm">
                            <Edit2 className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" className="text-green-500">
                            Approuver
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="text-sm text-gray-500">
                  Affichage de 1 à 3 sur {stats.totalPharmacies} pharmacies
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" disabled>
                    Précédent
                  </Button>
                  <Button variant="outline" size="sm">
                    Suivant
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
        );
      }
      
      if (activeTab === 'stats') {
        return (
          <TabsContent value="stats">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">
                    Utilisateurs
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalUsers}</div>
                  <p className="text-xs text-green-500 mt-1">+24% depuis le mois dernier</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">
                    Pharmacies
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalPharmacies}</div>
                  <p className="text-xs text-green-500 mt-1">+5% depuis le mois dernier</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">
                    Médicaments
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalMedicines}</div>
                  <p className="text-xs text-green-500 mt-1">+18% depuis le mois dernier</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">
                    Chiffre d'affaires
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalRevenue.toLocaleString()} FCFA</div>
                  <p className="text-xs text-green-500 mt-1">+15% depuis le mois dernier</p>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Performance de la plateforme</CardTitle>
                <CardDescription>Statistiques globales de PharmaBenin</CardDescription>
              </CardHeader>
              <CardContent className="h-80 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <BarChart3 className="h-10 w-10 mx-auto mb-4 text-gray-300" />
                  <p>Les graphiques détaillés seront disponibles prochainement.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        );
      }
    }
  };

  // Pour simuler différents types d'utilisateurs (uniquement pour admin)
  const handleChangeUserType = (type: UserType) => {
    // Check if current userType is admin before allowing change
    if (userType === 'admin') {
      setUserType(type);
      setActiveTab('profile');
      localStorage.setItem('userType', type); // Sauvegarde du type d'utilisateur
      toast({
        title: `Mode ${type} activé`,
        description: `Vous consultez maintenant l'interface en mode ${type}.`,
      });
    }
  };

  // Helper function to determine if a button should be active
  const isActiveButton = (buttonType: UserType): boolean => {
    return userType === buttonType;
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start mb-6 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Espace personnel</h1>
            <p className="text-gray-600">
              {userType === 'client' && "Gérez votre compte et vos commandes"}
              {userType === 'pharmacy' && "Gérez votre pharmacie et vos produits"}
              {userType === 'admin' && "Administrez la plateforme PharmaBenin"}
            </p>
          </div>
          
          {userType === 'admin' && (
            <div className="flex gap-2 flex-wrap">
              <Button
                variant={isActiveButton('client') ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleChangeUserType('client')}
                className={isActiveButton('client') ? 'bg-benin-green hover:bg-benin-green/90' : ''}
              >
                <User className="h-4 w-4 mr-2" />
                Mode Client
              </Button>
              <Button
                variant={isActiveButton('pharmacy') ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleChangeUserType('pharmacy')}
                className={isActiveButton('pharmacy') ? 'bg-benin-green hover:bg-benin-green/90' : ''}
              >
                <Store className="h-4 w-4 mr-2" />
                Mode Pharmacie
              </Button>
              <Button
                variant={isActiveButton('admin') ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleChangeUserType('admin')}
                className={isActiveButton('admin') ? 'bg-benin-green hover:bg-benin-green/90' : ''}
              >
                <ClipboardList className="h-4 w-4 mr-2" />
                Mode Admin
              </Button>
            </div>
          )}
        </div>
        
        <Tabs defaultValue="profile" className="space-y-4" value={activeTab}>
          <div className="flex flex-col sm:flex-row justify-between">
            {renderTabs()}
            
            <div className="mt-4 sm:mt-0">
              <Button variant="outline" className="text-red-500" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Déconnexion
              </Button>
            </div>
          </div>
          
          {renderContent()}
        </Tabs>
      </div>
    </Layout>
  );
};

export default UserAccount;
