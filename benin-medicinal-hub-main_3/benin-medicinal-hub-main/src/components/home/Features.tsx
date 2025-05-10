
import React from "react";
import { 
  MapPin, 
  ShoppingCart, 
  Clock, 
  Truck, 
  CreditCard, 
  Search 
} from "lucide-react";

const features = [
  {
    icon: <Search className="h-10 w-10 text-benin-green" />,
    title: "Recherche facile",
    description:
      "Trouvez rapidement les médicaments dont vous avez besoin grâce à notre moteur de recherche.",
  },
  {
    icon: <MapPin className="h-10 w-10 text-benin-green" />,
    title: "Pharmacies locales",
    description:
      "Découvrez les pharmacies près de chez vous et consultez leurs stocks en temps réel.",
  },
  {
    icon: <ShoppingCart className="h-10 w-10 text-benin-green" />,
    title: "Commande en ligne",
    description:
      "Commandez vos médicaments en ligne et évitez les déplacements inutiles.",
  },
  {
    icon: <Clock className="h-10 w-10 text-benin-green" />,
    title: "Click & Collect",
    description:
      "Récupérez votre commande en pharmacie sans faire la queue.",
  },
  {
    icon: <Truck className="h-10 w-10 text-benin-green" />,
    title: "Livraison à domicile",
    description:
      "Faites-vous livrer vos médicaments directement chez vous.",
  },
  {
    icon: <CreditCard className="h-10 w-10 text-benin-green" />,
    title: "Paiement sécurisé",
    description:
      "Payez en toute sécurité par Mobile Money ou carte bancaire.",
  },
];

const Features = () => {
  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900">
            Nos Services
          </h2>
          <p className="mx-auto max-w-2xl text-gray-600">
            PharmaBenin vous propose une gamme de services pour faciliter l'accès aux médicaments.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="card-hover rounded-lg bg-white p-6 shadow-md"
            >
              <div className="mb-4 rounded-full bg-medical-light p-3 inline-flex">
                {feature.icon}
              </div>
              <h3 className="mb-2 text-xl font-semibold text-gray-900">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
