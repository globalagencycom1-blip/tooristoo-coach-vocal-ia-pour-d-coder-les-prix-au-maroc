import React, { useState, useEffect } from 'react';
import { BookOpen, ArrowRight, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useLang } from '../lib/LanguageContext';
import { useT } from '../lib/i18n';
import { getBlogT } from '../lib/i18n-blog';

export default function Blog() {
  const { lang } = useLang();
  const t = useT(lang);
  const bt = getBlogT(lang);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const data = await base44.entities.BlogArticle.filter(
          { published: true },
          '-updated_date',
          100
        );
        setArticles(data);
      } catch (error) {
        console.error('Error fetching articles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const getLocalizedContent = (article, field) => {
    return article[`${field}_${lang}`] || article[`${field}_fr`] || '';
  };

  const categoryEmoji = {
    negotiation: '💬',
    tips: '💡',
    market: '📊',
    safety: '⚠️'
  };

  const categoryLabel = {
    negotiation: t('blog_cat_negotiation') || 'Négociation',
    tips: t('blog_cat_tips') || 'Astuces',
    market: t('blog_cat_market') || 'Marché',
    safety: t('blog_cat_safety') || 'Sécurité'
  };

  return (
    <div className="min-h-screen bg-shield-dark">
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 pt-28 pb-20">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-shield-green/10 border border-shield-green/30 rounded-full text-shield-green text-sm font-medium mb-6">
            <BookOpen className="w-4 h-4" />
            {bt('blog_badge')}
          </div>
          <h1 className="font-poppins font-black text-4xl md:text-5xl text-white mb-4">
            {bt('blog_title')}
            <span className="text-gradient-green"> {bt('blog_title2')}</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            {bt('blog_subtitle')}
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center py-12">
            <div className="w-8 h-8 border-4 border-shield-green/20 border-t-shield-green rounded-full animate-spin" />
          </div>
        )}

        {/* Articles Grid */}
        {!loading && articles.length > 0 && (
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {articles.map((article) => (
              <Link
                key={article.id}
                to={`/blog/${article.slug}`}
                className="group bg-shield-card border border-shield-border rounded-2xl overflow-hidden hover:border-shield-green/50 transition-all hover:shadow-lg hover:shadow-shield-green/10"
              >
                {/* Featured Image */}
                {article.featured_image && (
                  <div className="h-48 overflow-hidden bg-shield-border">
                    <img
                      src={article.featured_image}
                      alt={getLocalizedContent(article, 'title')}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}

                <div className="p-6">
                  {/* Meta */}
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl">
                      {categoryEmoji[article.category]}
                    </span>
                    <span className="text-xs font-semibold text-shield-green uppercase">
                      {categoryLabel[article.category]}
                    </span>
                    {article.read_time && (
                      <>
                        <span className="text-gray-600">•</span>
                        <span className="text-xs text-gray-400">
                          {article.read_time} min {bt('blog_read')}
                        </span>
                      </>
                    )}
                  </div>

                  {/* Title */}
                  <h2 className="font-poppins font-bold text-xl text-white mb-3 group-hover:text-shield-green transition-colors">
                    {getLocalizedContent(article, 'title')}
                  </h2>

                  {/* Excerpt */}
                  <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3">
                    {getLocalizedContent(article, 'excerpt')}
                  </p>

                  {/* CTA */}
                  <div className="flex items-center gap-2 text-shield-green font-semibold text-sm">
                    {bt('blog_read_more')}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* No Articles */}
        {!loading && articles.length === 0 && (
          <div className="text-center py-16 bg-shield-card border border-shield-border rounded-2xl">
            <BookOpen className="w-12 h-12 text-gray-600 mx-auto mb-3" />
            <p className="text-gray-400">{bt('blog_empty')}</p>
          </div>
        )}
      </div>
      <Footer lang={lang} />
    </div>
  );
}