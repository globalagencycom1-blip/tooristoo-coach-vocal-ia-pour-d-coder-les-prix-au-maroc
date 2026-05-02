import React, { useState } from 'react';
import { Volume2, Play, Pause } from 'lucide-react';
import { useT } from '../../lib/i18n';

export default function VoiceCoachDemoSection({ lang }) {
  const t = useT(lang);
  const [playingLang, setPlayingLang] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const DEMO_PHRASES = [
    {
      lang: 'darija',
      label: '🇲🇦 Darija',
      text: '"السلام، التمن ديال الكوريس بين 120 و150 درهم، إلا كان مزيان لمك، ولا شكراً."',
      audio: null // To be set with actual audio URL
    },
    {
      lang: 'fr',
      label: '🇫🇷 Français',
      text: '"Bonjour, le prix équitable pour un taxi est entre 120 et 150 dirhams. C\'est mon offre, ou je m\'en vais."',
      audio: null
    },
    {
      lang: 'en',
      label: '🇬🇧 English',
      text: '"Hello, the fair price for this service is between 120 and 150 dirhams. That\'s my offer, or I\'ll leave."',
      audio: null
    },
    {
      lang: 'es',
      label: '🇪🇸 Español',
      text: '"El precio justo para un taxi es entre 120 y 150 dirhams. Esa es mi oferta, o me voy."',
      audio: null
    },
    {
      lang: 'de',
      label: '🇩🇪 Deutsch',
      text: '"Der faire Preis für ein Taxi liegt zwischen 120 und 150 Dirham. Das ist mein Angebot, oder ich gehe."',
      audio: null
    },
    {
      lang: 'ar',
      label: '🇸🇦 العربية',
      text: '"السعر العادل للتاكسي بين 120 و150 درهم. هذا عرضي، أو سأرحل."',
      audio: null
    }
  ];

  const handlePlayAudio = async (lang) => {
    if (playingLang === lang) {
      setPlayingLang(null);
      return;
    }

    setPlayingLang(lang);
    setIsLoading(true);

    try {
      // Find the phrase
      const phrase = DEMO_PHRASES.find(p => p.lang === lang);
      
      // Use Web Speech API for text-to-speech
      const utterance = new SpeechSynthesisUtterance(phrase.text);
      utterance.lang = lang === 'darija' ? 'ar-MA' : lang === 'fr' ? 'fr-FR' : lang === 'en' ? 'en-US' : lang === 'es' ? 'es-ES' : lang === 'de' ? 'de-DE' : 'ar-SA';
      utterance.rate = 0.9;
      utterance.pitch = 1;

      utterance.onend = () => {
        setPlayingLang(null);
        setIsLoading(false);
      };

      speechSynthesis.cancel();
      speechSynthesis.speak(utterance);
    } catch (error) {
      console.error('Error playing audio:', error);
      setPlayingLang(null);
      setIsLoading(false);
    }
  };

  return (
    <section className="py-20 px-4 bg-shield-dark">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-shield-green/10 border border-shield-green/30 rounded-full text-shield-green text-sm font-medium mb-6">
            <Volume2 className="w-4 h-4" />
            Le Différenciant Clé
          </div>
          <h2 className="font-poppins font-black text-4xl md:text-5xl text-white mb-4">
            Coach Vocal <span className="text-gradient-green">Multilingue</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Le seul coach vocal qui vous donne les phrases exactes EN AUDIO dans votre langue. Vous ne savez pas parler darija ? Pas de problème — Tooristoo parle pour vous.
          </p>
        </div>

        {/* Demo Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {/* Darija Highlighted */}
          <div className="md:col-span-2 lg:col-span-1 bg-gradient-to-br from-shield-green/20 to-shield-gold/20 border border-shield-green/40 rounded-2xl p-8 hover:border-shield-green/60 transition-all">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-poppins font-bold text-xl text-white mb-1">🇲🇦 Darija</h3>
                <p className="text-sm text-gray-400">Darija Marocain — La langue locale</p>
              </div>
              <button
                onClick={() => handlePlayAudio('darija')}
                className={`p-3 rounded-full transition-all ${
                  playingLang === 'darija'
                    ? 'bg-shield-green text-black animate-pulse'
                    : 'bg-shield-green/20 text-shield-green hover:bg-shield-green/40'
                }`}
              >
                {playingLang === 'darija' ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              </button>
            </div>
            <p className="text-white font-medium leading-relaxed italic mb-4">
              "السلام، التمن ديال الكوريس بين 120 و150 درهم، إلا كان مزيان لمك، ولا شكراً."
            </p>
            <p className="text-sm text-gray-300">
              ✓ Prononciation native<br/>
              ✓ Respect des usages locaux<br/>
              ✓ Impression d'authenticité
            </p>
          </div>

          {/* Other Languages */}
          <div className="space-y-4">
            {DEMO_PHRASES.slice(1).map((phrase) => (
              <div key={phrase.lang} className="bg-shield-card border border-shield-border rounded-xl p-4 hover:border-shield-green/30 transition-all">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold text-white text-sm">{phrase.label}</h4>
                  <button
                    onClick={() => handlePlayAudio(phrase.lang)}
                    className={`p-2 rounded-lg transition-all ${
                      playingLang === phrase.lang
                        ? 'bg-shield-green text-black'
                        : 'bg-shield-border text-gray-400 hover:bg-shield-green/20'
                    }`}
                  >
                    {playingLang === phrase.lang ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </button>
                </div>
                <p className="text-xs text-gray-400 line-clamp-2">{phrase.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Key Benefits */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-shield-card border border-shield-border rounded-2xl p-6 text-center">
            <div className="text-3xl mb-3">🗣️</div>
            <h4 className="font-poppins font-bold text-white mb-2">Audio Natif</h4>
            <p className="text-sm text-gray-400">Écoutez comment prononcer chaque phrase avec accent naturel</p>
          </div>
          <div className="bg-shield-card border border-shield-border rounded-2xl p-6 text-center">
            <div className="text-3xl mb-3">🌍</div>
            <h4 className="font-poppins font-bold text-white mb-2">6 Langues</h4>
            <p className="text-sm text-gray-400">Français, anglais, espagnol, allemand, arabe et darija marocain</p>
          </div>
          <div className="bg-shield-card border border-shield-border rounded-2xl p-6 text-center">
            <div className="text-3xl mb-3">🎯</div>
            <h4 className="font-poppins font-bold text-white mb-2">Aucune Barrière</h4>
            <p className="text-sm text-gray-400">Vous ne parlez pas darija ? Tooristoo parle pour vous.</p>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="text-gray-400 mb-6">
            🔒 <strong>Unique à Tooristoo</strong> — Aucune autre plateforme n'offre le coaching vocal multilingue en temps réel avec traduction en darija
          </p>
        </div>
      </div>
    </section>
  );
}