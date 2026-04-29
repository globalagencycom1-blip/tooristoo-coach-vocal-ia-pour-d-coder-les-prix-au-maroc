import React, { useState, useRef } from 'react';
import { Mic, Square, Shield, Loader2, Zap } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { useT } from '../../lib/i18n';
import { CATEGORIES_DATA, CITIES_DATA } from '../../lib/categories-cities-translations';

export default function VoiceCoach({ lang, onAnalysisComplete, category: defaultCategory, location: defaultLocation, priceAsked }) {
  const t = useT(lang);
  const l = lang || 'fr';
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [category, setCategory] = useState(defaultCategory || 'taxi');
  const [location, setLocation] = useState(defaultLocation || 'Marrakech');
  const recognitionRef = useRef(null);

  const startListening = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('La reconnaissance vocale n\'est pas supportée par votre navigateur. Utilisez le formulaire ci-dessous.');
      return;
    }
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    const langMap = { fr: 'fr-FR', en: 'en-US', es: 'es-ES', de: 'de-DE', ar: 'ar-MA', darija: 'ar-MA' };
    recognition.lang = langMap[lang] || 'fr-FR';
    
    recognition.onresult = (event) => {
      let finalTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        }
      }
      if (finalTranscript) setTranscript(prev => prev + ' ' + finalTranscript);
    };
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);
    
    recognition.start();
    recognitionRef.current = recognition;
    setIsListening(true);
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }
    setIsListening(false);
  };

  const analyzeWithAI = async (text) => {
    setIsAnalyzing(true);
    const prompt = `Tu es NegoShield AI, un expert en prix touristiques au Maroc. 
    Analyse cette situation de négociation:
    Catégorie: ${category || 'taxi'}
    Ville: ${location || 'Marrakech'}
    Prix demandé: ${priceAsked || 'non spécifié'} MAD
    Description: ${text}
    
    Réponds en JSON avec:
    - price_estimated_min (number): prix minimum réel du marché en MAD
    - price_estimated_max (number): prix maximum réel du marché en MAD
    - risk_level: "low" | "medium" | "high"
    - scam_detected (boolean)
    - ai_analysis (string): analyse détaillée en ${lang === 'en' ? 'English' : lang === 'es' ? 'Español' : lang === 'de' ? 'Deutsch' : lang === 'ar' ? 'Arabe' : lang === 'darija' ? 'Darija marocaine' : 'Français'}
    - recommended_phrase (string): phrase exacte à dire au vendeur en ${lang === 'en' ? 'English' : lang === 'es' ? 'Español' : lang === 'de' ? 'Deutsch' : lang === 'ar' ? 'Arabe' : lang === 'darija' ? 'Darija' : 'Français'}
    - strategy (string): stratégie recommandée en ${lang === 'en' ? 'English' : lang === 'es' ? 'Español' : lang === 'de' ? 'Deutsch' : lang === 'ar' ? 'Arabe' : lang === 'darija' ? 'Darija' : 'Français'}
    - vendor_trust_score (number 1-5)
    - provider_name (string): nom d'un prestataire alternatif recommandé
    - provider_url (string): lien Google Maps ou site pour ce prestataire à ${location || 'Marrakech'}
    - savings (number): économies potentielles si prix MAD demandé est connu, sinon 0
    - recommended_phrase_darija (string): TOUJOURS la phrase recommandée traduite en Darija marocaine (langue parlée)
    IMPORTANT: risk_level doit OBLIGATOIREMENT être exactement "low", "medium", ou "high" en anglais, rien d'autre.`;

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
          strategy: { type: 'string' },
          vendor_trust_score: { type: 'number' },
          provider_name: { type: 'string' },
          provider_url: { type: 'string' },
          savings: { type: 'number' },
          recommended_phrase_darija: { type: 'string' },
        }
      }
    });
    
    setIsAnalyzing(false);
    onAnalysisComplete({ ...result, transcript: text, category, location, price_asked: priceAsked ? Number(priceAsked) : 0 });
  };

  const handleAnalyze = () => {
    if (isListening) stopListening();
    analyzeWithAI(transcript);
  };

  return (
    <div className="space-y-6">
      {/* Category & City selectors */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs text-gray-400 mb-1 block">{t('select_category')}</label>
          <select
            value={category}
            onChange={e => setCategory(e.target.value)}
            className="w-full bg-shield-dark border border-shield-border text-white text-sm rounded-xl px-3 py-2.5 focus:outline-none focus:border-shield-green"
          >
            {CATEGORIES_DATA.map(cat => (
              <option key={cat.value} value={cat.value}>{cat[l] || cat.fr}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-xs text-gray-400 mb-1 block">{t('select_location')}</label>
          <select
            value={location}
            onChange={e => setLocation(e.target.value)}
            className="w-full bg-shield-dark border border-shield-border text-white text-sm rounded-xl px-3 py-2.5 focus:outline-none focus:border-shield-green"
          >
            {CITIES_DATA.map(city => (
              <option key={city.value} value={city.value}>{city[l] || city.fr}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Mic Button */}
      <div className="flex flex-col items-center py-8">
        <div className="relative mb-6">
          {isListening && (
            <>
              <div className="absolute inset-0 rounded-full bg-shield-green/20 scale-150 animate-ping opacity-40" />
              <div className="absolute inset-0 rounded-full bg-shield-green/10 scale-125 pulse-ring" />
            </>
          )}
          <button
            onClick={isListening ? stopListening : startListening}
            className={`relative w-28 h-28 rounded-full flex items-center justify-center shadow-2xl transition-all ${
              isListening
                ? 'bg-gradient-to-br from-red-500 to-red-600'
                : 'bg-gradient-to-br from-shield-green to-green-600 btn-glow hover:scale-105'
            }`}
          >
            {isListening ? (
              <Square className="w-10 h-10 text-white" />
            ) : (
              <Mic className="w-12 h-12 text-black" />
            )}
          </button>
        </div>

        {/* Wave bars */}
        {isListening && (
          <div className="flex items-center gap-1 h-10 mb-3">
            {Array(12).fill(0).map((_, i) => (
              <div
                key={i}
                className="w-1.5 bg-shield-green rounded-full wave-animation"
                style={{ height: `${Math.random() * 30 + 10}px`, animationDelay: `${i * 0.1}s` }}
              />
            ))}
          </div>
        )}

        <p className="text-white font-semibold text-sm">
          {isListening ? t('app_listening') : t('app_start')}
        </p>
        {isListening && <p className="text-shield-green text-xs mt-1 animate-pulse">{t('app_speak')}</p>}
      </div>

      {/* Transcript */}
      {transcript && (
        <div className="bg-shield-card border border-shield-border rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="w-4 h-4 text-shield-green" />
            <span className="text-xs text-shield-green font-semibold">Transcript</span>
          </div>
          <textarea
            value={transcript}
            onChange={e => setTranscript(e.target.value)}
            rows={3}
            className="w-full bg-transparent text-sm text-gray-300 leading-relaxed resize-none focus:outline-none focus:ring-1 focus:ring-shield-green/50 rounded-lg p-1 -m-1"
            dir={['ar', 'darija'].includes(lang) ? 'rtl' : 'ltr'}
          />
        </div>
      )}

      {/* Analyze Button */}
      {(transcript || priceAsked) && (
        <button
          onClick={handleAnalyze}
          disabled={isAnalyzing}
          className="w-full py-4 bg-shield-green text-black font-bold rounded-xl hover:bg-green-400 transition-all btn-glow flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              {t('analyzing')}
            </>
          ) : (
            <>
              <Zap className="w-5 h-5" />
              {t('analyze_btn')}
            </>
          )}
        </button>
      )}

      {/* AI greeting */}
      <div className="flex items-start gap-3 p-4 bg-shield-card/50 rounded-xl border border-shield-border">
        <div className="w-8 h-8 rounded-full bg-shield-green/20 flex items-center justify-center flex-shrink-0">
          <Shield className="w-4 h-4 text-shield-green" />
        </div>
        <p className="text-sm text-gray-400 leading-relaxed">{t('app_greeting')}</p>
      </div>
    </div>
  );
}