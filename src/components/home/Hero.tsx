
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = React.useState("");
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <section className="relative overflow-hidden">
      <div className="bg-gradient-to-r from-medical-light to-medical-medium absolute top-0 left-0 right-0 h-80 w-full opacity-10"></div>
      <div className="container relative mx-auto px-4 py-8 sm:py-12">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Colonne gauche - Contenu et recherche */}
          <div className="space-y-6 z-10">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Trouvez vos médicaments facilement au{" "}
              <span className="bg-gradient-to-r from-benin-green to-medical-dark bg-clip-text text-transparent">
                Bénin
              </span>
            </h1>
            <p className="text-lg text-gray-600">
              Une plateforme qui connecte les pharmacies locales et les clients pour faciliter
              l'accès aux médicaments au Bénin.
            </p>
            
            <form onSubmit={handleSearch} className="flex w-full max-w-md gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Rechercher un médicament..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button type="submit">Rechercher</Button>
            </form>
            
            <div className="flex flex-wrap gap-4">
              <Button variant="outline" className="gap-2" onClick={() => navigate("/pharmacies")}>
                <MapPin className="h-4 w-4" />
                Trouver une pharmacie
              </Button>
              <Button variant="outline" onClick={() => navigate("/medicines")}>
                Voir les médicaments
              </Button>
            </div>
          </div>
          
          {/* Colonne droite - Image */}
          <div className="hidden lg:block relative">
            <div className="relative overflow-hidden rounded-2xl shadow-xl">
              <img
                src="/lovable-uploads/5f2d7c9e-8757-47d2-b0c6-8eda77b9d088.png"
                alt="Pharmacien aidant un client"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-benin-green/10 to-medical-dark/10"></div>
            </div>

            {/* Éléments décoratifs */}
            <div className="absolute -bottom-6 -left-6 h-24 w-24 rounded-full bg-benin-yellow/30 blur-xl"></div>
            <div className="absolute -top-6 -right-6 h-24 w-24 rounded-full bg-medical-medium/30 blur-xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
