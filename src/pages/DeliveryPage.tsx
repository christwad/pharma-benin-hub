
import React from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, Truck, Clock, Shield, MapPin, CircleDollarSign } from "lucide-react";

const DeliveryPage = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Livraison à domicile</h1>
            <p className="text-xl text-gray-600">
              Recevez vos médicaments directement chez vous
            </p>
          </div>
          
          {/* Hero Section */}
          <div className="bg-gradient-to-r from-benin-green to-medical-medium rounded-xl shadow-lg mb-12 overflow-hidden">
            <div className="p-8 text-white">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-2xl font-bold mb-4">Service de livraison rapide et fiable</h2>
                <p className="mb-6">
                  Notre service de livraison vous permet de recevoir vos médicaments et produits de santé directement à votre domicile ou lieu de travail, partout à Cotonou et ses environs.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="flex flex-col items-center bg-white/10 p-4 rounded-lg">
                    <Truck className="h-8 w-8 mb-2" />
                    <h3 className="font-semibold">Livraison rapide</h3>
                    <p className="text-sm text-center">En moins de 2 heures</p>
                  </div>
                  <div className="flex flex-col items-center bg-white/10 p-4 rounded-lg">
                    <Shield className="h-8 w-8 mb-2" />
                    <h3 className="font-semibold">Sécurisé</h3>
                    <p className="text-sm text-center">Livraison dans un emballage discret</p>
                  </div>
                  <div className="flex flex-col items-center bg-white/10 p-4 rounded-lg">
                    <CircleDollarSign className="h-8 w-8 mb-2" />
                    <h3 className="font-semibold">Tarifs abordables</h3>
                    <p className="text-sm text-center">À partir de 1000 FCFA</p>
                  </div>
                </div>
                <Button className="bg-white text-benin-green hover:bg-white/90">
                  Commander maintenant
                </Button>
              </div>
            </div>
          </div>
          
          {/* How it works */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">Comment ça marche ?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border-benin-green/20 hover:shadow-md transition-all">
                <CardHeader className="pb-4">
                  <div className="w-12 h-12 bg-benin-green/10 flex items-center justify-center rounded-full mb-2">
                    <span className="text-xl font-bold text-benin-green">1</span>
                  </div>
                  <CardTitle className="text-lg">Commandez vos produits</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Parcourez notre catalogue et ajoutez les produits dont vous avez besoin à votre panier.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-benin-green/20 hover:shadow-md transition-all">
                <CardHeader className="pb-4">
                  <div className="w-12 h-12 bg-benin-green/10 flex items-center justify-center rounded-full mb-2">
                    <span className="text-xl font-bold text-benin-green">2</span>
                  </div>
                  <CardTitle className="text-lg">Choisissez la livraison</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Sélectionnez l'option "Livraison à domicile" lors du processus de commande et indiquez votre adresse.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-benin-green/20 hover:shadow-md transition-all">
                <CardHeader className="pb-4">
                  <div className="w-12 h-12 bg-benin-green/10 flex items-center justify-center rounded-full mb-2">
                    <span className="text-xl font-bold text-benin-green">3</span>
                  </div>
                  <CardTitle className="text-lg">Recevez vos produits</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Un livreur vous apportera votre commande à l'adresse indiquée dans le délai prévu.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>
          
          {/* Delivery zones */}
          <section className="mb-12">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-benin-green" />
                  Zones de livraison
                </CardTitle>
                <CardDescription>
                  Nous livrons actuellement dans les zones suivantes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold mb-2 text-benin-green">Cotonou</h3>
                    <ul className="space-y-1 text-gray-600">
                      <li className="flex items-center">
                        <ArrowRight className="h-3 w-3 mr-2 text-benin-green" />
                        Cadjèhoun
                      </li>
                      <li className="flex items-center">
                        <ArrowRight className="h-3 w-3 mr-2 text-benin-green" />
                        Akpakpa
                      </li>
                      <li className="flex items-center">
                        <ArrowRight className="h-3 w-3 mr-2 text-benin-green" />
                        Fidjrossè
                      </li>
                      <li className="flex items-center">
                        <ArrowRight className="h-3 w-3 mr-2 text-benin-green" />
                        Agla
                      </li>
                      <li className="flex items-center">
                        <ArrowRight className="h-3 w-3 mr-2 text-benin-green" />
                        Ganhi
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2 text-benin-green">Abomey-Calavi</h3>
                    <ul className="space-y-1 text-gray-600">
                      <li className="flex items-center">
                        <ArrowRight className="h-3 w-3 mr-2 text-benin-green" />
                        Calavi centre
                      </li>
                      <li className="flex items-center">
                        <ArrowRight className="h-3 w-3 mr-2 text-benin-green" />
                        Togoudo
                      </li>
                      <li className="flex items-center">
                        <ArrowRight className="h-3 w-3 mr-2 text-benin-green" />
                        Akassato
                      </li>
                      <li className="flex items-center">
                        <ArrowRight className="h-3 w-3 mr-2 text-benin-green" />
                        Zogbohouè
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="mt-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200 text-sm">
                  <p className="font-medium text-yellow-800">
                    D'autres zones seront prochainement disponibles. Contactez-nous pour plus d'informations.
                  </p>
                </div>
              </CardContent>
            </Card>
          </section>
          
          {/* Pricing */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">Tarifs de livraison</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-benin-green/20 hover:shadow-md transition-all">
                <CardHeader className="bg-gradient-to-r from-benin-green/10 to-transparent">
                  <CardTitle>Cotonou</CardTitle>
                  <CardDescription>
                    Livraison standard dans Cotonou
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="text-center mb-4">
                    <span className="text-3xl font-bold text-benin-green">1000 FCFA</span>
                  </div>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-benin-green" />
                      <span>Délai: 1-2 heures</span>
                    </li>
                    <li className="flex items-center">
                      <Truck className="h-4 w-4 mr-2 text-benin-green" />
                      <span>Livraison par moto</span>
                    </li>
                    <li className="flex items-center">
                      <Shield className="h-4 w-4 mr-2 text-benin-green" />
                      <span>Suivi en temps réel</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-benin-green hover:bg-benin-green/90">
                    Commander
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="border-benin-green/20 hover:shadow-md transition-all">
                <CardHeader className="bg-gradient-to-r from-benin-green/10 to-transparent">
                  <CardTitle>Abomey-Calavi</CardTitle>
                  <CardDescription>
                    Livraison standard à Abomey-Calavi
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="text-center mb-4">
                    <span className="text-3xl font-bold text-benin-green">1500 FCFA</span>
                  </div>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-benin-green" />
                      <span>Délai: 2-3 heures</span>
                    </li>
                    <li className="flex items-center">
                      <Truck className="h-4 w-4 mr-2 text-benin-green" />
                      <span>Livraison par moto</span>
                    </li>
                    <li className="flex items-center">
                      <Shield className="h-4 w-4 mr-2 text-benin-green" />
                      <span>Suivi en temps réel</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-benin-green hover:bg-benin-green/90">
                    Commander
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </section>
          
          {/* Contact form */}
          <section>
            <Card className="border-benin-green/20">
              <CardHeader className="bg-gradient-to-r from-benin-green/10 to-transparent">
                <CardTitle>Une question sur la livraison ?</CardTitle>
                <CardDescription>
                  Remplissez ce formulaire et nous vous répondrons dans les plus brefs délais
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nom complet</Label>
                      <Input id="name" placeholder="Jean Dupont" className="border-benin-green/30 focus:border-benin-green focus:ring-benin-green/20" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="jean.dupont@example.com" className="border-benin-green/30 focus:border-benin-green focus:ring-benin-green/20" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Sujet</Label>
                    <Input id="subject" placeholder="Question sur la livraison" className="border-benin-green/30 focus:border-benin-green focus:ring-benin-green/20" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea 
                      id="message" 
                      placeholder="Votre message..." 
                      rows={4}
                      className="border-benin-green/30 focus:border-benin-green focus:ring-benin-green/20"
                    />
                  </div>
                </form>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-benin-green hover:bg-benin-green/90">
                  Envoyer
                </Button>
              </CardFooter>
            </Card>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default DeliveryPage;
