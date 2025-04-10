
import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { Check, CreditCard, Calendar, ShieldCheck, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Données des plans d'abonnement
const subscriptionPlans = [
  {
    id: "monthly",
    name: "Mensuel",
    price: 15000,
    priceText: "15.000 FCFA/mois",
    features: [
      "Accès à toutes les fonctionnalités",
      "Nombre illimité de médicaments",
      "Support technique standard",
      "Mises à jour automatiques",
      "Facturation mensuelle"
    ],
    popularFeature: "Flexibilité"
  },
  {
    id: "yearly",
    name: "Annuel",
    price: 150000,
    priceText: "150.000 FCFA/an",
    discount: "25.000 FCFA d'économie",
    features: [
      "Toutes les fonctionnalités du plan mensuel",
      "Support technique prioritaire",
      "Statistiques avancées",
      "Accompagnement personnalisé",
      "Facturation annuelle (2 mois offerts)"
    ],
    popularFeature: "Le plus populaire",
    recommended: true
  },
  {
    id: "enterprise",
    name: "Entreprise",
    price: 300000,
    priceText: "Contactez-nous",
    features: [
      "Toutes les fonctionnalités du plan annuel",
      "Support dédié 24/7",
      "Personnalisation avancée",
      "Formation complète de votre équipe",
      "Intégration avec vos systèmes existants"
    ],
    popularFeature: "Solution complète"
  }
];

const PharmacySubscriptionPage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState("yearly");
  const [billingCycle, setBillingCycle] = useState("yearly");
  
  // Fonction pour gérer le paiement
  const handlePayment = () => {
    toast({
      title: "Redirection vers la page de paiement",
      description: "Vous allez être redirigé vers notre partenaire de paiement sécurisé.",
    });
    
    // Simuler une redirection vers la page de paiement
    setTimeout(() => {
      toast({
        title: "Paiement réussi!",
        description: "Votre abonnement a été activé avec succès.",
      });
      navigate("/pharmacy-dashboard");
    }, 2000);
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Abonnez-vous à PharmaBenin Pro</h1>
          <p className="text-xl text-gray-600">
            Développez votre activité avec notre plateforme dédiée aux pharmaciens
          </p>
        </div>
        
        <Tabs defaultValue={billingCycle} onValueChange={setBillingCycle} className="max-w-3xl mx-auto mb-8">
          <div className="flex justify-center mb-8">
            <TabsList>
              <TabsTrigger value="monthly" className="min-w-[100px]">Mensuel</TabsTrigger>
              <TabsTrigger value="yearly" className="min-w-[100px]">Annuel</TabsTrigger>
            </TabsList>
          </div>
          
          {/* Contenu des onglets */}
          <TabsContent value="monthly">
            <p className="text-center mb-8">
              Paiement mensuel flexible. Annulez à tout moment.
            </p>
          </TabsContent>
          <TabsContent value="yearly">
            <p className="text-center mb-8 text-green-600">
              Économisez 25.000 FCFA avec notre plan annuel! Deux mois gratuits inclus.
            </p>
          </TabsContent>
          
          {/* Cartes des plans */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {subscriptionPlans.map((plan) => (
              <Card 
                key={plan.id}
                className={`relative ${
                  plan.recommended
                    ? "border-2 border-benin-green shadow-lg"
                    : "border border-gray-200"
                }`}
              >
                {plan.recommended && (
                  <div className="absolute -top-4 left-0 right-0 flex justify-center">
                    <span className="bg-benin-green text-white px-3 py-1 rounded-full text-sm">
                      Recommandé
                    </span>
                  </div>
                )}
                <CardHeader>
                  <CardTitle>{plan.name}</CardTitle>
                  <CardDescription>{plan.popularFeature}</CardDescription>
                  <div className="mt-4">
                    <span className="text-3xl font-bold">
                      {plan.id === "enterprise" ? "Contactez-nous" : plan.price.toLocaleString() + " FCFA"}
                    </span>
                    {plan.id !== "enterprise" && (
                      <span className="text-gray-500 ml-1">/
                        {billingCycle === "monthly" ? "mois" : "an"}
                      </span>
                    )}
                    {plan.discount && billingCycle === "yearly" && (
                      <p className="text-green-600 text-sm mt-1">{plan.discount}</p>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button 
                    className={`w-full ${
                      plan.recommended
                        ? "bg-benin-green hover:bg-benin-green/90"
                        : "bg-gray-800 hover:bg-gray-700"
                    }`}
                    onClick={() => {
                      setSelectedPlan(plan.id);
                      if (plan.id === "enterprise") {
                        navigate("/contact");
                      } else {
                        handlePayment();
                      }
                    }}
                  >
                    {plan.id === "enterprise" ? "Contactez-nous" : "Choisir ce plan"}
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </Tabs>
        
        {/* Informations supplémentaires */}
        <div className="max-w-3xl mx-auto mt-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <CreditCard className="h-12 w-12 mx-auto text-benin-green mb-4" />
              <h3 className="font-semibold mb-2">Paiement sécurisé</h3>
              <p className="text-gray-600 text-sm">
                Vos transactions sont protégées par un système de cryptage avancé. Nous acceptons les cartes de crédit et les paiements mobile.
              </p>
            </div>
            
            <div className="text-center">
              <Calendar className="h-12 w-12 mx-auto text-benin-green mb-4" />
              <h3 className="font-semibold mb-2">Pas d'engagement</h3>
              <p className="text-gray-600 text-sm">
                Annulez à tout moment. Vous pouvez changer ou annuler votre abonnement quand vous le souhaitez.
              </p>
            </div>
            
            <div className="text-center">
              <ShieldCheck className="h-12 w-12 mx-auto text-benin-green mb-4" />
              <h3 className="font-semibold mb-2">Support dédié</h3>
              <p className="text-gray-600 text-sm">
                Notre équipe est disponible pour vous aider à tout moment. Nous vous accompagnons dans votre transition numérique.
              </p>
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-6 text-center">
            <h3 className="font-bold text-lg mb-2">Besoin d'aide pour choisir?</h3>
            <p className="text-gray-600 mb-4">
              Contactez notre équipe pour une démonstration personnalisée et des conseils adaptés à vos besoins.
            </p>
            <Button variant="outline" onClick={() => navigate("/contact")}>
              Nous contacter
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PharmacySubscriptionPage;
