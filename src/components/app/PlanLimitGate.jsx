import React, { useState } from 'react';
import { Zap, Lock, Loader2 } from 'lucide-react';
import { base44 } from '@/api/base44Client';

const LABELS = {
  fr: {
    title:             'Limite mensuelle atteinte',
    subtitle_free:     'Vous avez utilisé vos 3 analyses gratuites ce mois-ci. Passez au plan Voyageur pour continuer.',
    subtitle_voyageur: 'Vous avez utilisé vos 50 analyses ce mois-ci. Passez au plan Voyageur+ pour continuer.',
    voyageur_name:     'Voyageur',
    voyageur_price:    '5€/mois',
    voyageur_desc:     '50 analyses par mois',
    voyageur_plus_name:  'Voyageur+',
    voyageur_plus_price: '9€/mois',
    voyageur_plus_desc:  '100 analyses par mois',
    recommended:       'Recommandé',
    loading:           'Chargement...',
    iframe_warning:    'Le paiement fonctionne uniquement depuis l\'application publiée.',
  },
  en: {
    title:             'Monthly limit reached',
    subtitle_free:     'You have used your 3 free analyses this month. Upgrade to the Traveler plan to continue.',
    subtitle_voyageur: 'You have used your 50 analyses this month. Upgrade to Traveler+ to continue.',
    voyageur_name:     'Traveler',
    voyageur_price:    '€5/month',
    voyageur_desc:     '50 analyses per month',
    voyageur_plus_name:  'Traveler+',
    voyageur_plus_price: '€9/month',
    voyageur_plus_desc:  '100 analyses per month',
    recommended:       'Recommended',
    loading:           'Loading...',
    iframe_warning:    'Payment only works from the published app.',
  },
  es: {
    title:             'Límite mensual alcanzado',
    subtitle_free:     'Has usado tus 3 análisis gratuitos este mes. Cambia al plan Viajero para continuar.',
    subtitle_voyageur: 'Has usado tus 50 análisis este mes. Cambia al plan Viajero+ para continuar.',
    voyageur_name:     'Viajero',
    voyageur_price:    '5€/mes',
    voyageur_desc:     '50 análisis por mes',
    voyageur_plus_name:  'Viajero+',
    voyageur_plus_price: '9€/mes',
    voyageur_plus_desc:  '100 análisis por mes',
    recommended:       'Recomendado',
    loading:           'Cargando...',
    iframe_warning:    'El pago solo funciona desde la app publicada.',
  },
  de: {
    title:             'Monatslimit erreicht',
    subtitle_free:     'Sie haben Ihre 3 kostenlosen Analysen verbraucht. Wechseln Sie zum Reisender-Tarif.',
    subtitle_voyageur: 'Sie haben Ihre 50 Analysen verbraucht. Wechseln Sie zum Reisender+-Tarif.',
    voyageur_name:     'Reisender',
    voyageur_price:    '5€/Monat',
    voyageur_desc:     '50 Analysen pro Monat',
    voyageur_plus_name:  'Reisender+',
    voyageur_plus_price: '9€/Monat',
    voyageur_plus_desc:  '100 Analysen pro Monat',
    recommended:       'Empfohlen',
    loading:           'Lädt...',
    iframe_warning:    'Zahlung funktioniert nur in der veröffentlichten App.',
  },
  ar: {
    title:             'تم الوصول إلى الحد الشهري',
    subtitle_free:     'استخدمت تحليلاتك الثلاث المجانية. انتقل إلى باقة المسافر للمتابعة.',
    subtitle_voyageur: 'استخدمت تحليلاتك الـ50. انتقل إلى باقة المسافر+ للمتابعة.',
    voyageur_name:     'المسافر',
    voyageur_price:    '5€/شهر',
    voyageur_desc:     '50 تحليل شهرياً',
    voyageur_plus_name:  'المسافر+',
    voyageur_plus_price: '9€/شهر',
    voyageur_plus_desc:  '100 تحليل شهرياً',
    recommended:       'موصى به',
    loading:           'جاري التحميل...',
    iframe_warning:    'الدفع يعمل فقط من التطبيق المنشور.',
  },
  darija: {
    title:             'وصلتي للحد الشهري',
    subtitle_free:     'استعملتي التحليلات المجانية. بدّل لباقة المسافر باش تكمل.',
    subtitle_voyageur: 'استعملتي الـ50 تحليل. بدّل لباقة المسافر+ باش تكمل.',
    voyageur_name:     'المسافر',
    voyageur_price:    '5€/شهر',
    voyageur_desc:     '50 تحليل فالشهر',
    voyageur_plus_name:  'المسافر+',
    voyageur_plus_price: '9€/شهر',
    voyageur_plus_desc:  '100 تحليل فالشهر',
    recommended:       'مُوصى به',
    loading:           'كيتحمل...',
    iframe_warning:    'الدفع خدام غير من التطبيق المنشور.',
  },
};

