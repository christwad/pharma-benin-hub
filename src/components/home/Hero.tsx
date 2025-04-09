
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
    <section className="relative bg-gradient-to-b from-medical-light to-white py-16 sm:py-20">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/lovable-uploads/5f2d7c9e-8757-47d2-b0c6-8eda77b9d088.png')] bg-cover bg-center opacity-10"></div>
      </div>
      
      <div className="container relative mx-auto px-4 z-10">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold tracking-tight text-benin-green mb-6 sm:text-5xl md:text-6xl">
            Trouvez vos médicaments facilement au{" "}
            <span className="bg-gradient-to-r from-benin-green to-medical-dark bg-clip-text text-transparent">
              Bénin
            </span>
          </h1>
          
          <p className="text-lg text-gray-600 mb-8 max-w-2xl">
            Une plateforme qui connecte les pharmacies locales et les clients pour faciliter
            l'accès aux médicaments au Bénin. Commandez en ligne et faites-vous livrer !
          </p>
          
          <form onSubmit={handleSearch} className="flex w-full max-w-lg mb-8 gap-2 bg-white rounded-lg shadow-lg p-1">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Rechercher un médicament..."
                className="pl-10 border-none focus:ring-0 h-12 text-lg"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button 
              type="submit" 
              size="lg"
              variant="outline"
              className="border-benin-green text-benin-green hover:bg-benin-green hover:text-white"
            >
              Rechercher
            </Button>
          </form>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              variant="outline" 
              className="border-benin-green text-benin-green hover:bg-benin-green hover:text-white transition-colors gap-2" 
              onClick={() => navigate("/pharmacies")}
            >
              <MapPin className="h-4 w-4" />
              Trouver une pharmacie
            </Button>
            <Button 
              variant="outline" 
              className="border-benin-green text-benin-green hover:bg-benin-green hover:text-white transition-colors"
              onClick={() => navigate("/medicines")}
            >
              Voir les médicaments
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
