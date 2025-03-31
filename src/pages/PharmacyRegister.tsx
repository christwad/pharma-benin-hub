
import React from "react";
import { Link } from "react-router-dom";
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
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CheckCircle2, AlertCircle, FileText, Star, Shield, Clock, Calendar, Landmark } from "lucide-react";

const PharmacyRegister = () => {
  const benefits = [
    {
      title: "Visibilité accrue",
      description: "Rejoignez la première plateforme de pharmacies en ligne au Bénin et gagnez en visibilité auprès de milliers de clients potentiels.",
      icon: <Star className="h-6 w-6 text-yellow-500" />,
    },
    {
      title: "Gestion simplifiée",
      description: "Utilisez notre interface intuitive pour gérer facilement votre catalogue de médicaments, suivre vos commandes et organiser vos livraisons.",
      icon: <Clock className="h-6 w-6 text-blue-500" />,
    },
    {
      title: "Sécurité et conformité",
      description: "Notre plateforme est conforme aux réglementations pharmaceutiques locales et assure la sécurité des transactions et des données personnelles.",
      icon: <Shield className="h-6 w-6 text-green-500" />,
    },
    {
      title: "Assistance dédiée",
      description: "Bénéficiez d'un support technique et commercial dédié pour vous accompagner à chaque étape de votre parcours sur PharmaBenin.",
      icon: <CheckCircle2 className="h-6 w-6 text-purple-500" />,
    },
  ];

  const steps = [
    {
      number: 1,
      title: "Soumission de la demande",
      description: "Remplissez le formulaire d'inscription en fournissant les informations sur votre pharmacie, vos coordonnées et votre licence pharmaceutique.",
    },
    {
      number: 2,
      title: "Vérification des documents",
      description: "Notre équipe vérifie l'authenticité de votre licence et des informations fournies pour s'assurer que vous êtes bien une pharmacie enregistrée au Bénin.",
    },
    {
      number: 3,
      title: "Activation du compte",
      description: "Une fois approuvé, votre compte est activé et vous recevez vos identifiants pour accéder à votre espace pharmacie.",
    },
    {
      number: 4,
      title: "Configuration de votre profil",
      description: "Personnalisez votre profil, ajoutez des informations supplémentaires et commencez à ajouter vos médicaments au catalogue.",
    },
    {
      number: 5,
      title: "Formation et lancement",
      description: "Participez à une courte session de formation en ligne et lancez officiellement votre pharmacie sur la plateforme.",
    },
  ];

  const faqItems = [
    {
      question: "Quels sont les documents requis pour l'inscription?",
      answer: "Pour vous inscrire en tant que pharmacie, vous devez fournir une copie de votre licence pharmaceutique valide, une pièce d'identité du propriétaire ou du gérant, un document justifiant votre adresse commerciale et les informations de contact de la pharmacie.",
    },
    {
      question: "Combien coûte l'inscription sur PharmaBenin?",
      answer: "L'inscription de base sur PharmaBenin est gratuite. Nous proposons également des forfaits premium avec des fonctionnalités avancées qui sont facturés mensuellement ou annuellement selon votre choix.",
    },
    {
      question: "Combien de temps prend le processus de vérification?",
      answer: "Le processus de vérification prend généralement entre 3 et 5 jours ouvrables à partir du moment où tous les documents requis ont été soumis et sont complets.",
    },
    {
      question: "Comment sont gérées les commandes et les livraisons?",
      answer: "Vous recevez les commandes directement dans votre espace pharmacie. Vous pouvez ensuite les accepter, les préparer et les envoyer soit par votre propre service de livraison, soit via notre réseau de livreurs partenaires.",
    },
    {
      question: "Comment PharmaBenin gère-t-il les médicaments réglementés?",
      answer: "Pour les médicaments nécessitant une ordonnance, notre système permet aux clients de télécharger leur ordonnance lors de la commande. Vous pourrez vérifier l'ordonnance avant de valider la commande.",
    },
    {
      question: "Existe-t-il un support technique en cas de problème?",
      answer: "Oui, nous disposons d'une équipe de support technique disponible du lundi au samedi de 8h à 18h pour vous aider à résoudre tout problème lié à la plateforme.",
    },
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Devenir pharmacie partenaire</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Rejoignez le réseau PharmaBenin et développez votre activité en ligne
            </p>
          </div>

          {/* Hero section */}
          <div className="relative bg-benin-green rounded-lg overflow-hidden mb-16">
            <div className="absolute inset-0 bg-black opacity-20"></div>
            <div className="relative z-10 p-8 md:p-12 text-white">
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-2/3 mb-6 md:mb-0 md:pr-8">
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">
                    Élargissez votre clientèle avec PharmaBenin
                  </h2>
                  <p className="text-lg mb-6">
                    Connectez votre pharmacie avec des milliers de clients en ligne et augmentez vos ventes grâce à notre plateforme sécurisée.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Button className="bg-white text-benin-green hover:bg-gray-100">
                      <Link to="/register" className="inline-flex items-center">
                        <Landmark className="h-4 w-4 mr-2" />
                        S'inscrire maintenant
                      </Link>
                    </Button>
                    <Button variant="outline" className="border-white text-white hover:bg-white/20">
                      <Link to="/contact" className="inline-flex items-center">
                        Nous contacter
                      </Link>
                    </Button>
                  </div>
                </div>
                <div className="md:w-1/3 flex justify-center">
                  <Landmark className="h-32 w-32 text-white opacity-90" />
                </div>
              </div>
            </div>
          </div>

          {/* Benefits section */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
              Avantages de rejoindre PharmaBenin
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-start">
                      <div className="mr-4 mt-1">{benefit.icon}</div>
                      <div>
                        <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                        <p className="text-gray-600">{benefit.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* How it works section */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
              Comment ça marche?
            </h2>
            <div className="relative">
              <div className="absolute left-9 top-0 bottom-0 w-0.5 bg-gray-200"></div>
              <div className="space-y-8">
                {steps.map((step, index) => (
                  <div key={index} className="relative flex items-start">
                    <div className="absolute left-0 flex items-center justify-center w-9 h-9 bg-benin-green text-white rounded-full font-bold">
                      {step.number}
                    </div>
                    <div className="ml-16">
                      <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Document requirements section */}
          <section className="mb-16">
            <Card>
              <CardHeader>
                <div className="flex items-center">
                  <FileText className="h-6 w-6 mr-2 text-benin-green" />
                  <CardTitle>Documents requis</CardTitle>
                </div>
                <CardDescription>
                  Préparez ces documents pour compléter votre inscription
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 mr-2 text-green-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-medium">Licence pharmaceutique</span>
                      <p className="text-sm text-gray-600">Une copie de votre licence professionnelle valide délivrée par l'ordre des pharmaciens du Bénin</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 mr-2 text-green-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-medium">Document d'identité</span>
                      <p className="text-sm text-gray-600">Pièce d'identité du propriétaire ou du gérant de la pharmacie</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 mr-2 text-green-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-medium">Registre de commerce</span>
                      <p className="text-sm text-gray-600">Une copie de votre registre de commerce</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 mr-2 text-green-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-medium">Justificatif d'adresse</span>
                      <p className="text-sm text-gray-600">Un document prouvant l'adresse physique de votre pharmacie (facture d'électricité, contrat de bail, etc.)</p>
                    </div>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <div className="flex items-start">
                  <AlertCircle className="h-5 w-5 mr-2 text-amber-500 shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-600">
                    Tous les documents doivent être numérisés en couleur et clairement lisibles. Les documents seront vérifiés par notre équipe avant l'approbation de votre compte.
                  </p>
                </div>
              </CardFooter>
            </Card>
          </section>

          {/* Pricing section */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
              Nos forfaits
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Basic plan */}
              <Card className="relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-gray-200 px-3 py-1 text-xs font-semibold">
                  Populaire
                </div>
                <CardHeader>
                  <CardTitle>Basique</CardTitle>
                  <CardDescription>Pour les petites pharmacies</CardDescription>
                  <div className="mt-4">
                    <span className="text-3xl font-bold">Gratuit</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
                      <span>Profil de pharmacie</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
                      <span>Jusqu'à 50 produits</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
                      <span>Gestion des commandes</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
                      <span>Support email</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-benin-green hover:bg-benin-green/90">
                    <Link to="/register" className="w-full">Choisir ce forfait</Link>
                  </Button>
                </CardFooter>
              </Card>

              {/* Premium plan */}
              <Card className="relative overflow-hidden border-benin-green">
                <div className="absolute top-0 right-0 bg-benin-green px-3 py-1 text-xs font-semibold text-white">
                  Recommandé
                </div>
                <CardHeader>
                  <CardTitle>Premium</CardTitle>
                  <CardDescription>Pour les pharmacies en croissance</CardDescription>
                  <div className="mt-4">
                    <span className="text-3xl font-bold">25 000 FCFA</span>
                    <span className="text-gray-500 ml-1">/mois</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
                      <span>Tout ce qui est inclus dans Basique</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
                      <span>Produits illimités</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
                      <span>Mise en avant sur la page d'accueil</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
                      <span>Support téléphonique prioritaire</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
                      <span>Rapports de vente avancés</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-benin-green hover:bg-benin-green/90">
                    <Link to="/register" className="w-full">Choisir ce forfait</Link>
                  </Button>
                </CardFooter>
              </Card>

              {/* Business plan */}
              <Card>
                <CardHeader>
                  <CardTitle>Entreprise</CardTitle>
                  <CardDescription>Pour les grandes pharmacies</CardDescription>
                  <div className="mt-4">
                    <span className="text-3xl font-bold">50 000 FCFA</span>
                    <span className="text-gray-500 ml-1">/mois</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
                      <span>Tout ce qui est inclus dans Premium</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
                      <span>Multi-utilisateurs (jusqu'à 5)</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
                      <span>Intégration API personnalisée</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
                      <span>Gestionnaire de compte dédié</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
                      <span>Formation sur site</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-benin-green hover:bg-benin-green/90">
                    <Link to="/register" className="w-full">Choisir ce forfait</Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>

            <div className="text-center mt-8 text-gray-600">
              Tous les forfaits incluent une période d'essai gratuite de 30 jours.
              <br />
              <Link to="/contact" className="text-benin-green font-medium hover:underline">
                Contactez-nous pour plus d'informations sur les forfaits
              </Link>
            </div>
          </section>

          {/* FAQ section */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
              Questions fréquentes
            </h2>
            <Accordion type="single" collapsible className="w-full">
              {faqItems.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent>
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>

          {/* Call to action */}
          <section className="mb-8">
            <Card className="bg-gray-50">
              <CardContent className="p-8 text-center">
                <h2 className="text-2xl font-bold mb-4">Prêt à rejoindre PharmaBenin?</h2>
                <p className="text-gray-600 mb-6 max-w-xl mx-auto">
                  Rejoignez dès aujourd'hui le plus grand réseau de pharmacies en ligne au Bénin et développez votre activité.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Button className="bg-benin-green hover:bg-benin-green/90">
                    <Link to="/register" className="inline-flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      Commencer l'inscription
                    </Link>
                  </Button>
                  <Button variant="outline">
                    <Link to="/contact" className="inline-flex items-center">
                      Nous contacter
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default PharmacyRegister;
