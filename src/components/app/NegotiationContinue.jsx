import React, { useState } from 'react';
import { Loader2, MessageCircle, Zap, ChevronDown, ChevronUp } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { useT } from '../../lib/i18n';
import VoiceOutput from './VoiceOutput';

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

CONTEXTE DE LA NÉGOCIATION :
- Catégorie de service : ${analysis.category}
- Ville : ${analysis.location}
- Prix initialement demandé par le vendeur : ${analysis.price_asked} DH
- Fourchette de prix RÉELS du marché local : ${analysis.price_estimated_min}–${analysis.price_estimated_max} DH
- Niveau de risque arnaquede vigilance tarifaire : ${analysis.risk_level}
- Stratégie initiale : ${analysis.strategy || ''}

NOUVELLE SITUATION / CONTRE-OFFRE DU VENDEUR :
"${input}"

RÈGLES ABSOLUES pour générer la réponse :
1. Le CLIENT veut PAYER MOINS. La réponse doit TOUJOURS proposer un prix INFÉRIEUR à ce que demande le vendeur.
2. Si le vendeur demande X DH, proposer entre ${analysis.price_estimated_min} et ${analysis.price_estimated_max} DH (fourchette marché réel).
3. Si le vendeur a déjà baissé son prix, reconnaître l'effort mais proposer encore moins.
4. Ne JAMAIS proposer un prix SUPÉRIEUR à ce que demande le vendeur — c'est une ERREUR GRAVE.
5. La réponse doit être ferme, respectueuse, courte (1-2 phrases max), et culturellement adaptée au Maroc.
6. Utilise TOUJOURS "DH" (jamais "MAD").
7. Rediriger vers prestataire adapté selon la situation du tarif et de la catégorie

Génère :
1. reply_phrase : réponse exacte en ${langLabel} que le client dit au vendeur, avec un prix précis inférieur à la demande du vendeur.
2. reply_phrase_darija : la MÊME réponse en Darija marocaine en CARACTÈRES ARABES UNIQUEMENT. Exemple: "أنا غادي نعطيك 150 درهم، واش مقبول؟"`;

    const result = await base44.integrations.Core.InvokeLLM({
      prompt,
      response_json_schema: {
        type: 'object',
        properties: {
          reply_phrase: { type: 'string' },
          reply_phrase_darija: { type: 'string' },
        }
      }
    });

    setReply(result);
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
            <div className="bg-shield-green/10 border border-shield-green/30 rounded-xl p-4 space-y-3">
              <div>
                <p className="text-xs text-shield-green font-semibold mb-2">{l.your_reply}</p>
                <p
                  className="text-sm text-gray-200 leading-relaxed italic font-medium"
                  dir={isRTL ? 'rtl' : 'ltr'}
                >
                  "{reply.reply_phrase}"
                </p>
              </div>
              {reply.reply_phrase_darija && (
                <div className="pt-3 border-t border-shield-green/20">
                  <span className="text-xs text-shield-gold font-semibold">🇲🇦 En Darija :</span>
                  <p className="text-xs text-gray-300 italic mt-1" dir="rtl">"{reply.reply_phrase_darija}"</p>
                  <div className="mt-2">
                    <VoiceOutput text={reply.reply_phrase_darija} lang="darija" label="🔊 Darija" />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}