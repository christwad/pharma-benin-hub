
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Clock, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

const pharmacies = [
  {
    id: 1,
    name: "Pharmacie Centrale",
    address: "Avenue Jean Paul II, Cotonou",
    phone: "+229 21 38 99 99",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1577460551100-d94b9db0f17c?auto=format&fit=crop&w=800&h=600",
    isOpen: true,
    distance: "1.2 km",
  },
  {
    id: 2,
    name: "Pharmacie du Port",
    address: "Boulevard de la Marina, Cotonou",
    phone: "+229 21 31 53 53",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1576671414121-aa2d8c110c22?auto=format&fit=crop&w=800&h=600",
    isOpen: true,
    distance: "2.4 km",
  },
  {
    id: 3,
    name: "Pharmacie Les Palmiers",
    address: "Avenue Steinmetz, Cotonou",
    phone: "+229 21 31 20 22",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&h=600",
    isOpen: false,
    distance: "3.1 km",
  },
  {
    id: 4,
    name: "Pharmacie Zongo",
    address: "Carrefour Zongo, Cotonou",
    phone: "+229 21 31 34 34",
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1579154341098-e4e158cc7f55?auto=format&fit=crop&w=800&h=600",
    isOpen: true,
    distance: "3.8 km",
  },
];

const PopularPharmacies = () => {
  const navigate = useNavigate();

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              Pharmacies populaires
            </h2>
            <p className="mt-2 text-gray-600">
              Découvrez les pharmacies les plus populaires près de chez vous
            </p>
          </div>
          <Button
            variant="outline"
            onClick={() => navigate("/pharmacies")}
          >
            Voir toutes les pharmacies
          </Button>
        </div>

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
      </div>
    </section>
  );
};

export default PopularPharmacies;
