
import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, MapPin, Clock, Phone, Star, SlidersHorizontal } from "lucide-react";
import { Link } from "react-router-dom";

// Types
interface Pharmacy {
  id: number;
  name: string;
  description: string;
  address: string;
  city: string;
  phone: string;
  image: string;
  rating: number;
  isOpen: boolean;
  openingHours: string;
  specialties: string[];
}

const PharmaciesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCity, setActiveCity] = useState("all");

  // Sample data - in a real app, this would come from an API
  const pharmacies: Pharmacy[] = [
    {
      id: 1,
      name: "Pharmacie Centrale",
      description: "Une pharmacie moderne offrant une large gamme de médicaments et de services pharmaceutiques.",
      address: "123 Rue du Commerce",
      city: "Cotonou",
      phone: "+229 97 12 34 56",
      image: "https://images.unsplash.com/photo-1473177104440-ffee2f376098?auto=format&fit=crop&w=800&h=600",
      rating: 4.5,
      isOpen: true,
      openingHours: "08:00 - 20:00",
      specialties: ["Médicaments génériques", "Orthopédie", "Homéopathie"]
    },
    {
      id: 2,
      name: "Pharmacie du Port",
      description: "Située près du port, cette pharmacie offre des services rapides et efficaces avec des pharmaciens expérimentés.",
      address: "45 Avenue du Port",
      city: "Cotonou",
      phone: "+229 97 23 45 67",
      image: "https://images.unsplash.com/photo-1576602976047-174e57a47881?auto=format&fit=crop&w=800&h=600",
      rating: 4.2,
      isOpen: true,
      openingHours: "07:30 - 19:00",
      specialties: ["Produits cosmétiques", "Nutrition", "Médicaments spécialisés"]
    },
    {
      id: 3,
      name: "Pharmacie Moderne",
      description: "Une pharmacie de garde offrant des services 24h/24 pour les urgences médicales.",
      address: "78 Boulevard Central",
      city: "Parakou",
      phone: "+229 97 34 56 78",
      image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=800&h=600",
      rating: 4.8,
      isOpen: false,
      openingHours: "24h/24 (de garde)",
      specialties: ["Service d'urgence", "Conseils personnalisés", "Livraison à domicile"]
    },
    {
      id: 4,
      name: "Pharmacie Saint Joseph",
      description: "Pharmacie familiale offrant des soins attentionnés et des conseils personnalisés.",
      address: "12 Rue de la Santé",
      city: "Porto-Novo",
      phone: "+229 97 45 67 89",
      image: "https://images.unsplash.com/photo-1642391326524-72661a051e5f?auto=format&fit=crop&w=800&h=600",
      rating: 4.0,
      isOpen: true,
      openingHours: "08:00 - 18:00",
      specialties: ["Pédiatrie", "Gériatrie", "Phytothérapie"]
    },
    {
      id: 5,
      name: "Pharmacie des Collines",
      description: "Pharmacie rurale offrant des services essentiels aux communautés éloignées.",
      address: "5 Place du Marché",
      city: "Dassa-Zoumé",
      phone: "+229 97 56 78 90",
      image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&w=800&h=600",
      rating: 4.6,
      isOpen: true,
      openingHours: "07:00 - 18:00",
      specialties: ["Médecine traditionnelle", "Vaccinations", "Premiers secours"]
    },
    {
      id: 6,
      name: "Pharmacie Atlantique",
      description: "Pharmacie moderne située près de la plage, spécialisée dans les soins dermatologiques.",
      address: "34 Avenue de la Plage",
      city: "Ouidah",
      phone: "+229 97 67 89 01",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&h=600",
      rating: 4.3,
      isOpen: false,
      openingHours: "08:30 - 19:30",
      specialties: ["Dermatologie", "Protection solaire", "Soins de la peau"]
    }
  ];

  // Get unique cities
  const cities = ["all", ...new Set(pharmacies.map(pharmacy => pharmacy.city))];

  // Filter pharmacies based on search term and active city
  const filteredPharmacies = pharmacies.filter(pharmacy => {
    const matchesSearch = pharmacy.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         pharmacy.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCity = activeCity === "all" || pharmacy.city === activeCity;
    return matchesSearch && matchesCity;
  });

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Pharmacies</h1>
            <p className="text-gray-600">Trouvez les pharmacies près de chez vous</p>
          </div>
          
          <div className="w-full md:w-auto flex gap-2">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input 
                placeholder="Rechercher une pharmacie..." 
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
          {/* Cities sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Villes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {cities.map((city) => (
                    <Button
                      key={city}
                      variant={activeCity === city ? "default" : "ghost"}
                      className={`w-full justify-start ${activeCity === city ? "bg-benin-green hover:bg-benin-green/90" : ""}`}
                      onClick={() => setActiveCity(city)}
                    >
                      {city === "all" ? "Toutes les villes" : city}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Pharmacies grid/list */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="grid" className="w-full">
              <div className="flex justify-between items-center mb-4">
                <p className="text-sm text-gray-500">
                  {filteredPharmacies.length} pharmacies trouvées
                </p>
                <TabsList>
                  <TabsTrigger value="grid">Grille</TabsTrigger>
                  <TabsTrigger value="list">Liste</TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="grid" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredPharmacies.map((pharmacy) => (
                    <Card key={pharmacy.id} className="overflow-hidden flex flex-col h-full">
                      <div className="relative h-48 bg-gray-100">
                        <img
                          src={pharmacy.image}
                          alt={pharmacy.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 right-2">
                          <Badge variant={pharmacy.isOpen ? "success" : "secondary"}>
                            {pharmacy.isOpen ? "Ouvert" : "Fermé"}
                          </Badge>
                        </div>
                      </div>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-xl">{pharmacy.name}</CardTitle>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm ml-1">{pharmacy.rating}</span>
                          </div>
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <MapPin className="h-4 w-4 mr-1" />
                          {pharmacy.city}
                        </div>
                      </CardHeader>
                      <CardContent className="pb-2 pt-0 flex-grow">
                        <p className="text-sm text-gray-700 line-clamp-2 mb-2">{pharmacy.description}</p>
                        <div className="space-y-1 text-sm">
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                            <span>{pharmacy.address}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-2 text-gray-500" />
                            <span>{pharmacy.openingHours}</span>
                          </div>
                          <div className="flex items-center">
                            <Phone className="h-4 w-4 mr-2 text-gray-500" />
                            <span>{pharmacy.phone}</span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="pt-2">
                        <Button className="w-full bg-benin-green hover:bg-benin-green/90">
                          Voir les médicaments
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="list" className="mt-0">
                <div className="space-y-4">
                  {filteredPharmacies.map((pharmacy) => (
                    <Card key={pharmacy.id} className="overflow-hidden">
                      <div className="flex flex-col sm:flex-row">
                        <div className="relative h-48 sm:h-auto sm:w-48 bg-gray-100">
                          <img
                            src={pharmacy.image}
                            alt={pharmacy.name}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-2 right-2">
                            <Badge variant={pharmacy.isOpen ? "success" : "secondary"}>
                              {pharmacy.isOpen ? "Ouvert" : "Fermé"}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex-1 flex flex-col">
                          <CardHeader className="pb-2">
                            <div className="flex justify-between items-start">
                              <CardTitle>{pharmacy.name}</CardTitle>
                              <div className="flex items-center">
                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                <span className="text-sm ml-1">{pharmacy.rating}</span>
                              </div>
                            </div>
                            <div className="flex items-center text-sm text-gray-500">
                              <MapPin className="h-4 w-4 mr-1" />
                              {pharmacy.city}
                            </div>
                          </CardHeader>
                          <CardContent className="pb-2 pt-0 flex-grow">
                            <p className="text-sm text-gray-700 mb-2">{pharmacy.description}</p>
                            <div className="space-y-1 text-sm">
                              <div className="flex items-center">
                                <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                                <span>{pharmacy.address}</span>
                              </div>
                              <div className="flex items-center">
                                <Clock className="h-4 w-4 mr-2 text-gray-500" />
                                <span>{pharmacy.openingHours}</span>
                              </div>
                              <div className="flex items-center">
                                <Phone className="h-4 w-4 mr-2 text-gray-500" />
                                <span>{pharmacy.phone}</span>
                              </div>
                            </div>
                            <div className="flex flex-wrap gap-2 mt-2">
                              {pharmacy.specialties.map((specialty, index) => (
                                <Badge key={index} variant="outline">
                                  {specialty}
                                </Badge>
                              ))}
                            </div>
                          </CardContent>
                          <CardFooter className="pt-2">
                            <Button className="w-full bg-benin-green hover:bg-benin-green/90">
                              Voir les médicaments
                            </Button>
                          </CardFooter>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PharmaciesPage;
