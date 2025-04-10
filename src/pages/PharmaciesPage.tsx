
import React, { useState, useEffect } from "react";
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
  const [pharmacies, setPharmacies] = useState<Pharmacy[]>([]);
  const [loading, setLoading] = useState(true);
  const [cities, setCities] = useState<string[]>(["all"]);

  // Simuler le chargement des pharmacies depuis une API
  useEffect(() => {
    const fetchPharmacies = async () => {
      try {
        // Simuler un délai d'API
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Dans une application réelle, ce serait les données de l'API
        // ici on simule une liste vide car aucune pharmacie n'est encore inscrite
        setPharmacies([]);
        setCities(["all"]);
        setLoading(false);
      } catch (error) {
        console.error("Erreur lors du chargement des pharmacies:", error);
        setLoading(false);
      }
    };
    
    fetchPharmacies();
  }, []);

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
        
        {loading ? (
          <div className="flex justify-center items-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-benin-green"></div>
          </div>
        ) : (
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
                
                {filteredPharmacies.length > 0 ? (
                  <>
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
                  </>
                ) : (
                  <div className="text-center py-16 bg-gray-50 rounded-lg">
                    <Search className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                    <h3 className="text-xl font-medium text-gray-800 mb-2">Aucune pharmacie trouvée</h3>
                    <p className="text-gray-600 mb-6 max-w-lg mx-auto">
                      Aucune pharmacie n'a encore rejoint notre plateforme. 
                      Revenez bientôt pour découvrir nos pharmacies partenaires.
                    </p>
                    <Button 
                      className="bg-benin-green hover:bg-benin-green/90"
                      onClick={() => window.location.href = "/pharmacy-signup"}
                    >
                      Êtes-vous une pharmacie ? Rejoignez-nous
                    </Button>
                  </div>
                )}
              </Tabs>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default PharmaciesPage;
