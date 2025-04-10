
import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import { useToast } from "@/components/ui/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Users, 
  Store, 
  BarChart3, 
  Settings, 
  Search, 
  UserCheck, 
  UserX, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle,
  Bell
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// Données factices pour les demandes d'inscription des pharmacies
const pharmacyRequests = [
  { 
    id: "PR001", 
    pharmacyName: "Pharmacie du Centre", 
    ownerName: "Dr. Kokou Mensah", 
    email: "k.mensah@pharmacentre.com", 
    phone: "+229 97 12 34 56", 
    city: "Cotonou", 
    submissionDate: "2023-12-10", 
    status: "pending" 
  },
  { 
    id: "PR002", 
    pharmacyName: "Pharmacie des Palmiers", 
    ownerName: "Dr. Aline Dossou", 
    email: "a.dossou@pharmapalmiers.com", 
    phone: "+229 96 45 67 89", 
    city: "Porto-Novo", 
    submissionDate: "2023-12-15", 
    status: "pending" 
  },
  { 
    id: "PR003", 
    pharmacyName: "Pharmacie Moderne", 
    ownerName: "Dr. Pascal Agossou", 
    email: "p.agossou@pharmamoderne.com", 
    phone: "+229 95 78 23 41", 
    city: "Parakou", 
    submissionDate: "2023-12-18", 
    status: "pending" 
  },
];

// Données factices des pharmacies approuvées
const approvedPharmacies = [
  { 
    id: "PH001", 
    name: "Pharmacie Centrale", 
    owner: "Dr. Françoise Adjavon", 
    city: "Cotonou", 
    joinDate: "2023-11-05", 
    productsCount: 45, 
    subscriptionStatus: "active", 
    subscriptionEnd: "2024-02-05" 
  },
  { 
    id: "PH002", 
    name: "Pharmacie du Port", 
    owner: "Dr. Serges Akpovi", 
    city: "Cotonou", 
    joinDate: "2023-11-10", 
    productsCount: 32, 
    subscriptionStatus: "trial", 
    subscriptionEnd: "2023-12-25" 
  },
];

// Statistiques factices
const stats = {
  totalPharmacies: 2,
  pendingRequests: 3,
  activeSubscriptions: 1,
  trialSubscriptions: 1,
  totalProducts: 77,
  monthlyRevenue: 75000,
};

