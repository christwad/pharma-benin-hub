
import React from "react";
import Layout from "@/components/layout/Layout";
import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
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
      <div className="bg-gray-50">
      </div>
      <Testimonials />
      <CTA />
    </Layout>
  );
};

export default Index;
