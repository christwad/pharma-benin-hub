
import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckSquare, Building2, Users, TrendingUp, HeartHandshake } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

const PharmacySignupPage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [verificationMethod, setVerificationMethod] = useState("email");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    toast({
      title: "Demande envoyée avec succès",
      description: "Veuillez vérifier votre email ou téléphone pour confirmer votre identité.",
    });
  };

  const handleVerificationMethodChange = (value: string) => {
    setVerificationMethod(value);
  };

  const handleProceedToVerification = () => {
    navigate("/pharmacy-verification");
  };

  // Si le formulaire a été soumis, afficher l'écran de confirmation
  if (formSubmitted) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-md mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="text-center">Vérification requise</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <div className="bg-green-100 text-green-800 p-4 rounded-md mb-6">
                    <p className="font-medium">Votre demande a été enregistrée avec succès!</p>
                    <p className="mt-2">Pour finaliser votre inscription, vous devez vérifier votre identité.</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Méthode de vérification</Label>
                    <Select value={verificationMethod} onValueChange={handleVerificationMethodChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choisir une méthode" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="email">Vérification par email</SelectItem>
                        <SelectItem value="sms">Vérification par SMS</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {verificationMethod === "email" && (
                    <div className="bg-blue-50 p-4 rounded">
                      <p className="text-sm">Un code de vérification a été envoyé à l'adresse email que vous avez fournie.</p>
                      <p className="text-sm mt-1">Veuillez vérifier votre boîte de réception et vos spams.</p>
                    </div>
                  )}
                  
                  {verificationMethod === "sms" && (
                    <div className="bg-blue-50 p-4 rounded">
                      <p className="text-sm">Un code de vérification sera envoyé par SMS au numéro de téléphone que vous avez fourni.</p>
                      <p className="text-sm mt-1">Le message peut prendre quelques minutes pour arriver.</p>
                    </div>
                  )}
                  
                  <Button className="w-full bg-benin-green hover:bg-benin-green/90" onClick={handleProceedToVerification}>
                    Continuer vers la vérification
                  </Button>
                  
                  <p className="text-xs text-center text-gray-500 mt-4">
                    Après vérification de votre identité, votre demande sera examinée par notre équipe administrative. 
                    Vous recevrez une notification une fois votre compte approuvé.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Espace Pharmacie</h1>
          <p className="text-gray-600 mb-8">Rejoignez le réseau PharmaBenin et développez votre activité</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div>
              <h2 className="text-xl font-semibold text-benin-green mb-4">Pourquoi rejoindre PharmaBenin ?</h2>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="mt-1 text-benin-green">
                    <Building2 size={24} />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Visibilité accrue</h3>
                    <p className="text-gray-600">Accédez à une nouvelle clientèle et augmentez votre visibilité en ligne</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="mt-1 text-benin-green">
                    <Users size={24} />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Fidélisation clients</h3>
                    <p className="text-gray-600">Développez une relation durable avec vos clients grâce à nos outils digitaux</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="mt-1 text-benin-green">
                    <TrendingUp size={24} />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Augmentation du chiffre d'affaires</h3>
                    <p className="text-gray-600">Générez des ventes supplémentaires sans investissement majeur</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="mt-1 text-benin-green">
                    <HeartHandshake size={24} />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Accompagnement personnalisé</h3>
                    <p className="text-gray-600">Bénéficiez de notre support technique et commercial au quotidien</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold text-benin-green mb-4">Services proposés</h2>
              
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <CheckSquare className="h-5 w-5 text-benin-green flex-shrink-0 mt-0.5" />
                  <span>Gestion simplifiée de votre catalogue produits</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckSquare className="h-5 w-5 text-benin-green flex-shrink-0 mt-0.5" />
                  <span>Interface dédiée pour gérer vos commandes</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckSquare className="h-5 w-5 text-benin-green flex-shrink-0 mt-0.5" />
                  <span>Outils promotionnels personnalisables</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckSquare className="h-5 w-5 text-benin-green flex-shrink-0 mt-0.5" />
                  <span>Tableau de bord d'analyse des ventes</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckSquare className="h-5 w-5 text-benin-green flex-shrink-0 mt-0.5" />
                  <span>Service Click & Collect intégré</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckSquare className="h-5 w-5 text-benin-green flex-shrink-0 mt-0.5" />
                  <span>Solutions de livraison optimisées</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckSquare className="h-5 w-5 text-benin-green flex-shrink-0 mt-0.5" />
                  <span>Support technique 7j/7</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckSquare className="h-5 w-5 text-benin-green flex-shrink-0 mt-0.5" />
                  <span>Formation à l'utilisation de la plateforme</span>
                </div>
              </div>
            </div>
          </div>

          <Card className="mb-12">
            <CardHeader>
              <CardTitle>Formulaire d'inscription</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="pharmacy-name">Nom de la pharmacie *</Label>
                    <Input id="pharmacy-name" placeholder="Pharmacie du Centre" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="license-number">Numéro de licence *</Label>
                    <Input id="license-number" placeholder="12345-AB" required />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="owner-name">Nom du propriétaire *</Label>
                    <Input id="owner-name" placeholder="Dr. Kokou MENSAH" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Téléphone *</Label>
                    <Input id="phone" type="tel" placeholder="+229 97 12 34 56" required />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input id="email" type="email" placeholder="contact@pharmacie.com" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">Ville *</Label>
                    <Select>
                      <SelectTrigger id="city">
                        <SelectValue placeholder="Sélectionnez votre ville" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cotonou">Cotonou</SelectItem>
                        <SelectItem value="porto-novo">Porto-Novo</SelectItem>
                        <SelectItem value="parakou">Parakou</SelectItem>
                        <SelectItem value="abomey-calavi">Abomey-Calavi</SelectItem>
                        <SelectItem value="bohicon">Bohicon</SelectItem>
                        <SelectItem value="other">Autre</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Adresse complète *</Label>
                  <Input id="address" placeholder="123 Boulevard Saint Michel" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="business-hours">Horaires d'ouverture *</Label>
                  <Input id="business-hours" placeholder="Lun-Ven: 8h-20h, Sam-Dim: 9h-18h" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description de votre pharmacie</Label>
                  <Textarea
                    id="description"
                    placeholder="Parlez-nous de votre pharmacie, de vos spécialités..."
                    className="h-24"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="services">Services proposés</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="service-1" className="rounded border-gray-300" />
                      <label htmlFor="service-1">Livraison à domicile</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="service-2" className="rounded border-gray-300" />
                      <label htmlFor="service-2">Garde 24h/24</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="service-3" className="rounded border-gray-300" />
                      <label htmlFor="service-3">Conseil nutritionnel</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="service-4" className="rounded border-gray-300" />
                      <label htmlFor="service-4">Tests rapides</label>
                    </div>
                  </div>
                </div>

                <Button type="submit" className="w-full bg-benin-green hover:bg-benin-green/90">
                  Soumettre ma demande
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="text-center text-gray-600">
            <p>Des questions ? Contactez notre équipe dédiée aux pharmacies partenaires</p>
            <p className="font-medium">partenaires@pharmabenin.com | +229 97 00 00 00</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PharmacySignupPage;
