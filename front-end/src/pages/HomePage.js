import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HeroSection from '../components/HeroSection';
import ServicesSection from '../components/ServicesSection';
import ConsultationSection from '../components/ConsultationSection';
import PasalPintarSection from '../components/PasalPintarSection';

function HomePage() {
  return (
    <>
      <Header /> {/* Add Header here */}
      <HeroSection />
      <ServicesSection />
      <ConsultationSection />
      <PasalPintarSection />
      <Footer /> {/* Add Footer here */}
    </>
  );
}

export default HomePage;
