import React, { useState } from 'react';
import { Loader2, Zap } from 'lucide-react';
import { useT } from '../../lib/i18n';
import { analyzeNegotiation, isProhibitedRequest } from '../../lib/pricing-knowledge-base';
import { CATEGORIES_DATA, CITIES_DATA } from '../../lib/categories-cities-translations';

// ─── Filtre input insuffisant (côté client, avant appel) ─────────────────────
function isInputInsuffisant(description, prixDemande) {
  if (prixDemande && Number(prixDemande) > 0) return false;
  if (!description || !description.trim()) return true;
  const mots = description.trim().split(/\s+/).filter(Boolean);
  const soloNombre = /^\d+$/.test(description.trim());
  return mots.length < 3 || soloNombre;
}

// ─── Composant ────────────────────────────────────────────────────────────────
export default function NegotiationForm({ lang, onAnalysisComplete }) {
  const t = useT(lang);
  const l = lang || 'fr';

  const [form, setForm]           = useState({ category: 'taxi', location: 'Marrakech', price_asked: '', description: '' });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [popup, setPopup]         = useState(null); // null | 'illegal' | 'insufficient'

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Filtre illégal — utilise isProhibitedRequest de pricing-knowledge-base
    //    (liste exhaustive multi-langues déjà définie dedans)
    const fullText = `${form.description} ${form.category}`;
    if (isProhibitedRequest(fullText, lang)) {
      setPopup('illegal');
      return;
    }

    // 2. Filtre input insuffisant
    if (isInputInsuffisant(form.description, form.price_asked)) {
      setPopup('insufficient');
      return;
    }

    setIsAnalyzing(true);
    try {
      // 3. analyzeNegotiation orchestre tout :
      //    - fourchettes depuis PRICING_KNOWLEDGE_BASE (pas d'hallucination)
      //    - prestataires certifiés depuis Provider (base de données réelle)
      //    - LLM uniquement pour analyse texte + stratégie + phrase darija
      //    - sanitize automatique des mots interdits
      const result = await analyzeNegotiation({
        category:    form.category,
        city:        form.location,
        priceAsked:  form.price_asked,
        description: form.description,
        lang,
      });

      // Si analyzeNegotiation a détecté un refus (illégal détecté côté LLM aussi)
      if (result?.refused) {
        setPopup('illegal');
        return;
      }

      onAnalysisComplete({
        ...result,
        transcript: form.description,
        timestamp:  new Date().toISOString(),
      });
    } catch (err) {
      console.error('Erreur analyse IA :', err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  // ── Labels popup selon langue ──
  const popupContent = {
    illegal: {
      icon: '🛡️',
      title:
        lang === 'en' ? 'Outside our scope' :
        lang === 'es' ? 'Fuera de nuestro ámbito' :
        lang === 'de' ? 'Außerhalb unseres Bereichs' :
        lang === 'ar' ? 'خارج نطاق خدمتنا' :
        'Hors de notre champ',
      message:
        lang === 'en' ? 'Tooristoo only analyses legal tourist services: taxis, accommodation, restaurants, guides, crafts and excursions.' :
        lang === 'es' ? 'Tooristoo solo analiza servicios turísticos legales: taxis, alojamiento, restaurantes, guías, artesanía y excursiones.' :
        lang === 'de' ? 'Tooristoo analysiert nur legale Touristendienstleistungen: Taxis, Unterkünfte, Restaurants, Guides, Kunsthandwerk und Ausflüge.' :
        lang === 'ar' ? 'Tooristoo يحلل فقط الخدمات السياحية القانونية: سيارات الأجرة والإقامة والمطاعم والمرشدين والحرف والرحلات.' :
        'Tooristoo analyse uniquement les services touristiques légaux : taxis, hébergements, restaurants, guides, artisanat et excursions.',
      btn:
        lang === 'en' ? 'Understood' :
        lang === 'es' ? 'Entendido' :
        lang === 'de' ? 'Verstanden' :
        lang === 'ar' ? 'حسناً' :
        'Compris',
    },
    insufficient: {
      icon: '💬',
      title:
        lang === 'en' ? 'More details needed' :
        lang === 'es' ? 'Se necesitan más detalles' :
        lang === 'de' ? 'Mehr Details erforderlich' :
        lang === 'ar' ? 'تحتاج إلى مزيد من التفاصيل' :
        'Précisez la situation',
      message:
        lang === 'en' ? 'Please fill in the price field or describe the situation in a few words. Example: "Taxi to the airport in Marrakech, 300 DH"' :
        lang === 'es' ? 'Rellena el campo de precio o describe la situación en pocas palabras. Ejemplo: "Taxi al aeropuerto en Marrakech, 300 DH"' :
        lang === 'de' ? 'Bitte Preisfeld ausfüllen oder die Situation kurz beschreiben. Beispiel: "Taxi zum Flughafen in Marrakesch, 300 DH"' :
        lang === 'ar' ? 'يرجى ملء حقل السعر أو وصف الوضع ببضع كلمات. مثال: "تاكسي إلى المطار في مراكش، 300 درهم"' :
        'Renseignez le prix ou décrivez la situation en quelques mots. Ex : "Taxi pour l\'aéroport à Marrakech, 300 DH"',
      btn:
        lang === 'en' ? 'Try again' :
        lang === 'es' ? 'Reintentar' :
        lang === 'de' ? 'Erneut versuchen' :
        lang === 'ar' ? 'حاول مجدداً' :
        'Réessayer',
    },
  };

  return (
    <>
      {/* ── Popup illégal / insuffisant ── */}
      {popup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-shield-card border border-shield-border rounded-2xl p-6 max-w-sm w-full shadow-2xl">
            <div className="text-center mb-4">
              <span className="text-4xl">{popupContent[popup].icon}</span>
            </div>
            <h3 className="text-white font-bold text-base text-center mb-3">
              {popupContent[popup].title}
            </h3>
            <p className="text-gray-400 text-sm text-center leading-relaxed mb-5">
              {popupContent[popup].message}
            </p>
            <button
              onClick={() => setPopup(null)}
              className="w-full py-3 bg-shield-green text-black font-bold rounded-xl hover:bg-green-400 transition-all"
            >
              {popupContent[popup].btn}
            </button>
          </div>
        </div>
      )}

      {/* ── Formulaire ── */}
      <form onSubmit={handleSubmit} className="space-y-5">

        {/* Catégorie + Ville */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs text-gray-400 mb-1.5 block font-semibold uppercase tracking-wide">{t('form_categories')}</label>
            <select
              value={form.category}
              onChange={e => setForm({ ...form, category: e.target.value })}
              className="w-full bg-shield-card border border-shield-border text-white rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-shield-green"
            >
              {CATEGORIES_DATA.map(c => <option key={c.value} value={c.value}>{c[l] || c.fr}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs text-gray-400 mb-1.5 block font-semibold uppercase tracking-wide">{t('form_cities')}</label>
            <select
              value={form.location}
              onChange={e => setForm({ ...form, location: e.target.value })}
              className="w-full bg-shield-card border border-shield-border text-white rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-shield-green"
            >
              {CITIES_DATA.map(c => <option key={c.value} value={c.value}>{c[l] || c.fr}</option>)}
            </select>
          </div>
        </div>

        {/* Prix demandé */}
        <div>
          <label className="text-xs text-gray-400 mb-1.5 block font-semibold uppercase tracking-wide">{t('form_price_label')}</label>
          <input
            type="number"
            value={form.price_asked}
            onChange={e => setForm({ ...form, price_asked: e.target.value })}
            placeholder="300"
            className="w-full bg-shield-card border border-shield-border text-white rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-shield-green placeholder-gray-600"
          />
        </div>

        {/* Description */}
        <div>
          <label className="text-xs text-gray-400 mb-1.5 block font-semibold uppercase tracking-wide">{t('form_situation_label')}</label>
          <textarea
            value={form.description}
            onChange={e => setForm({ ...form, description: e.target.value })}
            placeholder={t('form_example_placeholder')}
            rows={3}
            className="w-full bg-shield-card border border-shield-border text-white rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-shield-green placeholder-gray-500 resize-none"
            dir={['ar', 'darija'].includes(lang) ? 'rtl' : 'ltr'}
          />
          <p className="text-xs text-gray-500 mt-1.5">{t('form_help_text')}</p>
        </div>

        {/* Bouton soumettre */}
        <button
          type="submit"
          disabled={isAnalyzing || (!form.price_asked && !form.description)}
          className="w-full py-3.5 bg-shield-green text-black font-bold rounded-xl hover:bg-green-400 transition-all btn-glow flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {isAnalyzing ? (
            <><Loader2 className="w-4 h-4 animate-spin" />{t('analyzing')}</>
          ) : (
            <><Zap className="w-4 h-4" />{t('analyze_btn')}</>
          )}
        </button>

      </form>
    </>
  );
}