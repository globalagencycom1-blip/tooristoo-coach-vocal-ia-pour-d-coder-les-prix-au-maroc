import React from 'react';
import { Mic, AlertTriangle, Handshake, MapPin, TrendingDown, CheckCircle } from 'lucide-react';
import { useT } from '../../lib/i18n';

const features = [
  { icon: Mic, key: 'feat1', color: 'text-shield-green', bg: 'bg-shield-green/10', badge: '⭐ Unique' },
  { icon: AlertTriangle, key: 'feat2', color: 'text-red-400', bg: 'bg-red-500/10' },
  { icon: Handshake, key: 'feat3', color: 'text-blue-400', bg: 'bg-blue-500/10' },
  { icon: MapPin, key: 'feat4', color: 'text-shield-gold', bg: 'bg-shield-gold/10' },
  { icon: TrendingDown, key: 'feat5', color: 'text-shield-green', bg: 'bg-shield-green/10' },
  { icon: CheckCircle, key: 'feat6', color: 'text-purple-400', bg: 'bg-purple-500/10' },
];

const categories = [
  { emoji: '🚕', key: 'cat_taxi' },
  { emoji: '🏨', key: 'cat_hotel' },
  { emoji: '🍽️', key: 'cat_restaurant' },
  { emoji: '🛍️', key: 'cat_shopping' },
  { emoji: '🧭', key: 'cat_excursion' },
  { emoji: '👨‍🦱', key: 'cat_guide' },
  { emoji: '💆', key: 'cat_spa' },
  { emoji: '✨', key: 'cat_other' },
];

export default function FeaturesSection({ lang }) {
  const t = useT(lang);

  return (
    <>
      {/* Features */}
      <section id="how-it-works" className="py-24 bg-shield-dark moroccan-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-poppins font-black text-4xl md:text-5xl text-white">
              {t('features_title')}
            </h2>
            <p className="mt-3 text-xl text-shield-green font-semibold">{t('features_subtitle')}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map(({ icon: IconComp, key, color, bg, badge }) => (
              <div
                key={key}
                className={`glass-card rounded-2xl p-6 hover:border-shield-green/20 transition-all group card-glow ${badge ? 'border-shield-green/40' : ''}`}
              >
                {badge && (
                  <div className="inline-block mb-3 px-2 py-1 bg-shield-green/20 text-shield-green text-xs font-bold rounded-full">
                    {badge}
                  </div>
                )}
                <div className={`w-12 h-12 rounded-xl ${bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <IconComp className={`w-6 h-6 ${color}`} />
                </div>
                <h3 className="font-poppins font-bold text-white text-lg mb-2">{t(`${key}_title`)}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{t(`${key}_desc`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-[#0a1628]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center font-poppins font-bold text-2xl text-white mb-10">{t('categories_title')}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {categories.map(({ emoji, key }) => (
              <div
                key={key}
                className="flex items-center gap-3 p-4 bg-shield-card border border-shield-border rounded-xl hover:border-shield-green/30 transition-all cursor-pointer"
              >
                <span className="text-2xl">{emoji}</span>
                <span className="text-sm text-gray-300 font-medium">{t(key)}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}