
import React, { useState, useEffect } from "react";
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
import { Shield, Lock, Mail, AlertCircle, ExternalLink } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useAuth } from "@/contexts/AuthContext";
import { isConfigMissing } from "@/lib/supabase";

const AdminLogin = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const { signIn, profile, user } = useAuth();

  // Admin form state
  const [adminForm, setAdminForm] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  // Rediriger si l'utilisateur est déjà connecté en tant qu'admin
  useEffect(() => {
    if (user && profile?.role === 'admin') {
      navigate('/admin');
    }
  }, [user, profile, navigate]);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setLoginError(null);

    // Vérifier si Supabase est configuré
    if (isConfigMissing) {
      setLoginError("Supabase n'est pas configuré. Veuillez connecter votre projet à Supabase via le bouton vert en haut à droite.");
      setIsLoading(false);
      return;
    }

    try {
      const { error } = await signIn(adminForm.email, adminForm.password);
      
      if (error) {
        setLoginError(error.message || "Email ou mot de passe incorrect");
        toast({
          title: "Échec de la connexion",
          description: error.message || "Email ou mot de passe incorrect",
          variant: "destructive",
        });
      } else {
        // La vérification du rôle se fait dans le useEffect
        toast({
          title: "Connexion réussie!",
          description: "Bienvenue sur le panneau d'administration.",
        });
      }
    } catch (error: any) {
      setLoginError(error.message || "Une erreur s'est produite lors de la connexion");
      toast({
        title: "Erreur",
        description: error.message || "Une erreur s'est produite lors de la connexion",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
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

          {isConfigMissing && (
            <Alert variant="destructive" className="mb-6 border-red-500 bg-red-50">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Erreur de configuration</AlertTitle>
              <AlertDescription className="space-y-2">
                <p>Supabase n'est pas configuré correctement.</p>
                <p className="font-semibold">Pour résoudre ce problème:</p>
                <ol className="list-decimal list-inside space-y-1 pl-2">
                  <li>Cliquez sur le bouton vert Supabase en haut à droite de l'interface</li>
                  <li>Connectez votre projet à Supabase</li>
                  <li>Les variables d'environnement seront automatiquement configurées</li>
                </ol>
              </AlertDescription>
            </Alert>
          )}

          {loginError && !isConfigMissing && (
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
                      disabled={isConfigMissing}
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
                      disabled={isConfigMissing}
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
                    disabled={isConfigMissing}
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
                  disabled={isLoading || isConfigMissing}
                >
                  {isLoading ? "Connexion en cours..." : "Se connecter"}
                </Button>
                
                {isConfigMissing && (
                  <div className="text-center text-sm">
                    <a 
                      href="#" 
                      onClick={(e) => {
                        e.preventDefault();
                        toast({
                          title: "Configuration requise",
                          description: "Cliquez sur le bouton vert Supabase en haut à droite pour configurer votre projet.",
                        });
                      }}
                      className="inline-flex items-center text-benin-green hover:underline"
                    >
                      Comment configurer Supabase?
                      <ExternalLink className="ml-1 h-3 w-3" />
                    </a>
                  </div>
                )}
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
