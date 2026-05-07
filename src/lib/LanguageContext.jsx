import React, { createContext, useContext, useState, useEffect } from 'react';
import { isRTL } from './i18n';

const LanguageContext = createContext();

// Maps browser language codes to supported app languages
function detectBrowserLang() {
  const saved = localStorage.getItem('tooristoo_lang');
  if (saved) return saved;
  const nav = (navigator.language || navigator.languages?.[0] || 'fr').toLowerCase();
  if (nav.startsWith('ar')) return 'ar';
  if (nav.startsWith('de')) return 'de';
  if (nav.startsWith('es')) return 'es';
  if (nav.startsWith('en')) return 'en';
  return 'fr'; // default to French (primary market)
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => detectBrowserLang());

  useEffect(() => {
    localStorage.setItem('tooristoo_lang', lang);
    document.documentElement.dir = isRTL(lang) ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}