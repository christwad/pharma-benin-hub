
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, ShoppingCart, Plus, Star, MapPin } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useCart } from '@/hooks/use-cart';
import { useToast } from '@/components/ui/use-toast';

// Types
interface Medicine {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
  stock: number;
  pharmacy: {
    id: string;
    name: string;
    location: string;
    rating: number;
  };
  needsPrescription: boolean;
}

const MedicinesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const { addItem } = useCart();
  const { toast } = useToast();
  
  // Exemple de données statiques (à remplacer par des données du backend)
  const medicines: Medicine[] = [
    {
      id: '1',
      name: 'Paracétamol 500mg',
      price: 1500,
      description: 'Analgésique et antipyrétique utilisé pour traiter la douleur et la fièvre.',
      category: 'Analgésiques',
      image: 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?q=80&w=300&h=300&auto=format&fit=crop',
      stock: 45,
      pharmacy: {
        id: '101',
        name: 'Pharmacie Centrale',
        location: 'Cotonou',
        rating: 4.8,
      },
      needsPrescription: false,
    },
    {
      id: '2',
      name: 'Amoxicilline 250mg',
      price: 3500,
      description: 'Antibiotique utilisé pour traiter diverses infections bactériennes.',
      category: 'Antibiotiques',
      image: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?q=80&w=300&h=300&auto=format&fit=crop',
      stock: 28,
      pharmacy: {
        id: '102',
        name: 'Pharmacie du Port',
        location: 'Cotonou',
        rating: 4.5,
      },
      needsPrescription: true,
    },
    {
      id: '3',
      name: 'Vitamine C 1000mg',
      price: 2200,
      description: 'Supplément pour renforcer le système immunitaire.',
      category: 'Vitamines',
      image: 'https://images.unsplash.com/photo-1577460551100-d3f6f4681e99?q=80&w=300&h=300&auto=format&fit=crop',
      stock: 60,
      pharmacy: {
        id: '103',
        name: 'Pharmacie du Marché',
        location: 'Porto-Novo',
        rating: 4.2,
      },
      needsPrescription: false,
    },
    {
      id: '4',
      name: 'Ibuprofène 400mg',
      price: 1800,
      description: 'Anti-inflammatoire non stéroïdien utilisé pour réduire la douleur et l\'inflammation.',
      category: 'Analgésiques',
      image: 'https://images.unsplash.com/photo-1550572016-b15188bbef1b?q=80&w=300&h=300&auto=format&fit=crop',
      stock: 35,
      pharmacy: {
        id: '101',
        name: 'Pharmacie Centrale',
        location: 'Cotonou',
        rating: 4.8,
      },
      needsPrescription: false,
    },
    {
      id: '5',
      name: 'Loratadine 10mg',
      price: 2500,
      description: 'Antihistaminique utilisé pour traiter les allergies.',
      category: 'Allergies',
      image: 'https://images.unsplash.com/photo-1626716493137-b67fe9501501?q=80&w=300&h=300&auto=format&fit=crop',
      stock: 22,
      pharmacy: {
        id: '104',
        name: 'Pharmacie Moderne',
        location: 'Parakou',
        rating: 4.6,
      },
      needsPrescription: false,
    },
    {
      id: '6',
      name: 'Oméprazole 20mg',
      price: 4200,
      description: 'Inhibiteur de la pompe à protons utilisé pour traiter les problèmes d\'estomac.',
      category: 'Gastro-intestinal',
      image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?q=80&w=300&h=300&auto=format&fit=crop',
      stock: 18,
      pharmacy: {
        id: '102',
        name: 'Pharmacie du Port',
        location: 'Cotonou',
        rating: 4.5,
      },
      needsPrescription: true,
    },
  ];

  // Filtrer et trier les médicaments
  const filteredMedicines = medicines
    .filter(medicine => 
      medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (category === 'all' || medicine.category === category)
    )
    .sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      return 0;
    });

  // Categories unique (pour le filtre)
  const categories = ['all', ...new Set(medicines.map(med => med.category))];

  // Ajouter au panier
  const handleAddToCart = (medicine: Medicine) => {
    addItem({
      id: medicine.id,
      name: medicine.name,
      price: medicine.price,
      image: medicine.image,
      quantity: 1,
    });
    
    toast({
      title: "Ajouté au panier!",
      description: `${medicine.name} a été ajouté à votre panier.`,
    });
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4 md:mb-0">Médicaments disponibles</h1>
          
          <div className="w-full md:w-auto flex flex-col md:flex-row gap-4">
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Rechercher un médicament..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Trier par" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Nom (A-Z)</SelectItem>
                <SelectItem value="price-asc">Prix (croissant)</SelectItem>
                <SelectItem value="price-desc">Prix (décroissant)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filtres (à gauche) */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center mb-4">
                  <Filter className="h-5 w-5 mr-2 text-benin-green" />
                  <h2 className="text-lg font-semibold">Filtres</h2>
                </div>
                
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="category">
                    <AccordionTrigger className="text-sm">Catégorie</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2">
                        {categories.map((cat) => (
                          <div key={cat} className="flex items-center">
                            <input
                              type="radio"
                              id={`cat-${cat}`}
                              name="category"
                              checked={category === cat}
                              onChange={() => setCategory(cat)}
                              className="mr-2"
                            />
                            <label htmlFor={`cat-${cat}`} className="text-sm capitalize">
                              {cat === 'all' ? 'Toutes les catégories' : cat}
                            </label>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="location">
                    <AccordionTrigger className="text-sm">Localisation</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <input type="checkbox" id="loc-cotonou" className="mr-2" />
                          <label htmlFor="loc-cotonou" className="text-sm">Cotonou</label>
                        </div>
                        <div className="flex items-center">
                          <input type="checkbox" id="loc-porto" className="mr-2" />
                          <label htmlFor="loc-porto" className="text-sm">Porto-Novo</label>
                        </div>
                        <div className="flex items-center">
                          <input type="checkbox" id="loc-parakou" className="mr-2" />
                          <label htmlFor="loc-parakou" className="text-sm">Parakou</label>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="prescription">
                    <AccordionTrigger className="text-sm">Ordonnance</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <input type="checkbox" id="prescription-yes" className="mr-2" />
                          <label htmlFor="prescription-yes" className="text-sm">Nécessite une ordonnance</label>
                        </div>
                        <div className="flex items-center">
                          <input type="checkbox" id="prescription-no" className="mr-2" />
                          <label htmlFor="prescription-no" className="text-sm">Sans ordonnance</label>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                
                <Button variant="outline" className="w-full mt-4">
                  Réinitialiser les filtres
                </Button>
              </CardContent>
            </Card>
          </div>
          
          {/* Liste des médicaments (à droite) */}
          <div className="lg:col-span-3">
            {filteredMedicines.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-lg text-gray-600">Aucun médicament trouvé.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {filteredMedicines.map((medicine) => (
                  <Card key={medicine.id} className="overflow-hidden border border-gray-200 transition-all hover:shadow-md">
                    <div className="h-48 w-full overflow-hidden bg-gray-100">
                      <img 
                        src={medicine.image} 
                        alt={medicine.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-gray-900 line-clamp-1">{medicine.name}</h3>
                        <Badge variant={medicine.needsPrescription ? "destructive" : "secondary"} className="ml-2 shrink-0">
                          {medicine.needsPrescription ? "Ordonnance" : "Libre"}
                        </Badge>
                      </div>
                      
                      <p className="text-gray-600 text-sm mb-2 line-clamp-2">{medicine.description}</p>
                      
                      <div className="flex items-center text-sm text-gray-600 mb-3">
                        <MapPin className="h-3 w-3 mr-1" />
                        <span className="mr-2">{medicine.pharmacy.name}</span>
                        <div className="flex items-center">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span className="ml-1">{medicine.pharmacy.rating}</span>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center mt-4">
                        <p className="font-bold text-benin-green">{medicine.price} FCFA</p>
                        
                        {medicine.stock > 0 ? (
                          <div className="flex space-x-2">
                            <Button
                              variant="default"
                              size="sm"
                              className="bg-benin-green hover:bg-benin-green/90"
                              onClick={() => handleAddToCart(medicine)}
                            >
                              <ShoppingCart className="h-4 w-4 mr-1" />
                              <span>Ajouter</span>
                            </Button>
                          </div>
                        ) : (
                          <Badge variant="outline" className="text-red-500 border-red-500">
                            Rupture de stock
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MedicinesPage;
