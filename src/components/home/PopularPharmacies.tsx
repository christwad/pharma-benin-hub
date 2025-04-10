
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Clock, Star, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Type pour les pharmacies
interface Pharmacy {
  id: number;
  name: string;
  address: string;
  phone: string;
  rating: number;
  image: string;
  isOpen: boolean;
  distance: string;
}

const PopularPharmacies = () => {
  const navigate = useNavigate();
  const [pharmacies, setPharmacies] = useState<Pharmacy[]>([]);
  const [loading, setLoading] = useState(true);

  // Simuler le chargement des pharmacies depuis une API
  // Dans une application réelle, ce serait un appel API pour récupérer les pharmacies partenaires
  useEffect(() => {
    const fetchPharmacies = async () => {
      try {
        // Simuler un délai d'API
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Dans une application réelle, ce serait les données de l'API
        // ici on simule une liste vide car aucune pharmacie n'est encore inscrite
        setPharmacies([]);
        setLoading(false);
      } catch (error) {
        console.error("Erreur lors du chargement des pharmacies:", error);
        setLoading(false);
      }
    };
    
    fetchPharmacies();
  }, []);

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              Pharmacies partenaires
            </h2>
            <p className="mt-2 text-gray-600">
              Découvrez les pharmacies partenaires près de chez vous
            </p>
          </div>
          <Button
            variant="outline"
            onClick={() => navigate("/pharmacies")}
          >
            Voir toutes les pharmacies
          </Button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-benin-green"></div>
          </div>
        ) : pharmacies.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {pharmacies.map((pharmacy) => (
              <Card key={pharmacy.id} className="card-hover overflow-hidden">
                <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                  <img
                    src={pharmacy.image}
                    alt={pharmacy.name}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute bottom-2 left-2">
                    {pharmacy.isOpen ? (
                      <Badge className="bg-green-600">Ouvert</Badge>
                    ) : (
                      <Badge variant="secondary">Fermé</Badge>
                    )}
                  </div>
                  <div className="absolute right-2 top-2">
                    <Badge className="flex items-center gap-1 bg-white text-gray-900">
                      <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                      {pharmacy.rating}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="mb-2 text-lg font-semibold">{pharmacy.name}</h3>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-start gap-2">
                      <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-benin-green" />
                      <span>{pharmacy.address}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 flex-shrink-0 text-benin-green" />
                      <span>{pharmacy.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 flex-shrink-0 text-benin-green" />
                      <span>{pharmacy.distance}</span>
                    </div>
                  </div>
                  <Button
                    variant="default"
                    className="mt-4 w-full"
                    onClick={() => navigate(`/pharmacies/${pharmacy.id}`)}
                  >
                    Voir détails
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-gray-50 rounded-lg">
            <Search className="h-16 w-16 mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-medium text-gray-800 mb-2">Aucune pharmacie partenaire</h3>
            <p className="text-gray-600 mb-6 max-w-lg mx-auto">
              Aucune pharmacie n'a encore rejoint notre plateforme. 
              Revenez bientôt pour découvrir nos pharmacies partenaires.
            </p>
            <Button 
              className="bg-benin-green hover:bg-benin-green/90"
              onClick={() => navigate("/pharmacy-signup")}
            >
              Êtes-vous une pharmacie ? Rejoignez-nous
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default PopularPharmacies;
