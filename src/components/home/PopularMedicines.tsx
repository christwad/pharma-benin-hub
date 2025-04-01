
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/hooks/use-cart";
import { useToast } from "@/components/ui/use-toast";
import MedicineCard from "@/components/medicines/MedicineCard";
import { medicines } from "@/data/medicines";

const PopularMedicines = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toast } = useToast();

  // Afficher seulement les 8 premiers médicaments sur la page d'accueil
  const displayedMedicines = medicines.slice(0, 8);

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
          {displayedMedicines.map((medicine) => (
            <MedicineCard 
              key={medicine.id}
              medicine={medicine} 
              onAddToCart={handleAddToCart} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularMedicines;
