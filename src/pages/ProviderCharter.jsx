import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Shield, CheckCircle, Star, Award, AlertTriangle, Users, Clock, Phone, ExternalLink } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useLang } from '../lib/LanguageContext';

const BASE = 'https://www.tooristoo.com';

const CONTENT = {
  fr: {
    title: 'Charte des Prestataires Certifiés Tooristoo',
    subtitle: 'Les engagements concrets qui distinguent nos partenaires des autres',
    badge: 'Différenciateur clé',
    intro: 'Contrairement aux agrégateurs classiques qui référencent sans vérification, Tooristoo applique une charte d\'engagement stricte. Chaque prestataire certifié a signé et respecte ces 7 engagements.',
    commitments_title: '7 Engagements Certifiés',
    commitments: [
      { icon: '💶', title: 'Prix officiels affichés', desc: 'Le prix annoncé sur Tooristoo est le prix réel pratiqué. Aucune majoration pour les touristes étrangers. Tarifs vérifiés et mis à jour régulièrement par notre équipe.' },
      { icon: '📋', title: 'Pas de frais cachés', desc: 'Aucun supplément non mentionné sur la fiche. TVA incluse, pourboires non obligatoires, suppléments spécifiques clairement indiqués à l\'avance.' },
      { icon: '✅', title: 'Vérification terrain', desc: 'Un membre de l\'équipe Tooristoo a visité et testé le service en personne avant certification. Ré-évaluation annuelle obligatoire.' },
      { icon: '⭐', title: 'Note minimale 3.5/5', desc: 'Seuls les prestataires maintenant une note client ≥ 3,5/5 conservent leur certification. Sous ce seuil : avertissement puis déclassement.' },
      { icon: '📞', title: 'Contact garanti', desc: 'Numéro de téléphone vérifié et opérationnel. Réponse sous 4h aux demandes clients en haute saison touristique.' },
      { icon: '🤝', title: 'Accueil identique pour tous', desc: 'Le même service, la même qualité et les mêmes tarifs affichés pour chaque client, qu\'il soit habitué local ou visiteur étranger.' },
      { icon: '🔔', title: 'Signalement traité', desc: 'En cas de signalement validé par 3 utilisateurs, le prestataire est contacté sous 24h et, si nécessaire, temporairement suspendu le temps d\'investigation.' },
    ],
    process_title: 'Processus de certification',
    process: [
      { step: '1', title: 'Candidature', desc: 'Le prestataire soumet sa candidature avec documents officiels (registre du commerce, numéro de taxe, photos du lieu).' },
      { step: '2', title: 'Vérification documentaire', desc: 'Notre équipe vérifie l\'authenticité des documents et la conformité légale en 48h.' },
      { step: '3', title: 'Visite terrain', desc: 'Un inspecteur Tooristoo visite le lieu en client anonyme et évalue le service réel.' },
      { step: '4', title: 'Certification', desc: 'Si conforme, le prestataire reçoit le badge Tooristoo et est publié sur la plateforme.' },
      { step: '5', title: 'Suivi continu', desc: 'Ré-évaluation annuelle + surveillance des signalements communautaires en temps réel.' },
    ],
    why_title: 'Pourquoi c\'est important pour vous',
    why: [
      { title: 'Voyagez sereinement', desc: 'Avec un prestataire certifié, vous connaissez les prix à l\'avance et pouvez profiter de votre séjour l\'esprit tranquille.' },
      { title: 'Un recours si besoin', desc: 'Si quelque chose ne se passe pas comme prévu, signalez-le — nous prenons en charge la médiation sous 24h.' },
      { title: 'Soutenir l\'économie locale transparente', desc: 'Nos partenaires certifiés sont des acteurs locaux engagés dans une démarche de qualité et de confiance.' },
    ],
    become_title: 'Vous êtes prestataire au Maroc ?',
    become_desc: 'Rejoignez notre réseau certifié. La certification Tooristoo vous donne accès à des milliers de touristes internationaux qualifiés qui cherchent activement des prestataires de confiance.',
    become_btn: 'Postuler à la certification',
    cta_title: 'Prêt à voyager en toute confiance ?',
    cta_btn: 'Voir les prestataires certifiés',
  },
  en: {
    title: 'Tooristoo Certified Provider Charter',
    subtitle: 'The concrete commitments that set our partners apart from the rest',
    badge: 'Key differentiator',
    intro: 'Unlike standard aggregators that list without verification, Tooristoo enforces a strict commitment charter. Each certified provider has signed and respects these 7 commitments.',
    commitments_title: '7 Certified Commitments',
    commitments: [
      { icon: '💶', title: 'Official prices displayed', desc: 'The price listed on Tooristoo is the real price charged. No markup for foreign tourists. Rates verified and regularly updated by our team.' },
      { icon: '📋', title: 'No hidden fees', desc: 'No unmentioned surcharges. VAT included, tips not mandatory, specific supplements clearly stated in advance.' },
      { icon: '✅', title: 'Field verification', desc: 'A Tooristoo team member visited and tested the service in person before certification. Mandatory annual re-evaluation.' },
      { icon: '⭐', title: 'Minimum rating 3.5/5', desc: 'Only providers maintaining a ≥ 3.5/5 customer rating keep their certification. Below this threshold: warning then downgrade.' },
      { icon: '📞', title: 'Guaranteed contact', desc: 'Verified and operational phone number. Response within 4 hours for customer requests during peak tourist season.' },
      { icon: '🤝', title: 'Equal welcome for all', desc: 'The same service, the same quality, and the same listed prices for every customer — whether a regular local or an international visitor.' },
      { icon: '🔔', title: 'Reports handled', desc: 'If a report is validated by 3 users, the provider is contacted within 24 hours and, if necessary, temporarily suspended pending investigation.' },
    ],
    process_title: 'Certification process',
    process: [
      { step: '1', title: 'Application', desc: 'The provider submits their application with official documents (trade register, tax number, venue photos).' },
      { step: '2', title: 'Document verification', desc: 'Our team verifies document authenticity and legal compliance within 48h.' },
      { step: '3', title: 'Field visit', desc: 'A Tooristoo inspector visits the venue as an anonymous customer and evaluates the real service.' },
      { step: '4', title: 'Certification', desc: 'If compliant, the provider receives the Tooristoo badge and is published on the platform.' },
      { step: '5', title: 'Ongoing monitoring', desc: 'Annual re-evaluation + real-time monitoring of community reports.' },
    ],
    why_title: 'Why this matters for you',
    why: [
      { title: 'Travel with peace of mind', desc: 'With a certified provider, you know the prices in advance and can enjoy your stay worry-free.' },
      { title: 'Support if needed', desc: 'If something doesn\'t go as expected, report it — we handle mediation within 24 hours.' },
      { title: 'Support transparent local businesses', desc: 'Our certified partners are local actors committed to quality and trust.' },
    ],
    become_title: 'Are you a provider in Morocco?',
    become_desc: 'Join our certified network. Tooristoo certification gives you access to thousands of qualified international tourists actively seeking trusted providers.',
    become_btn: 'Apply for certification',
    cta_title: 'Ready to travel with confidence?',
    cta_btn: 'See certified providers',
  },
  es: {
    title: 'Carta de Proveedores Certificados Tooristoo',
    subtitle: 'Los compromisos concretos que distinguen a nuestros socios del resto',
    badge: 'Diferenciador clave',
    intro: 'A diferencia de los agregadores clásicos que listan sin verificación, Tooristoo aplica una carta de compromiso estricta. Cada proveedor certificado ha firmado y respeta estos 7 compromisos.',
    commitments_title: '7 Compromisos Certificados',
    commitments: [
      { icon: '💶', title: 'Precios oficiales mostrados', desc: 'El precio en Tooristoo es el precio real practicado. Sin recargo para turistas extranjeros.' },
      { icon: '📋', title: 'Sin cargos ocultos', desc: 'Sin suplementos no mencionados. IVA incluido, propinas no obligatorias.' },
      { icon: '✅', title: 'Verificación en terreno', desc: 'Un miembro del equipo Tooristoo visitó y probó el servicio antes de la certificación.' },
      { icon: '⭐', title: 'Puntuación mínima 3.5/5', desc: 'Solo los proveedores con nota ≥ 3,5/5 mantienen su certificación.' },
      { icon: '📞', title: 'Contacto garantizado', desc: 'Número de teléfono verificado y operacional.' },
      { icon: '🤝', title: 'Acogida igual para todos', desc: 'El mismo servicio, la misma calidad y los mismos precios para cada cliente, sea local habitual o visitante extranjero.' },
      { icon: '🔔', title: 'Reclamaciones tramitadas', desc: 'Si una reclamación es validada por 3 usuarios, el proveedor es contactado en 24h y, si es necesario, suspendido temporalmente.' },
    ],
    process_title: 'Proceso de certificación',
    process: [
      { step: '1', title: 'Candidatura', desc: 'El proveedor envía su solicitud con documentos oficiales.' },
      { step: '2', title: 'Verificación documental', desc: 'Nuestro equipo verifica la autenticidad en 48h.' },
      { step: '3', title: 'Visita de campo', desc: 'Un inspector Tooristoo visita el lugar como cliente anónimo.' },
      { step: '4', title: 'Certificación', desc: 'Si cumple, el proveedor recibe el sello Tooristoo.' },
      { step: '5', title: 'Seguimiento continuo', desc: 'Re-evaluación anual + vigilancia de denuncias.' },
    ],
    why_title: 'Por qué importa para ti',
    why: [
      { title: 'Viaja con tranquilidad', desc: 'Con un proveedor certificado conoces los precios de antemano y disfrutas tu estancia sin preocupaciones.' },
      { title: 'Apoyo si es necesario', desc: 'Si algo no va como se espera, repórtalo — gestionamos la mediación en 24h.' },
      { title: 'Apoya negocios locales transparentes', desc: 'Nuestros socios son actores locales comprometidos con la calidad y la confianza.' },
    ],
    become_title: '¿Eres proveedor en Marruecos?',
    become_desc: 'Únete a nuestra red certificada y accede a miles de turistas internacionales cualificados.',
    become_btn: 'Solicitar la certificación',
    cta_title: '¿Listo para viajar con confianza?',
    cta_btn: 'Ver proveedores certificados',
  },
};

const SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Charte des Prestataires Certifiés Tooristoo',
  url: `${BASE}/charter`,
  description: 'La charte d\'engagement des prestataires certifiés Tooristoo au Maroc : 7 critères de qualité vérifiés sur le terrain pour garantir des prix transparents et un service sans arnaque.',
  mainEntity: {
    '@type': 'ItemList',
    name: '7 engagements des prestataires certifiés Tooristoo',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Prix officiels affichés — aucune majoration pour les touristes étrangers' },
      { '@type': 'ListItem', position: 2, name: 'Pas de frais cachés — TVA incluse, suppléments clairement indiqués' },
      { '@type': 'ListItem', position: 3, name: 'Vérification terrain — visite anonyme avant certification' },
      { '@type': 'ListItem', position: 4, name: 'Note minimale 3.5/5 — évaluation continue des clients' },
      { '@type': 'ListItem', position: 5, name: 'Contact garanti — réponse sous 4h en haute saison' },
      { '@type': 'ListItem', position: 6, name: 'Anti-discrimination — même prix pour locaux et étrangers' },
      { '@type': 'ListItem', position: 7, name: 'Signalements traités — suspension en 24h si arnaque confirmée' },
    ],
  },
};

export default function ProviderCharter() {
  const { lang } = useLang();
  const c = CONTENT[lang] || CONTENT.fr;

  return (
    <div className="min-h-screen bg-shield-dark">
      <Helmet>
        <title>{c.title} | Tooristoo</title>
        <meta name="description" content="7 engagements vérifiés sur le terrain : prix transparents, pas de frais cachés, visite anonyme avant certification. Ce qui distingue Tooristoo des agrégateurs classiques." />
        <meta property="og:title" content={`${c.title} | Tooristoo`} />
        <meta property="og:description" content={c.intro} />
        <meta property="og:url" content={`${BASE}/charter`} />
        <meta property="og:type" content="website" />
        <link rel="canonical" href={`${BASE}/charter`} />
        <script type="application/ld+json">{JSON.stringify(SCHEMA)}</script>
      </Helmet>
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 pt-28 pb-20">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-shield-gold/10 border border-shield-gold/30 rounded-full text-shield-gold text-sm font-medium mb-6">
            <Award className="w-4 h-4" />
            {c.badge}
          </div>
          <h1 className="font-poppins font-black text-4xl md:text-5xl text-white mb-6">
            {c.title}
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">{c.intro}</p>
        </div>

        {/* 7 Commitments */}
        <section className="mb-16">
          <h2 className="font-poppins font-bold text-2xl text-white mb-8 flex items-center gap-3">
            <Shield className="w-6 h-6 text-shield-green" />
            {c.commitments_title}
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {c.commitments.map((item, i) => (
              <div key={i} className="bg-shield-card border border-shield-border rounded-2xl p-5 hover:border-shield-green/30 transition-all">
                <div className="flex items-start gap-4">
                  <span className="text-2xl flex-shrink-0 mt-0.5">{item.icon}</span>
                  <div>
                    <h3 className="font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Certification process */}
        <section className="mb-16">
          <h2 className="font-poppins font-bold text-2xl text-white mb-8 flex items-center gap-3">
            <CheckCircle className="w-6 h-6 text-shield-green" />
            {c.process_title}
          </h2>
          <div className="space-y-4">
            {c.process.map((step, i) => (
              <div key={i} className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-shield-green/10 border border-shield-green/40 flex items-center justify-center flex-shrink-0">
                  <span className="text-shield-green font-bold text-sm">{step.step}</span>
                </div>
                <div className="bg-shield-card border border-shield-border rounded-xl p-4 flex-1">
                  <h3 className="font-bold text-white mb-1">{step.title}</h3>
                  <p className="text-gray-400 text-sm">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Why it matters */}
        <section className="mb-16">
          <h2 className="font-poppins font-bold text-2xl text-white mb-8 flex items-center gap-3">
            <Users className="w-6 h-6 text-shield-green" />
            {c.why_title}
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {c.why.map((item, i) => (
              <div key={i} className="bg-shield-card border border-shield-border rounded-2xl p-5 text-center">
                <CheckCircle className="w-8 h-8 text-shield-green mx-auto mb-3" />
                <h3 className="font-bold text-white mb-2 text-sm">{item.title}</h3>
                <p className="text-gray-400 text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Become a partner */}
        <div className="p-8 bg-shield-card border border-shield-gold/20 rounded-2xl text-center card-glow-gold mb-8">
          <Award className="w-10 h-10 text-shield-gold mx-auto mb-4" />
          <h3 className="font-poppins font-bold text-white text-xl mb-2">{c.become_title}</h3>
          <p className="text-gray-400 text-sm mb-6 max-w-md mx-auto">{c.become_desc}</p>
          <a
            href="mailto:certification@tooristoo.com"
            className="inline-flex items-center gap-2 px-6 py-3 bg-shield-gold/10 border border-shield-gold/40 text-shield-gold font-bold rounded-xl hover:bg-shield-gold/20 transition-all"
          >
            {c.become_btn}
          </a>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            to="/providers"
            className="inline-flex items-center gap-2 px-8 py-4 bg-shield-green text-black font-bold rounded-xl hover:bg-green-400 transition-all btn-glow"
          >
            <Shield className="w-5 h-5" />
            {c.cta_btn}
          </Link>
        </div>
      </div>

      <Footer lang={lang} />
    </div>
  );
}