export default function PlanLimitGate({ lang = 'fr', profile }) {
  const l           = LABELS[lang] || LABELS.fr;
  const currentPlan = profile?.plan || 'free';
  const isVoyageur  = currentPlan === 'voyageur';

  const [loadingPlan, setLoadingPlan] = useState(null);

  const handleSubscribe = async (plan) => {
    if (window.self !== window.top) {
      alert(l.iframe_warning);
      return;
    }
    setLoadingPlan(plan);
    try {
      const response = await base44.functions.invoke('stripeCheckout', {
        plan,
        success_url: `${window.location.origin}/app?payment=success`,
        cancel_url:  `${window.location.origin}/app`,
      });
      if (response.data?.url) window.location.href = response.data.url;
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingPlan(null);
    }
  };

  // ── Carte plan réutilisable ──
  const PlanCard = ({ planKey, name, price, desc, highlighted }) => (
    <button
      onClick={() => handleSubscribe(planKey)}
      disabled={loadingPlan === planKey}
      className={`w-full px-5 py-4 rounded-xl transition-all disabled:opacity-60 text-left ${
        highlighted
          ? 'bg-shield-green/10 border-2 border-shield-green hover:bg-shield-green/20'
          : 'border border-shield-border hover:border-shield-green/50'
      }`}
    >
      {/* Ligne 1 : icône + nom + badge */}
      <div className="flex items-center gap-2 mb-1">
        {highlighted && <Zap className="w-4 h-4 text-shield-green flex-shrink-0" />}
        <span className={`font-bold text-sm ${highlighted ? 'text-white' : 'text-gray-300'}`}>
          {name}
        </span>
        {highlighted && (
          loadingPlan === planKey
            ? <Loader2 className="w-4 h-4 text-shield-green animate-spin ml-auto" />
            : <span className="ml-auto text-xs bg-shield-green text-black font-bold px-2 py-0.5 rounded-full">
                {l.recommended}
              </span>
        )}
        {!highlighted && loadingPlan === planKey && (
          <Loader2 className="w-4 h-4 text-gray-400 animate-spin ml-auto" />
        )}
      </div>
      {/* Ligne 2 : prix */}
      <p className={`text-sm font-semibold mb-0.5 ${highlighted ? 'text-shield-green' : 'text-gray-400'} ${highlighted ? 'ml-6' : ''}`}>
        {price}
      </p>
      {/* Ligne 3 : description */}
      <p className={`text-xs text-gray-500 ${highlighted ? 'ml-6' : ''}`}>
        {desc}
      </p>
    </button>
  );

  return (
    <div className="bg-shield-card border border-shield-border rounded-2xl p-8 text-center">

      {/* Icône */}
      <div className="flex justify-center mb-4">
        <div className="w-16 h-16 rounded-full bg-shield-gold/10 border border-shield-gold/30 flex items-center justify-center">
          <Lock className="w-8 h-8 text-shield-gold" />
        </div>
      </div>

      {/* Titre + sous-titre */}
      <h2 className="font-poppins font-bold text-white text-xl mb-3">{l.title}</h2>
      <p className="text-gray-400 text-sm mb-8 max-w-sm mx-auto">
        {isVoyageur ? l.subtitle_voyageur : l.subtitle_free}
      </p>

      <div className="flex flex-col gap-3 max-w-sm mx-auto">
        {/* Free → Voyageur mis en avant + Voyageur+ secondaire */}
        {!isVoyageur && (
          <>
            <PlanCard
              planKey="voyageur"
              name={l.voyageur_name}
              price={l.voyageur_price}
              desc={l.voyageur_desc}
              highlighted={true}
            />
            <PlanCard
              planKey="voyageur_plus"
              name={l.voyageur_plus_name}
              price={l.voyageur_plus_price}
              desc={l.voyageur_plus_desc}
              highlighted={false}
            />
          </>
        )}

        {/* Voyageur → Voyageur+ mis en avant uniquement */}
        {isVoyageur && (
          <PlanCard
            planKey="voyageur_plus"
            name={l.voyageur_plus_name}
            price={l.voyageur_plus_price}
            desc={l.voyageur_plus_desc}
            highlighted={true}
          />
        )}
      </div>
    </div>
  );
}