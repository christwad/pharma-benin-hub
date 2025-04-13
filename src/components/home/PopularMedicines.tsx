
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/hooks/use-cart";
import { useToast } from "@/components/ui/use-toast";
import MedicineCard from "@/components/medicines/MedicineCard";
import { Search } from "lucide-react";

// Type pour les médicaments
interface Medicine {
  id: number;
  name: string;
  brand: string;
  price: number;
  available: boolean;
  category: string;
  image: string;
  pharmacy: string;
  pharmacy_id?: string; // Ajout de pharmacy_id optionnel
}

const PopularMedicines = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [loading, setLoading] = useState(true);

  // Simuler le chargement des médicaments depuis une API
  // Dans une application réelle, ce serait un appel API pour récupérer les médicaments
  // des pharmacies connectées
  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        // Simuler un délai d'API
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Dans une application réelle, ce serait les données de l'API
        // ici on simule une liste vide car aucune pharmacie n'a encore ajouté de médicaments
        setMedicines([]);
        setLoading(false);
      } catch (error) {
        console.error("Erreur lors du chargement des médicaments:", error);
        setLoading(false);
      }
    };
    
    fetchMedicines();
  }, []);

  const handleAddToCart = (medicine: Medicine) => {
    // Convertir l'objet Medicine en CartItem en ajoutant les propriétés manquantes
    addToCart({
      id: String(medicine.id), // Convertir en string pour correspondre au type CartItem
      name: medicine.name,
      price: medicine.price,
      quantity: 1, // Ajouter un article par défaut
      image: medicine.image,
      brand: medicine.brand,
      pharmacy: medicine.pharmacy,
      pharmacy_id: medicine.pharmacy_id || "unknown" // Utiliser pharmacy_id s'il existe, sinon "unknown"
    });
    
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
              Découvrez les médicaments proposés par nos pharmacies partenaires
            </p>
          </div>
          <Button
            variant="outline"
            onClick={() => navigate("/medicines")}
          >
            Voir tous les médicaments
          </Button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-benin-green"></div>
          </div>
        ) : medicines.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {medicines.map((medicine) => (
              <MedicineCard 
                key={medicine.id}
                medicine={medicine} 
                onAddToCart={handleAddToCart} 
              />
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

export default PopularMedicines;
