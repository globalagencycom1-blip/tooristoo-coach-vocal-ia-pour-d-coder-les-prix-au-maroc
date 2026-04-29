import React, { useState } from 'react';
import { Loader2, MessageCircle, Zap, ChevronDown, ChevronUp } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { useT } from '../../lib/i18n';

const CONTINUE_LABELS = {
  fr: {
    title: 'CONTINUER LA NÉGOCIATION',
    placeholder: 'Ex: Le vendeur demande maintenant 250 DH...',
    label: 'Nouvelle situation ou contre-offre du vendeur',
    btn: 'Obtenir une réponse',
    analyzing: 'Analyse en cours...',
    vendor_says: 'Le vendeur dit :',
    your_reply: 'Votre réponse :',
    show: 'Continuer la négociation',
    hide: 'Masquer',
  },
  en: {
    title: 'CONTINUE NEGOTIATION',
    placeholder: 'E.g: The vendor now asks 250 DH...',
    label: 'New situation or vendor counter-offer',
    btn: 'Get a reply',
    analyzing: 'Analyzing...',
    vendor_says: 'Vendor says:',
    your_reply: 'Your reply:',
    show: 'Continue negotiation',
    hide: 'Hide',
  },
  es: {
    title: 'CONTINUAR NEGOCIACIÓN',
    placeholder: 'Ej: El vendedor ahora pide 250 DH...',
    label: 'Nueva situación o contraoferta del vendedor',
    btn: 'Obtener respuesta',
    analyzing: 'Analizando...',
    vendor_says: 'El vendedor dice:',
    your_reply: 'Tu respuesta:',
    show: 'Continuar negociación',
    hide: 'Ocultar',
  },
  de: {
    title: 'VERHANDLUNG FORTSETZEN',
    placeholder: 'Bsp: Der Händler fordert jetzt 250 DH...',
    label: 'Neue Situation oder Gegenangebot des Händlers',
    btn: 'Antwort erhalten',
    analyzing: 'Analysiere...',
    vendor_says: 'Händler sagt:',
    your_reply: 'Ihre Antwort:',
    show: 'Verhandlung fortsetzen',
    hide: 'Ausblenden',
  },
  ar: {
    title: 'متابعة التفاوض',
    placeholder: 'مثال: البائع يطلب الآن 250 درهم...',
    label: 'الوضعية الجديدة أو عرض البائع المضاد',
    btn: 'احصل على رد',
    analyzing: 'جاري التحليل...',
    vendor_says: 'البائع يقول:',
    your_reply: 'ردك:',
    show: 'متابعة التفاوض',
    hide: 'إخفاء',
  },
  darija: {
    title: 'كمل المفاوضة',
    placeholder: 'مثال: البائع دابا كيطلب 250 درهم...',
    label: 'الوضعية الجديدة أو العرض ديال البائع',
    btn: 'جيب جواب',
    analyzing: 'كيتحلل...',
    vendor_says: 'البائع كيقول:',
    your_reply: 'جوابك:',
    show: 'كمل المفاوضة',
    hide: 'خبي',
  },
};

export default function NegotiationContinue({ analysis, lang }) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [reply, setReply] = useState(null);

  const l = CONTINUE_LABELS[lang] || CONTINUE_LABELS['fr'];
  const isRTL = lang === 'ar' || lang === 'darija';
  const langLabel = lang === 'en' ? 'English' : lang === 'es' ? 'Español' : lang === 'de' ? 'Deutsch' : lang === 'ar' ? 'arabe (caractères arabes)' : lang === 'darija' ? 'Darija (caractères arabes)' : 'Français';

  const handleContinue = async () => {
    if (!input.trim()) return;
    setIsAnalyzing(true);
    setReply(null);

    const prompt = `Tu es NegoShield AI, expert en négociation touristique au Maroc.

Contexte de la négociation initiale :
- Catégorie : ${analysis.category}
- Ville : ${analysis.location}
- Prix initialement demandé : ${analysis.price_asked} DH
- Fourchette prix estimé : ${analysis.price_estimated_min}–${analysis.price_estimated_max} DH
- Niveau de risque : ${analysis.risk_level}

Nouvelle situation / contre-offre du vendeur :
"${input}"

Génère une réponse EXACTE et ASSERTIVE en ${langLabel} que le client peut dire directement au vendeur pour continuer la négociation et obtenir un meilleur prix. 
IMPORTANT : Utilise TOUJOURS "DH" (jamais "MAD") dans la réponse.
La réponse doit être courte, directe, culturellement adaptée au Maroc.`;

    const result = await base44.integrations.Core.InvokeLLM({
      prompt,
      response_json_schema: {
        type: 'object',
        properties: {
          reply_phrase: { type: 'string' },
        }
      }
    });

    setReply(result.reply_phrase);
    setIsAnalyzing(false);
  };

  return (
    <div className="bg-shield-card border border-shield-border rounded-2xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-4 text-left"
      >
        <div className="flex items-center gap-2">
          <MessageCircle className="w-4 h-4 text-shield-green" />
          <span className="text-xs font-bold text-shield-green uppercase tracking-wider">{l.title}</span>
        </div>
        {open ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
      </button>

      {open && (
        <div className="px-4 pb-4 space-y-3 border-t border-shield-border pt-3">
          <div>
            <label className="text-xs text-gray-400 mb-1.5 block">{l.label}</label>
            <textarea
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder={l.placeholder}
              rows={3}
              dir={isRTL ? 'rtl' : 'ltr'}
              className="w-full bg-shield-dark border border-shield-border text-white rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-shield-green placeholder-gray-600 resize-none"
            />
          </div>

          <button
            onClick={handleContinue}
            disabled={isAnalyzing || !input.trim()}
            className="w-full py-2.5 bg-shield-green text-black font-bold rounded-xl hover:bg-green-400 transition-all flex items-center justify-center gap-2 disabled:opacity-50 text-sm"
          >
            {isAnalyzing ? (
              <><Loader2 className="w-4 h-4 animate-spin" />{l.analyzing}</>
            ) : (
              <><Zap className="w-4 h-4" />{l.btn}</>
            )}
          </button>

          {reply && (
            <div className="bg-shield-green/10 border border-shield-green/30 rounded-xl p-4">
              <p className="text-xs text-shield-green font-semibold mb-2">{l.your_reply}</p>
              <p
                className="text-sm text-gray-200 leading-relaxed italic font-medium"
                dir={isRTL ? 'rtl' : 'ltr'}
              >
                "{reply}"
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}