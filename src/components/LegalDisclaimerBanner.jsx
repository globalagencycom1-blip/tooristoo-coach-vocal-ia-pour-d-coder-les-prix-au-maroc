import React, { useState } from 'react';
import { AlertCircle, X } from 'lucide-react';
import { useT } from '../lib/i18n';

export default function LegalDisclaimerBanner({ lang }) {
  const t = useT(lang);
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="bg-yellow-900/20 border border-yellow-600/30 rounded-lg p-4 mb-6 flex items-start gap-3">
      <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
      <div className="flex-1">
        <h4 className="font-semibold text-yellow-300 text-sm mb-1">
          {lang === 'fr' ? '⚠️ Avis de conformité légale' : 
           lang === 'en' ? '⚠️ Legal Compliance Notice' :
           lang === 'es' ? '⚠️ Aviso de Cumplimiento Legal' :
           lang === 'de' ? '⚠️ Rechtliche Hinweis' :
           lang === 'ar' ? '⚠️ إشعار الامتثال القانوني' :
           '⚠️ إشعار الامتثال القانوني'}
        </h4>
        <p className="text-yellow-200/80 text-xs leading-relaxed">
          {lang === 'fr' ? 'Tooristoo ne doit être utilisé que pour des fins légales et conformes à la loi marocaine. Toute utilisation pour des activités illégales ou nuisibles est strictement interdite. Nous nous réservons le droit de suspendre tout compte en violation de ces conditions.' :
           lang === 'en' ? 'Tooristoo must only be used for legal purposes and in compliance with Moroccan law. Any use for illegal or harmful activities is strictly prohibited. We reserve the right to suspend any account in violation of these conditions.' :
           lang === 'es' ? 'Tooristoo debe usarse solo para fines legales y en cumplimiento con la ley marroquí. Está estrictamente prohibido usar para actividades ilegales o perjudiciales. Nos reservamos el derecho de suspender cualquier cuenta que viole estas condiciones.' :
           lang === 'de' ? 'Tooristoo darf nur für rechtmäßige Zwecke und in Übereinstimmung mit dem marokkanischen Recht verwendet werden. Die Verwendung für illegale oder schädliche Aktivitäten ist streng verboten. Wir behalten uns das Recht vor, jedes Konto zu sperren, das gegen diese Bedingungen verstößt.' :
           lang === 'ar' ? 'يجب استخدام Tooristoo فقط لأغراض قانونية وامتثالاً للقانون المغربي. يُحظر تماماً استخدامه لأي أنشطة غير قانونية أو ضارة. نحتفظ بالحق في إيقاف أي حساب ينتهك هذه الشروط.' :
           'يجب استخدام Tooristoo فقط لأغراض قانونية وتحت التزام بالقانون المغربي. ممنوع نهائياً استخدام التطبيق لنشاطات غير قانونية. نحتفظ الحق في إيقاف أي حساب ينتهك الشروط ديال.'}
        </p>
      </div>
      <button
        onClick={() => setDismissed(true)}
        className="text-yellow-600 hover:text-yellow-400 flex-shrink-0"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}