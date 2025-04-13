
import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCart } from "@/hooks/use-cart";
import { Search, Filter, SlidersHorizontal, Plus, Star } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

// Types
interface Medicine {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number;
  pharmacy: string;
  rating: number;
}

const MedicinesPage = () => {
  const { toast } = useToast();
  const { addToCart } = useCart();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  // Liste vide - les médicaments seront chargés dynamiquement des pharmacies connectées
  const medicines: Medicine[] = [];

  // Get unique categories
  const categories = ["all", ...new Set(medicines.map(medicine => medicine.category))];

  // Filter medicines based on search term and active category
  const filteredMedicines = medicines.filter(medicine => {
    const matchesSearch = medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         medicine.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === "all" || medicine.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddToCart = (medicine: Medicine) => {
    if (medicine.stock <= 0) {
      toast({
        title: "Produit indisponible",
        description: "Ce médicament est actuellement en rupture de stock",
        variant: "destructive",
      });
      return;
    }
    
    addToCart({
      id: String(medicine.id), // Convertir l'ID en string
      name: medicine.name,
      price: medicine.price,
      quantity: 1,
      image: medicine.image,
      brand: medicine.name, // Utiliser name comme brand par défaut
      pharmacy: medicine.pharmacy,
      pharmacy_id: String(medicine.id).split('-')[0] // Utiliser un ID générique pour la pharmacie
    });
    
    toast({
      title: "Produit ajouté",
      description: `${medicine.name} a été ajouté à votre panier`,
    });
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Médicaments</h1>
            <p className="text-gray-600">Découvrez notre sélection de médicaments disponibles</p>
          </div>
          
          <div className="w-full md:w-auto flex gap-2">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input 
                placeholder="Rechercher un médicament..." 
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4" />
              <span className="hidden sm:inline">Filtres</span>
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Categories sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Catégories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant={activeCategory === category ? "default" : "ghost"}
                      className={`w-full justify-start ${activeCategory === category ? "bg-benin-green hover:bg-benin-green/90" : ""}`}
                      onClick={() => setActiveCategory(category)}
                    >
                      {category === "all" ? "Toutes les catégories" : category}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Products grid */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="grid" className="w-full">
              <div className="flex justify-between items-center mb-4">
                <p className="text-sm text-gray-500">
                  {filteredMedicines.length} médicaments trouvés
                </p>
                <TabsList>
                  <TabsTrigger value="grid">Grille</TabsTrigger>
                  <TabsTrigger value="list">Liste</TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="grid" className="mt-0">
                {filteredMedicines.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {filteredMedicines.map((medicine) => (
                      <Card key={medicine.id} className="overflow-hidden flex flex-col h-full">
                        <div className="relative h-48 bg-gray-100">
                          <img
                            src={medicine.image}
                            alt={medicine.name}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-2 right-2">
                            <Badge variant={medicine.stock > 0 ? "success" : "destructive"}>
                              {medicine.stock > 0 ? "En stock" : "Rupture"}
                            </Badge>
                          </div>
                        </div>
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <CardTitle className="text-lg">{medicine.name}</CardTitle>
                            <div className="flex items-center">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              <span className="text-sm ml-1">{medicine.rating}</span>
                            </div>
                          </div>
                          <p className="text-sm text-gray-500">{medicine.category}</p>
                        </CardHeader>
                        <CardContent className="pb-2 pt-0 flex-grow">
                          <p className="text-sm text-gray-700 line-clamp-2">{medicine.description}</p>
                          <p className="mt-2 text-sm">
                            Vendu par <span className="font-medium">{medicine.pharmacy}</span>
                          </p>
                        </CardContent>
                        <CardFooter className="pt-2 flex justify-between items-center">
                          <p className="font-bold">{medicine.price} FCFA</p>
                          <Button 
                            onClick={() => handleAddToCart(medicine)}
                            disabled={medicine.stock <= 0}
                            className={medicine.stock > 0 ? "bg-benin-green hover:bg-benin-green/90" : ""}
                          >
                            <Plus className="h-4 w-4 mr-2" />
                            Ajouter
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16 bg-gray-50 rounded-lg">
                    <Search className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                    <h3 className="text-xl font-medium text-gray-800 mb-2">Aucun médicament disponible</h3>
                    <p className="text-gray-600 mb-6 max-w-lg mx-auto">
                      Les pharmacies partenaires n'ont pas encore ajouté de médicaments à leur catalogue.
                      Revenez bientôt pour découvrir notre sélection.
                    </p>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="list" className="mt-0">
                {filteredMedicines.length > 0 ? (
                  <div className="space-y-4">
                    {filteredMedicines.map((medicine) => (
                      <Card key={medicine.id} className="overflow-hidden">
                        <div className="flex flex-col sm:flex-row">
                          <div className="relative h-48 sm:h-auto sm:w-48 bg-gray-100">
                            <img
                              src={medicine.image}
                              alt={medicine.name}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute top-2 right-2">
                              <Badge variant={medicine.stock > 0 ? "success" : "destructive"}>
                                {medicine.stock > 0 ? "En stock" : "Rupture"}
                              </Badge>
                            </div>
                          </div>
                          <div className="flex-1 flex flex-col">
                            <CardHeader className="pb-2">
                              <div className="flex justify-between items-start">
                                <CardTitle>{medicine.name}</CardTitle>
                                <div className="flex items-center">
                                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                  <span className="text-sm ml-1">{medicine.rating}</span>
                                </div>
                              </div>
                              <p className="text-sm text-gray-500">{medicine.category}</p>
                            </CardHeader>
                            <CardContent className="pb-2 pt-0 flex-grow">
                              <p className="text-sm text-gray-700">{medicine.description}</p>
                              <p className="mt-2 text-sm">
                                Vendu par <span className="font-medium">{medicine.pharmacy}</span>
                              </p>
                            </CardContent>
                            <CardFooter className="pt-2 flex justify-between items-center">
                              <p className="font-bold">{medicine.price} FCFA</p>
                              <Button 
                                onClick={() => handleAddToCart(medicine)}
                                disabled={medicine.stock <= 0}
                                className={medicine.stock > 0 ? "bg-benin-green hover:bg-benin-green/90" : ""}
                              >
                                <Plus className="h-4 w-4 mr-2" />
                                Ajouter
                              </Button>
                            </CardFooter>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16 bg-gray-50 rounded-lg">
                    <Search className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                    <h3 className="text-xl font-medium text-gray-800 mb-2">Aucun médicament disponible</h3>
                    <p className="text-gray-600 mb-6 max-w-lg mx-auto">
                      Les pharmacies partenaires n'ont pas encore ajouté de médicaments à leur catalogue.
                      Revenez bientôt pour découvrir notre sélection.
                    </p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MedicinesPage;
