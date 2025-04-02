
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
      <div className="bg-gray-50">
        <HowItWorks />
      </div>
      <Features />
      <div className="bg-gray-50">
        <PopularPharmacies />
      </div>
      <PopularMedicines />
      <div className="bg-gray-50">
        <Testimonials />
      </div>
      <CTA />
    </Layout>
  );
};

export default Index;
