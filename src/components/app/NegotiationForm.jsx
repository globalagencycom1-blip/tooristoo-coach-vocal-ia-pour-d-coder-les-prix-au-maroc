import React, { useState } from 'react';
import { Loader2, Zap } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { useT } from '../../lib/i18n';

const CATEGORIES = ['taxi', 'hotel', 'riad', 'restaurant', 'excursion', 'shopping', 'transport', 'guide', 'spa', 'other'];
const CITIES = ['Marrakech', 'Casablanca', 'Fès', 'Chefchaouen', 'Agadir', 'Tanger', 'Rabat', 'Meknès', 'Essaouira', 'Ouarzazate'];

export default function NegotiationForm({ lang, onAnalysisComplete }) {
  const t = useT(lang);
  const [form, setForm] = useState({ category: 'taxi', location: 'Marrakech', price_asked: '', description: '' });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsAnalyzing(true);
    setError(null);

    const langLabel = lang === 'en' ? 'English' : lang === 'es' ? 'Español' : lang === 'de' ? 'Deutsch' : lang === 'ar' ? 'Arabe' : lang === 'darija' ? 'Darija marocaine' : 'Français';

    const prompt = `Tu es NegoShield AI, expert en prix touristiques au Maroc.
Analyse cette situation de négociation et retourne UNIQUEMENT un JSON valide avec les champs demandés.
Catégorie: ${form.category}
Ville: ${form.location}
Prix demandé: ${form.price_asked || 'non spécifié'} MAD
Description: ${form.description || 'Pas de description fournie, estime les prix du marché pour cette catégorie et ville.'}
Réponds en ${langLabel}.`;

    try {
      const result = await base44.integrations.Core.InvokeLLM({
        prompt,
        response_json_schema: {
          type: 'object',
          properties: {
            price_estimated_min: { type: 'number' },
            price_estimated_max: { type: 'number' },
            risk_level: { type: 'string' },
            scam_detected: { type: 'boolean' },
            ai_analysis: { type: 'string' },
            recommended_phrase: { type: 'string' },
            strategy: { type: 'string' },
            vendor_trust_score: { type: 'number' },
            provider_name: { type: 'string' },
            provider_url: { type: 'string' },
            savings: { type: 'number' },
          }
        }
      });

      onAnalysisComplete({
        ...result,
        category: form.category,
        location: form.location,
        price_asked: Number(form.price_asked),
        transcript: form.description,
      });
    } catch (err) {
      setError("Une erreur s'est produite. Veuillez réessayer.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs text-gray-400 mb-1.5 block">{t('select_category')}</label>
          <select
            value={form.category}
            onChange={e => setForm({ ...form, category: e.target.value })}
            className="w-full bg-shield-card border border-shield-border text-white rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-shield-green"
          >
            {CATEGORIES.map(c => <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
          </select>
        </div>
        <div>
          <label className="text-xs text-gray-400 mb-1.5 block">{t('select_location')}</label>
          <select
            value={form.location}
            onChange={e => setForm({ ...form, location: e.target.value })}
            className="w-full bg-shield-card border border-shield-border text-white rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-shield-green"
          >
            {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>

      <div>
        <label className="text-xs text-gray-400 mb-1.5 block">{t('enter_price')}</label>
        <input
          type="number"
          value={form.price_asked}
          onChange={e => setForm({ ...form, price_asked: e.target.value })}
          placeholder="300"
          className="w-full bg-shield-card border border-shield-border text-white rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-shield-green placeholder-gray-600"
        />
      </div>

      <div>
        <label className="text-xs text-gray-400 mb-1.5 block">{t('describe_situation')}</label>
        <textarea
          value={form.description}
          onChange={e => setForm({ ...form, description: e.target.value })}
          placeholder={t('describe_situation')}
          rows={3}
          className="w-full bg-shield-card border border-shield-border text-white rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-shield-green placeholder-gray-600 resize-none"
        />
      </div>

      {error && (
        <p className="text-red-400 text-sm text-center bg-red-500/10 border border-red-500/20 rounded-xl px-3 py-2">{error}</p>
      )}

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