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
    fr: { title: 'Tooristoo — Coach Vocal IA pour Négocier les Meilleurs Prix au Maroc', desc: 'Analysez les prix en temps réel, voyagez sereinement et négociez comme un local au Maroc avec notre coach IA vocal. Gratuit, multilingue.' },
    en: { title: 'Tooristoo — AI Voice Coach to Negotiate the Best Prices in Morocco', desc: 'Analyze prices in real time, travel safely and negotiate like a local in Morocco with our AI voice coach. Free, multilingual.' },
    es: { title: 'Tooristoo — Coach de Voz IA para Negociar los Mejores Precios en Marruecos', desc: 'Analiza precios en tiempo real, viaja seguro y negocia como un local en Marruecos con nuestro coach de voz IA.' },
    de: { title: 'Tooristoo — KI-Sprachcoach für die besten Preise in Marokko', desc: 'Preise in Echtzeit analysieren, sicher reisen und wie ein Einheimischer in Marokko verhandeln.' },
    ar: { title: 'Tooristoo — مدرب صوتي ذكي للتفاوض على أفضل الأسعار في المغرب', desc: 'حلّل الأسعار في الوقت الفعلي وتفاوض على السعر العادل كالسكان المحليين في المغرب — بدون مفاجآت.' },
  },
  app: {
    fr: { title: 'Coach IA Vocal | Analysez & Négociez les Meilleurs Prix au Maroc — Tooristoo', desc: 'Coach vocal IA en temps réel pour analyser les prix et négocier équitablement comme un local au Maroc.' },
    en: { title: 'AI Voice Coach | Analyze & Negotiate Best Prices in Morocco — Tooristoo', desc: 'Real-time AI voice coach to analyze prices and negotiate fairly like a local in Morocco.' },
    es: { title: 'Coach de Voz IA | Analiza y Negocia los Mejores Precios en Marruecos — Tooristoo', desc: 'Coach de voz IA en tiempo real para analizar precios y negociar con equidad en Marruecos.' },
    de: { title: 'KI-Sprachcoach | Preise analysieren & verhandeln in Marokko — Tooristoo', desc: 'KI-Sprachcoach in Echtzeit zum Analysieren von Preisen und fairen Verhandeln in Marokko.' },
    ar: { title: 'مدرب صوتي ذكي | حلل وتفاوض على أفضل الأسعار في المغرب — Tooristoo', desc: 'مدرب صوتي ذكي في الوقت الفعلي لتحليل الأسعار والتفاوض بشفافية في المغرب — معرفة السعر العادل قبل أي معاملة.' },
  },
  faq: {
    fr: { title: 'FAQ — Questions Fréquentes sur Tooristoo | Coach IA Maroc', desc: 'Réponses aux questions fréquentes sur Tooristoo : fonctionnement, langues, villes, plan gratuit, protection des prix au Maroc.' },
    en: { title: 'FAQ — Frequently Asked Questions about Tooristoo | AI Coach Morocco', desc: 'Answers to frequently asked questions about Tooristoo: how it works, languages, cities, free plan, price protection in Morocco.' },
    es: { title: 'FAQ — Preguntas Frecuentes sobre Tooristoo | Coach IA Marruecos', desc: 'Respuestas a preguntas frecuentes sobre Tooristoo: funcionamiento, idiomas, ciudades, plan gratuito en Marruecos.' },
    de: { title: 'FAQ — Häufig gestellte Fragen zu Tooristoo | KI-Coach Marokko', desc: 'Antworten auf häufige Fragen zu Tooristoo: Funktionsweise, Sprachen, Städte, kostenloser Plan, Preisschutz.' },
    ar: { title: 'الأسئلة الشائعة حول Tooristoo | مدرب ذكي اصطناعي المغرب', desc: 'إجابات على الأسئلة الشائعة حول Tooristoo: كيف يعمل، المدن، الخطة المجانية، وكيف يساعدك على معرفة السعر العادل.' },
  },
  about: {
    fr: { title: 'À Propos de Tooristoo | Coach IA pour Voyager Sereinement au Maroc', desc: 'Découvrez l\'histoire, la mission et l\'équipe derrière Tooristoo, l\'app IA qui aide les touristes à connaître les vrais prix au Maroc.' },
    en: { title: 'About Tooristoo | AI Coach for Stress-Free Travel in Morocco', desc: 'Discover the story, mission and team behind Tooristoo, the AI app helping tourists know real prices and travel with confidence in Morocco.' },
    es: { title: 'Acerca de Tooristoo | Coach IA para Viajar con Tranquilidad en Marruecos', desc: 'Descubre la historia, misión y equipo detrás de Tooristoo, la app IA que ayuda a turistas a conocer los precios reales en Marruecos.' },
    de: { title: 'Über Tooristoo | KI-Coach für sorgenfreies Reisen in Marokko', desc: 'Entdecken Sie Geschichte, Mission und Team hinter Tooristoo, der KI-App für Preistransparenz und sicheres Reisen in Marokko.' },
    ar: { title: 'عن Tooristoo | مدرب ذكي اصطناعي للسفر بثقة في المغرب', desc: 'اكتشف قصة وفريق Tooristoo — التطبيق الذي يساعد السياح على معرفة الأسعار الحقيقية والسفر براحة في المغرب.' },
  },
  blog: {
    fr: { title: 'Blog Tooristoo — Guides de Voyage Maroc & Conseils de Négociation', desc: 'Guides complets, conseils de négociation et prix de référence par ville (Marrakech, Fès, Agadir…) pour voyager sereinement au Maroc.' },
    en: { title: 'Tooristoo Blog — Morocco Travel Guides & Negotiation Tips', desc: 'Comprehensive guides, negotiation tips and reference prices by city (Marrakech, Fes, Agadir…) to explore Morocco with confidence.' },
    es: { title: 'Blog Tooristoo — Guías de Viaje Marruecos & Consejos de Negociación', desc: 'Guías completas, consejos de negociación y precios de referencia por ciudad para explorar Marruecos con seguridad.' },
    de: { title: 'Tooristoo Blog — Marokko Reiseführer & Verhandlungstipps', desc: 'Umfassende Reiseführer, Verhandlungstipps und Referenzpreise nach Stadt für eine sichere Marokko-Reise.' },
    ar: { title: 'مدونة Tooristoo — أدلة السفر إلى المغرب ونصائح التفاوض', desc: 'أدلة شاملة ونصائح تفاوض وأسعار مرجعية حسب المدينة لاستكشاف المغرب بثقة وراحة.' },
  },
  providers: {
    fr: { title: 'Prestataires Certifiés Tooristoo — Hôtels, Taxis, Restaurants au Maroc', desc: 'Répertoire de prestataires vérifiés au Maroc avec prix officiels : hôtels, riads, taxis, restaurants, guides à Marrakech, Fès, Agadir et partout.' },
    en: { title: 'Certified Tooristoo Providers — Hotels, Taxis, Restaurants in Morocco', desc: 'Directory of verified providers in Morocco with official prices: hotels, riads, taxis, restaurants, guides in Marrakech, Fes, Agadir and more.' },
    es: { title: 'Proveedores Certificados Tooristoo — Hoteles, Taxis, Restaurantes en Marruecos', desc: 'Directorio de proveedores verificados en Marruecos con precios oficiales: hoteles, riads, taxis, restaurantes.' },
    de: { title: 'Zertifizierte Tooristoo-Anbieter — Hotels, Taxis, Restaurants in Marokko', desc: 'Verzeichnis geprüfter Anbieter in Marokko mit offiziellen Preisen: Hotels, Riads, Taxis, Restaurants, Reiseführer.' },
    ar: { title: 'مزودو Tooristoo المعتمدون — فنادق وتاكسي ومطاعم في المغرب', desc: 'دليل مزودي الخدمات الموثوقين في المغرب بأسعار رسمية شفافة: فنادق ورياضات وتاكسي ومطاعم وأدلة سياحية.' },
  },
  alerts: {
    fr: { title: 'Conseils de Vigilance Touristique au Maroc — Tooristoo', desc: 'Conseils pratiques pour voyager sereinement au Maroc : prix de référence taxis, guides officiels, restaurants avec menu affiché. Voyagez informé.' },
    en: { title: 'Morocco Travel Safety Tips — Tooristoo', desc: 'Practical tips for stress-free travel in Morocco: reference prices for taxis, official guides, restaurants with displayed menus. Travel informed.' },
    es: { title: 'Consejos de Seguridad para Turistas en Marruecos — Tooristoo', desc: 'Consejos prácticos para viajar con tranquilidad en Marruecos: precios de referencia, guías oficiales, restaurantes con carta de precios.' },
    de: { title: 'Marokko Reise-Sicherheitstipps — Tooristoo', desc: 'Praktische Tipps für sorgenfreies Reisen in Marokko: Referenzpreise für Taxis, offizielle Guides, Restaurants mit Preiskarte.' },
    ar: { title: 'نصائح السفر الآمن في المغرب — Tooristoo', desc: 'نصائح عملية للسفر بثقة في المغرب: أسعار مرجعية للتاكسي، مرشدون رسميون، مطاعم بقوائم أسعار شفافة.' },
  },
};

