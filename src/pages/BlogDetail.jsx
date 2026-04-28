import React, { useState, useEffect } from 'react';
import { ArrowLeft, Calendar, Clock, Share2 } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useLang } from '../lib/LanguageContext';
import { useT } from '../lib/i18n';
import { getBlogT } from '../lib/i18n-blog';

export default function BlogDetail() {
  const { slug } = useParams();
  const { lang } = useLang();
  const t = useT(lang);
  const bt = getBlogT(lang);
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const data = await base44.entities.BlogArticle.filter({ slug });
        if (data.length > 0) {
          setArticle(data[0]);
        }
      } catch (error) {
        console.error('Error fetching article:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-shield-dark flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-shield-green/20 border-t-shield-green rounded-full animate-spin" />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-shield-dark">
        <Navbar />
        <div className="max-w-3xl mx-auto px-4 pt-28 pb-20 text-center">
          <h1 className="text-3xl text-white mb-4">{bt('blog_not_found')}</h1>
          <Link to="/blog" className="text-shield-green hover:text-green-400">
            {bt('blog_back')}
          </Link>
        </div>
        <Footer lang={lang} />
      </div>
    );
  }

  const getLocalizedContent = (field) => {
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

  const createdDate = new Date(article.created_date).toLocaleDateString(lang === 'fr' ? 'fr-FR' : lang === 'en' ? 'en-US' : 'fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="min-h-screen bg-shield-dark">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 pt-20 pb-20">
        {/* Back Link */}
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-shield-green hover:text-green-400 font-semibold mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          {bt('blog_back')}
        </Link>

        {/* Hero Image */}
        {article.featured_image && (
          <div className="mb-8 rounded-2xl overflow-hidden h-96">
            <img
              src={article.featured_image}
              alt={getLocalizedContent('title')}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-4 mb-6 pb-6 border-b border-shield-border">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{categoryEmoji[article.category]}</span>
            <span className="text-sm font-semibold text-shield-green uppercase">
              {categoryLabel[article.category]}
            </span>
          </div>
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <Calendar className="w-4 h-4" />
            {createdDate}
          </div>
          {article.read_time && (
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <Clock className="w-4 h-4" />
              {article.read_time} min {bt('blog_read')}
            </div>
          )}
        </div>

        {/* Title */}
        <h1 className="font-poppins font-black text-4xl md:text-5xl text-white mb-6 leading-tight">
          {getLocalizedContent('title')}
        </h1>

        {/* Content */}
        <div className="prose prose-invert max-w-none text-gray-300 mb-12">
          <div className="whitespace-pre-wrap leading-relaxed text-base">
            {getLocalizedContent('content')}
          </div>
        </div>

        {/* Share */}
        <div className="flex items-center gap-3 pt-8 border-t border-shield-border">
          <span className="text-gray-400 text-sm">{bt('blog_share')}:</span>
          <button
            onClick={() => {
              const url = window.location.href;
              navigator.clipboard.writeText(url);
            }}
            className="flex items-center gap-2 px-4 py-2 bg-shield-border/50 hover:bg-shield-border text-gray-300 rounded-lg transition-colors text-sm"
          >
            <Share2 className="w-4 h-4" />
            {bt('blog_copy_link')}
          </button>
        </div>

        {/* Related CTA */}
        <div className="mt-16 p-8 bg-shield-card border border-shield-border rounded-2xl text-center">
          <h3 className="font-poppins font-bold text-white text-xl mb-3">
            {bt('blog_cta_title')}
          </h3>
          <p className="text-gray-400 mb-6">
            {bt('blog_cta_subtitle')}
          </p>
          <Link
            to="/app"
            className="inline-flex items-center gap-2 px-6 py-3 bg-shield-green text-black font-bold rounded-xl hover:bg-green-400 transition-all"
          >
            {t('get_started') || 'Commencer'}
          </Link>
        </div>
      </div>
      <Footer lang={lang} />
    </div>
  );
}