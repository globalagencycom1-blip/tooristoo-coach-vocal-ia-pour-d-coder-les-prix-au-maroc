/**
 * Cloudflare Worker pour Tooristoo SEO
 * - Réécrit les meta tags par route et par langue
 * - Ajoute les balises hreflang pour 6 langues (fr, en, es, de, ar, darija)
 * - Met à jour <html lang> et dir="rtl" pour ar/darija
 * - Redirige 301 les URLs en majuscules
 * - Try/catch global avec fallback vers la réponse d'origine
 *
 * Déployer avec: wrangler deploy (ou via le dashboard Cloudflare)
 */

const META_BY_ROUTE = {
  '/': {
    fr: { title: 'Tooristoo — Coach Vocal IA pour Décoder les Prix au Maroc', desc: 'Coach vocal IA pour décoder les prix et négocier comme un local au Maroc. Analyse en temps réel, multilingue, fourchettes de prix par ville.' },
    en: { title: 'Tooristoo — AI Voice Coach to Decode Prices in Morocco', desc: 'AI voice coach to decode prices and negotiate like a local in Morocco. Real-time analysis, multilingual, reference price ranges by city.' },
    es: { title: 'Tooristoo — Coach de Voz IA para Decodificar Precios en Marruecos', desc: 'Coach de voz IA para decodificar precios y negociar como un local en Marruecos. Análisis en tiempo real, multilingüe.' },
    de: { title: 'Tooristoo — KI-Sprachcoach zur Preisentschlüsselung in Marokko', desc: 'KI-Sprachcoach zur Entschlüsselung von Preisen und zum Verhandeln wie ein Einheimischer in Marokko. Echtzeitanalyse, mehrsprachig.' },
    ar: { title: 'Tooristoo — مدرب صوتي ذكي لفهم الأسعار في المغرب', desc: 'مدرب صوتي ذكي لفهم الأسعار والتفاوض كالسكان المحليين في المغرب. تحليل لحظي، متعدد اللغات، نطاقات سعرية مرجعية حسب المدينة.' },
    darija: { title: 'Tooristoo — كوتش ديال الصوت بالذكاء الاصطناعي باش تفهم الأسعار فالمغرب', desc: 'كوتش ديال الصوت كيعاونك تفهم الأسعار وتفاوت بحال أهل البلاد فالمغرب. تحليل فالحين، عدة لغات، نطاقات سعرية حسب المدينة.' },
  },
  '/about': {
    fr: { title: 'À Propos de Tooristoo — Initiative Née à Marrakech pour la Vigilance Tarifaire', desc: 'Découvrez l\'histoire et la mission de Tooristoo, l\'initiative à échelle humaine qui aide les voyageurs à connaître les fourchettes de prix au Maroc.' },
    en: { title: 'About Tooristoo — A Marrakech-Born Initiative for Price Vigilance', desc: 'Discover the story and mission of Tooristoo, a human-scale initiative helping travellers know reference price ranges in Morocco.' },
    es: { title: 'Acerca de Tooristoo — Iniciativa Nacida en Marrakech para la Vigilancia Tarifaria', desc: 'Descubre la historia y misión de Tooristoo, la iniciativa a escala humana que ayuda a los viajeros a conocer los rangos de precios en Marruecos.' },
    de: { title: 'Über Tooristoo — Eine in Marrakesch geborene Initiative für Preisvigilanz', desc: 'Entdecken Sie die Geschichte und Mission von Tooristoo, einer Initiative auf menschlicher Ebene für Preistransparenz in Marokko.' },
    ar: { title: 'عن Tooristoo — مبادرة وُلدت في مراكش من أجل اليقظة السعرية', desc: 'اكتشف قصة ومهمة Tooristoo، المبادرة على المستوى الإنساني التي تساعد المسافرين على معرفة النطاقات السعرية المرجعية في المغرب.' },
    darija: { title: 'على Tooristoo — مبادرة تخلقت فمراكش للوعي بالأسعار', desc: 'اكتشف القصة والمهمة ديال Tooristoo، المبادرة على المقاس الإنساني لي كتعاون المسافرين باش يعرفو النطاقات السعرية فالمغرب.' },
  },
  '/methodology': {
    fr: { title: 'Méthodologie Tooristoo — Comment Nous Établissons les Fourchettes de Prix', desc: 'Notre méthodologie publique : avis Google ≥ 4,0/5 sur 50+ commentaires, sources officielles, mise à jour trimestrielle, transparence totale.' },
    en: { title: 'Tooristoo Methodology — How We Establish Reference Price Ranges', desc: 'Our public methodology: Google rating ≥ 4.0/5 on 50+ reviews, official sources, quarterly updates, full transparency.' },
    es: { title: 'Metodología Tooristoo — Cómo Establecemos los Rangos de Precios', desc: 'Nuestra metodología pública: calificación Google ≥ 4,0/5 en 50+ reseñas, fuentes oficiales, actualización trimestral.' },
    de: { title: 'Tooristoo-Methodik — So Erstellen Wir Referenzpreisspannen', desc: 'Unsere öffentliche Methodik: Google-Bewertung ≥ 4,0/5 auf 50+ Bewertungen, offizielle Quellen, vierteljährliche Aktualisierung.' },
    ar: { title: 'منهجية Tooristoo — كيف نحدد النطاقات السعرية المرجعية', desc: 'منهجيتنا العلنية: تقييم Google ≥ 4.0/5 على 50+ تعليقاً، مصادر رسمية، تحديث فصلي، شفافية كاملة.' },
    darija: { title: 'المنهجية ديال Tooristoo — كيفاش كنحددو النطاقات السعرية', desc: 'المنهجية ديالنا العلنية: تقييم Google ≥ 4.0/5 على 50+ تعليق، مصادر رسمية، تحديث فصلي، شفافية كاملة.' },
  },
  '/charter': {
    fr: { title: 'Charte des 7 Engagements — Tooristoo', desc: 'Les 7 engagements concrets de Tooristoo : sources vérifiables, recherche approfondie, note Google ≥ 4,0/5, mise à jour trimestrielle, signalement communautaire.' },
    en: { title: '7 Commitments Charter — Tooristoo', desc: 'The 7 concrete commitments of Tooristoo: verifiable sources, thorough research, Google rating ≥ 4.0/5, quarterly updates, community reporting.' },
    es: { title: 'Carta de los 7 Compromisos — Tooristoo', desc: 'Los 7 compromisos concretos de Tooristoo: fuentes verificables, investigación exhaustiva, calificación Google ≥ 4,0/5, actualización trimestral.' },
    de: { title: '7-Verpflichtungen-Charta — Tooristoo', desc: 'Die 7 konkreten Verpflichtungen von Tooristoo: überprüfbare Quellen, gründliche Recherche, Google-Bewertung ≥ 4,0/5, vierteljährliche Aktualisierung.' },
    ar: { title: 'ميثاق الالتزامات السبعة — Tooristoo', desc: 'الالتزامات السبعة الملموسة لـ Tooristoo: مصادر قابلة للتحقق، بحث شامل، تقييم Google ≥ 4.0/5، تحديث فصلي، إبلاغ مجتمعي.' },
    darija: { title: 'الميثاق ديال 7 الالتزامات — Tooristoo', desc: 'الالتزامات السبعة الملموسة ديال Tooristoo: مصادر قابلة للتحقق، بحث شامل، تقييم Google ≥ 4.0/5، تحديث فصلي، إبلاغ من المجتمع.' },
  },
  '/faq': {
    fr: { title: 'FAQ Tooristoo — Questions Fréquentes sur le Coach Vocal IA Maroc', desc: 'Réponses aux questions fréquentes sur Tooristoo : fonctionnement, langues supportées, villes couvertes, plan gratuit, méthodologie de prix.' },
    en: { title: 'Tooristoo FAQ — Frequently Asked Questions about the AI Voice Coach', desc: 'Answers to frequent questions about Tooristoo: how it works, supported languages, cities covered, free plan, pricing methodology.' },
    es: { title: 'FAQ Tooristoo — Preguntas Frecuentes sobre el Coach Vocal IA', desc: 'Respuestas a preguntas frecuentes sobre Tooristoo: funcionamiento, idiomas, ciudades cubiertas, plan gratuito, metodología de precios.' },
    de: { title: 'Tooristoo FAQ — Häufig Gestellte Fragen zum KI-Sprachcoach', desc: 'Antworten auf häufige Fragen zu Tooristoo: Funktionsweise, unterstützte Sprachen, abgedeckte Städte, kostenloser Plan, Preismethodik.' },
    ar: { title: 'الأسئلة الشائعة حول Tooristoo — مدرب صوتي ذكي للمغرب', desc: 'إجابات عن الأسئلة الشائعة حول Tooristoo: كيف يعمل، اللغات المدعومة، المدن المغطاة، الخطة المجانية، منهجية الأسعار.' },
    darija: { title: 'الأسئلة الشائعة ديال Tooristoo — كوتش الصوت بالذكاء الاصطناعي', desc: 'الأجوبة على الأسئلة الشائعة ديال Tooristoo: كيفاش كيخدم، اللغات المدعومة، المدن المغطاة، الخطة المجانية، المنهجية ديال الأسعار.' },
  },
  '/providers': {
    fr: { title: 'Prestataires Référencés Tooristoo — Hôtels, Taxis, Restaurants au Maroc', desc: 'Répertoire de prestataires sélectionnés au Maroc selon notre méthodologie publique : note Google ≥ 4,0/5 sur 50+ avis, mise à jour trimestrielle.' },
    en: { title: 'Tooristoo Listed Providers — Hotels, Taxis, Restaurants in Morocco', desc: 'Directory of selected providers in Morocco based on our public methodology: Google rating ≥ 4.0/5 on 50+ reviews, quarterly updates.' },
    es: { title: 'Proveedores Listados Tooristoo — Hoteles, Taxis, Restaurantes en Marruecos', desc: 'Directorio de proveedores seleccionados en Marruecos según nuestra metodología pública: calificación Google ≥ 4,0/5 en 50+ reseñas.' },
    de: { title: 'Gelistete Tooristoo-Anbieter — Hotels, Taxis, Restaurants in Marokko', desc: 'Verzeichnis ausgewählter Anbieter in Marokko nach unserer öffentlichen Methodik: Google-Bewertung ≥ 4,0/5 auf 50+ Bewertungen.' },
    ar: { title: 'المزودون المدرجون في Tooristoo — فنادق وسيارات أجرة ومطاعم في المغرب', desc: 'دليل المزودين المختارين في المغرب وفق منهجيتنا العلنية: تقييم Google ≥ 4.0/5 على 50+ تعليقاً، تحديث فصلي.' },
    darija: { title: 'المزودين المدرجين فTooristoo — فنادق، طاكسي، مطاعم فالمغرب', desc: 'الدليل ديال المزودين المختارين فالمغرب حسب المنهجية ديالنا العلنية: تقييم Google ≥ 4.0/5 على 50+ تعليق، تحديث فصلي.' },
  },
  '/alerts': {
    fr: { title: 'Conseils de Vigilance Tarifaire au Maroc — Tooristoo', desc: 'Conseils pratiques pour voyager sereinement au Maroc : fourchettes de prix taxis, guides officiels, restaurants avec menu affiché, bons réflexes par ville.' },
    en: { title: 'Morocco Price Vigilance Tips — Tooristoo', desc: 'Practical tips for stress-free travel in Morocco: reference taxi price ranges, official guides, restaurants with displayed menus, good habits by city.' },
    es: { title: 'Consejos de Vigilancia Tarifaria en Marruecos — Tooristoo', desc: 'Consejos prácticos para viajar con tranquilidad en Marruecos: rangos de precios taxis, guías oficiales, restaurantes con carta de precios, buenos hábitos.' },
    de: { title: 'Marokko Preisvigilanz-Tipps — Tooristoo', desc: 'Praktische Tipps für sorgenfreies Reisen in Marokko: Referenzpreisspannen für Taxis, offizielle Guides, Restaurants mit Preiskarte, gute Reflexe.' },
    ar: { title: 'نصائح اليقظة السعرية في المغرب — Tooristoo', desc: 'نصائح عملية للسفر بثقة في المغرب: نطاقات الأسعار المرجعية للتاكسي، المرشدون الرسميون، المطاعم بقوائم أسعار، عادات جيدة حسب المدينة.' },
    darija: { title: 'النصايح ديال اليقظة السعرية فالمغرب — Tooristoo', desc: 'نصايح عملية للسفر بثقة فالمغرب: النطاقات المرجعية ديال أسعار الطاكسي، المرشدين الرسميين، المطاعم بالقائمة، العادات الجيدة حسب المدينة.' },
  },
  '/blog': {
    fr: { title: 'Blog Tooristoo — Guides de Voyage Maroc & Conseils de Négociation', desc: 'Guides complets, conseils de négociation et fourchettes de prix de référence par ville (Marrakech, Fès, Casablanca, Agadir…) pour voyager au Maroc.' },
    en: { title: 'Tooristoo Blog — Morocco Travel Guides & Negotiation Tips', desc: 'Comprehensive guides, negotiation tips and reference price ranges by city (Marrakech, Fes, Casablanca, Agadir…) to explore Morocco with confidence.' },
    es: { title: 'Blog Tooristoo — Guías de Viaje Marruecos & Consejos de Negociación', desc: 'Guías completas, consejos de negociación y rangos de precios de referencia por ciudad para explorar Marruecos con confianza.' },
    de: { title: 'Tooristoo Blog — Marokko Reiseführer & Verhandlungstipps', desc: 'Umfassende Reiseführer, Verhandlungstipps und Referenzpreisspannen nach Stadt für eine sichere Marokko-Reise.' },
    ar: { title: 'مدونة Tooristoo — أدلة السفر إلى المغرب ونصائح التفاوض', desc: 'أدلة شاملة ونصائح تفاوض ونطاقات سعرية مرجعية حسب المدينة (مراكش، فاس، الدار البيضاء، أكادير…) لاستكشاف المغرب بثقة.' },
    darija: { title: 'المدونة ديال Tooristoo — أدلة السفر للمغرب ونصايح التفاوض', desc: 'أدلة شاملة ونصايح للتفاوض والنطاقات السعرية المرجعية حسب المدينة (مراكش، فاس، الدار البيضاء، أكادير…) باش تكتشف المغرب بثقة.' },
  },
  '/darija': {
    fr: { title: '50 Phrases en Darija pour Voyager au Maroc | Transcription + Traductions — Tooristoo', desc: 'Apprenez 50 phrases essentielles en darija marocain avec transcription latine et traductions en 5 langues. Indispensable pour échanger comme un local.' },
    en: { title: '50 Darija Phrases to Travel in Morocco | Transcription + Translations — Tooristoo', desc: 'Learn 50 essential Moroccan Darija phrases with Latin transcription and translations in 5 languages. Essential to interact like a local.' },
    es: { title: '50 Frases en Darija para Viajar en Marruecos | Transcripción + Traducciones — Tooristoo', desc: '50 frases esenciales en darija marroquí con transcripción latina y traducciones. Para interactuar en taxi, zoco, riad y restaurante como un local.' },
    de: { title: '50 Darija-Phrasen für Marokko-Reisen | Transkription + Übersetzungen — Tooristoo', desc: 'Die 50 wesentlichen marokkanischen Darija-Phrasen mit lateinischer Transkription. Zum Interagieren in Taxi, Souk, Riad und Restaurant.' },
    ar: { title: '50 عبارة بالدارجة للسفر في المغرب | نسخ لاتيني + ترجمات — Tooristoo', desc: '50 عبارة أساسية بالدارجة المغربية مع نسخ لاتيني وترجمات بـ5 لغات. للتفاعل في التاكسي والسوق والرياض والمطعم كالسكان المحليين.' },
    darija: { title: '50 جملة بالدارجة باش تسافر فالمغرب | كتابة لاتينية + ترجمات — Tooristoo', desc: '50 جملة أساسية بالدارجة المغربية مع كتابة لاتينية وترجمات ب5 لغات. باش تتواصل فالطاكسي والسوق والرياض والمطعم بحال أهل البلاد.' },
  },
  '/app': {
    fr: { title: 'Coach Vocal IA Tooristoo | Décoder les Prix au Maroc en Temps Réel', desc: 'Coach vocal IA en temps réel pour décoder les prix et négocier sereinement comme un local au Maroc.' },
    en: { title: 'Tooristoo AI Voice Coach | Decode Prices in Morocco in Real Time', desc: 'Real-time AI voice coach to decode prices and negotiate calmly like a local in Morocco.' },
    es: { title: 'Coach Vocal IA Tooristoo | Decodifica Precios en Marruecos en Tiempo Real', desc: 'Coach de voz IA en tiempo real para decodificar precios y negociar con tranquilidad como un local en Marruecos.' },
    de: { title: 'Tooristoo KI-Sprachcoach | Preise in Marokko in Echtzeit Entschlüsseln', desc: 'KI-Sprachcoach in Echtzeit zur Entschlüsselung von Preisen und ruhigen Verhandeln wie ein Einheimischer.' },
    ar: { title: 'مدرب Tooristoo الصوتي الذكي | فهم الأسعار في المغرب لحظياً', desc: 'مدرب صوتي ذكي لحظي لفهم الأسعار والتفاوض بهدوء كالسكان المحليين في المغرب.' },
    darija: { title: 'كوتش Tooristoo الصوتي بالذكاء الاصطناعي | فهم الأسعار فالمغرب فالحين', desc: 'كوتش صوتي بالذكاء الاصطناعي فالحين باش تفهم الأسعار وتفاوت بهدوء بحال أهل البلاد فالمغرب.' },
  },
  '/contact': {
    fr: { title: 'Contactez Tooristoo — Support, Partenariats et Signalement', desc: 'Contactez l\'équipe Tooristoo pour toute question, partenariat ou signalement de prestataire. Email et formulaire de contact.' },
    en: { title: 'Contact Tooristoo — Support, Partnerships and Reporting', desc: 'Contact the Tooristoo team for any question, partnership or provider report. Email and contact form.' },
    es: { title: 'Contacta con Tooristoo — Soporte, Asociaciones y Reportes', desc: 'Contacta con el equipo Tooristoo para cualquier pregunta, asociación o reporte de proveedor.' },
    de: { title: 'Kontaktieren Sie Tooristoo — Support, Partnerschaften und Meldungen', desc: 'Kontaktieren Sie das Tooristoo-Team für Fragen, Partnerschaften oder Anbietermeldungen.' },
    ar: { title: 'اتصل بـ Tooristoo — الدعم والشراكات والإبلاغ', desc: 'اتصل بفريق Tooristoo لأي استفسار أو شراكة أو إبلاغ عن مزود. البريد الإلكتروني ونموذج الاتصال.' },
    darija: { title: 'اتصل بـ Tooristoo — الدعم والشراكات والبلاغات', desc: 'اتصل بالفريق ديال Tooristoo لأي سؤال، شراكة، ولا بلاغ على مزود. الإيميل والفورم ديال الاتصال.' },
  },
  '/privacy': {
    fr: { title: 'Politique de Confidentialité — Tooristoo', desc: 'Politique de confidentialité et protection des données personnelles de Tooristoo. Comment vos données sont collectées, traitées et protégées.' },
    en: { title: 'Privacy Policy — Tooristoo', desc: 'Privacy policy and personal data protection of Tooristoo. How your data is collected, processed and protected.' },
    es: { title: 'Política de Privacidad — Tooristoo', desc: 'Política de privacidad y protección de datos personales de Tooristoo.' },
    de: { title: 'Datenschutzrichtlinie — Tooristoo', desc: 'Datenschutzrichtlinie und Schutz persönlicher Daten von Tooristoo.' },
    ar: { title: 'سياسة الخصوصية — Tooristoo', desc: 'سياسة الخصوصية وحماية البيانات الشخصية لـ Tooristoo.' },
    darija: { title: 'سياسة الخصوصية — Tooristoo', desc: 'السياسة ديال الخصوصية وحماية المعطيات الشخصية ديال Tooristoo.' },
  },
  '/terms': {
    fr: { title: 'Conditions d\'Utilisation — Tooristoo', desc: 'Conditions générales d\'utilisation de Tooristoo. Droits, obligations et responsabilités de l\'utilisateur et du service.' },
    en: { title: 'Terms of Service — Tooristoo', desc: 'General terms of use of Tooristoo. User rights, obligations and service responsibilities.' },
    es: { title: 'Condiciones de Servicio — Tooristoo', desc: 'Condiciones generales de uso de Tooristoo.' },
    de: { title: 'Nutzungsbedingungen — Tooristoo', desc: 'Allgemeine Nutzungsbedingungen von Tooristoo.' },
    ar: { title: 'شروط الخدمة — Tooristoo', desc: 'الشروط العامة لاستخدام Tooristoo.' },
    darija: { title: 'شروط الاستعمال — Tooristoo', desc: 'الشروط العامة ديال الاستعمال ديال Tooristoo.' },
  },
  '/legal': {
    fr: { title: 'Mentions Légales — Tooristoo', desc: 'Mentions légales de Tooristoo : éditeur, hébergeur, responsable de publication, immatriculation.' },
    en: { title: 'Legal Notice — Tooristoo', desc: 'Legal notice of Tooristoo: publisher, hosting, registration information.' },
    es: { title: 'Aviso Legal — Tooristoo', desc: 'Aviso legal de Tooristoo: editor, alojamiento, información de registro.' },
    de: { title: 'Impressum — Tooristoo', desc: 'Impressum von Tooristoo: Herausgeber, Hosting, Registrierungsinformationen.' },
    ar: { title: 'إشعار قانوني — Tooristoo', desc: 'الإشعار القانوني لـ Tooristoo: الناشر، الاستضافة، معلومات التسجيل.' },
    darija: { title: 'الإشعار القانوني — Tooristoo', desc: 'الإشعار القانوني ديال Tooristoo: الناشر، الاستضافة، معلومات التسجيل.' },
  },
};

