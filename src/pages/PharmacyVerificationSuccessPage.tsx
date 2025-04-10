
import React from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

const PharmacyVerificationSuccessPage = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <Card>
            <CardHeader>
              <div className="flex justify-center">
                <div className="rounded-full bg-green-100 p-3">
                  <CheckCircle2 className="h-12 w-12 text-green-600" />
                </div>
              </div>
              <CardTitle className="text-center mt-4">Vérification réussie !</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-center">
              <p>
                Votre identité a été vérifiée avec succès. Votre demande d'inscription est maintenant
                en cours d'examen par notre équipe administrative.
              </p>
              
              <div className="bg-blue-50 rounded-md p-4 my-4">
                <h3 className="font-semibold text-blue-800">Prochaines étapes:</h3>
                <ul className="text-sm text-blue-700 mt-2 space-y-1 text-left list-disc list-inside">
                  <li>Notre équipe examine votre demande (24-48h)</li>
                  <li>Vous recevrez un email de confirmation une fois approuvé</li>
                  <li>Vous pourrez alors vous connecter à votre espace pharmacie</li>
                </ul>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button asChild className="bg-benin-green hover:bg-benin-green/90">
                <Link to="/">Retour à l'accueil</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default PharmacyVerificationSuccessPage;
