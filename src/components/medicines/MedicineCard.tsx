
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/hooks/use-cart";

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

interface MedicineCardProps {
  medicine: Medicine;
  onAddToCart: (medicine: Medicine) => void;
}

const MedicineCard = ({ medicine, onAddToCart }: MedicineCardProps) => {
  const navigate = useNavigate();

  return (
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
        <p className="text-xs text-gray-500 mt-1">
          Fourni par: {medicine.pharmacy}
        </p>
        <div className="mt-2 flex items-center justify-between">
          <p className="text-lg font-bold text-benin-green">
            {medicine.price.toLocaleString()} FCFA
          </p>
          {medicine.available && (
            <Button
              size="icon"
              className="rounded-full"
              onClick={() => onAddToCart(medicine)}
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
  );
};

export default MedicineCard;
