import React, { createContext, useContext, useState, useEffect } from 'react';
import { isRTL } from './i18n';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    return (
      sessionStorage.getItem('tooristoo_lang') ||
      localStorage.getItem('negoshield_lang') ||
      'fr'
    );
  });

  const handleSetLang = (newLang) => {
    sessionStorage.setItem('tooristoo_lang', newLang);
    localStorage.setItem('negoshield_lang', newLang);
    setLang(newLang);
  };

  useEffect(() => {
    sessionStorage.setItem('tooristoo_lang', lang);
    localStorage.setItem('negoshield_lang', lang);
    document.documentElement.dir = isRTL(lang) ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang: handleSetLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}