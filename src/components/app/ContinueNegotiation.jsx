import React, { useState } from 'react';
import { MessageCircle, Loader2, ChevronDown, ChevronUp } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { useT } from '../../lib/i18n';

const CONTINUE_LABELS = {
  fr: { title: 'CONTINUER LA NÉGOCIATION', placeholder: 'Ex: Il a refusé et propose 450 DH, que faire ?', btn: 'Obtenir conseil', loading: 'Analyse...', new_advice: 'Nouveau conseil IA', collapse: 'Masquer' },
  en: { title: 'CONTINUE NEGOTIATION', placeholder: 'Ex: He refused and offers 450 DH, what to do?', btn: 'Get advice', loading: 'Analyzing...', new_advice: 'New AI advice', collapse: 'Hide' },
  es: { title: 'CONTINUAR NEGOCIACIÓN', placeholder: 'Ej: Rechazó y ofrece 450 DH, ¿qué hacer?', btn: 'Obtener consejo', loading: 'Analizando...', new_advice: 'Nuevo consejo IA', collapse: 'Ocultar' },
  de: { title: 'VERHANDLUNG FORTSETZEN', placeholder: 'z.B.: Er lehnte ab und bietet 450 DH, was tun?', btn: 'Rat holen', loading: 'Analysiere...', new_advice: 'Neuer KI-Rat', collapse: 'Ausblenden' },
  ar: { title: 'متابعة التفاوض', placeholder: 'مثال: رفض وعرض 450 درهم، ماذا أفعل؟', btn: 'احصل على نصيحة', loading: 'جاري التحليل...', new_advice: 'نصيحة جديدة', collapse: 'إخفاء' },
  darija: { title: 'كمل المفاوضة', placeholder: 'مثال: رفض وعرض 450 درهم، أشنو ندير؟', btn: 'احصل على نصيحة', loading: 'كيتحلل...', new_advice: 'نصيحة جديدة', collapse: 'خبي' },
};

export default function ContinueNegotiation({ analysis, lang }) {
  const t = useT(lang);
  const labels = CONTINUE_LABELS[lang] || CONTINUE_LABELS.fr;
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [advice, setAdvice] = useState(null);

  const isRTL = ['ar', 'darija'].includes(lang);

  const handleGetAdvice = async () => {
    if (!input.trim()) return;
    setIsLoading(true);
    setAdvice(null);

    const langName = { fr: 'Français', en: 'English', es: 'Español', de: 'Deutsch', ar: 'Arabe', darija: 'Darija marocaine' }[lang] || 'Français';

    const prompt = `Tu es NegoShield AI, expert en négociation au Maroc.

Contexte de la négociation initiale:
- Catégorie: ${analysis.category}
- Ville: ${analysis.location}
- Prix demandé initialement: ${analysis.price_asked} DH
- Prix réel estimé: ${analysis.price_estimated_min}–${analysis.price_estimated_max} DH
- Situation: ${analysis.transcript}

Nouvelle situation de l'utilisateur: ${input}

Donne un conseil de négociation adapté en ${langName}. 
IMPORTANT: Utilise TOUJOURS "DH" (jamais "MAD") pour les prix.
Réponds avec:
- next_phrase: phrase exacte à dire maintenant en ${langName} (caractères arabes si arabe/darija)
- next_strategy: conseil court et actionnable en ${langName} (2-3 phrases max)
- next_phrase_darija: la phrase en Darija marocaine en caractères arabes uniquement`;

    const result = await base44.integrations.Core.InvokeLLM({
      prompt,
      response_json_schema: {
        type: 'object',
        properties: {
          next_phrase: { type: 'string' },
          next_strategy: { type: 'string' },
          next_phrase_darija: { type: 'string' },
        }
      }
    });

    setAdvice(result);
    setIsLoading(false);
    setInput('');
  };

  return (
    <div className="bg-shield-card border border-shield-green/30 rounded-2xl p-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between"
      >
        <div className="flex items-center gap-2">
          <MessageCircle className="w-4 h-4 text-shield-green" />
          <h3 className="text-xs font-bold text-shield-green uppercase tracking-wider">{labels.title}</h3>
        </div>
        {isOpen ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
      </button>

      {isOpen && (
        <div className="mt-4 space-y-3">
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder={labels.placeholder}
            rows={3}
            dir={isRTL ? 'rtl' : 'ltr'}
            className="w-full bg-shield-dark border border-shield-border text-white rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-shield-green resize-none placeholder-gray-600"
          />
          <button
            onClick={handleGetAdvice}
            disabled={isLoading || !input.trim()}
            className="w-full py-2.5 bg-shield-green text-black font-bold rounded-xl hover:bg-green-400 transition-all flex items-center justify-center gap-2 disabled:opacity-50 text-sm"
          >
            {isLoading ? (
              <><Loader2 className="w-4 h-4 animate-spin" />{labels.loading}</>
            ) : (
              <><MessageCircle className="w-4 h-4" />{labels.btn}</>
            )}
          </button>

          {advice && (
            <div className="space-y-3 pt-2 border-t border-shield-border">
              <p className="text-xs font-bold text-shield-green uppercase tracking-wider">{labels.new_advice}</p>

              {advice.next_strategy && (
                <p className="text-xs text-gray-300 leading-relaxed">{advice.next_strategy}</p>
              )}

              {advice.next_phrase && (
                <div className={`relative ${isRTL ? 'pr-6 text-right' : 'pl-6'}`}>
                  <span className={`absolute ${isRTL ? 'right-0' : 'left-0'} top-0 text-3xl text-shield-green/30 font-serif leading-none`}>"</span>
                  <p className="text-sm text-gray-200 leading-relaxed italic" dir={isRTL ? 'rtl' : 'ltr'}>
                    {isRTL ? `"${advice.next_phrase}` : `${advice.next_phrase}"`}
                  </p>
                </div>
              )}

              {advice.next_phrase_darija && !isRTL && (
                <div className="pt-2 border-t border-shield-border">
                  <span className="text-xs text-shield-gold font-semibold">🇲🇦 {t('in_darija')} </span>
                  <p className="text-xs text-gray-300 italic mt-1" dir="rtl">"{advice.next_phrase_darija}"</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}