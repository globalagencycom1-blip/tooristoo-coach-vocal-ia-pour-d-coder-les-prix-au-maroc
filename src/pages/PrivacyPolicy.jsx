import React from 'react';
import { Shield, Mic, Database, Eye, Trash2, Lock, Globe, Mail, Cookie, UserCheck, AlertTriangle, Phone } from 'lucide-react';
import { useLang } from '../lib/LanguageContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const SECTIONS_FR = [
  {
    icon: UserCheck,
    title: "1. Identité du responsable de traitement",
    content: `La présente politique de confidentialité s'applique au service Tooristoo, édité par HCEE, société basée en France.

**Responsable de traitement :** HCEE — Azeddine M.
**Adresse :** 10 rue du Colisée, 75008 Paris, France
**Email DPO :** contact@tooristoo.com`
  },
  {
    icon: Database,
    title: "2. Données collectées et finalités",
    content: `Nous collectons les catégories de données suivantes :

**a) Données de compte :** adresse email, nom complet, langue préférée. Base légale : exécution du contrat (Art. 6.1.b RGPD).

**b) Données vocales et transcriptions :** lorsque vous utilisez le coach vocal, votre microphone capture votre voix. La reconnaissance vocale est traitée localement dans votre navigateur via l'API Web Speech. Seul le texte transcrit (jamais l'audio brut) est transmis à nos serveurs pour analyse IA. Base légale : consentement explicite (Art. 6.1.a RGPD) — vous devez activer le micro.

**c) Données de négociation :** catégorie de service, ville, prix demandé, analyse IA, résultat de la négociation. Base légale : exécution du contrat (Art. 6.1.b RGPD).

**d) Données d'usage :** logs de connexion, adresse IP, type d'appareil, langue du navigateur. Base légale : intérêt légitime (Art. 6.1.f RGPD) — sécurité et prévention de la fraude.

**e) Signalements d'arnaques :** descriptions d'arnaques soumises volontairement. Base légale : consentement (Art. 6.1.a RGPD).`
  },
  {
    icon: Mic,
    title: "3. Traitement des données vocales — obligations spécifiques",
    content: `Le traitement de données vocales fait l'objet de protections renforcées conformément aux lignes directrices du Comité européen de la protection des données (CEPD).

**Ce que nous faisons :**
• La reconnaissance vocale est effectuée localement dans votre navigateur (API Web Speech du W3C)
• Seul le texte transcrit est envoyé à notre infrastructure
• Aucun fichier audio n'est stocké sur nos serveurs
• Les transcriptions sont conservées uniquement le temps du traitement IA (moins de 60 secondes), puis seul le résultat structuré est sauvegardé

**Ce que nous ne faisons pas :**
• Nous ne stockons jamais d'enregistrements audio
• Nous ne partageons pas vos transcriptions vocales à des fins publicitaires
• Nous n'effectuons pas de reconnaissance vocale biométrique (identification de locuteur)

**Votre droit de retrait :** vous pouvez révoquer l'accès au microphone à tout moment via les paramètres de votre navigateur. Cela désactivera uniquement la fonction vocale, sans affecter les autres fonctionnalités.`
  },
  {
    icon: Globe,
    title: "4. Transferts hors Union européenne",
    content: `Nos serveurs sont hébergés dans l'Union européenne. Certains sous-traitants peuvent traiter des données hors UE :

• **Services IA (analyse de texte) :** des fournisseurs d'IA soumis aux clauses contractuelles types (CCT) approuvées par la Commission européenne (Art. 46 RGPD).
• **Infrastructure cloud :** hébergement certifié ISO 27001, avec DPA (Data Processing Agreement) en place.

Aucun transfert n'est effectué vers des pays ne bénéficiant pas d'une décision d'adéquation sans mise en place de garanties appropriées.`
  },
  {
    icon: Lock,
    title: "5. Durées de conservation",
    content: `Nous appliquons le principe de minimisation des données (Art. 5.1.e RGPD) :

• **Données de compte :** conservées pendant toute la durée de l'abonnement actif + 3 ans après résiliation (obligations comptables)
• **Données de négociation :** conservées 24 mois, puis anonymisées pour des fins statistiques
• **Transcriptions textuelles :** conservées uniquement pendant l'analyse (< 60 secondes), le résultat est conservé 24 mois
• **Logs de connexion :** 12 mois (exigence légale française)
• **Signalements d'arnaques :** conservés 36 mois ou jusqu'à demande de suppression
• **Données après suppression de compte :** suppression complète sous 30 jours, sauf obligations légales`
  },
  {
    icon: Eye,
    title: "6. Partage des données",
    content: `Vos données ne sont jamais vendues. Elles peuvent être partagées uniquement avec :

• **Sous-traitants techniques :** hébergement, envoi d'emails transactionnels, analyse IA — liés par des DPA conformes RGPD
• **Autorités publiques :** uniquement sur réquisition judiciaire ou obligation légale
• **En cas de cession d'entreprise :** vous serez notifié 30 jours avant tout transfert de données à un repreneur, avec droit d'opposition

Nous ne transmettons jamais vos données à des réseaux publicitaires, data brokers ou partenaires commerciaux.`
  },
  {
    icon: UserCheck,
    title: "7. Vos droits RGPD",
    content: `Conformément au Règlement (UE) 2016/679, vous disposez des droits suivants :

• **Droit d'accès (Art. 15) :** obtenir une copie de toutes vos données
• **Droit de rectification (Art. 16) :** corriger des données inexactes
• **Droit à l'effacement (Art. 17) :** demander la suppression de vos données ("droit à l'oubli")
• **Droit à la limitation (Art. 18) :** suspendre le traitement sans suppression
• **Droit à la portabilité (Art. 20) :** recevoir vos données dans un format structuré (JSON/CSV)
• **Droit d'opposition (Art. 21) :** s'opposer au traitement fondé sur l'intérêt légitime
• **Droit de retrait du consentement :** à tout moment, sans effet rétroactif

**Pour exercer vos droits :** contact@tooristoo.com — Réponse sous 30 jours (Art. 12 RGPD).

**Réclamation :** vous avez le droit de déposer une plainte auprès de la CNIL (Commission Nationale de l'Informatique et des Libertés) — www.cnil.fr — 3 Place de Fontenoy, 75007 Paris.`
  },
  {
    icon: Cookie,
    title: "8. Cookies et traceurs",
    content: `Nous utilisons des cookies conformément à la directive ePrivacy (transposée en droit français par la loi Informatique et Libertés) et aux recommandations CNIL de 2020.

**Cookies strictement nécessaires (pas de consentement requis) :**
• Session d'authentification (durée : session)
• Préférence de langue (durée : 12 mois)
• Paramètres de consentement cookies (durée : 13 mois maximum — CNIL)

**Cookies d'analyse (consentement requis) :**
• Mesure d'audience anonymisée pour améliorer le service

**Aucun cookie publicitaire ou de profilage** n'est utilisé sur Tooristoo.

Vous pouvez gérer vos préférences via le bandeau cookies ou les paramètres de votre navigateur.`
  },
  {
    icon: AlertTriangle,
    title: "9. Sécurité des données",
    content: `Nous mettons en œuvre des mesures techniques et organisationnelles conformes à l'Art. 32 RGPD :

• Chiffrement TLS 1.3 en transit, AES-256 au repos
• Accès aux données restreint par rôle (RBAC)
• Authentification forte (MFA) pour les accès administrateurs
• Tests de pénétration annuels
• Procédure de notification de violation sous 72h à la CNIL (Art. 33 RGPD)
• Registre des activités de traitement tenu à jour (Art. 30 RGPD)`
  },
  {
    icon: Phone,
    title: "10. Contact et DPO",
    content: `Pour toute question relative à la protection de vos données personnelles :

**Email :** contact@tooristoo.com
**Courrier :** HCEE — Protection des données, 10 rue du Colisée, 75008 Paris

Nous nous engageons à répondre à toute demande dans un délai maximum de 30 jours calendaires. En cas de demande complexe, ce délai peut être prolongé de 2 mois supplémentaires, avec notification.

**Dernière mise à jour :** Mai 2026
**Version :** 2.0 — conforme RGPD (UE) 2016/679`
  }
];

