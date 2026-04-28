import React, { useState } from 'react';
import { Shield, Star, Phone, ExternalLink, MapPin, CheckCircle, Search } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useLang } from '../lib/LanguageContext';
import { useT } from '../lib/i18n';

const PROVIDERS = [
  { name: 'Riad El Fenn', city: 'Marrakech', categoryKey: 'riad', descKey: 'prov_desc1', price: '400-800 MAD/nuit', rating: 4.9, phone: '+212 524-441-210', url: 'https://maps.google.com/?q=Riad+El+Fenn+Marrakech', certified: true },
  { name: 'Restaurant Dar Hatim', city: 'Fès', categoryKey: 'restaurant', descKey: 'prov_desc2', price: '60-150 MAD', rating: 4.9, phone: '+212 535-637-094', url: 'https://maps.google.com/?q=Dar+Hatim+Fes', certified: true },
  { name: 'Royal Taxi Marrakech', city: 'Marrakech', categoryKey: 'taxi', descKey: 'prov_desc3', price: '120-150 MAD', rating: 4.8, phone: '+212 524-123456', url: 'https://maps.google.com/?q=Taxi+Marrakech', certified: true },
  { name: 'Guide Officiel Fès', city: 'Fès', categoryKey: 'guide', descKey: 'prov_desc4', price: '250-350 MAD/demi-journée', rating: 4.8, phone: '+212 535-741-852', url: 'https://maps.google.com/?q=Guide+Officiel+Fes', certified: true },
  { name: 'Artisanat Fès Authentique', city: 'Fès', categoryKey: 'shopping', descKey: 'prov_desc5', price: 'Prix fixes affichés', rating: 4.7, phone: '+212 535-963-741', url: 'https://maps.google.com/?q=Artisanat+Fes', certified: true },
  { name: 'Atlas Excursions', city: 'Marrakech', categoryKey: 'excursion', descKey: 'prov_desc6', price: '300-700 MAD/jour', rating: 4.6, phone: '+212 524-852-963', url: 'https://maps.google.com/?q=Atlas+Excursions+Marrakech', certified: true },
  { name: 'Hammam Ziani Marrakech', city: 'Marrakech', categoryKey: 'spa', descKey: 'prov_desc7', price: '80-200 MAD', rating: 4.7, phone: '+212 524-389-200', url: 'https://maps.google.com/?q=Hammam+Ziani+Marrakech', certified: true },
  { name: 'CTM Transport Officiel', city: 'Casablanca', categoryKey: 'transport', descKey: 'prov_desc8', price: 'Tarifs officiels affichés', rating: 4.5, phone: '+212 522-541-010', url: 'https://maps.google.com/?q=CTM+Casablanca', certified: true },
  { name: 'Riad Yusuf Chefchaouen', city: 'Chefchaouen', categoryKey: 'riad', descKey: 'prov_desc9', price: '250-450 MAD/nuit', rating: 4.8, phone: '+212 539-988-226', url: 'https://maps.google.com/?q=Riad+Chefchaouen', certified: true },
  { name: 'Restaurant Le Mechoui du Prince', city: 'Marrakech', categoryKey: 'restaurant', descKey: 'prov_desc10', price: '80-180 MAD', rating: 4.6, phone: '+212 524-903-060', url: 'https://maps.google.com/?q=Le+Mechoui+du+Prince+Marrakech', certified: true },
];



const CITIES_KEYS = ['Marrakech', 'Fès', 'Casablanca', 'Chefchaouen', 'Agadir', 'Tanger', 'Rabat', 'Meknès', 'Ouarzazate', 'Merzouga', 'Dakhla', 'El Jadida', 'Essaouira'];
const CAT_KEYS = ['taxi', 'riad', 'restaurant', 'excursion', 'shopping', 'transport', 'guide', 'spa'];

