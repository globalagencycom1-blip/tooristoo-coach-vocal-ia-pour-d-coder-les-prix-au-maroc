import React, { useState } from 'react';
import { Loader2, Zap } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { useT } from '../../lib/i18n';
import { formatPricingPrompt, getAllCitiesPricingContext, isProhibitedRequest, getProhibitedResponse } from '../../lib/pricing-knowledge-base';
import { CATEGORIES_DATA, CITIES_DATA } from '../../lib/categories-cities-translations';

export default function NegotiationForm({ lang, onAnalysisComplete }) {
  const t = useT(lang);
  const l = lang || 'fr';
  const [form, setForm] = useState({ category: 'taxi', location: 'Marrakech', price_asked: '', description: '' });
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Vérification des demandes non acceptables (toutes langues)
    const combined = `${form.category} ${form.description}`;
    if (isProhibitedRequest(combined, lang)) {
      alert(getProhibitedResponse(lang));
      return;
    }
    
    setIsAnalyzing(true);

    const pricingInfo = formatPricingPrompt(form.location, form.category);
    const pricingContext = getAllCitiesPricingContext();

    const prompt = `Tu es Tooristoo, expert en prix touristiques au Maroc. Tu REFUSES catégoriquement toute demande illégale (drogues, prostitution, armes, trafic, blanchiment, contrefaçon). Si la demande est illégale, réponds uniquement: "DEMANDE_REFUSEE".

Tu es NegoShield AI, expert en prix touristiques au Maroc.

${pricingContext}

SITUATION ACTUELLE:
- Catégorie: ${form.category}
- Ville: ${form.location}
- Prix demandé: ${form.price_asked} MAD
- Description: ${form.description}

INFORMATIONS SPÉCIFIQUES:
${pricingInfo}

Analyse cette demande de négociation et donne une réponse en ${lang === 'en' ? 'English' : lang === 'es' ? 'Español' : lang === 'de' ? 'Deutsch' : lang === 'ar' ? 'Arabe' : lang === 'darija' ? 'Darija marocaine' : 'Français'}.

IMPORTANT:
- Utilise TOUJOURS "DH" (et jamais "MAD") pour mentionner les prix dans tous les champs texte (ai_analysis, strategy, recommended_phrase, recommended_phrase_darija).
- Le champ recommended_phrase doit être une phrase EXACTE, ASSERTIVE et NATURELLE en ${lang === 'en' ? 'English' : lang === 'es' ? 'Español' : lang === 'de' ? 'Deutsch' : lang === 'ar' ? 'arabe (caractères arabes)' : lang === 'darija' ? 'Darija (caractères arabes)' : 'Français'} que le client peut dire directement au vendeur. Elle doit:
  1. Être spécifique à cette situation exacte (pas générique)
  2. Référencer les prix réels estimés ou le tarif du marché local
  3. Proposer un prix alternatif réaliste si applicable
  4. Toujours proposer un prestataire tooristoo UNIQUEMENT correspondant à la ville et la catégorie de la demande d'analyse (si prestataire disponible))
  5. Être respectueuse de la culture marocaine mais ferme
  6. Correspondre exactement à la stratégie recommandée ci-dessus
- Le champ recommended_phrase_darija doit OBLIGATOIREMENT contenir la phrase en Darija marocaine écrite en CARACTÈRES ARABES UNIQUEMENT (jamais en lettres latines ni translittération). Exemple: "أنا غادي نعطيك 150 درهم، واش مقبول؟"
- Le champ risk_level doit OBLIGATOIREMENT être l'une de ces valeurs exactes en anglais: "low", "medium", ou "high". Ne jamais utiliser d'autres valeurs.
- Utiliser la base de connaissances pour évaluer si le prix demandé est juste, raisonnable ou abusif.`;

    const result = await base44.integrations.Core.InvokeLLM({
      prompt,
      response_json_schema: {
      type: 'object',
      properties: {
      price_estimated_min: { type: 'number' },
      price_estimated_max: { type: 'number' },
      risk_level: { type: 'string', enum: ['low', 'medium', 'high'] },
      scam_detected: { type: 'boolean' },
      ai_analysis: { type: 'string' },
      recommended_phrase: { type: 'string' },
      recommended_phrase_darija: { type: 'string' },
      strategy: { type: 'string' },
      vendor_trust_score: { type: 'number' },
      provider_name: { type: 'string' },
      provider_url: { type: 'string' },
      savings: { type: 'number' },
      }
      }
    });

    setIsAnalyzing(false);
    onAnalysisComplete({
      ...result,
      category: form.category,
      location: form.location,
      price_asked: Number(form.price_asked),
      transcript: form.description,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
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

      <div>
        <label className="text-xs text-gray-400 mb-1.5 block font-semibold uppercase tracking-wide">{t('form_situation_label')}</label>
        <textarea
          value={form.description}
          onChange={e => setForm({ ...form, description: e.target.value })}
          placeholder={t('form_example_placeholder')}
          rows={3}
          className="w-full bg-shield-card border border-shield-border text-white rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-shield-green placeholder-gray-500 resize-none"
        />
        <p className="text-xs text-gray-500 mt-1.5">{t('form_help_text')}</p>
      </div>

      <button
        type="submit"
        disabled={isAnalyzing || (!form.price_asked && !form.description)}
        className="w-full py-3.5 bg-shield-green text-black font-bold rounded-xl hover:bg-green-400 transition-all btn-glow flex items-center justify-center gap-2 disabled:opacity-50"
      >
        {isAnalyzing ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            {t('analyzing')}
          </>
        ) : (
          <>
            <Zap className="w-4 h-4" />
            {t('analyze_btn')}
          </>
        )}
      </button>
    </form>
  );
}