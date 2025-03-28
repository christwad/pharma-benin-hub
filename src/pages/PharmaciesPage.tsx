
import React from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Clock, Star } from "lucide-react";

const pharmacies = [
  {
    id: 1,
    name: "Pharmacie Centrale",
    address: "Avenue Jean Paul II, Cotonou",
    phone: "+229 21 38 99 99",
    rating: 4.8,
    image: "/placeholder.svg",
    isOpen: true,
    distance: "1.2 km",
    hours: "Lun-Sam: 8h-22h, Dim: 9h-20h"
  },
  {
    id: 2,
    name: "Pharmacie du Port",
    address: "Boulevard de la Marina, Cotonou",
    phone: "+229 21 31 53 53",
    rating: 4.5,
    image: "/placeholder.svg",
    isOpen: true,
    distance: "2.4 km",
    hours: "Lun-Sam: 8h-22h, Dim: 9h-20h"
  },
  {
    id: 3,
    name: "Pharmacie Les Palmiers",
    address: "Avenue Steinmetz, Cotonou",
    phone: "+229 21 31 20 22",
    rating: 4.7,
    image: "/placeholder.svg",
    isOpen: false,
    distance: "3.1 km",
    hours: "Lun-Sam: 8h-20h, Dim: 9h-18h"
  },
  {
    id: 4,
    name: "Pharmacie Zongo",
    address: "Carrefour Zongo, Cotonou",
    phone: "+229 21 31 34 34",
    rating: 4.4,
    image: "/placeholder.svg",
    isOpen: true,
    distance: "3.8 km",
    hours: "Lun-Sam: 8h-21h, Dim: 9h-19h"
  },
  {
    id: 5,
    name: "Pharmacie Saint Jean",
    address: "Rue Saint Jean, Cotonou",
    phone: "+229 21 30 14 84",
    rating: 4.3,
    image: "/placeholder.svg",
    isOpen: true,
    distance: "4.2 km",
    hours: "Lun-Sam: 8h-22h, Dim: 9h-20h"
  },
  {
    id: 6,
    name: "Pharmacie Haie Vive",
    address: "Haie Vive, Cotonou",
    phone: "+229 21 32 36 56",
    rating: 4.9,
    image: "/placeholder.svg",
    isOpen: true,
    distance: "5.0 km",
    hours: "Lun-Dim: 24h/24"
  },
  {
    id: 7,
    name: "Pharmacie Akpakpa",
    address: "Akpakpa, Cotonou",
    phone: "+229 21 33 13 57",
    rating: 4.6,
    image: "/placeholder.svg",
    isOpen: false,
    distance: "6.1 km",
    hours: "Lun-Sam: 8h-20h, Dim: Fermé"
  },
  {
    id: 8,
    name: "Pharmacie Gbégamey",
    address: "Gbégamey, Cotonou",
    phone: "+229 21 37 11 37",
    rating: 4.2,
    image: "/placeholder.svg",
    isOpen: true,
    distance: "3.5 km",
    hours: "Lun-Sam: 8h-21h, Dim: 9h-18h"
  }
];

const PharmaciesPage = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Pharmacies au Bénin
          </h1>
          <p className="mt-2 text-gray-600">
            Trouvez les pharmacies près de chez vous
          </p>
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
                    <span>{pharmacy.hours}</span>
                  </div>
                </div>
                <Button
                  variant="default"
                  className="mt-4 w-full"
                >
                  Voir détails
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default PharmaciesPage;
