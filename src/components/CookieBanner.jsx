import React, { useState, useEffect } from 'react';
import { Cookie, X, Settings, Check, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const COOKIE_KEY = 'tooristoo_cookie_consent';

const DEFAULT_PREFS = {
  necessary: true,    // toujours vrai
  analytics: false,
  marketing: false,
};

export default function CookieBanner({ lang = 'fr' }) {
  const [visible, setVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [prefs, setPrefs] = useState(DEFAULT_PREFS);

  useEffect(() => {
    const saved = localStorage.getItem(COOKIE_KEY);
    if (!saved) {
      // Délai pour ne pas gêner le chargement initial
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const save = (finalPrefs) => {
    localStorage.setItem(COOKIE_KEY, JSON.stringify({ ...finalPrefs, timestamp: Date.now() }));
    setVisible(false);
  };

  const acceptAll = () => save({ necessary: true, analytics: true, marketing: false });
  const rejectAll = () => save({ necessary: true, analytics: false, marketing: false });
  const saveCustom = () => save(prefs);

  const labels = {
    fr: {
      title: "🍪 Nous respectons votre vie privée",
      desc: "Nous utilisons des cookies nécessaires au fonctionnement du site et, avec votre accord, des cookies d'analyse pour améliorer notre service. Aucun cookie publicitaire.",
      necessary: "Nécessaires",
      necessary_desc: "Authentification, langue, consentement — toujours actifs",
      analytics: "Analyse (anonymisée)",
      analytics_desc: "Mesure d'audience pour améliorer Tooristoo",
      accept_all: "Tout accepter",
      reject_all: "Tout refuser",
      customize: "Personnaliser",
      save: "Enregistrer mes choix",
      learn_more: "Politique de confidentialité",
      rgpd_note: "Conformément au RGPD et aux recommandations CNIL",
    },
    en: {
      title: "🍪 We respect your privacy",
      desc: "We use necessary cookies and, with your consent, analytics cookies to improve our service. No advertising cookies.",
      necessary: "Necessary",
      necessary_desc: "Authentication, language, consent — always active",
      analytics: "Analytics (anonymized)",
      analytics_desc: "Audience measurement to improve Tooristoo",
      accept_all: "Accept all",
      reject_all: "Reject all",
      customize: "Customize",
      save: "Save my choices",
      learn_more: "Privacy Policy",
      rgpd_note: "GDPR compliant",
    },
    es: {
      title: "🍪 Respetamos tu privacidad",
      desc: "Usamos cookies necesarias y, con tu consentimiento, cookies de análisis para mejorar el servicio.",
      necessary: "Necesarias",
      necessary_desc: "Autenticación, idioma, consentimiento — siempre activas",
      analytics: "Análisis (anónimo)",
      analytics_desc: "Medición de audiencia para mejorar Tooristoo",
      accept_all: "Aceptar todo",
      reject_all: "Rechazar todo",
      customize: "Personalizar",
      save: "Guardar preferencias",
      learn_more: "Política de privacidad",
      rgpd_note: "Conforme al RGPD",
    },
    de: {
      title: "🍪 Wir respektieren Ihre Privatsphäre",
      desc: "Wir verwenden notwendige Cookies und mit Ihrer Zustimmung Analyse-Cookies zur Verbesserung.",
      necessary: "Notwendig",
      necessary_desc: "Authentifizierung, Sprache, Einwilligung — immer aktiv",
      analytics: "Analyse (anonymisiert)",
      analytics_desc: "Reichweitenmessung zur Verbesserung von Tooristoo",
      accept_all: "Alle akzeptieren",
      reject_all: "Alle ablehnen",
      customize: "Anpassen",
      save: "Auswahl speichern",
      learn_more: "Datenschutzrichtlinie",
      rgpd_note: "DSGVO-konform",
    },
    ar: {
      title: "🍪 نحترم خصوصيتك",
      desc: "نستخدم ملفات تعريف الارتباط الضرورية وبموافقتك ملفات التحليل لتحسين الخدمة.",
      necessary: "ضروري",
      necessary_desc: "المصادقة، اللغة، الموافقة — دائماً نشط",
      analytics: "تحليلات (مجهولة)",
      analytics_desc: "قياس الجمهور لتحسين Tooristoo",
      accept_all: "قبول الكل",
      reject_all: "رفض الكل",
      customize: "تخصيص",
      save: "حفظ اختياراتي",
      learn_more: "سياسة الخصوصية",
      rgpd_note: "متوافق مع RGPD",
    },
    darija: {
      title: "🍪 كنحترمو الخصوصية ديالك",
      desc: "كنستخدمو الكوكيز الضروريين وبموافقتك كوكيز التحليل باش نحسنو الخدمة.",
      necessary: "ضروري",
      necessary_desc: "المصادقة، اللغة، الموافقة — دايما نشط",
      analytics: "تحليلات (مجهولة)",
      analytics_desc: "قياس الجمهور باش نحسنو Tooristoo",
      accept_all: "قبول الكل",
      reject_all: "رفض الكل",
      customize: "تخصيص",
      save: "حفظ الاختيارات ديالي",
      learn_more: "سياسة الخصوصية",
      rgpd_note: "متوافق مع RGPD",
    }
  };

  const L = labels[lang] || labels['fr'];

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] p-4 md:p-6">
      <div className="max-w-4xl mx-auto bg-shield-card border border-shield-border rounded-2xl shadow-2xl overflow-hidden">
        {/* Main banner */}
        <div className="p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3 flex-1">
              <div className="w-10 h-10 rounded-xl bg-shield-green/10 flex items-center justify-center flex-shrink-0">
                <Cookie className="w-5 h-5 text-shield-green" />
              </div>
              <div className="flex-1">
                <h3 className="font-poppins font-bold text-white mb-1">{L.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{L.desc}</p>
                <div className="flex items-center gap-1 mt-2">
                  <Shield className="w-3 h-3 text-shield-green" />
                  <span className="text-xs text-shield-green">{L.rgpd_note}</span>
                  <span className="text-gray-600 mx-2">·</span>
                  <Link to="/privacy" className="text-xs text-gray-500 hover:text-shield-green underline transition-colors">
                    {L.learn_more}
                  </Link>
                </div>
              </div>
            </div>
            <button onClick={rejectAll} className="text-gray-500 hover:text-white transition-colors flex-shrink-0">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Detailed options */}
          {showDetails && (
            <div className="mt-5 space-y-3 border-t border-shield-border pt-5">
              {/* Necessary */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-shield-dark/50">
                <div>
                  <p className="text-white text-sm font-semibold">{L.necessary}</p>
                  <p className="text-gray-500 text-xs">{L.necessary_desc}</p>
                </div>
                <div className="w-10 h-6 bg-shield-green rounded-full flex items-center justify-end px-1 opacity-60 cursor-not-allowed">
                  <div className="w-4 h-4 bg-white rounded-full" />
                </div>
              </div>

              {/* Analytics */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-shield-dark/50">
                <div>
                  <p className="text-white text-sm font-semibold">{L.analytics}</p>
                  <p className="text-gray-500 text-xs">{L.analytics_desc}</p>
                </div>
                <button
                  onClick={() => setPrefs(p => ({ ...p, analytics: !p.analytics }))}
                  className={`w-10 h-6 rounded-full flex items-center px-1 transition-all ${prefs.analytics ? 'bg-shield-green justify-end' : 'bg-gray-700 justify-start'}`}
                >
                  <div className="w-4 h-4 bg-white rounded-full" />
                </button>
              </div>
            </div>
          )}

          {/* Buttons */}
          <div className="flex flex-wrap gap-3 mt-5">
            <button
              onClick={acceptAll}
              className="flex items-center gap-2 px-5 py-2.5 bg-shield-green text-black font-bold text-sm rounded-xl hover:bg-green-400 transition-all"
            >
              <Check className="w-4 h-4" />
              {L.accept_all}
            </button>
            <button
              onClick={rejectAll}
              className="px-5 py-2.5 bg-shield-dark border border-shield-border text-gray-300 font-semibold text-sm rounded-xl hover:border-gray-500 transition-all"
            >
              {L.reject_all}
            </button>
            {!showDetails ? (
              <button
                onClick={() => setShowDetails(true)}
                className="flex items-center gap-2 px-5 py-2.5 bg-shield-dark border border-shield-border text-gray-400 font-semibold text-sm rounded-xl hover:border-gray-500 transition-all"
              >
                <Settings className="w-4 h-4" />
                {L.customize}
              </button>
            ) : (
              <button
                onClick={saveCustom}
                className="px-5 py-2.5 bg-shield-dark border border-shield-green/50 text-shield-green font-semibold text-sm rounded-xl hover:border-shield-green transition-all"
              >
                {L.save}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}