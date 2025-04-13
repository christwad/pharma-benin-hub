import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { User, Landmark, Lock, Mail, AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useAuth } from "@/contexts/AuthContext";

const Login = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("connexion");
  const { signIn, signUp, user } = useAuth();

  useEffect(() => {
    if (user) {
      navigate('/client-dashboard');
    }
  }, [user, navigate]);

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [registerForm, setRegisterForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  });

  const [pharmacyForm, setPharmacyForm] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const handleLoginInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setLoginForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setLoginError(null);
  };

  const handleRegisterInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setRegisterForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setLoginError(null);
  };

  const handlePharmacyInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setPharmacyForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setLoginError(null);
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setLoginError(null);

    try {
      const { error } = await signIn(loginForm.email, loginForm.password);
      
      if (error) {
        setLoginError(error.message || "Email ou mot de passe incorrect");
        toast({
          title: "Échec de la connexion",
          description: error.message || "Email ou mot de passe incorrect",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Connexion réussie!",
          description: "Bienvenue sur votre espace client.",
        });
        navigate("/client-dashboard");
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

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setLoginError(null);

    if (registerForm.password !== registerForm.confirmPassword) {
      setIsLoading(false);
      setLoginError("Les mots de passe ne correspondent pas.");
      toast({
        title: "Erreur d'inscription",
        description: "Les mots de passe ne correspondent pas.",
        variant: "destructive",
      });
      return;
    }

    if (!registerForm.acceptTerms) {
      setIsLoading(false);
      setLoginError("Vous devez accepter les conditions d'utilisation.");
      toast({
        title: "Erreur d'inscription",
        description: "Vous devez accepter les conditions d'utilisation.",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await signUp(
        registerForm.email, 
        registerForm.password, 
        {
          full_name: registerForm.name,
          phone_number: registerForm.phone,
          role: 'client'
        }
      );
      
      if (error) {
        setLoginError(error.message || "Erreur lors de l'inscription");
        toast({
          title: "Erreur d'inscription",
          description: error.message || "Erreur lors de l'inscription",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Inscription réussie!",
          description: "Veuillez vérifier votre email pour confirmer votre compte.",
        });
        setActiveTab("connexion");
      }
    } catch (error: any) {
      setLoginError(error.message || "Une erreur s'est produite lors de l'inscription");
      toast({
        title: "Erreur",
        description: error.message || "Une erreur s'est produite lors de l'inscription",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePharmacySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setLoginError(null);

    try {
      const { error } = await signIn(pharmacyForm.email, pharmacyForm.password);
      
      if (error) {
        setLoginError(error.message || "Email ou mot de passe incorrect");
        toast({
          title: "Échec de la connexion",
          description: error.message || "Email ou mot de passe incorrect",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Connexion réussie!",
          description: "Bienvenue sur votre espace pharmacie.",
        });
        navigate("/pharmacy-dashboard");
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

  if (user) return null;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 bg-gradient-to-b from-medical-light/30 to-transparent rounded-lg">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-benin-green mb-2">Espace Client</h1>
            <p className="text-gray-600">
              Connectez-vous ou créez un compte client PharmaBenin
            </p>
          </div>

          {loginError && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Erreur</AlertTitle>
              <AlertDescription>{loginError}</AlertDescription>
            </Alert>
          )}

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="connexion" className="text-base">Se connecter</TabsTrigger>
              <TabsTrigger value="inscription" className="text-base">Créer un compte</TabsTrigger>
            </TabsList>
            
            <TabsContent value="connexion">
              <Card className="border-benin-green/20 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-benin-green/10 to-medical-medium/10 rounded-t-lg">
                  <div className="flex items-center justify-center mb-4">
                    <User className="h-12 w-12 text-benin-green" />
                  </div>
                  <CardTitle className="text-center text-benin-green">Connexion Client</CardTitle>
                  <CardDescription className="text-center">
                    Connectez-vous à votre espace client
                  </CardDescription>
                </CardHeader>
                <form onSubmit={handleLoginSubmit}>
                  <CardContent className="space-y-4 pt-6">
                    <div className="space-y-2">
                      <Label htmlFor="login-email" className="text-gray-700">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-benin-green" />
                        <Input
                          id="login-email"
                          name="email"
                          type="email"
                          value={loginForm.email}
                          onChange={handleLoginInputChange}
                          placeholder="client@example.com"
                          className="pl-10 border-benin-green/30 focus:border-benin-green focus:ring-benin-green/20"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label htmlFor="login-password" className="text-gray-700">Mot de passe</Label>
                        <Link
                          to="/forgot-password"
                          className="text-xs text-benin-green hover:underline"
                        >
                          Mot de passe oublié?
                        </Link>
                      </div>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-benin-green" />
                        <Input
                          id="login-password"
                          name="password"
                          type="password"
                          value={loginForm.password}
                          onChange={handleLoginInputChange}
                          className="pl-10 border-benin-green/30 focus:border-benin-green focus:ring-benin-green/20"
                          required
                        />
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="login-rememberMe"
                        name="rememberMe"
                        checked={loginForm.rememberMe}
                        onChange={handleLoginInputChange}
                        className="h-4 w-4 rounded border-benin-green/30 text-benin-green focus:ring-benin-green/20"
                      />
                      <Label htmlFor="login-rememberMe" className="text-sm text-gray-600">
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
            </TabsContent>
            
            <TabsContent value="inscription">
              <Card className="border-benin-green/20 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-benin-green/10 to-medical-medium/10 rounded-t-lg">
                  <div className="flex items-center justify-center mb-4">
                    <User className="h-12 w-12 text-benin-green" />
                  </div>
                  <CardTitle className="text-center text-benin-green">Créer un compte client</CardTitle>
                  <CardDescription className="text-center">
                    Inscrivez-vous pour commander des médicaments en ligne
                  </CardDescription>
                </CardHeader>
                <form onSubmit={handleRegisterSubmit}>
                  <CardContent className="space-y-4 pt-6">
                    <div className="space-y-2">
                      <Label htmlFor="register-name" className="text-gray-700">Nom complet</Label>
                      <Input
                        id="register-name"
                        name="name"
                        type="text"
                        value={registerForm.name}
                        onChange={handleRegisterInputChange}
                        className="border-benin-green/30 focus:border-benin-green focus:ring-benin-green/20"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="register-email" className="text-gray-700">Email</Label>
                      <Input
                        id="register-email"
                        name="email"
                        type="email"
                        value={registerForm.email}
                        onChange={handleRegisterInputChange}
                        className="border-benin-green/30 focus:border-benin-green focus:ring-benin-green/20"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="register-phone" className="text-gray-700">Téléphone</Label>
                      <Input
                        id="register-phone"
                        name="phone"
                        type="tel"
                        value={registerForm.phone}
                        onChange={handleRegisterInputChange}
                        className="border-benin-green/30 focus:border-benin-green focus:ring-benin-green/20"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="register-password" className="text-gray-700">Mot de passe</Label>
                        <Input
                          id="register-password"
                          name="password"
                          type="password"
                          value={registerForm.password}
                          onChange={handleRegisterInputChange}
                          className="border-benin-green/30 focus:border-benin-green focus:ring-benin-green/20"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="register-confirmPassword" className="text-gray-700">Confirmer</Label>
                        <Input
                          id="register-confirmPassword"
                          name="confirmPassword"
                          type="password"
                          value={registerForm.confirmPassword}
                          onChange={handleRegisterInputChange}
                          className="border-benin-green/30 focus:border-benin-green focus:ring-benin-green/20"
                          required
                        />
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="register-acceptTerms"
                        name="acceptTerms"
                        checked={registerForm.acceptTerms}
                        onChange={handleRegisterInputChange}
                        className="h-4 w-4 rounded border-benin-green/30 text-benin-green focus:ring-benin-green/20"
                        required
                      />
                      <Label htmlFor="register-acceptTerms" className="text-sm text-gray-600">
                        J'accepte les{" "}
                        <Link to="#" className="text-benin-green hover:underline">
                          conditions d'utilisation
                        </Link>
                      </Label>
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col space-y-4 bg-gray-50 rounded-b-lg pt-4">
                    <p className="text-xs text-gray-500 italic text-center">
                      Votre compte sera soumis à validation par un administrateur
                    </p>
                    <Button
                      type="submit"
                      className="w-full bg-benin-green hover:bg-benin-green/90"
                      disabled={isLoading}
                    >
                      {isLoading ? "Inscription en cours..." : "Créer un compte"}
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-700 mb-4">Vous êtes une pharmacie ?</p>
            <Link to="/pharmacy-signup">
              <Button variant="outline" className="border-benin-green text-benin-green hover:bg-benin-green hover:text-white">
                <Landmark className="mr-2 h-4 w-4" />
                Espace Pharmacie
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
