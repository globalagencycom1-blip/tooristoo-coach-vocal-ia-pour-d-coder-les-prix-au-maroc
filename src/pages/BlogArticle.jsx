import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, Calendar, MapPin, Tag } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { getArticleById, PILLARS, CATEGORIES, BLOG_ARTICLES } from '../lib/blog-articles';
import { useLang } from '../lib/LanguageContext';
import { useT } from '../lib/i18n';

export default function BlogArticle() {
  const { id } = useParams();
  const { lang } = useLang();
  const t = useT(lang);
  const article = getArticleById(id);

  if (!article) {
    return (
      <div className="min-h-screen bg-shield-dark">
        <Navbar />
        <div className="max-w-3xl mx-auto px-4 pt-28 pb-20 text-center">
          <h1 className="text-2xl font-bold text-white mb-4">
            {lang === 'fr' ? 'Article non trouvé' : 'Article not found'}
          </h1>
          <Link to="/blog" className="text-shield-green hover:underline">
            {lang === 'fr' ? 'Retour au blog' : 'Back to blog'}
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

  // Get related articles (same pillar or city)
  const related = BLOG_ARTICLES.filter(
    a => a.id !== id && (a.pillar === article.pillar || a.city === article.city)
  ).slice(0, 3);

  return (
    <div className="min-h-screen bg-shield-dark">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 pt-24 pb-20">
        {/* Back button */}
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-shield-green hover:text-shield-gold transition-colors mb-8"
        >
          <ChevronLeft className="w-4 h-4" />
          {lang === 'fr' ? 'Retour au blog' : 'Back to blog'}
        </Link>

        {/* Hero image */}
        <div className="rounded-2xl overflow-hidden mb-8 h-96">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4 flex-wrap">
            <span className="px-3 py-1 bg-shield-green/20 border border-shield-green/40 text-shield-green text-xs font-bold rounded-full">
              {pillarInfo?.icon} {pillarInfo?.label}
            </span>
            <span className="px-3 py-1 bg-shield-gold/20 border border-shield-gold/40 text-shield-gold text-xs font-bold rounded-full">
              {categoryInfo?.label}
            </span>
          </div>

          <h1 className="font-poppins font-black text-4xl text-white mb-4">
            {article.title}
          </h1>

          {/* Meta */}
          <div className="flex items-center gap-4 text-gray-400 text-sm flex-wrap">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {new Date(article.date).toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'en-US')}
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              {article.city}
            </div>
            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4" />
              {article.author}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="prose prose-invert max-w-none mb-12">
          <div className="bg-shield-card border border-shield-border rounded-2xl p-8 text-gray-300 leading-relaxed space-y-4">
            {article.content.split('\n\n').map((paragraph, i) => {
              if (paragraph.startsWith('**') && paragraph.endsWith(':**')) {
                return (
                  <h3 key={i} className="text-lg font-bold text-white mt-6 mb-3">
                    {paragraph.replace(/\*\*/g, '')}
                  </h3>
                );
              }
              if (paragraph.startsWith('- ')) {
                return (
                  <ul key={i} className="space-y-2">
                    {paragraph.split('\n').map((item, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <span className="text-shield-green mt-1">•</span>
                        <span>{item.replace('- ', '')}</span>
                      </li>
                    ))}
                  </ul>
                );
              }
              return <p key={i}>{paragraph}</p>;
            })}
          </div>
        </div>

        {/* Related articles */}
        {related.length > 0 && (
          <div className="border-t border-shield-border pt-12">
            <h3 className="text-2xl font-bold text-white mb-6">
              {lang === 'fr' ? 'Articles connexes' : 'Related articles'}
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              {related.map(art => (
                <Link
                  key={art.id}
                  to={`/blog/${art.id}`}
                  className="group bg-shield-card border border-shield-border rounded-xl p-4 hover:border-shield-green/50 transition-all"
                >
                  <p className="text-sm text-gray-400 mb-2">{art.city}</p>
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
            {lang === 'fr' ? 'Besoin d\'aide pour négocier?' : 'Need help negotiating?'}
          </h3>
          <p className="text-gray-400 text-sm mb-6">
            {lang === 'fr'
              ? 'Notre coach IA vous guide en temps réel lors de vos négociations au Maroc.'
              : 'Our AI coach guides you in real-time during your negotiations in Morocco.'}
          </p>
          <Link
            to="/app"
            className="inline-flex items-center gap-2 px-6 py-3 bg-shield-green text-black font-bold rounded-xl hover:bg-green-400 transition-all"
          >
            {lang === 'fr' ? 'Essayer maintenant' : 'Try now'}
          </Link>
        </div>
      </div>
      <Footer lang={lang} />
    </div>
  );
}