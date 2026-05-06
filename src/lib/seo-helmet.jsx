/**
 * Centralized SEO Helmet component.
 * Injects title, meta description, OG, Twitter Card, canonical, hreflang, and Schema.org JSON-LD.
 * Usage: <PageHelmet page="faq" lang={lang} />
 */
import { Helmet } from 'react-helmet-async';
import { getFaqExtended } from './faq-extended';

const BASE = 'https://www.tooristoo.com';
// Standard BCP-47 language codes for hreflang
const HREFLANG_MAP = {
  fr: 'fr',
  en: 'en',
  es: 'es',
  de: 'de',
  ar: 'ar',
  // darija is mapped to ar-MA (BCP-47 standard for Moroccan Arabic) below
};
const LANGS = Object.keys(HREFLANG_MAP);

const META = {
  home: {
    fr: { title: 'Tooristoo — Coach Vocal IA pour Décoder les Prix au Maroc', desc: 'Coach vocal IA pour décoder les fourchettes de prix au Maroc et négocier comme un local. Analyse en temps réel, multilingue, prix de référence par ville.' },
    en: { title: 'Tooristoo — AI Voice Coach to Decode Prices in Morocco', desc: 'AI voice coach to decode price ranges in Morocco and negotiate like a local. Real-time analysis, multilingual, reference prices by city.' },
    es: { title: 'Tooristoo — Coach de Voz IA para Decodificar Precios en Marruecos', desc: 'Coach de voz IA para decodificar rangos de precios en Marruecos y negociar como un local. Análisis en tiempo real, multilingüe.' },
    de: { title: 'Tooristoo — KI-Sprachcoach zur Preisentschlüsselung in Marokko', desc: 'KI-Sprachcoach zum Entschlüsseln von Preisspannen in Marokko und Verhandeln wie ein Einheimischer. Echtzeitanalyse, mehrsprachig.' },
    ar: { title: 'Tooristoo — مدرب صوتي ذكي لفهم الأسعار في المغرب', desc: 'مدرب صوتي ذكي لفهم النطاقات السعرية في المغرب والتفاوض كالسكان المحليين. تحليل لحظي، متعدد اللغات.' },
  },
  app: {
    fr: { title: 'Coach Vocal IA Tooristoo | Décoder les Prix au Maroc en Temps Réel', desc: 'Coach vocal IA en temps réel pour décoder les fourchettes de prix et négocier sereinement comme un local au Maroc.' },
    en: { title: 'Tooristoo AI Voice Coach | Decode Prices in Morocco in Real Time', desc: 'Real-time AI voice coach to decode price ranges and negotiate calmly like a local in Morocco.' },
    es: { title: 'Coach Vocal IA Tooristoo | Decodifica Precios en Marruecos en Tiempo Real', desc: 'Coach de voz IA en tiempo real para decodificar rangos de precios y negociar con tranquilidad como un local en Marruecos.' },
    de: { title: 'Tooristoo KI-Sprachcoach | Preise in Marokko in Echtzeit Entschlüsseln', desc: 'KI-Sprachcoach in Echtzeit zur Entschlüsselung von Preisspannen und ruhigen Verhandeln wie ein Einheimischer in Marokko.' },
    ar: { title: 'مدرب Tooristoo الصوتي الذكي | فهم الأسعار في المغرب لحظياً', desc: 'مدرب صوتي ذكي لحظي لفهم النطاقات السعرية والتفاوض بهدوء كالسكان المحليين في المغرب.' },
  },
  faq: {
    fr: { title: 'FAQ Tooristoo — Questions Fréquentes sur le Coach Vocal IA Maroc', desc: 'Réponses aux questions fréquentes sur Tooristoo : fonctionnement, langues supportées, villes couvertes, plan gratuit, méthodologie de prix.' },
    en: { title: 'Tooristoo FAQ — Frequently Asked Questions about the AI Voice Coach', desc: 'Answers to frequent questions about Tooristoo: how it works, supported languages, cities covered, free plan, pricing methodology.' },
    es: { title: 'FAQ Tooristoo — Preguntas Frecuentes sobre el Coach Vocal IA', desc: 'Respuestas a preguntas frecuentes sobre Tooristoo: funcionamiento, idiomas, ciudades cubiertas, plan gratuito, metodología de precios.' },
    de: { title: 'Tooristoo FAQ — Häufig Gestellte Fragen zum KI-Sprachcoach', desc: 'Antworten auf häufige Fragen zu Tooristoo: Funktionsweise, unterstützte Sprachen, abgedeckte Städte, kostenloser Plan, Preismethodik.' },
    ar: { title: 'الأسئلة الشائعة حول Tooristoo — مدرب صوتي ذكي للمغرب', desc: 'إجابات عن الأسئلة الشائعة حول Tooristoo: كيف يعمل، اللغات المدعومة، المدن المغطاة، الخطة المجانية، منهجية الأسعار.' },
  },
  about: {
    fr: { title: 'À Propos de Tooristoo — Initiative Née à Marrakech pour la Vigilance Tarifaire', desc: 'Découvrez l\'histoire et la mission de Tooristoo, l\'initiative à échelle humaine qui aide les voyageurs à connaître les fourchettes de prix au Maroc.' },
    en: { title: 'About Tooristoo — A Marrakech-Born Initiative for Price Vigilance', desc: 'Discover the story and mission of Tooristoo, a human-scale initiative helping travellers know reference price ranges in Morocco.' },
    es: { title: 'Acerca de Tooristoo — Iniciativa Nacida en Marrakech para la Vigilancia Tarifaria', desc: 'Descubre la historia y misión de Tooristoo, la iniciativa a escala humana que ayuda a los viajeros a conocer los rangos de precios en Marruecos.' },
    de: { title: 'Über Tooristoo — Eine in Marrakesch geborene Initiative für Preisvigilanz', desc: 'Entdecken Sie die Geschichte und Mission von Tooristoo, einer Initiative auf menschlicher Ebene für Preistransparenz in Marokko.' },
    ar: { title: 'عن Tooristoo — مبادرة وُلدت في مراكش من أجل اليقظة السعرية', desc: 'اكتشف قصة ومهمة Tooristoo، المبادرة على المستوى الإنساني التي تساعد المسافرين على معرفة النطاقات السعرية في المغرب.' },
  },
  blog: {
    fr: { title: 'Blog Tooristoo — Guides de Voyage Maroc & Conseils de Négociation', desc: 'Guides complets, conseils de négociation et fourchettes de prix de référence par ville (Marrakech, Fès, Casablanca, Agadir…) pour voyager au Maroc.' },
    en: { title: 'Tooristoo Blog — Morocco Travel Guides & Negotiation Tips', desc: 'Comprehensive guides, negotiation tips and reference price ranges by city (Marrakech, Fes, Casablanca, Agadir…) to explore Morocco with confidence.' },
    es: { title: 'Blog Tooristoo — Guías de Viaje Marruecos & Consejos de Negociación', desc: 'Guías completas, consejos de negociación y rangos de precios de referencia por ciudad para explorar Marruecos con confianza.' },
    de: { title: 'Tooristoo Blog — Marokko Reiseführer & Verhandlungstipps', desc: 'Umfassende Reiseführer, Verhandlungstipps und Referenzpreisspannen nach Stadt für eine sichere Marokko-Reise.' },
    ar: { title: 'مدونة Tooristoo — أدلة السفر إلى المغرب ونصائح التفاوض', desc: 'أدلة شاملة ونصائح تفاوض ونطاقات سعرية مرجعية حسب المدينة لاستكشاف المغرب بثقة.' },
  },
  providers: {
    fr: { title: 'Prestataires Référencés Tooristoo — Hôtels, Taxis, Restaurants au Maroc', desc: 'Répertoire de prestataires sélectionnés au Maroc selon notre méthodologie publique : note Google ≥ 4,0/5 sur 50+ avis, mise à jour trimestrielle.' },
    en: { title: 'Tooristoo Listed Providers — Hotels, Taxis, Restaurants in Morocco', desc: 'Directory of selected providers in Morocco based on our public methodology: Google rating ≥ 4.0/5 on 50+ reviews, quarterly updates.' },
    es: { title: 'Proveedores Listados Tooristoo — Hoteles, Taxis, Restaurantes en Marruecos', desc: 'Directorio de proveedores seleccionados en Marruecos según nuestra metodología pública: calificación Google ≥ 4,0/5 en 50+ reseñas.' },
    de: { title: 'Gelistete Tooristoo-Anbieter — Hotels, Taxis, Restaurants in Marokko', desc: 'Verzeichnis ausgewählter Anbieter in Marokko nach unserer öffentlichen Methodik: Google-Bewertung ≥ 4,0/5 auf 50+ Bewertungen.' },
    ar: { title: 'المزودون المدرجون في Tooristoo — فنادق وسيارات أجرة ومطاعم في المغرب', desc: 'دليل المزودين المختارين في المغرب وفق منهجيتنا العلنية: تقييم Google ≥ 4.0/5 على 50+ تعليقاً، تحديث فصلي.' },
  },
  alerts: {
    fr: { title: 'Conseils de Vigilance Tarifaire au Maroc — Tooristoo', desc: 'Conseils pratiques pour voyager sereinement au Maroc : fourchettes de prix taxis, guides officiels, restaurants avec menu affiché, bons réflexes par ville.' },
    en: { title: 'Morocco Price Vigilance Tips — Tooristoo', desc: 'Practical tips for stress-free travel in Morocco: reference taxi price ranges, official guides, restaurants with displayed menus, good habits by city.' },
    es: { title: 'Consejos de Vigilancia Tarifaria en Marruecos — Tooristoo', desc: 'Consejos prácticos para viajar con tranquilidad en Marruecos: rangos de precios taxis, guías oficiales, restaurantes con carta, buenos hábitos.' },
    de: { title: 'Marokko Preisvigilanz-Tipps — Tooristoo', desc: 'Praktische Tipps für sorgenfreies Reisen in Marokko: Referenzpreisspannen für Taxis, offizielle Guides, Restaurants mit Preiskarte.' },
    ar: { title: 'نصائح اليقظة السعرية في المغرب — Tooristoo', desc: 'نصائح عملية للسفر بثقة في المغرب: نطاقات الأسعار المرجعية للتاكسي، المرشدون الرسميون، المطاعم بقوائم أسعار، عادات جيدة.' },
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
// IMPORTANT : aucune fausse claim. Pas de fausse notation, pas de fausses récompenses,
// pas de faux nombre d'employés. Tout est vérifiable.
const ORG = {
  '@type': 'Organization',
  '@id': `${BASE}/#organization`,
  name: 'Tooristoo',
  url: BASE,
  logo: { '@type': 'ImageObject', url: `${BASE}/logo.png`, width: 200, height: 200 },
  description: 'Tooristoo, initiative née à Marrakech en 2026 pour aider les voyageurs à décoder les fourchettes de prix au Maroc grâce à un coach vocal IA multilingue.',
  foundingDate: '2026',
  foundingLocation: { '@type': 'Place', name: 'Marrakech', addressCountry: 'MA' },
  contactPoint: { '@type': 'ContactPoint', email: 'contact@tooristoo.com', contactType: 'customer support', availableLanguage: ['French','English','Spanish','German','Arabic','Moroccan Arabic'] },
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
          description: 'Coach vocal IA pour décoder les fourchettes de prix et négocier comme un local au Maroc. Disponible en 6 langues dont le darija marocain.',
          offers: [
            { '@type': 'Offer', name: 'Gratuit', price: '0', priceCurrency: 'EUR', description: '3 analyses par mois' },
            { '@type': 'Offer', name: 'Voyageur', price: '5', priceCurrency: 'EUR', description: '50 analyses par mois' },
            { '@type': 'Offer', name: 'Voyageur+', price: '9', priceCurrency: 'EUR', description: '100 analyses par mois' },
          ],
          featureList: ['Analyse de prix en temps réel', 'Fourchettes de référence par ville', 'Phrases de négociation en darija', 'Annuaire de prestataires sélectionnés', 'Historique des analyses'],
          inLanguage: ['fr', 'en', 'es', 'de', 'ar', 'ar-MA'],
          author: { '@id': `${BASE}/#organization` },
          // aggregateRating retiré : pas de notations vérifiables au lancement
        },
        breadcrumb([{ name: 'Accueil', url: BASE }]),
      ];

    case 'app':
      return [
        {
          '@context': 'https://schema.org',
          '@type': 'MobileApplication',
          '@id': `${BASE}/app#mobileapp`,
          name: 'Tooristoo — Coach Vocal IA',
          url: `${BASE}/app`,
          applicationCategory: 'TravelApplication',
          operatingSystem: 'iOS, Android, Web',
          description: 'Coach vocal IA en temps réel pour décoder les fourchettes de prix et négocier sereinement comme un local au Maroc.',
          offers: [
            { '@type': 'Offer', name: 'Gratuit', price: '0', priceCurrency: 'EUR', description: '3 analyses par jour' },
            { '@type': 'Offer', name: 'Voyageur', price: '5', priceCurrency: 'EUR', description: '50 analyses par mois' },
            { '@type': 'Offer', name: 'Voyageur Plus', price: '9', priceCurrency: 'EUR', description: '100 analyses par mois' },
          ],
          featureList: ['Analyse de prix en temps réel', 'Fourchettes de référence', 'Phrases en darija', 'Prestataires référencés', 'Historique des analyses'],
          inLanguage: ['fr', 'en', 'es', 'de', 'ar', 'ar-MA'],
          author: { '@id': `${BASE}/#organization` },
        },
        breadcrumb([
          { name: 'Accueil', url: BASE },
          { name: 'Application', url: `${BASE}/app` },
        ]),
      ];

    case 'faq':
      return (lang) => {
        const ext = getFaqExtended(lang || 'fr');
        return [
          {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            '@id': `${BASE}/faq`,
            name: 'FAQ Tooristoo — Questions fréquentes sur le coach vocal IA Maroc',
            url: `${BASE}/faq`,
            publisher: { '@id': `${BASE}/#organization` },
            mainEntity: [
              { '@type': 'Question', name: 'Qu\'est-ce que Tooristoo ?', acceptedAnswer: { '@type': 'Answer', text: 'Tooristoo est un coach vocal IA qui aide les voyageurs à connaître les fourchettes de prix de référence au Maroc et obtenir des phrases de négociation en darija en temps réel. Disponible gratuitement sur web, iOS et Android.' } },
              { '@type': 'Question', name: 'Est-ce que Tooristoo est gratuit ?', acceptedAnswer: { '@type': 'Answer', text: 'Oui, Tooristoo propose un plan gratuit avec 3 analyses par jour sans carte de crédit. Les plans Voyageur (5€/mois) et Voyageur Plus (9€/mois) offrent 50 à 100 analyses par mois.' } },
              { '@type': 'Question', name: 'Dans quelles langues fonctionne Tooristoo ?', acceptedAnswer: { '@type': 'Answer', text: 'Tooristoo est disponible en 6 langues : français, anglais, espagnol, allemand, arabe et darija marocain.' } },
              { '@type': 'Question', name: 'Quelles villes du Maroc sont couvertes ?', acceptedAnswer: { '@type': 'Answer', text: 'Tooristoo couvre 13 villes principales : Marrakech, Fès, Casablanca, Chefchaouen, Agadir, Tanger, Rabat, Meknès, Ouarzazate, Merzouga, Essaouira, Dakhla et El Jadida.' } },
              { '@type': 'Question', name: 'Comment fonctionne l\'analyse de prix ?', acceptedAnswer: { '@type': 'Answer', text: 'L\'IA compare le prix demandé à des fourchettes de référence par ville et par catégorie de service. Si le prix dépasse significativement la fourchette habituelle, un signal de vigilance s\'affiche avec une stratégie de négociation adaptée.' } },
              { '@type': 'Question', name: 'Quels types de services sont analysés ?', acceptedAnswer: { '@type': 'Answer', text: 'Taxis, hôtels, riads, restaurants, excursions, shopping et souks, transport interurbain, guides touristiques, spas et hammams.' } },
              { '@type': 'Question', name: 'Tooristoo fonctionne-t-il sur mobile ?', acceptedAnswer: { '@type': 'Answer', text: 'Oui, Tooristoo est une PWA (Progressive Web App) accessible directement depuis le navigateur sur iOS et Android, sans installation requise depuis un store.' } },
              { '@type': 'Question', name: 'Puis-je utiliser Tooristoo hors ligne ?', acceptedAnswer: { '@type': 'Answer', text: 'L\'analyse IA nécessite une connexion internet. Cependant, toutes vos analyses passées sont sauvegardées localement et accessibles hors ligne.' } },
              { '@type': 'Question', name: 'Comment signaler un écart de prix ?', acceptedAnswer: { '@type': 'Answer', text: 'Depuis l\'application, après une analyse, un bouton "Signaler" permet de soumettre un signalement communautaire avec la localisation, le type de service et le montant.' } },
              { '@type': 'Question', name: 'Mes données sont-elles sécurisées ?', acceptedAnswer: { '@type': 'Answer', text: 'Oui. Toutes les données sont chiffrées en transit (HTTPS) et au repos. La reconnaissance vocale est traitée localement — seul le transcript textuel est envoyé à notre IA. Aucun audio n\'est stocké sur nos serveurs.' } },
              { '@type': 'Question', name: ext.faq_q13, acceptedAnswer: { '@type': 'Answer', text: ext.faq_a13 } },
              { '@type': 'Question', name: ext.faq_q14, acceptedAnswer: { '@type': 'Answer', text: ext.faq_a14 } },
              { '@type': 'Question', name: ext.faq_q15, acceptedAnswer: { '@type': 'Answer', text: ext.faq_a15 } },
              { '@type': 'Question', name: ext.faq_q16, acceptedAnswer: { '@type': 'Answer', text: ext.faq_a16 } },
              { '@type': 'Question', name: ext.faq_q17, acceptedAnswer: { '@type': 'Answer', text: ext.faq_a17 } },
              { '@type': 'Question', name: ext.faq_q18, acceptedAnswer: { '@type': 'Answer', text: ext.faq_a18 } },
              { '@type': 'Question', name: ext.faq_q19, acceptedAnswer: { '@type': 'Answer', text: ext.faq_a19 } },
              { '@type': 'Question', name: ext.faq_q20, acceptedAnswer: { '@type': 'Answer', text: ext.faq_a20 } },
            ],
          },
          breadcrumb([
            { name: 'Accueil', url: BASE },
            { name: 'FAQ', url: `${BASE}/faq` },
          ]),
        ];
      };

    case 'about':
      return [
        {
          '@context': 'https://schema.org',
          '@type': 'AboutPage',
          '@id': `${BASE}/about`,
          name: 'À Propos de Tooristoo',
          url: `${BASE}/about`,
          description: 'Tooristoo est une initiative à échelle humaine, née à Marrakech en 2026, pour aider les voyageurs à connaître les fourchettes de prix de référence au Maroc grâce à un coach vocal IA multilingue.',
          publisher: { '@id': `${BASE}/#organization` },
          mainEntity: {
            '@context': 'https://schema.org',
            ...ORG,
            founder: [
              { '@type': 'Person', name: 'Azeddine Maghraoui', jobTitle: 'Fondateur', description: 'Créateur de Tooristoo, initiative dédiée à la vigilance tarifaire au Maroc.' },
            ],
            // numberOfEmployees retiré (claim non vérifiable)
            // award retiré (claim non vérifiable)
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
          name: 'Prestataires Référencés Tooristoo au Maroc',
          description: 'Répertoire de prestataires de services touristiques sélectionnés au Maroc selon notre méthodologie publique : note Google ≥ 4,0/5 sur 50+ avis.',
          url: `${BASE}/providers`,
          numberOfItems: 6,
          itemListElement: [
            {
              '@type': 'ListItem', position: 1,
              item: {
                '@type': 'TaxiService',
                name: 'Taxis référencés Tooristoo — Marrakech',
                description: 'Petits taxis avec compteur réglementaire à Marrakech. Fourchette aéroport Menara → centre : 70–100 MAD.',
                priceRange: '7–100 MAD',
                address: { '@type': 'PostalAddress', addressLocality: 'Marrakech', addressCountry: 'MA' },
                geo: { '@type': 'GeoCoordinates', latitude: 31.6295, longitude: -7.9811 },
                url: `${BASE}/providers`,
                openingHours: 'Mo-Su 00:00-23:59',
              },
            },
            {
              '@type': 'ListItem', position: 2,
              item: {
                '@type': 'LodgingBusiness',
                name: 'Riads & Hôtels référencés — Fès',
                description: 'Hébergements sélectionnés à Fès avec fourchettes de prix de référence. Chambre double : 350–600 MAD/nuit, petit-déjeuner inclus.',
                priceRange: '350–600 MAD/nuit',
                address: { '@type': 'PostalAddress', addressLocality: 'Fès', addressCountry: 'MA' },
                geo: { '@type': 'GeoCoordinates', latitude: 34.0372, longitude: -5.0003 },
                url: `${BASE}/providers`,
              },
            },
            {
              '@type': 'ListItem', position: 3,
              item: {
                '@type': 'LocalBusiness',
                name: 'Guides touristiques référencés — Chefchaouen',
                description: 'Guides officiels accrédités ONMT à Chefchaouen. Fourchette journée : 400–600 MAD.',
                priceRange: '400–600 MAD/jour',
                address: { '@type': 'PostalAddress', addressLocality: 'Chefchaouen', addressCountry: 'MA' },
                geo: { '@type': 'GeoCoordinates', latitude: 35.1688, longitude: -5.2636 },
                url: `${BASE}/providers`,
              },
            },
            {
              '@type': 'ListItem', position: 4,
              item: {
                '@type': 'FoodEstablishment',
                name: 'Restaurants référencés — Casablanca',
                description: 'Restaurants avec menus et fourchettes de prix affichés à Casablanca. Plat principal : 80–200 MAD.',
                priceRange: '80–200 MAD',
                servesCuisine: 'Moroccan',
                address: { '@type': 'PostalAddress', addressLocality: 'Casablanca', addressCountry: 'MA' },
                geo: { '@type': 'GeoCoordinates', latitude: 33.5731, longitude: -7.5898 },
                url: `${BASE}/providers`,
              },
            },
            {
              '@type': 'ListItem', position: 5,
              item: {
                '@type': 'TouristAttraction',
                name: 'Excursions désert référencées — Merzouga',
                description: 'Excursions Erg Chebbi avec fourchettes de prix de référence. 2j/1n en groupe : 600–900 MAD/pers.',
                priceRange: '600–900 MAD/pers (groupe)',
                address: { '@type': 'PostalAddress', addressLocality: 'Merzouga', addressCountry: 'MA' },
                geo: { '@type': 'GeoCoordinates', latitude: 31.0801, longitude: -4.0128 },
                url: `${BASE}/providers`,
              },
            },
            {
              '@type': 'ListItem', position: 6,
              item: {
                '@type': 'HealthAndBeautyBusiness',
                name: 'Spas & Hammams référencés — Agadir',
                description: 'Hammams traditionnels et spas avec tarifs transparents à Agadir. Entrée + gommage : 80–150 MAD.',
                priceRange: '80–350 MAD',
                address: { '@type': 'PostalAddress', addressLocality: 'Agadir', addressCountry: 'MA' },
                geo: { '@type': 'GeoCoordinates', latitude: 30.4278, longitude: -9.5981 },
                url: `${BASE}/providers`,
              },
            },
          ],
        },
        breadcrumb([
          { name: 'Accueil', url: BASE },
          { name: 'Prestataires référencés', url: `${BASE}/providers` },
        ]),
      ];

    case 'alerts':
      return [
        {
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          '@id': `${BASE}/alerts`,
          name: 'Conseils de Vigilance Tarifaire au Maroc — Tooristoo',
          url: `${BASE}/alerts`,
          description: 'Conseils pratiques pour voyager sereinement au Maroc : fourchettes de prix taxis, guides officiels, restaurants avec menu affiché, bons réflexes par ville.',
          publisher: { '@id': `${BASE}/#organization` },
          mainEntity: {
            '@type': 'ItemList',
            name: 'Conseils pratiques pour voyageurs au Maroc',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Taxis — Demander le compteur ou négocier avant de monter', description: 'Fourchette Marrakech intra-médina : 7–15 MAD. Aéroport Menara → centre : 70–100 MAD.' },
              { '@type': 'ListItem', position: 2, name: 'Guides touristiques — Vérifier l\'accréditation officielle', description: 'Les guides officiels portent une carte ONMT (Ministère du Tourisme). Fourchette journée : 400–600 MAD.' },
              { '@type': 'ListItem', position: 3, name: 'Restaurants — Demander la carte avec les prix avant commander', description: 'Tajine Marrakech : 60–120 MAD. Couscous : 80–150 MAD. Thé à la menthe : 10–20 MAD.' },
              { '@type': 'ListItem', position: 4, name: 'Souks — Fourchettes de référence pour l\'artisanat', description: 'Babouches en cuir : 80–200 MAD, tapis berbère petit format : 500–1500 MAD, théière en cuivre : 150–400 MAD.' },
              { '@type': 'ListItem', position: 5, name: 'Excursions désert — Fourchettes officielles', description: 'Marrakech-Merzouga 2j/1n en groupe : 600–900 MAD/pers. Balade dromadaire 1h : 150–250 MAD.' },
              { '@type': 'ListItem', position: 6, name: 'Change de devises — Canaux officiels uniquement', description: 'Privilégiez les banques et bureaux de change agréés. Évitez les changeurs de rue.' },
            ],
          },
        },
        breadcrumb([
          { name: 'Accueil', url: BASE },
          { name: 'Conseils de vigilance', url: `${BASE}/alerts` },
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
          description: '50 phrases essentielles en darija marocain avec transcription latine et traductions en 5 langues pour voyager au Maroc.',
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
          name: 'Charte des 7 Engagements — Tooristoo',
          url: `${BASE}/charter`,
          description: 'Les 7 engagements que chaque prestataire référencé Tooristoo s\'engage à respecter, vérifiés selon notre méthodologie publique.',
          publisher: { '@id': `${BASE}/#organization` },
          mainEntity: {
            '@type': 'ItemList',
            name: '7 engagements Charte Tooristoo',
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
        },
        breadcrumb([
          { name: 'Accueil', url: BASE },
          { name: 'Charte', url: `${BASE}/charter` },
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
  const rawSchemas = extraSchemas || buildSchemas(page);
  const schemas = typeof rawSchemas === 'function' ? rawSchemas(lang) : rawSchemas;

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
      <html lang={HREFLANG_MAP[lang] || (lang === 'darija' ? 'ar-MA' : 'fr')} dir={lang === 'ar' || lang === 'darija' ? 'rtl' : 'ltr'} />

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