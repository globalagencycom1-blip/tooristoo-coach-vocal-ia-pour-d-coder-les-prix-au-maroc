import React, { useEffect } from 'react';
import { useLang } from '../lib/LanguageContext';
import Navbar from '../components/Navbar';
import HeroSection from '../components/landing/HeroSection';
import FeaturesSection from '../components/landing/FeaturesSection';
import AnalysisSection from '../components/landing/AnalysisSection';
import VoiceCoachDemoSection from '../components/landing/VoiceCoachDemoSection';
import PricingSection from '../components/landing/PricingSection';
import TestimonialsSection from '../components/landing/TestimonialsSection';
import CTASection from '../components/landing/CTASection';
import AlertsBanner from '../components/landing/AlertsBanner';
import NewsletterSection from '../components/landing/NewsletterSection';
import VoiceHeroSection from '../components/landing/VoiceHeroSection';
import BlogHighlightSection from '../components/landing/BlogHighlightSection';
import Footer from '../components/Footer';

export default function Landing() {
  const { lang } = useLang();

  useEffect(() => {
    // Lit l'ancre stockée par AppPage et scrolle vers la carte pricing
    const anchor = sessionStorage.getItem('scrollTo');
    if (anchor) {
      sessionStorage.removeItem('scrollTo');
      // Attend que la page soit rendue avant de scroller
      setTimeout(() => {
        const el = document.getElementById(anchor);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 600);
    }
  }, []);

  return (
    <div className="min-h-screen bg-shield-dark">
      <Navbar />
      <HeroSection lang={lang} />
      <VoiceHeroSection lang={lang} />
      <FeaturesSection lang={lang} />
      <AnalysisSection lang={lang} />
      <VoiceCoachDemoSection lang={lang} />
      <TestimonialsSection lang={lang} />
      <AlertsBanner />
      <PricingSection lang={lang} />
      <BlogHighlightSection lang={lang} />
      <NewsletterSection lang={lang} />
      <CTASection lang={lang} />
      <Footer lang={lang} />
    </div>
  );
}