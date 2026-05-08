import React, { useState } from 'react';
import { Loader2, Zap, Shield } from 'lucide-react';
import { useT } from '../../lib/i18n';
import { base44 } from '@/api/base44Client';
import { CATEGORIES_DATA, CITIES_DATA } from '../../lib/categories-cities-translations';

// ─── Filtre requêtes illégales ────────────────────────────────────────────────
const MOTS_INTERDITS_ILLEGAL = [
  'prostitu', 'escort', 'pute', 'drogue', 'cannabis', 'cocaïne', 'cocaine',
  'haschich', 'hashish', 'kif', 'deal', 'dealer', 'trafic', 'arme', 'weapon',
  'sexe tarifé', 'passe', 'maquereau', 'proxénét',
  'prostitut', 'drug', 'weed', 'heroin', 'gun',
  'شرموطة', 'قحبة', 'مخدرات',
];

function isRequeteIllegale(texte) {
  if (!texte) return false;
  const t = texte.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  return MOTS_INTERDITS_ILLEGAL.some(mot =>
    t.includes(mot.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ''))
  );
}

// ─── Filtre input insuffisant ─────────────────────────────────────────────────
function isInputInsuffisant(description, prixDemande) {
  if (prixDemande && Number(prixDemande) > 0) return false;
  if (!description || !description.trim()) return true;
  const mots = description.trim().split(/\s+/).filter(Boolean);
  const soloNombre = /^\d+$/.test(description.trim());
  return mots.length < 3 || soloNombre;
}

// ─── Prompt unifié (identique à VoiceCoach) ───────────────────────────────────
function buildPrompt({ category, location, priceAsked, text, lang }) {
  const langLabel = {
    fr: 'Français', en: 'English', es: 'Español',
    de: 'Deutsch', ar: 'Arabe', darija: 'Darija marocaine (caractères arabes)',
  }[lang] || 'Français';

  return `Tu es Tooristoo Coach, expert en tarifs touristiques au Maroc.

RÈGLES ABSOLUES :
- N'utilise JAMAIS les mots : arnaque, escroc, fraude, tromperie, voleur, escroquerie, malhonnête. Remplace-les par : "écart de prix", "tarif non standard", "surfacturation", "écart tarifaire".
- Ne fais JAMAIS de jugement moral sur le prestataire.
- Utilise TOUJOURS "DH" (jamais "MAD") dans tous les champs texte.
- Si la demande décrit une activité illégale ou hors tourisme, réponds UNIQUEMENT : {"erreur":"hors_champ"}
- Si le contexte est trop vague pour analyser, réponds UNIQUEMENT : {"erreur":"contexte_insuffisant"}

SITUATION À ANALYSER :
- Catégorie : ${category || 'taxi'}
- Ville : ${location || 'Marrakech'}
- Prix demandé : ${priceAsked ? priceAsked + ' DH' : 'non spécifié'}
- Description : ${text || 'aucune description'}

Réponds en JSON avec ces champs exactement :
- price_estimated_min (number) : prix minimum réel du marché en DH
- price_estimated_max (number) : prix maximum réel du marché en DH
- risk_level (string) : EXACTEMENT "low", "medium" ou "high" — rien d'autre
- ai_analysis (string) : analyse factuelle en ${langLabel}, sans mots interdits
- recommended_phrase (string) : phrase exacte à dire au prestataire en ${langLabel}
- recommended_phrase_darija (string) : OBLIGATOIREMENT en caractères arabes uniquement — jamais de translittération latine. Ex: "أنا غادي نعطيك 100 درهم، واش مقبول؟"
- strategy (string) : conseils de négociation en ${langLabel}
- vendor_trust_score (number 1-5)
- savings (number) : économie potentielle en DH (0 si prix non spécifié)`;
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

    // 1. Filtre illégal
    const fullText = `${form.description} ${form.category}`;
    if (isRequeteIllegale(fullText)) {
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
      const prompt = buildPrompt({
        category:   form.category,
        location:   form.location,
        priceAsked: form.price_asked,
        text:       form.description,
        lang,
      });

      const result = await base44.integrations.Core.InvokeLLM({
        prompt,
        response_json_schema: {
          type: 'object',
          properties: {
            price_estimated_min:       { type: 'number' },
            price_estimated_max:       { type: 'number' },
            risk_level:                { type: 'string', enum: ['low', 'medium', 'high'] },
            ai_analysis:               { type: 'string' },
            recommended_phrase:        { type: 'string' },
            recommended_phrase_darija: { type: 'string' },
            strategy:                  { type: 'string' },
            vendor_trust_score:        { type: 'number' },
            savings:                   { type: 'number' },
          }
        }
      });

      // Vérifie si l'IA a quand même renvoyé une erreur
      if (result?.erreur === 'hors_champ')          { setPopup('illegal');      return; }
      if (result?.erreur === 'contexte_insuffisant') { setPopup('insufficient'); return; }

      onAnalysisComplete({
        ...result,
        transcript:          form.description,
        category:            form.category,
        location:            form.location,
        price_asked:         form.price_asked ? Number(form.price_asked) : 0,
        indice_prestataire:  result.vendor_trust_score ?? null,
        timestamp:           new Date().toISOString(),
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