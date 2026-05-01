import React, { useState } from 'react';
import { CheckCircle, XCircle, AlertTriangle, Star, Volume2, VolumeX } from 'lucide-react';
import { useT } from '../../lib/i18n';
import { exampleTranslations } from '../../lib/i18n-examples';

export default function AnalysisSection({ lang }) {
  const t = useT(lang);
  const examples = exampleTranslations[lang] || exampleTranslations.fr;
  const [speaking, setSpeaking] = useState(false);

  const strategyKeys = ['strategy1', 'strategy2', 'strategy3', 'strategy4', 'strategy5'];
  const alertKeys = ['alert1', 'alert2', 'alert3', 'alert4', 'alert5'];

  const speakDarija = () => {
    if (!window.speechSynthesis) return;
    if (speaking) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
      return;
    }
    const text = examples.example_phrase_darija;
    const utterance = new SpeechSynthesisUtterance(text);
    // Prefer Arabic voice for Darija
    const voices = window.speechSynthesis.getVoices();
    const arabicVoice = voices.find(v => v.lang.startsWith('ar'));
    if (arabicVoice) utterance.voice = arabicVoice;
    utterance.lang = 'ar-MA';
    utterance.rate = 0.85;
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);
    setSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <section className="py-24 bg-[#0a1628]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-poppins font-black text-3xl md:text-4xl text-white">
            🌴 {t('analysis_title')}
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left: Analysis card */}
          <div className="space-y-4">
            {/* Situation */}
            <div className="bg-shield-card border border-shield-border rounded-2xl p-5">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-bold text-shield-gold uppercase tracking-wider">{t('analysis_situation')}</span>
              </div>
              <p className="text-gray-300 text-sm">{examples.example_situation}</p>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-xs text-gray-500">{t('analysis_price_asked')}</span>
                <span className="text-xl font-bold text-red-400">300 MAD</span>
              </div>
            </div>

            {/* AI Analysis */}
            <div className="bg-shield-card border border-shield-border rounded-2xl p-5">
              <h4 className="text-xs font-bold text-shield-gold uppercase tracking-wider mb-4">{t('analysis_ai')}</h4>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-shield-green flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs text-gray-400">{t('analysis_real_price')} : </span>
                    <span className="text-sm font-semibold text-white">120 – 150 MAD</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <XCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs text-gray-400">{t('analysis_anomaly')} : </span>
                    <span className="text-sm text-red-400 font-medium">{examples.example_anomaly}</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-4 h-4 text-shield-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs text-gray-400">{t('analysis_risk')} : </span>
                    <span className="text-sm font-bold text-shield-gold">{t('risk_high')}</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs text-gray-400">{t('analysis_trust')} : </span>
                    <span className="flex gap-0.5 mt-0.5">
                      {[1,2,3,4,5].map(i => (
                        <Star key={i} className={`w-3 h-3 ${i <= 2 ? 'text-shield-gold fill-shield-gold' : 'text-gray-600'}`} />
                      ))}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Strategy + Phrase + Alerts */}
          <div className="space-y-4">
            {/* Strategy */}
            <div className="bg-shield-card border border-shield-border rounded-2xl p-5">
              <h4 className="text-xs font-bold text-shield-green uppercase tracking-wider mb-4">{t('analysis_strategy')}</h4>
              <div className="space-y-2">
                {strategyKeys.map((key, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-shield-green flex-shrink-0" />
                    <span className="text-sm text-gray-300">{t(key)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Exact phrase */}
            <div className="bg-shield-card border border-shield-green/30 rounded-2xl p-5 card-glow">
              <h4 className="text-xs font-bold text-shield-green uppercase tracking-wider mb-3">{t('analysis_phrase')}</h4>
              <blockquote className="text-gray-300 text-sm leading-relaxed italic border-l-2 border-shield-green pl-4">
                "{examples.example_phrase_intro}"
              </blockquote>
              <div className="mt-3 pt-3 border-t border-shield-border">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-shield-gold font-semibold">🇲🇦 {t('in_darija')}</span>
                  <button
                    onClick={speakDarija}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      speaking
                        ? 'bg-shield-gold/20 border border-shield-gold text-shield-gold'
                        : 'bg-shield-green/10 border border-shield-green/40 text-shield-green hover:bg-shield-green/20'
                    }`}
                  >
                    {speaking ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                    Darija
                  </button>
                </div>
                <span className="text-xs text-gray-300 italic">"{examples.example_phrase_darija}"</span>
              </div>
            </div>

            {/* Alerts */}
            <div className="bg-shield-card border border-red-500/20 rounded-2xl p-5">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-xs font-bold text-red-400 uppercase tracking-wider">{t('alerts_title')}</h4>
                <div className="flex items-center gap-1 bg-shield-green/10 border border-shield-green/30 rounded-lg px-2 py-1">
                  <span className="text-xs text-shield-green font-bold">{t('protection')}</span>
                </div>
              </div>
              <div className="space-y-2">
                {alertKeys.map((key, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <AlertTriangle className={`w-3.5 h-3.5 flex-shrink-0 mt-0.5 ${i === 0 ? 'text-red-400' : i === 1 ? 'text-shield-gold' : 'text-red-400'}`} />
                    <span className="text-xs text-gray-400">{t(key)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}