function ProviderCard({ p, t, lang }) {
  const catLabel = t('cat_' + p.categoryKey);
  const desc = t(p.descKey) || '';

  return (
    <div className="bg-shield-card border border-shield-border rounded-2xl p-5 hover:border-shield-green/30 transition-all">
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="flex items-start gap-2 flex-wrap">
          <h3 className="font-poppins font-bold text-white text-base leading-snug">{p.name}</h3>
          {p.certified && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-shield-green/10 border border-shield-green/40 text-shield-green text-xs font-semibold rounded-full whitespace-nowrap">
              <CheckCircle className="w-3 h-3" />
              {t('providers_certified')}
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
        <span className="text-xs text-gray-500">{p.city} · {catLabel}</span>
      </div>

      <p className="text-gray-400 text-sm leading-relaxed mb-3">{desc}</p>

      <div className="flex items-center justify-between flex-wrap gap-2">
        <span className="text-shield-green font-semibold text-sm">{t('providers_official_price')} {p.price}</span>
        <div className="flex items-center gap-2">
          {p.phone && (
            <a href={`tel:${p.phone}`} className="flex items-center gap-1.5 px-3 py-1.5 bg-shield-border/50 hover:bg-shield-border text-gray-300 hover:text-white text-xs rounded-lg transition-all">
              <Phone className="w-3 h-3" />
              {p.phone}
            </a>
          )}
          {p.url && (
            <a href={p.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 px-3 py-1.5 bg-shield-green/10 border border-shield-green/30 text-shield-green text-xs font-semibold rounded-lg hover:bg-shield-green/20 transition-all">
              <ExternalLink className="w-3 h-3" />
              {t('providers_view')}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Providers() {
  const { lang } = useLang();
  const t = useT(lang);
  const [city, setCity] = useState('all');
  const [category, setCategory] = useState('all');
  const [search, setSearch] = useState('');

  const filtered = PROVIDERS.filter(p => {
    const cityMatch = city === 'all' || p.city === city;
    const catMatch = category === 'all' || p.categoryKey === category;
    const desc = t(p.descKey) || '';
    const searchMatch = !search || p.name.toLowerCase().includes(search.toLowerCase()) || desc.toLowerCase().includes(search.toLowerCase());
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
            {t('providers_badge')}
          </div>
          <h1 className="font-poppins font-black text-4xl md:text-5xl text-white mb-4">
            {t('providers_title')} <span className="text-gradient-green">{t('providers_title2')}</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">{t('providers_subtitle')}</p>
        </div>

        {/* Filters */}
        <div className="space-y-3 mb-8">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder={t('providers_search')}
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
              <option value="all">{t('providers_all_cities')}</option>
              {CITIES_KEYS.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <select
              value={category}
              onChange={e => setCategory(e.target.value)}
              className="flex-1 bg-shield-card border border-shield-border text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-shield-green appearance-none cursor-pointer"
            >
              <option value="all">{t('providers_all_cats')}</option>
              {CAT_KEYS.map(c => <option key={c} value={c}>{t('cat_' + c)}</option>)}
            </select>
          </div>
        </div>

        {/* Count */}
        <div className="flex items-center gap-2 mb-5">
          <CheckCircle className="w-4 h-4 text-shield-green" />
          <span className="text-sm text-gray-400">{filtered.length} {t('providers_certified_count')}</span>
        </div>

        {/* Cards */}
        <div className="space-y-4">
          {filtered.length > 0
            ? filtered.map((p, i) => <ProviderCard key={i} p={p} t={t} lang={lang} />)
            : (
              <div className="text-center py-16 bg-shield-card border border-shield-border rounded-2xl">
                <Shield className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                <p className="text-gray-400">{t('providers_none')}</p>
              </div>
            )
          }
        </div>

        {/* Become partner CTA */}
        <div className="mt-12 p-8 bg-shield-card border border-shield-gold/20 rounded-2xl text-center card-glow-gold">
          <span className="text-4xl mb-4 block">🤝</span>
          <h3 className="font-poppins font-bold text-white text-xl mb-2">{t('providers_partner_title')}</h3>
          <p className="text-gray-400 text-sm mb-6 max-w-sm mx-auto">{t('providers_partner_desc')}</p>
          <a
            href="mailto:partenaires@negoshield.ai"
            className="inline-flex items-center gap-2 px-6 py-3 bg-shield-gold/10 border border-shield-gold/40 text-shield-gold font-bold rounded-xl hover:bg-shield-gold/20 transition-all"
          >
            {t('providers_partner_btn')}
          </a>
        </div>
      </div>
      <Footer lang={lang} />
    </div>
  );
}