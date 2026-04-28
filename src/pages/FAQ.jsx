import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useLang } from '../lib/LanguageContext';
import { useT } from '../lib/i18n';

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={`border rounded-xl overflow-hidden transition-all cursor-pointer ${
        open ? 'border-shield-green/40 bg-shield-green/5' : 'border-shield-border bg-shield-card hover:border-shield-green/20'
      }`}
      onClick={() => setOpen(o => !o)}
    >
      <div className="flex items-center justify-between px-5 py-4 gap-4">
        <span className="text-white font-medium text-sm leading-snug">{q}</span>
        {open
          ? <ChevronUp className="w-4 h-4 text-shield-green flex-shrink-0" />
          : <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" />
        }
      </div>
      {open && (
        <div className="px-5 pb-5 text-gray-400 text-sm leading-relaxed border-t border-shield-border/50">
          <p className="pt-4">{a}</p>
        </div>
      )}
    </div>
  );
}

export default function FAQ() {
  const { lang } = useLang();
  const t = useT(lang);

  const FAQS = [
    {
      cat: t('faq_cat1'),
      items: [
        { q: t('faq_q1'), a: t('faq_a1') },
        { q: t('faq_q2'), a: t('faq_a2') },
        { q: t('faq_q3'), a: t('faq_a3') },
      ],
    },
    {
      cat: t('faq_cat2'),
      items: [
        { q: t('faq_q4'), a: t('faq_a4') },
        { q: t('faq_q5'), a: t('faq_a5') },
        { q: t('faq_q6'), a: t('faq_a6') },
        { q: t('faq_q7'), a: t('faq_a7') },
      ],
    },
    {
      cat: t('faq_cat3'),
      items: [
        { q: t('faq_q8'), a: t('faq_a8') },
        { q: t('faq_q9'), a: t('faq_a9') },
        { q: t('faq_q10'), a: t('faq_a10') },
      ],
    },
    {
      cat: t('faq_cat4'),
      items: [
        { q: t('faq_q11'), a: t('faq_a11') },
        { q: t('faq_q12'), a: t('faq_a12') },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-shield-dark">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 pt-28 pb-20">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-shield-green/10 border border-shield-green/30 rounded-full text-shield-green text-sm font-medium mb-6">
            <HelpCircle className="w-4 h-4" />
            {t('faq_badge')}
          </div>
          <h1 className="font-poppins font-black text-4xl md:text-5xl text-white mb-4">
            {t('faq_title')} <span className="text-gradient-green">{t('faq_title2')}</span>
          </h1>
          <p className="text-gray-400 text-lg">{t('faq_subtitle')}</p>
        </div>

        {/* FAQ categories */}
        <div className="space-y-10">
          {FAQS.map(cat => (
            <div key={cat.cat}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-1 h-5 bg-shield-green rounded-full" />
                <h2 className="font-poppins font-bold text-white text-lg">{cat.cat}</h2>
              </div>
              <div className="space-y-3">
                {cat.items.map((item, i) => <FAQItem key={i} q={item.q} a={item.a} />)}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 p-8 bg-shield-card border border-shield-border rounded-2xl text-center">
          <Shield className="w-10 h-10 text-shield-green mx-auto mb-4" />
          <h3 className="font-poppins font-bold text-white text-xl mb-2">{t('faq_cta_title')}</h3>
          <p className="text-gray-400 text-sm mb-6">{t('faq_cta_subtitle')}</p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-shield-green text-black font-bold rounded-xl hover:bg-green-400 transition-all btn-glow"
          >
            {t('faq_cta_btn')}
          </Link>
        </div>
      </div>
      <Footer lang={lang} />
    </div>
  );
}