import React, { useState, useRef } from 'react';
import { Volume2, VolumeX, Loader2 } from 'lucide-react';

const LANGUAGE_CONFIG = {
  fr: { code: 'fr-FR', name: 'Français', messages: { loading: 'Chargement...', stop: 'Arrêter', title: 'Arrêter' } },
  en: { code: 'en-US', name: 'English', messages: { loading: 'Loading...', stop: 'Stop', title: 'Stop' } },
  es: { code: 'es-ES', name: 'Español', messages: { loading: 'Cargando...', stop: 'Detener', title: 'Detener' } },
  de: { code: 'de-DE', name: 'Deutsch', messages: { loading: 'Wird geladen...', stop: 'Stoppen', title: 'Stoppen' } },
  ar: { code: 'ar-SA', name: 'العربية', messages: { loading: 'جاري التحميل...', stop: 'إيقاف', title: 'إيقاف' } },
  darija: { code: 'ar-MA', name: 'Darija', messages: { loading: 'كيتحمل...', stop: 'وقف', title: 'وقف' } },
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
    utterance.lang = 'darija';
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.volume = 1;

    // Select Arabic voice if available
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(v => v.lang === 'ar-MA') ||
      voices.find(v => v.lang === 'darija') ||
      voices.find(v => v.lang.startsWith('darija'));

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
      className={`inline-flex items-center gap-2 px-4 py-3 rounded-xl font-bold transition-all text-sm ${
        isSpeaking
          ? 'bg-shield-green text-black shadow-lg scale-95'
          : 'bg-shield-gold text-black hover:bg-yellow-400 hover:scale-105 shadow-md'
      } disabled:opacity-50`}
      title={isSpeaking ? LANGUAGE_CONFIG[lang]?.messages.title || 'Stop' : label}
    >
      {isLoading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>{LANGUAGE_CONFIG[lang]?.messages.loading || '...'}</span>
        </>
      ) : isSpeaking ? (
        <>
          <VolumeX className="w-4 h-4" />
          <span>{LANGUAGE_CONFIG[lang]?.messages.stop || 'Stop'}</span>
        </>
      ) : (
        <>
          <Volume2 className="w-5 h-5" />
          <span>{label}</span>
        </>
      )}
    </button>
  );
}