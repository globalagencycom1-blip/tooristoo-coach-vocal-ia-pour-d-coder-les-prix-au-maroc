import React from 'react';
import { Link } from 'react-router-dom';
import { Check, Zap } from 'lucide-react';
import { useT } from '../../lib/i18n';

export default function PricingSection({ lang }) {
  const t = useT(lang);

  const plans = [
    {
      key: 'free',
      nameKey: 'plan_free',
      priceKey: 'plan_free_price',
      features: ['plan_free_feat1', 'plan_free_feat2', 'plan_free_feat3'],
      popular: false,
      cta: '#',
    },
    {
      key: 'voyageur',
      nameKey: 'plan_voyageur',
      priceKey: 'plan_voyageur_price',
      features: ['plan_voyageur_feat1', 'plan_voyageur_feat2', 'plan_voyageur_feat3', 'plan_voyageur_feat4', 'plan_voyageur_feat5'],
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

        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {plans.map(plan => (
            <div
              key={plan.key}
              className={`relative rounded-2xl p-6 flex flex-col transition-all ${
                plan.popular
                  ? 'bg-shield-green/5 border-2 border-shield-green card-glow scale-105'
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
                <h3 className="font-poppins font-bold text-white text-xl mb-2">{t(plan.nameKey)}</h3>
                <div className="flex items-end gap-1">
                  <span className={`font-poppins font-black text-4xl ${plan.popular ? 'text-shield-green' : 'text-white'}`}>
                    {t(plan.priceKey)}
                  </span>
                  <span className="text-gray-400 text-sm mb-1">{t('per_month')}</span>
                </div>
              </div>

              <ul className="space-y-3 flex-1 mb-8">
                {plan.features.map(feat => (
                  <li key={feat} className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-shield-green flex-shrink-0" />
                    <span className="text-gray-300 text-sm">{t(feat)}</span>
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
                {t('choose_plan')}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}