export default function PrivacyPolicy() {
  const { lang } = useLang();

  // For now, full French content — other languages fallback gracefully
  const sections = SECTIONS_FR;

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
            <Shield className="w-4 h-4" />
            Politique de confidentialité — RGPD
          </div>
          <h1 className="font-poppins font-black text-4xl md:text-5xl text-white mb-4">
            Protection de vos données
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Conformément au Règlement (UE) 2016/679 (RGPD) et à la loi Informatique et Libertés
          </p>
        </div>

        {/* RGPD Badge */}
        <div className="bg-shield-green/10 border border-shield-green/30 rounded-2xl p-6 mb-8 flex items-start gap-4">
          <Shield className="w-8 h-8 text-shield-green flex-shrink-0 mt-1" />
          <div>
            <p className="text-shield-green font-semibold mb-1">Service conforme RGPD</p>
            <p className="text-gray-400 text-sm">Tooristoo traite des données vocales. Ce traitement fait l'objet de protections renforcées détaillées à la section 3. Aucun audio n'est stocké sur nos serveurs.</p>
          </div>
        </div>

        {/* Sections */}
        <div className="space-y-6">
          {sections.map((section, idx) => {
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
          <p className="text-gray-600 text-sm mt-2">Pour exercer vos droits : <a href="mailto:contact@tooristoo.com" className="text-shield-green hover:underline">contact@tooristoo.com</a></p>
          <p className="text-gray-600 text-sm mt-1">Autorité de contrôle : <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-shield-green hover:underline">CNIL — www.cnil.fr</a></p>
        </div>
      </div>
      <Footer lang={lang} />
    </div>
  );
}