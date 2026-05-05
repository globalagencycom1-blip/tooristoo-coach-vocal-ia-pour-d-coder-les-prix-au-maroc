/**
 * Cloudflare Worker pour Tooristoo SEO
 *
 * Fonctions :
 * - Réécrit les meta tags (title, description, og:*, twitter:*) par route
 * - Ajoute une balise canonical
 * - Redirige 301 les URLs en majuscules vers leur version en minuscules
 * - Try/catch global avec fallback vers la réponse d'origine en cas d'erreur
 * - Ne touche que les pages HTML (laisse passer images, fonts, JS, CSS)
 *
 * Architecture supportée :
 * - Une seule URL canonique par page (pas de ?lang=)
 * - La langue est détectée côté client par l'app
 * - Domaine canonique : www.tooristoo.com
 *
 * Déploiement : via dashboard Cloudflare ou `wrangler deploy`
 */

// Meta tags par route (en français — langue principale du marché Tooristoo)
const META_BY_ROUTE = {
  '/': {
    title: 'Tooristoo — Coach Vocal IA pour Décoder les Prix au Maroc',
    desc: 'Coach vocal IA pour décoder les prix et négocier comme un local au Maroc. Analyse en temps réel, multilingue, fourchettes de prix par ville.',
  },
  '/app': {
    title: 'Coach Vocal IA Tooristoo | Décoder les Prix au Maroc en Temps Réel',
    desc: 'Coach vocal IA en temps réel pour décoder les prix et négocier sereinement comme un local au Maroc.',
  },
  '/about': {
    title: 'À Propos de Tooristoo — Initiative Née à Marrakech pour la Vigilance Tarifaire',
    desc: 'Découvrez l\'histoire et la mission de Tooristoo, l\'initiative à échelle humaine qui aide les voyageurs à connaître les fourchettes de prix au Maroc.',
  },
  '/methodology': {
    title: 'Méthodologie Tooristoo — Comment Nous Établissons les Fourchettes de Prix',
    desc: 'Notre méthodologie publique : avis Google ≥ 4,0/5 sur 50+ commentaires, sources officielles, mise à jour trimestrielle, transparence totale.',
  },
  '/charter': {
    title: 'Charte des 7 Engagements — Tooristoo',
    desc: 'Les 7 engagements concrets de Tooristoo : sources vérifiables, recherche approfondie, note Google ≥ 4,0/5, mise à jour trimestrielle, signalement communautaire.',
  },
  '/faq': {
    title: 'FAQ Tooristoo — Questions Fréquentes sur le Coach Vocal IA Maroc',
    desc: 'Réponses aux questions fréquentes sur Tooristoo : fonctionnement, langues supportées, villes couvertes, plan gratuit, méthodologie de prix.',
  },
  '/providers': {
    title: 'Prestataires Référencés Tooristoo — Hôtels, Taxis, Restaurants au Maroc',
    desc: 'Répertoire de prestataires sélectionnés au Maroc selon notre méthodologie publique : note Google ≥ 4,0/5 sur 50+ avis, mise à jour trimestrielle.',
  },
  '/alerts': {
    title: 'Conseils de Vigilance Tarifaire au Maroc — Tooristoo',
    desc: 'Conseils pratiques pour voyager sereinement au Maroc : fourchettes de prix taxis, guides officiels, restaurants avec menu affiché, bons réflexes par ville.',
  },
  '/blog': {
    title: 'Blog Tooristoo — Guides de Voyage Maroc & Conseils de Négociation',
    desc: 'Guides complets, conseils de négociation et fourchettes de prix de référence par ville (Marrakech, Fès, Casablanca, Agadir…) pour voyager au Maroc.',
  },
  '/darija': {
    title: '50 Phrases en Darija pour Voyager au Maroc | Transcription + Traductions — Tooristoo',
    desc: 'Apprenez 50 phrases essentielles en darija marocain avec transcription latine et traductions en 5 langues. Indispensable pour échanger comme un local.',
  },
  '/contact': {
    title: 'Contactez Tooristoo — Support, Partenariats et Signalement',
    desc: 'Contactez l\'équipe Tooristoo pour toute question, partenariat ou signalement de prestataire. Email et formulaire de contact.',
  },
  '/privacy': {
    title: 'Politique de Confidentialité — Tooristoo',
    desc: 'Politique de confidentialité et protection des données personnelles de Tooristoo. Comment vos données sont collectées, traitées et protégées.',
  },
  '/terms': {
    title: 'Conditions d\'Utilisation — Tooristoo',
    desc: 'Conditions générales d\'utilisation de Tooristoo. Droits, obligations et responsabilités de l\'utilisateur et du service.',
  },
  '/legal': {
    title: 'Mentions Légales — Tooristoo',
    desc: 'Mentions légales de Tooristoo : éditeur, hébergeur, responsable de publication, immatriculation.',
  },
};

