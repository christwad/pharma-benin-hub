
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { 
  Plus, 
  Edit, 
  Trash2, 
  Search, 
  UploadCloud, 
  ShoppingBag, 
  PackageCheck,
  Clock, 
  CreditCard, 
  BarChart3,
  Store 
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Type pour les médicaments
interface Medicine {
  id: number;
  name: string;
  brand: string;
  price: number;
  available: boolean;
  category: string;
  image: string;
  quantity: number;
  description: string;
}

const PharmacyDashboard = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [medicines, setMedicines] = useState<Medicine[]>([
    {
      id: 1,
      name: "Paracétamol 500mg",
      brand: "Doliprane",
      price: 2500,
      available: true,
      category: "Antidouleur",
      image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&h=600",
      quantity: 150,
      description: "Antalgique et antipyrétique utilisé pour le traitement symptomatique de la douleur et de la fièvre"
    },
    {
      id: 2,
      name: "Amoxicilline 500mg",
      brand: "Clamoxyl",
      price: 4500,
      available: true,
      category: "Antibiotique",
      image: "https://images.unsplash.com/photo-1587854680352-936b22b91030?auto=format&fit=crop&w=800&h=600",
      quantity: 75,
      description: "Antibiotique de la famille des bêta-lactamines"
    }
  ]);
  
  // État pour le médicament en cours d'édition
  const [editingMedicine, setEditingMedicine] = useState<Medicine | null>(null);
  const [newMedicine, setNewMedicine] = useState<Partial<Medicine>>({
    name: "",
    brand: "",
    price: 0,
    available: true,
    category: "",
    image: "",
    quantity: 0,
    description: ""
  });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  
  // Date de fin d'essai factice (3 jours à partir de maintenant)
  const trialEndDate = new Date();
  trialEndDate.setDate(trialEndDate.getDate() + 3);
  const formattedTrialEndDate = trialEndDate.toLocaleDateString('fr-FR');
  
  // Statistiques factices pour le dashboard
  const stats = {
    totalProducts: medicines.length,
    availableProducts: medicines.filter(m => m.available).length,
    outOfStock: medicines.filter(m => !m.available).length,
    orders: 5,
    pendingOrders: 2,
    monthlyRevenue: 125000
  };
  
  // Filtrer les médicaments en fonction du terme de recherche
  const filteredMedicines = medicines.filter(
    medicine => 
      medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      medicine.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      medicine.category.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Gérer la modification d'un médicament
  const handleEditMedicine = (medicine: Medicine) => {
    setEditingMedicine(medicine);
    setNewMedicine(medicine);
    setIsEditing(true);
    setDialogOpen(true);
  };
  
  // Gérer la suppression d'un médicament
  const handleDeleteMedicine = (id: number) => {
    setMedicines(medicines.filter(medicine => medicine.id !== id));
    toast({
      title: "Médicament supprimé",
      description: "Le médicament a été supprimé avec succès.",
    });
  };
  
  // Gérer l'ajout ou la mise à jour d'un médicament
  const handleSaveMedicine = () => {
    if (isEditing && editingMedicine) {
      // Mise à jour d'un médicament existant
      setMedicines(medicines.map(med => 
        med.id === editingMedicine.id ? { ...med, ...newMedicine as Medicine } : med
      ));
      toast({
        title: "Médicament mis à jour",
        description: `${newMedicine.name} a été mis à jour avec succès.`,
      });
    } else {
      // Ajout d'un nouveau médicament
      const newId = Math.max(0, ...medicines.map(m => m.id)) + 1;
      setMedicines([...medicines, { ...newMedicine as Medicine, id: newId }]);
      toast({
        title: "Médicament ajouté",
        description: `${newMedicine.name} a été ajouté avec succès.`,
      });
    }
    
    // Réinitialiser le formulaire et fermer le dialogue
    setDialogOpen(false);
    setIsEditing(false);
    setEditingMedicine(null);
    setNewMedicine({
      name: "",
      brand: "",
      price: 0,
      available: true,
      category: "",
      image: "",
      quantity: 0,
      description: ""
    });
  };
  
  // Gérer les changements de champs du formulaire
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewMedicine(prev => ({ ...prev, [name]: name === 'price' || name === 'quantity' ? Number(value) : value }));
  };
  
  // Gérer le changement d'état de disponibilité
  const handleAvailabilityChange = (value: string) => {
    setNewMedicine(prev => ({ ...prev, available: value === 'true' }));
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard Pharmacie</h1>
            <p className="text-gray-600">
              Gérez votre inventaire et suivez vos performances
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              className="bg-amber-50 text-amber-700 border-amber-300 hover:bg-amber-100"
              onClick={() => toast({
                title: "Mode essai",
                description: `Votre période d'essai se termine le ${formattedTrialEndDate}. Veuillez vous abonner pour continuer à utiliser toutes les fonctionnalités.`,
              })}
            >
              <Clock className="h-4 w-4 mr-2" />
              Essai: {formattedTrialEndDate}
            </Button>
            
            <Button 
              className="bg-benin-green hover:bg-benin-green/90"
              onClick={() => window.location.href = '/pharmacy-subscription'}
            >
              <CreditCard className="h-4 w-4 mr-2" />
              S'abonner
            </Button>
          </div>
        </div>
        
        {/* Statistiques */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-gray-500">Total produits</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalProducts}</div>
              <p className="text-xs text-green-500 mt-1">+2 depuis la dernière semaine</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-gray-500">Disponibles</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.availableProducts}</div>
              <p className="text-xs text-green-500 mt-1">En stock</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-gray-500">Commandes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.orders}</div>
              <p className="text-xs text-amber-500 mt-1">{stats.pendingOrders} en attente</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-gray-500">Revenu mensuel</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.monthlyRevenue.toLocaleString()} FCFA</div>
              <p className="text-xs text-green-500 mt-1">+15% vs mois dernier</p>
            </CardContent>
          </Card>
        </div>
        
        {/* Gestion des médicaments */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <div className="space-y-1">
              <CardTitle>Gestion des médicaments</CardTitle>
              <CardDescription>Ajoutez, modifiez ou supprimez des médicaments de votre catalogue</CardDescription>
            </div>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  className="bg-benin-green hover:bg-benin-green/90"
                  onClick={() => {
                    setIsEditing(false);
                    setNewMedicine({
                      name: "",
                      brand: "",
                      price: 0,
                      available: true,
                      category: "",
                      image: "",
                      quantity: 0,
                      description: ""
                    });
                  }}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Ajouter un médicament
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[550px]">
                <DialogHeader>
                  <DialogTitle>
                    {isEditing ? `Modifier ${editingMedicine?.name}` : 'Ajouter un nouveau médicament'}
                  </DialogTitle>
                  <DialogDescription>
                    {isEditing 
                      ? 'Modifiez les informations du médicament ci-dessous.'
                      : 'Remplissez le formulaire pour ajouter un nouveau médicament à votre catalogue.'}
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nom du médicament</Label>
                      <Input 
                        id="name"
                        name="name"
                        placeholder="ex: Paracétamol 500mg"
                        value={newMedicine.name}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="brand">Marque/Fabricant</Label>
                      <Input 
                        id="brand"
                        name="brand"
                        placeholder="ex: Doliprane"
                        value={newMedicine.brand}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="price">Prix (FCFA)</Label>
                      <Input 
                        id="price"
                        name="price"
                        type="number"
                        min="0"
                        placeholder="ex: 2500"
                        value={newMedicine.price}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="category">Catégorie</Label>
                      <Input 
                        id="category"
                        name="category"
                        placeholder="ex: Antidouleur"
                        value={newMedicine.category}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="quantity">Quantité en stock</Label>
                      <Input 
                        id="quantity"
                        name="quantity"
                        type="number"
                        min="0"
                        placeholder="ex: 100"
                        value={newMedicine.quantity}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="available">Disponibilité</Label>
                      <Select 
                        value={String(newMedicine.available)} 
                        onValueChange={handleAvailabilityChange}
                      >
                        <SelectTrigger id="available">
                          <SelectValue placeholder="Sélectionner la disponibilité" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="true">Disponible</SelectItem>
                          <SelectItem value="false">Non disponible</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="image">URL de l'image</Label>
                    <Input 
                      id="image"
                      name="image"
                      placeholder="https://exemple.com/image.jpg"
                      value={newMedicine.image}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea 
                      id="description"
                      name="description"
                      placeholder="Description du médicament..."
                      value={newMedicine.description}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setDialogOpen(false)}>Annuler</Button>
                  <Button onClick={handleSaveMedicine} className="bg-benin-green hover:bg-benin-green/90">
                    {isEditing ? 'Mettre à jour' : 'Ajouter'}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between pb-4">
              <div className="relative w-full max-w-sm">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input 
                  placeholder="Rechercher un médicament..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            {filteredMedicines.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <p>Aucun médicament trouvé. Ajoutez-en un nouveau.</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nom</TableHead>
                    <TableHead>Catégorie</TableHead>
                    <TableHead>Prix</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMedicines.map((medicine) => (
                    <TableRow key={medicine.id}>
                      <TableCell className="font-medium">{medicine.name}</TableCell>
                      <TableCell>{medicine.category}</TableCell>
                      <TableCell>{medicine.price.toLocaleString()} FCFA</TableCell>
                      <TableCell>{medicine.quantity}</TableCell>
                      <TableCell>
                        <Badge variant={medicine.available ? 'success' : 'destructive'}>
                          {medicine.available ? 'Disponible' : 'Indisponible'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleEditMedicine(medicine)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="text-red-500 hover:text-red-600"
                            onClick={() => handleDeleteMedicine(medicine.id)}
                          >
                            <Trash2 className="h-4 w-4" />
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
              Affichage de {filteredMedicines.length} médicament(s)
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
        
        {/* Section des commandes récentes */}
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Commandes récentes</h2>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Dernières commandes reçues</CardTitle>
              <CardDescription>Gérez les commandes de vos clients</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-gray-500">
                <ShoppingBag className="h-12 w-12 mx-auto text-gray-300 mb-3" />
                <p>Aucune commande récente à afficher.</p>
                <p className="text-sm">Les commandes apparaîtront ici dès que des clients passeront commande.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default PharmacyDashboard;
