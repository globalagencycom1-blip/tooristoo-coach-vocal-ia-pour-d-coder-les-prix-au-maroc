import React from 'react';
import { AlertTriangle, CheckCircle, Shield, X } from 'lucide-react';
import Navbar from '../components/Navbar';
import { useLang } from '../lib/LanguageContext';

const ALERTS = [
  {
    color: 'yellow',
    title: 'Prix gonflés pour les étrangers',
    badge: 'FRÉQUENT',
    badgeColor: 'red',
    description: 'Dans les souks et les taxis, les prix peuvent être 2 à 5 fois plus élevés que le tarif local. Demandez toujours le prix avant d\'acheter ou de monter.',
    tip: 'Demandez le prix à plusieurs vendeurs avant d\'acheter pour comparer.',
  },
  {
    color: 'yellow',
    title: 'Faux guides dans la Médina',
    badge: 'ATTENTION',
    badgeColor: 'orange',
    description: 'Ces personnes se présentent comme guides officiels mais ne le sont pas. Ils vous emmènent vers des boutiques partenaires et prennent une commission.',
    tip: 'Demandez la carte officielle du guide ou réservez via votre hôtel.',
  },
  {
    color: 'yellow',
    title: 'Taxis sans compteur',
    badge: 'FRÉQUENT',
    badgeColor: 'red',
    description: 'Certains taxis refusent d\'utiliser le compteur et proposent un tarif fixe très élevé. Le compteur est obligatoire en ville.',
    tip: 'Insistez pour le compteur ou négociez le prix avant de monter.',
  },
  {
    color: 'yellow',
    title: 'Restaurants avec carte sans prix',
    badge: 'ATTENTION',
    badgeColor: 'orange',
    description: 'Certains restaurants ne montrent pas les prix ou apportent une carte différente aux touristes avec des prix gonflés.',
    tip: 'Demandez toujours une carte avec les prix affichés avant de commander.',
  },
  {
    color: 'red',
    title: 'Faux sites de réservation',
    badge: 'DANGER',
    badgeColor: 'red',
    description: 'Des sites web imitent les plateformes officielles pour voler vos données bancaires et votre argent.',
    tip: 'Réservez uniquement sur des plateformes connues et vérifiez l\'URL.',
  },
  {
    color: 'red',
    title: 'Acomptes sans confirmation',
    badge: 'DANGER',
    badgeColor: 'red',
    description: 'On vous demande un acompte en espèces pour une excursion ou un service sans aucun reçu ou confirmation écrite.',
    tip: 'Ne payez jamais sans confirmation écrite. Privilégiez le paiement à l\'arrivée.',
  },
  {
    color: 'yellow',
    title: 'Change de monnaie informel',
    badge: 'ATTENTION',
    badgeColor: 'orange',
    description: 'Des personnes proposent de changer votre argent dans la rue à un taux avantageux, souvent avec des billets contrefaits.',
    tip: 'Changez uniquement dans les bureaux de change officiels ou les banques.',
  },
  {
    color: 'yellow',
    title: 'Prix au poids trompeur',
    badge: 'ATTENTION',
    badgeColor: 'orange',
    description: 'Dans les marchés, le poids affiché sur la balance peut être manipulé pour gonfler le prix.',
    tip: 'Pesez sur votre propre balance de voyage si possible.',
  },
];

const QUICK_ALERTS = [
  'Méfiez-vous des prix trop élevés pour les étrangers',
  'Vérifiez toujours le prix avant de monter / acheter',
  'Évitez les guides non officiels dans la rue',
  'Ne donnez jamais d\'acompte sans confirmation',
  'Faites attention aux faux sites de réservation',
];

const badgeColors = {
  red: 'bg-red-500/20 text-red-400 border border-red-500/30',
  orange: 'bg-orange-500/20 text-orange-400 border border-orange-500/30',
};

export default function Alerts() {
  const { lang } = useLang();

  return (
    <div className="min-h-screen bg-shield-dark">
      <Navbar />
      <div className="max-w-2xl mx-auto px-4 pt-24 pb-20">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Shield className="w-6 h-6 text-red-400" />
            <h1 className="font-poppins font-black text-2xl text-white">Alertes Anti-Arnaques</h1>
          </div>
          <p className="text-gray-400 text-sm">Protégez-vous pendant votre séjour 🇲🇦</p>
        </div>

        {/* Detailed alerts */}
        <div id="details" className="space-y-4">
          {ALERTS.map((alert, i) => (
            <div key={i} className="bg-shield-card border border-shield-border rounded-2xl p-5 hover:border-shield-border/80 transition-all">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    alert.color === 'red' ? 'bg-red-500/15' : 'bg-yellow-500/15'
                  }`}>
                    <AlertTriangle className={`w-4 h-4 ${alert.color === 'red' ? 'text-red-400' : 'text-yellow-400'}`} />
                  </div>
                  <h3 className="font-poppins font-bold text-white text-sm">{alert.title}</h3>
                </div>
                <span className={`text-xs font-bold px-2 py-1 rounded-lg flex-shrink-0 ml-2 ${badgeColors[alert.badgeColor]}`}>
                  {alert.badge}
                </span>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed mb-3 pl-12">{alert.description}</p>
              <div className="flex items-start gap-2 pl-12">
                <CheckCircle className="w-3.5 h-3.5 text-shield-green flex-shrink-0 mt-0.5" />
                <p className="text-xs text-shield-green leading-relaxed">{alert.tip}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-8 p-5 bg-shield-green/10 border border-shield-green/20 rounded-2xl text-center">
          <Shield className="w-8 h-8 text-shield-green mx-auto mb-2" />
          <p className="text-white font-semibold text-sm mb-1">Utilisez NegoShield AI</p>
          <p className="text-gray-400 text-xs mb-4">Analysez chaque situation en temps réel pour éviter les arnaques</p>
          <a href="/app" className="inline-flex items-center gap-2 px-6 py-2.5 bg-shield-green text-black font-bold text-sm rounded-xl hover:bg-green-400 transition-all btn-glow">
            Analyser maintenant
          </a>
        </div>

      </div>
    </div>
  );
}