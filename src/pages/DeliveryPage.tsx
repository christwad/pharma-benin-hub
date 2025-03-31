
import React from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { MapPin, Truck, Clock, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

const DeliveryPage = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Service de Livraison</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
          <div>
            <h2 className="text-xl font-semibold text-benin-green mb-4">Comment fonctionne notre service de livraison?</h2>
            <p className="text-gray-700 mb-6">
              PharmaBenin propose un service de livraison rapide et fiable pour tous vos médicaments et produits de santé. Notre réseau de livreurs couvre les principales villes du Bénin pour vous assurer de recevoir vos commandes en toute sécurité.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-green-50 rounded-full text-benin-green">
                  <Truck size={24} />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Livraison rapide</h3>
                  <p className="text-gray-600">Recevez vos médicaments en 2-4 heures dans les zones urbaines</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="p-3 bg-green-50 rounded-full text-benin-green">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Couverture étendue</h3>
                  <p className="text-gray-600">Nous livrons dans toutes les grandes villes du Bénin</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="p-3 bg-green-50 rounded-full text-benin-green">
                  <Clock size={24} />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Suivi en temps réel</h3>
                  <p className="text-gray-600">Suivez votre commande et connaissez l'heure de livraison estimée</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="p-3 bg-green-50 rounded-full text-benin-green">
                  <Calendar size={24} />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Livraison planifiée</h3>
                  <p className="text-gray-600">Programmez vos livraisons à l'avance pour vos médicaments réguliers</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 p-8 rounded-xl">
            <h2 className="text-xl font-semibold text-benin-green mb-4">Zones de livraison</h2>
            <ul className="space-y-3 mb-6">
              <li className="flex items-center gap-2">
                <MapPin size={16} className="text-benin-green" />
                <span>Cotonou: Livraison en 2-3 heures</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={16} className="text-benin-green" />
                <span>Porto-Novo: Livraison en 3-4 heures</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={16} className="text-benin-green" />
                <span>Abomey-Calavi: Livraison en 2-3 heures</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={16} className="text-benin-green" />
                <span>Parakou: Livraison le jour même</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={16} className="text-benin-green" />
                <span>Autres villes: 24-48 heures</span>
              </li>
            </ul>
            
            <h3 className="font-medium text-gray-900 mb-2">Frais de livraison:</h3>
            <ul className="space-y-2 mb-6">
              <li>Zone urbaine: 1000 FCFA</li>
              <li>Périphérie: 1500 FCFA</li>
              <li>Autres villes: à partir de 2000 FCFA</li>
              <li>Livraison gratuite pour les commandes > 20 000 FCFA</li>
            </ul>
            
            <Link to="/medicines">
              <Button className="w-full bg-benin-green hover:bg-benin-green/90">
                Commander maintenant
              </Button>
            </Link>
          </div>
        </div>
        
        <div className="bg-benin-green/10 p-8 rounded-xl mb-12">
          <h2 className="text-xl font-semibold text-benin-green mb-4">Questions fréquentes sur la livraison</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="font-medium text-gray-900 mb-1">Comment suivre ma commande?</h3>
              <p className="text-gray-600">Une fois votre commande expédiée, vous recevrez un SMS avec un lien de suivi pour connaître la position de votre livreur.</p>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-900 mb-1">Que faire si je ne suis pas disponible lors de la livraison?</h3>
              <p className="text-gray-600">Vous pouvez spécifier un lieu de dépôt sécurisé ou demander à ce que la commande soit remise à une personne de confiance.</p>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-900 mb-1">Les médicaments sont-ils livrés dans de bonnes conditions?</h3>
              <p className="text-gray-600">Tous nos produits sont transportés dans des conteneurs spéciaux qui maintiennent la température et l'intégrité des médicaments.</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DeliveryPage;
