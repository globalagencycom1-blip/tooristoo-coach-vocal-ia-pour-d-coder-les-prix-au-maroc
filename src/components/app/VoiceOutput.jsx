import React, { useState, useRef, useCallback } from 'react';
import { Volume2, VolumeX, Loader2 } from 'lucide-react';

// ─── Config audio ─────────────────────────────────────────────────────────────
// Changez cette URL quand vous migrerez vers R2 :
const AUDIO_BASE_URL = '/audio/darija';
// Future CDN : const AUDIO_BASE_URL = 'https://cdn.tooristoo.com/darija';

// ─── Config langues (votre code existant, inchangé) ──────────────────────────
const LANGUAGE_CONFIG = {
  fr:     { code: 'fr-FR', messages: { loading: 'Chargement...', stop: 'Arrêter' } },
  en:     { code: 'en-US', messages: { loading: 'Loading...',    stop: 'Stop'    } },
  es:     { code: 'es-ES', messages: { loading: 'Cargando...',   stop: 'Detener' } },
  de:     { code: 'de-DE', messages: { loading: 'Laden...',      stop: 'Stoppen' } },
  ar:     { code: 'ar-SA', messages: { loading: 'جاري التحميل...', stop: 'إيقاف' } },
  darija: { code: 'ar-MA', messages: { loading: 'كيتحمل...',    stop: 'وقف'     } },
};

// ─── Map darija → fichier MP3 ─────────────────────────────────────────────────
// Clé = texte arabe normalisé, valeur = nom du fichier dans /public/audio/darija/
const DARIJA_AUDIO_MAP = {
  // Salutations
  'السلام عليكم':                     'greetings-salam-alikoum.mp3',
  'لاباس':                            'greetings-lebess.mp3',
  'شكرا بزاف':                        'greetings-choukran-bzzaf.mp3',
  'بسلامة':                           'greetings-bslama.mp3',
  'عافاك':                            'greetings-3afak.mp3',
  'لا شكرا':                          'greetings-la-choukran.mp3',
  'واش كتهضر الفرانساوية':            'greetings-fransawiya.mp3',
  // Taxi
  'بشحال هاد الكورسة':                'taxi-combien-course.mp3',
  'دور العداد عافاك':                 'taxi-3adad.mp3',
  'غالي بزاف قول ليا الثمن الحقيقي': 'taxi-ghali-taman-haqiqi.mp3',
  'مشي هنا':                          'taxi-stop-hna.mp3',
  'كيفاش نوصل ل':                     'taxi-kifash-nwassal.mp3',
  'الثمن ديال الطاكسي للمطار كم هو':  'taxi-taman-matar.mp3',
  'رقم الطاكسي علاش':                 'taxi-raqam.mp3',
  'فين هوا الطاكسي الرسمي':           'taxi-rasmi.mp3',
  // Marché
  'بشحال هادا':                       'market-bshhal-hada.mp3',
  'غالي قلل شوية':                    'market-ghali-qallel.mp3',
  'نعطيك درهم':                       'market-n3tik-dirhams.mp3',
  'آخر ثمن':                          'market-akher-taman.mp3',
  'ماشي محتاج مرشد شكرا':             'market-no-guide.mp3',
  'غير كنشوف ماشي شاري دابا':         'market-just-looking.mp3',
  'كيتصنع هنا':                       'market-made-here.mp3',
  'واش هاد الصنعة مغربية':            'market-maghribiya.mp3',
  'بغيت نقارن الأثمان أولا':          'market-compare-prices.mp3',
  'بغيت تمن عادل':                    'market-fair-price.mp3',
  // Restaurant
  'فين المينو عافاك':                 'resto-menu.mp3',
  'واش الأثمان كتاكلو فيها':          'resto-prix-inclus.mp3',
  'الحساب عافاك':                     'resto-l7sab.mp3',
  'واش الخدمة داخلة':                 'resto-service.mp3',
  'بلا لحم عافاك':                    'resto-bla-l7am.mp3',
  // Hôtel
  'بشحال الليلة':                     'hotel-bshhal-lila.mp3',
  'واش الفطور داخل':                  'hotel-ftor.mp3',
  'عندك بيت أرخص':                    'hotel-arkhas.mp3',
  'متى خروج':                         'hotel-checkout.mp3',
  // Négociation
  'هاد الثمن غالي على البراني':       'nego-barani.mp3',
  'عرفت الثمن الحقيقي':               'nego-3raft-taman.mp3',
  'إلا ما كادرتيش رانا غاديين':       'nego-ghadyin.mp3',
  'شفت هاد الشي بثمن أقل عند جيراني':'nego-jirani.mp3',
  'ديرها ب ونجي معاك':                'nego-dir-b.mp3',
  'هاد السعر مزيان ليا':              'nego-mzyan.mp3',
  'ما عنديش الصرف':                   'nego-sarf.mp3',
  'كاين التوصيل':                     'nego-twassil.mp3',
  'كنجيب معايا بزاف ديال السياح':     'nego-siyah.mp3',
  'الثمن ديال tooristoo يقول':         'nego-tooristoo-price.mp3',
  'واش كتعطي فاتورة':                 'nego-fatoura.mp3',
  // Urgences
  'عيط عليا للبوليس':                 'emergency-police.mp3',
  'محتاج طبيب':                       'emergency-tbib.mp3',
  'سرقوني':                           'emergency-sraqouni.mp3',
  'فين السفارة ديال':                 'emergency-sfara.mp3',
  'محتاج مساعدة':                     'emergency-msa3da.mp3',
};

