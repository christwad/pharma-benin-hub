
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/hooks/use-cart";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PharmaciesPage from "./pages/PharmaciesPage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import PharmacyRegister from "./pages/PharmacyRegister";
import MedicinesPage from "./pages/MedicinesPage";
import UserAccount from "./pages/UserAccount";
import Contact from "./pages/Contact";

// Create a client
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CartProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/pharmacies" element={<PharmaciesPage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/pharmacy-register" element={<PharmacyRegister />} />
            <Route path="/medicines" element={<MedicinesPage />} />
            <Route path="/account" element={<UserAccount />} />
            <Route path="/contact" element={<Contact />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
