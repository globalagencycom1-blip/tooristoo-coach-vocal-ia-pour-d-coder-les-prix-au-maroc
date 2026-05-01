import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { base44 } from '@/api/base44Client';
import { Shield, Star, Phone, ExternalLink, MapPin, CheckCircle, Search, Loader2 } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useLang } from '../lib/LanguageContext';
import { useT } from '../lib/i18n';

const CITIES = ['Marrakech', 'Fès', 'Casablanca', 'Chefchaouen', 'Agadir', 'Tanger', 'Rabat', 'Meknès', 'Ouarzazate', 'Merzouga', 'Essaouira', 'Dakhla', 'El Jadida'];

const CATEGORIES = [
  { key: 'taxi',        labels: { fr: 'Taxi', en: 'Taxi', es: 'Taxi', de: 'Taxi', ar: 'تاكسي', darija: 'طاكسي' } },
  { key: 'hotel',       labels: { fr: 'Hôtel & Séjour', en: 'Hotel & Stay', es: 'Hotel & Estancia', de: 'Hotel & Aufenthalt', ar: 'فندق وإقامة', darija: 'فندق وسكن' } },
  { key: 'riad',        labels: { fr: 'Riad & Logement', en: 'Riad & Accommodation', es: 'Riad & Alojamiento', de: 'Riad & Unterkunft', ar: 'رياض وإيواء', darija: 'رياض وسكن' } },
  { key: 'restaurant',  labels: { fr: 'Restaurant & Gastronomie', en: 'Restaurant & Gastronomy', es: 'Restaurante & Gastronomía', de: 'Restaurant & Gastronomie', ar: 'مطعم وأكل', darija: 'ريسطو وماكلة' } },
  { key: 'excursion',   labels: { fr: 'Excursion & Activité', en: 'Excursion & Activity', es: 'Excursión & Actividad', de: 'Ausflug & Aktivität', ar: 'رحلة ونشاط', darija: 'نزهة ونشاط' } },
  { key: 'shopping',    labels: { fr: 'Shopping & Souk', en: 'Shopping & Souk', es: 'Compras & Zoco', de: 'Einkaufen & Souk', ar: 'تسوق وسوق', darija: 'شوبينغ وسوق' } },
  { key: 'transport',   labels: { fr: 'Transport & Navette', en: 'Transport & Shuttle', es: 'Transporte & Lanzadera', de: 'Transport & Shuttle', ar: 'نقل وحافلة', darija: 'تراسبور وناڤيت' } },
  { key: 'guide',       labels: { fr: 'Guide & Service', en: 'Guide & Service', es: 'Guía & Servicio', de: 'Reiseführer & Service', ar: 'مرشد وخدمة', darija: 'ڭيد وخدمة' } },
  { key: 'spa',         labels: { fr: 'Spa & Relaxation', en: 'Spa & Relaxation', es: 'Spa & Relajación', de: 'Spa & Entspannung', ar: 'سبا واسترخاء', darija: 'سبا وراحة' } },
];

function getDesc(p, lang) {
  return p[`desc_${lang}`] || p.desc_fr || p.desc_en || '';
}

function getCatLabel(cat, lang) {
  const found = CATEGORIES.find(c => c.key === cat);
  return found ? (found.labels[lang] || found.labels.fr) : cat;
}

function ProviderCard({ p, t, lang }) {
  const desc = getDesc(p, lang);
  const catLabel = getCatLabel(p.category, lang);

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

      {desc && <p className="text-gray-400 text-sm leading-relaxed mb-3">{desc}</p>}

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
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [city, setCity] = useState('all');
  const [category, setCategory] = useState('all');
  const [search, setSearch] = useState('');

  useEffect(() => {
    base44.entities.Provider.list('-rating', 500)
      .then(data => { setProviders(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const filtered = providers.filter(p => {
    const cityMatch = city === 'all' || p.city === city;
    const catMatch = category === 'all' || p.category === category;
    const desc = getDesc(p, lang);
    const searchMatch = !search || p.name?.toLowerCase().includes(search.toLowerCase()) || p.city?.toLowerCase().includes(search.toLowerCase()) || desc.toLowerCase().includes(search.toLowerCase());
    return cityMatch && catMatch && searchMatch;
  });

  const pageTitle = lang === 'fr' ? 'Prestataires Certifiés Tooristoo - Hôtels, Taxis, Restaurants Maroc' : lang === 'en' ? 'Certified Tooristoo Providers - Hotels, Taxis, Restaurants Morocco' : lang === 'es' ? 'Proveedores Certificados Tooristoo - Hoteles, Taxis, Restaurantes Marruecos' : lang === 'de' ? 'Zertifizierte Tooristoo-Anbieter - Hotels, Taxis, Restaurants Marokko' : 'مزودو Tooristoo المعتمدون - فنادق وتاكسي مطاعم المغرب';
  const pageDesc = lang === 'fr' ? 'Répertoire complet de prestataires vérifiés au Maroc: hôtels, taxis, restaurants, guides, riads avec prix officiels transparents.' : lang === 'en' ? 'Complete directory of verified providers in Morocco: hotels, taxis, restaurants, guides, riads with transparent official prices.' : lang === 'es' ? 'Directorio completo de proveedores verificados en Marruecos: hoteles, taxis, restaurantes, guías, riads con precios oficiales transparentes.' : lang === 'de' ? 'Vollständiges Verzeichnis geprüfter Anbieter in Marokko: Hotels, Taxis, Restaurants, Reiseführer, Riads mit transparenten offiziellen Preisen.' : 'دليل شامل لمزودي الخدمات الموثوقين في المغرب: فنادق وتاكسي ومطاعم وأدلة ورياضات بأسعار رسمية شفافة.';

  return (
    <div className="min-h-screen bg-shield-dark">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDesc} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDesc} />
      </Helmet>
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
              {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <select
              value={category}
              onChange={e => setCategory(e.target.value)}
              className="flex-1 bg-shield-card border border-shield-border text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-shield-green appearance-none cursor-pointer"
            >
              <option value="all">{t('providers_all_cats')}</option>
              {CATEGORIES.map(c => <option key={c.key} value={c.key}>{c.labels[lang] || c.labels.fr}</option>)}
            </select>
          </div>
        </div>

        {/* Count */}
        <div className="flex items-center gap-2 mb-5">
          <CheckCircle className="w-4 h-4 text-shield-green" />
          <span className="text-sm text-gray-400">{filtered.length} {t('providers_certified_count')}</span>
        </div>

        {/* Cards */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-shield-green animate-spin" />
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.length > 0
              ? filtered.map(p => <ProviderCard key={p.id} p={p} t={t} lang={lang} />)
              : (
                <div className="text-center py-16 bg-shield-card border border-shield-border rounded-2xl">
                  <Shield className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                  <p className="text-gray-400">{t('providers_none')}</p>
                </div>
              )
            }
          </div>
        )}

        {/* Become partner CTA */}
        <div className="mt-12 p-8 bg-shield-card border border-shield-gold/20 rounded-2xl text-center card-glow-gold">
          <span className="text-4xl mb-4 block">🤝</span>
          <h3 className="font-poppins font-bold text-white text-xl mb-2">{t('providers_partner_title')}</h3>
          <p className="text-gray-400 text-sm mb-6 max-w-sm mx-auto">{t('providers_partner_desc')}</p>
          <a
            href="mailto:partenaires@tooristoo.com"
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