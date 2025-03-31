
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCart } from "@/hooks/use-cart";
import { Search, Filter, SlidersHorizontal, Plus, Star } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

// Medicines type (same as in MedicinesPage)
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

const SearchPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { addToCart } = useCart();
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<Medicine[]>([]);

  // Mock data (same as in MedicinesPage)
  const medicines: Medicine[] = [
    {
      id: 1,
      name: "Paracétamol 500mg",
      description: "Analgésique et antipyrétique pour le soulagement de la douleur légère à modérée",
      price: 1500,
      image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=2830&auto=format&fit=crop",
      category: "Analgésiques",
      stock: 45,
      pharmacy: "Pharmacie Centrale",
      rating: 4.5
    },
    {
      id: 2,
      name: "Amoxicilline 250mg",
      description: "Antibiotique à large spectre pour traiter diverses infections bactériennes",
      price: 3500,
      image: "https://images.unsplash.com/photo-1550572017-4fcdbb59cc32?q=80&w=2787&auto=format&fit=crop",
      category: "Antibiotiques",
      stock: 28,
      pharmacy: "Pharmacie du Port",
      rating: 4.2
    },
    {
      id: 3,
      name: "Ibuprofène 400mg",
      description: "Anti-inflammatoire non stéroïdien pour réduire la douleur et l'inflammation",
      price: 1800,
      image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?q=80&w=2369&auto=format&fit=crop",
      category: "Anti-inflammatoires",
      stock: 0,
      pharmacy: "Pharmacie Moderne",
      rating: 4.0
    },
    {
      id: 4,
      name: "Loratadine 10mg",
      description: "Antihistaminique pour le soulagement des symptômes d'allergie",
      price: 2000,
      image: "https://images.unsplash.com/photo-1579165466991-467135ad3110?q=80&w=2574&auto=format&fit=crop",
      category: "Antihistaminiques",
      stock: 15,
      pharmacy: "Pharmacie Centrale",
      rating: 4.3
    },
    {
      id: 5,
      name: "Oméprazole 20mg",
      description: "Inhibiteur de la pompe à protons pour réduire l'acide gastrique",
      price: 2500,
      image: "https://images.unsplash.com/photo-1631549916768-4119b4123487?q=80&w=2679&auto=format&fit=crop",
      category: "Gastro-intestinaux",
      stock: 22,
      pharmacy: "Pharmacie du Port",
      rating: 4.7
    },
    {
      id: 6,
      name: "Metformine 500mg",
      description: "Médicament antidiabétique pour contrôler la glycémie",
      price: 1900,
      image: "https://images.unsplash.com/photo-1558956397-7f6aea7aaab4?q=80&w=2574&auto=format&fit=crop",
      category: "Diabète",
      stock: 35,
      pharmacy: "Pharmacie Moderne",
      rating: 4.4
    }
  ];

  // Parse search query from URL on component mount
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get("q");
    if (query) {
      setSearchTerm(query);
      performSearch(query);
    }
  }, [location.search]);

  // Search function
  const performSearch = (query: string) => {
    const filtered = medicines.filter(medicine => 
      medicine.name.toLowerCase().includes(query.toLowerCase()) || 
      medicine.description.toLowerCase().includes(query.toLowerCase()) ||
      medicine.category.toLowerCase().includes(query.toLowerCase())
    );
    setResults(filtered);
  };

  // Handle form submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
    performSearch(searchTerm);
  };

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
      id: medicine.id,
      name: medicine.name,
      price: medicine.price,
      quantity: 1,
      image: medicine.image
    });
    
    toast({
      title: "Produit ajouté",
      description: `${medicine.name} a été ajouté à votre panier`,
    });
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Recherche</h1>
          
          <form onSubmit={handleSearch} className="flex gap-2 max-w-2xl">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input 
                placeholder="Rechercher un médicament..." 
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button type="submit">Rechercher</Button>
          </form>
        </div>
        
        {results.length > 0 ? (
          <div>
            <p className="text-sm text-gray-500 mb-4">
              {results.length} résultat(s) trouvé(s) pour "{searchTerm}"
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {results.map((medicine) => (
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
          </div>
        ) : searchTerm ? (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold mb-2">Aucun résultat trouvé</h2>
            <p className="text-gray-600">
              Nous n'avons trouvé aucun médicament correspondant à "{searchTerm}"
            </p>
          </div>
        ) : null}
      </div>
    </Layout>
  );
};

export default SearchPage;
