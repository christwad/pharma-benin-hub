
import React from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock, MapPin, Info } from "lucide-react";
import { Link } from "react-router-dom";

const ClickCollectPage = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Click & Collect</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
          <div>
            <h2 className="text-xl font-semibold text-benin-green mb-4">Comment fonctionne notre service Click & Collect?</h2>
            <p className="text-gray-700 mb-6">
              Le service Click & Collect de PharmaBenin vous permet de commander vos médicaments en ligne et de les récupérer dans la pharmacie de votre choix, sans file d'attente et avec une garantie de disponibilité.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-benin-green">
                  1
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Commandez en ligne</h3>
                  <p className="text-gray-600">Sélectionnez vos produits et choisissez l'option "Click & Collect" lors de la validation de votre panier</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-benin-green">
                  2
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Sélectionnez votre pharmacie</h3>
                  <p className="text-gray-600">Choisissez la pharmacie la plus proche de chez vous parmi notre réseau de partenaires</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-benin-green">
                  3
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Recevez une notification</h3>
                  <p className="text-gray-600">Un SMS vous informera lorsque votre commande sera prête à être récupérée</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-benin-green">
                  4
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Récupérez votre commande</h3>
                  <p className="text-gray-600">Présentez-vous au comptoir dédié de la pharmacie avec votre code de retrait</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 p-8 rounded-xl">
            <h2 className="text-xl font-semibold text-benin-green mb-4">Avantages du Click & Collect</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-benin-green flex-shrink-0" />
                <span>Évitez les files d'attente en pharmacie</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-benin-green flex-shrink-0" />
                <span>Garantie de disponibilité des produits</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-benin-green flex-shrink-0" />
                <span>Service gratuit, sans frais supplémentaires</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-benin-green flex-shrink-0" />
                <span>Paiement en ligne ou sur place</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-benin-green flex-shrink-0" />
                <span>Conseil pharmaceutique lors du retrait</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-benin-green flex-shrink-0" />
                <span>Délai de préparation express (30 min à 1h)</span>
              </div>
            </div>
            
            <div className="bg-yellow-50 p-4 rounded-lg mb-6 flex gap-3">
              <Info className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-yellow-800 text-sm">
                  Pour les médicaments sur ordonnance, n'oubliez pas d'apporter votre prescription originale lors du retrait.
                </p>
              </div>
            </div>
            
            <Link to="/medicines">
              <Button className="w-full bg-benin-green hover:bg-benin-green/90">
                Commander en Click & Collect
              </Button>
            </Link>
          </div>
        </div>
        
        <div className="mb-12">
          <h2 className="text-xl font-semibold text-benin-green mb-6">Pharmacies partenaires Click & Collect</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: "Pharmacie Centrale",
                address: "123 Boulevard Saint Michel, Cotonou",
                hours: "Lun-Sam: 8h-22h, Dim: 9h-20h"
              },
              {
                name: "Pharmacie des Cocotiers",
                address: "45 Avenue de la Liberté, Cotonou",
                hours: "Lun-Sam: 8h-21h, Dim: 9h-19h"
              },
              {
                name: "Pharmacie du Port",
                address: "78 Rue du Commerce, Cotonou",
                hours: "Lun-Sam: 7h-22h, Dim: 8h-21h"
              },
              {
                name: "Pharmacie Nouvelle",
                address: "12 Avenue Jean-Paul II, Porto-Novo",
                hours: "Lun-Sam: 8h-20h, Dim: 9h-18h"
              },
              {
                name: "Pharmacie du Marché",
                address: "34 Rue des Échanges, Parakou",
                hours: "Lun-Sam: 8h-21h, Dim: 9h-19h"
              },
              {
                name: "Pharmacie de l'Étoile",
                address: "56 Boulevard Circulaire, Abomey-Calavi",
                hours: "Lun-Sam: 8h-22h, Dim: 9h-20h"
              }
            ].map((pharmacy, index) => (
              <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <h3 className="font-medium text-gray-900 mb-2">{pharmacy.name}</h3>
                <div className="flex items-start gap-2 mb-2">
                  <MapPin className="h-4 w-4 text-benin-green flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-600">{pharmacy.address}</span>
                </div>
                <div className="flex items-start gap-2">
                  <Clock className="h-4 w-4 text-benin-green flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-600">{pharmacy.hours}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ClickCollectPage;
