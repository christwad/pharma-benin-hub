
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Adéola Hounsou",
    role: "Client",
    quote:
      "PharmaBenin m'a sauvé tellement de temps. Je peux maintenant commander les médicaments pour ma famille sans faire la queue pendant des heures.",
    rating: 5,
    avatar: "/placeholder.svg",
  },
  {
    id: 2,
    name: "Dr. Kofi Mensah",
    role: "Médecin",
    quote:
      "Grâce à cette plateforme, je peux vérifier la disponibilité des médicaments que je prescris à mes patients. C'est un outil incroyable.",
    rating: 5,
    avatar: "/placeholder.svg",
  },
  {
    id: 3,
    name: "Bénédicte Amoussou",
    role: "Pharmacienne",
    quote:
      "PharmaBenin nous a permis d'augmenter notre visibilité et de mieux gérer nos stocks. Nos clients sont plus satisfaits que jamais.",
    rating: 4,
    avatar: "/placeholder.svg",
  },
];

const Testimonials = () => {
  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900">
            Ce que disent nos utilisateurs
          </h2>
          <p className="mx-auto max-w-2xl text-gray-600">
            Découvrez les témoignages de nos clients et partenaires qui utilisent PharmaBenin au quotidien.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="card-hover overflow-hidden">
              <CardContent className="p-6">
                <div className="mb-4 flex items-center space-x-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < testimonial.rating
                          ? "fill-amber-400 text-amber-400"
                          : "fill-gray-200 text-gray-200"
                      }`}
                    />
                  ))}
                </div>
                <p className="mb-6 text-gray-700">"{testimonial.quote}"</p>
                <div className="flex items-center space-x-4">
                  <div className="h-12 w-12 overflow-hidden rounded-full bg-gray-200">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
