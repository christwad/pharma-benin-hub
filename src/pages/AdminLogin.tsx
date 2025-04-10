
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { useToast } from "@/components/ui/use-toast";
import { Shield, Lock, Mail, AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const AdminLogin = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  // Admin form state
  const [adminForm, setAdminForm] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value, type, checked } = e.target;
    setAdminForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setLoginError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setLoginError(null);

    // Simuler l'appel API
    setTimeout(() => {
      setIsLoading(false);
      
      // Demo login - dans une application réelle, cela validerait les informations d'identification avec un backend
      if (adminForm.email === "admin@example.com" && adminForm.password === "adminpass") {
        // Définir le type d'utilisateur dans localStorage pour limiter l'accès
        localStorage.setItem("userType", "admin");
        localStorage.setItem("userEmail", adminForm.email);
        
        toast({
          title: "Connexion administrateur réussie!",
          description: "Bienvenue sur le panneau d'administration.",
        });
        
        // Rediriger vers le tableau de bord d'administration
        navigate("/admin");
      } else {
        setLoginError("Email ou mot de passe incorrect.");
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
            <h1 className="text-3xl font-bold text-benin-green mb-2">Administration</h1>
            <p className="text-gray-600">
              Connectez-vous au panneau d'administration
            </p>
          </div>

          {loginError && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Erreur</AlertTitle>
              <AlertDescription>{loginError}</AlertDescription>
            </Alert>
          )}

          <Card className="border-benin-green/20 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-benin-green/10 to-medical-medium/10 rounded-t-lg">
              <div className="flex items-center justify-center mb-4">
                <Shield className="h-12 w-12 text-benin-green" />
              </div>
              <CardTitle className="text-center text-benin-green">Connexion Administrateur</CardTitle>
              <CardDescription className="text-center">
                Accédez au panneau d'administration de PharmaBenin
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4 pt-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-700">Adresse email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-benin-green" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={adminForm.email}
                      onChange={handleInputChange}
                      placeholder="admin@example.com"
                      className="pl-10 border-benin-green/30 focus:border-benin-green focus:ring-benin-green/20"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-gray-700">Mot de passe</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-benin-green" />
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      value={adminForm.password}
                      onChange={handleInputChange}
                      className="pl-10 border-benin-green/30 focus:border-benin-green focus:ring-benin-green/20"
                      required
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="rememberMe"
                    name="rememberMe"
                    checked={adminForm.rememberMe}
                    onChange={handleInputChange}
                    className="h-4 w-4 rounded border-benin-green/30 text-benin-green focus:ring-benin-green/20"
                  />
                  <Label htmlFor="rememberMe" className="text-sm text-gray-600">
                    Se souvenir de moi
                  </Label>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4 bg-gray-50 rounded-b-lg pt-4">
                <Button
                  type="submit"
                  className="w-full bg-benin-green hover:bg-benin-green/90"
                  disabled={isLoading}
                >
                  {isLoading ? "Connexion en cours..." : "Se connecter"}
                </Button>
              </CardFooter>
            </form>
          </Card>

          <div className="mt-8 text-center text-sm text-gray-500">
            Espace réservé aux administrateurs autorisés.
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminLogin;
