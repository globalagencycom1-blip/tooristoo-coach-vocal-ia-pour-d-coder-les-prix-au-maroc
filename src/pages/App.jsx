import React, { useState, useEffect } from 'react';
import { Shield, Mic, LayoutDashboard, History, ChevronRight } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { useLang } from '../lib/LanguageContext';
import { useT } from '../lib/i18n';
import Navbar from '../components/Navbar';
import VoiceCoach from '../components/app/VoiceCoach';
import NegotiationForm from '../components/app/NegotiationForm';
import AnalysisResult from '../components/app/AnalysisResult';
import Dashboard from '../components/app/Dashboard';
import DashboardStats from '../components/app/DashboardStats';

const TABS = [
  { id: 'coach', icon: Mic, labelKey: 'nav_app' },
  { id: 'dashboard', icon: LayoutDashboard, labelKey: 'dashboard_title' },
  { id: 'history', icon: History, labelKey: 'history_title' },
];

export default function AppPage() {
  const { lang } = useLang();
  const t = useT(lang);
  const [activeTab, setActiveTab] = useState('coach');
  const [inputMode, setInputMode] = useState('voice');
  const [analysis, setAnalysis] = useState(null);
  const [negotiations, setNegotiations] = useState([]);
  const [profile, setProfile] = useState(null);
  const [category, setCategory] = useState('taxi');
  const [location, setLocation] = useState('Marrakech');
  const [priceAsked, setPriceAsked] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const user = await base44.auth.me().catch(() => null);
    if (!user) return;

    const serverNegs = await base44.entities.Negotiation.filter({ user_email: user.email }, '-created_date', 50).catch(() => []);
    // Flatten data field if present (SDK returns { id, data: {...} } structure)
    const flatNegs = serverNegs.map(n => n.data ? { id: n.id, created_date: n.created_date, ...n.data } : n);
    setNegotiations(flatNegs);

    const profiles = await base44.entities.UserProfile.filter({ user_email: user.email }).catch(() => []);
    if (profiles.length > 0) {
      setProfile(profiles[0]);
    } else {
      const newProfile = await base44.entities.UserProfile.create({ user_email: user.email, plan: 'free', language: lang });
      setProfile(newProfile);
    }
  };

  const handleAnalysisComplete = async (result) => {
    setAnalysis(result);
    setActiveTab('coach');

    const user = await base44.auth.me().catch(() => null);
    if (!user) return;

    const saved = await base44.entities.Negotiation.create({
      ...result,
      user_email: user.email,
      language: lang,
    });
    setNegotiations(prev => [saved, ...prev]);

    if (profile) {
      await base44.entities.UserProfile.update(profile.id, {
        total_negotiations: (profile.total_negotiations || 0) + 1,
        total_savings: (profile.total_savings || 0) + (result.savings || 0),
        scams_avoided: (profile.scams_avoided || 0) + (result.scam_detected ? 1 : 0),
      });
    }
  };

  const handleReset = () => setAnalysis(null);

  return (
    <div className="min-h-screen bg-shield-dark">
      <Navbar />

      <div className="max-w-2xl mx-auto px-4 pt-24 pb-24">
        {/* Tab Navigation - Top */}
        <div className="flex gap-2 mb-8 justify-center">
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                activeTab === tab.id
                  ? 'bg-shield-green text-black'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {t(tab.labelKey)}
            </button>
          ))}
        </div>

        {/* Content */}
        {activeTab === 'coach' && (
          <div>
            {analysis ? (
              <AnalysisResult analysis={analysis} lang={lang} onReset={handleReset} />
            ) : (
              <>
                {/* Input mode toggle */}
                <div className="flex gap-3 mb-8 justify-center">
                  <button
                    onClick={() => setInputMode('voice')}
                    className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                      inputMode === 'voice' ? 'bg-shield-border text-gray-300' : 'bg-transparent text-gray-500 hover:text-gray-300'
                    }`}
                  >
                    <Mic className="w-4 h-4" />
                    Chant
                  </button>
                  <button
                    onClick={() => setInputMode('form')}
                    className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                      inputMode === 'form' ? 'bg-shield-green text-black' : 'bg-transparent text-gray-500 hover:text-gray-300'
                    }`}
                  >
                    <span>✓</span>
                    Texte
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
                Upgrader <ChevronRight className="w-3 h-3" />
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}