
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
    <footer className="bg-gray-50 mt-12">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* About */}
          <div>
            <h3 className="mb-4 text-lg font-bold text-benin-green">PharmaBenin</h3>
            <p className="mb-4 text-sm text-gray-600">
              Facilitant l'accès aux médicaments pour tous les Béninois, en connectant les pharmacies locales et les clients.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-benin-green">
                <Facebook size={18} />
              </a>
              <a href="#" className="text-gray-500 hover:text-benin-green">
                <Twitter size={18} />
              </a>
              <a href="#" className="text-gray-500 hover:text-benin-green">
                <Instagram size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-lg font-bold text-benin-green">Liens Rapides</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-gray-600 hover:text-benin-green">
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/pharmacies" className="text-gray-600 hover:text-benin-green">
                  Pharmacies
                </Link>
              </li>
              <li>
                <Link to="/medicines" className="text-gray-600 hover:text-benin-green">
                  Médicaments
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-600 hover:text-benin-green">
                  À propos
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-benin-green">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="mb-4 text-lg font-bold text-benin-green">Services</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/delivery" className="text-gray-600 hover:text-benin-green">
                  Livraison
                </Link>
              </li>
              <li>
                <Link to="/click-collect" className="text-gray-600 hover:text-benin-green">
                  Click & Collect
                </Link>
              </li>
              <li>
                <Link to="/pharmacy-signup" className="text-gray-600 hover:text-benin-green">
                  Espace Pharmacie
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-600 hover:text-benin-green">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-lg font-bold text-benin-green">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start space-x-2">
                <MapPin size={16} className="mt-0.5 text-benin-green" />
                <span className="text-gray-600">
                  Boulevard Saint Michel, Cotonou, Bénin
                </span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone size={16} className="text-benin-green" />
                <span className="text-gray-600">+229 97 97 97 97</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail size={16} className="text-benin-green" />
                <span className="text-gray-600">contact@pharmabenin.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-200 pt-8 text-center">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} PharmaBenin. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
