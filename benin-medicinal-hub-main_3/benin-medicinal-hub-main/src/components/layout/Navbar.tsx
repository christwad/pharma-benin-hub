
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Search, 
  ShoppingCart, 
  Menu, 
  X, 
  User,
  LogIn
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/hooks/use-cart";

const Navbar = () => {
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartCount } = useCart();

  const navLinks = [
    { name: "Accueil", path: "/" },
    { name: "Pharmacies", path: "/pharmacies" },
    { name: "Médicaments", path: "/medicines" },
    { name: "À propos", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white/90 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="relative h-8 w-8 overflow-hidden rounded-full bg-benin-green">
              <div className="absolute inset-0 flex items-center justify-center text-white">
                <span className="font-bold">PB</span>
              </div>
            </div>
            <span className="hidden text-xl font-bold text-benin-green sm:inline-block">
              Pharma<span className="text-medical-dark">Benin</span>
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center md:gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="text-sm font-medium text-gray-700 transition-colors hover:text-benin-green"
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
          <Link to="/login">
            <Button variant="outline" size="sm" className="hidden md:flex gap-2">
              <LogIn className="h-4 w-4" />
              <span>Connexion</span>
            </Button>
          </Link>
          <Link to="/account">
            <Button variant="default" size="sm" className="hidden md:flex gap-2">
              <User className="h-4 w-4" />
              <span>Compte</span>
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
                      className="text-base font-medium text-gray-700 transition-colors hover:text-benin-green"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                  ))}
                  <div className="mt-4 flex flex-col gap-2">
                    <Link 
                      to="/login" 
                      onClick={() => setIsMenuOpen(false)}
                      className="w-full"
                    >
                      <Button variant="outline" className="w-full justify-start gap-2">
                        <LogIn className="h-4 w-4" />
                        <span>Connexion</span>
                      </Button>
                    </Link>
                    <Link 
                      to="/account" 
                      onClick={() => setIsMenuOpen(false)}
                      className="w-full"
                    >
                      <Button variant="default" className="w-full justify-start gap-2">
                        <User className="h-4 w-4" />
                        <span>Compte</span>
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
