import React, { useState } from 'react';
import { Loader2, Zap } from 'lucide-react';
import { useT } from '../../lib/i18n';
import { analyzeNegotiation } from '../../lib/pricing-knowledge-base';
import { CATEGORIES_DATA, CITIES_DATA } from '../../lib/categories-cities-translations';

export default function NegotiationForm({ lang, onAnalysisComplete }) {
  const t = useT(lang);
  const l = lang || 'fr';
  const [form, setForm] = useState({ category: 'taxi', location: 'Marrakech', price_asked: '', description: '' });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsAnalyzing(true);

    try {
      const result = await analyzeNegotiation({
        category: form.category,
        city: form.location,
        priceAsked: form.price_asked,
        description: form.description,
        lang,
      });

      onAnalysisComplete({
        ...result,
        transcript: form.description,
        timestamp: new Date().toISOString(),
      });
    } catch (err) {
      console.error('Analysis error:', err);
      setError(
        lang === 'en' ? 'Analysis failed. Please try again.' :
        lang === 'es' ? 'El análisis falló. Inténtalo de nuevo.' :
        lang === 'de' ? 'Analyse fehlgeschlagen. Bitte erneut versuchen.' :
        lang === 'ar' ? 'فشل التحليل. حاول مرة أخرى.' :
        lang === 'darija' ? 'التحليل ما خدامش. عاود جرّب.' :
        'Analyse impossible. Réessayez.'
      );
    } finally {
      setIsAnalyzing(false);
    }
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

      {error && (
        <div className="p-3 bg-red-950/30 border border-red-500/30 rounded-lg text-xs text-red-400">
          {error}
        </div>
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