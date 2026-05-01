import React from 'react';
import { Shield, FileText, AlertTriangle, Scale, UserCheck, CreditCard, Ban, Gavel, Phone, RefreshCw } from 'lucide-react';
import { useLang } from '../lib/LanguageContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const SECTIONS_FR = [
  {
    icon: Shield,
    title: "1. Présentation du service",
    content: `**Éditeur :** HCEE, société basée en France
**Directeur de publication :** Azeddine M.
**Adresse :** 10 rue du Colisée, 75008 Paris, France
**Email :** contact@tooristoo.com
**Hébergement :** Union européenne

Tooristoo est un service d'aide à la décision pour touristes au Maroc. Il fournit des analyses de prix par intelligence artificielle, des conseils de négociation et des alertes anti-arnaques. Ce service est fourni à titre indicatif uniquement.`
  },
  {
    icon: UserCheck,
    title: "2. Acceptation des conditions et capacité juridique",
    content: `L'utilisation du service Tooristoo implique l'acceptation pleine et entière des présentes Conditions Générales d'Utilisation (CGU).

**Conditions d'accès :**
• Être âgé d'au moins 18 ans (ou avoir l'autorisation parentale)
• Posséder la pleine capacité juridique pour contracter
• Ne pas être interdit d'accès au service suite à une violation antérieure des CGU
• Disposer d'un accès internet valide

Ces CGU peuvent être modifiées à tout moment. Les utilisateurs seront informés de toute modification substantielle par email ou notification in-app, avec un préavis de 15 jours. L'utilisation continue du service après modification vaut acceptation.`
  },
  {
    icon: FileText,
    title: "3. Description du service et limites",
    content: `Tooristoo propose les fonctionnalités suivantes selon le plan souscrit :

**Plan Gratuit :** 3 analyses IA par mois, détection d'arnaques de base, 1 langue
**Plan Voyageur (5€/mois) :** analyses illimitées, coach vocal, 6 langues, prestataires certifiés, historique 30 jours
**Plan Pro (12€/mois) :** tout le plan Voyageur + analytics avancés, support prioritaire, accès API, historique illimité

**AVERTISSEMENT IMPORTANT :** Les analyses fournies par Tooristoo sont basées sur des données statistiques de marché et de l'intelligence artificielle. Elles constituent une aide à la décision, non une garantie. Tooristoo ne peut être tenu responsable des résultats de vos négociations. Les prix peuvent varier selon la saison, la localisation précise et de nombreux autres facteurs.`
  },
  {
    icon: Ban,
    title: "4. Utilisations interdites",
    content: `Il est strictement interdit d'utiliser Tooristoo pour :

**Activités illégales :**
• Négociation de produits ou services illégaux (drogues, armes, contrefaçons, etc.)
• Blanchiment d'argent ou financement d'activités criminelles
• Toute activité contraire à la législation marocaine, française ou internationale

**Utilisation abusive du service :**
• Tentative de contournement des mesures de sécurité ou d'authentification
• Extraction massive de données (scraping) par des moyens automatisés
• Revente ou redistribution non autorisée du contenu ou des analyses
• Usurpation d'identité ou fourniture de fausses informations
• Soumission de signalements d'arnaques malveillants ou délibérément faux
• Utilisation du service à des fins de harcèlement envers des prestataires

Le non-respect de ces interdictions entraîne la suspension immédiate du compte, sans remboursement, et peut faire l'objet de poursuites judiciaires.`
  },
  {
    icon: CreditCard,
    title: "5. Conditions financières et abonnements",
    content: `**Facturation :** Les abonnements sont facturés mensuellement par avance. Les prix s'entendent TTC.

**Renouvellement automatique :** Les abonnements se renouvellent automatiquement à échéance. Vous serez notifié 7 jours avant chaque renouvellement.

**Résiliation :** Vous pouvez résilier votre abonnement à tout moment depuis votre espace compte. La résiliation prend effet à la fin de la période en cours, sans remboursement au prorata pour la période restante, sauf en cas de manquement de notre part.

**Droit de rétractation (Art. L221-18 Code de la consommation) :** Pour tout abonnement souscrit en ligne, vous disposez d'un délai de 14 jours pour exercer votre droit de rétractation, sauf si vous avez expressément demandé l'exécution du service avant l'expiration du délai.

**Modification tarifaire :** Toute modification de prix sera communiquée 30 jours à l'avance. Vous pourrez résilier sans frais si vous refusez le nouveau tarif.`
  },
  {
    icon: Scale,
    title: "6. Responsabilité et garanties",
    content: `**Limitation de responsabilité :**
Tooristoo fournit ses analyses "en l'état" et ne garantit pas leur exactitude ou leur adéquation à une situation particulière. La responsabilité de Tooristoo est limitée au montant payé par l'utilisateur au cours des 12 derniers mois.

**Force majeure :** Tooristoo ne saurait être tenu responsable en cas d'interruption du service due à un cas de force majeure (panne générale d'internet, catastrophe naturelle, actes de gouvernement, etc.).

**Disponibilité du service :** Nous nous engageons à maintenir une disponibilité de 99% par mois (hors maintenance planifiée), sans toutefois garantir un service ininterrompu. Les maintenances planifiées seront annoncées 48h à l'avance.

**Propriété intellectuelle :** Le contenu de Tooristoo (textes, algorithmes, bases de données de prix, interface) est protégé par le droit d'auteur. Toute reproduction non autorisée est interdite.`
  },
  {
    icon: UserCheck,
    title: "7. Comptes utilisateurs",
    content: `**Création de compte :** Vous êtes responsable de l'exactitude des informations fournies lors de l'inscription et de la confidentialité de vos identifiants.

**Sécurité :** Tout accès à votre compte avec vos identifiants est réputé effectué par vous. En cas de suspicion d'accès non autorisé, contactez-nous immédiatement à contact@tooristoo.com.

**Compte inactif :** Tout compte sans connexion pendant 24 mois consécutifs pourra être clôturé après notification préalable de 30 jours par email.

**Suspension et résiliation de compte :** Nous nous réservons le droit de suspendre ou résilier tout compte en cas de violation des présentes CGU, de comportement abusif, ou de fraude, après notification (sauf urgence ou fraude grave).`
  },
  {
    icon: AlertTriangle,
    title: "8. Signalements et contenu utilisateur",
    content: `Les signalements d'arnaques soumis par les utilisateurs constituent du contenu généré par l'utilisateur. En soumettant un signalement, vous déclarez que :

• Les informations sont véridiques à votre connaissance
• Vous n'avez pas l'intention de nuire à un prestataire de manière malveillante
• Vous acceptez que ce signalement soit modéré et potentiellement publié de façon anonymisée

Tooristoo se réserve le droit de supprimer tout contenu inapproprié, inexact ou abusif sans préavis. La soumission de faux signalements délibérés constitue une faute grave pouvant entraîner des poursuites civiles.`
  },
  {
    icon: RefreshCw,
    title: "9. Modifications du service",
    content: `Tooristoo se réserve le droit de modifier, suspendre ou interrompre tout ou partie du service :

• **Modifications mineures :** sans préavis (corrections de bugs, améliorations UX)
• **Modifications substantielles :** avec préavis de 15 jours minimum
• **Arrêt du service :** avec préavis de 3 mois minimum pour les abonnés payants, incluant un remboursement au prorata

En cas d'interruption non programmée dépassant 72 heures, les abonnés payants seront indemnisés par un crédit équivalent sur leur prochain mois.`
  },
  {
    icon: Gavel,
    title: "10. Droit applicable et résolution des litiges",
    content: `**Droit applicable :** Les présentes CGU sont régies par le droit français.

**Médiation (obligatoire avant toute action judiciaire) :** En cas de litige, vous pouvez recourir gratuitement à la médiation de la consommation. Nous sommes adhérents à un service de médiation conformément à l'Art. L612-1 du Code de la consommation. Contact : contact@tooristoo.com

**Plateforme de règlement en ligne des litiges (RLL) :** Conformément au règlement (UE) n°524/2013, vous pouvez soumettre votre litige sur la plateforme européenne : https://ec.europa.eu/consumers/odr

**Juridiction compétente :** En l'absence de résolution amiable, le Tribunal de Commerce de Paris sera compétent pour tout litige entre professionnels. Pour les consommateurs, la juridiction compétente est celle du domicile du défendeur.

**Dernière mise à jour :** Mai 2026 — Version 2.0`
  },
  {
    icon: Phone,
    title: "11. Contact",
    content: `Pour toute question relative aux présentes CGU :

**Email :** contact@tooristoo.com
**Courrier :** HCEE — Service juridique, 10 rue du Colisée, 75008 Paris, France

Nous nous engageons à répondre à toute demande dans un délai de 5 jours ouvrés.`
  }
];

