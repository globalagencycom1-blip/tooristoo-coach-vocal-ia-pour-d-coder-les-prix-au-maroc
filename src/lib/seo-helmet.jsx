/**
 * Centralized SEO Helmet component.
 * Injects title, meta description, OG, Twitter Card, canonical, hreflang, and Schema.org JSON-LD.
 * Usage: <PageHelmet page="faq" lang={lang} />
 */
import { Helmet } from 'react-helmet-async';

const BASE = 'https://www.tooristoo.com';
const LANGS = ['fr', 'en', 'es', 'de', 'ar'];

const META = {
  home: {
    fr: { title: 'Tooristoo — Coach Vocal IA pour Négocier les Meilleurs Prix au Maroc', desc: 'Analysez les prix en temps réel, détectez les arnaques et négociez comme un local au Maroc avec notre coach IA vocal. Gratuit, multilingue.' },
    en: { title: 'Tooristoo — AI Voice Coach to Negotiate the Best Prices in Morocco', desc: 'Analyze prices in real time, detect scams and negotiate like a local in Morocco with our AI voice coach. Free, multilingual.' },
    es: { title: 'Tooristoo — Coach de Voz IA para Negociar los Mejores Precios en Marruecos', desc: 'Analiza precios en tiempo real, detecta estafas y negocia como un local en Marruecos con nuestro coach de voz IA.' },
    de: { title: 'Tooristoo — KI-Sprachcoach für die besten Preise in Marokko', desc: 'Analysiere Preise in Echtzeit, erkenne Betrug und verhandle wie ein Einheimischer in Marokko mit unserem KI-Sprachcoach.' },
    ar: { title: 'Tooristoo — مدرب صوتي ذكي للتفاوض على أفضل الأسعار في المغرب', desc: 'حلل الأسعار في الوقت الفعلي واكتشف الاحتيال وتفاوض كالسكان المحليين في المغرب.' },
  },
  app: {
    fr: { title: 'Coach IA Vocal | Analysez & Négociez les Meilleurs Prix au Maroc — Tooristoo', desc: 'Coach vocal IA en temps réel pour analyser les prix, détecter les arnaques et négocier comme un local au Maroc.' },
    en: { title: 'AI Voice Coach | Analyze & Negotiate Best Prices in Morocco — Tooristoo', desc: 'Real-time AI voice coach to analyze prices, detect scams and negotiate like a local in Morocco.' },
    es: { title: 'Coach de Voz IA | Analiza y Negocia los Mejores Precios en Marruecos — Tooristoo', desc: 'Coach de voz IA en tiempo real para analizar precios, detectar estafas y negociar como local en Marruecos.' },
    de: { title: 'KI-Sprachcoach | Preise analysieren & verhandeln in Marokko — Tooristoo', desc: 'KI-Sprachcoach in Echtzeit zum Analysieren von Preisen und Verhandeln wie ein Einheimischer in Marokko.' },
    ar: { title: 'مدرب صوتي ذكي | حلل وتفاوض على أفضل الأسعار في المغرب — Tooristoo', desc: 'مدرب صوتي ذكي في الوقت الفعلي لتحليل الأسعار واكتشاف الاحتيال في المغرب.' },
  },
  faq: {
    fr: { title: 'FAQ — Questions Fréquentes sur Tooristoo | Coach IA Maroc', desc: 'Réponses aux questions fréquentes sur Tooristoo : fonctionnement, langues, villes, plan gratuit, détection d\'arnaques au Maroc.' },
    en: { title: 'FAQ — Frequently Asked Questions about Tooristoo | AI Coach Morocco', desc: 'Answers to frequently asked questions about Tooristoo: how it works, languages, cities, free plan, scam detection in Morocco.' },
    es: { title: 'FAQ — Preguntas Frecuentes sobre Tooristoo | Coach IA Marruecos', desc: 'Respuestas a preguntas frecuentes sobre Tooristoo: funcionamiento, idiomas, ciudades, plan gratuito en Marruecos.' },
    de: { title: 'FAQ — Häufig gestellte Fragen zu Tooristoo | KI-Coach Marokko', desc: 'Antworten auf häufige Fragen zu Tooristoo: Funktionsweise, Sprachen, Städte, kostenloser Plan, Betrugserkennung.' },
    ar: { title: 'الأسئلة الشائعة حول Tooristoo | مدرب ذكي اصطناعي المغرب', desc: 'إجابات على الأسئلة الشائعة حول Tooristoo: الوظائف والمدن وخطة مجانية وكشف الاحتيال في المغرب.' },
  },
  about: {
    fr: { title: 'À Propos de Tooristoo | Coach IA Anti-Arnaque pour Touristes au Maroc', desc: 'Découvrez l\'histoire, la mission et l\'équipe derrière Tooristoo, l\'app IA qui protège les touristes des arnaques au Maroc depuis 2023.' },
    en: { title: 'About Tooristoo | AI Anti-Scam Coach for Tourists in Morocco', desc: 'Discover the story, mission and team behind Tooristoo, the AI app protecting tourists from scams in Morocco since 2023.' },
    es: { title: 'Acerca de Tooristoo | Coach IA Anti-Estafa para Turistas en Marruecos', desc: 'Descubre la historia, misión y equipo detrás de Tooristoo, la app IA que protege a turistas del fraude en Marruecos.' },
    de: { title: 'Über Tooristoo | KI Anti-Betrug Coach für Touristen in Marokko', desc: 'Entdecken Sie Geschichte, Mission und Team hinter Tooristoo, der KI-App zum Schutz von Touristen vor Betrug in Marokko.' },
    ar: { title: 'عن Tooristoo | مدرب ذكي اصطناعي لمكافحة الاحتيال للسياح في المغرب', desc: 'اكتشف قصة وسهمية وفريق Tooristoo، التطبيق الذي يحمي السياح من الاحتيال في المغرب منذ 2023.' },
  },
  blog: {
    fr: { title: 'Blog Tooristoo — Guides de Voyage Maroc & Conseils Anti-Arnaque', desc: 'Guides complets, conseils de négociation et alertes arnaques par ville (Marrakech, Fès, Agadir…) pour voyager sereinement au Maroc.' },
    en: { title: 'Tooristoo Blog — Morocco Travel Guides & Anti-Scam Tips', desc: 'Comprehensive guides, negotiation tips and scam alerts by city (Marrakech, Fes, Agadir…) to explore Morocco safely.' },
    es: { title: 'Blog Tooristoo — Guías de Viaje Marruecos & Consejos Anti-Estafa', desc: 'Guías completas, consejos de negociación y alertas de estafa por ciudad para explorar Marruecos con seguridad.' },
    de: { title: 'Tooristoo Blog — Marokko Reiseführer & Anti-Betrug Tipps', desc: 'Umfassende Reiseführer, Verhandlungstipps und Betrugswarnungen nach Stadt für eine sichere Marokko-Reise.' },
    ar: { title: 'مدونة Tooristoo — أدلة السفر إلى المغرب ونصائح مكافحة الاحتيال', desc: 'أدلة شاملة ونصائح تفاوض وتنبيهات احتيال حسب المدينة لاستكشاف المغرب بأمان.' },
  },
  providers: {
    fr: { title: 'Prestataires Certifiés Tooristoo — Hôtels, Taxis, Restaurants au Maroc', desc: 'Répertoire de prestataires vérifiés au Maroc avec prix officiels : hôtels, riads, taxis, restaurants, guides à Marrakech, Fès, Agadir et partout.' },
    en: { title: 'Certified Tooristoo Providers — Hotels, Taxis, Restaurants in Morocco', desc: 'Directory of verified providers in Morocco with official prices: hotels, riads, taxis, restaurants, guides in Marrakech, Fes, Agadir and more.' },
    es: { title: 'Proveedores Certificados Tooristoo — Hoteles, Taxis, Restaurantes en Marruecos', desc: 'Directorio de proveedores verificados en Marruecos con precios oficiales: hoteles, riads, taxis, restaurantes.' },
    de: { title: 'Zertifizierte Tooristoo-Anbieter — Hotels, Taxis, Restaurants in Marokko', desc: 'Verzeichnis geprüfter Anbieter in Marokko mit offiziellen Preisen: Hotels, Riads, Taxis, Restaurants, Reiseführer.' },
    ar: { title: 'مزودو Tooristoo المعتمدون — فنادق وتاكسي ومطاعم في المغرب', desc: 'دليل مزودي الخدمات الموثوقين في المغرب بأسعار رسمية: فنادق ورياضات وتاكسي ومطاعم وأدلة سياحية.' },
  },
  alerts: {
    fr: { title: 'Alertes Arnaques Touristiques au Maroc — Tooristoo', desc: 'Alertes en temps réel sur les arnaques les plus fréquentes au Maroc : taxis, faux guides, souks, restaurants. Voyagez protégé.' },
    en: { title: 'Morocco Tourist Scam Alerts — Tooristoo', desc: 'Real-time alerts on the most common tourist scams in Morocco: taxis, fake guides, souks, restaurants. Travel protected.' },
    es: { title: 'Alertas de Estafas Turísticas en Marruecos — Tooristoo', desc: 'Alertas en tiempo real sobre las estafas más frecuentes en Marruecos: taxis, guías falsos, zocos, restaurantes.' },
    de: { title: 'Marokko Tourismusbetrug-Warnungen — Tooristoo', desc: 'Echtzeit-Warnungen zu häufigen Touristenbetrug in Marokko: Taxis, falsche Guides, Souks, Restaurants.' },
    ar: { title: 'تنبيهات الاحتيال السياحي في المغرب — Tooristoo', desc: 'تنبيهات فورية حول أكثر عمليات الاحتيال السياحي شيوعاً في المغرب: تاكسي وأدلة مزيفة وأسواق.' },
  },
};

