import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle, Shield } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useLang } from '../lib/LanguageContext';

const FAQS = [
  {
    cat: 'Général',
    items: [
      {
        q: "Qu'est-ce que NegoShield AI ?",
        a: "NegoShield AI est un coach vocal intelligent conçu pour les touristes au Maroc. Il analyse les prix en temps réel, détecte les arnaques et vous guide pour négocier comme un local — dans votre langue.",
      },
      {
        q: "Dans quelles villes NegoShield AI fonctionne-t-il ?",
        a: "NegoShield AI couvre toutes les grandes villes touristiques du Maroc : Marrakech, Fès, Casablanca, Tanger, Agadir, Chefchaouen, Rabat, Essaouira, Meknès et Ouarzazate.",
      },
      {
        q: "Quelles langues sont supportées ?",
        a: "L'application supporte 6 langues : Français, English, Español, Deutsch, العربية et Darija (dialecte marocain). Vous pouvez changer de langue à tout moment via le sélecteur en haut de l'écran.",
      },
    ],
  },
  {
    cat: 'Fonctionnalités',
    items: [
      {
        q: "Comment fonctionne l'analyse vocale ?",
        a: "Appuyez sur le bouton micro, décrivez oralement la situation (ex : 'Un taxi me demande 300 MAD pour aller à Guéliz'). L'IA analyse la demande, la compare aux prix réels du marché et vous fournit une analyse complète avec stratégie de négociation.",
      },
      {
        q: "Comment NegoShield AI détecte-t-il les arnaques ?",
        a: "Notre IA est entraînée sur des milliers de données de prix réels au Maroc. Quand un prix dépasse significativement la fourchette habituelle pour une prestation donnée, le système déclenche une alerte arnaque avec le niveau de risque.",
      },
      {
        q: "Puis-je utiliser l'application sans connexion internet ?",
        a: "Oui ! NegoShield AI sauvegarde automatiquement toutes vos négociations en local sur votre appareil (IndexedDB). Vos données sont synchronisées avec le serveur dès que la connexion est rétablie.",
      },
      {
        q: "Qu'est-ce que la phrase recommandée ?",
        a: "C'est une formulation exacte, traduite dans votre langue, que vous pouvez dire directement au prestataire pour amorcer la négociation avec assertivité et respect des codes culturels marocains.",
      },
    ],
  },
  {
    cat: 'Tarifs & Abonnements',
    items: [
      {
        q: "Le plan gratuit est-il vraiment gratuit ?",
        a: "Oui, totalement gratuit, sans carte de crédit. Il inclut 3 analyses IA par mois, accès aux prix de référence et détection d'arnaques de base.",
      },
      {
        q: "Quelle est la différence entre Voyageur et Pro ?",
        a: "Le plan Voyageur (9,99€/mois) offre analyses illimitées, stratégies avancées et accès aux prestataires certifiés. Le plan Pro (24,99€/mois) ajoute le mode hors-ligne avancé, les rapports de voyage et une assistance prioritaire.",
      },
      {
        q: "Puis-je annuler mon abonnement à tout moment ?",
        a: "Absolument. Vous pouvez annuler votre abonnement à tout moment depuis votre espace compte, sans frais ni engagement.",
      },
    ],
  },
  {
    cat: 'Sécurité & Confidentialité',
    items: [
      {
        q: "Mes données sont-elles sécurisées ?",
        a: "Oui. Toutes vos données sont chiffrées en transit et au repos. Nous ne revendons jamais vos données personnelles à des tiers. Vos analyses sont privées et accessibles uniquement à vous.",
      },
      {
        q: "L'application enregistre-t-elle mes conversations ?",
        a: "La reconnaissance vocale est traitée localement sur votre appareil ou via l'API Speech du navigateur. Seul le transcript textuel est envoyé à notre IA pour analyse. Aucun audio n'est stocké sur nos serveurs.",
      },
    ],
  },
];

function FAQItem({ item }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={`border rounded-xl overflow-hidden transition-all cursor-pointer ${
        open ? 'border-shield-green/40 bg-shield-green/5' : 'border-shield-border bg-shield-card hover:border-shield-green/20'
      }`}
      onClick={() => setOpen(o => !o)}
    >
      <div className="flex items-center justify-between px-5 py-4 gap-4">
        <span className="text-white font-medium text-sm leading-snug">{item.q}</span>
        {open
          ? <ChevronUp className="w-4 h-4 text-shield-green flex-shrink-0" />
          : <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" />
        }
      </div>
      {open && (
        <div className="px-5 pb-5 text-gray-400 text-sm leading-relaxed border-t border-shield-border/50">
          <p className="pt-4">{item.a}</p>
        </div>
      )}
    </div>
  );
}

export default function FAQ() {
  const { lang } = useLang();

  return (
    <div className="min-h-screen bg-shield-dark">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 pt-28 pb-20">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-shield-green/10 border border-shield-green/30 rounded-full text-shield-green text-sm font-medium mb-6">
            <HelpCircle className="w-4 h-4" />
            Centre d'aide
          </div>
          <h1 className="font-poppins font-black text-4xl md:text-5xl text-white mb-4">
            Questions <span className="text-gradient-green">fréquentes</span>
          </h1>
          <p className="text-gray-400 text-lg">
            Tout ce que vous devez savoir sur NegoShield AI
          </p>
        </div>

        {/* FAQ categories */}
        <div className="space-y-10">
          {FAQS.map(cat => (
            <div key={cat.cat}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-1 h-5 bg-shield-green rounded-full" />
                <h2 className="font-poppins font-bold text-white text-lg">{cat.cat}</h2>
              </div>
              <div className="space-y-3">
                {cat.items.map((item, i) => <FAQItem key={i} item={item} />)}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 p-8 bg-shield-card border border-shield-border rounded-2xl text-center">
          <Shield className="w-10 h-10 text-shield-green mx-auto mb-4" />
          <h3 className="font-poppins font-bold text-white text-xl mb-2">Vous n'avez pas trouvé votre réponse ?</h3>
          <p className="text-gray-400 text-sm mb-6">Notre équipe est disponible pour vous aider</p>
          <a
            href="mailto:support@negoshield.ai"
            className="inline-flex items-center gap-2 px-6 py-3 bg-shield-green text-black font-bold rounded-xl hover:bg-green-400 transition-all btn-glow"
          >
            Contacter le support
          </a>
        </div>
      </div>
      <Footer lang={lang} />
    </div>
  );
}