
import React from "react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { User, Mail, Lock, ArrowRight } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

// Définir le schéma de validation
const formSchema = z.object({
  fullName: z.string().min(2, {
    message: "Le nom doit contenir au moins 2 caractères",
  }),
  email: z.string().email({
    message: "Veuillez entrer une adresse email valide",
  }),
  password: z.string().min(8, {
    message: "Le mot de passe doit contenir au moins 8 caractères",
  }),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirmPassword"],
});

const Register = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      // Simulation d'enregistrement (à remplacer par un appel API réel plus tard)
      console.log("Form values:", values);
      
      // Simule un délai d'enregistrement
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Compte créé avec succès!",
        description: "Vous pouvez maintenant vous connecter.",
      });
      
      // Redirection vers la page de connexion
      // navigate("/login");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur lors de l'inscription",
        description: "Une erreur est survenue. Veuillez réessayer.",
      });
      console.error("Registration error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-benin-green/5 to-benin-yellow/5 p-4">
      <Card className="w-full max-w-md shadow-lg border border-benin-green/10">
        <CardHeader className="space-y-1">
          <div className="w-full flex justify-center mb-4">
            <div className="h-12 w-12 rounded-full bg-benin-green flex items-center justify-center">
              <User className="h-6 w-6 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-center text-gray-900">Créer un compte</CardTitle>
          <CardDescription className="text-center text-gray-600">
            Entrez vos informations pour vous inscrire
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom complet</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input 
                          placeholder="John Doe" 
                          className="pl-10" 
                          {...field} 
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input 
                          placeholder="exemple@email.com" 
                          type="email" 
                          className="pl-10" 
                          {...field} 
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mot de passe</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input 
                          placeholder="********" 
                          type="password" 
                          className="pl-10" 
                          {...field} 
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirmer le mot de passe</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input 
                          placeholder="********" 
                          type="password" 
                          className="pl-10" 
                          {...field} 
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button 
                type="submit" 
                className="w-full bg-benin-green hover:bg-benin-green/90"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Création en cours...
                  </span>
                ) : (
                  <span className="flex items-center">
                    S'inscrire
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </span>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4 border-t p-6">
          <div className="text-center text-sm text-gray-600">
            Vous avez déjà un compte?{" "}
            <Link to="/login" className="font-medium text-benin-green hover:underline">
              Connectez-vous
            </Link>
          </div>
          <div className="text-center text-xs text-gray-500">
            En vous inscrivant, vous acceptez nos{" "}
            <Link to="/terms" className="text-benin-green hover:underline">
              Termes et Conditions
            </Link>{" "}
            et notre{" "}
            <Link to="/privacy" className="text-benin-green hover:underline">
              Politique de confidentialité
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Register;
