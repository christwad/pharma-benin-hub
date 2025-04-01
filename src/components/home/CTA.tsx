
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface CTAButtonProps {
  text: string;
  path: string;
}

const CTAButton = ({ text, path }: CTAButtonProps) => {
  const navigate = useNavigate();
  
  return (
    <Button
      size="lg"
      className="bg-benin-green hover:bg-benin-green/90 text-white transition-all hover:shadow-md"
      onClick={() => navigate(path)}
    >
      {text}
    </Button>
  );
};

const CTA = () => {
  return (
    <section className="bg-gradient-to-r from-benin-green to-benin-green/90 py-16 text-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-white"></div>
        <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-white"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-6 text-3xl font-bold tracking-tight sm:text-4xl">
            Rejoignez PharmaBenin aujourd'hui
          </h2>
          <p className="mb-8 text-lg">
            Que vous soyez un client à la recherche de médicaments ou une pharmacie souhaitant améliorer sa visibilité,
            PharmaBenin est la plateforme qu'il vous faut.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <CTAButton text="Se connecter" path="/login" />
            <CTAButton text="Créer un compte" path="/register" />
            <CTAButton text="Inscrire ma pharmacie" path="/pharmacy-signup" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
