import React, { useState, useEffect } from 'react';
import { Shield, Mic, LayoutDashboard, History, ChevronRight } from 'lucide-react';
import PageHelmet from '../lib/seo-helmet';
import { base44 } from '@/api/base44Client';
import { useLang } from '../lib/LanguageContext';
import { useT } from '../lib/i18n';
import { getDashboardT } from '../lib/dashboard-translations';
import Navbar from '../components/Navbar';
import VoiceCoach from '../components/app/VoiceCoach';
import NegotiationForm from '../components/app/NegotiationForm';
import AnalysisResult from '../components/app/AnalysisResult';
import Dashboard from '../components/app/Dashboard';
import DashboardStats from '../components/app/DashboardStats';
import AuthGate from '../components/app/AuthGate';
import PlanLimitGate from '../components/app/PlanLimitGate';

function formatPlanLabel(plan) {
  const labels = {
    free:          'Free',
    voyageur:      'Voyageur',
    voyageur_plus: 'Voyageur Plus',
    pro:           'Voyageur Plus',
  };
  return labels[plan] || plan;
}

const TABS = [
  { id: 'coach',     icon: Mic,             labelKey: 'nav_app' },
  { id: 'dashboard', icon: LayoutDashboard, labelKey: 'dashboard_title' },
  { id: 'history',   icon: History,         labelKey: 'history_title' },
];

