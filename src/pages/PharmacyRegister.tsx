
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Store, Mail, Phone, MapPin, User, Lock, ArrowRight, Upload } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import Layout from "@/components/layout/Layout";

const formSchema = z.object({
  pharmacyName: z.string().min(2, {
    message: "Le nom de la pharmacie doit contenir au moins 2 caractères",
  }),
  ownerName: z.string().min(2, {
    message: "Le nom du propriétaire doit contenir au moins 2 caractères",
  }),
  email: z.string().email({
    message: "Veuillez entrer une adresse email valide",
  }),
  phone: z.string().min(8, {
    message: "Le numéro de téléphone doit contenir au moins 8 chiffres",
  }),
  address: z.string().min(5, {
    message: "L'adresse doit contenir au moins 5 caractères",
  }),
  city: z.string().min(2, {
    message: "La ville doit contenir au moins 2 caractères",
  }),
  password: z.string().min(8, {
    message: "Le mot de passe doit contenir au moins 8 caractères",
  }),
  confirmPassword: z.string(),
  description: z.string().optional(),
  licenseNumber: z.string().min(3, {
    message: "Le numéro de licence doit contenir au moins 3 caractères",
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirmPassword"],
});

const PharmacyRegister = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [pharmacyLogo, setPharmacyLogo] = useState<File | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pharmacyName: "",
      ownerName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      password: "",
      confirmPassword: "",
      description: "",
      licenseNumber: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      // Simulation d'enregistrement (à remplacer par un appel API réel plus tard)
      console.log("Form values:", values);
      console.log("Pharmacy Logo:", pharmacyLogo);
      
      // Simule un délai d'enregistrement
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Pharmacie enregistrée avec succès!",
        description: "Votre demande d'inscription a été envoyée et est en cours d'examen.",
      });
      
      // Redirection vers la page de connexion
      navigate("/login");
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

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPharmacyLogo(e.target.files[0]);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen py-10 px-4 bg-gradient-to-br from-benin-green/5 to-benin-yellow/5">
        <div className="container mx-auto max-w-4xl">
          <Card className="w-full shadow-lg border border-benin-green/10">
            <CardHeader className="space-y-1">
              <div className="w-full flex justify-center mb-4">
                <div className="h-12 w-12 rounded-full bg-benin-green flex items-center justify-center">
                  <Store className="h-6 w-6 text-white" />
                </div>
              </div>
              <CardTitle className="text-2xl font-bold text-center text-gray-900">Enregistrer votre pharmacie</CardTitle>
              <CardDescription className="text-center text-gray-600">
                Complétez ce formulaire pour enregistrer votre pharmacie sur PharmaBenin
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="space-y-4">
                    <div className="text-lg font-medium text-gray-900">Informations de la pharmacie</div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="pharmacyName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nom de la pharmacie</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Store className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                <Input placeholder="Pharmacie du Parc" className="pl-10" {...field} />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="licenseNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Numéro de licence</FormLabel>
                            <FormControl>
                              <Input placeholder="LIC-12345" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description de la pharmacie</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Une brève description de votre pharmacie, services spéciaux, etc." 
                              className="min-h-[100px]"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="space-y-4">
                    <div className="text-lg font-medium text-gray-900">Coordonnées</div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="ownerName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nom du propriétaire/gérant</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                <Input placeholder="Jean Dupont" className="pl-10" {...field} />
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
                                <Input placeholder="contact@pharmacie.com" type="email" className="pl-10" {...field} />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Téléphone</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                <Input placeholder="+229 XX XX XX XX" className="pl-10" {...field} />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Adresse</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                <Input placeholder="123 Rue Principale" className="pl-10" {...field} />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Ville</FormLabel>
                            <FormControl>
                              <Input placeholder="Cotonou" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="md:col-span-2">
                        <FormLabel>Logo de la pharmacie</FormLabel>
                        <div className="mt-1 flex items-center gap-2">
                          {pharmacyLogo ? (
                            <div className="relative h-20 w-20 rounded-md border flex items-center justify-center overflow-hidden">
                              <img 
                                src={URL.createObjectURL(pharmacyLogo)} 
                                alt="Logo preview" 
                                className="h-full w-full object-cover"
                              />
                            </div>
                          ) : (
                            <div className="h-20 w-20 rounded-md border border-dashed flex items-center justify-center text-gray-400">
                              <Store className="h-8 w-8" />
                            </div>
                          )}
                          <label className="cursor-pointer">
                            <Button variant="outline" type="button" className="gap-2">
                              <Upload className="h-4 w-4" />
                              {pharmacyLogo ? "Changer logo" : "Télécharger logo"}
                            </Button>
                            <input 
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={handleLogoChange}
                            />
                          </label>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Format recommandé: PNG, JPG. Taille max: 2MB</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="text-lg font-medium text-gray-900">Informations de connexion</div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Mot de passe</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                <Input placeholder="********" type="password" className="pl-10" {...field} />
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
                                <Input placeholder="********" type="password" className="pl-10" {...field} />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

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
                        Enregistrement en cours...
                      </span>
                    ) : (
                      <span className="flex items-center">
                        Enregistrer ma pharmacie
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
                  Se connecter
                </Link>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default PharmacyRegister;
