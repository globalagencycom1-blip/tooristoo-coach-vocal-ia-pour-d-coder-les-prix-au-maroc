/**
 * Centralized SEO Helmet component.
 * Injects title, meta description, OG, Twitter Card, canonical, hreflang, and Schema.org JSON-LD.
 * Usage: <PageHelmet page="faq" lang={lang} />
 */
import { Helmet } from 'react-helmet-async';

const BASE = 'https://www.tooristoo.com';
// Standard BCP-47 language codes for hreflang
const HREFLANG_MAP = {
  fr: 'fr',
  en: 'en',
  es: 'es',
  de: 'de',
  ar: 'ar',
  // darija is not a standard BCP-47 code — mapped to ar-MA for SEO
};
const LANGS = Object.keys(HREFLANG_MAP);

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

// Builds the schema array for a given page — supports multiple @graph entries
const buildSchemas = (page) => {
  switch (page) {

    case 'home':
      return [
        {
          '@context': 'https://schema.org',
          '@type': 'Organization',
          '@id': `${BASE}/#organization`,
          name: 'Tooristoo',
          url: BASE,
          logo: { '@type': 'ImageObject', url: `${BASE}/logo.png`, width: 200, height: 200 },
          description: 'Coach vocal IA pour analyser les prix, détecter les arnaques et négocier comme un local au Maroc.',
          foundingDate: '2023',
          foundingLocation: { '@type': 'Place', name: 'Marrakech, Maroc', addressCountry: 'MA' },
          contactPoint: { '@type': 'ContactPoint', email: 'contact@tooristoo.com', contactType: 'customer support', availableLanguage: ['French','English','Spanish','German','Arabic'] },
          areaServed: { '@type': 'Country', name: 'Morocco' },
          sameAs: ['https://www.instagram.com/tooristoo','https://www.facebook.com/tooristoo','https://twitter.com/tooristoo'],
        },
        {
          '@context': 'https://schema.org',
          '@type': 'SoftwareApplication',
          name: 'Tooristoo',
          url: `${BASE}/app`,
          applicationCategory: 'TravelApplication',
          operatingSystem: 'Web, iOS, Android',
          description: 'Coach vocal IA pour négocier les prix et détecter les arnaques touristiques au Maroc. Disponible en 6 langues dont le darija marocain.',
          offers: [
            { '@type': 'Offer', name: 'Gratuit', price: '0', priceCurrency: 'EUR', description: '3 analyses par jour' },
            { '@type': 'Offer', name: 'Voyageur', price: '5', priceCurrency: 'EUR', description: 'Analyses illimitées' },
            { '@type': 'Offer', name: 'Pro', price: '12', priceCurrency: 'EUR', description: 'Tout Voyageur + analytics avancés' },
          ],
          featureList: ['Analyse des prix en temps réel','Détection d\'arnaques touristiques','Phrases de négociation en darija','Répertoire de prestataires certifiés','Historique des négociations'],
          inLanguage: ['fr','en','es','de','ar'],
          author: { '@id': `${BASE}/#organization` },
        },
      ];

    case 'app':
      return [{
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'Tooristoo',
        url: `${BASE}/app`,
        applicationCategory: 'TravelApplication',
        operatingSystem: 'Web, iOS, Android',
        description: 'Coach vocal IA en temps réel pour analyser les prix, détecter les arnaques et négocier comme un local au Maroc.',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
        featureList: ['Analyse de prix en temps réel','Détection d\'arnaques','Phrases en darija','Prestataires certifiés','Historique des négociations'],
        inLanguage: ['fr','en','es','de','ar'],
        author: { '@id': `${BASE}/#organization` },
      }];

    case 'faq':
      return [{
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          { '@type': 'Question', name: 'Qu\'est-ce que Tooristoo ?', acceptedAnswer: { '@type': 'Answer', text: 'Tooristoo est un coach vocal IA qui aide les touristes à négocier les meilleurs prix au Maroc, détecter les arnaques et obtenir des phrases de négociation en darija en temps réel. Disponible gratuitement sur web, iOS et Android.' } },
          { '@type': 'Question', name: 'Est-ce que Tooristoo est gratuit ?', acceptedAnswer: { '@type': 'Answer', text: 'Oui, Tooristoo propose un plan gratuit avec 3 analyses par jour sans carte de crédit. Les plans Voyageur (5€/mois) et Pro (12€/mois) offrent des analyses illimitées et des fonctionnalités avancées.' } },
          { '@type': 'Question', name: 'Dans quelles langues fonctionne Tooristoo ?', acceptedAnswer: { '@type': 'Answer', text: 'Tooristoo est disponible en 6 langues : français, anglais, espagnol, allemand, arabe et darija marocain.' } },
          { '@type': 'Question', name: 'Quelles villes du Maroc sont couvertes ?', acceptedAnswer: { '@type': 'Answer', text: 'Tooristoo couvre toutes les grandes villes : Marrakech, Fès, Casablanca, Chefchaouen, Agadir, Tanger, Rabat, Meknès, Ouarzazate, Merzouga, Essaouira, Dakhla et El Jadida.' } },
          { '@type': 'Question', name: 'Comment fonctionne la détection d\'arnaques ?', acceptedAnswer: { '@type': 'Answer', text: 'L\'IA compare le prix demandé à une base de données de prix réels locaux. Si le prix dépasse significativement la fourchette normale, une alerte rouge est émise avec le niveau de risque et une stratégie de négociation.' } },
          { '@type': 'Question', name: 'Quels types de services sont analysés ?', acceptedAnswer: { '@type': 'Answer', text: 'Taxis, hôtels, riads, restaurants, excursions, shopping et souks, transport interurbain, guides touristiques, spas et hammams.' } },
          { '@type': 'Question', name: 'Tooristoo fonctionne-t-il sur mobile ?', acceptedAnswer: { '@type': 'Answer', text: 'Oui, Tooristoo est une PWA (Progressive Web App) accessible directement depuis le navigateur sur iOS et Android, sans installation requise depuis un store.' } },
          { '@type': 'Question', name: 'Puis-je utiliser Tooristoo hors ligne ?', acceptedAnswer: { '@type': 'Answer', text: 'L\'analyse IA nécessite une connexion internet. Cependant, toutes vos négociations sont sauvegardées localement et accessibles hors ligne. Les données se synchronisent dès le retour de la connexion.' } },
          { '@type': 'Question', name: 'Comment signaler une arnaque ?', acceptedAnswer: { '@type': 'Answer', text: 'Depuis l\'application, après une analyse, un bouton "Signaler" permet de soumettre un signalement communautaire avec la localisation, le type d\'arnaque et le montant. Votre signalement alerte les autres voyageurs.' } },
          { '@type': 'Question', name: 'Mes données sont-elles sécurisées ?', acceptedAnswer: { '@type': 'Answer', text: 'Oui. Toutes les données sont chiffrées en transit (HTTPS) et au repos. La reconnaissance vocale est traitée localement — seul le transcript textuel est envoyé à notre IA. Aucun audio n\'est stocké sur nos serveurs.' } },
        ],
      }];

    case 'about':
      return [{
        '@context': 'https://schema.org',
        '@type': 'AboutPage',
        '@id': `${BASE}/about`,
        name: 'À Propos de Tooristoo',
        url: `${BASE}/about`,
        description: 'Tooristoo est une startup franco-marocaine fondée en 2023 pour protéger les touristes des arnaques au Maroc grâce à un coach IA vocal multilingue.',
        mainEntity: {
          '@type': 'Organization',
          '@id': `${BASE}/#organization`,
          name: 'Tooristoo',
          url: BASE,
          logo: { '@type': 'ImageObject', url: `${BASE}/logo.png`, width: 200, height: 200 },
          foundingDate: '2023',
          foundingLocation: { '@type': 'Place', name: 'Marrakech', addressCountry: 'MA' },
          founder: [
            { '@type': 'Person', name: 'Youssef Benali', jobTitle: 'CEO & Co-fondateur', description: 'Ex-guide touristique à Marrakech, créateur de Tooristoo.' },
            { '@type': 'Person', name: 'Sophie Martin', jobTitle: 'CTO & Co-fondatrice', description: 'Ingénieure IA spécialisée en NLP.' },
          ],
          description: 'Startup franco-marocaine créée en 2023 pour protéger les touristes des arnaques au Maroc via un coach IA vocal multilingue.',
          contactPoint: { '@type': 'ContactPoint', email: 'contact@tooristoo.com', contactType: 'customer support', availableLanguage: ['French','English','Spanish','German','Arabic'] },
          areaServed: { '@type': 'Country', name: 'Morocco' },
          sameAs: ['https://www.instagram.com/tooristoo','https://www.facebook.com/tooristoo','https://twitter.com/tooristoo'],
        },
      }];

    case 'blog':
      return null; // Handled per-article in BlogArticle.jsx

    case 'providers':
      return [{
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: 'Prestataires Certifiés Tooristoo au Maroc',
        description: 'Répertoire de prestataires de services touristiques certifiés au Maroc avec prix officiels : hôtels, riads, taxis, restaurants, guides, excursions, spas.',
        url: `${BASE}/providers`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, item: { '@type': 'LocalBusiness', name: 'Taxis certifiés Tooristoo — Marrakech', description: 'Taxis officiels avec compteur et tarifs régulés à Marrakech.', address: { '@type': 'PostalAddress', addressLocality: 'Marrakech', addressCountry: 'MA' }, url: `${BASE}/providers` } },
          { '@type': 'ListItem', position: 2, item: { '@type': 'LodgingBusiness', name: 'Riads & Hôtels certifiés — Fès', description: 'Hébergements vérifiés avec prix officiels transparents à Fès.', address: { '@type': 'PostalAddress', addressLocality: 'Fès', addressCountry: 'MA' }, url: `${BASE}/providers` } },
          { '@type': 'ListItem', position: 3, item: { '@type': 'LocalBusiness', name: 'Guides touristiques certifiés — Chefchaouen', description: 'Guides officiels approuvés par le Ministère du Tourisme marocain.', address: { '@type': 'PostalAddress', addressLocality: 'Chefchaouen', addressCountry: 'MA' }, url: `${BASE}/providers` } },
          { '@type': 'ListItem', position: 4, item: { '@type': 'FoodEstablishment', name: 'Restaurants certifiés — Casablanca', description: 'Restaurants authentiques avec menus et fourchettes de prix affichés.', address: { '@type': 'PostalAddress', addressLocality: 'Casablanca', addressCountry: 'MA' }, url: `${BASE}/providers` } },
          { '@type': 'ListItem', position: 5, item: { '@type': 'TouristAttraction', name: 'Excursions désert certifiées — Merzouga', description: 'Excursions dans l\'Erg Chebbi et le désert avec prix officiels garantis.', address: { '@type': 'PostalAddress', addressLocality: 'Merzouga', addressCountry: 'MA' }, url: `${BASE}/providers` } },
          { '@type': 'ListItem', position: 6, item: { '@type': 'HealthAndBeautyBusiness', name: 'Spas & Hammams certifiés — Agadir', description: 'Spas traditionnels et hammams avec tarifs transparents affichés.', address: { '@type': 'PostalAddress', addressLocality: 'Agadir', addressCountry: 'MA' }, url: `${BASE}/providers` } },
        ],
      }];

    case 'alerts':
      return [{
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Alertes Arnaques Touristiques au Maroc — Tooristoo',
        url: `${BASE}/alerts`,
        description: 'Alertes communautaires sur les arnaques touristiques les plus fréquentes au Maroc : taxis sans compteur, faux guides, surfacturation, change illégal.',
        mainEntity: {
          '@type': 'ItemList',
          name: 'Arnaques touristiques fréquentes au Maroc',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Taxi sans compteur à l\'aéroport', description: 'Prix jusqu\'à 10x le tarif normal. Insistez pour le compteur ou négociez le prix avant de monter.' },
            { '@type': 'ListItem', position: 2, name: 'Faux guides dans les médinas de Fès et Marrakech', description: 'Des inconnus proposent de vous guider puis réclament un paiement excessif. Utilisez uniquement des guides officiels certifiés.' },
            { '@type': 'ListItem', position: 3, name: 'Surfacturation dans les restaurants touristiques', description: 'Vérifiez les prix sur le menu avant de commander. Méfiez-vous des menus sans prix.' },
            { '@type': 'ListItem', position: 4, name: 'Arnaques dans les souks', description: 'Articles présentés comme artisanat local en réalité importés. Comparez les prix dans plusieurs boutiques.' },
            { '@type': 'ListItem', position: 5, name: 'Excursions désert surdimensionnées', description: 'Prix gonflés pour Merzouga ou Ouarzazate. Réservez via un prestataire certifié Tooristoo.' },
            { '@type': 'ListItem', position: 6, name: 'Charmeurs de serpents et artistes de rue', description: 'Placement forcé d\'animaux puis réclamation de paiement. Refusez poliment tout contact non sollicité.' },
            { '@type': 'ListItem', position: 7, name: 'Faux offices de tourisme', description: 'Boutiques se faisant passer pour des offices officiels. L\'office de tourisme marocain est gratuit.' },
            { '@type': 'ListItem', position: 8, name: 'Change illégal dans la rue', description: 'Taux frauduleux avec faux billets. Utilisez uniquement les banques ou distributeurs officiels.' },
          ],
        },
      }];

    default:
      return null;
  }
};