// Échappe les caractères spéciaux HTML pour les valeurs d'attributs
function escapeHtmlAttr(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

async function handleRequest(request) {
  const url = new URL(request.url);
  const pathname = url.pathname;

  // 1. Redirection 301 : URLs en majuscules vers minuscules
  if (pathname !== '/' && /[A-Z]/.test(pathname)) {
    const lowerPathname = pathname.toLowerCase();
    return new Response(null, {
      status: 301,
      headers: {
        Location: url.origin + lowerPathname + url.search + url.hash,
      },
    });
  }

  // 2. Récupérer la réponse d'origine
  const response = await fetch(request);

  // 3. Si ce n'est pas du HTML (image, JS, CSS, font...), passer telle quelle
  const contentType = response.headers.get('content-type') || '';
  if (!contentType.includes('text/html')) {
    return response;
  }

  // 4. Lire le HTML
  let html = await response.text();

  // 5. Identifier la route et trouver les meta correspondantes
  const route = pathname === '/' ? '/' : pathname;
  const meta = META_BY_ROUTE[route];

  // Si la route n'a pas de meta dédiée (ex: /blog/un-article), laisser passer
  if (!meta) {
    return new Response(html, {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
    });
  }

  const titleEscaped = escapeHtmlAttr(meta.title);
  const descEscaped = escapeHtmlAttr(meta.desc);

  // 6. Remplacer le <title>
  html = html.replace(
    /<title>[\s\S]*?<\/title>/i,
    `<title>${meta.title}</title>`
  );

  // 7. Remplacer la <meta name="description">
  html = html.replace(
    /<meta\s+name=["']description["'][^>]*>/i,
    `<meta name="description" content="${descEscaped}">`
  );

  // 8. Remplacer ou créer <meta property="og:title"> (avec > final correct)
  if (/<meta\s+property=["']og:title["'][^>]*>/i.test(html)) {
    html = html.replace(
      /<meta\s+property=["']og:title["'][^>]*>/i,
      `<meta property="og:title" content="${titleEscaped}">`
    );
  }

  // 9. Remplacer ou créer <meta property="og:description">
  if (/<meta\s+property=["']og:description["'][^>]*>/i.test(html)) {
    html = html.replace(
      /<meta\s+property=["']og:description["'][^>]*>/i,
      `<meta property="og:description" content="${descEscaped}">`
    );
  }

  // 10. Remplacer ou créer <meta property="og:url">
  const canonicalUrl = `${url.origin}${route}`;
  if (/<meta\s+property=["']og:url["'][^>]*>/i.test(html)) {
    html = html.replace(
      /<meta\s+property=["']og:url["'][^>]*>/i,
      `<meta property="og:url" content="${canonicalUrl}">`
    );
  }

  // 11. Remplacer ou créer <meta name="twitter:title">
  if (/<meta\s+name=["']twitter:title["'][^>]*>/i.test(html)) {
    html = html.replace(
      /<meta\s+name=["']twitter:title["'][^>]*>/i,
      `<meta name="twitter:title" content="${titleEscaped}">`
    );
  }

  // 12. Remplacer ou créer <meta name="twitter:description">
  if (/<meta\s+name=["']twitter:description["'][^>]*>/i.test(html)) {
    html = html.replace(
      /<meta\s+name=["']twitter:description["'][^>]*>/i,
      `<meta name="twitter:description" content="${descEscaped}">`
    );
  }

  // 13. Ajouter ou remplacer la balise canonical
  const canonicalTag = `<link rel="canonical" href="${canonicalUrl}" />`;
  if (/<link\s+rel=["']canonical["'][^>]*>/i.test(html)) {
    html = html.replace(/<link\s+rel=["']canonical["'][^>]*>/i, canonicalTag);
  } else {
    // Insérer juste avant </head>
    html = html.replace('</head>', canonicalTag + '\n</head>');
  }

  // 14. Renvoyer la réponse modifiée avec les bons headers
  const newHeaders = new Headers(response.headers);
  newHeaders.set('content-type', 'text/html; charset=utf-8');
  // Cache court pour permettre des mises à jour rapides
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
      // Cela évite tout écran blanc en cas de bug du Worker
      console.error('Tooristoo Worker error:', err.message, err.stack);
      return fetch(request);
    }
  },
};