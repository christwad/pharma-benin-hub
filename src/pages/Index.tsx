
import React from "react";
import Layout from "@/components/layout/Layout";
import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import PopularPharmacies from "@/components/home/PopularPharmacies";
import PopularMedicines from "@/components/home/PopularMedicines";
import HowItWorks from "@/components/home/HowItWorks";
import Testimonials from "@/components/home/Testimonials";
import CTA from "@/components/home/CTA";

const Index = () => {
  return (
    <Layout>
      <Hero />
      <Features />
      <div className="bg-gray-50">
        <HowItWorks />
      </div>
      <PopularPharmacies />
      <div className="bg-gray-50">
        <PopularMedicines />
      </div>
      <Testimonials />
      <CTA />
    </Layout>
  );
};

export default Index;
