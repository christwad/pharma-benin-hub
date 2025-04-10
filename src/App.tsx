
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Index from '@/pages/Index';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import About from '@/pages/About';
import PharmacyRegister from '@/pages/PharmacyRegister';
import Contact from '@/pages/Contact';
import UserAccount from '@/pages/UserAccount';
import MedicinesPage from '@/pages/MedicinesPage';
import PharmaciesPage from '@/pages/PharmaciesPage';
import SearchPage from '@/pages/SearchPage';
import CartPage from '@/pages/CartPage';
import NotFound from '@/pages/NotFound';
import DeliveryPage from '@/pages/DeliveryPage';
import ClickCollectPage from '@/pages/ClickCollectPage';
import PharmacySignupPage from '@/pages/PharmacySignupPage';
import PharmacyVerificationPage from '@/pages/PharmacyVerificationPage';
import PharmacyVerificationSuccessPage from '@/pages/PharmacyVerificationSuccessPage';
import FAQPage from '@/pages/FAQPage';
import AdminDashboard from '@/pages/AdminDashboard';
import PharmacyDashboard from '@/pages/PharmacyDashboard';
import PharmacySubscriptionPage from '@/pages/PharmacySubscriptionPage';
import AdminLogin from '@/pages/AdminLogin';
import ClientDashboard from '@/pages/ClientDashboard';

// Composant pour rediriger si l'utilisateur n'est pas authentifié
const RequireAuth = ({ children }: { children: React.ReactNode }) => {
  const userType = localStorage.getItem('userType');
  
  // Si l'utilisateur n'est pas connecté, rediriger vers la page de connexion
  if (!userType) {
    return <Navigate to="/login" />;
  }
  
  return <>{children}</>;
};

// Composant pour rediriger si l'utilisateur n'est pas une pharmacie ou un admin
const ProtectedPharmacyRoute = ({ children }: { children: React.ReactNode }) => {
  const userType = localStorage.getItem('userType');
  
  // Si l'utilisateur n'est pas une pharmacie ou un admin, rediriger vers la page de connexion
  if (userType !== 'pharmacy' && userType !== 'admin') {
    return <Navigate to="/login" />;
  }
  
  return <>{children}</>;
};

// Composant pour protéger les routes d'administration
const ProtectedAdminRoute = ({ children }: { children: React.ReactNode }) => {
  const userType = localStorage.getItem('userType');
  
  // Si l'utilisateur n'est pas un admin, rediriger
  if (userType !== 'admin') {
    return <Navigate to="/admin-login" />;
  }
  
  return <>{children}</>;
};

// Composant pour protéger les routes client
const ProtectedClientRoute = ({ children }: { children: React.ReactNode }) => {
  const userType = localStorage.getItem('userType');
  
  // Si l'utilisateur n'est pas un client, rediriger
  if (userType !== 'client') {
    return <Navigate to="/login" />;
  }
  
  return <>{children}</>;
};

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Routes publiques accessibles à tous */}
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />
        <Route path="/pharmacy-register" element={<PharmacyRegister />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/medicines" element={<MedicinesPage />} />
        <Route path="/pharmacies" element={<PharmaciesPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/pharmacy-signup" element={<PharmacySignupPage />} />
        <Route path="/pharmacy-verification" element={<PharmacyVerificationPage />} />
        <Route path="/pharmacy-verification-success" element={<PharmacyVerificationSuccessPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/pharmacy-subscription" element={<PharmacySubscriptionPage />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        
        {/* Routes nécessitant une authentification */}
        <Route 
          path="/cart" 
          element={
            <RequireAuth>
              <CartPage />
            </RequireAuth>
          } 
        />
        <Route 
          path="/delivery" 
          element={
            <RequireAuth>
              <DeliveryPage />
            </RequireAuth>
          } 
        />
        <Route 
          path="/click-collect" 
          element={
            <RequireAuth>
              <ClickCollectPage />
            </RequireAuth>
          } 
        />
        
        {/* Route protégée pour l'espace client */}
        <Route 
          path="/client-dashboard" 
          element={
            <ProtectedClientRoute>
              <ClientDashboard />
            </ProtectedClientRoute>
          } 
        />
        
        {/* Route protégée pour l'espace personnel (dépréciée, à rediriger) */}
        <Route 
          path="/account" 
          element={
            <RequireAuth>
              <Navigate to="/client-dashboard" replace />
            </RequireAuth>
          } 
        />
        
        {/* Route protégée pour le dashboard pharmacie */}
        <Route 
          path="/pharmacy-dashboard" 
          element={
            <ProtectedPharmacyRoute>
              <PharmacyDashboard />
            </ProtectedPharmacyRoute>
          } 
        />
        
        {/* Route protégée pour l'administration */}
        <Route 
          path="/admin" 
          element={
            <ProtectedAdminRoute>
              <AdminDashboard />
            </ProtectedAdminRoute>
          } 
        />
        
        {/* Route générique pour les URLs non trouvées */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
