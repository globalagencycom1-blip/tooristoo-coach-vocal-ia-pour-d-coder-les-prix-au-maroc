import React, { useState } from 'react';
import { Zap, Lock, Loader2 } from 'lucide-react';
import { base44 } from '@/api/base44Client';

const LABELS = {
  fr: {
    title:             'Limite mensuelle atteinte',
    subtitle_free:     'Vous avez utilisé vos 3 analyses gratuites ce mois-ci. Passez au plan Voyageur pour continuer.',
    subtitle_voyageur: 'Vous avez utilisé vos 50 analyses ce mois-ci. Passez au plan Voyageur+ pour continuer.',
    voyageur:          'Plan Voyageur — 5€/mois',
    voyageur_desc:     '50 analyses par mois',
    voyageur_plus:     'Plan Voyageur+ — 9€/mois',
    voyageur_plus_desc:'100 analyses par mois',
    recommended:       'Recommandé',
    loading:           'Chargement...',
    iframe_warning:    'Le paiement fonctionne uniquement depuis l\'application publiée.',
  },
  en: {
    title:             'Monthly limit reached',
    subtitle_free:     'You have used your 3 free analyses this month. Upgrade to the Traveler plan to continue.',
    subtitle_voyageur: 'You have used your 50 analyses this month. Upgrade to Traveler+ to continue.',
    voyageur:          'Traveler Plan — €5/month',
    voyageur_desc:     '50 analyses per month',
    voyageur_plus:     'Traveler+ Plan — €9/month',
    voyageur_plus_desc:'100 analyses per month',
    recommended:       'Recommended',
    loading:           'Loading...',
    iframe_warning:    'Payment only works from the published app.',
  },
  es: {
    title:             'Límite mensual alcanzado',
    subtitle_free:     'Has usado tus 3 análisis gratuitos este mes. Cambia al plan Viajero para continuar.',
    subtitle_voyageur: 'Has usado tus 50 análisis este mes. Cambia al plan Viajero+ para continuar.',
    voyageur:          'Plan Viajero — 5€/mes',
    voyageur_desc:     '50 análisis por mes',
    voyageur_plus:     'Plan Viajero+ — 9€/mes',
    voyageur_plus_desc:'100 análisis por mes',
    recommended:       'Recomendado',
    loading:           'Cargando...',
    iframe_warning:    'El pago solo funciona desde la app publicada.',
  },
  de: {
    title:             'Monatslimit erreicht',
    subtitle_free:     'Sie haben Ihre 3 kostenlosen Analysen verbraucht. Wechseln Sie zum Reisender-Tarif.',
    subtitle_voyageur: 'Sie haben Ihre 50 Analysen verbraucht. Wechseln Sie zum Reisender+-Tarif.',
    voyageur:          'Reisender — 5€/Monat',
    voyageur_desc:     '50 Analysen pro Monat',
    voyageur_plus:     'Reisender+ — 9€/Monat',
    voyageur_plus_desc:'100 Analysen pro Monat',
    recommended:       'Empfohlen',
    loading:           'Lädt...',
    iframe_warning:    'Zahlung funktioniert nur in der veröffentlichten App.',
  },
  ar: {
    title:             'تم الوصول إلى الحد الشهري',
    subtitle_free:     'استخدمت تحليلاتك الثلاث المجانية. انتقل إلى باقة المسافر للمتابعة.',
    subtitle_voyageur: 'استخدمت تحليلاتك الـ50. انتقل إلى باقة المسافر+ للمتابعة.',
    voyageur:          'خطة المسافر — 5€/شهر',
    voyageur_desc:     '50 تحليل شهرياً',
    voyageur_plus:     'خطة المسافر+ — 9€/شهر',
    voyageur_plus_desc:'100 تحليل شهرياً',
    recommended:       'موصى به',
    loading:           'جاري التحميل...',
    iframe_warning:    'الدفع يعمل فقط من التطبيق المنشور.',
  },
  darija: {
    title:             'وصلتي للحد الشهري',
    subtitle_free:     'استعملتي التحليلات المجانية. بدّل لباقة المسافر باش تكمل.',
    subtitle_voyageur: 'استعملتي الـ50 تحليل. بدّل لباقة المسافر+ باش تكمل.',
    voyageur:          'فورمول المسافر — 5€/شهر',
    voyageur_desc:     '50 تحليل فالشهر',
    voyageur_plus:     'فورمول المسافر+ — 9€/شهر',
    voyageur_plus_desc:'100 تحليل فالشهر',
    recommended:       'مُوصى به',
    loading:           'كيتحمل...',
    iframe_warning:    'الدفع خدام غير من التطبيق المنشور.',
  },
};

export default function PlanLimitGate({ lang = 'fr', profile }) {
  const l          = LABELS[lang] || LABELS.fr;
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

        {/* Plan FREE → Voyageur mis en avant + Voyageur+ en secondaire */}
        {!isVoyageur && (
          <>
            <button
              onClick={() => handleSubscribe('voyageur')}
              disabled={loadingPlan === 'voyageur'}
              className="flex flex-col w-full px-5 py-4 bg-shield-green/10 border-2 border-shield-green rounded-xl hover:bg-shield-green/20 transition-all disabled:opacity-60 text-left"
            >
              <div className="flex items-center justify-between w-full mb-1">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-shield-green flex-shrink-0" />
                  <span className="text-white font-bold text-sm">{l.voyageur}</span>
                </div>
                {loadingPlan === 'voyageur'
                  ? <Loader2 className="w-4 h-4 text-shield-green animate-spin" />
                  : <span className="text-xs bg-shield-green text-black font-bold px-2 py-0.5 rounded-full whitespace-nowrap">{l.recommended}</span>
                }
              </div>
              <span className="text-gray-400 text-xs ml-6">{l.voyageur_desc}</span>
            </button>

            <button
              onClick={() => handleSubscribe('voyageur_plus')}
              disabled={loadingPlan === 'voyageur_plus'}
              className="flex items-center justify-between w-full px-5 py-4 border border-shield-border rounded-xl hover:border-shield-green/50 transition-all disabled:opacity-60"
            >
              <div className="text-left">
                <div className="font-semibold text-gray-300 text-sm">{l.voyageur_plus}</div>
                <div className="text-gray-500 text-xs">{l.voyageur_plus_desc}</div>
              </div>
              {loadingPlan === 'voyageur_plus' && <Loader2 className="w-4 h-4 text-gray-400 animate-spin" />}
            </button>
          </>
        )}

        {/* Plan VOYAGEUR → Voyageur+ mis en avant uniquement */}
        {isVoyageur && (
          <button
            onClick={() => handleSubscribe('voyageur_plus')}
            disabled={loadingPlan === 'voyageur_plus'}
            className="flex items-center justify-between w-full px-5 py-4 bg-shield-green/10 border-2 border-shield-green rounded-xl hover:bg-shield-green/20 transition-all disabled:opacity-60"
          >
            <div className="text-left">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-shield-green" />
                <span className="text-white font-bold text-sm">{l.voyageur_plus}</span>
              </div>
              <span className="text-gray-400 text-xs ml-6">{l.voyageur_plus_desc}</span>
            </div>
            {loadingPlan === 'voyageur_plus'
              ? <Loader2 className="w-4 h-4 text-shield-green animate-spin" />
              : <span className="text-xs bg-shield-green text-black font-bold px-2 py-0.5 rounded-full">⭐</span>
            }
          </button>
        )}

      </div>
    </div>
  );
}