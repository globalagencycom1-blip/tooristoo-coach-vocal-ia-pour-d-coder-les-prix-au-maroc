export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // ===============================
    // ✅ 1. BYPASS FICHIERS CRITIQUES
    // ===============================
    if (
      url.pathname === "/sitemap.xml" ||
      url.pathname === "/robots.txt" ||
      url.pathname.startsWith("/.well-known")
    ) {
      return fetch(request);
    }

    // ===============================
    // ✅ 2. REDIRECT MAJUSCULES → MINUSCULES (SEO)
    // ===============================
    if (url.pathname.match(/[A-Z]/)) {
      const lowerPath = url.pathname.toLowerCase();
      return Response.redirect(
        `${url.origin}${lowerPath}${url.search}`,
        301
      );
    }

    // ===============================
    // ✅ 3. DETECTION LANGUE
    // ===============================
    const lang = url.searchParams.get("lang") || "fr";

    const supportedLangs = ["fr", "en", "es", "de", "ar"];
    const currentLang = supportedLangs.includes(lang) ? lang : "fr";

    // ===============================
    // ✅ 4. FETCH PAGE ORIGINALE
    // ===============================
    const response = await fetch(request);

    // Si ce n'est pas du HTML → ne pas modifier
    const contentType = response.headers.get("content-type") || "";
    if (!contentType.includes("text/html")) {
      return response;
    }

    let html = await response.text();

    // ===============================
    // ✅ 5. SEO DATA PAR PAGE
    // ===============================
    const path = url.pathname;

    const seoData = {
      "/": {
        fr: {
          title: "Tooristoo - Négociez comme un local au Maroc",
          description:
            "Coach IA vocal pour négocier prix taxis, souks, immobilier et éviter les arnaques au Maroc.",
        },
        en: {
          title: "Tooristoo - Negotiate like a local in Morocco",
          description:
            "AI voice coach to negotiate taxis, souks, real estate and avoid scams in Morocco.",
        },
      },

      "/about": {
        fr: {
          title: "À propos - Tooristoo",
          description:
            "Découvrez Tooristoo, le coach IA qui vous aide à éviter les arnaques au Maroc.",
        },
        en: {
          title: "About - Tooristoo",
          description:
            "Learn about Tooristoo, the AI coach helping you avoid scams in Morocco.",
        },
      },
    };

    const defaultSEO = {
      fr: {
        title: "Tooristoo - Guide intelligent Maroc",
        description:
          "Votre assistant intelligent pour voyager et négocier au Maroc.",
      },
      en: {
        title: "Tooristoo - Smart Morocco Guide",
        description:
          "Your smart assistant for traveling and negotiating in Morocco.",
      },
    };

    const seo =
      seoData[path]?.[currentLang] ||
      defaultSEO[currentLang] ||
      defaultSEO["fr"];

    // ===============================
    // ✅ 6. INJECTION SEO
    // ===============================

    html = html.replace(
      /<title>.*?<\/title>/i,
      `<title>${seo.title}</title>`
    );

    html = html.replace(
      /<meta name="description".*?>/i,
      `<meta name="description" content="${seo.description}">`
    );

    html = html.replace(
      /<meta property="og:title".*?>/i,
      `<meta property="og:title" content="${seo.title}">`
    );

    html = html.replace(
      /<meta property="og:description".*?>/i,
      `<meta property="og:description" content="${seo.description}">`
    );

    // ===============================
    // ✅ 7. HREFLANG (MULTI-LANGUES)
    // ===============================

    const baseUrl = url.origin + path;

    const hreflangLinks = `
<link rel="alternate" hreflang="fr" href="${baseUrl}?lang=fr" />
<link rel="alternate" hreflang="en" href="${baseUrl}?lang=en" />
<link rel="alternate" hreflang="es" href="${baseUrl}?lang=es" />
<link rel="alternate" hreflang="de" href="${baseUrl}?lang=de" />
<link rel="alternate" hreflang="ar" href="${baseUrl}?lang=ar" />
<link rel="alternate" hreflang="x-default" href="${baseUrl}" />
`;

    html = html.replace("</head>", `${hreflangLinks}</head>`);

    // ===============================
    // ✅ 8. RESPONSE PROPRE
    // ===============================
    return new Response(html, {
      headers: {
        "Content-Type": "text/html; charset=UTF-8",
      },
    });
  },
};