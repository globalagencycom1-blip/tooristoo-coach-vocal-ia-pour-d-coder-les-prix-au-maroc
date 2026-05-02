import React from 'react';
import PageHelmet from '../lib/seo-helmet';
import { Shield, Target, Heart, Users, Zap, Globe, Award, TrendingDown } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useLang } from '../lib/LanguageContext';
import { useT } from '../lib/i18n';
import { Link } from 'react-router-dom';

const TEAM = [
{ name: 'Youssef Benali', roleKey: 'team_role1', flag: '🇲🇦', bioKey: 'team_bio1' },
{ name: 'Sophie Martin', roleKey: 'team_role2', flag: '🇫🇷', bioKey: 'team_bio2' },
{ name: 'Carlos Ruiz', roleKey: 'team_role3', flag: '🇪🇸', bioKey: 'team_bio3' },
{ name: 'Amina Ouzzani', roleKey: 'team_role4', flag: '🇲🇦', bioKey: 'team_bio4' }];


export default function About() {
  const { lang } = useLang();
  const t = useT(lang);

  const VALUES = [
  { icon: Shield, titleKey: 'about_val1_title', descKey: 'about_val1_desc', color: 'text-shield-green', bg: 'bg-shield-green/10' },
  { icon: Heart, titleKey: 'about_val2_title', descKey: 'about_val2_desc', color: 'text-red-400', bg: 'bg-red-500/10' },
  { icon: Zap, titleKey: 'about_val3_title', descKey: 'about_val3_desc', color: 'text-shield-gold', bg: 'bg-shield-gold/10' },
  { icon: Globe, titleKey: 'about_val4_title', descKey: 'about_val4_desc', color: 'text-blue-400', bg: 'bg-blue-500/10' }];


  const STATS = [
  { icon: Users, value: '500+', labelKey: 'about_stats_travelers', color: 'text-shield-green' },
  { icon: TrendingDown, value: '2 350 MAD', labelKey: 'about_stats_savings', color: 'text-shield-gold' },
  { icon: Award, value: '98%', labelKey: 'about_stats_detection', color: 'text-blue-400' },
  { icon: Globe, value: '6', labelKey: 'about_stats_languages', color: 'text-purple-400' }];




  return (
    <div className="min-h-screen bg-shield-dark">
      <PageHelmet page="about" lang={lang} />
      <noscript>
        <article style={{padding:'2rem',fontFamily:'sans-serif'}}>
          <h1>À Propos de Tooristoo</h1>
          <p>Tooristoo a été fondé en 2023 par une équipe franco-marocaine pour aider les voyageurs à connaître les prix justes au Maroc et négocier sereinement — en respectant les usages locaux et en valorisant les prestataires transparents.</p>
          <h2>Notre mission</h2>
          <p>Démocratiser l'accès aux fourchettes de prix locales au Maroc pour tous les touristes, quelle que soit leur langue. Tooristoo guide les voyageurs pour échanger équitablement, au bénéfice des deux parties.</p>
          <h2>Nos valeurs</h2>
          <ul>
            <li>Transparence : fourchettes de prix du marché accessibles à tous</li>
            <li>Respect : échange équitable pour touristes et prestataires</li>
            <li>Innovation : IA vocale multilingue en temps réel</li>
            <li>Inclusion : 6 langues dont le darija marocain</li>
          </ul>
          <h2>Notre impact</h2>
          <ul>
            <li>500+ voyageurs accompagnés</li>
            <li>2 350 MAD d'économies moyennes par voyage</li>
            <li>98% de précision tarifaire sur les analyses vérifiées</li>
            <li>6 langues supportées : français, anglais, espagnol, allemand, arabe, darija</li>
          </ul>
          <h2>Villes couvertes</h2>
          <p>Marrakech, Fès, Casablanca, Chefchaouen, Agadir, Tanger, Rabat, Meknès, Ouarzazate, Merzouga, Essaouira, Dakhla, El Jadida.</p>
        </article>
      </noscript>
      <Navbar />
      <div className="pt-20">

        {/* Hero */}
        <section className="py-20 px-4 max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-shield-green/10 border border-shield-green/30 rounded-full text-shield-green text-sm font-medium mb-8">
            <Shield className="w-4 h-4" />
            {t('about_badge')}
          </div>
          <h1 className="font-poppins font-black text-4xl md:text-6xl text-white mb-6 leading-tight">
            {t('about_title')}<br />
            <span className="text-gradient-green">{t('about_title2')}</span>
          </h1>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto leading-relaxed">
            {t('about_subtitle')}
          </p>
        </section>

        {/* Story */}
        <section className="py-16 bg-[#0a1628]">
          <div className="max-w-4xl mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="font-poppins font-bold text-3xl text-white mb-6">{t('about_story_title')}</h2>
                <div className="space-y-4 text-gray-400 leading-relaxed">
                  <p>{t('about_story1')}</p>
                  <p>{t('about_story2')}</p>
                  <p>{t('about_story3_pre')} <span className="text-shield-green font-semibold">Tooristoo</span> {t('about_story3_post')}</p>
                </div>
              </div>
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1539650116574-75c0c6d33d08?w=600&h=400&fit=crop"
                  alt="Maroc"
                  className="rounded-2xl w-full object-cover h-64" />
                
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-shield-dark/60 to-transparent" />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-shield-dark/60 to-transparent" />
                <div className="absolute bottom-4 left-4 flex items-center gap-2">
                  <span className="text-3xl">🇲🇦</span>
                  <span className="text-white font-semibold">{t('about_founded')}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
            {STATS.map(({ icon: IconComp, value, labelKey, color }) =>
            <div key={labelKey} className="bg-shield-card border border-shield-border rounded-2xl p-6 text-center">
                <IconComp className={`w-6 h-6 mx-auto mb-3 ${color}`} />
                <div className={`font-poppins font-black text-2xl ${color}`}>{value}</div>
                <div className="text-xs text-gray-500 mt-1">{t(labelKey)}</div>
              </div>
            )}
          </div>
        </section>

        {/* Mission & Values */}
        <section className="py-16 bg-[#0a1628] px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <Target className="w-10 h-10 text-shield-green mx-auto mb-4" />
              <h2 className="font-poppins font-bold text-3xl text-white mb-3">{t('about_values_title')}</h2>
              <p className="text-gray-400">{t('about_values_subtitle')}</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {VALUES.map(({ icon: IconComp, titleKey, descKey, color, bg }) =>
              <div key={titleKey} className="bg-shield-card border border-shield-border rounded-2xl p-6 hover:border-shield-green/20 transition-all">
                  <div className={`w-12 h-12 rounded-xl ${bg} flex items-center justify-center mb-4`}>
                    <IconComp className={`w-6 h-6 ${color}`} />
                  </div>
                  <h3 className="font-poppins font-bold text-white mb-2">{t(titleKey)}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{t(descKey)}</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Team */}
        


















        

        {/* CTA */}
        <section className="py-16 px-4 bg-[#0a1628]">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-poppins font-bold text-3xl text-white mb-4">{t('about_cta_title')}</h2>
            <p className="text-gray-400 mb-8">{t('about_cta_subtitle')}</p>
            <Link
              to="/app"
              className="inline-flex items-center gap-2 px-8 py-4 bg-shield-green text-black font-bold rounded-2xl hover:bg-green-400 transition-all btn-glow">
              
              <Shield className="w-5 h-5" />
              {t('about_cta_btn')}
            </Link>
          </div>
        </section>
      </div>
      <Footer lang={lang} />
    </div>);

}