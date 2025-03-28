
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const CTA = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-benin-green py-16 text-white">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-6 text-3xl font-bold tracking-tight sm:text-4xl">
            Rejoignez PharmaBenin aujourd'hui
          </h2>
          <p className="mb-8 text-lg">
            Que vous soyez un client à la recherche de médicaments ou une pharmacie souhaitant améliorer sa visibilité,
            PharmaBenin est la plateforme qu'il vous faut.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              size="lg"
              variant="secondary"
              onClick={() => navigate("/login")}
            >
              Se connecter
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-benin-green"
              onClick={() => navigate("/register")}
            >
              Créer un compte
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-benin-green"
              onClick={() => navigate("/pharmacy-signup")}
            >
              Inscrire ma pharmacie
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
