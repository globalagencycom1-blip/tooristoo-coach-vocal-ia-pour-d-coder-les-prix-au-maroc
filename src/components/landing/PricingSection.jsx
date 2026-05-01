import React from 'react';
import { Link } from 'react-router-dom';
import { Check, Zap } from 'lucide-react';
import { useT } from '../../lib/i18n';

export default function PricingSection({ lang }) {
  const t = useT(lang);

  const plans = [
    {
      key: 'free',
      name: lang === 'fr' ? 'Gratuit' : lang === 'en' ? 'Free' : lang === 'es' ? 'Gratis' : lang === 'de' ? 'Kostenlos' : lang === 'ar' ? 'مجاني' : 'مجاني',
      price: '0€',
      features: [
        lang === 'fr' ? '3 analyses par mois' : lang === 'en' ? '3 analyses per month' : lang === 'es' ? '3 análisis por mes' : lang === 'de' ? '3 Analysen pro Monat' : lang === 'ar' ? '3 تحليلات شهرياً' : '3 تحليلات فالشهر',
        lang === 'fr' ? 'Coach vocal complet' : lang === 'en' ? 'Full voice coach' : lang === 'es' ? 'Coach vocal completo' : lang === 'de' ? 'Vollständiger Sprachcoach' : lang === 'ar' ? 'مدرب صوتي كامل' : 'كوتش صوتي كامل',
        lang === 'fr' ? '6 langues' : lang === 'en' ? '6 languages' : lang === 'es' ? '6 idiomas' : lang === 'de' ? '6 Sprachen' : lang === 'ar' ? '6 لغات' : '6 لغات',
        lang === 'fr' ? 'Historique 30 jours' : lang === 'en' ? '30-day history' : lang === 'es' ? 'Historial 30 días' : lang === 'de' ? '30-Tage-Verlauf' : lang === 'ar' ? 'سجل 30 يوماً' : 'سجل 30 يوم',
        lang === 'fr' ? 'Prestataires vérifiés' : lang === 'en' ? 'Verified providers' : lang === 'es' ? 'Proveedores verificados' : lang === 'de' ? 'Verifizierte Anbieter' : lang === 'ar' ? 'مقدمو خدمات موثوقون' : 'خدامة موثوقين',
      ],
      popular: false,
      cta: '#',
    },
    {
      key: 'voyageur',
      name: lang === 'fr' ? 'Voyageur' : lang === 'en' ? 'Traveler' : lang === 'es' ? 'Viajero' : lang === 'de' ? 'Reisender' : lang === 'ar' ? 'مسافر' : 'المسافر',
      price: '5€',
      features: [
        lang === 'fr' ? '50 analyses' : lang === 'en' ? '50 analyses' : lang === 'es' ? '50 análisis' : lang === 'de' ? '50 Analysen' : lang === 'ar' ? '50 تحليل' : '50 تحليل',
        lang === 'fr' ? 'Coach vocal complet' : lang === 'en' ? 'Full voice coach' : lang === 'es' ? 'Coach vocal completo' : lang === 'de' ? 'Vollständiger Sprachcoach' : lang === 'ar' ? 'مدرب صوتي كامل' : 'كوتش صوتي كامل',
        lang === 'fr' ? '6 langues' : lang === 'en' ? '6 languages' : lang === 'es' ? '6 idiomas' : lang === 'de' ? '6 Sprachen' : lang === 'ar' ? '6 لغات' : '6 لغات',
        lang === 'fr' ? 'Historique 30 jours' : lang === 'en' ? '30-day history' : lang === 'es' ? 'Historial 30 días' : lang === 'de' ? '30-Tage-Verlauf' : lang === 'ar' ? 'سجل 30 يوماً' : 'سجل 30 يوم',
        lang === 'fr' ? 'Prestataires vérifiés' : lang === 'en' ? 'Verified providers' : lang === 'es' ? 'Proveedores verificados' : lang === 'de' ? 'Verifizierte Anbieter' : lang === 'ar' ? 'مقدمو خدمات موثوقون' : 'خدامة موثوقين',
      ],
      popular: false,
      cta: '/app',
    },
    {
      key: 'voyageur_plus',
      name: lang === 'fr' ? 'Voyageur Plus' : lang === 'en' ? 'Traveler Plus' : lang === 'es' ? 'Viajero Plus' : lang === 'de' ? 'Reisender Plus' : lang === 'ar' ? 'مسافر Plus' : 'المسافر Plus',
      price: '9€',
      features: [
        lang === 'fr' ? '100 analyses' : lang === 'en' ? '100 analyses' : lang === 'es' ? '100 análisis' : lang === 'de' ? '100 Analysen' : lang === 'ar' ? '100 تحليل' : '100 تحليل',
        lang === 'fr' ? 'Coach vocal complet' : lang === 'en' ? 'Full voice coach' : lang === 'es' ? 'Coach vocal completo' : lang === 'de' ? 'Vollständiger Sprachcoach' : lang === 'ar' ? 'مدرب صوتي كامل' : 'كوتش صوتي كامل',
        lang === 'fr' ? '6 langues' : lang === 'en' ? '6 languages' : lang === 'es' ? '6 idiomas' : lang === 'de' ? '6 Sprachen' : lang === 'ar' ? '6 لغات' : '6 لغات',
        lang === 'fr' ? 'Historique 30 jours' : lang === 'en' ? '30-day history' : lang === 'es' ? 'Historial 30 días' : lang === 'de' ? '30-Tage-Verlauf' : lang === 'ar' ? 'سجل 30 يوماً' : 'سجل 30 يوم',
        lang === 'fr' ? 'Prestataires vérifiés' : lang === 'en' ? 'Verified providers' : lang === 'es' ? 'Proveedores verificados' : lang === 'de' ? 'Verifizierte Anbieter' : lang === 'ar' ? 'مقدمو خدمات موثوقون' : 'خدامة موثوقين',
      ],
      popular: true,
      cta: '/app',
    },
  ];

  return (
    <section id="pricing" className="py-24 bg-shield-dark moroccan-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-poppins font-black text-4xl md:text-5xl text-white">{t('pricing_title')}</h2>
          <p className="mt-4 text-gray-400 text-lg">Commencez gratuitement, passez au plan Voyageur quand vous en avez besoin</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map(plan => (
            <div
              key={plan.key}
              className={`relative rounded-2xl p-6 flex flex-col transition-all ${
                plan.popular
                  ? 'bg-shield-green/5 border-2 border-shield-green card-glow md:scale-105'
                  : 'bg-shield-card border border-shield-border hover:border-shield-green/30'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="flex items-center gap-1 bg-shield-green text-black text-xs font-bold px-4 py-1.5 rounded-full">
                    <Zap className="w-3 h-3" />
                    {t('popular')}
                  </div>
                </div>
              )}

              <div className="mb-6">
                <h3 className="font-poppins font-bold text-white text-xl mb-2">{plan.name}</h3>
                <div className="flex items-end gap-1">
                  <span className={`font-poppins font-black text-4xl ${plan.popular ? 'text-shield-green' : 'text-white'}`}>
                    {plan.price}
                  </span>
                  <span className="text-gray-400 text-sm mb-1">{lang === 'fr' ? '/mois' : lang === 'en' ? '/month' : lang === 'es' ? '/mes' : lang === 'de' ? '/Monat' : lang === 'ar' ? '/شهر' : '/شهر'}</span>
                </div>
              </div>

              <ul className="space-y-3 flex-1 mb-8">
                {plan.features.map((feat, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-shield-green flex-shrink-0" />
                    <span className="text-gray-300 text-sm">{feat}</span>
                  </li>
                ))}
              </ul>

              <Link
                to={plan.cta}
                className={`block text-center py-3 rounded-xl font-semibold transition-all text-sm ${
                  plan.popular
                    ? 'bg-shield-green text-black hover:bg-green-400 btn-glow'
                    : 'border border-shield-border text-gray-300 hover:border-shield-green/50 hover:text-shield-green'
                }`}
              >
                {lang === 'fr' ? 'Choisir ce plan' : lang === 'en' ? 'Choose this plan' : lang === 'es' ? 'Elegir este plan' : lang === 'de' ? 'Plan wählen' : lang === 'ar' ? 'اختر هذه الخطة' : 'اختار هاد الفورمول'}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}