import React, { createContext, useContext, useState, useEffect } from 'react';
import { isRTL } from './i18n';

const LanguageContext = createContext();

function getSavedLang() {
  try {
    // Nettoyer l'ancienne clé si elle existe
    const old = localStorage.getItem('negoshield_lang');
    if (old) {
      localStorage.setItem('tooristoo_lang', old);
      localStorage.removeItem('negoshield_lang');
    }
    return localStorage.getItem('tooristoo_lang') || sessionStorage.getItem('tooristoo_lang') || 'fr';
  } catch {
    return 'fr';
  }
}

function saveLang(lang) {
  try { localStorage.setItem('tooristoo_lang', lang); } catch {}
  try { sessionStorage.setItem('tooristoo_lang', lang); } catch {}
}

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(getSavedLang);

  const setLang = (newLang) => {
    saveLang(newLang);
    setLangState(newLang);
  };

  useEffect(() => {
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