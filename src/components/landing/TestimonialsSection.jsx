import React from 'react';
import { Star, Quote } from 'lucide-react';
import { useT } from '../../lib/i18n';

const cities = [
  { name: 'MARRAKECH', img: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=200&h=120&fit=crop' },
  { name: 'CASABLANCA', img: 'https://images.unsplash.com/photo-1599946347371-68eb71b16afc?w=200&h=120&fit=crop' },
  { name: 'FÈS', img: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=200&h=120&fit=crop' },
  { name: 'CHEFCHAOUEN', img: 'https://images.unsplash.com/photo-1569383746724-6f1b882b8f46?w=200&h=120&fit=crop' },
  { name: 'AGADIR', img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=200&h=120&fit=crop' },
  { name: 'TANGER', img: 'https://images.unsplash.com/photo-1539650116574-75c0c6d33d08?w=200&h=120&fit=crop' },
];

export default function TestimonialsSection({ lang }) {
  const t = useT(lang);

  const testimonials = [
    { textKey: 'test1_text', nameKey: 'test1_name', originKey: 'test1_origin', rating: 5, flag: '🇫🇷' },
    { textKey: 'test2_text', nameKey: 'test2_name', originKey: 'test2_origin', rating: 5, flag: '🇬🇧' },
    { textKey: 'test3_text', nameKey: 'test3_name', originKey: 'test3_origin', rating: 5, flag: '🇪🇸' },
  ];

  return (
    <>
      {/* Cities */}
      <section className="py-16 bg-[#0a1628]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="font-poppins font-black text-3xl text-white mb-2">
              Partout au Maroc <span className="text-shield-green text-lg align-middle">🇲🇦</span>
            </h2>
            <p className="text-gray-500 text-sm">Couverture dans toutes les villes touristiques</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {cities.map((city, i) => (
              <div
                key={city.name}
                className={`relative rounded-2xl overflow-hidden group cursor-pointer ${i === 0 ? 'md:col-span-1 row-span-2' : ''}`}
              >
                <img
                  src={city.img}
                  alt={city.name}
                  className={`w-full object-cover group-hover:scale-105 transition-transform duration-500 ${i === 0 ? 'h-52 md:h-full' : 'h-36'}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-3 left-3 flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-shield-green"></div>
                  <span className="text-white text-sm font-bold capitalize">{city.name.charAt(0) + city.name.slice(1).toLowerCase()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-shield-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center font-poppins font-black text-4xl text-white mb-12">{t('testimonials_title')}</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((test, i) => (
              <div key={i} className="bg-shield-card border border-shield-border rounded-2xl p-6 hover:border-shield-green/20 transition-all card-glow">
                <Quote className="w-8 h-8 text-shield-green/30 mb-4" />
                <p className="text-gray-300 text-sm leading-relaxed mb-6 italic">"{t(test.textKey)}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-shield-green/20 flex items-center justify-center text-xl">
                    {test.flag}
                  </div>
                  <div>
                    <div className="font-semibold text-white text-sm">{t(test.nameKey)}</div>
                    <div className="text-xs text-gray-500">{t(test.originKey)}</div>
                  </div>
                  <div className="ml-auto flex gap-0.5">
                    {Array(test.rating).fill(0).map((_, j) => (
                      <Star key={j} className="w-3.5 h-3.5 text-shield-gold fill-shield-gold" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}