const SCHEMAS = {
  home: {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Tooristoo',
    url: BASE,
    logo: `${BASE}/logo.png`,
    description: 'Coach vocal IA pour analyser les prix, détecter les arnaques et négocier au Maroc',
    contactPoint: { '@type': 'ContactPoint', email: 'contact@tooristoo.com', contactType: 'customer support' },
    sameAs: [],
  },
  app: {
    '@context': 'https://schema.org',
    '@type': 'MobileApplication',
    name: 'Tooristoo',
    url: `${BASE}/app`,
    applicationCategory: 'TravelApplication',
    operatingSystem: 'Web, iOS, Android',
    description: 'Coach vocal IA pour négocier les prix et détecter les arnaques au Maroc. Disponible en 6 langues.',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
    featureList: ['Analyse des prix en temps réel', 'Détection d\'arnaques touristiques', 'Phrases de négociation en darija', 'Répertoire de prestataires certifiés'],
    inLanguage: ['fr', 'en', 'es', 'de', 'ar'],
  },
  faq: {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: 'Qu\'est-ce que Tooristoo ?', acceptedAnswer: { '@type': 'Answer', text: 'Tooristoo est un coach vocal IA qui aide les touristes à négocier les meilleurs prix au Maroc, détecter les arnaques et obtenir des phrases en darija marocain.' } },
      { '@type': 'Question', name: 'Est-ce que Tooristoo est gratuit ?', acceptedAnswer: { '@type': 'Answer', text: 'Oui, Tooristoo propose un plan gratuit avec 3 analyses par jour. Les plans Voyageur et Pro offrent des analyses illimitées.' } },
      { '@type': 'Question', name: 'Dans quelles langues fonctionne Tooristoo ?', acceptedAnswer: { '@type': 'Answer', text: 'Tooristoo est disponible en français, anglais, espagnol, allemand, arabe et darija marocain.' } },
      { '@type': 'Question', name: 'Quelles villes du Maroc sont couvertes ?', acceptedAnswer: { '@type': 'Answer', text: 'Tooristoo couvre Marrakech, Fès, Casablanca, Chefchaouen, Agadir, Tanger, Rabat, Meknès, Ouarzazate, Merzouga, Essaouira, Dakhla et El Jadida.' } },
      { '@type': 'Question', name: 'Comment fonctionne la détection d\'arnaques ?', acceptedAnswer: { '@type': 'Answer', text: 'L\'IA compare le prix demandé à une base de prix réels locaux. Si le prix dépasse la fourchette normale, une alerte et une stratégie de négociation sont proposées.' } },
      { '@type': 'Question', name: 'Quels types de services sont analysés ?', acceptedAnswer: { '@type': 'Answer', text: 'Taxis, hôtels, riads, restaurants, excursions, shopping et souks, transport, guides touristiques, spas et hammams.' } },
      { '@type': 'Question', name: 'Tooristoo fonctionne-t-il sur mobile ?', acceptedAnswer: { '@type': 'Answer', text: 'Oui, Tooristoo est une PWA accessible sur iOS et Android depuis votre navigateur, sans installation requise.' } },
    ],
  },
  about: {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${BASE}/#organization`,
    name: 'Tooristoo',
    url: BASE,
    logo: {
      '@type': 'ImageObject',
      url: `${BASE}/logo.png`,
      width: 200,
      height: 200,
    },
    foundingDate: '2023',
    foundingLocation: {
      '@type': 'Place',
      name: 'Marrakech, Maroc',
      addressCountry: 'MA',
    },
    founder: [
      { '@type': 'Person', name: 'Youssef Benali', jobTitle: 'Co-fondateur & CEO', nationality: 'MA' },
      { '@type': 'Person', name: 'Sophie Martin', jobTitle: 'Co-fondatrice & CTO', nationality: 'FR' },
    ],
    description: 'Startup franco-marocaine créée en 2023 pour protéger les touristes des arnaques au Maroc via un coach IA vocal multilingue.',
    numberOfEmployees: { '@type': 'QuantitativeValue', value: 4 },
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'contact@tooristoo.com',
      contactType: 'customer support',
      availableLanguage: ['French', 'English', 'Spanish', 'German', 'Arabic'],
    },
    areaServed: { '@type': 'Country', name: 'Morocco', '@id': 'https://www.wikidata.org/wiki/Q1028' },
    knowsAbout: ['Tourism in Morocco', 'Price negotiation', 'Scam detection', 'Artificial Intelligence'],
    sameAs: [
      'https://www.instagram.com/tooristoo',
      'https://www.facebook.com/tooristoo',
      'https://twitter.com/tooristoo',
    ],
  },
  blog: null, // Handled per-article in BlogArticle
  providers: {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Prestataires Certifiés Tooristoo au Maroc',
    description: 'Répertoire de prestataires de services touristiques certifiés au Maroc avec prix officiels : hôtels, riads, taxis, restaurants, guides, excursions, spas.',
    url: `${BASE}/providers`,
    numberOfItems: 50,
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Taxis certifiés à Marrakech', url: `${BASE}/providers` },
      { '@type': 'ListItem', position: 2, name: 'Hôtels & Riads certifiés à Fès', url: `${BASE}/providers` },
      { '@type': 'ListItem', position: 3, name: 'Guides touristiques certifiés à Chefchaouen', url: `${BASE}/providers` },
      { '@type': 'ListItem', position: 4, name: 'Restaurants certifiés à Casablanca', url: `${BASE}/providers` },
      { '@type': 'ListItem', position: 5, name: 'Excursions certifiées à Merzouga', url: `${BASE}/providers` },
    ],
  },
  alerts: {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Alertes Arnaques Touristiques au Maroc — Tooristoo',
    url: `${BASE}/alerts`,
    description: 'Alertes communautaires sur les arnaques touristiques les plus fréquentes au Maroc.',
    mainEntity: {
      '@type': 'ItemList',
      name: 'Arnaques touristiques fréquentes au Maroc',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Taxi sans compteur à l\'aéroport' },
        { '@type': 'ListItem', position: 2, name: 'Faux guides dans les médinas' },
        { '@type': 'ListItem', position: 3, name: 'Surfacturation restaurants Jemaa el-Fna' },
        { '@type': 'ListItem', position: 4, name: 'Arnaques dans les souks' },
        { '@type': 'ListItem', position: 5, name: 'Excursions désert surdimensionnées' },
        { '@type': 'ListItem', position: 6, name: 'Charmeurs de serpents et artistes de rue' },
        { '@type': 'ListItem', position: 7, name: 'Faux offices de tourisme' },
        { '@type': 'ListItem', position: 8, name: 'Change illégal dans la rue' },
      ],
    },
  },
};

