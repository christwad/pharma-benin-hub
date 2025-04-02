
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
      <div className="hero-gradient absolute inset-0 opacity-20"></div>
      <div className="container relative mx-auto px-4 py-16 sm:py-24">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <div className="space-y-6">
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
          
          <div className="hidden items-center justify-center md:flex">
            <div className="relative h-96 w-96 rounded-full bg-benin-green/10 p-4">
              <div className="animate-pulse-slow absolute -top-6 left-1/2 h-24 w-24 -translate-x-1/2 rounded-full bg-medical-medium"></div>
              <div className="animate-pulse-slow absolute -right-6 top-1/2 h-20 w-20 -translate-y-1/2 rounded-full bg-benin-yellow"></div>
              <div className="animate-pulse-slow absolute -bottom-6 left-1/2 h-16 w-16 -translate-x-1/2 rounded-full bg-benin-red"></div>
              <div className="flex h-full w-full items-center justify-center rounded-full bg-white shadow-xl">
                <img
                  src="/lovable-uploads/db0dd2a6-c5b1-473a-b480-dfe3585f5c23.png"
                  alt="PharmaBenin Logo Animé"
                  className="h-56 w-56 object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
