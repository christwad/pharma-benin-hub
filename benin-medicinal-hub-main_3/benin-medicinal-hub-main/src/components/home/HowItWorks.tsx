
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Search, 
  ShoppingCart, 
  CreditCard, 
  Package 
} from "lucide-react";

const steps = [
  {
    id: 1,
    title: "Recherchez",
    description:
      "Cherchez des médicaments ou trouvez des pharmacies près de chez vous.",
    icon: <Search className="h-12 w-12 text-benin-green" />,
  },
  {
    id: 2,
    title: "Commandez",
    description:
      "Ajoutez les produits à votre panier et passez votre commande en quelques clics.",
    icon: <ShoppingCart className="h-12 w-12 text-benin-green" />,
  },
  {
    id: 3,
    title: "Payez",
    description:
      "Payez en toute sécurité via Mobile Money ou carte bancaire.",
    icon: <CreditCard className="h-12 w-12 text-benin-green" />,
  },
  {
    id: 4,
    title: "Récupérez",
    description:
      "Récupérez votre commande en pharmacie ou faites-vous livrer chez vous.",
    icon: <Package className="h-12 w-12 text-benin-green" />,
  },
];

const HowItWorks = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900">
            Comment ça marche
          </h2>
          <p className="mx-auto max-w-2xl text-gray-600">
            Suivez ces étapes simples pour commander vos médicaments sur PharmaBenin.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <Card key={step.id} className="card-hover relative overflow-hidden border-2 border-gray-100">
              <div className="absolute -right-4 -top-4 flex h-12 w-12 items-center justify-center rounded-full bg-benin-green text-xl font-bold text-white">
                {step.id}
              </div>
              <CardContent className="flex flex-col items-center p-6 pt-8 text-center">
                <div className="mb-4 rounded-full bg-medical-light p-4">
                  {step.icon}
                </div>
                <h3 className="mb-2 text-xl font-semibold">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
