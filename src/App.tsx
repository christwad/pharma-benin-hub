import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
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
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { Toaster } from '@/components/ui/sonner';

// Composant pour rediriger si l'utilisateur n'est pas authentifié
const RequireAuth = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Attendre que le chargement initial soit terminé
    if (!loading && !user) {
      navigate('/login', { replace: true });
    }
  }, [user, loading, navigate]);
  
  if (loading) {
    // Afficher un indicateur de chargement
    return <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-benin-green"></div>
    </div>;
  }
  
  // Si l'utilisateur est connecté, afficher le contenu
  return user ? <>{children}</> : null;
};

// Composant pour rediriger si l'utilisateur n'est pas une pharmacie
const ProtectedPharmacyRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!loading && (!user || user.role !== 'pharmacist')) {
      navigate('/login', { replace: true });
    }
  }, [user, loading, navigate]);
  
  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-benin-green"></div>
    </div>;
  }
  
  return user?.role === 'pharmacist' ? <>{children}</> : null;
};

// Composant pour protéger les routes d'administration
const ProtectedAdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!loading && (!user || user.role !== 'admin')) {
      navigate('/admin-login', { replace: true });
    }
  }, [user, loading, navigate]);
  
  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-benin-green"></div>
    </div>;
  }
  
  return user?.role === 'admin' ? <>{children}</> : null;
};

// Composant pour protéger les routes client
const ProtectedClientRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!loading && (!user || user.role !== 'client')) {
      navigate('/login', { replace: true });
    }
  }, [user, loading, navigate]);
  
  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-benin-green"></div>
    </div>;
  }
  
  return user?.role === 'client' ? <>{children}</> : null;
};

const AppRoutes = () => {
  return (
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
  );
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
        <Toaster />
      </Router>
    </AuthProvider>
  );
};

export default App;
