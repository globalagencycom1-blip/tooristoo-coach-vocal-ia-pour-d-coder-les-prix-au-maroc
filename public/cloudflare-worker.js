/**
 * Cloudflare Worker pour récrire les meta tags par route
 * Déployer avec: wrangler deploy
 * 
 * Configuration wrangler.toml:
 * name = "tooristoo-seo"
 * main = "src/index.js"
 * compatibility_date = "2024-01-01"
 * routes = [{ pattern = "tooristoo.com/*", zone_name = "tooristoo.com" }]
 */

const META_BY_ROUTE = {
  '/': {
    fr: { title: 'Tooristoo — Coach Vocal IA pour Négocier les Meilleurs Prix au Maroc', desc: 'Analysez les prix en temps réel, voyagez sereinement et négociez comme un local au Maroc avec notre coach IA vocal. Gratuit, multilingue.' },
    en: { title: 'Tooristoo — AI Voice Coach to Negotiate the Best Prices in Morocco', desc: 'Analyze prices in real time, travel safely and negotiate like a local in Morocco with our AI voice coach. Free, multilingual.' },
    es: { title: 'Tooristoo — Coach de Voz IA para Negociar los Mejores Precios en Marruecos', desc: 'Analiza precios en tiempo real, viaja seguro y negocia como un local en Marruecos con nuestro coach de voz IA.' },
    de: { title: 'Tooristoo — KI-Sprachcoach für die besten Preise in Marokko', desc: 'Preise in Echtzeit analysieren, sicher reisen und wie ein Einheimischer in Marokko verhandeln.' },
    ar: { title: 'Tooristoo — مدرب صوتي ذكي للتفاوض على أفضل الأسعار في المغرب', desc: 'حلّل الأسعار في الوقت الفعلي وتفاوض على السعر العادل كالسكان المحليين في المغرب — بدون مفاجآت.' },
  },
  '/about': {
    fr: { title: 'À Propos de Tooristoo — Startup Franco-Marocaine | Coach IA Fondé à Marrakech', desc: 'Découvrez l\'histoire, la mission et l\'équipe derrière Tooristoo, l\'app IA qui aide les touristes à connaître les vrais prix au Maroc.' },
    en: { title: 'About Tooristoo — AI Coach for Stress-Free Travel in Morocco', desc: 'Discover the story, mission and team behind Tooristoo, the AI app helping tourists know real prices and travel with confidence in Morocco.' },
    es: { title: 'Acerca de Tooristoo — Startup Franco-Marroquí | Coach IA Fundado en Marrakech', desc: 'Descubre la historia, misión y equipo detrás de Tooristoo, la app IA que ayuda a turistas a conocer los precios reales en Marruecos.' },
    de: { title: 'Über Tooristoo — Französisch-Marokkanisches Startup | KI-Coach gegründet in Marrakesch', desc: 'Entdecken Sie Geschichte, Mission und Team hinter Tooristoo, der KI-App für Preistransparenz und sicheres Reisen in Marokko.' },
    ar: { title: 'عن Tooristoo — شركة ناشئة فرنسية-مغربية | مدرب ذكي تأسس في مراكش', desc: 'اكتشف قصة وفريق Tooristoo — التطبيق الذي يساعد السياح على معرفة الأسعار الحقيقية والسفر براحة في المغرب.' },
  },
  '/faq': {
    fr: { title: 'FAQ — Questions Fréquentes sur Tooristoo | Coach IA Maroc', desc: 'Réponses aux questions fréquentes sur Tooristoo : fonctionnement, langues, villes, plan gratuit, protection des prix au Maroc.' },
    en: { title: 'FAQ — Frequently Asked Questions about Tooristoo | AI Coach Morocco', desc: 'Answers to frequently asked questions about Tooristoo: how it works, languages, cities, free plan, price protection in Morocco.' },
    es: { title: 'FAQ — Preguntas Frecuentes sobre Tooristoo | Coach IA Marruecos', desc: 'Respuestas a preguntas frecuentes sobre Tooristoo: funcionamiento, idiomas, ciudades, plan gratuito en Marruecos.' },
    de: { title: 'FAQ — Häufig gestellte Fragen zu Tooristoo | KI-Coach Marokko', desc: 'Antworten auf häufige Fragen zu Tooristoo: Funktionsweise, Sprachen, Städte, kostenloser Plan, Preisschutz.' },
    ar: { title: 'الأسئلة الشائعة حول Tooristoo | مدرب ذكي اصطناعي المغرب', desc: 'إجابات على الأسئلة الشائعة حول Tooristoo: كيف يعمل، المدن، الخطة المجانية، وكيف يساعدك على معرفة السعر العادل.' },
  },
  '/providers': {
    fr: { title: 'Prestataires Certifiés Tooristoo — Hôtels, Taxis, Restaurants au Maroc', desc: 'Répertoire de prestataires vérifiés au Maroc avec prix officiels : hôtels, riads, taxis, restaurants, guides à Marrakech, Fès, Agadir et partout.' },
    en: { title: 'Certified Tooristoo Providers — Hotels, Taxis, Restaurants in Morocco', desc: 'Directory of verified providers in Morocco with official prices: hotels, riads, taxis, restaurants, guides in Marrakech, Fes, Agadir and more.' },
    es: { title: 'Proveedores Certificados Tooristoo — Hoteles, Taxis, Restaurantes en Marruecos', desc: 'Directorio de proveedores verificados en Marruecos con precios oficiales: hoteles, riads, taxis, restaurantes.' },
    de: { title: 'Zertifizierte Tooristoo-Anbieter — Hotels, Taxis, Restaurants in Marokko', desc: 'Verzeichnis geprüfter Anbieter in Marokko mit offiziellen Preisen: Hotels, Riads, Taxis, Restaurants, Reiseführer.' },
    ar: { title: 'مزودو Tooristoo المعتمدون — فنادق وتاكسي ومطاعم في المغرب', desc: 'دليل مزودي الخدمات الموثوقين في المغرب بأسعار رسمية شفافة: فنادق ورياضات وتاكسي ومطاعم وأدلة سياحية.' },
  },
  '/alerts': {
    fr: { title: 'Conseils de Vigilance Touristique au Maroc — Tooristoo', desc: 'Conseils pratiques pour voyager sereinement au Maroc : prix de référence taxis, guides officiels, restaurants avec menu affiché. Voyagez informé.' },
    en: { title: 'Morocco Travel Safety Tips — Tooristoo', desc: 'Practical tips for stress-free travel in Morocco: reference prices for taxis, official guides, restaurants with displayed menus. Travel informed.' },
    es: { title: 'Consejos de Seguridad para Turistas en Marruecos — Tooristoo', desc: 'Consejos prácticos para viajar con tranquilidad en Marruecos: precios de referencia, guías oficiales, restaurantes con carta de precios.' },
    de: { title: 'Marokko Reise-Sicherheitstipps — Tooristoo', desc: 'Praktische Tipps für sorgenfreies Reisen in Marokko: Referenzpreise für Taxis, offizielle Guides, Restaurants mit Preiskarte.' },
    ar: { title: 'نصائح السفر الآمن في المغرب — Tooristoo', desc: 'نصائح عملية للسفر بثقة في المغرب: أسعار مرجعية للتاكسي، مرشدون رسميون، مطاعم بقوائم أسعار شفافة.' },
  },
  '/faq': {
    fr: { title: 'FAQ — Questions Fréquentes sur Tooristoo | Coach IA Maroc', desc: 'Réponses aux questions fréquentes sur Tooristoo : fonctionnement, langues, villes, plan gratuit, protection des prix au Maroc.' },
    en: { title: 'FAQ — Frequently Asked Questions about Tooristoo | AI Coach Morocco', desc: 'Answers to frequently asked questions about Tooristoo: how it works, languages, cities, free plan, price protection in Morocco.' },
    es: { title: 'FAQ — Preguntas Frecuentes sobre Tooristoo | Coach IA Marruecos', desc: 'Respuestas a preguntas frecuentes sobre Tooristoo: funcionamiento, idiomas, ciudades, plan gratuito en Marruecos.' },
    de: { title: 'FAQ — Häufig gestellte Fragen zu Tooristoo | KI-Coach Marokko', desc: 'Antworten auf häufige Fragen zu Tooristoo: Funktionsweise, Sprachen, Städte, kostenloser Plan, Preisschutz.' },
    ar: { title: 'الأسئلة الشائعة حول Tooristoo | مدرب ذكي اصطناعي المغرب', desc: 'إجابات على الأسئلة الشائعة حول Tooristoo: كيف يعمل، المدن، الخطة المجانية، وكيف يساعدك على معرفة السعر العادل.' },
  },
  '/blog': {
    fr: { title: 'Blog Tooristoo — Guides de Voyage Maroc & Conseils de Négociation', desc: 'Guides complets, conseils de négociation et prix de référence par ville (Marrakech, Fès, Agadir…) pour voyager sereinement au Maroc.' },
    en: { title: 'Tooristoo Blog — Morocco Travel Guides & Negotiation Tips', desc: 'Comprehensive guides, negotiation tips and reference prices by city (Marrakech, Fes, Agadir…) to explore Morocco with confidence.' },
    es: { title: 'Blog Tooristoo — Guías de Viaje Marruecos & Consejos de Negociación', desc: 'Guías completas, consejos de negociación y precios de referencia por ciudad para explorar Marruecos con seguridad.' },
    de: { title: 'Tooristoo Blog — Marokko Reiseführer & Verhandlungstipps', desc: 'Umfassende Reiseführer, Verhandlungstipps und Referenzpreise nach Stadt für eine sichere Marokko-Reise.' },
    ar: { title: 'مدونة Tooristoo — أدلة السفر إلى المغرب ونصائح التفاوض', desc: 'أدلة شاملة ونصائح تفاوض وأسعار مرجعية حسب المدينة لاستكشاف المغرب بثقة وراحة.' },
  },
  '/charter': {
    fr: { title: 'Charte des 7 Engagements — Prestataires Certifiés Tooristoo au Maroc', desc: 'Les 7 engagements que chaque prestataire certifié Tooristoo au Maroc s\'engage à respecter : prix justes, pas de frais cachés, qualité garantie.' },
    en: { title: '7 Commitments Charter — Tooristoo Certified Providers in Morocco', desc: 'The 7 commitments each Tooristoo certified provider in Morocco commits to: fair prices, no hidden fees, guaranteed quality.' },
    es: { title: 'Carta de los 7 Compromisos — Proveedores Certificados Tooristoo Marruecos', desc: 'Los 7 compromisos que cada proveedor certificado Tooristoo en Marruecos se compromete a cumplir.' },
    de: { title: '7-Verpflichtungen-Charta — Tooristoo Zertifizierte Anbieter in Marokko', desc: 'Die 7 Verpflichtungen, zu denen sich jeder zertifizierte Tooristoo-Anbieter in Marokko verpflichtet.' },
    ar: { title: 'ميثاق الالتزامات السبعة — مزودو Tooristoo المعتمدون في المغرب', desc: 'الالتزامات السبعة التي يتعهد بها كل مزود خدمات معتمد من Tooristoo في المغرب.' },
  },
  '/darija': {
    fr: { title: '100 Phrases en Darija pour Négocier au Maroc | Transcription + Traductions — Tooristoo', desc: 'Apprenez les 100 phrases essentielles en darija marocain avec transcription latine et traduction en 5 langues. Indispensable pour négocier comme un local.' },
    en: { title: '100 Darija Phrases to Negotiate in Morocco | Transcription + Translations — Tooristoo', desc: 'Learn the 100 essential Moroccan Darija phrases with Latin transcription and translations in 5 languages. Essential to negotiate like a local.' },
    es: { title: '100 Frases en Darija para Negociar en Marruecos | Transcripción + Traducciones — Tooristoo', desc: 'Las 100 frases esenciales en darija marroquí con transcripción latina y traducciones. Para negociar en taxi, zoco, riad y restaurante como un local.' },
    de: { title: '100 Darija-Phrasen für Verhandlungen in Marokko | Transkription + Übersetzungen — Tooristoo', desc: 'Die 100 wesentlichen marokkanischen Darija-Phrasen mit lateinischer Transkription. Zum Verhandeln in Taxi, Souk, Riad und Restaurant wie ein Einheimischer.' },
    ar: { title: '100 عبارة بالدارجة للتفاوض في المغرب | نسخ لاتيني + ترجمات — Tooristoo', desc: '100 عبارة أساسية بالدارجة المغربية مع نسخ لاتيني وترجمات بـ5 لغات. للتفاوض في التاكسي والسوق والرياض والمطعم كالسكان المحليين.' },
  },
  '/app': {
    fr: { title: 'Coach IA Vocal | Analysez & Négociez les Meilleurs Prix au Maroc — Tooristoo', desc: 'Coach vocal IA en temps réel pour analyser les prix et négocier équitablement comme un local au Maroc.' },
    en: { title: 'AI Voice Coach | Analyze & Negotiate Best Prices in Morocco — Tooristoo', desc: 'Real-time AI voice coach to analyze prices and negotiate fairly like a local in Morocco.' },
    es: { title: 'Coach de Voz IA | Analiza y Negocia los Mejores Precios en Marruecos — Tooristoo', desc: 'Coach de voz IA en tiempo real para analizar precios y negociar con equidad en Marruecos.' },
    de: { title: 'KI-Sprachcoach | Preise analysieren & verhandeln in Marokko — Tooristoo', desc: 'KI-Sprachcoach in Echtzeit zum Analysieren von Preisen und fairen Verhandeln in Marokko.' },
    ar: { title: 'مدرب صوتي ذكي | حلل وتفاوض على أفضل الأسعار في المغرب — Tooristoo', desc: 'مدرب صوتي ذكي في الوقت الفعلي لتحليل الأسعار والتفاوض بشفافية في المغرب.' },
  },
  '/contact': {
    fr: { title: 'Contactez Tooristoo — Support Client & Partenariats', desc: 'Contactez-nous pour toute question, partenariat ou signalement d\'arnaque. Email, téléphone, formulaire de contact.' },
    en: { title: 'Contact Tooristoo — Customer Support & Partnerships', desc: 'Get in touch with Tooristoo for questions, partnerships or reporting scams. Email, phone, contact form.' },
    es: { title: 'Contacta con Tooristoo — Soporte al Cliente & Asociaciones', desc: 'Ponte en contacto con Tooristoo para preguntas, asociaciones o reportar estafas.' },
    de: { title: 'Kontaktieren Sie Tooristoo — Kundensupport & Partnerschaften', desc: 'Kontaktieren Sie Tooristoo für Fragen, Partnerschaften oder Betrugsmeldungen.' },
    ar: { title: 'اتصل بـ Tooristoo — دعم العملاء والشراكات', desc: 'اتصل بـ Tooristoo لأي استفسار أو شراكة أو للإبلاغ عن احتيال.' },
  },
  '/privacy': {
    fr: { title: 'Politique de Confidentialité Tooristoo', desc: 'Politique de confidentialité et protection des données personnelles de Tooristoo. Comment vos données sont traitées et protégées.' },
    en: { title: 'Tooristoo Privacy Policy', desc: 'Privacy policy and personal data protection of Tooristoo. How your data is processed and protected.' },
    es: { title: 'Política de Privacidad de Tooristoo', desc: 'Política de privacidad y protección de datos personales de Tooristoo.' },
    de: { title: 'Datenschutzrichtlinie von Tooristoo', desc: 'Datenschutzrichtlinie und Schutz persönlicher Daten von Tooristoo.' },
    ar: { title: 'سياسة الخصوصية Tooristoo', desc: 'سياسة الخصوصية وحماية البيانات الشخصية Tooristoo.' },
  },
  '/terms': {
    fr: { title: 'Conditions d\'Utilisation Tooristoo', desc: 'Les conditions d\'utilisation complètes de Tooristoo. Droits, obligations, responsabilités de l\'utilisateur et du service.' },
    en: { title: 'Tooristoo Terms of Service', desc: 'Complete terms of service for Tooristoo. User rights, obligations, and service responsibilities.' },
    es: { title: 'Condiciones de Servicio de Tooristoo', desc: 'Condiciones de servicio completas de Tooristoo.' },
    de: { title: 'Nutzungsbedingungen von Tooristoo', desc: 'Vollständige Nutzungsbedingungen von Tooristoo.' },
    ar: { title: 'شروط الخدمة Tooristoo', desc: 'شروط الخدمة الكاملة Tooristoo.' },
  },
  '/legal': {
    fr: { title: 'Mentions Légales Tooristoo', desc: 'Mentions légales, immatriculation, responsable de publication, hébergement de Tooristoo.' },
    en: { title: 'Tooristoo Legal Notice', desc: 'Legal notice, registration, publisher and hosting information for Tooristoo.' },
    es: { title: 'Aviso Legal de Tooristoo', desc: 'Aviso legal e información de registro de Tooristoo.' },
    de: { title: 'Impressum von Tooristoo', desc: 'Impressum und Registrierungsinformationen von Tooristoo.' },
    ar: { title: 'إشعار قانوني Tooristoo', desc: 'الإشعار القانوني ومعلومات التسجيل Tooristoo.' },
  },
};

