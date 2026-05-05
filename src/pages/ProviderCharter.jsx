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
    intro: 'Contrairement aux agrégateurs classiques qui référencent sans vérification, Tooristoo applique une charte d\'engagement stricte.',
    commitments_title: '7 Engagements Certifiés',
    commitments: [
      { icon: '💶', title: 'Prix officiels affichés', desc: 'Le prix annoncé sur Tooristoo est le prix réel pratiqué. Aucune majoration pour les touristes étrangers. Tarifs vérifiés et mis à jour régulièrement par notre équipe.' },
      { icon: '📋', title: 'Pas de frais cachés', desc: 'Aucun supplément non mentionné sur la fiche. TVA incluse, pourboires non obligatoires, suppléments spécifiques clairement indiqués à l\'avance.' },
      { icon: '✅', title: 'Vérification', desc: 'Un membre de l\'équipe Tooristoo a recherché et sélectionné le service en ligne. Ré-évaluation annuelle obligatoire.' },
      { icon: '⭐', title: 'Note minimale 4.0/5', desc: 'Seuls les prestataires maintenant une note client ≥ 4,0/5 conservent leur référencement. Sous ce seuil : avertissement puis déclassement.' },
      { icon: '📞', title: 'Contact garanti', desc: 'Numéro de téléphone vérifié et opérationnel. Réponse sous 4h aux demandes clients en haute saison touristique.' },
      { icon: '🤝', title: 'Accueil identique pour tous', desc: 'Le même service, la même qualité et les mêmes tarifs affichés pour chaque client, qu\'il soit habitué local ou visiteur étranger.' },
      { icon: '🔔', title: 'Signalement traité', desc: 'En cas de signalement validé par 3 utilisateurs, le prestataire est contacté sous 24h et, si nécessaire, temporairement suspendu le temps d\'investigation.' },
    ],
    process_title: 'Processus de certification',
    process: [
      { step: '1', title: 'Sélection', desc: 'Un membre de l\'équipe Tooristoo a recherché et sélectionné le service en ligne. Ré-évaluation annuelle obligatoire.' },
      { step: '2', title: 'Conformité', desc: 'Si conforme, le prestataire reçoit le badge (Référencé) Tooristoo et est publié sur la plateforme.' },
      { step: '3', title: 'Suivi continu', desc: 'Ré-évaluation annuelle + surveillance des signalements communautaires en temps réel.' },
    ],
    why_title: 'Pourquoi c\'est important pour vous',
    why: [
      { title: 'Voyagez sereinement', desc: 'Avec un prestataire certifié, vous connaissez les prix à l\'avance et pouvez profiter de votre séjour l\'esprit tranquille.' },
      { title: 'Un recours si besoin', desc: 'Si quelque chose ne se passe pas comme prévu, signalez-le — nous prenons en charge la médiation sous 24h.' },
      { title: 'Soutenir l\'économie locale transparente', desc: 'Nos partenaires certifiés sont des acteurs locaux engagés dans une démarche de qualité et de confiance.' },
    ],
    become_title: 'Vous êtes prestataire au Maroc ?',
    become_desc: 'Rejoignez notre réseau certifié. La certficication Tooristoo vous donne accès à des milliers de touristes internationaux qualifiés qui cherchent activement des prestataires de confiance.',
    become_btn: 'Postuler au référencement',
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
      { "icon": "💶", "title": "Official prices displayed", "desc": "The price shown on Tooristoo is the actual price charged. No markup for foreign tourists. Prices are verified and regularly updated by our team." },
      { "icon": "📋", "title": "No hidden fees", "desc": "No extra charges not mentioned on the listing. VAT included, tips not mandatory, and any specific surcharges are clearly indicated in advance." },
      { "icon": "✅", "title": "Verification", "desc": "A member of the Tooristoo team has researched and selected the service online. Annual re-evaluation is mandatory." },
      { "icon": "⭐", "title": "Minimum rating 4.0/5", "desc": "Only providers maintaining a customer rating ≥ 4.0/5 remain listed. Below this threshold: warning followed by downgrading." },
      { "icon": "📞", "title": "Guaranteed contact", "desc": "Verified and operational phone number. Response within 4 hours to customer inquiries during peak tourist season." },
      { "icon": "🤝", "title": "Same service for everyone", "desc": "The same service, quality, and displayed prices for every customer, whether a local regular or a foreign visitor." },
      { "icon": "🔔", "title": "Reports handled", "desc": "In case of a report validated by 3 users, the provider is contacted within 24 hours and, if necessary, temporarily suspended during the investigation." }
    ],
    process_title: 'Certification process',
    process: [
      { "step": "1", "title": "Selection", "desc": "A member of the Tooristoo team has researched and selected the service online. Annual re-evaluation is mandatory." },
      { "step": "2", "title": "Compliance", "desc": "If compliant, the provider receives the Tooristoo (Listed) badge and is published on the platform." },
      { "step": "3", "title": "Continuous monitoring", "desc": "Annual re-evaluation + real-time monitoring of community reports." }
    ],
    why_title: 'Why this matters for you',
    why: [
      { title: 'Travel with peace of mind', desc: 'With a certified provider, you know the prices in advance and can enjoy your stay worry-free.' },
      { title: 'Support if needed', desc: 'If something doesn\'t go as expected, report it — we handle mediation within 24 hours.' },
      { title: 'Support transparent local businesses', desc: 'Our certified partners are local actors committed to quality and trust.' },
    ],
    become_title: 'Are you a provider in Morocco?',
    become_desc: 'Join our certified network. Tooristoo certification gives you access to thousands of qualified international tourists actively seeking trusted providers.',
    become_btn: 'Apply for listing',
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
      { "icon": "💶", "title": "Precios oficiales mostrados", "desc": "El precio indicado en Tooristoo es el precio real aplicado. Sin recargos para turistas extranjeros. Precios verificados y actualizados regularmente por nuestro equipo." },
      { "icon": "📋", "title": "Sin cargos ocultos", "desc": "Ningún cargo adicional no mencionado en la ficha. IVA incluido, propinas no obligatorias y suplementos específicos claramente indicados con antelación." },
      { "icon": "✅", "title": "Verificación", "desc": "Un miembro del equipo de Tooristoo ha investigado y seleccionado el servicio en línea. Reevaluación anual obligatoria." },
      { "icon": "⭐", "title": "Calificación mínima 4.0/5", "desc": "Solo los proveedores que mantienen una calificación de clientes ≥ 4,0/5 permanecen listados. Por debajo de este umbral: advertencia y posterior descenso en el ranking." },
      { "icon": "📞", "title": "Contacto garantizado", "desc": "Número de teléfono verificado y operativo. Respuesta en menos de 4 horas a las solicitudes de clientes durante la temporada alta turística." },
      { "icon": "🤝", "title": "Mismo trato para todos", "desc": "El mismo servicio, la misma calidad y los mismos precios mostrados para cada cliente, ya sea un habitual local o un visitante extranjero." },
      { "icon": "🔔", "title": "Reportes gestionados", "desc": "En caso de un reporte validado por 3 usuarios, el proveedor es contactado en menos de 24 horas y, si es necesario, suspendido temporalmente durante la investigación." }
    ],
    process_title: 'Proceso de certificación',
    process: [
      { step: '1', title: 'Visita de campo', desc: 'Un miembro del equipo Tooristoo investigó y seleccionó el servicio en línea. Ré-evaluación anual obligatoria.' },
      { step: '2', title: 'Certificación', desc: 'Si cumple, el proveedor recibe el sello Tooristoo.' },
      { step: '3', title: 'Seguimiento continuo', desc: 'Re-evaluación anual + vigilancia de denuncias.' },
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
  description: 'La charte d\'engagement des prestataires référencés par Tooristoo au Maroc : 7 critères de qualité vérifiés en ligne pour garantir des prix transparents et un service de confiance.',
  mainEntity: {
    '@type': 'ItemList',
    name: '7 engagements des prestataires référencés Tooristoo',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Prix officiels affichés — aucune majoration pour les touristes étrangers' },
      { '@type': 'ListItem', position: 2, name: 'Pas de frais cachés — TVA incluse, suppléments clairement indiqués' },
      { '@type': 'ListItem', position: 3, name: 'Vérification en ligne — recherche approfondie avant référencement' },
      { '@type': 'ListItem', position: 4, name: 'Note minimale 4,0/5 sur 50+ avis Google' },
      { '@type': 'ListItem', position: 5, name: 'Contact garanti — réponse sous 4h en haute saison' },
      { '@type': 'ListItem', position: 6, name: 'Accueil identique pour tous — même prix pour locaux et étrangers' },
      { '@type': 'ListItem', position: 7, name: 'Signalements traités — vérification sous 3 jours ouvrés' },
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