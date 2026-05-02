import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Mic, Square, Zap, Volume2, Shield, ArrowRight } from 'lucide-react';
import { useT } from '../../lib/i18n';

const STEPS = {
  fr: ['Parlez la situation', 'IA analyse en temps réel', 'Obtenez la phrase exacte à dire'],
  en: ['Describe the situation', 'AI analyzes in real time', 'Get the exact phrase to say'],
  es: ['Describe la situación', 'IA analiza en tiempo real', 'Obtén la frase exacta'],
  de: ['Situation beschreiben', 'KI analysiert in Echtzeit', 'Genaue Phrase erhalten'],
  ar: ['صِف الوضع بصوتك', 'الذكاء الاصطناعي يحلل فوراً', 'احصل على العبارة المثالية'],
  darija: ['وصف الوضع بصوتك', 'الذكاء الاصطناعي كيحلل فوراً', 'احصل على العبارة الكاملة'],
};

const DEMO_TEXTS = {
  fr: '"Le taxi demande 300 MAD pour l\'aéroport..."',
  en: '"The taxi is asking 300 MAD for the airport..."',
  es: '"El taxi pide 300 MAD al aeropuerto..."',
  de: '"Das Taxi verlangt 300 MAD zum Flughafen..."',
  ar: '"التاكسي يطلب 300 درهم للمطار..."',
  darija: '"التاكسي كيطلب 300 درهم للمطار..."',
};

const RESULT_TEXTS = {
  fr: '"Bonjour, le prix normal est 120-150 MAD. Si c\'est possible, on y va."',
  en: '"Hello, the normal price is 120-150 MAD. If that works, let\'s go."',
  es: '"Hola, el precio normal es 120-150 MAD. Si está bien, vamos."',
  de: '"Hallo, der Normalpreis ist 120-150 MAD. Wenn das passt, fahren wir."',
  ar: '"السلام، السعر العادي بين 120 و150 درهم. إذا كان مناسباً، نذهب."',
  darija: '"سلام، التمن العادي بين 120 و150 درهم. إلا كان مزيان، نمشيو."',
};

