import React, { useState } from 'react';
import { Shield, Star, Phone, ExternalLink, MapPin, CheckCircle, Search } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useLang } from '../lib/LanguageContext';
import { Link } from 'react-router-dom';

const PROVIDERS = [
  {
    name: 'Riad El Fenn',
    city: 'Marrakech',
    category: 'Hébergement',
    categoryKey: 'riad',
    desc: 'Riad authentique au cœur de la médina avec service 5 étoiles',
    price: '400-800 MAD/nuit',
    rating: 4.9,
    phone: '+212 524-441-210',
    url: 'https://maps.google.com/?q=Riad+El+Fenn+Marrakech',
    certified: true,
  },
  {
    name: 'Restaurant Dar Hatim',
    city: 'Fès',
    category: 'Restaurant',
    categoryKey: 'restaurant',
    desc: 'Cuisine traditionnelle fassi dans un cadre magnifique',
    price: '60-150 MAD',
    rating: 4.9,
    phone: '+212 535-637-094',
    url: 'https://maps.google.com/?q=Dar+Hatim+Fes',
    certified: true,
  },
  {
    name: 'Royal Taxi Marrakech',
    city: 'Marrakech',
    category: 'Transport',
    categoryKey: 'taxi',
    desc: 'Service de taxi officiel avec compteur et tarifs réglementés',
    price: '120-150 MAD (aéroport)',
    rating: 4.8,
    phone: '+212 524-123456',
    url: 'https://maps.google.com/?q=Taxi+Marrakech',
    certified: true,
  },
  {
    name: 'Guide Officiel Fès',
    city: 'Fès',
    category: 'Guide',
    categoryKey: 'guide',
    desc: 'Guide agréé par le Ministère du Tourisme',
    price: '250-350 MAD/demi-journée',
    rating: 4.8,
    phone: '+212 535-741-852',
    url: 'https://maps.google.com/?q=Guide+Officiel+Fes',
    certified: true,
  },
  {
    name: 'Artisanat Fès Authentique',
    city: 'Fès',
    category: 'Shopping',
    categoryKey: 'shopping',
    desc: 'Coopérative d\'artisans avec prix justes et transparents',
    price: 'Prix fixes affichés',
    rating: 4.7,
    phone: '+212 535-963-741',
    url: 'https://maps.google.com/?q=Artisanat+Fes',
    certified: true,
  },
  {
    name: 'Atlas Excursions',
    city: 'Marrakech',
    category: 'Excursion',
    categoryKey: 'excursion',
    desc: 'Excursions certifiées dans l\'Atlas et le désert',
    price: '300-700 MAD/jour',
    rating: 4.6,
    phone: '+212 524-852-963',
    url: 'https://maps.google.com/?q=Atlas+Excursions+Marrakech',
    certified: true,
  },
  {
    name: 'Hammam Ziani Marrakech',
    city: 'Marrakech',
    category: 'Spa',
    categoryKey: 'spa',
    desc: 'Hammam traditionnel certifié avec tarifs affichés',
    price: '80-200 MAD',
    rating: 4.7,
    phone: '+212 524-389-200',
    url: 'https://maps.google.com/?q=Hammam+Ziani+Marrakech',
    certified: true,
  },
  {
    name: 'CTM Transport Officiel',
    city: 'Casablanca',
    category: 'Transport',
    categoryKey: 'transport',
    desc: 'Réseau officiel de cars et transport inter-villes',
    price: 'Tarifs officiels affichés',
    rating: 4.5,
    phone: '+212 522-541-010',
    url: 'https://maps.google.com/?q=CTM+Casablanca',
    certified: true,
  },
  {
    name: 'Riad Yusuf Chefchaouen',
    city: 'Chefchaouen',
    category: 'Hébergement',
    categoryKey: 'riad',
    desc: 'Riad typique dans la ville bleue, tarifs transparents',
    price: '250-450 MAD/nuit',
    rating: 4.8,
    phone: '+212 539-988-226',
    url: 'https://maps.google.com/?q=Riad+Chefchaouen',
    certified: true,
  },
  {
    name: 'Restaurant Le Mechoui du Prince',
    city: 'Marrakech',
    category: 'Restaurant',
    categoryKey: 'restaurant',
    desc: 'Cuisine marocaine authentique, menu à prix fixe affiché',
    price: '80-180 MAD',
    rating: 4.6,
    phone: '+212 524-903-060',
    url: 'https://maps.google.com/?q=Le+Mechoui+du+Prince+Marrakech',
    certified: true,
  },
];

const CITIES = ['Toutes les villes', 'Marrakech', 'Fès', 'Casablanca', 'Chefchaouen', 'Agadir', 'Tanger'];
const CATEGORIES = ['Toutes les catégories', 'Hébergement', 'Restaurant', 'Transport', 'Guide', 'Shopping', 'Excursion', 'Spa'];

