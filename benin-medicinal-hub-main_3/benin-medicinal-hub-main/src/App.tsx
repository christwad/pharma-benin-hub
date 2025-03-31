
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
import FAQPage from '@/pages/FAQPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />
        <Route path="/pharmacy-register" element={<PharmacyRegister />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/account" element={<UserAccount />} />
        <Route path="/medicines" element={<MedicinesPage />} />
        <Route path="/pharmacies" element={<PharmaciesPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/delivery" element={<DeliveryPage />} />
        <Route path="/click-collect" element={<ClickCollectPage />} />
        <Route path="/pharmacy-signup" element={<PharmacySignupPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