export default function VoiceHeroSection({ lang = 'fr' }) {
  const t = useT(lang);
  const [phase, setPhase] = useState('idle'); // idle | listening | analyzing | result
  const timerRef = useRef(null);

  const steps = STEPS[lang] || STEPS.fr;
  const demoText = DEMO_TEXTS[lang] || DEMO_TEXTS.fr;
  const resultText = RESULT_TEXTS[lang] || RESULT_TEXTS.fr;

  const handleDemo = () => {
    if (phase !== 'idle') {
      setPhase('idle');
      clearTimeout(timerRef.current);
      return;
    }
    setPhase('listening');
    timerRef.current = setTimeout(() => {
      setPhase('analyzing');
      timerRef.current = setTimeout(() => {
        setPhase('result');
        timerRef.current = setTimeout(() => setPhase('idle'), 5000);
      }, 2000);
    }, 2500);
  };

  useEffect(() => () => clearTimeout(timerRef.current), []);

  return (
    <section className="py-20 bg-shield-dark relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #22c55e 0%, transparent 70%)' }} />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-shield-green/10 border border-shield-green/30 rounded-full text-shield-green text-sm font-semibold mb-5">
            <Mic className="w-4 h-4" />
            {lang === 'fr' ? 'Technologie Vocale IA' :
             lang === 'en' ? 'AI Voice Technology' :
             lang === 'es' ? 'Tecnología de Voz IA' :
             lang === 'de' ? 'KI-Sprachtechnologie' :
             lang === 'ar' ? 'تقنية الصوت بالذكاء الاصطناعي' :
             'تكنولوجيا الصوت بالذكاء الاصطناعي'}
          </div>
          <h2 className="font-poppins font-black text-4xl md:text-5xl text-white mb-4 leading-tight">
            {lang === 'fr' ? <>🎙️ Parlez, <span className="text-gradient-green">on négocie</span></> :
             lang === 'en' ? <>🎙️ Speak, <span className="text-gradient-green">we negotiate</span></> :
             lang === 'es' ? <>🎙️ Habla, <span className="text-gradient-green">negociamos</span></> :
             lang === 'de' ? <>🎙️ Sprechen Sie, <span className="text-gradient-green">wir verhandeln</span></> :
             lang === 'ar' ? <>🎙️ تكلّم، <span className="text-gradient-green">نحن نتفاوض</span></> :
             <>🎙️ هضر، <span className="text-gradient-green">نحن نتفاوض</span></>}
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            {lang === 'fr' ? 'Décrivez vocalement la situation, notre IA analyse et vous donne la phrase exacte à prononcer pour obtenir le juste prix.' :
             lang === 'en' ? 'Describe the situation by voice, our AI analyzes and gives you the exact phrase to say for a fair price.' :
             lang === 'es' ? 'Describe la situación por voz, nuestra IA analiza y te da la frase exacta para obtener el precio justo.' :
             lang === 'de' ? 'Beschreiben Sie die Situation, unsere KI analysiert und gibt Ihnen die genaue Phrase für einen fairen Preis.' :
             lang === 'ar' ? 'صِف الوضع بصوتك، يحلل ذكاؤنا الاصطناعي ويعطيك العبارة الدقيقة للحصول على السعر العادل.' :
             'وصف الوضع بصوتك، الذكاء الاصطناعي كيحلل وكيعطيك العبارة الدقيقة باش تحصل على السعر العادل.'}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* LEFT: Interactive demo */}
          <div className="flex flex-col items-center">
            {/* Big mic button */}
            <div className="relative mb-8 cursor-pointer" onClick={handleDemo}>
              {/* Outer rings */}
              {phase === 'listening' && (
                <>
                  <div className="absolute inset-0 rounded-full bg-shield-green/15 scale-[2.2] animate-ping opacity-30" />
                  <div className="absolute inset-0 rounded-full bg-shield-green/10 scale-[1.7] animate-ping opacity-40" style={{ animationDelay: '0.3s' }} />
                  <div className="absolute inset-0 rounded-full bg-shield-green/20 scale-[1.4] pulse-ring" />
                </>
              )}
              {phase === 'analyzing' && (
                <div className="absolute inset-0 rounded-full bg-shield-gold/20 scale-[1.5] pulse-ring" />
              )}
              {phase === 'result' && (
                <div className="absolute inset-0 rounded-full bg-shield-green/30 scale-[1.4] animate-ping opacity-50" />
              )}

              <div className={`relative w-40 h-40 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 ${
                phase === 'listening' ? 'bg-gradient-to-br from-red-500 to-red-600 scale-105' :
                phase === 'analyzing' ? 'bg-gradient-to-br from-shield-gold to-yellow-500' :
                phase === 'result' ? 'bg-gradient-to-br from-shield-green to-green-400 scale-105' :
                'bg-gradient-to-br from-shield-green to-green-600 hover:scale-105 btn-glow'
              }`}>
                {phase === 'listening' ? (
                  <Square className="w-14 h-14 text-white" />
                ) : phase === 'analyzing' ? (
                  <Zap className="w-14 h-14 text-black animate-pulse" />
                ) : phase === 'result' ? (
                  <Volume2 className="w-14 h-14 text-black" />
                ) : (
                  <Mic className="w-16 h-16 text-black" />
                )}
              </div>
            </div>

            {/* Wave bars */}
            {phase === 'listening' && (
              <div className="flex items-center gap-1.5 h-12 mb-4">
                {Array(16).fill(0).map((_, i) => (
                  <div
                    key={i}
                    className="w-1.5 bg-shield-green rounded-full wave-animation"
                    style={{ height: `${Math.random() * 36 + 12}px`, animationDelay: `${i * 0.08}s` }}
                  />
                ))}
              </div>
            )}

            {/* Status text */}
            <div className="text-center mb-6 h-14">
              {phase === 'idle' && (
                <div>
                  <p className="text-white font-bold text-lg">
                    {lang === 'fr' ? '▶ Voir la démo' : lang === 'en' ? '▶ See demo' : lang === 'es' ? '▶ Ver demo' : lang === 'de' ? '▶ Demo ansehen' : '▶ مشاهدة العرض'}
                  </p>
                  <p className="text-gray-500 text-sm mt-1">
                    {lang === 'fr' ? 'Cliquez sur le micro' : lang === 'en' ? 'Click the mic' : lang === 'es' ? 'Haz clic en el mic' : lang === 'de' ? 'Mikro klicken' : 'انقر على الميكروفون'}
                  </p>
                </div>
              )}
              {phase === 'listening' && (
                <div>
                  <p className="text-white font-bold text-lg animate-pulse">
                    {lang === 'fr' ? '🔴 Écoute en cours...' : lang === 'en' ? '🔴 Listening...' : lang === 'es' ? '🔴 Escuchando...' : lang === 'de' ? '🔴 Zuhören...' : '🔴 جارٍ الاستماع...'}
                  </p>
                  <p className="text-shield-green text-sm mt-1 italic">{demoText}</p>
                </div>
              )}
              {phase === 'analyzing' && (
                <div>
                  <p className="text-shield-gold font-bold text-lg">
                    {lang === 'fr' ? '⚡ Analyse IA...' : lang === 'en' ? '⚡ AI analyzing...' : lang === 'es' ? '⚡ IA analizando...' : lang === 'de' ? '⚡ KI analysiert...' : '⚡ الذكاء الاصطناعي يحلل...'}
                  </p>
                  <div className="flex justify-center gap-1 mt-2">
                    {[0,1,2].map(i => (
                      <div key={i} className="w-2 h-2 bg-shield-gold rounded-full animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                    ))}
                  </div>
                </div>
              )}
              {phase === 'result' && (
                <div>
                  <p className="text-shield-green font-bold text-lg">
                    {lang === 'fr' ? '✅ Phrase prête !' : lang === 'en' ? '✅ Phrase ready!' : lang === 'es' ? '✅ ¡Frase lista!' : lang === 'de' ? '✅ Phrase bereit!' : '✅ العبارة جاهزة!'}
                  </p>
                </div>
              )}
            </div>

            {/* Result box */}
            {phase === 'result' && (
              <div className="w-full max-w-sm bg-shield-card border border-shield-green/50 rounded-2xl p-5 card-glow">
                <div className="flex items-center gap-2 mb-3">
                  <Volume2 className="w-4 h-4 text-shield-green" />
                  <span className="text-xs font-bold text-shield-green uppercase tracking-wider">
                    {lang === 'fr' ? 'Dites exactement' : lang === 'en' ? 'Say exactly' : lang === 'es' ? 'Diga exactamente' : lang === 'de' ? 'Sagen Sie genau' : 'قل بالضبط'}
                  </span>
                  <span className="ml-auto text-xs bg-shield-green/20 text-shield-green px-2 py-0.5 rounded-full font-semibold">-150 MAD</span>
                </div>
                <p className="text-white text-sm leading-relaxed font-medium italic">{resultText}</p>
                <div className="mt-3 pt-3 border-t border-shield-border flex items-center gap-2">
                  <span className="text-xs text-shield-gold font-semibold">🇲🇦 Darija :</span>
                  <span className="text-xs text-gray-300" dir="rtl">سلام، التمن ديال هاد الكورس بين 120 و150 درهم.</span>
                </div>
              </div>
            )}
          </div>

          {/* RIGHT: Steps + CTA */}
          <div className="space-y-6">
            {/* How it works steps */}
            <div className="space-y-4">
              {steps.map((step, i) => (
                <div key={i} className={`flex items-center gap-5 p-5 rounded-2xl border transition-all ${
                  (phase === 'listening' && i === 0) || (phase === 'analyzing' && i === 1) || (phase === 'result' && i === 2)
                    ? 'bg-shield-green/10 border-shield-green/50 scale-[1.02]'
                    : 'bg-shield-card border-shield-border'
                }`}>
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 font-poppins font-black text-xl transition-all ${
                    (phase === 'listening' && i === 0) || (phase === 'analyzing' && i === 1) || (phase === 'result' && i === 2)
                      ? 'bg-shield-green text-black scale-110'
                      : 'bg-shield-border text-gray-400'
                  }`}>
                    {i === 0 ? <Mic className="w-5 h-5" /> : i === 1 ? <Zap className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                  </div>
                  <div>
                    <p className={`font-semibold text-sm ${
                      (phase === 'listening' && i === 0) || (phase === 'analyzing' && i === 1) || (phase === 'result' && i === 2)
                        ? 'text-white' : 'text-gray-300'
                    }`}>{step}</p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {i === 0 ? (lang === 'fr' ? 'En français, arabe, darija...' : lang === 'en' ? 'In any language...' : lang === 'es' ? 'En cualquier idioma...' : lang === 'de' ? 'In jeder Sprache...' : 'بأي لغة...') :
                       i === 1 ? (lang === 'fr' ? 'Prix marché, arnaque détectée' : lang === 'en' ? 'Market price, scam detected' : lang === 'es' ? 'Precio de mercado, estafa detectada' : lang === 'de' ? 'Marktpreis, Betrug erkannt' : 'سعر السوق، احتيال مكتشف') :
                       (lang === 'fr' ? 'Phrase en français + Darija' : lang === 'en' ? 'Phrase in English + Darija' : lang === 'es' ? 'Frase en español + Darija' : lang === 'de' ? 'Phrase auf Deutsch + Darija' : 'عبارة بالعربية + الدارجة')}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Stats highlight */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { val: '< 3s', label: lang === 'fr' ? 'Analyse' : lang === 'en' ? 'Analysis' : lang === 'de' ? 'Analyse' : 'تحليل' },
                { val: '6', label: lang === 'fr' ? 'Langues' : lang === 'en' ? 'Languages' : lang === 'de' ? 'Sprachen' : 'لغات' },
                { val: '98%', label: lang === 'fr' ? 'Précision' : lang === 'en' ? 'Accuracy' : lang === 'de' ? 'Genauigkeit' : 'دقة' },
              ].map((s, i) => (
                <div key={i} className="bg-shield-card border border-shield-border rounded-xl p-3 text-center">
                  <div className="font-poppins font-black text-xl text-shield-green">{s.val}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <a
              href="/#pricing"
              className="flex items-center justify-center gap-3 w-full py-5 bg-shield-green text-black font-bold text-lg rounded-2xl hover:bg-green-400 transition-all btn-glow group"
            >
              {lang === 'fr' ? 'Voir les plans' :
               lang === 'en' ? 'See plans' :
               lang === 'es' ? 'Ver planes' :
               lang === 'de' ? 'Pläne anzeigen' :
               lang === 'ar' ? 'عرض الخطط' :
               'شوف الفورمولات'}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <p className="text-center text-xs text-gray-600">
              {lang === 'fr' ? '🔒 100% gratuit · Aucune inscription requise' :
               lang === 'en' ? '🔒 100% free · No registration required' :
               lang === 'es' ? '🔒 100% gratuito · Sin registro' :
               lang === 'de' ? '🔒 100% kostenlos · Keine Registrierung' :
               '🔒 100% مجاني · لا تسجيل مطلوب'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}