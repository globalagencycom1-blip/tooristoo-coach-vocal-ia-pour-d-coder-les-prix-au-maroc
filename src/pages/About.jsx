import React from 'react';
import { Shield, Target, Heart, Users, Zap, Globe, Award, TrendingDown } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useLang } from '../lib/LanguageContext';
import { Link } from 'react-router-dom';

const TEAM = [
  { name: 'Youssef Benali', role: 'CEO & Fondateur', flag: '🇲🇦', bio: 'Ex-guide touristique à Marrakech, il a vécu des centaines de situations d'arnaques. Il a créé NegoShield pour que plus aucun touriste ne se fasse surfacturer.' },
  { name: 'Sophie Martin', role: 'CTO', flag: '🇫🇷', bio: 'Ingénieure IA spécialisée en NLP. Passionnée par l\'usage de la technologie pour résoudre des problèmes réels du quotidien.' },
  { name: 'Carlos Ruiz', role: 'Head of Product', flag: '🇪🇸', bio: 'Designer UX & product manager. A voyagé dans 40 pays et compris l\'importance d\'un outil de protection pour les voyageurs.' },
  { name: 'Amina Ouzzani', role: 'Responsable Partenariats', flag: '🇲🇦', bio: 'Développe le réseau de prestataires certifiés partout au Maroc, garantissant prix justes et qualité de service.' },
];

const VALUES = [
  { icon: Shield, title: 'Protection', desc: 'Chaque touriste mérite d'être protégé. Notre mission est de vous donner les outils pour voyager en toute confiance.', color: 'text-shield-green', bg: 'bg-shield-green/10' },
  { icon: Heart, title: 'Respect', desc: 'Nous respectons la culture marocaine et aidons les touristes à interagir avec respect et connaissance des codes locaux.', color: 'text-red-400', bg: 'bg-red-500/10' },
  { icon: Zap, title: 'Innovation', desc: 'Nous utilisons l'IA de pointe pour fournir des analyses précises, en temps réel, dans 6 langues différentes.', color: 'text-shield-gold', bg: 'bg-shield-gold/10' },
  { icon: Globe, title: 'Accessibilité', desc: 'NegoShield est conçu pour être simple, intuitif et utilisable par n\'importe qui, même sans compétences techniques.', color: 'text-blue-400', bg: 'bg-blue-500/10' },
];

const STATS = [
  { icon: Users, value: '50 000+', label: 'Voyageurs protégés', color: 'text-shield-green' },
  { icon: TrendingDown, value: '2 350 MAD', label: 'Économies moyennes', color: 'text-shield-gold' },
  { icon: Award, value: '98%', label: 'Taux de détection', color: 'text-blue-400' },
  { icon: Globe, value: '6', label: 'Langues supportées', color: 'text-purple-400' },
];

export default function About() {
  const { lang } = useLang();

  return (
    <div className="min-h-screen bg-shield-dark">
      <Navbar />
      <div className="pt-20">

        {/* Hero */}
        <section className="py-20 px-4 max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-shield-green/10 border border-shield-green/30 rounded-full text-shield-green text-sm font-medium mb-8">
            <Shield className="w-4 h-4" />
            Notre histoire
          </div>
          <h1 className="font-poppins font-black text-4xl md:text-6xl text-white mb-6 leading-tight">
            Né au Maroc,<br />
            <span className="text-gradient-green">pour le monde entier</span>
          </h1>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto leading-relaxed">
            NegoShield AI est né d'une frustration réelle : trop de touristes quittent le Maroc avec le sentiment de s'être fait arnaquer. Nous avons décidé de changer ça.
          </p>
        </section>

        {/* Story */}
        <section className="py-16 bg-[#0a1628]">
          <div className="max-w-4xl mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="font-poppins font-bold text-3xl text-white mb-6">Notre histoire</h2>
                <div className="space-y-4 text-gray-400 leading-relaxed">
                  <p>En 2023, Youssef Benali, ex-guide touristique à Marrakech, constate que des milliers de touristes paient chaque jour 2 à 5 fois le prix réel pour des taxis, des riads ou des excursions.</p>
                  <p>Il s'associe avec Sophie Martin, ingénieure en IA, pour créer un assistant vocal capable d'analyser les prix en temps réel et de guider les voyageurs avec des stratégies de négociation adaptées à la culture locale.</p>
                  <p>Après 18 mois de développement et des milliers de données collectées sur le terrain, <span className="text-shield-green font-semibold">NegoShield AI</span> est lancé en 2024 et protège aujourd'hui plus de 50 000 voyageurs.</p>
                </div>
              </div>
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1539650116574-75c0c6d33d08?w=600&h=400&fit=crop"
                  alt="Maroc"
                  className="rounded-2xl w-full object-cover h-64"
                />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-shield-dark/60 to-transparent" />
                <div className="absolute bottom-4 left-4 flex items-center gap-2">
                  <span className="text-3xl">🇲🇦</span>
                  <span className="text-white font-semibold">Fondé à Marrakech</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
            {STATS.map(({ icon: IconComp, value, label, color }) => (
              <div key={label} className="bg-shield-card border border-shield-border rounded-2xl p-6 text-center">
                <IconComp className={`w-6 h-6 mx-auto mb-3 ${color}`} />
                <div className={`font-poppins font-black text-2xl ${color}`}>{value}</div>
                <div className="text-xs text-gray-500 mt-1">{label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Mission & Values */}
        <section className="py-16 bg-[#0a1628] px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <Target className="w-10 h-10 text-shield-green mx-auto mb-4" />
              <h2 className="font-poppins font-bold text-3xl text-white mb-3">Nos valeurs</h2>
              <p className="text-gray-400">Ce qui guide chacune de nos décisions</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {VALUES.map(({ icon: IconComp, title, desc, color, bg }) => (
                <div key={title} className="bg-shield-card border border-shield-border rounded-2xl p-6 hover:border-shield-green/20 transition-all">
                  <div className={`w-12 h-12 rounded-xl ${bg} flex items-center justify-center mb-4`}>
                    <IconComp className={`w-6 h-6 ${color}`} />
                  </div>
                  <h3 className="font-poppins font-bold text-white mb-2">{title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-16 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-poppins font-bold text-3xl text-white mb-3">L'équipe fondatrice</h2>
              <p className="text-gray-400">Des passionnés de voyage et de technologie</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {TEAM.map(member => (
                <div key={member.name} className="bg-shield-card border border-shield-border rounded-2xl p-6 text-center hover:border-shield-green/20 transition-all">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-shield-green/10 border border-shield-green/20 flex items-center justify-center text-3xl">
                    {member.flag}
                  </div>
                  <h3 className="font-poppins font-bold text-white text-sm">{member.name}</h3>
                  <p className="text-shield-green text-xs font-medium mt-1 mb-3">{member.role}</p>
                  <p className="text-gray-500 text-xs leading-relaxed">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-4 bg-[#0a1628]">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-poppins font-bold text-3xl text-white mb-4">Rejoignez la communauté NegoShield</h2>
            <p className="text-gray-400 mb-8">Voyagez au Maroc en toute sérénité</p>
            <Link
              to="/app"
              className="inline-flex items-center gap-2 px-8 py-4 bg-shield-green text-black font-bold rounded-2xl hover:bg-green-400 transition-all btn-glow"
            >
              <Shield className="w-5 h-5" />
              Essayer gratuitement
            </Link>
          </div>
        </section>
      </div>
      <Footer lang={lang} />
    </div>
  );
}