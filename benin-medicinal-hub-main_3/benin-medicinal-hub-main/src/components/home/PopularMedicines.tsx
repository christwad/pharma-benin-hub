
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/hooks/use-cart";
import { useToast } from "@/components/ui/use-toast";

const medicines = [
  {
    id: 1,
    name: "Paracétamol 500mg",
    brand: "Doliprane",
    price: 2500,
    available: true,
    category: "Antidouleur",
    image: "/placeholder.svg",
  },
  {
    id: 2,
    name: "Ibuprofène 400mg",
    brand: "Advil",
    price: 3200,
    available: true,
    category: "Anti-inflammatoire",
    image: "/placeholder.svg",
  },
  {
    id: 3,
    name: "Amoxicilline 500mg",
    brand: "Clamoxyl",
    price: 4500,
    available: true,
    category: "Antibiotique",
    image: "/placeholder.svg",
  },
  {
    id: 4,
    name: "Aspirine 500mg",
    brand: "Aspégic",
    price: 1800,
    available: false,
    category: "Antidouleur",
    image: "/placeholder.svg",
  },
];

const PopularMedicines = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = (medicine: any) => {
    addToCart(medicine);
    toast({
      title: "Produit ajouté au panier",
      description: `${medicine.name} a été ajouté à votre panier`,
    });
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              Médicaments populaires
            </h2>
            <p className="mt-2 text-gray-600">
              Les médicaments les plus recherchés par nos utilisateurs
            </p>
          </div>
          <Button
            variant="outline"
            onClick={() => navigate("/medicines")}
          >
            Voir tous les médicaments
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {medicines.map((medicine) => (
            <Card key={medicine.id} className="card-hover overflow-hidden">
              <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                <img
                  src={medicine.image}
                  alt={medicine.name}
                  className="h-full w-full object-cover"
                />
                <div className="absolute bottom-2 left-2">
                  {medicine.available ? (
                    <Badge className="bg-green-600">En stock</Badge>
                  ) : (
                    <Badge variant="secondary">Indisponible</Badge>
                  )}
                </div>
                <div className="absolute right-2 top-2">
                  <Badge className="bg-medical-medium">{medicine.category}</Badge>
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="mb-1 text-lg font-semibold">{medicine.name}</h3>
                <p className="text-sm text-gray-600">{medicine.brand}</p>
                <div className="mt-2 flex items-center justify-between">
                  <p className="text-lg font-bold text-benin-green">
                    {medicine.price.toLocaleString()} FCFA
                  </p>
                  {medicine.available && (
                    <Button
                      size="icon"
                      className="rounded-full"
                      onClick={() => handleAddToCart(medicine)}
                    >
                      <PlusCircle className="h-5 w-5" />
                    </Button>
                  )}
                </div>
                <Button
                  variant="outline"
                  className="mt-4 w-full"
                  onClick={() => navigate(`/medicines/${medicine.id}`)}
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

export default PopularMedicines;
