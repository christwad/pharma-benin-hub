
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { User, Mail, Phone, MessageSquare, Send, MapPin, Clock, ArrowRight } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

// Définir le schéma de validation
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Le nom doit contenir au moins 2 caractères",
  }),
  email: z.string().email({
    message: "Veuillez entrer une adresse email valide",
  }),
  phone: z.string().optional(),
  subject: z.string().min(3, {
    message: "Le sujet doit contenir au moins 3 caractères",
  }),
  message: z.string().min(10, {
    message: "Le message doit contenir au moins 10 caractères",
  }),
});

const Contact = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      // Simulation d'envoi (à remplacer par un appel API réel plus tard)
      console.log("Form values:", values);
      
      // Simule un délai d'envoi
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Message envoyé!",
        description: "Nous avons bien reçu votre message et vous répondrons dans les meilleurs délais.",
      });
      
      form.reset();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur lors de l'envoi",
        description: "Une erreur est survenue. Veuillez réessayer.",
      });
      console.error("Contact form error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Contactez-nous</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Des questions, des suggestions ou besoin d'aide? N'hésitez pas à nous contacter. Notre équipe est à votre disposition.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Formulaire */}
          <Card className="shadow-lg border border-benin-green/10">
            <CardHeader>
              <CardTitle className="text-2xl">Envoyez-nous un message</CardTitle>
              <CardDescription>
                Remplissez le formulaire ci-dessous et nous vous répondrons dans les plus brefs délais.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nom complet</FormLabel>
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
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                              <Input placeholder="exemple@email.com" type="email" className="pl-10" {...field} />
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
                          <FormLabel>Téléphone (optionnel)</FormLabel>
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
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Sujet</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input placeholder="Objet de votre message" className="pl-10" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Votre message ici..." 
                            className="min-h-[150px]"
                            {...field} 
                          />
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
                        Envoi en cours...
                      </span>
                    ) : (
                      <span className="flex items-center">
                        Envoyer le message
                        <Send className="ml-2 h-4 w-4" />
                      </span>
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
          
          {/* Informations de contact */}
          <div className="space-y-6">
            <Card className="shadow-md border border-benin-green/10">
              <CardHeader>
                <CardTitle className="text-2xl">Nos coordonnées</CardTitle>
                <CardDescription>
                  Retrouvez-nous à l'adresse suivante ou contactez-nous directement.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-benin-green mr-3 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Adresse</h3>
                    <p className="text-gray-600">
                      123 Rue du Commerce<br />
                      Cotonou, Bénin
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Phone className="h-5 w-5 text-benin-green mr-3 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Téléphone</h3>
                    <p className="text-gray-600">+229 XX XX XX XX</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Mail className="h-5 w-5 text-benin-green mr-3 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Email</h3>
                    <p className="text-gray-600">contact@pharmabenin.com</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Clock className="h-5 w-5 text-benin-green mr-3 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Horaires</h3>
                    <p className="text-gray-600">
                      Lundi - Vendredi: 8h00 - 18h00<br />
                      Samedi: 9h00 - 15h00<br />
                      Dimanche: Fermé
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="shadow-md border border-benin-green/10">
              <CardHeader>
                <CardTitle className="text-2xl">FAQ</CardTitle>
                <CardDescription>
                  Retrouvez les réponses aux questions les plus fréquemment posées.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-medium">Comment puis-je commander des médicaments?</h3>
                  <p className="text-gray-600 text-sm mt-1">
                    Vous pouvez parcourir notre catalogue, ajouter des produits à votre panier et suivre les étapes de commande.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium">Quels sont les délais de livraison?</h3>
                  <p className="text-gray-600 text-sm mt-1">
                    Les délais de livraison varient selon votre localisation, généralement entre 24h et 48h pour les grandes villes du Bénin.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium">Comment enregistrer ma pharmacie?</h3>
                  <p className="text-gray-600 text-sm mt-1">
                    Vous pouvez vous inscrire en tant que pharmacie en remplissant le formulaire dédié. Votre demande sera examinée sous 48h.
                  </p>
                </div>
                
                <Button variant="outline" className="w-full mt-2">
                  <span className="flex items-center">
                    Voir toutes les FAQ
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </span>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <div className="mt-12 max-w-6xl mx-auto">
          <Card className="shadow-md border border-benin-green/10">
            <CardHeader>
              <CardTitle className="text-2xl">Notre localisation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="w-full h-80 bg-gray-200 rounded-md flex items-center justify-center">
                <p className="text-gray-500">La carte sera disponible prochainement.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
