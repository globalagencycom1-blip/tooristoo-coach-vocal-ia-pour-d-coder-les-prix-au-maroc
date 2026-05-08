import React, { useState, useRef } from 'react';
import { Mic, Square, Shield, Loader2, Zap } from 'lucide-react';
import { useT } from '../../lib/i18n';
import { analyzeNegotiation, isProhibitedRequest } from '../../lib/pricing-knowledge-base';
import { CATEGORIES_DATA, CITIES_DATA } from '../../lib/categories-cities-translations';

// ─── Extrait le prix depuis la transcription si c'est un solo nombre ──────────
function extractPriceFromTranscript(texte) {
  if (!texte) return null;
  const match = texte.trim().match(/^(\d+)(\s*(DH|MAD|درهم|dirhams?))?$/i);
  return match ? Number(match[1]) : null;
}

// ─── Filtre input insuffisant ─────────────────────────────────────────────────
function isInputInsuffisant(texte, prixDemande) {
  if (prixDemande && Number(prixDemande) > 0) return false;
  if (!texte || !texte.trim()) return true;
  if (extractPriceFromTranscript(texte)) return false; // solo nombre = prix valide
  return texte.trim().split(/\s+/).filter(Boolean).length < 2;
}

// ─── Composant ────────────────────────────────────────────────────────────────
export default function VoiceCoach({ lang, onAnalysisComplete, category: defaultCategory, location: defaultLocation, priceAsked }) {
  const t = useT(lang);
  const l = lang || 'fr';

  const [isListening, setIsListening]   = useState(false);
  const [transcript, setTranscript]     = useState('');
  const [isAnalyzing, setIsAnalyzing]   = useState(false);
  const [category, setCategory]         = useState(defaultCategory || 'taxi');
  const [location, setLocation]         = useState(defaultLocation || 'Marrakech');
  const [popup, setPopup]               = useState(null); // null | 'illegal' | 'insufficient'
  const recognitionRef                  = useRef(null);

  // ── Reconnaissance vocale ──
  const startListening = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert(t('speech_not_supported') || 'La reconnaissance vocale n\'est pas supportée. Utilisez le mode Texte.');
      return;
    }
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SR();
    recognition.continuous    = true;
    recognition.interimResults = true;
    const langMap = { fr: 'fr-FR', en: 'en-US', es: 'es-ES', de: 'de-DE', ar: 'ar-MA', darija: 'ar-MA' };
    recognition.lang = langMap[lang] || 'fr-FR';

    recognition.onresult = (event) => {
      let final = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) final += event.results[i][0].transcript;
      }
      if (final) setTranscript(prev => (prev + ' ' + final).trim());
    };
    recognition.onerror = () => setIsListening(false);
    recognition.onend   = () => setIsListening(false);
    recognition.start();
    recognitionRef.current = recognition;
    setIsListening(true);
  };

  const stopListening = () => {
    recognitionRef.current?.stop();
    recognitionRef.current = null;
    setIsListening(false);
  };

  // ── Analyse IA ──
  const analyzeWithAI = async (text) => {
    // 1. Filtre illégal — isProhibitedRequest vient de pricing-knowledge-base
    if (isProhibitedRequest(`${text} ${category}`, lang)) {
      setPopup('illegal');
      return;
    }

    // 2. Extrait le prix si la transcription est un solo nombre ("300")
    const extractedPrice    = extractPriceFromTranscript(text);
    const effectivePrice    = priceAsked || extractedPrice || null;

    // 3. Filtre insuffisant
    if (isInputInsuffisant(text, effectivePrice)) {
      setPopup('insufficient');
      return;
    }

    setIsAnalyzing(true);
    try {
      // 4. analyzeNegotiation orchestre tout (fourchettes + prestataires + LLM)
      const result = await analyzeNegotiation({
        category,
        city:        location,
        priceAsked:  effectivePrice,
        transcript:  text,
        description: text,
        lang,
      });

      if (result?.refused) { setPopup('illegal'); return; }

      onAnalysisComplete({
        ...result,
        transcript:  text,
        category,
        location,
        price_asked: effectivePrice ? Number(effectivePrice) : 0,
      });
    } catch (err) {
      console.error('Erreur analyse vocale :', err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleAnalyze = () => {
    if (isListening) stopListening();
    analyzeWithAI(transcript);
  };

  // ── Labels popup selon langue ──
  const popupContent = {
    illegal: {
      icon: '🛡️',
      title: lang === 'en' ? 'Outside our scope' : lang === 'es' ? 'Fuera de nuestro ámbito' : lang === 'de' ? 'Außerhalb unseres Bereichs' : lang === 'ar' ? 'خارج نطاق خدمتنا' : 'Hors de notre champ',
      message: lang === 'en' ? 'Tooristoo only analyses legal tourist services: taxis, accommodation, restaurants, guides, crafts and excursions.' :
               lang === 'es' ? 'Tooristoo solo analiza servicios turísticos legales: taxis, alojamiento, restaurantes, guías, artesanía y excursiones.' :
               lang === 'de' ? 'Tooristoo analysiert nur legale Touristendienstleistungen: Taxis, Unterkünfte, Restaurants, Guides, Kunsthandwerk und Ausflüge.' :
               lang === 'ar' ? 'Tooristoo يحلل فقط الخدمات السياحية القانونية: سيارات الأجرة والإقامة والمطاعم والمرشدين والحرف والرحلات.' :
               'Tooristoo analyse uniquement les services touristiques légaux : taxis, hébergements, restaurants, guides, artisanat et excursions.',
      btn: lang === 'en' ? 'Understood' : lang === 'es' ? 'Entendido' : lang === 'de' ? 'Verstanden' : lang === 'ar' ? 'حسناً' : 'Compris',
    },
    insufficient: {
      icon: '💬',
      title: lang === 'en' ? 'More details needed' : lang === 'es' ? 'Se necesitan más detalles' : lang === 'de' ? 'Mehr Details erforderlich' : lang === 'ar' ? 'تحتاج إلى مزيد من التفاصيل' : 'Précisez la situation',
      message: lang === 'en' ? 'Describe the situation in a few words: the service, the location and the price asked. Example: "Taxi to the airport in Marrakech, 300 DH"' :
               lang === 'es' ? 'Describe la situación en pocas palabras: el servicio, el lugar y el precio pedido. Ejemplo: "Taxi al aeropuerto en Marrakech, 300 DH"' :
               lang === 'de' ? 'Beschreiben Sie die Situation kurz: den Service, den Ort und den verlangten Preis. Beispiel: "Taxi zum Flughafen in Marrakesch, 300 DH"' :
               lang === 'ar' ? 'صف الوضع ببضع كلمات: الخدمة والمكان والسعر المطلوب. مثال: "تاكسي إلى المطار في مراكش، 300 درهم"' :
               'Décrivez la situation en quelques mots : le service, le lieu et le prix demandé. Ex : "Taxi pour l\'aéroport à Marrakech, 300 DH"',
      btn: lang === 'en' ? 'Try again' : lang === 'es' ? 'Reintentar' : lang === 'de' ? 'Erneut versuchen' : lang === 'ar' ? 'حاول مجدداً' : 'Réessayer',
    },
  };

  return (
    <div className="space-y-6">

      {/* ── Popup illégal / insuffisant ── */}
      {popup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-shield-card border border-shield-border rounded-2xl p-6 max-w-sm w-full shadow-2xl">
            <div className="text-center mb-4">
              <span className="text-4xl">{popupContent[popup].icon}</span>
            </div>
            <h3 className="text-white font-bold text-base text-center mb-3">
              {popupContent[popup].title}
            </h3>
            <p className="text-gray-400 text-sm text-center leading-relaxed mb-5">
              {popupContent[popup].message}
            </p>
            <button
              onClick={() => setPopup(null)}
              className="w-full py-3 bg-shield-green text-black font-bold rounded-xl hover:bg-green-400 transition-all"
            >
              {popupContent[popup].btn}
            </button>
          </div>
        </div>
      )}

      {/* ── Sélecteurs catégorie + ville ── */}
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

      {/* ── Bouton micro ── */}
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
            {isListening
              ? <Square className="w-10 h-10 text-white" />
              : <Mic className="w-12 h-12 text-black" />
            }
          </button>
        </div>

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

      {/* ── Transcription ── */}
      {transcript && (
        <div className="bg-shield-card border border-shield-border rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="w-4 h-4 text-shield-green" />
            <span className="text-xs text-shield-green font-semibold">{t('transcript_label')}</span>
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

      {/* ── Bouton analyser ── */}
      {(transcript || priceAsked) && (
        <button
          onClick={handleAnalyze}
          disabled={isAnalyzing}
          className="w-full py-4 bg-shield-green text-black font-bold rounded-xl hover:bg-green-400 transition-all btn-glow flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {isAnalyzing ? (
            <><Loader2 className="w-5 h-5 animate-spin" />{t('analyzing')}</>
          ) : (
            <><Zap className="w-5 h-5" />{t('analyze_btn')}</>
          )}
        </button>
      )}

      {/* ── Message d'accueil IA ── */}
      <div className="flex items-start gap-3 p-4 bg-shield-card/50 rounded-xl border border-shield-border">
        <div className="w-8 h-8 rounded-full bg-shield-green/20 flex items-center justify-center flex-shrink-0">
          <Shield className="w-4 h-4 text-shield-green" />
        </div>
        <p className="text-sm text-gray-400 leading-relaxed">{t('app_greeting')}</p>
      </div>

    </div>
  );
}