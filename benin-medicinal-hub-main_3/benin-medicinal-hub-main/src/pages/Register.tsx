
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { User, ShieldCheck, Landmark, ArrowRight } from "lucide-react";

const Register = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("client");
  
  // Client form state
  const [clientForm, setClientForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  
  // Pharmacy form state
  const [pharmacyForm, setPharmacyForm] = useState({
    pharmacyName: "",
    ownerName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    password: "",
    confirmPassword: "",
    licenseNumber: "",
  });
  
  const handleClientInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setClientForm(prev => ({ ...prev, [name]: value }));
  };
  
  const handlePharmacyInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPharmacyForm(prev => ({ ...prev, [name]: value }));
  };
  
  const handleClientSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (clientForm.password !== clientForm.confirmPassword) {
      toast({
        title: "Erreur",
        description: "Les mots de passe ne correspondent pas",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Inscription réussie!",
        description: "Votre compte a été créé avec succès. Vous pouvez maintenant vous connecter.",
      });
      
      // Reset form
      setClientForm({
        fullName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
      });
      
      // Redirect to login (in a real app)
      // history.push("/login");
    }, 1500);
  };
  
  const handlePharmacySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (pharmacyForm.password !== pharmacyForm.confirmPassword) {
      toast({
        title: "Erreur",
        description: "Les mots de passe ne correspondent pas",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Demande d'inscription reçue!",
        description: "Votre demande a été soumise avec succès. Elle sera examinée par notre équipe dans les plus brefs délais.",
      });
      
      // Reset form
      setPharmacyForm({
        pharmacyName: "",
        ownerName: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        password: "",
        confirmPassword: "",
        licenseNumber: "",
      });
    }, 1500);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Créer un compte</h1>
            <p className="text-gray-600 mt-2">
              Rejoignez PharmaBenin et accédez à tous nos services
            </p>
          </div>
          
          <Tabs defaultValue="client" className="w-full" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-2 w-full max-w-md mx-auto mb-8">
              <TabsTrigger value="client" className="flex items-center">
                <User className="h-4 w-4 mr-2" />
                Client
              </TabsTrigger>
              <TabsTrigger value="pharmacy" className="flex items-center">
                <Landmark className="h-4 w-4 mr-2" />
                Pharmacie
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="client">
              <Card>
                <CardHeader>
                  <CardTitle>Inscription Client</CardTitle>
                  <CardDescription>
                    Créez un compte client pour commander vos médicaments en ligne
                  </CardDescription>
                </CardHeader>
                <form onSubmit={handleClientSubmit}>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Nom complet</Label>
                      <Input
                        id="fullName"
                        name="fullName"
                        value={clientForm.fullName}
                        onChange={handleClientInputChange}
                        placeholder="Jean Dupont"
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={clientForm.email}
                          onChange={handleClientInputChange}
                          placeholder="jean.dupont@example.com"
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="phone">Téléphone</Label>
                        <Input
                          id="phone"
                          name="phone"
                          value={clientForm.phone}
                          onChange={handleClientInputChange}
                          placeholder="+229 97 12 34 56"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="password">Mot de passe</Label>
                        <Input
                          id="password"
                          name="password"
                          type="password"
                          value={clientForm.password}
                          onChange={handleClientInputChange}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
                        <Input
                          id="confirmPassword"
                          name="confirmPassword"
                          type="password"
                          value={clientForm.confirmPassword}
                          onChange={handleClientInputChange}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 mt-4">
                      <input type="checkbox" id="terms" className="h-4 w-4" required />
                      <Label htmlFor="terms" className="text-sm">
                        J'accepte les <Link to="#" className="text-blue-600 hover:underline">conditions d'utilisation</Link> et la <Link to="#" className="text-blue-600 hover:underline">politique de confidentialité</Link>
                      </Label>
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col space-y-4">
                    <Button 
                      type="submit" 
                      className="w-full bg-benin-green hover:bg-benin-green/90" 
                      disabled={isLoading}
                    >
                      {isLoading ? "Inscription en cours..." : "S'inscrire"}
                    </Button>
                    
                    <div className="text-center text-sm">
                      Vous avez déjà un compte?{" "}
                      <Link to="/login" className="text-blue-600 hover:underline">
                        Se connecter
                      </Link>
                    </div>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>
            
            <TabsContent value="pharmacy">
              <Card>
                <CardHeader>
                  <CardTitle>Inscription Pharmacie</CardTitle>
                  <CardDescription>
                    Créez un compte pour votre pharmacie et gérez vos produits en ligne
                  </CardDescription>
                </CardHeader>
                <form onSubmit={handlePharmacySubmit}>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="pharmacyName">Nom de la pharmacie</Label>
                      <Input
                        id="pharmacyName"
                        name="pharmacyName"
                        value={pharmacyForm.pharmacyName}
                        onChange={handlePharmacyInputChange}
                        placeholder="Pharmacie Centrale"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="ownerName">Nom du propriétaire</Label>
                      <Input
                        id="ownerName"
                        name="ownerName"
                        value={pharmacyForm.ownerName}
                        onChange={handlePharmacyInputChange}
                        placeholder="Dr. Jean Dupont"
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="pharmacy-email">Email</Label>
                        <Input
                          id="pharmacy-email"
                          name="email"
                          type="email"
                          value={pharmacyForm.email}
                          onChange={handlePharmacyInputChange}
                          placeholder="pharmacie@example.com"
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="pharmacy-phone">Téléphone</Label>
                        <Input
                          id="pharmacy-phone"
                          name="phone"
                          value={pharmacyForm.phone}
                          onChange={handlePharmacyInputChange}
                          placeholder="+229 97 12 34 56"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="address">Adresse</Label>
                        <Input
                          id="address"
                          name="address"
                          value={pharmacyForm.address}
                          onChange={handlePharmacyInputChange}
                          placeholder="123 Rue du Commerce"
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="city">Ville</Label>
                        <Input
                          id="city"
                          name="city"
                          value={pharmacyForm.city}
                          onChange={handlePharmacyInputChange}
                          placeholder="Cotonou"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="licenseNumber">Numéro de licence</Label>
                      <Input
                        id="licenseNumber"
                        name="licenseNumber"
                        value={pharmacyForm.licenseNumber}
                        onChange={handlePharmacyInputChange}
                        placeholder="PHARM-123456"
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="pharmacy-password">Mot de passe</Label>
                        <Input
                          id="pharmacy-password"
                          name="password"
                          type="password"
                          value={pharmacyForm.password}
                          onChange={handlePharmacyInputChange}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="pharmacy-confirmPassword">Confirmer le mot de passe</Label>
                        <Input
                          id="pharmacy-confirmPassword"
                          name="confirmPassword"
                          type="password"
                          value={pharmacyForm.confirmPassword}
                          onChange={handlePharmacyInputChange}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 mt-4">
                      <input type="checkbox" id="pharmacy-terms" className="h-4 w-4" required />
                      <Label htmlFor="pharmacy-terms" className="text-sm">
                        J'accepte les <Link to="#" className="text-blue-600 hover:underline">conditions d'utilisation</Link> et la <Link to="#" className="text-blue-600 hover:underline">politique de confidentialité</Link>
                      </Label>
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col space-y-4">
                    <Button 
                      type="submit" 
                      className="w-full bg-benin-green hover:bg-benin-green/90" 
                      disabled={isLoading}
                    >
                      {isLoading ? "Inscription en cours..." : "Soumettre la demande"}
                    </Button>
                    
                    <div className="text-center text-sm">
                      Pour plus d'informations sur le processus d'inscription des pharmacies,{" "}
                      <Link to="/contact" className="text-blue-600 hover:underline">
                        contactez-nous
                      </Link>
                    </div>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>
          </Tabs>
          
          <div className="text-center mt-8">
            <Link to="/pharmacy-register" className="inline-flex items-center text-benin-green hover:text-benin-green/80">
              <ShieldCheck className="h-5 w-5 mr-2" />
              Informations sur l'inscription des pharmacies
              <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
