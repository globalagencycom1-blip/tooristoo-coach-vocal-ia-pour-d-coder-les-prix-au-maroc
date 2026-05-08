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

const TABS = [
  { id: 'coach', icon: Mic, labelKey: 'nav_app' },
  { id: 'dashboard', icon: LayoutDashboard, labelKey: 'dashboard_title' },
  { id: 'history', icon: History, labelKey: 'history_title' },
];

export default function AppPage() {
  const { lang } = useLang();
  const t = useT(lang);
  const dt = (key) => getDashboardT(key, lang);
  const [activeTab, setActiveTab] = useState('coach');
  const [inputMode, setInputMode] = useState('voice');
  const [analysis, setAnalysis] = useState(null);
  const [negotiations, setNegotiations] = useState([]);
  const [profile, setProfile] = useState(null);
  const [user, setUser] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [category, setCategory] = useState('taxi');
  const [location, setLocation] = useState('Marrakech');
  const [priceAsked, setPriceAsked] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const currentUser = await base44.auth.me().catch(() => null);
    setUser(currentUser);
    setAuthChecked(true);
    if (!currentUser) return;

    const serverNegs = await base44.entities.Negotiation.filter({ user_email: currentUser.email }, '-created_date', 50).catch(() => []);
    const flatNegs = serverNegs.map(n => n.data ? { id: n.id, created_date: n.created_date, ...n.data } : n);
    setNegotiations(flatNegs);

    const profiles = await base44.entities.UserProfile.filter({ user_email: currentUser.email }).catch(() => []);
    if (profiles.length > 0) {
      setProfile(profiles[0]);
    } else {
      const newProfile = await base44.entities.UserProfile.create({ user_email: currentUser.email, plan: 'free', language: lang });
      setProfile(newProfile);
    }
  };

  // Vérification limite plan free
  const isLimitReached = () => {
    if (!profile) return false;
    if (profile.plan === 'free') {
      return (profile.monthly_analyses_used || 0) >= 3;
    }
    return false;
  };

  const getAnalysesLabel = () => {
    if (!profile) return '';
    if (profile.plan === 'free') {
      const remaining = Math.max(0, 3 - (profile.monthly_analyses_used || 0));
      const labels = { fr: `${remaining} analyse${remaining !== 1 ? 's' : ''} restante${remaining !== 1 ? 's' : ''}`, en: `${remaining} analysis remaining`, es: `${remaining} análisis restantes`, de: `${remaining} Analysen verbleibend`, ar: `${remaining} تحليلات متبقية`, darija: `${remaining} تحليلات متبقية` };
      return labels[lang] || labels.fr;
    }
    if (profile.plan === 'voyageur') {
      const remaining = Math.max(0, 50 - (profile.monthly_analyses_used || 0));
      const labels = { fr: `${remaining}/50 analyses`, en: `${remaining}/50 analyses`, es: `${remaining}/50 análisis`, de: `${remaining}/50 Analysen`, ar: `${remaining}/50 تحليل`, darija: `${remaining}/50 تحليل` };
      return labels[lang] || labels.fr;
    }
    if (profile.plan === 'voyageur_plus' || profile.plan === 'pro') {
      const remaining = Math.max(0, 100 - (profile.monthly_analyses_used || 0));
      const labels = { fr: `${remaining}/100 analyses`, en: `${remaining}/100 analyses`, es: `${remaining}/100 análisis`, de: `${remaining}/100 Analysen`, ar: `${remaining}/100 تحليل`, darija: `${remaining}/100 تحليل` };
      return labels[lang] || labels.fr;
    }
    return '';
  };

  const handleAnalysisComplete = async (result) => {
    setAnalysis(result);
    setActiveTab('coach');

    if (!user) return;

    const saved = await base44.entities.Negotiation.create({
      ...result,
      user_email: user.email,
      language: lang,
    });
    setNegotiations(prev => [saved, ...prev]);

    if (profile) {
      const updatedProfile = {
        total_negotiations: (profile.total_negotiations || 0) + 1,
        total_savings: (profile.total_savings || 0) + (result.savings || 0),
        scams_avoided: (profile.scams_avoided || 0) + (result.scam_detected ? 1 : 0),
        monthly_analyses_used: (profile.monthly_analyses_used || 0) + 1,
      };
      await base44.entities.UserProfile.update(profile.id, updatedProfile);
      setProfile(prev => ({ ...prev, ...updatedProfile }));
    }
  };

  const handleReset = () => setAnalysis(null);

  return (
    <div className="min-h-screen bg-shield-dark">
      <PageHelmet page="app" lang={lang} />
      <Navbar />

      <div className="max-w-2xl mx-auto px-4 pt-20 pb-24">
        {/* App Header */}
        <div className="text-center py-6">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Shield className="w-6 h-6 text-shield-green" />
            <h1 className="font-poppins font-bold text-white text-xl">{t('app_page_title')}</h1>
          </div>
          <p className="text-shield-green text-sm">{t('app_page_subtitle')}</p>
        </div>



        {/* Tab Navigation */}
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
              <span className="hidden sm:inline">{tab.labelKey === 'recorder_tab' ? dt(tab.labelKey) : t(tab.labelKey)}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        {activeTab === 'coach' && (
          <div className="bg-shield-card border border-shield-border rounded-2xl p-6">
            {/* Auth Gate */}
            {authChecked && !user ? (
              <AuthGate lang={lang} />
            ) : analysis ? (
              <AnalysisResult analysis={analysis} lang={lang} onReset={handleReset} />
            ) : isLimitReached() ? (
              <PlanLimitGate lang={lang} />
            ) : (
              <>
                {/* Analyses restantes */}
                {profile && (
                  <div className="flex justify-center mb-6">
                    <div className="bg-shield-card border border-shield-border rounded-2xl p-6"
                      style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: profile.plan === 'free' ? '#d1d5db' : '#22c55e' }}>
                      {getAnalysesLabel()}
                    </div>
                  </div>
                )}

                {/* Input mode toggle */}
                <div className="flex items-center justify-center gap-6 mb-6">
                  <button
                    onClick={() => setInputMode('voice')}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                      inputMode === 'voice'
                        ? 'bg-shield-green/20 text-shield-green border border-shield-green/50'
                        : 'text-gray-500 hover:text-gray-300 border border-transparent'
                    }`}
                  >
                    <Mic className="w-4 h-4" />
                    {t('input_mode_voice')}
                  </button>
                  <button
                    onClick={() => setInputMode('form')}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                      inputMode === 'form'
                        ? 'bg-shield-green/20 text-shield-green border border-shield-green/50'
                        : 'text-gray-500 hover:text-gray-300 border border-transparent'
                    }`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
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
              <span className="text-xs text-gray-400">Plan: <span className="text-white font-semibold capitalize">{profile.plan}</span></span>
            </div>
            {profile.plan === 'free' && (
              <a href="/#pricing" className="flex items-center gap-1 text-xs text-shield-gold hover:text-yellow-300">
                {t('upgrade_btn')} <ChevronRight className="w-3 h-3" />
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}