import React, { useState, useEffect } from 'react';
import { User, Mail, Globe, CreditCard, History, Settings, LogOut, Edit2, Check, Zap } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { useLang } from '../lib/LanguageContext';
import { useT } from '../lib/i18n';
import { getProfileT } from '../lib/profile-translations';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Profile() {
  const { lang, setLang } = useLang();
  const tBase = useT(lang);
  const t = (key) => getProfileT(key, lang) !== key ? getProfileT(key, lang) : tBase(key);
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [negotiations, setNegotiations] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});
  const [activeSection, setActiveSection] = useState('info');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const currentUser = await base44.auth.me();
      setUser(currentUser);

      const profiles = await base44.entities.UserProfile.filter({ user_email: currentUser.email }).catch(() => []);
      if (profiles.length > 0) {
        setProfile(profiles[0]);
        setEditData({
          language: profiles[0].language || lang,
          destination: profiles[0].destination || 'Maroc',
        });
      }

      const negs = await base44.entities.Negotiation.filter({ user_email: currentUser.email }, '-created_date', 10).catch(() => []);
      setNegotiations(negs.map(n => n.data ? { id: n.id, created_date: n.created_date, ...n.data } : n));
    } catch (err) {
      console.error('Error loading profile data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveChanges = async () => {
    if (!profile) return;
    try {
      await base44.entities.UserProfile.update(profile.id, editData);
      if (editData.language && editData.language !== lang) {
        setLang(editData.language);
      }
      setProfile({ ...profile, ...editData });
      setIsEditing(false);
    } catch (err) {
      console.error('Error saving changes:', err);
    }
  };

  const handleLogout = async () => {
    await base44.auth.logout('/');
  };

  const PLAN_DETAILS = {
    free: {
      nameKey: 'plan_free',
      priceKey: 'plan_free_price',
      featuresKey: ['plan_free_feat1', 'plan_free_feat2', 'plan_free_feat3'],
      color: 'bg-gray-500',
    },
    voyageur: {
      nameKey: 'plan_voyageur',
      priceKey: 'plan_voyageur_price',
      featuresKey: ['plan_voyageur_feat1', 'plan_voyageur_feat2', 'plan_voyageur_feat3', 'plan_voyageur_feat4', 'plan_voyageur_feat5'],
      color: 'bg-shield-green',
    },
    pro: {
      nameKey: 'plan_pro',
      priceKey: 'plan_pro_price',
      featuresKey: ['plan_pro_feat1', 'plan_pro_feat2', 'plan_pro_feat3', 'plan_pro_feat4', 'plan_pro_feat5'],
      color: 'bg-shield-gold',
    },
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-shield-dark flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-shield-green border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-shield-dark">
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 pt-24 pb-16">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-shield-green/10 border border-shield-green/30 mb-4">
            <User className="w-8 h-8 text-shield-green" />
          </div>
          <h1 className="font-poppins font-bold text-3xl text-white mb-2">{t('profile_title')}</h1>
          <p className="text-gray-400">{user?.email}</p>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          {/* Sidebar Navigation */}
          <div className="md:col-span-1">
            <div className="bg-shield-card border border-shield-border rounded-2xl p-4 space-y-2 sticky top-24">
              {[
                { id: 'info', icon: User, labelKey: 'profile_info' },
                { id: 'preferences', icon: Settings, labelKey: 'profile_preferences' },
                { id: 'history', icon: History, labelKey: 'profile_history' },
                { id: 'subscription', icon: CreditCard, labelKey: 'profile_subscription' },
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    activeSection === item.id
                      ? 'bg-shield-green text-black'
                      : 'text-gray-400 hover:bg-shield-border/50'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  {t(item.labelKey)}
                </button>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="md:col-span-3 space-y-6">
            {/* Personal Info Section */}
            {activeSection === 'info' && (
              <div className="bg-shield-card border border-shield-border rounded-2xl p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-poppins font-bold text-2xl text-white flex items-center gap-2">
                    <User className="w-6 h-6 text-shield-green" />
                    {t('profile_info')}
                  </h2>
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-shield-green/10 text-shield-green hover:bg-shield-green/20 transition-all text-sm font-medium"
                  >
                    <Edit2 className="w-4 h-4" />
                    {isEditing ? t('profile_cancel') : t('profile_edit')}
                  </button>
                </div>

                <div className="space-y-4">
                  {/* Name */}
                  <div className="flex items-center justify-between p-4 bg-shield-border/30 rounded-xl">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">{t('profile_name')}</p>
                      <p className="text-white font-medium">{user?.full_name}</p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-center justify-between p-4 bg-shield-border/30 rounded-xl">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-shield-green" />
                      <div>
                        <p className="text-xs text-gray-500 mb-1">{t('profile_email')}</p>
                        <p className="text-white font-medium">{user?.email}</p>
                      </div>
                    </div>
                  </div>

                  {/* Destination */}
                  {isEditing ? (
                    <div className="p-4 bg-shield-border/30 rounded-xl">
                      <p className="text-xs text-gray-500 mb-2">{t('profile_destination')}</p>
                      <input
                        type="text"
                        value={editData.destination || ''}
                        onChange={(e) => setEditData({ ...editData, destination: e.target.value })}
                        className="w-full bg-shield-dark border border-shield-border rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-shield-green"
                        placeholder="Maroc"
                      />
                    </div>
                  ) : (
                    <div className="flex items-center justify-between p-4 bg-shield-border/30 rounded-xl">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">{t('profile_destination')}</p>
                        <p className="text-white font-medium">{profile?.destination || 'Maroc'}</p>
                      </div>
                    </div>
                  )}

                  {/* Plan Badge */}
                  <div className="p-4 bg-shield-green/10 border border-shield-green/30 rounded-xl">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Zap className="w-4 h-4 text-shield-gold" />
                        <div>
                          <p className="text-xs text-gray-400 mb-1">{t('profile_plan')}</p>
                          <p className="text-white font-bold capitalize">{profile?.plan}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-400">{t('profile_member_since')}</p>
                        <p className="text-sm text-white">
                          {profile?.created_date ? new Date(profile.created_date).toLocaleDateString(lang) : '—'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {isEditing && (
                    <button
                      onClick={handleSaveChanges}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-shield-green text-black font-bold hover:bg-green-400 transition-all"
                    >
                      <Check className="w-4 h-4" />
                      {t('profile_save')}
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Preferences Section */}
            {activeSection === 'preferences' && (
              <div className="bg-shield-card border border-shield-border rounded-2xl p-8">
                <h2 className="font-poppins font-bold text-2xl text-white flex items-center gap-2 mb-6">
                  <Settings className="w-6 h-6 text-shield-green" />
                  {t('profile_preferences')}
                </h2>

                <div className="space-y-4">
                  {/* Language */}
                  <div>
                    <p className="text-sm text-gray-400 mb-3 flex items-center gap-2">
                      <Globe className="w-4 h-4 text-shield-green" />
                      {t('profile_language')}
                    </p>
                    <select
                      value={editData.language || lang}
                      onChange={(e) => {
                        setEditData({ ...editData, language: e.target.value });
                        setLang(e.target.value);
                        if (profile) {
                          base44.entities.UserProfile.update(profile.id, { language: e.target.value });
                        }
                      }}
                      className="w-full bg-shield-border/50 border border-shield-border rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-shield-green"
                    >
                      <option value="fr">Français</option>
                      <option value="en">English</option>
                      <option value="es">Español</option>
                      <option value="de">Deutsch</option>
                      <option value="ar">العربية</option>
                      <option value="darija">Darija</option>
                    </select>
                  </div>

                  {/* Destination */}
                  <div>
                    <p className="text-sm text-gray-400 mb-3">{t('profile_main_destination')}</p>
                    <input
                      type="text"
                      value={editData.destination || profile?.destination || ''}
                      onChange={(e) => setEditData({ ...editData, destination: e.target.value })}
                      onBlur={() => {
                        if (profile && editData.destination) {
                          base44.entities.UserProfile.update(profile.id, { destination: editData.destination });
                        }
                      }}
                      className="w-full bg-shield-border/50 border border-shield-border rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-shield-green"
                      placeholder="Maroc"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* History Section */}
            {activeSection === 'history' && (
              <div className="bg-shield-card border border-shield-border rounded-2xl p-8">
                <h2 className="font-poppins font-bold text-2xl text-white flex items-center gap-2 mb-6">
                  <History className="w-6 h-6 text-shield-green" />
                  {t('profile_history')}
                </h2>

                {negotiations.length > 0 ? (
                  <div className="space-y-3">
                    {negotiations.map((neg, idx) => (
                      <div key={idx} className="p-4 bg-shield-border/30 rounded-lg hover:bg-shield-border/50 transition-all">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-white capitalize">{neg.category} - {neg.location}</p>
                            <p className="text-xs text-gray-400 mt-1">
                              {neg.created_date ? new Date(neg.created_date).toLocaleDateString(lang) : '—'}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-bold text-shield-green">{neg.price_asked} MAD</p>
                            {neg.savings > 0 && (
                              <p className="text-xs text-green-400">💰 {neg.savings} MAD {t('profile_saved')}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-gray-400 py-8">{t('profile_no_history')}</p>
                )}
              </div>
            )}

            {/* Subscription Section */}
            {activeSection === 'subscription' && (
              <div className="space-y-6">
                {/* Current Plan */}
                <div className="bg-shield-card border border-shield-border rounded-2xl p-8">
                  <h2 className="font-poppins font-bold text-2xl text-white flex items-center gap-2 mb-6">
                    <CreditCard className="w-6 h-6 text-shield-green" />
                    {t('profile_current_plan')}
                  </h2>

                  {profile && PLAN_DETAILS[profile.plan] && (
                    <div className={`p-6 rounded-xl ${PLAN_DETAILS[profile.plan].color} bg-opacity-10 border border-current`}>
                      <div className="flex items-center gap-3 mb-4">
                        <Zap className="w-6 h-6" />
                        <div>
                          <h3 className="font-bold text-xl text-white capitalize">{profile.plan}</h3>
                          <p className="text-sm text-gray-400">{t(PLAN_DETAILS[profile.plan].priceKey)}/{t('per_month')}</p>
                        </div>
                      </div>
                      <ul className="space-y-2">
                        {PLAN_DETAILS[profile.plan].featuresKey.map((featureKey, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-sm text-gray-300">
                            <span className="text-shield-green">✓</span>
                            {t(featureKey)}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Upgrade CTA */}
                {profile?.plan === 'free' && (
                  <div className="bg-gradient-to-r from-shield-green/20 to-shield-gold/20 border border-shield-green/30 rounded-2xl p-8 text-center">
                    <h3 className="font-bold text-xl text-white mb-2">{t('profile_upgrade_title')}</h3>
                    <p className="text-gray-400 mb-6">{t('profile_upgrade_desc')}</p>
                    <a
                      href="/#pricing"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-shield-green text-black font-bold rounded-xl hover:bg-green-400 transition-all"
                    >
                      <Zap className="w-4 h-4" />
                      {t('profile_upgrade_btn')}
                    </a>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Logout Button */}
        <div className="mt-8 text-center">
          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 mx-auto px-6 py-2.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all text-sm font-medium border border-red-500/30"
          >
            <LogOut className="w-4 h-4" />
            {t('profile_logout')}
          </button>
        </div>
      </div>
      <Footer lang={lang} />
    </div>
  );
}