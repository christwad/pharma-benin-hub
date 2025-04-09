
import React from "react";
import { Link } from "react-router-dom";
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Phone, 
  Mail, 
  MapPin 
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-50 mt-0 border-t">
      <div className="container mx-auto px-4 py-16">
        {/* Top section with logo and social links */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div className="flex items-center mb-6 md:mb-0">
            <div className="relative h-12 w-12 overflow-hidden rounded-full bg-benin-green mr-3">
              <img 
                src="/lovable-uploads/db0dd2a6-c5b1-473a-b480-dfe3585f5c23.png" 
                alt="PB Logo Animé"
                className="h-full w-full object-cover"
              />
            </div>
            <span className="text-2xl font-bold text-benin-green">
              Pharma<span className="text-medical-dark">Benin</span>
            </span>
          </div>
          
          <div className="flex space-x-6">
            <a href="#" className="text-benin-green hover:text-benin-green/80 transition-colors">
              <Facebook size={24} />
            </a>
            <a href="#" className="text-benin-green hover:text-benin-green/80 transition-colors">
              <Twitter size={24} />
            </a>
            <a href="#" className="text-benin-green hover:text-benin-green/80 transition-colors">
              <Instagram size={24} />
            </a>
          </div>
        </div>

        {/* Main footer content */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 mb-12">
          {/* About */}
          <div>
            <h3 className="mb-6 text-lg font-bold text-benin-green">PharmaBenin</h3>
            <p className="mb-4 text-base text-gray-600 leading-relaxed">
              Facilitant l'accès aux médicaments pour tous les Béninois, en connectant les pharmacies locales et les clients.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-6 text-lg font-bold text-benin-green">Liens Rapides</h3>
            <ul className="space-y-4 text-base">
              <li>
                <Link to="/" className="text-gray-600 hover:text-benin-green transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/pharmacies" className="text-gray-600 hover:text-benin-green transition-colors">
                  Pharmacies
                </Link>
              </li>
              <li>
                <Link to="/medicines" className="text-gray-600 hover:text-benin-green transition-colors">
                  Médicaments
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-600 hover:text-benin-green transition-colors">
                  À propos
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-benin-green transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="mb-6 text-lg font-bold text-benin-green">Services</h3>
            <ul className="space-y-4 text-base">
              <li>
                <Link to="/delivery" className="text-gray-600 hover:text-benin-green transition-colors">
                  Livraison
                </Link>
              </li>
              <li>
                <Link to="/click-collect" className="text-gray-600 hover:text-benin-green transition-colors">
                  Click & Collect
                </Link>
              </li>
              <li>
                <Link to="/pharmacy-signup" className="text-gray-600 hover:text-benin-green transition-colors">
                  Espace Pharmacie
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-600 hover:text-benin-green transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-6 text-lg font-bold text-benin-green">Contact</h3>
            <ul className="space-y-4 text-base">
              <li className="flex items-start space-x-3">
                <MapPin size={20} className="mt-0.5 text-benin-green" />
                <span className="text-gray-600">
                  Boulevard Saint Michel, Cotonou, Bénin
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={20} className="text-benin-green" />
                <span className="text-gray-600">+229 97 97 97 97</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={20} className="text-benin-green" />
                <span className="text-gray-600">contact@pharmabenin.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom section with copyright */}
        <div className="border-t border-gray-200 pt-8 text-center">
          <p className="text-base text-gray-500">
            © {new Date().getFullYear()} PharmaBenin. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
