import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Mic, MicOff, Loader2, Copy, Send, AlertCircle, Check, RotateCcw } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { useT } from '../../lib/i18n';
import { getRecorderT } from '../../lib/recorder-translations';

// Mapping centralisé pour la reconnaissance vocale
const SPEECH_LANG_MAP = {
  fr: 'fr-FR',
  en: 'en-US',
  es: 'es-ES',
  de: 'de-DE',
  ar: 'ar-SA',
  darija: 'ar-MA',
};

// Nom complet de la langue de réponse pour le prompt LLM
const LANG_NAME_FOR_PROMPT = {
  fr: 'français',
  en: 'English',
  es: 'español',
  de: 'Deutsch',
  ar: 'العربية',
  darija: 'الدارجة المغربية',
};

// Limite raisonnable pour éviter les transcripts énormes envoyés au LLM
const MAX_TRANSCRIPT_CHARS = 2000;
// Filtre de nettoyage des réponses LLM
// Le modèle revient parfois à un vocabulaire accusatoire malgré le prompt.
// Cette fonction sanitize la sortie pour garantir le ton défendable.
const sanitizeLLMResponse = (text, lang = 'fr') => {
  if (!text || typeof text !== 'string') return text;

  // Dictionnaire de remplacements (clé = regex, valeur = remplacement)
  const replacements = {
    fr: [
      [/\barnaque?s?\b/gi, 'écart de prix'],
      [/\barnaqueurs?\b/gi, 'pratiquants de tarifs élevés'],
      [/\barnaquer\b/gi, 'pratiquer un tarif élevé'],
      [/\babusifs?\b/gi, 'au-dessus de la référence'],
      [/\babusives?\b/gi, 'au-dessus de la référence'],
      [/\babusivement\b/gi, 'au-dessus de la référence'],
      [/\babus\b/gi, 'écart'],
      [/\babuser\b/gi, 'pratiquer un écart'],
      [/\bfrauduleux\b/gi, 'au-dessus de la fourchette'],
      [/\btromper\b/gi, 'surfacturer'],
      [/\btromperie\b/gi, 'écart tarifaire'],
      [/seuil (d'|de l')?(arnaque|abus|fraude)( de \d+ ?(DH|MAD))?/gi, 'fourchette de référence'],
      [/considéré comme (une |un )?(arnaque|abus|fraude|abusif)/gi, 'au-dessus de la fourchette de référence'],
    ],
    en: [
      [/\bscams?\b/gi, 'price gap'],
      [/\bscammers?\b/gi, 'overpricers'],
      [/\bscamming\b/gi, 'overpricing'],
      [/\babusive\b/gi, 'above reference'],
      [/\babuse\b/gi, 'gap'],
      [/\bfraudulent\b/gi, 'above the range'],
      [/\bcheating\b/gi, 'overpricing'],
      [/(scam|abuse|fraud) threshold( of \d+ ?(DH|MAD))?/gi, 'reference range'],
    ],
    es: [
      [/\bestafas?\b/gi, 'diferencia de precio'],
      [/\bestafadores?\b/gi, 'que cobran de más'],
      [/\babusivos?\b/gi, 'por encima de la referencia'],
      [/\babusivas?\b/gi, 'por encima de la referencia'],
      [/\babuso\b/gi, 'diferencia'],
      [/\bfraude\b/gi, 'diferencia de precio'],
    ],
    de: [
      [/\bBetrug\b/gi, 'Preisabweichung'],
      [/\bbetrügerisch\b/gi, 'über der Referenz'],
      [/\bBetrüger\b/gi, 'Anbieter mit hohen Preisen'],
      [/\bmissbräuchlich\b/gi, 'über der Referenz'],
    ],
    ar: [
      [/احتيال/g, 'فرق سعري'],
      [/نصب/g, 'فرق سعري'],
      [/محتال/g, 'مزود بأسعار مرتفعة'],
      [/نصاب/g, 'مزود بأسعار مرتفعة'],
    ],
    darija: [
      [/احتيال/g, 'فرق فالثمن'],
      [/نصب/g, 'فرق فالثمن'],
      [/محتال/g, 'خادم بأثمان عالية'],
      [/نصاب/g, 'خادم بأثمان عالية'],
    ],
  };

  let cleaned = text;
  const langReplacements = replacements[lang] || replacements.fr;

  langReplacements.forEach(([pattern, replacement]) => {
    cleaned = cleaned.replace(pattern, replacement);
  });

  // Suppression des chiffres inventés au format "seuil de XX DH" ou "limite de XX MAD"
  // qui ne sont pas dans price_estimated_min/max
  cleaned = cleaned.replace(/seuil (de |d')?\d+\s*(DH|MAD|درهم)/gi, 'fourchette de référence');
  cleaned = cleaned.replace(/limite (de |d')?\d+\s*(DH|MAD|درهم)/gi, 'fourchette de référence');

  // Nettoyage des doubles espaces résultants
  cleaned = cleaned.replace(/\s+/g, ' ').trim();

  // Nettoyage des "(.)" et autres restes d'éliminations
  cleaned = cleaned.replace(/\(\s*\)/g, '');
  cleaned = cleaned.replace(/\s+,/g, ',');
  cleaned = cleaned.replace(/\s+\./g, '.');

  return cleaned;
};
// Mots-clés de pré-filtrage côté client (couche de défense supplémentaire)
// Si l'un de ces mots apparaît, on évite l'appel LLM et on retourne directement le refus
const FORBIDDEN_KEYWORDS = [
  // Drogues (toutes langues)
  'hashish', 'haschich', 'hash', 'cannabis', 'weed', 'marijuana', 'cocaine', 'cocaïne',
  'heroin', 'héroïne', 'kif', 'shit', 'beuh', 'ecstasy', 'mdma', 'lsd','stupéfiants', 'produits stupéfiants', 'dealer', 'deal', 'trafic de drogue',
  'ecstasy', 'mdma', 'lsd', 'amphétamine', 'crack',
  // Services sexuels
  'prostitute', 'prostituée', 'prostituta', 'prostituierte',
  'escort', 'escorte', 'hooker','escort girl', 'massage érotique', 'massage sensuel', 'massage avec finition',
  'plan cul', 'rdv tarifé', 'rdv discret', 'prestations adultes',
  'maison close', 'bordel', 'proxénétisme', 'proxénète',
  // Faux papiers
  'fake passport', 'faux passeport', 'pasaporte falso', 'gefälschter pass',
  'fake visa', 'faux visa', 'faux papiers', 'fake document','faux documents',
  // Autres services
  'kalachnikov', 'pistolet', 'fusil', 'munition', 'arme à feu',
  'trafic d’êtres humains', 'réseau de passeurs', 'migration clandestine',
  'fraude', 'escroquerie', 'arnaque','usurpation', 'usurpation d’identité','corrompre', 'commission occulte', 'dessous-de-table'
];

// Réponse standard de refus (structure conforme au schéma JSON attendu)
const buildRefusalResponse = (lang) => {
  const messages = {
    fr: {
      analysis: "Tooristoo n'analyse pas les prix de transactions illégales ou contraires à la loi marocaine. Si vous êtes témoin d'une situation préoccupante, contactez la police locale.",
      strategy: "Tooristoo se limite aux services touristiques légaux : taxis, hébergements, restaurants, guides agréés, excursions, artisanat, spas. Pour toute urgence, composez le 19 (Police) ou le +212 524 38 46 01 (Police Touristique de Marrakech).",
    },
    en: {
      analysis: "Tooristoo does not analyze prices for illegal transactions or activities contrary to Moroccan law. If you witness a concerning situation, contact local police.",
      strategy: "Tooristoo only covers legal tourism services: taxis, accommodation, restaurants, licensed guides, excursions, crafts, spas. For emergencies, dial 19 (Police) or +212 524 38 46 01 (Marrakech Tourist Police).",
    },
    es: {
      analysis: "Tooristoo no analiza precios de transacciones ilegales o contrarias a la ley marroquí. Si presencias una situación preocupante, contacta a la policía local.",
      strategy: "Tooristoo solo cubre servicios turísticos legales: taxis, alojamiento, restaurantes, guías habilitados, excursiones, artesanía, spas. En emergencias, marca 19 (Policía) o +212 524 38 46 01 (Policía Turística de Marrakech).",
    },
    de: {
      analysis: "Tooristoo analysiert keine Preise für illegale oder gegen marokkanisches Recht verstoßende Transaktionen. Wenn Sie eine besorgniserregende Situation beobachten, kontaktieren Sie die örtliche Polizei.",
      strategy: "Tooristoo deckt nur legale Tourismusdienstleistungen ab: Taxis, Unterkünfte, Restaurants, lizenzierte Guides, Ausflüge, Kunsthandwerk, Spas. Im Notfall wählen Sie 19 (Polizei) oder +212 524 38 46 01 (Touristenpolizei Marrakesch).",
    },
    ar: {
      analysis: "لا يقوم Tooristoo بتحليل أسعار المعاملات غير القانونية أو المخالفة للقانون المغربي. إذا شاهدت موقفاً مقلقاً، اتصل بالشرطة المحلية.",
      strategy: "يقتصر Tooristoo على الخدمات السياحية القانونية: التاكسي، الإقامة، المطاعم، المرشدون المعتمدون، الرحلات، الحرف، السبا. في حالات الطوارئ، اتصل بـ 19 (الشرطة) أو +212 524 38 46 01 (شرطة السياحة بمراكش).",
    },
    darija: {
      analysis: "Tooristoo ما كيحللش الأثمان ديال المعاملات غير القانونية أو لي ضد القانون المغربي. إلا شفتي وضعية مقلقة، اتصل بالبوليس.",
      strategy: "Tooristoo كيغطي غير الخدمات السياحية القانونية: طاكسي، إقامة، مطاعم، مرشدين معتمدين، نزهات، حرف، سبا. فالطوارئ، عيط على 19 (البوليس) ولا +212 524 38 46 01 (بوليس السياحة فمراكش).",
    },
  };

  const msg = messages[lang] || messages.fr;

  return {
    price_asked: 0,
    price_estimated_min: 0,
    price_estimated_max: 0,
    risk_level: 'high',
    price_anomaly: false,
    scam_detected: false,
    ai_analysis: msg.analysis,
    recommended_phrase: '—',
    strategy: msg.strategy,
    refused: true,
  };
};

// Détection rapide côté client avant d'appeler le LLM
const containsForbiddenKeyword = (text) => {
  const lowerText = text.toLowerCase();
  return FORBIDDEN_KEYWORDS.some((kw) => lowerText.includes(kw.toLowerCase()));
};

export default function NegotiationRecorder({ category, location, onAnalysisComplete, lang }) {
  const t = useT(lang);
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [confidence, setConfidence] = useState(0);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);
  const [isSupported, setIsSupported] = useState(true);

  const recognitionRef = useRef(null);
  const finalTranscriptRef = useRef('');
  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setIsSupported(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = SPEECH_LANG_MAP[lang] || SPEECH_LANG_MAP.fr;

    recognition.onstart = () => {
      if (!isMountedRef.current) return;
      setIsRecording(true);
      setError(null);
      finalTranscriptRef.current = '';
    };

    recognition.onresult = (event) => {
      if (!isMountedRef.current) return;
      let interimTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const part = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscriptRef.current += part + ' ';
        } else {
          interimTranscript += part;
        }
      }

      const last = event.results[event.results.length - 1];
      if (last && last[0]) {
        setConfidence(last[0].confidence || 0);
      }

      const combined = finalTranscriptRef.current + interimTranscript;
      setTranscript(combined.slice(0, MAX_TRANSCRIPT_CHARS));
    };

    recognition.onerror = (event) => {
      if (!isMountedRef.current) return;
      console.error('Speech recognition error', event.error);
      setIsRecording(false);

      const errorMessages = {
        'not-allowed': getRecorderT('error_microphone_denied', lang),
        'no-speech': getRecorderT('error_no_speech', lang),
        'audio-capture': getRecorderT('error_audio_capture', lang),
        'network': getRecorderT('error_network', lang),
        'aborted': null,
      };

      const message = errorMessages[event.error];
      if (message) setError(message);
    };

    recognition.onend = () => {
      if (!isMountedRef.current) return;
      setIsRecording(false);
    };

    recognitionRef.current = recognition;

    return () => {
      try {
        if (recognitionRef.current) {
          recognitionRef.current.onstart = null;
          recognitionRef.current.onresult = null;
          recognitionRef.current.onerror = null;
          recognitionRef.current.onend = null;
          recognitionRef.current.stop();
        }
      } catch (e) {
        // ignorer les erreurs de stop sur composant déjà arrêté
      }
    };
  }, [lang]);

  const toggleRecording = useCallback(() => {
    if (!recognitionRef.current) return;

    if (isRecording) {
      try {
        recognitionRef.current.stop();
      } catch (e) {
        console.warn('Error stopping recognition', e);
      }
      setIsRecording(false);
    } else {
      finalTranscriptRef.current = '';
      setTranscript('');
      setConfidence(0);
      setError(null);
      try {
        recognitionRef.current.start();
      } catch (e) {
        console.warn('Error starting recognition', e);
        setError(getRecorderT('error_start_failed', lang));
      }
    }
  }, [isRecording, lang]);

  const copyTranscript = useCallback(async () => {
    if (!transcript) return;
    try {
      await navigator.clipboard.writeText(transcript);
      setCopied(true);
      setTimeout(() => {
        if (isMountedRef.current) setCopied(false);
      }, 2000);
    } catch (e) {
      console.warn('Clipboard error', e);
      setError(getRecorderT('error_clipboard', lang));
    }
  }, [transcript, lang]);

  const clearTranscript = useCallback(() => {
    finalTranscriptRef.current = '';
    setTranscript('');
    setConfidence(0);
    setError(null);
  }, []);

  const handleAnalyze = useCallback(async () => {
    const cleanTranscript = transcript.trim();
    if (!cleanTranscript) return;

    setIsAnalyzing(true);
    setError(null);

    // ============================================================
    // COUCHE 1 : pré-filtrage côté client par mots-clés
    // Évite l'appel LLM (et son coût) pour les cas évidents
    // ============================================================
    if (containsForbiddenKeyword(cleanTranscript)) {
      const refusal = buildRefusalResponse(lang);
      onAnalysisComplete({
        ...refusal,
        category,
        location,
        transcript: finalTranscriptRef.current.trim(),
        timestamp: new Date().toISOString(),
      });
      finalTranscriptRef.current = '';
      setTranscript('');
      setConfidence(0);
      setIsAnalyzing(false);
      return;
    }

    try {
      const responseLang = LANG_NAME_FOR_PROMPT[lang] || LANG_NAME_FOR_PROMPT.fr;

      // ============================================================
      // COUCHE 2 : garde-fous dans le prompt envoyé au LLM
      // ============================================================
      const prompt = `Tu es Tooristoo, expert en fourchettes de prix locales au Maroc. Tu aides les voyageurs à comprendre si un prix proposé est aligné avec les références locales et tu suggères une stratégie de négociation respectueuse.

CONTEXTE:
- Catégorie: ${category}
- Ville: ${location}
- Transcription de la conversation entendue: "${cleanTranscript}"

GARDE-FOUS — RÈGLES DE REFUS NON NÉGOCIABLES:
Si la transcription concerne l'une des situations suivantes, tu DOIS refuser d'analyser :
- Achat ou vente de substances illégales (drogues, cannabis, médicaments sans ordonnance)
- Services sexuels tarifés ou prostitution
- Faux documents (passeports, visas, permis, certificats)
- Contrebande, biens volés, contrefaçons (marques contrefaites, faux billets)
- Animaux protégés ou produits issus du braconnage (ivoire, peaux, espèces menacées)
- Toute transaction impliquant un mineur en situation de vulnérabilité
- Corruption d'agents publics (pots-de-vin à la police, à la douane, etc.)

Si l'un de ces cas est détecté, renvoie EXACTEMENT cette structure :
{
  "price_asked": 0,
  "price_estimated_min": 0,
  "price_estimated_max": 0,
  "risk_level": "high",
  "price_anomaly": false,
  "ai_analysis": "Tooristoo n'analyse pas les prix de transactions illégales ou contraires à la loi marocaine. Si vous êtes témoin d'une situation préoccupante, contactez la police locale.",
  "recommended_phrase": "—",
  "strategy": "Tooristoo se limite aux services touristiques légaux : taxis, hébergements, restaurants, guides agréés, excursions, artisanat, spas. Pour toute urgence, composez le 19 (Police) ou le +212 524 38 46 01 (Police Touristique de Marrakech).",
  "refused": true
}
(traduis ai_analysis et strategy en ${responseLang} si l'utilisateur n'utilise pas le français)

ANALYSE DEMANDÉE (uniquement si la transcription concerne un service touristique légal):
1. Extrais le prix exact demandé par le vendeur (en MAD si mentionné)
2. Compare ce prix à la fourchette de référence locale de PricingKnowledge pour cette catégorie et cette ville
3. Évalue le niveau d'écart par rapport à cette fourchette (low / medium / high)
4. Identifie tout indicateur de pratique commerciale problématique (price_anomaly = true si écart significatif et inhabituel)
5. Rédige une analyse pédagogique et neutre (ai_analysis), sans accusation
6. Propose UNE phrase exacte à dire au vendeur pour amorcer la négociation, en darija marocain transcrit en latin (recommended_phrase)
7. Suggère une stratégie de négociation respectueuse en 2-3 lignes (strategy)

TON: factuel, neutre, respectueux de la culture marocaine du marchandage.

INTERDICTIONS ABSOLUES DE VOCABULAIRE:
Si tu utilises l'un de ces mots dans ai_analysis ou strategy, ta réponse sera REJETÉE :
"arnaque", "arnaquer", "arnaqueur", "scam", "scammer", "scamming",
"abus", "abuser", "abusif", "abusive", "abusivement",
"tromperie", "tromper", "trompeur",
"fraude", "frauder", "frauduleux",
"estafa", "estafador", "estafador",
"Betrug", "betrügerisch", "Betrüger",
"احتيال", "نصب", "محتال", "نصاب".

À la place, utilise EXCLUSIVEMENT ces formulations :
- "écart par rapport à la fourchette de référence"
- "prix au-dessus de la fourchette habituelle"
- "tarif supérieur à la moyenne locale"
- "différence avec les tarifs courants"

EXEMPLE DE BON TON:
"Le prix demandé de 200 DH est nettement au-dessus de la fourchette de référence locale pour un transfert aéroport (70–100 DH). L'écart constaté est de 100 DH par rapport à la borne haute. Il est recommandé d'insister sur l'usage du compteur officiel ou de proposer un prix dans la fourchette de référence."

RÈGLE DE COHÉRENCE NUMÉRIQUE — INVIOLABLE:
Tu ne dois mentionner AUCUN nombre autre que :
- Le prix demandé (price_asked)
- Les bornes de la fourchette de référence (price_estimated_min et price_estimated_max)
- L'écart calculé (price_asked - price_estimated_max si positif)
- Un pourcentage d'écart si pertinent

Tu n'as PAS LE DROIT d'inventer un "seuil", "limite", "norme" ou "tarif officiel" avec un autre nombre. Si tu n'as pas la donnée, ne l'invente pas. Reste strictement dans la fourchette que tu as toi-même définie.

EXEMPLE INTERDIT:
❌ "le tarif dépasse le seuil de 40 DH" (40 DH n'existe pas dans tes données)
❌ "il faut payer maximum 50 DH" (50 DH inventé)

EXEMPLE AUTORISÉ:
✓ "le prix de 200 DH dépasse la fourchette de référence (70–100 DH) de 100 DH"
✓ "l'écart est de 100 DH par rapport à la borne haute de 100 DH"`;

      const result = await base44.integrations.Core.InvokeLLM({
        prompt,
        response_json_schema: {
          type: 'object',
          properties: {
            price_asked: { type: 'number', description: 'Prix demandé par le vendeur en MAD' },
            price_estimated_min: { type: 'number', description: 'Borne basse de la fourchette de référence' },
            price_estimated_max: { type: 'number', description: 'Borne haute de la fourchette de référence' },
            risk_level: { type: 'string', enum: ['low', 'medium', 'high'] },
            price_anomaly: { type: 'boolean', description: 'true si écart significatif et inhabituel' },
            refused: { type: 'boolean', description: 'true si la demande a été refusée pour raison éthique/légale' },
            ai_analysis: { type: 'string', description: 'Analyse pédagogique en 3-4 phrases' },
            recommended_phrase: { type: 'string', description: 'Phrase exacte à dire en darija (transcription latine)' },
            strategy: { type: 'string', description: 'Stratégie de négociation respectueuse en 2-3 lignes' },
          },
          required: ['risk_level', 'ai_analysis', 'recommended_phrase', 'strategy'],
        },
      });

      if (!isMountedRef.current) return;

      // Sanitize les sorties LLM avant affichage
      // Filet de sécurité au cas où le modèle utiliserait encore du vocabulaire interdit
      const sanitizedResult = {
        ...result,
        ai_analysis: sanitizeLLMResponse(result.ai_analysis, lang),
        strategy: sanitizeLLMResponse(result.strategy, lang),
      };

      onAnalysisComplete({
        ...sanitizedResult,
        // rétro-compat avec ancien champ scam_detected si l'UI le consomme encore
        scam_detected: sanitizedResult.price_anomaly ?? false,
        category,
        location,
        transcript: finalTranscriptRef.current.trim(),
        timestamp: new Date().toISOString(),
      });

      finalTranscriptRef.current = '';
      setTranscript('');
      setConfidence(0);
    } catch (err) {
      console.error('Analysis error:', err);
      if (isMountedRef.current) {
        setError(getRecorderT('error_analysis_failed', lang));
      }
    } finally {
      if (isMountedRef.current) {
        setIsAnalyzing(false);
      }
    }
  }, [transcript, category, location, lang, onAnalysisComplete]);

  if (!isSupported) {
    return (
      <div className="p-4 bg-yellow-950/30 border border-yellow-500/30 rounded-2xl flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" />
        <div>
          <p className="text-yellow-400 text-sm font-semibold mb-1">
            {getRecorderT('browser_not_supported_title', lang)}
          </p>
          <p className="text-yellow-400/80 text-xs leading-relaxed">
            {getRecorderT('browser_not_supported_desc', lang)}
          </p>
        </div>
      </div>
    );
  }

  const charsRemaining = MAX_TRANSCRIPT_CHARS - transcript.length;
  const showCharsWarning = charsRemaining < 200;

  return (
    <div
      className="space-y-4 p-4 bg-shield-card border border-shield-border rounded-2xl"
      role="region"
      aria-label={getRecorderT('recorder_tab', lang)}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Mic className="w-4 h-4 text-shield-green" aria-hidden="true" />
          {getRecorderT('recorder_tab', lang)}
        </h3>
        <div className="flex items-center gap-2" aria-live="polite">
          {isRecording && (
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" aria-hidden="true" />
              <span className="text-xs font-semibold text-red-400">
                {getRecorderT('recording_on', lang)}
              </span>
            </span>
          )}
          {!isRecording && (
            <span className="text-xs font-semibold text-gray-400">
              {getRecorderT('recording_off', lang)}
            </span>
          )}
          {confidence > 0 && !isRecording && (
            <span className="text-xs text-gray-500">
              {Math.round(confidence * 100)}% {getRecorderT('confidence_label', lang)}
            </span>
          )}
        </div>
      </div>

      <button
        onClick={toggleRecording}
        disabled={isAnalyzing}
        aria-pressed={isRecording}
        aria-label={isRecording ? getRecorderT('stop_recording', lang) : getRecorderT('start_recording', lang)}
        className={`w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
          isRecording
            ? 'bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-600/30'
            : 'bg-shield-green hover:bg-green-400 text-black'
        }`}
      >
        {isRecording ? (
          <>
            <MicOff className="w-5 h-5" aria-hidden="true" />
            {getRecorderT('stop_recording', lang)}
          </>
        ) : (
          <>
            <Mic className="w-5 h-5" aria-hidden="true" />
            {getRecorderT('start_recording', lang)}
          </>
        )}
      </button>

      {error && (
        <div
          role="alert"
          className="flex items-start gap-2 p-3 bg-red-950/30 border border-red-500/30 rounded-lg"
        >
          <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" aria-hidden="true" />
          <p className="text-xs text-red-400 leading-relaxed">{error}</p>
        </div>
      )}

      {transcript && (
        <div className="space-y-2">
          <div className="relative">
            <div
              className="bg-shield-dark border border-shield-border rounded-lg p-3 min-h-24 max-h-40 overflow-y-auto"
              dir={lang === 'ar' || lang === 'darija' ? 'rtl' : 'ltr'}
            >
              <p className="text-sm text-gray-300 leading-relaxed pr-10">{transcript}</p>
            </div>
            <button
              onClick={copyTranscript}
              className="absolute top-2 right-2 p-2 bg-shield-border hover:bg-shield-border/80 rounded-lg transition-all"
              title={copied ? getRecorderT('copied', lang) : getRecorderT('copy', lang)}
              aria-label={copied ? getRecorderT('copied', lang) : getRecorderT('copy', lang)}
            >
              {copied ? (
                <Check className="w-4 h-4 text-shield-green" aria-hidden="true" />
              ) : (
                <Copy className="w-4 h-4 text-gray-400" aria-hidden="true" />
              )}
            </button>
          </div>

          {showCharsWarning && (
            <p className="text-xs text-yellow-500/80">
              {getRecorderT('chars_warning', lang)}
            </p>
          )}

          <div className="flex gap-2">
            <button
              onClick={clearTranscript}
              disabled={isAnalyzing}
              className="flex items-center justify-center gap-1.5 px-3 py-2 bg-shield-border hover:bg-shield-border/80 disabled:opacity-50 text-gray-300 text-sm font-semibold rounded-lg transition-all"
              aria-label={getRecorderT('clear_transcript', lang)}
            >
              <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
              {getRecorderT('clear_transcript', lang)}
            </button>
            <button
              onClick={handleAnalyze}
              disabled={isAnalyzing || !transcript.trim() || isRecording}
              className="flex-1 px-3 py-2 bg-shield-green hover:bg-green-400 disabled:opacity-50 disabled:cursor-not-allowed text-black text-sm font-semibold rounded-lg flex items-center justify-center gap-2 transition-all"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                  {t('analyzing')}
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" aria-hidden="true" />
                  {t('analyze_btn')}
                </>
              )}
            </button>
          </div>
        </div>
      )}

      <p className="text-xs text-gray-500 text-center">
        {isRecording
          ? getRecorderT('record_help_text', lang)
          : getRecorderT('record_help_text_idle', lang)}
      </p>
    </div>
  );
}