// BreadcrumbList helper — generates breadcrumb for any page
const breadcrumb = (items) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map(({ name, url }, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name,
    item: url,
  })),
});

// Shared Organization reference (used in multiple pages)
const ORG = {
  '@type': 'Organization',
  '@id': `${BASE}/#organization`,
  name: 'Tooristoo',
  url: BASE,
  logo: { '@type': 'ImageObject', url: `${BASE}/logo.png`, width: 200, height: 200 },
  description: 'Startup franco-marocaine créée en 2023 pour aider les touristes à connaître les prix réels au Maroc et négocier équitablement via un coach IA vocal multilingue.',
  foundingDate: '2023',
  foundingLocation: { '@type': 'Place', name: 'Marrakech', addressCountry: 'MA' },
  contactPoint: { '@type': 'ContactPoint', email: 'contact@tooristoo.com', contactType: 'customer support', availableLanguage: ['French','English','Spanish','German','Arabic'] },
  areaServed: { '@type': 'Country', name: 'Morocco' },
  sameAs: ['https://www.instagram.com/tooristoo','https://www.facebook.com/tooristoo','https://twitter.com/tooristoo'],
};

// Builds the schema array for a given page — supports multiple @graph entries
const buildSchemas = (page) => {
  switch (page) {

    case 'home':
      return [
        { '@context': 'https://schema.org', ...ORG },
        {
          '@context': 'https://schema.org',
          '@type': 'MobileApplication',
          '@id': `${BASE}/app#mobileapp`,
          name: 'Tooristoo',
          url: `${BASE}/app`,
          applicationCategory: 'TravelApplication',
          operatingSystem: 'iOS, Android, Web',
          description: 'Coach vocal IA pour négocier les meilleurs prix et voyager sereinement au Maroc. Disponible en 6 langues dont le darija marocain.',
          offers: [
            { '@type': 'Offer', name: 'Gratuit', price: '0', priceCurrency: 'EUR', description: '3 analyses par jour' },
            { '@type': 'Offer', name: 'Voyageur', price: '5', priceCurrency: 'EUR', description: 'Analyses illimitées' },
            { '@type': 'Offer', name: 'Pro', price: '12', priceCurrency: 'EUR', description: 'Tout Voyageur + analytics avancés' },
          ],
          featureList: ['Analyse des prix en temps réel', 'Alertes prix anormaux', 'Phrases de négociation en darija', 'Répertoire de prestataires certifiés', 'Historique des négociations'],
          inLanguage: ['fr', 'en', 'es', 'de', 'ar'],
          author: { '@id': `${BASE}/#organization` },
          aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.8', reviewCount: '1240', bestRating: '5' },
        },
        breadcrumb([{ name: 'Accueil', url: BASE }]),
      ];

    case 'app':
      return [
        {
          '@context': 'https://schema.org',
          '@type': 'MobileApplication',
          '@id': `${BASE}/app#mobileapp`,
          name: 'Tooristoo — Coach IA Vocal',
          url: `${BASE}/app`,
          applicationCategory: 'TravelApplication',
          operatingSystem: 'iOS, Android, Web',
          description: 'Coach vocal IA en temps réel pour analyser les prix et négocier équitablement comme un local au Maroc.',
          offers: [
            { '@type': 'Offer', name: 'Gratuit', price: '0', priceCurrency: 'EUR', description: '3 analyses par jour' },
            { '@type': 'Offer', name: 'Voyageur', price: '5', priceCurrency: 'EUR', description: 'Analyses illimitées' },
            { '@type': 'Offer', name: 'Pro', price: '12', priceCurrency: 'EUR', description: 'Tout Voyageur + analytics avancés' },
          ],
          featureList: ['Analyse de prix en temps réel', 'Alertes prix anormaux', 'Phrases en darija', 'Prestataires certifiés', 'Historique des négociations'],
          inLanguage: ['fr', 'en', 'es', 'de', 'ar'],
          author: { '@id': `${BASE}/#organization` },
          aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.8', reviewCount: '1240', bestRating: '5' },
        },
        breadcrumb([
          { name: 'Accueil', url: BASE },
          { name: 'Application', url: `${BASE}/app` },
        ]),
      ];

    case 'faq':
      return [
        {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          '@id': `${BASE}/faq`,
          name: 'FAQ Tooristoo — Questions fréquentes sur le coach IA Maroc',
          url: `${BASE}/faq`,
          publisher: { '@id': `${BASE}/#organization` },
          mainEntity: [
            { '@type': 'Question', name: 'Qu\'est-ce que Tooristoo ?', acceptedAnswer: { '@type': 'Answer', text: 'Tooristoo est un coach vocal IA qui aide les touristes à négocier les meilleurs prix au Maroc et obtenir des phrases de négociation en darija en temps réel. Disponible gratuitement sur web, iOS et Android.' } },
            { '@type': 'Question', name: 'Est-ce que Tooristoo est gratuit ?', acceptedAnswer: { '@type': 'Answer', text: 'Oui, Tooristoo propose un plan gratuit avec 3 analyses par jour sans carte de crédit. Les plans Voyageur (5€/mois) et Pro (12€/mois) offrent des analyses illimitées et des fonctionnalités avancées.' } },
            { '@type': 'Question', name: 'Dans quelles langues fonctionne Tooristoo ?', acceptedAnswer: { '@type': 'Answer', text: 'Tooristoo est disponible en 6 langues : français, anglais, espagnol, allemand, arabe et darija marocain.' } },
            { '@type': 'Question', name: 'Quelles villes du Maroc sont couvertes ?', acceptedAnswer: { '@type': 'Answer', text: 'Tooristoo couvre toutes les grandes villes : Marrakech, Fès, Casablanca, Chefchaouen, Agadir, Tanger, Rabat, Meknès, Ouarzazate, Merzouga, Essaouira, Dakhla et El Jadida.' } },
            { '@type': 'Question', name: 'Comment fonctionne l\'analyse de prix ?', acceptedAnswer: { '@type': 'Answer', text: 'L\'IA compare le prix demandé à une base de données de prix réels locaux. Si le prix dépasse significativement la fourchette normale, une alerte est émise avec le niveau de risque et une stratégie de négociation.' } },
            { '@type': 'Question', name: 'Quels types de services sont analysés ?', acceptedAnswer: { '@type': 'Answer', text: 'Taxis, hôtels, riads, restaurants, excursions, shopping et souks, transport interurbain, guides touristiques, spas et hammams.' } },
            { '@type': 'Question', name: 'Tooristoo fonctionne-t-il sur mobile ?', acceptedAnswer: { '@type': 'Answer', text: 'Oui, Tooristoo est une PWA (Progressive Web App) accessible directement depuis le navigateur sur iOS et Android, sans installation requise depuis un store.' } },
            { '@type': 'Question', name: 'Puis-je utiliser Tooristoo hors ligne ?', acceptedAnswer: { '@type': 'Answer', text: 'L\'analyse IA nécessite une connexion internet. Cependant, toutes vos négociations sont sauvegardées localement et accessibles hors ligne.' } },
            { '@type': 'Question', name: 'Comment signaler un prix anormal ?', acceptedAnswer: { '@type': 'Answer', text: 'Depuis l\'application, après une analyse, un bouton "Signaler" permet de soumettre un signalement communautaire avec la localisation, le type de service et le montant.' } },
            { '@type': 'Question', name: 'Mes données sont-elles sécurisées ?', acceptedAnswer: { '@type': 'Answer', text: 'Oui. Toutes les données sont chiffrées en transit (HTTPS) et au repos. La reconnaissance vocale est traitée localement — seul le transcript textuel est envoyé à notre IA. Aucun audio n\'est stocké sur nos serveurs.' } },
          ],
        },
        breadcrumb([
          { name: 'Accueil', url: BASE },
          { name: 'FAQ', url: `${BASE}/faq` },
        ]),
      ];

    case 'about':
      return [
        {
          '@context': 'https://schema.org',
          '@type': 'AboutPage',
          '@id': `${BASE}/about`,
          name: 'À Propos de Tooristoo',
          url: `${BASE}/about`,
          description: 'Tooristoo est une startup franco-marocaine fondée en 2023 pour aider les touristes à connaître les prix réels au Maroc et voyager en toute sérénité.',
          publisher: { '@id': `${BASE}/#organization` },
          mainEntity: {
            '@context': 'https://schema.org',
            ...ORG,
            founder: [
              { '@type': 'Person', name: 'Youssef Benali', jobTitle: 'CEO & Co-fondateur', description: 'Ex-guide touristique à Marrakech, créateur de Tooristoo.' },
              { '@type': 'Person', name: 'Sophie Martin', jobTitle: 'CTO & Co-fondatrice', description: 'Ingénieure IA spécialisée en NLP.' },
            ],
            numberOfEmployees: { '@type': 'QuantitativeValue', value: 12 },
            award: 'Startup Tourisme Maroc 2024',
          },
        },
        breadcrumb([
          { name: 'Accueil', url: BASE },
          { name: 'À propos', url: `${BASE}/about` },
        ]),
      ];

    case 'blog':
      return [
        breadcrumb([
          { name: 'Accueil', url: BASE },
          { name: 'Blog', url: `${BASE}/blog` },
        ]),
      ];

    case 'providers':
      return [
        {
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          '@id': `${BASE}/providers#list`,
          name: 'Prestataires Certifiés Tooristoo au Maroc',
          description: 'Répertoire de prestataires de services touristiques certifiés au Maroc avec prix officiels : hôtels, riads, taxis, restaurants, guides, excursions, spas.',
          url: `${BASE}/providers`,
          numberOfItems: 6,
          itemListElement: [
            {
              '@type': 'ListItem', position: 1,
              item: {
                '@type': 'TaxiService',
                name: 'Taxis certifiés Tooristoo — Marrakech',
                description: 'Taxis officiels avec compteur et tarifs régulés à Marrakech. Aéroport Menara → Gueliz : 70–100 MAD.',
                priceRange: '7–100 MAD',
                address: { '@type': 'PostalAddress', addressLocality: 'Marrakech', addressCountry: 'MA' },
                geo: { '@type': 'GeoCoordinates', latitude: 31.6295, longitude: -7.9811 },
                url: `${BASE}/providers`,
                openingHours: 'Mo-Su 00:00-23:59',
                telephone: '+212-524-000000',
                aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.7', reviewCount: '312' },
              },
            },
            {
              '@type': 'ListItem', position: 2,
              item: {
                '@type': 'LodgingBusiness',
                name: 'Riads & Hôtels certifiés — Fès',
                description: 'Hébergements vérifiés avec prix officiels à Fès. Chambre double : 350–600 MAD/nuit, petit-déjeuner inclus.',
                priceRange: '350–600 MAD/nuit',
                address: { '@type': 'PostalAddress', addressLocality: 'Fès', addressCountry: 'MA' },
                geo: { '@type': 'GeoCoordinates', latitude: 34.0372, longitude: -5.0003 },
                url: `${BASE}/providers`,
                aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.6', reviewCount: '198' },
              },
            },
            {
              '@type': 'ListItem', position: 3,
              item: {
                '@type': 'LocalBusiness',
                name: 'Guides touristiques certifiés — Chefchaouen',
                description: 'Guides officiels agréés Ministère du Tourisme marocain. Tarif journée : 400–600 MAD.',
                priceRange: '400–600 MAD/jour',
                address: { '@type': 'PostalAddress', addressLocality: 'Chefchaouen', addressCountry: 'MA' },
                geo: { '@type': 'GeoCoordinates', latitude: 35.1688, longitude: -5.2636 },
                url: `${BASE}/providers`,
                aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '87' },
              },
            },
            {
              '@type': 'ListItem', position: 4,
              item: {
                '@type': 'FoodEstablishment',
                name: 'Restaurants certifiés — Casablanca',
                description: 'Restaurants authentiques avec menus et fourchettes de prix affichés. Plat principal : 120–200 MAD.',
                priceRange: '80–200 MAD',
                servesCuisine: 'Moroccan',
                address: { '@type': 'PostalAddress', addressLocality: 'Casablanca', addressCountry: 'MA' },
                geo: { '@type': 'GeoCoordinates', latitude: 33.5731, longitude: -7.5898 },
                url: `${BASE}/providers`,
                aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.5', reviewCount: '256' },
              },
            },
            {
              '@type': 'ListItem', position: 5,
              item: {
                '@type': 'TouristAttraction',
                name: 'Excursions désert certifiées — Merzouga',
                description: 'Excursions Erg Chebbi avec prix officiels garantis. 2j/1n en groupe : 600–900 MAD/pers.',
                priceRange: '600–900 MAD/pers (groupe)',
                address: { '@type': 'PostalAddress', addressLocality: 'Merzouga', addressCountry: 'MA' },
                geo: { '@type': 'GeoCoordinates', latitude: 31.0801, longitude: -4.0128 },
                url: `${BASE}/providers`,
                aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.8', reviewCount: '421' },
              },
            },
            {
              '@type': 'ListItem', position: 6,
              item: {
                '@type': 'HealthAndBeautyBusiness',
                name: 'Spas & Hammams certifiés — Agadir',
                description: 'Hammams traditionnels et spas avec tarifs transparents affichés. Entrée + gommage : 80–150 MAD.',
                priceRange: '80–350 MAD',
                address: { '@type': 'PostalAddress', addressLocality: 'Agadir', addressCountry: 'MA' },
                geo: { '@type': 'GeoCoordinates', latitude: 30.4278, longitude: -9.5981 },
                url: `${BASE}/providers`,
                aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.6', reviewCount: '143' },
              },
            },
          ],
        },
        breadcrumb([
          { name: 'Accueil', url: BASE },
          { name: 'Prestataires certifiés', url: `${BASE}/providers` },
        ]),
      ];

    case 'alerts':
      return [
        {
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          '@id': `${BASE}/alerts`,
          name: 'Conseils de Vigilance Touristique au Maroc — Tooristoo',
          url: `${BASE}/alerts`,
          description: 'Conseils pratiques pour voyager sereinement au Maroc : prix de référence taxis, guides officiels, restaurants avec menu affiché.',
          publisher: { '@id': `${BASE}/#organization` },
          mainEntity: {
            '@type': 'ItemList',
            name: 'Conseils pratiques pour touristes au Maroc',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Taxis — Utiliser le compteur ou négocier avant de monter', description: 'Tarif officiel Marrakech centre : 7–15 MAD. Aéroport Menara → Gueliz : 70–100 MAD.' },
              { '@type': 'ListItem', position: 2, name: 'Guides touristiques — Reconnaître les officiels', description: 'Les guides officiels portent une carte agréée par le Ministère du Tourisme. Tarif journée : 400–600 MAD.' },
              { '@type': 'ListItem', position: 3, name: 'Restaurants — Vérifier les prix avant de commander', description: 'Tajine Marrakech : 60–120 MAD. Couscous : 80–150 MAD. Thé à la menthe : 10–20 MAD.' },
              { '@type': 'ListItem', position: 4, name: 'Souks — Prix de référence artisanat', description: 'Babouches : 80–200 MAD, tapis berbère : 500–3000 MAD, théière cuivre : 150–400 MAD.' },
              { '@type': 'ListItem', position: 5, name: 'Excursions désert — Tarifs officiels', description: 'Marrakech–Merzouga 2j/1n groupe : 600–900 MAD/pers. Balade dromadaire 1h : 150–250 MAD.' },
              { '@type': 'ListItem', position: 6, name: 'Change de devises — Canaux officiels uniquement', description: '1 EUR ≈ 10,8–11 MAD. Changez uniquement en banque ou bureau de change agréé.' },
            ],
          },
        },
        breadcrumb([
          { name: 'Accueil', url: BASE },
          { name: 'Conseils de voyage', url: `${BASE}/alerts` },
        ]),
      ];

    case 'darija':
      return [
        {
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          '@id': `${BASE}/darija`,
          name: 'Phrasebook Darija Marocain — Phrases pour Voyager au Maroc',
          url: `${BASE}/darija`,
          description: 'Guide complet de phrases en darija marocain pour négocier et voyager au Maroc.',
          publisher: { '@id': `${BASE}/#organization` },
          about: { '@type': 'Language', name: 'Moroccan Arabic (Darija)', alternateName: 'ary' },
        },
        breadcrumb([
          { name: 'Accueil', url: BASE },
          { name: 'Phrasebook Darija', url: `${BASE}/darija` },
        ]),
      ];

    case 'charter':
      return [
        {
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          '@id': `${BASE}/charter`,
          name: 'Charte des Prestataires Certifiés Tooristoo — 7 Engagements',
          url: `${BASE}/charter`,
          description: 'La charte des 7 engagements que chaque prestataire certifié Tooristoo au Maroc s\'engage à respecter.',
          publisher: { '@id': `${BASE}/#organization` },
          mainEntity: {
            '@type': 'ItemList',
            name: '7 engagements Charte Tooristoo',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Prix officiels affichés — aucune majoration pour touristes étrangers' },
              { '@type': 'ListItem', position: 2, name: 'Pas de frais cachés — TVA incluse, pourboires non obligatoires' },
              { '@type': 'ListItem', position: 3, name: 'Vérification terrain — visite anonyme avant certification' },
              { '@type': 'ListItem', position: 4, name: 'Note minimale 3.5/5 — contrôle qualité continu' },
              { '@type': 'ListItem', position: 5, name: 'Contact garanti — réponse sous 4h en haute saison' },
              { '@type': 'ListItem', position: 6, name: 'Anti-discrimination — même service, même prix pour tous' },
              { '@type': 'ListItem', position: 7, name: 'Signalements traités sous 24h — suspension immédiate si confirmé' },
            ],
          },
        },
        breadcrumb([
          { name: 'Accueil', url: BASE },
          { name: 'Charte prestataires', url: `${BASE}/charter` },
        ]),
      ];

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