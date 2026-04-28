import React, { useState } from 'react';
import { BookOpen, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { getBlogArticles, PILLARS, CATEGORIES, CITIES } from '../lib/blog-articles';
import { getBlogPageT } from '../lib/blog-page-translations';
import { useLang } from '../lib/LanguageContext';
import { useT } from '../lib/i18n';

export default function Blog() {
  const { lang } = useLang();
  const t = useT(lang);
  const [pillar, setPillar] = useState(null);
  const [city, setCity] = useState(null);
  const [category, setCategory] = useState(null);

  const articles = getBlogArticles(lang);
  const filtered = articles.filter(article => {
    const pillarMatch = !pillar || article.pillar === pillar;
    const cityMatch = !city || article.city === city;
    const categoryMatch = !category || article.category === category;
    return pillarMatch && cityMatch && categoryMatch;
  });

  const getPillarLabel = (key) => {
    const pillarObj = PILLARS.find(p => p.key === key);
    return pillarObj ? `${pillarObj.icon} ${pillarObj.label}` : '';
  };

  const getCategoryLabel = (key) => {
    const catObj = CATEGORIES.find(c => c.key === key);
    return catObj ? catObj.label : '';
  };

  return (
    <div className="min-h-screen bg-shield-dark">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 pt-28 pb-20">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-shield-green/10 border border-shield-green/30 rounded-full text-shield-green text-sm font-medium mb-6">
            <BookOpen className="w-4 h-4" />
            {getBlogPageT('blog_badge', lang)}
          </div>
          <h1 className="font-poppins font-black text-4xl md:text-5xl text-white mb-4">
            {getBlogPageT('guides_title', lang)}
            <span className="text-gradient-green"> {getBlogPageT('guides_title_highlight', lang)}</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            {getBlogPageT('guides_subtitle', lang)}
          </p>
        </div>

        {/* Filters */}
        <div className="space-y-4 mb-10">
          {/* Pillars */}
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase mb-3">{getBlogPageT('pillars_label', lang)}</p>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setPillar(null)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  !pillar
                    ? 'bg-shield-green text-black'
                    : 'bg-shield-border text-gray-300 hover:bg-shield-border/80'
                }`}
              >
                {getBlogPageT('all', lang)}
              </button>
              {PILLARS.map(p => (
                <button
                  key={p.key}
                  onClick={() => setPillar(p.key)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    pillar === p.key
                      ? 'bg-shield-green text-black'
                      : 'bg-shield-border text-gray-300 hover:bg-shield-border/80'
                  }`}
                >
                  {p.icon} {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Cities */}
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase mb-3">{getBlogPageT('cities_label', lang)}</p>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setCity(null)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  !city
                    ? 'bg-shield-gold text-black'
                    : 'bg-shield-border text-gray-300 hover:bg-shield-border/80'
                }`}
              >
                {getBlogPageT('all_fem', lang)}
              </button>
              {CITIES.map(c => (
                <button
                  key={c}
                  onClick={() => setCity(c)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    city === c
                      ? 'bg-shield-gold text-black'
                      : 'bg-shield-border text-gray-300 hover:bg-shield-border/80'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase mb-3">{getBlogPageT('categories_label', lang)}</p>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setCategory(null)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  !category
                    ? 'bg-shield-green/20 text-shield-green border border-shield-green/50'
                    : 'bg-shield-border text-gray-300 hover:bg-shield-border/80'
                }`}
              >
                {getBlogPageT('all_fem', lang)}
              </button>
              {CATEGORIES.map(c => (
                <button
                  key={c.key}
                  onClick={() => setCategory(c.key)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    category === c.key
                      ? 'bg-shield-green/20 text-shield-green border border-shield-green/50'
                      : 'bg-shield-border text-gray-300 hover:bg-shield-border/80'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results count */}
        <div className="mb-6">
          <p className="text-sm text-gray-400">
            {getBlogPageT('article_count', lang, filtered.length)}
          </p>
        </div>

        {/* Articles Grid */}
        {filtered.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-6">
            {filtered.map(article => (
              <Link
                key={article.id}
                to={`/blog/${article.id}`}
                className="group bg-shield-card border border-shield-border rounded-2xl overflow-hidden hover:border-shield-green/50 transition-all hover:shadow-lg hover:shadow-shield-green/10"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="px-3 py-1 bg-shield-green/90 text-black text-xs font-bold rounded-full">
                      {getPillarLabel(article.pillar).split(' ')[0]}
                    </span>
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 className="font-poppins font-bold text-white text-base leading-snug group-hover:text-shield-green transition-colors">
                      {article.title}
                    </h3>
                  </div>

                  <p className="text-gray-400 text-sm leading-relaxed mb-3">{article.excerpt}</p>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                      <span>{article.city}</span>
                      <span>•</span>
                      <span>{getCategoryLabel(article.category)}</span>
                    </div>
                    <span className="text-xs text-gray-600">{new Date(article.date).toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'en-US')}</span>
                  </div>

                  <div className="flex items-center gap-2 text-shield-green text-sm font-semibold group-hover:gap-3 transition-all">
                    {getBlogPageT('read', lang)}
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-shield-card border border-shield-border rounded-2xl">
            <BookOpen className="w-12 h-12 text-gray-600 mx-auto mb-3" />
            <p className="text-gray-400">
              {getBlogPageT('no_articles', lang)}
            </p>
          </div>
        )}
      </div>
      <Footer lang={lang} />
    </div>
  );
}