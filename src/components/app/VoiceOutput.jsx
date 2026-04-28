import React, { useState, useRef } from 'react';
import { Volume2, VolumeX, Loader2 } from 'lucide-react';

const LANGUAGE_CONFIG = {
  fr: { code: 'fr-FR', name: 'Français' },
  en: { code: 'en-US', name: 'English' },
  es: { code: 'es-ES', name: 'Español' },
  de: { code: 'de-DE', name: 'Deutsch' },
  ar: { code: 'ar-SA', name: 'العربية' },
  darija: { code: 'fr-MA', name: 'Darija' },
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
    const langConfig = LANGUAGE_CONFIG[lang] || LANGUAGE_CONFIG.fr;
    
    utterance.lang = langConfig.code;
    utterance.rate = 0.9; // Slightly slower for clarity
    utterance.pitch = 0.9; // Slightly lower for masculine tone
    utterance.volume = 1;

    // Select voice - prefer male voice if available
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(v => {
      const voiceLang = v.lang.split('-')[0];
      const targetLang = langConfig.code.split('-')[0];
      return voiceLang === targetLang && (v.name.includes('male') || v.name.includes('Male') || v.name.includes('man'));
    }) || voices.find(v => v.lang.startsWith(langConfig.code.split('-')[0]));

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
      title={isSpeaking ? 'Arrêter' : label}
    >
      {isLoading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          Chargement...
        </>
      ) : isSpeaking ? (
        <>
          <VolumeX className="w-4 h-4" />
          Arrêter
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