function ProviderCard({ p }) {
  return (
    <div className="bg-shield-card border border-shield-border rounded-2xl p-5 hover:border-shield-green/30 transition-all">
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="flex items-start gap-2 flex-wrap">
          <h3 className="font-poppins font-bold text-white text-base leading-snug">{p.name}</h3>
          {p.certified && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-shield-green/10 border border-shield-green/40 text-shield-green text-xs font-semibold rounded-full whitespace-nowrap">
              <CheckCircle className="w-3 h-3" />
              Certifié
            </span>
          )}
        </div>
        <div className="flex items-center gap-1 flex-shrink-0">
          <Star className="w-4 h-4 text-shield-gold fill-shield-gold" />
          <span className="text-white font-bold text-sm">{p.rating}</span>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-3">
        <MapPin className="w-3 h-3 text-gray-500" />
        <span className="text-xs text-gray-500">{p.city} · {p.category}</span>
      </div>

      <p className="text-gray-400 text-sm leading-relaxed mb-3">{p.desc}</p>

      <div className="flex items-center justify-between flex-wrap gap-2">
        <span className="text-shield-green font-semibold text-sm">Prix Officiel: {p.price}</span>
        <div className="flex items-center gap-2">
          {p.phone && (
            <a
              href={`tel:${p.phone}`}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-shield-border/50 hover:bg-shield-border text-gray-300 hover:text-white text-xs rounded-lg transition-all"
            >
              <Phone className="w-3 h-3" />
              {p.phone}
            </a>
          )}
          {p.url && (
            <a
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 px-3 py-1.5 bg-shield-green/10 border border-shield-green/30 text-shield-green text-xs font-semibold rounded-lg hover:bg-shield-green/20 transition-all"
            >
              <ExternalLink className="w-3 h-3" />
              Voir
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Providers() {
  const { lang } = useLang();
  const [city, setCity] = useState('Toutes les villes');
  const [category, setCategory] = useState('Toutes les catégories');
  const [search, setSearch] = useState('');

  const filtered = PROVIDERS.filter(p => {
    const cityMatch = city === 'Toutes les villes' || p.city === city;
    const catMatch = category === 'Toutes les catégories' || p.category === category;
    const searchMatch = !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.desc.toLowerCase().includes(search.toLowerCase());
    return cityMatch && catMatch && searchMatch;
  });

  return (
    <div className="min-h-screen bg-shield-dark">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 pt-28 pb-20">

        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-shield-green/10 border border-shield-green/30 rounded-full text-shield-green text-sm font-medium mb-6">
            <Shield className="w-4 h-4" />
            Réseau certifié NegoShield
          </div>
          <h1 className="font-poppins font-black text-4xl md:text-5xl text-white mb-4">
            Prestataires <span className="text-gradient-green">de confiance</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Tous nos partenaires ont été vérifiés et affichent des prix officiels transparents. Fini les mauvaises surprises.
          </p>
        </div>

        {/* Filters */}
        <div className="space-y-3 mb-8">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Rechercher un prestataire…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-shield-card border border-shield-border text-white rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-shield-green placeholder-gray-600"
            />
          </div>
          <div className="flex gap-3">
            <select
              value={city}
              onChange={e => setCity(e.target.value)}
              className="flex-1 bg-shield-card border border-shield-border text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-shield-green appearance-none cursor-pointer"
            >
              {CITIES.map(c => <option key={c}>{c}</option>)}
            </select>
            <select
              value={category}
              onChange={e => setCategory(e.target.value)}
              className="flex-1 bg-shield-card border border-shield-border text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-shield-green appearance-none cursor-pointer"
            >
              {CATEGORIES.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
        </div>

        {/* Count */}
        <div className="flex items-center gap-2 mb-5">
          <CheckCircle className="w-4 h-4 text-shield-green" />
          <span className="text-sm text-gray-400">{filtered.length} prestataire{filtered.length > 1 ? 's' : ''} certifié{filtered.length > 1 ? 's' : ''}</span>
        </div>

        {/* Cards */}
        <div className="space-y-4">
          {filtered.length > 0
            ? filtered.map((p, i) => <ProviderCard key={i} p={p} />)
            : (
              <div className="text-center py-16 bg-shield-card border border-shield-border rounded-2xl">
                <Shield className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                <p className="text-gray-400">Aucun prestataire trouvé pour ces filtres</p>
              </div>
            )
          }
        </div>

        {/* Become partner CTA */}
        <div className="mt-12 p-8 bg-shield-card border border-shield-gold/20 rounded-2xl text-center card-glow-gold">
          <span className="text-4xl mb-4 block">🤝</span>
          <h3 className="font-poppins font-bold text-white text-xl mb-2">Vous êtes prestataire au Maroc ?</h3>
          <p className="text-gray-400 text-sm mb-6 max-w-sm mx-auto">Rejoignez notre réseau certifié et bénéficiez d'une visibilité auprès de milliers de touristes internationaux.</p>
          <a
            href="mailto:partenaires@negoshield.ai"
            className="inline-flex items-center gap-2 px-6 py-3 bg-shield-gold/10 border border-shield-gold/40 text-shield-gold font-bold rounded-xl hover:bg-shield-gold/20 transition-all"
          >
            Devenir partenaire certifié
          </a>
        </div>
      </div>
      <Footer lang={lang} />
    </div>
  );
}