// ─── Normalisation de la clé de lookup ───────────────────────────────────────
function normalizeDarija(text) {
  if (!text) return '';
  return text
    .trim()
    .replace(/\s+/g, ' ')
    .replace(/[،,\.؟?!]/g, '')
    .replace(/[\u064B-\u065F]/g, '')
    .toLowerCase();
}

// ─── Composant ────────────────────────────────────────────────────────────────
/**
 * VoiceOutput
 *
 * Props :
 *   text      {string}  — texte darija à lire (arabe)
 *   lang      {string}  — langue UI pour les labels ('fr' | 'en' | 'es' | 'de' | 'ar' | 'darija')
 *   label     {string}  — label du bouton au repos
 *   size      {string}  — 'sm' (icône seule, discret) | 'md' (bouton plein, votre style actuel)
 *   className {string}  — classes CSS additionnelles
 *
 * Comportement :
 *   1. Cherche le MP3 pré-enregistré dans DARIJA_AUDIO_MAP
 *   2. Si trouvé → lit le MP3 (voix marocaine authentique)
 *   3. Si absent ou erreur → fallback TTS navigateur en ar-MA
 */
export default function VoiceOutput({ text, lang = 'fr', label = 'Écouter', size = 'md', className = '' }) {
  const [status, setStatus] = useState('idle'); // idle | loading | playing | error
  const audioRef = useRef(null);
  const mp3Preloaded = useRef(false);

  const cfg = LANGUAGE_CONFIG[lang] || LANGUAGE_CONFIG.fr;

  // ── Lookup du fichier MP3 ──
  const getMp3 = useCallback(() => {
    const key = normalizeDarija(text);
    return DARIJA_AUDIO_MAP[key] || null;
  }, [text]);

  // ── Préchargement au survol ──
  const handleMouseEnter = useCallback(() => {
    if (mp3Preloaded.current) return;
    const filename = getMp3();
    if (!filename) return;
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'audio';
    link.href = `${AUDIO_BASE_URL}/${filename}`;
    document.head.appendChild(link);
    mp3Preloaded.current = true;
  }, [getMp3]);

  // ── Lecture MP3 ──
  const playMp3 = useCallback((filename) => {
    return new Promise((resolve, reject) => {
      const audio = new Audio(`${AUDIO_BASE_URL}/${filename}`);
      audioRef.current = audio;
      audio.onplay  = () => setStatus('playing');
      audio.onended = () => { setStatus('idle'); resolve(); };
      audio.onerror = () => reject(new Error('mp3_failed'));
      audio.play().catch(reject);
    });
  }, []);

  // ── Fallback TTS ──
  const playTTS = useCallback((darijaText) => {
    return new Promise((resolve, reject) => {
      if (!window.speechSynthesis) { reject(new Error('no_tts')); return; }
      window.speechSynthesis.cancel();
      const utt = new SpeechSynthesisUtterance(darijaText);
      utt.lang = 'ar-MA';
      utt.rate = 0.9;
      utt.pitch = 1;
      utt.volume = 1;
      const voices = window.speechSynthesis.getVoices();
      const voice = voices.find(v => v.lang === 'ar-MA') || voices.find(v => v.lang.startsWith('ar'));
      if (voice) utt.voice = voice;
      utt.onstart = () => setStatus('playing');
      utt.onend   = () => { setStatus('idle'); resolve(); };
      utt.onerror = reject;
      window.speechSynthesis.speak(utt);
    });
  }, []);

  // ── Handler principal ──
  const handleClick = useCallback(async () => {
    // Stop si déjà en lecture
    if (status === 'playing') {
      audioRef.current?.pause();
      window.speechSynthesis?.cancel();
      setStatus('idle');
      return;
    }

    setStatus('loading');

    try {
      const filename = getMp3();
      if (filename) {
        await playMp3(filename);
      } else {
        await playTTS(text);
      }
    } catch {
      // Double fallback : MP3 échoue → TTS
      try {
        await playTTS(text);
      } catch {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 2000);
      }
    }
  }, [status, getMp3, playMp3, playTTS, text]);

  const isLoading  = status === 'loading';
  const isSpeaking = status === 'playing';

  // ── Mode "sm" : icône discrète (phrasebook inline) ──
  if (size === 'sm') {
    return (
      <button
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        className={`flex-shrink-0 p-2 rounded-lg transition-all
          ${isSpeaking
            ? 'text-shield-green bg-shield-green/10'
            : 'text-gray-400 hover:text-white bg-shield-border/50 hover:bg-shield-border opacity-0 group-hover:opacity-100'
          } ${className}`}
        title={isSpeaking ? cfg.messages.stop : label}
        aria-label={isSpeaking ? cfg.messages.stop : label}
      >
        {isLoading
          ? <Loader2 className="w-4 h-4 animate-spin" />
          : isSpeaking
            ? <VolumeX className="w-4 h-4" />
            : <Volume2 className="w-4 h-4" />
        }
      </button>
    );
  }

  // ── Mode "md" : bouton plein (votre style doré/vert existant) ──
  return (
    <button
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      disabled={isLoading}
      className={`inline-flex items-center gap-2 px-4 py-3 rounded-xl font-bold transition-all text-sm
        ${isSpeaking
          ? 'bg-shield-green text-black shadow-lg scale-95'
          : 'bg-shield-gold text-black hover:bg-yellow-400 hover:scale-105 shadow-md'
        } disabled:opacity-50 ${className}`}
      title={isSpeaking ? cfg.messages.stop : label}
    >
      {isLoading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>{cfg.messages.loading}</span>
        </>
      ) : isSpeaking ? (
        <>
          <VolumeX className="w-4 h-4" />
          <span>{cfg.messages.stop}</span>
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