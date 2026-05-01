import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen } from 'lucide-react';
import { useT } from '../../lib/i18n';
import { getBlogArticles } from '../../lib/blog-articles';

export default function BlogHighlightSection({ lang }) {
  const t = useT(lang);
  const articles = getBlogArticles(lang).slice(0, 3);

  return (
    <section className="py-20 bg-shield-card/50 border-t border-b border-shield-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <BookOpen className="w-6 h-6 text-shield-green" />
            <h2 className="font-poppins font-black text-3xl md:text-4xl text-white">
              {lang === 'fr' ? 'Guides & Conseils' : lang === 'en' ? 'Guides & Tips' : lang === 'es' ? 'Guías & Consejos' : lang === 'de' ? 'Leitfäden & Tipps' : 'الأدلة والنصائح'}
            </h2>
          </div>
          <p className="text-gray-400 max-w-2xl mx-auto">
            {lang === 'fr' ? 'Découvrez nos articles pour voyager sereinement au Maroc' : lang === 'en' ? 'Discover our articles to travel safely in Morocco' : lang === 'es' ? 'Descubre nuestros artículos para viajar seguro en Marruecos' : lang === 'de' ? 'Entdecken Sie unsere Artikel für sicheres Reisen in Marokko' : 'اكتشف مقالاتنا للسفر بأمان في المغرب'}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {articles.map((article) => (
            <Link
              key={article.id}
              to={`/blog/${article.id}`}
              className="group bg-shield-dark rounded-2xl border border-shield-border hover:border-shield-green/50 overflow-hidden transition-all hover:shadow-lg"
            >
              <div className="h-40 bg-gradient-to-br from-shield-green/10 to-shield-gold/10 overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=500&h=300&fit=crop';
                  }}
                />
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs text-shield-green font-semibold uppercase">{article.pillar}</span>
                  <span className="text-xs text-gray-500">•</span>
                  <span className="text-xs text-gray-500">{article.readTime || '5 min'}</span>
                </div>
                <h3 className="font-poppins font-bold text-white group-hover:text-shield-green transition-colors mb-2 line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-sm text-gray-400 line-clamp-2 mb-4">{article.description}</p>
                <div className="flex items-center gap-2 text-shield-green text-sm font-semibold group-hover:gap-3 transition-all">
                  {lang === 'fr' ? 'Lire l\'article' : lang === 'en' ? 'Read article' : lang === 'es' ? 'Leer artículo' : lang === 'de' ? 'Artikel lesen' : 'اقرأ المقال'}
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 bg-shield-green/10 border border-shield-green/30 text-shield-green rounded-xl hover:bg-shield-green/20 transition-colors font-semibold"
          >
            {lang === 'fr' ? 'Tous les articles' : lang === 'en' ? 'All articles' : lang === 'es' ? 'Todos los artículos' : lang === 'de' ? 'Alle Artikel' : 'جميع المقالات'}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}