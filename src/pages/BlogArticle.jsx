import React from ‘react’;
import { useParams, Link } from ‘react-router-dom’;
import { Helmet } from ‘react-helmet-async’;
import { ChevronLeft, Calendar, MapPin, Tag } from ‘lucide-react’;
import Navbar from ‘../components/Navbar’;
import Footer from ‘../components/Footer’;
import { getArticleById, getArticlesByFilters, PILLARS, CATEGORIES } from ‘../lib/blog-articles’;
import { getBlogArticleT } from ‘../lib/blog-article-translations’;
import { getPillarLabel, getCategoryLabel, getCityLabel } from ‘../lib/blog-labels-translations’;
import { useLang } from ‘../lib/LanguageContext’;
import { useT } from ‘../lib/i18n’;

const BASE = ‘https://www.tooristoo.com’;

// ─── Labels CTA par langue ────────────────────────────────────────────────────
const CTA_TAXI_LABELS = {
fr: { btn: ‘Calculer mon trajet maintenant’, sub: ‘Analyse IA en temps réel · Gratuit’ },
en: { btn: ‘Calculate my trip now’, sub: ‘Real-time AI analysis · Free’ },
es: { btn: ‘Calcular mi trayecto ahora’, sub: ‘Análisis IA en tiempo real · Gratis’ },
de: { btn: ‘Meine Fahrt jetzt berechnen’, sub: ‘Echtzeit KI-Analyse · Kostenlos’ },
ar: { btn: ‘احسب رحلتي الآن’, sub: ‘تحليل ذكي فوري · مجاني’ },
darija: { btn: ‘حسب الرحلة ديالي دابا’, sub: ‘تحليل ذكي فوري · بلاش’ },
};

const CTA_DARIJA_LABELS = {
fr: { btn: ‘Découvrir plus de phrases en darija’, sub: ‘Votre coach vocal vous guide en temps réel’ },
en: { btn: ‘Discover more Darija phrases’, sub: ‘Your voice coach guides you in real time’ },
es: { btn: ‘Descubrir más frases en darija’, sub: ‘Tu coach vocal te guía en tiempo real’ },
de: { btn: ‘Mehr Darija-Phrasen entdecken’, sub: ‘Ihr Sprachcoach führt Sie in Echtzeit’ },
ar: { btn: ‘اكتشف المزيد من عبارات الدارجة’, sub: ‘مدرّبك الصوتي يرشدك في الوقت الفعلي’ },
darija: { btn: ‘اكتشف أكتر من عبارات الدارجة’, sub: ‘كوتشك الصوتي كيرشدك فالوقت الحقيقي’ },
};

