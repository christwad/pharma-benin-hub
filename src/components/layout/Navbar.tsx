
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Search, 
  ShoppingCart, 
  Menu, 
  Shield,
  User
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/hooks/use-cart";
import { useAuth } from "@/contexts/AuthContext";

const Navbar = () => {
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartCount } = useCart();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const { user } = useAuth();
  
  // Detect scroll to add shadow
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navLinks = [
    { name: "Accueil", path: "/" },
    { name: "Pharmacies", path: "/pharmacies" },
    { name: "Médicaments", path: "/medicines" },
    { name: "À propos", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  // Rediriger vers le bon dashboard en fonction du rôle
  const getDashboardLink = () => {
    if (!user) return "/login";
    
    switch (user.role) {
      case 'admin':
        return '/admin';
      case 'pharmacist':
        return '/pharmacy-dashboard';
      case 'client':
      default:
        return '/client-dashboard';
    }
  };

  // Check if the path is active
  const isActivePath = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className={`sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur-md transition-all duration-300 ${
      isScrolled ? "shadow-md" : ""
    }`}>
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="relative h-10 w-10 overflow-hidden rounded-full bg-benin-green">
              <img 
                src="/lovable-uploads/db0dd2a6-c5b1-473a-b480-dfe3585f5c23.png" 
                alt="PB Logo Animé"
                className="h-full w-full object-cover"
              />
            </div>
            <span className="hidden text-2xl font-bold text-benin-green sm:inline-block">
              Pharma<span className="text-medical-dark">Benin</span>
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center md:gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-base font-medium transition-colors ${
                isActivePath(link.path) 
                  ? "text-benin-green border-b-2 border-benin-green pb-1" 
                  : "text-gray-700 hover:text-benin-green"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <Link to="/search" className="text-gray-700 hover:text-benin-green">
            <Search className="h-5 w-5" />
          </Link>
          <Link to="/cart" className="relative text-gray-700 hover:text-benin-green">
            <ShoppingCart className="h-5 w-5" />
            {cartCount > 0 && (
              <Badge className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-benin-red text-[10px] text-white">
                {cartCount}
              </Badge>
            )}
          </Link>
          
          {user ? (
            <Link to={getDashboardLink()}>
              <Button variant="outline" size="sm" className="hidden md:flex gap-2 border-benin-green text-benin-green hover:bg-benin-green hover:text-white">
                <User className="h-4 w-4" />
                <span>Mon espace</span>
              </Button>
            </Link>
          ) : (
            <Link to="/login">
              <Button variant="outline" size="sm" className="hidden md:flex gap-2 border-benin-green text-benin-green hover:bg-benin-green hover:text-white">
                <span>Espace Client</span>
              </Button>
            </Link>
          )}
          
          <Link to="/admin-login">
            <Button variant="outline" size="sm" className="hidden md:flex gap-2 border-gray-300 text-gray-700 hover:bg-gray-100">
              <Shield className="h-4 w-4" />
              <span>Admin</span>
            </Button>
          </Link>

          {/* Mobile menu button */}
          {isMobile && (
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[250px] sm:w-[300px]">
                <div className="flex flex-col gap-4 py-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      className={`text-base font-medium ${
                        isActivePath(link.path) 
                          ? "text-benin-green" 
                          : "text-gray-700 hover:text-benin-green"
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                  ))}
                  <div className="mt-4 flex flex-col gap-2">
                    {user ? (
                      <Link 
                        to={getDashboardLink()} 
                        onClick={() => setIsMenuOpen(false)}
                        className="w-full"
                      >
                        <Button variant="outline" className="w-full justify-start gap-2 border-benin-green text-benin-green hover:bg-benin-green hover:text-white">
                          <User className="h-4 w-4" />
                          <span>Mon espace</span>
                        </Button>
                      </Link>
                    ) : (
                      <Link 
                        to="/login" 
                        onClick={() => setIsMenuOpen(false)}
                        className="w-full"
                      >
                        <Button variant="outline" className="w-full justify-start gap-2 border-benin-green text-benin-green hover:bg-benin-green hover:text-white">
                          <span>Espace Client</span>
                        </Button>
                      </Link>
                    )}
                    <Link 
                      to="/admin-login" 
                      onClick={() => setIsMenuOpen(false)}
                      className="w-full"
                    >
                      <Button variant="outline" className="w-full justify-start gap-2 border-gray-300 text-gray-700 hover:bg-gray-100">
                        <Shield className="h-4 w-4" />
                        <span>Admin</span>
                      </Button>
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