export default function AppPage() {
  const { lang } = useLang();
  const t  = useT(lang);
  const dt = (key) => getDashboardT(key, lang);

  const [activeTab,    setActiveTab]    = useState('coach');
  const [inputMode,    setInputMode]    = useState('voice');
  const [analysis,     setAnalysis]     = useState(null);
  const [negotiations, setNegotiations] = useState([]);
  const [profile,      setProfile]      = useState(null);
  const [user,         setUser]         = useState(null);
  const [authChecked,  setAuthChecked]  = useState(false);
  const [category,     setCategory]     = useState('taxi');
  const [location,     setLocation]     = useState('Marrakech');
  const [priceAsked,   setPriceAsked]   = useState('');

  useEffect(() => { loadData(); }, []);

  const loadData = async () => {
    const currentUser = await base44.auth.me().catch(() => null);
    setUser(currentUser);
    setAuthChecked(true);
    if (!currentUser) return;

    const serverNegs = await base44.entities.Negotiation.filter(
      { user_email: currentUser.email }, '-created_date', 50
    ).catch(() => []);
    setNegotiations(serverNegs.map(n => n.data ? { id: n.id, created_date: n.created_date, ...n.data } : n));

    const profiles = await base44.entities.UserProfile.filter({ user_email: currentUser.email }).catch(() => []);
    if (profiles.length > 0) {
      setProfile(profiles[0]);
    } else {
      const newProfile = await base44.entities.UserProfile.create({
        user_email: currentUser.email, plan: 'free', language: lang,
      });
      setProfile(newProfile);
    }
  };

  const isLimitReached = () => {
    if (!profile) return false;
    return profile.plan === 'free' && (profile.monthly_analyses_used || 0) >= 3;
  };

  const getAnalysesLabel = () => {
    if (!profile) return '';
    const used = profile.monthly_analyses_used || 0;
    if (profile.plan === 'free') {
      const r = Math.max(0, 3 - used);
      return { fr: `${r} analyse${r !== 1 ? 's' : ''} restante${r !== 1 ? 's' : ''}`, en: `${r} analysis remaining`, es: `${r} análisis restantes`, de: `${r} Analysen verbleibend`, ar: `${r} تحليلات متبقية`, darija: `${r} تحليلات متبقية` }[lang] || `${r} restantes`;
    }
    const max = (profile.plan === 'voyageur') ? 50 : 100;
    const r   = Math.max(0, max - used);
    return `${r}/${max} analyses`;
  };

  const handleAnalysisComplete = async (result) => {
    setAnalysis(result);
    setActiveTab('coach');
    if (!user) return;

    const saved = await base44.entities.Negotiation.create({
      ...result, user_email: user.email, language: lang,
    });
    setNegotiations(prev => [saved, ...prev]);

    if (profile) {
      const upd = {
        total_negotiations:    (profile.total_negotiations    || 0) + 1,
        total_savings:         (profile.total_savings         || 0) + (result.savings || 0),
        scams_avoided:         (profile.scams_avoided         || 0) + (result.scam_detected ? 1 : 0),
        monthly_analyses_used: (profile.monthly_analyses_used || 0) + 1,
      };
      await base44.entities.UserProfile.update(profile.id, upd);
      setProfile(prev => ({ ...prev, ...upd }));
    }
  };

  const handleReset = () => setAnalysis(null);

  return (
    <div className="min-h-screen bg-shield-dark">
      <PageHelmet page="app" lang={lang} />
      <Navbar />

      <div className="max-w-2xl mx-auto px-4 pt-20 pb-24">

        {/* Header */}
        <div className="text-center py-6">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Shield className="w-6 h-6 text-shield-green" />
            <h1 className="font-poppins font-bold text-white text-xl">{t('app_page_title')}</h1>
          </div>
          <p className="text-shield-green text-sm">{t('app_page_subtitle')}</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-shield-card border border-shield-border rounded-2xl p-1 mb-6">
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === tab.id
                  ? 'bg-shield-green text-black'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <tab.icon className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">
                {tab.labelKey === 'recorder_tab' ? dt(tab.labelKey) : t(tab.labelKey)}
              </span>
            </button>
          ))}
        </div>

        {/* Contenu */}
        {activeTab === 'coach' && (
          <div className="bg-shield-card border border-shield-border rounded-2xl p-6">
            {authChecked && !user ? (
              <AuthGate lang={lang} />
            ) : analysis ? (
              <AnalysisResult analysis={analysis} lang={lang} onReset={handleReset} />
            ) : isLimitReached() ? (
              <PlanLimitGate lang={lang} profile={profile} />
            ) : (
              <>
                {profile && (
                  <div className="flex justify-center mb-6">
                    <div
                      className="px-5 py-2.5 rounded-full text-sm font-medium"
                      style={{
                        background: 'rgba(255,255,255,0.06)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        color: profile.plan === 'free' ? '#d1d5db' : '#22c55e',
                      }}
                    >
                      {getAnalysesLabel()}
                    </div>
                  </div>
                )}

                {/* Toggle Vocal / Texte */}
                <div className="flex gap-1 bg-shield-dark border border-shield-border rounded-2xl p-1 mb-6">
                  <button
                    onClick={() => setInputMode('voice')}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                      inputMode === 'voice'
                        ? 'bg-shield-green text-black'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <Mic className="w-4 h-4" />
                    {t('input_mode_voice')}
                  </button>
                  <button
                    onClick={() => setInputMode('form')}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                      inputMode === 'form'
                        ? 'bg-shield-green text-black'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                    {t('input_mode_text')}
                  </button>
                </div>

                {inputMode === 'voice' ? (
                  <VoiceCoach
                    lang={lang}
                    onAnalysisComplete={handleAnalysisComplete}
                    category={category}
                    location={location}
                    priceAsked={priceAsked}
                  />
                ) : (
                  <NegotiationForm lang={lang} onAnalysisComplete={handleAnalysisComplete} />
                )}
              </>
            )}
          </div>
        )}

        {activeTab === 'dashboard' && (
          <DashboardStats lang={lang} profile={profile} negotiations={negotiations} />
        )}

        {activeTab === 'history' && (
          <Dashboard lang={lang} profile={profile} negotiations={negotiations} />
        )}

        {/* Plan badge */}
        {profile && (
          <div className="mt-4 flex items-center justify-between p-3 bg-shield-card border border-shield-border rounded-xl">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-shield-green" />
              <span className="text-xs text-gray-400">
                Plan: <span className="text-white font-semibold">{formatPlanLabel(profile.plan)}</span>
              </span>
            </div>
            {(profile.plan === 'free' || profile.plan === 'voyageur') && (
              <a
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  const anchor = profile.plan === 'free' ? 'pricing-voyageur' : 'pricing-voyageur-plus';
                  // Navigue vers la page d'accueil puis scrolle vers l'ancre
                  window.location.href = `/#${anchor}`;
                  setTimeout(() => {
                    const el = document.getElementById(anchor);
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  }, 300);
                }}
                className="flex items-center gap-1 text-xs text-shield-gold hover:text-yellow-300"
              >
                {profile.plan === 'free' ? 'Passer Voyageur' : 'Passer Voyageur+'}
                <ChevronRight className="w-3 h-3" />
              </a>
            )}
          </div>
        )}

      </div>
    </div>
  );
}