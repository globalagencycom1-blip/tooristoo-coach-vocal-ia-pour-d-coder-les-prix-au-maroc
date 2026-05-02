import React from 'react';
import { Link } from 'react-router-dom';
import { Check, Zap } from 'lucide-react';
import { useT } from '../../lib/i18n';
import { getPricingT } from '../../lib/pricing-plans-translations';

export default function PricingSection({ lang }) {
  const t = useT(lang);
  const p = (key) => getPricingT(key, lang);

  const plans = [
    {
      key: 'free',
      name: p('plan_free'),
      price: p('plan_free_price'),
      features: [
        p('plan_free_feat1'),
        p('plan_free_feat2'),
        p('plan_free_feat3'),
        p('plan_free_feat4'),
        p('plan_free_feat5'),
      ],
      popular: false,
      cta: '/app',
    },
    {
      key: 'voyageur',
      name: p('plan_voyageur'),
      price: p('plan_voyageur_price'),
      features: [
        p('plan_voyageur_feat1'),
        p('plan_voyageur_feat2'),
        p('plan_voyageur_feat3'),
        p('plan_voyageur_feat4'),
        p('plan_voyageur_feat5'),
      ],
      popular: false,
      cta: '/app',
    },
    {
      key: 'voyageur_plus',
      name: p('plan_voyageur_plus'),
      price: p('plan_voyageur_plus_price'),
      features: [
        p('plan_voyageur_plus_feat1'),
        p('plan_voyageur_plus_feat2'),
        p('plan_voyageur_plus_feat3'),
        p('plan_voyageur_plus_feat4'),
        p('plan_voyageur_plus_feat5'),
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
                    {p('popular')}
                  </div>
                </div>
              )}

              <div className="mb-6">
                <h3 className="font-poppins font-bold text-white text-xl mb-2">{plan.name}</h3>
                <div className="flex items-end gap-1">
                  <span className={`font-poppins font-black text-4xl ${plan.popular ? 'text-shield-green' : 'text-white'}`}>
                    {plan.price}
                  </span>
                  <span className="text-gray-400 text-sm mb-1">{p('per_month')}</span>
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
                {p('choose_plan')}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}