const OG_LOCALE = { fr: 'fr_FR', en: 'en_US', es: 'es_ES', de: 'de_DE', ar: 'ar_MA', darija: 'ar_MA' };

export default function PageHelmet({ page, lang = 'fr', extraSchemas = null }) {
  const pageMeta = META[page];
  if (!pageMeta) return null;

  const m = pageMeta[lang] || pageMeta['fr'];
  const path = page === 'home' ? '' : `/${page}`;
  const canonical = `${BASE}${path}`;
  const schemas = extraSchemas || buildSchemas(page);

  return (
    <Helmet>
      <title>{m.title}</title>
      <meta name="description" content={m.desc} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={m.title} />
      <meta property="og:description" content={m.desc} />
      <meta property="og:image" content={`${BASE}/og-image.png`} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="Tooristoo" />
      <meta property="og:locale" content={OG_LOCALE[lang] || 'fr_FR'} />
      {/* Signal alternate languages to OG crawlers */}
      {Object.entries(OG_LOCALE)
        .filter(([l]) => l !== lang && l !== 'darija')
        .map(([l, locale]) => (
          <meta key={l} property="og:locale:alternate" content={locale} />
        ))
      }

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@tooristoo" />
      <meta name="twitter:title" content={m.title} />
      <meta name="twitter:description" content={m.desc} />
      <meta name="twitter:image" content={`${BASE}/og-image.png`} />

      {/* Canonical */}
      <link rel="canonical" href={canonical} />

      {/* html lang + dir */}
      <html lang={HREFLANG_MAP[lang] || 'fr'} dir={lang === 'ar' || lang === 'darija' ? 'rtl' : 'ltr'} />

      {/* hreflang — same URL for all languages (SPA i18n pattern) */}
      {LANGS.map(l => (
        <link key={l} rel="alternate" hreflang={HREFLANG_MAP[l]} href={canonical} />
      ))}
      <link rel="alternate" hreflang="ar-MA" href={canonical} />
      <link rel="alternate" hreflang="x-default" href={canonical} />

      {/* Schema.org JSON-LD — one block per schema */}
      {Array.isArray(schemas)
        ? schemas.map((s, i) => (
            <script key={i} type="application/ld+json">{JSON.stringify(s)}</script>
          ))
        : schemas && <script type="application/ld+json">{JSON.stringify(schemas)}</script>
      }
    </Helmet>
  );
}