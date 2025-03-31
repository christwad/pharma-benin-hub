
import React from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Target, Globe, HeartPulse } from "lucide-react";

const About = () => {
  const teamMembers = [
    {
      name: "Dr. Jean Dupont",
      role: "Fondateur & PDG",
      description: "Pharmacien avec 15 ans d'expérience, passionné par l'innovation en santé.",
    },
    {
      name: "Marie Kouadio",
      role: "Directrice Technique",
      description: "Experte en systèmes informatiques de santé et développement numérique.",
    },
    {
      name: "Ahmed Traoré",
      role: "Responsable Développement Commercial",
      description: "Stratège en développement d'entreprises de technologie de santé.",
    }
  ];

  const valeurs = [
    {
      icon: <HeartPulse className="h-8 w-8 text-benin-green" />,
      titre: "Santé et Bien-être",
      description: "Notre mission est de faciliter l'accès aux médicaments et aux soins de santé."
    },
    {
      icon: <Globe className="h-8 w-8 text-benin-green" />,
      titre: "Innovation Technologique",
      description: "Nous utilisons la technologie pour moderniser l'accès aux services pharmaceutiques."
    },
    {
      icon: <Users className="h-8 w-8 text-benin-green" />,
      titre: "Proximité et Confiance",
      description: "Nous construisons des relations durables avec nos pharmacies partenaires et nos patients."
    }
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Section Histoire */}
          <section>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center">
              À propos de PharmaBenin
            </h1>
            <Card>
              <CardContent className="p-8">
                <p className="text-lg text-gray-700 mb-4">
                  PharmaBenin est née de la vision de faciliter l'accès aux médicaments 
                  et aux services pharmaceutiques à travers une plateforme numérique innovante. 
                  Fondée en 2023, notre entreprise a pour objectif de connecter les pharmacies 
                  et les patients de manière simple, sécurisée et efficace.
                </p>
                <p className="text-lg text-gray-700">
                  Nous croyons en un système de santé moderne, accessible et centré sur le patient, 
                  où la technologie devient un véritable levier pour améliorer les soins.
                </p>
              </CardContent>
            </Card>
          </section>

          {/* Section Valeurs */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Nos Valeurs Fondamentales
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {valeurs.map((valeur, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="flex flex-col items-center text-center">
                    {valeur.icon}
                    <CardTitle className="mt-4">{valeur.titre}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-center">{valeur.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Section Équipe */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Notre Équipe
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {teamMembers.map((member, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 text-center">
                    <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                    <p className="text-benin-green font-medium mb-3">{member.role}</p>
                    <p className="text-gray-600">{member.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Call to Action */}
          <section className="text-center">
            <Card className="bg-gray-50">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4">Nous rejoindre</h2>
                <p className="text-gray-700 mb-6">
                  Que vous soyez une pharmacie ou un patient, rejoignez la révolution 
                  numérique des services pharmaceutiques au Bénin.
                </p>
                <div className="flex justify-center space-x-4">
                  <Button>Inscription Pharmacie</Button>
                  <Button variant="outline">Contactez-nous</Button>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default About;
