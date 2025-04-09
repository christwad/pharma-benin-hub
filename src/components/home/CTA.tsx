import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface CTAButtonProps {
  text: string;
  path: string;
  className?: string;
}

const CTAButton = ({ text, path, className }: CTAButtonProps) => {
  const navigate = useNavigate();
  
  return (
    <Button
      size="lg"
      className={`bg-white text-benin-green hover:bg-white/90 hover:text-benin-green/90 ${className}`}
      onClick={() => navigate(path)}
    >
      {text}
    </Button>
  );
};

const CTA = () => {
  return (
    <section className="bg-gradient-to-r from-benin-green to-benin-green/90 py-20 text-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-white"></div>
        <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-white"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl">
            Rejoignez PharmaBenin aujourd'hui
          </h2>
          <p className="mb-10 text-lg">
            Que vous soyez un client à la recherche de médicaments ou une pharmacie souhaitant améliorer sa visibilité,
            PharmaBenin est la plateforme qu'il vous faut.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <CTAButton 
              text="Se connecter" 
              path="/login" 
              className="bg-white text-benin-green hover:bg-white/90 hover:text-benin-green/90 transition-all hover:shadow-md"
            />
            <CTAButton 
              text="Créer un compte" 
              path="/register" 
              className="bg-medical-medium hover:bg-medical-medium/90 text-white transition-all hover:shadow-md"
            />
            <CTAButton 
              text="Inscrire ma pharmacie" 
              path="/pharmacy-signup" 
              className="bg-benin-yellow hover:bg-benin-yellow/90 text-benin-green transition-all hover:shadow-md"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