export default function Terms() {
  const { lang } = useLang();

  const renderContent = (content) => {
    return content.split('\n\n').map((block, i) => (
      <div key={i} className="mb-3">
        {block.split('\n').map((line, j) => {
          if (line.startsWith('**') && line.endsWith('**')) {
            return <p key={j} className="font-semibold text-white mt-3 mb-1">{line.replace(/\*\*/g, '')}</p>;
          }
          if (line.startsWith('• ')) {
            return <div key={j} className="flex gap-2 ml-2 mb-1"><span className="text-shield-green flex-shrink-0">•</span><span>{formatInline(line.slice(2))}</span></div>;
          }
          if (line.trim() === '') return null;
          return <p key={j}>{formatInline(line)}</p>;
        })}
      </div>
    ));
  };

  const formatInline = (text) => {
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, i) =>
      part.startsWith('**') && part.endsWith('**')
        ? <strong key={i} className="text-white font-semibold">{part.slice(2, -2)}</strong>
        : part
    );
  };

  return (
    <div className="min-h-screen bg-shield-dark">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 pt-28 pb-16">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-shield-green/10 border border-shield-green/30 rounded-full text-shield-green text-sm font-medium mb-4">
            <FileText className="w-4 h-4" />
            Conditions Générales d'Utilisation
          </div>
          <h1 className="font-poppins font-black text-4xl md:text-5xl text-white mb-4">
            CGU — Tooristoo
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Version 2.0 — Mai 2026 — Conformes au droit français et européen
          </p>
        </div>

        {/* Warning box */}
        <div className="bg-yellow-900/20 border border-yellow-600/30 rounded-2xl p-6 mb-8 flex items-start gap-4">
          <AlertTriangle className="w-6 h-6 text-yellow-500 flex-shrink-0 mt-1" />
          <div>
            <p className="text-yellow-400 font-semibold mb-1">Service d'aide à la décision — non contraignant</p>
            <p className="text-gray-400 text-sm">Les analyses de Tooristoo sont fournies à titre indicatif. Elles ne constituent pas un conseil juridique ou financier. Vous restez seul responsable de vos décisions de négociation.</p>
          </div>
        </div>

        {/* Sections */}
        <div className="space-y-6">
          {SECTIONS_FR.map((section, idx) => {
            const Icon = section.icon;
            return (
              <div key={idx} className="bg-shield-card border border-shield-border rounded-2xl p-8 hover:border-shield-green/30 transition-all">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-shield-green/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-shield-green" />
                  </div>
                  <h2 className="font-poppins font-bold text-xl text-white pt-1">{section.title}</h2>
                </div>
                <div className="text-gray-300 text-sm leading-relaxed ml-14">
                  {renderContent(section.content)}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="text-center mt-12 pt-8 border-t border-shield-border">
          <p className="text-gray-500 text-xs">Dernière mise à jour : Mai 2026 — Version 2.0</p>
          <p className="text-gray-600 text-sm mt-2">Questions : <a href="mailto:contact@tooristoo.com" className="text-shield-green hover:underline">contact@tooristoo.com</a></p>
        </div>
      </div>
      <Footer lang={lang} />
    </div>
  );
}