
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
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { User, Landmark, Lock, Mail } from "lucide-react";

const Login = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("client");

  // Client form state
  const [clientForm, setClientForm] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  // Pharmacy form state
  const [pharmacyForm, setPharmacyForm] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const handleClientInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value, type, checked } = e.target;
    setClientForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handlePharmacyInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value, type, checked } = e.target;
    setPharmacyForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleClientSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      
      // Demo login - in a real app, this would validate credentials with a backend
      if (clientForm.email === "demo@example.com" && clientForm.password === "password") {
        toast({
          title: "Connexion réussie!",
          description: "Bienvenue sur PharmaBenin.",
        });
        // Redirect to home or dashboard (in a real app)
        // history.push("/account");
      } else {
        toast({
          title: "Échec de la connexion",
          description: "Email ou mot de passe incorrect.",
          variant: "destructive",
        });
      }
    }, 1500);
  };

  const handlePharmacySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      
      // Demo login - in a real app, this would validate credentials with a backend
      if (pharmacyForm.email === "pharmacy@example.com" && pharmacyForm.password === "password") {
        toast({
          title: "Connexion réussie!",
          description: "Bienvenue sur votre espace pharmacie.",
        });
        // Redirect to pharmacy dashboard (in a real app)
        // history.push("/account");
      } else {
        toast({
          title: "Échec de la connexion",
          description: "Email ou mot de passe incorrect.",
          variant: "destructive",
        });
      }
    }, 1500);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Connexion</h1>
            <p className="text-gray-600 mt-2">
              Connectez-vous à votre compte PharmaBenin
            </p>
          </div>

          <Tabs defaultValue="client" className="w-full" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-2 w-full mb-8">
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
                  <CardTitle>Connexion Client</CardTitle>
                  <CardDescription>
                    Accédez à votre compte client pour commander vos médicaments
                  </CardDescription>
                </CardHeader>
                <form onSubmit={handleClientSubmit}>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={clientForm.email}
                          onChange={handleClientInputChange}
                          placeholder="votre.email@example.com"
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label htmlFor="password">Mot de passe</Label>
                        <Link
                          to="/forgot-password"
                          className="text-xs text-blue-600 hover:underline"
                        >
                          Mot de passe oublié?
                        </Link>
                      </div>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                        <Input
                          id="password"
                          name="password"
                          type="password"
                          value={clientForm.password}
                          onChange={handleClientInputChange}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="rememberMe"
                        name="rememberMe"
                        checked={clientForm.rememberMe}
                        onChange={handleClientInputChange}
                        className="h-4 w-4"
                      />
                      <Label htmlFor="rememberMe" className="text-sm">
                        Se souvenir de moi
                      </Label>
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col space-y-4">
                    <Button
                      type="submit"
                      className="w-full bg-benin-green hover:bg-benin-green/90"
                      disabled={isLoading}
                    >
                      {isLoading ? "Connexion en cours..." : "Se connecter"}
                    </Button>
                    
                    <div className="text-center text-sm">
                      Vous n'avez pas de compte?{" "}
                      <Link to="/register" className="text-blue-600 hover:underline">
                        S'inscrire
                      </Link>
                    </div>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>

            <TabsContent value="pharmacy">
              <Card>
                <CardHeader>
                  <CardTitle>Connexion Pharmacie</CardTitle>
                  <CardDescription>
                    Accédez à votre espace pharmacie pour gérer vos produits
                  </CardDescription>
                </CardHeader>
                <form onSubmit={handlePharmacySubmit}>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="pharmacy-email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                        <Input
                          id="pharmacy-email"
                          name="email"
                          type="email"
                          value={pharmacyForm.email}
                          onChange={handlePharmacyInputChange}
                          placeholder="pharmacie@example.com"
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label htmlFor="pharmacy-password">Mot de passe</Label>
                        <Link
                          to="/forgot-password"
                          className="text-xs text-blue-600 hover:underline"
                        >
                          Mot de passe oublié?
                        </Link>
                      </div>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                        <Input
                          id="pharmacy-password"
                          name="password"
                          type="password"
                          value={pharmacyForm.password}
                          onChange={handlePharmacyInputChange}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="pharmacy-rememberMe"
                        name="rememberMe"
                        checked={pharmacyForm.rememberMe}
                        onChange={handlePharmacyInputChange}
                        className="h-4 w-4"
                      />
                      <Label htmlFor="pharmacy-rememberMe" className="text-sm">
                        Se souvenir de moi
                      </Label>
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col space-y-4">
                    <Button
                      type="submit"
                      className="w-full bg-benin-green hover:bg-benin-green/90"
                      disabled={isLoading}
                    >
                      {isLoading ? "Connexion en cours..." : "Se connecter"}
                    </Button>
                    
                    <div className="text-center text-sm">
                      Pas encore partenaire?{" "}
                      <Link to="/pharmacy-register" className="text-blue-600 hover:underline">
                        Devenir partenaire
                      </Link>
                    </div>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="mt-8 text-center text-sm text-gray-500">
            En vous connectant, vous acceptez nos{" "}
            <Link to="#" className="text-blue-600 hover:underline">
              conditions d'utilisation
            </Link>{" "}
            et notre{" "}
            <Link to="#" className="text-blue-600 hover:underline">
              politique de confidentialité
            </Link>
            .
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