// ─── Renderer markdown enrichi ───────────────────────────────────────────────
function renderContent(text, lang) {
if (!text) return null;

const blocks = text.split(’\n\n’);

return blocks.map((block, i) => {
// CTA Taxi — bouton “Calculer mon trajet”
if (block.trim() === ‘[CTA_TAXI]’) {
const labels = CTA_TAXI_LABELS[lang] || CTA_TAXI_LABELS[‘fr’];
return (
<div key={i} className="my-6 p-5 bg-gradient-to-r from-shield-green/15 to-shield-green/5 border border-shield-green/40 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
<div>
<p className="text-white font-semibold text-sm">🚕 {labels.btn}</p>
<p className="text-gray-400 text-xs mt-1">{labels.sub}</p>
</div>
<a
href="/app"
className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-2.5 bg-shield-green text-black font-bold text-sm rounded-xl hover:bg-green-400 transition-all whitespace-nowrap shadow-lg shadow-shield-green/20"
>
🚕 {labels.btn}
</a>
</div>
);
}

```
// CTA Darija — bouton "Découvrir plus de phrases"
if (block.trim() === '[CTA_DARIJA]') {
  const labels = CTA_DARIJA_LABELS[lang] || CTA_DARIJA_LABELS['fr'];
  return (
    <div key={i} className="my-6 p-5 bg-gradient-to-r from-shield-gold/15 to-shield-gold/5 border border-shield-gold/40 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
      <div>
        <p className="text-white font-semibold text-sm">🎙️ {labels.btn}</p>
        <p className="text-gray-400 text-xs mt-1">{labels.sub}</p>
      </div>
      <a
        href="/darija"
        className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-2.5 bg-shield-gold text-black font-bold text-sm rounded-xl hover:bg-yellow-400 transition-all whitespace-nowrap shadow-lg shadow-shield-gold/20"
      >
        🎙️ {labels.btn}
      </a>
    </div>
  );
}

// Titre de section : **Titre :**
if (/^\*\*[^*]+\*\*\s*:?\s*$/.test(block.trim())) {
  const title = block.replace(/\*\*/g, '').replace(/:$/, '').trim();
  return (
    <div key={i} className="flex items-center gap-3 mt-8 mb-4">
      <div className="w-1 h-6 bg-shield-green rounded-full flex-shrink-0" />
      <h3 className="text-lg font-bold text-white">{title}</h3>
    </div>
  );
}

// Liste : chaque ligne commence par "- "
if (block.trim().startsWith('- ')) {
  const items = block.split('\n').filter(l => l.trim().startsWith('- '));
  return (
    <ul key={i} className="space-y-2 my-2">
      {items.map((item, j) => {
        const content = item.replace(/^-\s+/, '');
        // Détecter "texte : valeur" pour mise en forme prix
        const colonIdx = content.indexOf(' : ');
        const dashIdx = content.indexOf(' — ');
        if (colonIdx !== -1 || dashIdx !== -1) {
          const sep = colonIdx !== -1 && (dashIdx === -1 || colonIdx < dashIdx) ? ' : ' : ' — ';
          const [label, ...rest] = content.split(sep);
          const value = rest.join(sep);
          return (
            <li key={j} className="flex items-start gap-3 py-2 px-3 rounded-lg bg-white/5 hover:bg-white/8 transition-colors">
              <span className="text-shield-green mt-0.5 flex-shrink-0 text-sm">▸</span>
              <span className="flex-1 text-sm leading-relaxed">
                <span className="text-white font-medium">{label}</span>
                <span className="text-shield-green mx-1">{sep.trim()}</span>
                <span className="text-gray-300">{value}</span>
              </span>
            </li>
          );
        }
        return (
          <li key={j} className="flex items-start gap-3 py-1.5 px-3 rounded-lg bg-white/5">
            <span className="text-shield-green mt-0.5 flex-shrink-0 text-sm">▸</span>
            <span className="text-gray-300 text-sm leading-relaxed">{renderInline(content)}</span>
          </li>
        );
      })}
    </ul>
  );
}

// Paragraphe normal
return (
  <p key={i} className="text-gray-300 leading-relaxed text-sm">
    {renderInline(block)}
  </p>
);
```

});
}

// Rendu inline : **bold** → <strong>
function renderInline(text) {
const parts = text.split(/(**[^*]+**)/g);
return parts.map((part, i) => {
if (part.startsWith(’**’) && part.endsWith(’**’)) {
return <strong key={i} className="text-white font-semibold">{part.slice(2, -2)}</strong>;
}
return part;
});
}