// Map des langues vers les codes hreflang officiels
// Pour le darija, on utilise ar-MA (arabe Maroc) qui est le code BCP-47 standard
const HREFLANG_MAP = {
  fr: 'fr',
  en: 'en',
  es: 'es',
  de: 'de',
  ar: 'ar',
  darija: 'ar-MA',
};

// Langues nécessitant l'écriture de droite à gauche
const RTL_LANGS = ['ar', 'darija'];

// Échappe les caractères spéciaux HTML pour les attributs
function escapeHtmlAttr(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

async function handleRequest(request) {
  const url = new URL(request.url);
  let pathname = url.pathname;

  // Redirect uppercase paths to lowercase (301)
  if (pathname !== '/' && /[A-Z]/.test(pathname)) {
    const lowerPathname = pathname.toLowerCase();
    return new Response(null, {
      status: 301,
      headers: { Location: url.origin + lowerPathname + url.search + url.hash },
    });
  }

  // Fetch the original index.html
  const response = await fetch(request);

  // Si la réponse n'est pas du HTML (image, font, JS, CSS…), passer telle quelle
  const contentType = response.headers.get('content-type') || '';
  if (!contentType.includes('text/html')) {
    return response;
  }

  let html = await response.text();

  // Détecter la langue : query param (?lang=) > défaut 'fr'
  // Les valeurs valides sont fr, en, es, de, ar, darija
  const requestedLang = url.searchParams.get('lang');
  const validLangs = Object.keys(HREFLANG_MAP);
  const lang = validLangs.includes(requestedLang) ? requestedLang : 'fr';

  const route = pathname === '/' ? '/' : pathname;
  const meta = META_BY_ROUTE[route]?.[lang];

  if (meta) {
    const titleEscaped = escapeHtmlAttr(meta.title);
    const descEscaped = escapeHtmlAttr(meta.desc);

    // Remplacer le <title>
    html = html.replace(
      /<title>[\s\S]*?<\/title>/,
      `<title>${meta.title}</title>`
    );

    // Remplacer la <meta name="description">
    html = html.replace(
      /<meta\s+name=["']description["'][^>]*>/i,
      `<meta name="description" content="${descEscaped}">`
    );

    // Remplacer ou créer <meta property="og:title"> (avec > final correct)
    if (/<meta\s+property=["']og:title["'][^>]*>/i.test(html)) {
      html = html.replace(
        /<meta\s+property=["']og:title["'][^>]*>/i,
        `<meta property="og:title" content="${titleEscaped}">`
      );
    }

    // Remplacer ou créer <meta property="og:description"> (avec > final correct)
    if (/<meta\s+property=["']og:description["'][^>]*>/i.test(html)) {
      html = html.replace(
        /<meta\s+property=["']og:description["'][^>]*>/i,
        `<meta property="og:description" content="${descEscaped}">`
      );
    }

    // Remplacer ou créer <meta name="twitter:title">
    if (/<meta\s+name=["']twitter:title["'][^>]*>/i.test(html)) {
      html = html.replace(
        /<meta\s+name=["']twitter:title["'][^>]*>/i,
        `<meta name="twitter:title" content="${titleEscaped}">`
      );
    }

    // Remplacer ou créer <meta name="twitter:description">
    if (/<meta\s+name=["']twitter:description["'][^>]*>/i.test(html)) {
      html = html.replace(
        /<meta\s+name=["']twitter:description["'][^>]*>/i,
        `<meta name="twitter:description" content="${descEscaped}">`
      );
    }

    // Mettre à jour <html lang="..."> et dir="..."
    const dir = RTL_LANGS.includes(lang) ? 'rtl' : 'ltr';
    html = html.replace(
      /<html[^>]*>/i,
      `<html lang="${lang === 'darija' ? 'ar-MA' : lang}" dir="${dir}">`
    );

    // Ajouter les balises hreflang pour les 6 langues + x-default
    let hreflangLinks = '\n';
    for (const [l, code] of Object.entries(HREFLANG_MAP)) {
      const href = `${url.origin}${route}?lang=${l}`;
      hreflangLinks += `<link rel="alternate" hreflang="${code}" href="${href}" />\n`;
    }
    hreflangLinks += `<link rel="alternate" hreflang="x-default" href="${url.origin}${route}" />\n`;

    // Ajouter une balise canonical (URL canonique sans paramètre lang)
    const canonical = `<link rel="canonical" href="${url.origin}${route}" />\n`;

    // Insérer hreflang et canonical avant </head>
    html = html.replace('</head>', hreflangLinks + canonical + '</head>');
  }

  // Renvoyer la réponse modifiée avec les bons headers
  const newHeaders = new Headers(response.headers);
  // Forcer le content-type HTML pour éviter les problèmes
  newHeaders.set('content-type', 'text/html; charset=utf-8');
  // Cache court (5 min) pour permettre des mises à jour rapides
  newHeaders.set('cache-control', 'public, max-age=300, s-maxage=300');

  return new Response(html, {
    status: response.status,
    statusText: response.statusText,
    headers: newHeaders,
  });
}

export default {
  async fetch(request, env, ctx) {
    try {
      return await handleRequest(request);
    } catch (err) {
      // Fallback : si le Worker plante, laisser passer la requête originale
      console.error('Worker error:', err.message, err.stack);
      return fetch(request);
    }
  },
};