import React from 'react';
import { Star, Quote } from 'lucide-react';
import { useT } from '../../lib/i18n';

const cities = [
  { name: 'Marrakech', img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop' },
  { name: 'Fès', img: 'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=400&h=300&fit=crop' },
  { name: 'Chefchaouen', img: 'https://images.unsplash.com/photo-1548019747-51c2b7b44d95?w=400&h=300&fit=crop' },
  { name: 'Casablanca', img: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=400&h=300&fit=crop' },
  { name: 'Rabat', img: 'https://images.unsplash.com/photo-1587974928442-77dc3e0dba72?w=400&h=300&fit=crop' },
  { name: 'Meknès', img: 'https://images.unsplash.com/photo-1560969184-10fe8719e047?w=400&h=300&fit=crop' },
  { name: 'Agadir', img: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&h=300&fit=crop' },
  { name: 'Tanger', img: 'https://images.unsplash.com/photo-1549144511-f099e773c147?w=400&h=300&fit=crop' },
  { name: 'Essaouira', img: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=400&h=300&fit=crop' },
  { name: 'Ouarzazate', img: 'https://images.unsplash.com/photo-1489493585363-d69421e0edd3?w=400&h=300&fit=crop' },
  { name: 'Merzouga', img: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=400&h=300&fit=crop' },
  { name: 'Dakhla', img: 'https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?w=400&h=300&fit=crop' },
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
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {cities.map((city) => (
              <div
                key={city.name}
                className="relative rounded-2xl overflow-hidden group cursor-pointer"
              >
                <img
                  src={city.img}
                  alt={city.name}
                  className="w-full h-36 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-3 left-3 flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-shield-green flex-shrink-0"></div>
                  <span className="text-white text-xs font-bold">{city.name}</span>
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