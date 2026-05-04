import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle, Shield, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageHelmet from '../lib/seo-helmet';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useLang } from '../lib/LanguageContext';
import { useT } from '../lib/i18n';
import { getFaqExtended } from '../lib/faq-extended';
import { FAQ_PRICING, getFaqPricingT } from '../lib/faq-pricing-translations';

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
  const ext = getFaqExtended(lang);
  const pt = (key) => getFaqPricingT(key, lang);

  const pricingPlans = [
    { desc: pt('faq_plan_free_desc'), popular: false },
    { desc: pt('faq_plan_voyageur_desc'), popular: false },
    { desc: pt('faq_plan_voyageur_plus_desc'), popular: true },
  ];

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
      cat: pt('faq_cat_pricing'),
      pricing: true,
      items: [
        { q: pt('faq_q8'), a: pt('faq_a8') },
        { q: pt('faq_q9'), a: pt('faq_a9') },
        { q: t('faq_q10'), a: t('faq_a10') },
      ],
    },
    {
      cat: t('faq_cat4'),
      items: [
        { q: t('faq_q11'), a: t('faq_a11') },
        { q: t('faq_q12'), a: t('faq_a12') },
        { q: ext.faq_q20, a: ext.faq_a20 },
      ],
    },
    {
      cat: lang === 'fr' ? 'En cas de problème' : lang === 'en' ? 'If Something Goes Wrong' : lang === 'es' ? 'En caso de problemas' : lang === 'de' ? 'Bei Problemen' : lang === 'ar' ? 'في حالة وجود مشكلة' : 'إلا وقعت مشكلة',
      items: [
        { q: ext.faq_q13, a: ext.faq_a13 },
        { q: ext.faq_q14, a: ext.faq_a14 },
        { q: ext.faq_q17, a: ext.faq_a17 },
      ],
    },
    {
      cat: lang === 'fr' ? 'Questions pratiques avancées' : lang === 'en' ? 'Advanced practical questions' : lang === 'es' ? 'Preguntas prácticas avanzadas' : lang === 'de' ? 'Erweiterte praktische Fragen' : lang === 'ar' ? 'أسئلة عملية متقدمة' : 'أسيلة عملية متقدمة',
      items: [
        { q: ext.faq_q15, a: ext.faq_a15 },
        { q: ext.faq_q16, a: ext.faq_a16 },
        { q: ext.faq_q18, a: ext.faq_a18 },
        { q: ext.faq_q19, a: ext.faq_a19 },
      ],
    },
  ];



  return (
    <div className="min-h-screen bg-shield-dark">
      <PageHelmet page="faq" lang={lang} />
      <noscript>
        <article style={{padding:'2rem',fontFamily:'sans-serif'}}>
          <h1>Questions Fréquentes sur Tooristoo</h1>
          <dl>
            <dt>Qu'est-ce que Tooristoo ?</dt>
            <dd>Tooristoo est une application de coach vocal IA négociateur qui aide les touristes à négocier les meilleurs prix au Maroc, détecter les arnaques et obtenir des phrases de négociation en darija marocain en temps réel.</dd>
            <dt>Est-ce que Tooristoo est gratuit ?</dt>
            <dd>Oui, Tooristoo propose un plan gratuit avec 3 analyses par jour. Les plans Voyageur et Pro offrent des analyses illimitées et des fonctionnalités avancées.</dd>
            <dt>Dans quelles langues fonctionne Tooristoo ?</dt>
            <dd>Tooristoo est disponible en français, anglais, espagnol, allemand, arabe et darija marocain.</dd>
            <dt>Quelles villes du Maroc sont couvertes ?</dt>
            <dd>Tooristoo couvre toutes les grandes villes : Marrakech, Fès, Casablanca, Chefchaouen, Agadir, Tanger, Rabat, Meknès, Ouarzazate, Merzouga, Essaouira, Dakhla et El Jadida.</dd>
            <dt>Comment fonctionne la détection d'arnaques ?</dt>
            <dd>Notre IA analyse le prix demandé par rapport à une base de données de prix réels locaux. Si le prix demandé dépasse significativement la fourchette normale, une alerte est émise et une stratégie de négociation est proposée.</dd>
            <dt>Quels types de services sont analysés ?</dt>
            <dd>Taxis, hôtels, riads, restaurants, excursions, shopping et souks, transport, guides touristiques, spas et hammams.</dd>
            <dt>Les prestataires certifiés Tooristoo sont-ils fiables ?</dt>
            <dd>Oui, les prestataires certifiés ont été vérifiés par notre équipe. Ils s'engagent à afficher des prix transparents et à respecter une charte de qualité.</dd>
            <dt>Puis-je utiliser Tooristoo hors ligne ?</dt>
            <dd>L'analyse IA nécessite une connexion internet. Les phrases de négociation sauvegardées sont accessibles hors ligne.</dd>
            <dt>Comment signaler une arnaque ?</dt>
            <dd>Depuis l'application, après une analyse, vous pouvez signaler un prestataire frauduleux directement via le panneau de signalement communautaire.</dd>
            <dt>Tooristoo fonctionne-t-il sur mobile ?</dt>
            <dd>Oui, Tooristoo est une application web progressive (PWA) accessible sur iOS et Android depuis votre navigateur, sans installation requise.</dd>
          </dl>
        </article>
      </noscript>
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
                <h2 className="font-poppins font-bold text-white text-lg flex items-center gap-2">
                  {cat.pricing && <Tag className="w-4 h-4 text-shield-green" />}
                  {cat.cat}
                </h2>
              </div>
              {/* Pricing summary card */}
              {cat.pricing && (
                <div className="mb-4 bg-shield-card border border-shield-green/20 rounded-2xl p-5">
                  <p className="text-gray-400 text-sm mb-4">{pt('faq_pricing_intro')}</p>
                  <div className="space-y-3">
                    {pricingPlans.map((plan, i) => (
                      <div key={i} className={`flex items-start gap-2 text-sm rounded-xl px-3 py-2 ${plan.popular ? 'bg-shield-green/10 border border-shield-green/30' : 'bg-shield-dark/50'}`}>
                        <span className="text-shield-green mt-0.5 flex-shrink-0">✓</span>
                        <span className={plan.popular ? 'text-white' : 'text-gray-300'}>{plan.desc}</span>
                      </div>
                    ))}
                  </div>
                  <Link
                    to="/#pricing"
                    className="mt-4 inline-flex items-center gap-2 text-shield-green text-sm font-semibold hover:text-green-400 transition-colors"
                  >
                    {pt('faq_pricing_cta')}
                  </Link>
                </div>
              )}
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