export default function PageHelmet({ page, lang = 'fr', extraSchema = null }) {
  const pageMeta = META[page];
  if (!pageMeta) return null;

  const m = pageMeta[lang] || pageMeta['fr'];
  const path = page === 'home' ? '' : `/${page}`;
  const canonical = `${BASE}${path}`;
  const schema = extraSchema || SCHEMAS[page];

  return (
    <Helmet>
      <title>{m.title}</title>
      <meta name="description" content={m.desc} />

      {/* Open Graph */}
      <meta property="og:type" content={page === 'blog' ? 'website' : 'website'} />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={m.title} />
      <meta property="og:description" content={m.desc} />
      <meta property="og:image" content={`${BASE}/og-image.png`} />
      <meta property="og:site_name" content="Tooristoo" />
      <meta property="og:locale" content={lang === 'fr' ? 'fr_FR' : lang === 'en' ? 'en_US' : lang === 'es' ? 'es_ES' : lang === 'de' ? 'de_DE' : 'ar_MA'} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={m.title} />
      <meta name="twitter:description" content={m.desc} />
      <meta name="twitter:image" content={`${BASE}/og-image.png`} />

      {/* Canonical */}
      <link rel="canonical" href={canonical} />

      {/* hreflang — same URL for all languages (SPA pattern) */}
      {LANGS.map(l => (
        <link key={l} rel="alternate" hreflang={l} href={canonical} />
      ))}
      <link rel="alternate" hreflang="x-default" href={canonical} />

      {/* Schema.org */}
      {schema && (
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      )}
    </Helmet>
  );
}