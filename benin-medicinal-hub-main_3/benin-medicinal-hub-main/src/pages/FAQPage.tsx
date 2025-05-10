
import React from "react";
import Layout from "@/components/layout/Layout";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

const FAQPage = () => {
  // Groupes de FAQ
  const faqGroups = [
    {
      title: "Commandes et Livraisons",
      items: [
        {
          question: "Comment commander des médicaments sur PharmaBenin ?",
          answer: "Pour commander des médicaments, il vous suffit de créer un compte, parcourir notre catalogue, ajouter les produits dans votre panier, et procéder au paiement. Vous pouvez choisir entre la livraison à domicile ou le retrait en pharmacie (Click & Collect)."
        },
        {
          question: "Quels sont les délais de livraison ?",
          answer: "Les délais de livraison varient selon votre localisation. À Cotonou et Abomey-Calavi, nous livrons généralement en 2-3 heures. Pour les autres grandes villes, comptez entre 4 et 24 heures. Pour les zones rurales, la livraison peut prendre de 24 à 48 heures."
        },
        {
          question: "Comment suivre ma commande ?",
          answer: "Après avoir passé votre commande, vous recevrez un email de confirmation avec un numéro de suivi. Vous pouvez suivre votre commande en temps réel depuis votre compte utilisateur ou en cliquant sur le lien de suivi envoyé par SMS."
        },
        {
          question: "Quels sont les frais de livraison ?",
          answer: "Les frais de livraison dépendent de votre localisation. À Cotonou, ils sont de 1000 FCFA, en périphérie de 1500 FCFA, et dans les autres villes à partir de 2000 FCFA. La livraison est gratuite pour toute commande supérieure à 20 000 FCFA."
        },
        {
          question: "Puis-je annuler ou modifier ma commande ?",
          answer: "Vous pouvez annuler ou modifier votre commande dans les 30 minutes suivant sa validation, à condition qu'elle n'ait pas encore été préparée. Pour ce faire, connectez-vous à votre compte et accédez à la section 'Mes commandes'."
        }
      ]
    },
    {
      title: "Médicaments et Ordonnances",
      items: [
        {
          question: "Comment commander des médicaments sur ordonnance ?",
          answer: "Pour les médicaments sur ordonnance, vous devez télécharger une photo lisible de votre ordonnance lors de la commande. Nos pharmaciens vérifieront l'ordonnance avant de valider votre commande. L'original de l'ordonnance sera demandé à la livraison ou au retrait."
        },
        {
          question: "Tous les médicaments sont-ils disponibles sur PharmaBenin ?",
          answer: "Notre plateforme propose une large gamme de médicaments en vente libre et sur ordonnance. Toutefois, certains médicaments spécifiques ou traitements hospitaliers peuvent ne pas être disponibles. Si vous ne trouvez pas un médicament, contactez notre service client."
        },
        {
          question: "Les médicaments sont-ils authentiques ?",
          answer: "Oui, tous nos médicaments proviennent directement des pharmacies agréées par l'État béninois. Nous garantissons l'authenticité et la qualité de tous les produits vendus sur notre plateforme."
        },
        {
          question: "Puis-je retourner des médicaments ?",
          answer: "Pour des raisons de sécurité et conformément à la réglementation pharmaceutique, les médicaments ne peuvent pas être retournés une fois livrés, sauf en cas d'erreur de notre part ou de défaut manifeste. Contactez notre service client dans ces cas particuliers."
        }
      ]
    },
    {
      title: "Compte et Paiement",
      items: [
        {
          question: "Comment créer un compte sur PharmaBenin ?",
          answer: "Pour créer un compte, cliquez sur 'Inscription' en haut à droite de la page d'accueil. Remplissez le formulaire avec vos informations personnelles et créez un mot de passe. Vous recevrez un email de confirmation pour activer votre compte."
        },
        {
          question: "Quels moyens de paiement acceptez-vous ?",
          answer: "Nous acceptons plusieurs moyens de paiement : cartes bancaires (Visa, Mastercard), Mobile Money (MTN, Moov), paiement à la livraison (espèces), et transferts bancaires pour les commandes importantes."
        },
        {
          question: "Mes informations de paiement sont-elles sécurisées ?",
          answer: "Oui, nous utilisons des protocoles de sécurité avancés pour protéger vos informations de paiement. Toutes les transactions sont cryptées et nous ne stockons pas les détails de votre carte bancaire sur nos serveurs."
        },
        {
          question: "Comment modifier mes informations personnelles ?",
          answer: "Connectez-vous à votre compte, accédez à la section 'Mon profil' et cliquez sur 'Modifier mes informations'. Vous pourrez y mettre à jour vos coordonnées, adresse de livraison et préférences de communication."
        }
      ]
    },
    {
      title: "Services Spéciaux",
      items: [
        {
          question: "Qu'est-ce que le service Click & Collect ?",
          answer: "Le service Click & Collect vous permet de commander vos médicaments en ligne et de les récupérer dans la pharmacie de votre choix, sans faire la queue. Vous recevrez une notification par SMS dès que votre commande sera prête à être retirée."
        },
        {
          question: "Proposez-vous des abonnements pour les médicaments réguliers ?",
          answer: "Oui, nous proposons un service d'abonnement pour les traitements chroniques. Vous pouvez programmer des livraisons régulières (mensuelles, bimestrielles, etc.) et bénéficier de remises spéciales. Consultez la section 'Abonnements' dans votre espace client."
        },
        {
          question: "Puis-je consulter un pharmacien en ligne ?",
          answer: "Oui, notre service 'Conseil Pharma' vous permet de discuter en ligne avec un pharmacien pour obtenir des conseils sur vos médicaments, leurs effets secondaires potentiels ou des alternatives. Ce service est disponible de 8h à 22h tous les jours."
        },
        {
          question: "PharmaBenin livre-t-il dans les zones rurales ?",
          answer: "Oui, nous livrons dans la plupart des zones rurales du Bénin. Cependant, les délais peuvent être plus longs (24-48h) et les frais de livraison légèrement plus élevés. Vérifiez la disponibilité pour votre localité lors de la commande."
        }
      ]
    }
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Foire Aux Questions</h1>
        <p className="text-gray-600 mb-8">
          Trouvez des réponses aux questions les plus fréquemment posées sur nos services
        </p>

        {/* Search Bar */}
        <div className="max-w-xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              placeholder="Rechercher une question..."
              className="pl-10 py-6"
            />
            <Button className="absolute right-1 top-1/2 -translate-y-1/2 bg-benin-green hover:bg-benin-green/90">
              Rechercher
            </Button>
          </div>
        </div>

        {/* FAQ Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {faqGroups.map((group, groupIndex) => (
            <div key={groupIndex} className="space-y-4">
              <h2 className="text-xl font-semibold text-benin-green">{group.title}</h2>
              <Accordion type="single" collapsible className="w-full">
                {group.items.map((item, itemIndex) => (
                  <AccordionItem key={itemIndex} value={`item-${groupIndex}-${itemIndex}`}>
                    <AccordionTrigger className="text-left font-medium">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="bg-gray-50 p-8 rounded-xl text-center">
          <h2 className="text-xl font-semibold text-benin-green mb-4">Vous n'avez pas trouvé votre réponse ?</h2>
          <p className="text-gray-600 mb-6">
            Notre équipe du service client est disponible pour vous aider
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button variant="outline" className="border-benin-green text-benin-green">
              Contactez-nous
            </Button>
            <Button className="bg-benin-green hover:bg-benin-green/90">
              Chat en direct
            </Button>
          </div>
          <p className="mt-6 text-sm text-gray-500">
            Service client disponible de 8h à 20h, 7j/7 <br />
            Téléphone: +229 97 97 97 97 | Email: support@pharmabenin.com
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default FAQPage;