const HREFLANG_MAP = {
  fr: 'fr',
  en: 'en',
  es: 'es',
  de: 'de',
  ar: 'ar',
};

export default {
  async fetch(request) {
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
    let html = await response.text();

    // Detect language from query param or default to 'fr'
    const lang = url.searchParams.get('lang') || 'fr';
    const route = pathname === '/' ? '/' : pathname;
    const meta = META_BY_ROUTE[route]?.[lang];

    if (meta) {
      // Replace title
      html = html.replace(
        /<title>.*?<\/title>/,
        `<title>${meta.title}</title>`
      );

      // Replace description
      html = html.replace(
        /<meta name="description"[^>]*>/,
        `<meta name="description" content="${meta.desc.replace(/"/g, '&quot;')}">`
      );

      // Replace OG tags
      html = html.replace(
        /<meta property="og:title"[^>]*>/,
        `<meta property="og:title" content="${meta.title.replace(/"/g, '&quot;')}"`
      );
      html = html.replace(
        /<meta property="og:description"[^>]*>/,
        `<meta property="og:description" content="${meta.desc.replace(/"/g, '&quot;')}"`
      );

      // Add hreflang links
      let hreflangLinks = '';
      for (const [l, code] of Object.entries(HREFLANG_MAP)) {
        const href = `${url.origin}${route}?lang=${l}`;
        hreflangLinks += `<link rel="alternate" hreflang="${code}" href="${href}" />\n`;
      }
      hreflangLinks += `<link rel="alternate" hreflang="x-default" href="${url.origin}${route}" />\n`;

      // Insert hreflang before closing </head>
      html = html.replace('</head>', hreflangLinks + '</head>');
    }

    return new Response(html, {
      status: response.status,
      statusText: response.statusText,
      headers: new Headers(response.headers),
    });
  },
};
