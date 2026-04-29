import React, { useState, useRef } from 'react';
import { Volume2, VolumeX, Loader2 } from 'lucide-react';

const LANGUAGE_CONFIG = {
  fr: { code: 'fr-FR', name: 'Français', messages: { loading: 'Chargement...', stop: 'Arrêter', title: 'Arrêter' } },
  en: { code: 'en-US', name: 'English', messages: { loading: 'Loading...', stop: 'Stop', title: 'Stop' } },
  es: { code: 'es-ES', name: 'Español', messages: { loading: 'Cargando...', stop: 'Detener', title: 'Detener' } },
  de: { code: 'de-DE', name: 'Deutsch', messages: { loading: 'Wird geladen...', stop: 'Stoppen', title: 'Stoppen' } },
  ar: { code: 'ar-SA', name: 'العربية', messages: { loading: 'جاري التحميل...', stop: 'إيقاف', title: 'إيقاف' } },
  darija: { code: 'fr-MA', name: 'Darija', messages: { loading: 'كيتحمل...', stop: 'وقف', title: 'وقف' } },
};

export default function VoiceOutput({ text, lang = 'fr', label = 'Écouter' }) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const synthRef = useRef(null);

  const handleSpeak = () => {
    if (!('speechSynthesis' in window)) {
      alert('Votre navigateur ne supporte pas la synthèse vocale.');
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    setIsLoading(true);
    
    // Cancel any existing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Always use Arabic for audio output regardless of selected language
    utterance.lang = 'ar-MA';
    utterance.rate = 0.9;
    utterance.pitch = 0.9;
    utterance.volume = 1;

    // Select Arabic voice if available
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(v => v.lang === 'ar-MA') ||
      voices.find(v => v.lang === 'ar-SA') ||
      voices.find(v => v.lang.startsWith('ar'));

    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    utterance.onstart = () => {
      setIsLoading(false);
      setIsSpeaking(true);
    };

    utterance.onend = () => {
      setIsSpeaking(false);
    };

    utterance.onerror = () => {
      setIsSpeaking(false);
      setIsLoading(false);
    };

    window.speechSynthesis.speak(utterance);
    synthRef.current = utterance;
  };

  return (
    <button
      onClick={handleSpeak}
      disabled={isLoading}
      className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
        isSpeaking
          ? 'bg-shield-green/20 text-shield-green border border-shield-green'
          : 'bg-shield-gold/10 text-shield-gold border border-shield-gold/30 hover:bg-shield-gold/20'
      } disabled:opacity-50`}
      title={isSpeaking ? LANGUAGE_CONFIG[lang]?.messages.title || 'Stop' : label}
    >
      {isLoading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          {LANGUAGE_CONFIG[lang]?.messages.loading || 'Loading...'}
        </>
      ) : isSpeaking ? (
        <>
          <VolumeX className="w-4 h-4" />
          {LANGUAGE_CONFIG[lang]?.messages.stop || 'Stop'}
        </>
      ) : (
        <>
          <Volume2 className="w-4 h-4" />
          {label}
        </>
      )}
    </button>
  );
}