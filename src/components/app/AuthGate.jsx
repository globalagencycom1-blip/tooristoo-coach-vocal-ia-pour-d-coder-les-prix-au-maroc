import React from 'react';
import { Shield, LogIn, UserPlus } from 'lucide-react';
import { base44 } from '@/api/base44Client';

const LABELS = {
  fr: {
    title: 'Connectez-vous pour accéder au Coach IA',
    subtitle: 'Créez votre compte gratuit ou connectez-vous pour analyser les prix et négocier sereinement au Maroc.',
    login: 'Se connecter',
    register: "S'inscrire gratuitement",
    free: '3 analyses gratuites par mois',
    no_card: 'Aucune carte bancaire requise',
  },
  en: {
    title: 'Sign in to access the AI Coach',
    subtitle: 'Create your free account or sign in to analyze prices and negotiate confidently in Morocco.',
    login: 'Sign in',
    register: 'Sign up for free',
    free: '3 free analyses per month',
    no_card: 'No credit card required',
  },
  es: {
    title: 'Inicia sesión para acceder al Coach IA',
    subtitle: 'Crea tu cuenta gratuita o inicia sesión para analizar precios y negociar con confianza en Marruecos.',
    login: 'Iniciar sesión',
    register: 'Registrarse gratis',
    free: '3 análisis gratuitos por mes',
    no_card: 'Sin tarjeta de crédito requerida',
  },
  de: {
    title: 'Anmelden für den KI-Coach',
    subtitle: 'Erstellen Sie ein kostenloses Konto oder melden Sie sich an, um Preise zu analysieren.',
    login: 'Anmelden',
    register: 'Kostenlos registrieren',
    free: '3 kostenlose Analysen pro Monat',
    no_card: 'Keine Kreditkarte erforderlich',
  },
  ar: {
    title: 'سجّل دخولك للوصول إلى المدرب الذكي',
    subtitle: 'أنشئ حساباً مجانياً أو سجّل دخولك لتحليل الأسعار في المغرب.',
    login: 'تسجيل الدخول',
    register: 'التسجيل مجاناً',
    free: '3 تحليلات مجانية شهرياً',
    no_card: 'لا حاجة لبطاقة بنكية',
  },
  darija: {
    title: 'دخل باش توصل للكوتش الذكي',
    subtitle: 'أنشئ حساب مجاني ولا دخل باش تحلل الأسعار فالمغرب.',
    login: 'تسجيل الدخول',
    register: 'التسجيل بلاش',
    free: '3 تحليلات مجانية فالشهر',
    no_card: 'بلا بطاقة بنكية',
  },
};

export default function AuthGate({ lang = 'fr' }) {
  const l = LABELS[lang] || LABELS.fr;

  const handleLogin = () => base44.auth.redirectToLogin(window.location.href);

  return (
    <div className="bg-shield-card border border-shield-border rounded-2xl p-8 text-center">
      <div className="flex justify-center mb-4">
        <div className="w-16 h-16 rounded-full bg-shield-green/10 border border-shield-green/30 flex items-center justify-center">
          <Shield className="w-8 h-8 text-shield-green" />
        </div>
      </div>

      <h2 className="font-poppins font-bold text-white text-xl mb-3">{l.title}</h2>
      <p className="text-gray-400 text-sm mb-8 max-w-sm mx-auto">{l.subtitle}</p>

      <div className="flex flex-col gap-3 max-w-xs mx-auto">
        <button
          onClick={handleLogin}
          className="flex items-center justify-center gap-2 w-full py-3 bg-shield-green text-black font-semibold rounded-xl hover:bg-green-400 transition-all btn-glow"
        >
          <UserPlus className="w-4 h-4" />
          {l.register}
        </button>
        <button
          onClick={handleLogin}
          className="flex items-center justify-center gap-2 w-full py-3 border border-shield-border text-gray-300 font-semibold rounded-xl hover:border-shield-green/50 hover:text-shield-green transition-all"
        >
          <LogIn className="w-4 h-4" />
          {l.login}
        </button>
      </div>

      <div className="flex items-center justify-center gap-4 mt-6 text-xs text-gray-500">
        <span>✓ {l.free}</span>
        <span>✓ {l.no_card}</span>
      </div>
    </div>
  );
}