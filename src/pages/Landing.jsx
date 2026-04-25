import React from 'react';
import { useLang } from '../lib/LanguageContext';
import Navbar from '../components/Navbar';
import HeroSection from '../components/landing/HeroSection';
import FeaturesSection from '../components/landing/FeaturesSection';
import AnalysisSection from '../components/landing/AnalysisSection';
import PricingSection from '../components/landing/PricingSection';
import TestimonialsSection from '../components/landing/TestimonialsSection';
import CTASection from '../components/landing/CTASection';
import Footer from '../components/Footer';

export default function Landing() {
  const { lang } = useLang();

  return (
    <div className="min-h-screen bg-shield-dark">
      <Navbar />
      <HeroSection lang={lang} />
      <FeaturesSection lang={lang} />
      <AnalysisSection lang={lang} />
      <TestimonialsSection lang={lang} />
      <PricingSection lang={lang} />
      <CTASection lang={lang} />
      <Footer lang={lang} />
    </div>
  );
}