// ─── Composant principal ──────────────────────────────────────────────────────
export default function BlogArticle() {
const { id } = useParams();
const { lang } = useLang();
const t = useT(lang);
const article = getArticleById(id, lang);

if (!article) {
return (
<div className="min-h-screen bg-shield-dark">
<Navbar />
<div className="max-w-3xl mx-auto px-4 pt-28 pb-20 text-center">
<h1 className="text-2xl font-bold text-white mb-4">
{getBlogArticleT(‘article_not_found’, lang)}
</h1>
<Link to="/blog" className="text-shield-green hover:underline">
{getBlogArticleT(‘back_to_blog’, lang)}
</Link>
</div>
<Footer lang={lang} />
</div>
);
}

const getPillarInfo = (key) => PILLARS.find(p => p.key === key);
const getCategoryInfo = (key) => CATEGORIES.find(c => c.key === key);
const pillarInfo = getPillarInfo(article.pillar);
const categoryInfo = getCategoryInfo(article.category);

const allArticles = getArticlesByFilters(null, null, null, lang);
const related = allArticles.filter(
a => a.id !== id && (a.pillar === article.pillar || a.city === article.city)
).slice(0, 3);

const blogPostingSchema = {
‘@context’: ‘https://schema.org’,
‘@type’: ‘BlogPosting’,
‘@id’: `${BASE}/blog/${article.id}`,
headline: article.title,
description: article.excerpt,
datePublished: article.date,
dateModified: article.date,
author: { ‘@type’: ‘Person’, name: article.author || ‘Tooristoo’, url: BASE },
publisher: {
‘@type’: ‘Organization’,
name: ‘Tooristoo’,
url: BASE,
logo: { ‘@type’: ‘ImageObject’, url: `${BASE}/logo.png`, width: 200, height: 200 },
},
image: { ‘@type’: ‘ImageObject’, url: article.image, representativeOfPage: true },
url: `${BASE}/blog/${article.id}`,
mainEntityOfPage: { ‘@type’: ‘WebPage’, ‘@id’: `${BASE}/blog/${article.id}` },
inLanguage: lang,
about: { ‘@type’: ‘Place’, name: article.city, address: { ‘@type’: ‘PostalAddress’, addressCountry: ‘MA’ } },
keywords: `${article.city}, ${article.category}, Maroc, vigilance tarifaire, négociation, prix, tourisme`,
articleSection: article.pillar,
isPartOf: { ‘@type’: ‘Blog’, name: ‘Tooristoo Blog’, url: `${BASE}/blog` },
};

return (
<div className="min-h-screen bg-shield-dark">
<Helmet>
<title>{article.title} | Tooristoo</title>
<meta name="description" content={article.excerpt} />
<meta property="og:type" content="article" />
<meta property=“og:url” content={`${BASE}/blog/${article.id}`} />
<meta property="og:title" content={article.title} />
<meta property="og:description" content={article.excerpt} />
<meta property="og:image" content={article.image} />
<meta property="article:published_time" content={article.date} />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content={article.title} />
<meta name="twitter:description" content={article.excerpt} />
<meta name="twitter:image" content={article.image} />
<link rel=“canonical” href={`${BASE}/blog/${article.id}`} />
<script type="application/ld+json">{JSON.stringify(blogPostingSchema)}</script>
</Helmet>
<Navbar />

```
  <div className="max-w-3xl mx-auto px-4 pt-24 pb-20">
    {/* Back */}
    <Link
      to="/blog"
      className="inline-flex items-center gap-2 text-shield-green hover:text-shield-gold transition-colors mb-8"
    >
      <ChevronLeft className="w-4 h-4" />
      {getBlogArticleT('back_to_blog', lang)}
    </Link>

    {/* Hero image */}
    <div className="rounded-2xl overflow-hidden mb-8 h-96">
      <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
    </div>

    {/* Header */}
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-4 flex-wrap">
        <span className="px-3 py-1 bg-shield-green/20 border border-shield-green/40 text-shield-green text-xs font-bold rounded-full">
          {pillarInfo?.icon} {getPillarLabel(article.pillar, lang)}
        </span>
        <span className="px-3 py-1 bg-shield-gold/20 border border-shield-gold/40 text-shield-gold text-xs font-bold rounded-full">
          {getCategoryLabel(article.category, lang)}
        </span>
      </div>
      <h1 className="font-poppins font-black text-4xl text-white mb-4">{article.title}</h1>
      <div className="flex items-center gap-4 text-gray-400 text-sm flex-wrap">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          {new Date(article.date).toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'en-US')}
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4" />
          {getCityLabel(article.city, lang)}
        </div>
        <div className="flex items-center gap-2">
          <Tag className="w-4 h-4" />
          {article.author}
        </div>
      </div>
    </div>

    {/* Excerpt */}
    <div className="mb-6 p-4 border-l-4 border-shield-green bg-shield-green/5 rounded-r-xl">
      <p className="text-gray-300 text-sm leading-relaxed italic">{article.excerpt}</p>
    </div>

    {/* Content */}
    <div className="bg-shield-card border border-shield-border rounded-2xl p-8 mb-12 space-y-3">
      {renderContent(article.content, lang)}
    </div>

    {/* Related */}
    {related.length > 0 && (
      <div className="border-t border-shield-border pt-12">
        <h3 className="text-2xl font-bold text-white mb-6">
          {getBlogArticleT('related_articles', lang)}
        </h3>
        <div className="grid md:grid-cols-3 gap-4">
          {related.map(art => (
            <Link
              key={art.id}
              to={`/blog/${art.id}`}
              className="group bg-shield-card border border-shield-border rounded-xl p-4 hover:border-shield-green/50 transition-all"
            >
              <p className="text-sm text-gray-400 mb-2">{getCityLabel(art.city, lang)}</p>
              <h4 className="font-bold text-white text-sm leading-snug group-hover:text-shield-green transition-colors mb-3">
                {art.title}
              </h4>
              <span className="text-shield-green text-xs font-semibold">
                {lang === 'fr' ? 'Lire' : 'Read'} →
              </span>
            </Link>
          ))}
        </div>
      </div>
    )}

    {/* CTA */}
    <div className="mt-12 p-8 bg-shield-card border border-shield-gold/20 rounded-2xl text-center card-glow-gold">
      <span className="text-4xl mb-4 block">🎓</span>
      <h3 className="font-bold text-white text-xl mb-2">
        {getBlogArticleT('need_help_negotiating', lang)}
      </h3>
      <p className="text-gray-400 text-sm mb-6">
        {getBlogArticleT('ai_coach_desc', lang)}
      </p>
      <Link
        to="/app"
        className="inline-flex items-center gap-2 px-6 py-3 bg-shield-green text-black font-bold rounded-xl hover:bg-green-400 transition-all"
      >
        {getBlogArticleT('try_now', lang)}
      </Link>
    </div>
  </div>

  <Footer lang={lang} />
</div>
```

);
}