const AdminDashboard = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("requests");
  const [searchTerm, setSearchTerm] = useState("");
  
  // Fonctions pour gérer les demandes d'inscription
  const handleApproveRequest = (id: string) => {
    toast({
      title: "Demande approuvée",
      description: `La demande ${id} a été approuvée avec succès.`,
    });
    // Dans une application réelle, mettez à jour le statut de la demande dans la base de données
  };
  
  const handleRejectRequest = (id: string) => {
    toast({
      title: "Demande rejetée",
      description: `La demande ${id} a été rejetée.`,
    });
    // Dans une application réelle, mettez à jour le statut de la demande dans la base de données
  };
  
  // Filtrer les demandes en fonction du terme de recherche
  const filteredRequests = pharmacyRequests.filter(
    request => 
      request.pharmacyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.ownerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Filtrer les pharmacies en fonction du terme de recherche
  const filteredPharmacies = approvedPharmacies.filter(
    pharmacy => 
      pharmacy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pharmacy.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pharmacy.city.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard Administrateur</h1>
            <p className="text-gray-600">
              Gérez les pharmacies et contrôlez l'accès à la plateforme
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
                3
              </span>
            </Button>
            <Button variant="outline" onClick={() => navigate("/account")}>
              <Settings className="h-5 w-5 mr-2" />
              Paramètres
            </Button>
          </div>
        </div>
        
        {/* Statistiques en haut */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-gray-500">Pharmacies</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalPharmacies}</div>
              <p className="text-xs text-green-500 mt-1">+2 ce mois</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-gray-500">Demandes en attente</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.pendingRequests}</div>
              <p className="text-xs text-amber-500 mt-1">Nécessite une action</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-gray-500">Produits</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalProducts}</div>
              <p className="text-xs text-green-500 mt-1">+15 cette semaine</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-gray-500">Revenu mensuel</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.monthlyRevenue.toLocaleString()} FCFA</div>
              <p className="text-xs text-green-500 mt-1">+5% vs mois dernier</p>
            </CardContent>
          </Card>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
            <TabsList className="grid grid-cols-1 sm:grid-cols-3">
              <TabsTrigger value="requests" className="flex items-center">
                <AlertTriangle className="h-4 w-4 mr-2" />
                Demandes
                <Badge variant="outline" className="ml-2">{stats.pendingRequests}</Badge>
              </TabsTrigger>
              <TabsTrigger value="pharmacies" className="flex items-center">
                <Store className="h-4 w-4 mr-2" />
                Pharmacies
              </TabsTrigger>
              <TabsTrigger value="analytics" className="flex items-center">
                <BarChart3 className="h-4 w-4 mr-2" />
                Statistiques
              </TabsTrigger>
            </TabsList>
            
            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input 
                placeholder="Rechercher..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full sm:w-60"
              />
            </div>
          </div>
          
          {/* Onglet des demandes d'inscription */}
          <TabsContent value="requests">
            <Card>
              <CardHeader>
                <CardTitle>Demandes d'inscription en attente</CardTitle>
                <CardDescription>
                  Examinez et approuvez les demandes d'inscription des pharmacies
                </CardDescription>
              </CardHeader>
              <CardContent>
                {filteredRequests.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <p>Aucune demande d'inscription en attente trouvée.</p>
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Pharmacie</TableHead>
                        <TableHead>Propriétaire</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Ville</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredRequests.map((request) => (
                        <TableRow key={request.id}>
                          <TableCell className="font-medium">{request.id}</TableCell>
                          <TableCell>{request.pharmacyName}</TableCell>
                          <TableCell>{request.ownerName}</TableCell>
                          <TableCell>{request.email}</TableCell>
                          <TableCell>{request.city}</TableCell>
                          <TableCell>{request.submissionDate}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="text-green-600 border-green-600 hover:bg-green-50"
                                onClick={() => handleApproveRequest(request.id)}
                              >
                                <UserCheck className="h-4 w-4 mr-1" />
                                Approuver
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="text-red-600 border-red-600 hover:bg-red-50"
                                onClick={() => handleRejectRequest(request.id)}
                              >
                                <UserX className="h-4 w-4 mr-1" />
                                Rejeter
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="text-sm text-gray-500">
                  Affichage de {filteredRequests.length} demande(s) en attente
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
          
          {/* Onglet des pharmacies actives */}
          <TabsContent value="pharmacies">
            <Card>
              <CardHeader>
                <CardTitle>Pharmacies enregistrées</CardTitle>
                <CardDescription>
                  Consultez et gérez les pharmacies actives sur la plateforme
                </CardDescription>
              </CardHeader>
              <CardContent>
                {filteredPharmacies.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <p>Aucune pharmacie trouvée.</p>
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Pharmacie</TableHead>
                        <TableHead>Propriétaire</TableHead>
                        <TableHead>Ville</TableHead>
                        <TableHead>Produits</TableHead>
                        <TableHead>Statut</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredPharmacies.map((pharmacy) => (
                        <TableRow key={pharmacy.id}>
                          <TableCell className="font-medium">{pharmacy.id}</TableCell>
                          <TableCell>{pharmacy.name}</TableCell>
                          <TableCell>{pharmacy.owner}</TableCell>
                          <TableCell>{pharmacy.city}</TableCell>
                          <TableCell>{pharmacy.productsCount}</TableCell>
                          <TableCell>
                            <Badge variant={pharmacy.subscriptionStatus === 'active' ? 'default' : 'secondary'}>
                              {pharmacy.subscriptionStatus === 'active' ? 'Abonné' : 'Essai'}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => {
                                  toast({
                                    title: "Visualisation",
                                    description: `Affichage des détails de ${pharmacy.name}`,
                                  });
                                }}
                              >
                                Voir
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="text-red-600 border-red-600 hover:bg-red-50"
                                onClick={() => {
                                  toast({
                                    title: "Suspension",
                                    description: `${pharmacy.name} a été suspendue.`,
                                    variant: "destructive",
                                  });
                                }}
                              >
                                Suspendre
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="text-sm text-gray-500">
                  Affichage de {filteredPharmacies.length} pharmacie(s)
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
          
          {/* Onglet des statistiques et analyses */}
          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Statistiques de la plateforme</CardTitle>
                <CardDescription>
                  Analysez les performances de la plateforme
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  <div>
                    <h3 className="font-semibold mb-4">Répartition des abonnements</h3>
                    <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                      <p className="text-gray-500">Le graphique des abonnements sera affiché ici</p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-4">Évolution des inscriptions</h3>
                    <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                      <p className="text-gray-500">Le graphique d'évolution sera affiché ici</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Taux d'approbation</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">85%</div>
                        <p className="text-xs text-green-500">+5% ce mois-ci</p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Conversion d'essai</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">67%</div>
                        <p className="text-xs text-amber-500">-3% ce mois-ci</p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Pharmacies actives</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">92%</div>
                        <p className="text-xs text-green-500">Stable ce mois-ci</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
