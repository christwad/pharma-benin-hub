
import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Mail, Phone, MapPin, Clock, Send, MessageSquare } from "lucide-react";

const Contact = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, subject: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Validate form
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Message envoyé!",
        description: "Nous vous répondrons dans les plus brefs délais.",
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    }, 1500);
  };

  const contactInfo = [
    {
      icon: <Phone className="h-5 w-5 text-benin-green" />,
      title: "Téléphone",
      details: ["+229 97 12 34 56", "+229 94 56 78 90"],
    },
    {
      icon: <Mail className="h-5 w-5 text-benin-green" />,
      title: "Email",
      details: ["contact@pharmabenin.com", "support@pharmabenin.com"],
    },
    {
      icon: <MapPin className="h-5 w-5 text-benin-green" />,
      title: "Adresse",
      details: ["123 Rue du Commerce", "Cotonou, Bénin"],
    },
    {
      icon: <Clock className="h-5 w-5 text-benin-green" />,
      title: "Heures d'ouverture",
      details: ["Lun-Ven: 8h00 - 18h00", "Sam: 9h00 - 15h00"],
    },
  ];

  const faqs = [
    {
      question: "Comment puis-je trouver une pharmacie près de chez moi?",
      answer: "Vous pouvez utiliser notre fonction de recherche pour trouver des pharmacies par ville ou par quartier. Notre carte interactive vous montre également les pharmacies les plus proches de votre localisation.",
    },
    {
      question: "Comment commander des médicaments en ligne?",
      answer: "Pour commander des médicaments, créez un compte, recherchez les produits dont vous avez besoin, ajoutez-les à votre panier, puis suivez les étapes de paiement et de livraison.",
    },
    {
      question: "Quels sont les modes de paiement acceptés?",
      answer: "Nous acceptons les paiements par Mobile Money (MTN, Moov), les cartes bancaires (Visa, Mastercard) et le paiement à la livraison dans certaines zones.",
    },
    {
      question: "Comment devenir une pharmacie partenaire?",
      answer: "Pour devenir partenaire, rendez-vous sur notre page 'Pharmacie Partenaire', remplissez le formulaire d'inscription et soumettez les documents requis. Notre équipe examinera votre demande et vous contactera.",
    },
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Contactez-nous</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Nous sommes là pour vous aider. N'hésitez pas à nous contacter pour toute question ou suggestion.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Envoyez-nous un message</CardTitle>
                <CardDescription>
                  Remplissez le formulaire ci-dessous et nous vous répondrons dans les plus brefs délais.
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nom complet <span className="text-red-500">*</span></Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Jean Dupont"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email <span className="text-red-500">*</span></Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="jean.dupont@example.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Téléphone</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+229 97 12 34 56"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">Sujet <span className="text-red-500">*</span></Label>
                      <Select
                        value={formData.subject}
                        onValueChange={handleSelectChange}
                      >
                        <SelectTrigger id="subject">
                          <SelectValue placeholder="Sélectionnez un sujet" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general">Question générale</SelectItem>
                          <SelectItem value="order">Commande</SelectItem>
                          <SelectItem value="partnership">Partenariat</SelectItem>
                          <SelectItem value="technical">Support technique</SelectItem>
                          <SelectItem value="other">Autre</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message <span className="text-red-500">*</span></Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Comment pouvons-nous vous aider?"
                      rows={5}
                      required
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    type="submit"
                    className="w-full bg-benin-green hover:bg-benin-green/90"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      "Envoi en cours..."
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Envoyer le message
                      </>
                    )}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Informations de contact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex">
                    <div className="mr-3 mt-1">{info.icon}</div>
                    <div>
                      <h3 className="font-medium">{info.title}</h3>
                      {info.details.map((detail, i) => (
                        <p key={i} className="text-gray-600">{detail}</p>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Suivez-nous</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-4">
                  <a
                    href="#"
                    className="h-10 w-10 flex items-center justify-center rounded-full bg-blue-600 text-white hover:bg-blue-700"
                    aria-label="Facebook"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="h-10 w-10 flex items-center justify-center rounded-full bg-blue-400 text-white hover:bg-blue-500"
                    aria-label="Twitter"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="h-10 w-10 flex items-center justify-center rounded-full bg-pink-600 text-white hover:bg-pink-700"
                    aria-label="Instagram"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="h-10 w-10 flex items-center justify-center rounded-full bg-blue-800 text-white hover:bg-blue-900"
                    aria-label="LinkedIn"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                      <rect x="2" y="9" width="4" height="12" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Notre emplacement</h2>
            <p className="text-gray-600">Venez nous rendre visite à notre siège social</p>
          </div>
          <div className="h-80 bg-gray-200 rounded-lg overflow-hidden">
            {/* In a real app, embed a Google Map here */}
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-12 w-12 mx-auto mb-2 text-gray-400" />
                <p className="text-gray-600">Carte interactive disponible prochainement</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Questions fréquentes</h2>
            <p className="text-gray-600">Trouvez rapidement des réponses à vos questions</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {faqs.map((faq, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex">
                    <MessageSquare className="h-5 w-5 mr-3 mt-1 text-benin-green" />
                    <div>
                      <h3 className="font-medium mb-2">{faq.question}</h3>
                      <p className="text-gray-600">{faq.answer}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-6">
            <Button variant="link" className="text-benin-green">
              Voir toutes les questions fréquentes
            </Button>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Besoin d'une assistance rapide?</h2>
          <p className="text-gray-600 mb-6 max-w-xl mx-auto">
            Notre équipe de support client est disponible pour vous aider à tout moment.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button className="bg-benin-green hover:bg-benin-green/90">
              <Phone className="h-4 w-4 mr-2" />
              +229 97 12 34 56
            </Button>
            <Button variant="outline">
              <Mail className="h-4 w-4 mr-2" />
              support@pharmabenin.com
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
