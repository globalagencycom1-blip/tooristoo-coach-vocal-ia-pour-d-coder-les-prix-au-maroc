export const BLOG_PAGE_TRANSLATIONS = {
  blog_badge: {
    fr: 'Blog Tooristoo',
    en: 'Tooristoo Blog',
    es: 'Blog Tooristoo',
    de: 'Tooristoo Blog',
    ar: 'مدونة Tooristoo',
    darija: 'بلوج Tooristoo'
  },
  guides_title: {
    fr: 'Guides Négo',
    en: 'Negotiation Guides',
    es: 'Guías Negociación',
    de: 'Verhandlungsleitfäden',
    ar: 'أدلة التفاوض',
    darija: 'دليل الفاوضة'
  },
  guides_title_highlight: {
    fr: 'au Maroc',
    en: 'in Morocco',
    es: 'au Maroc',
    de: 'in Marokko',
    ar: 'في المغرب',
    darija: 'فالمغرب'
  },
guides_subtitle: {
    fr: 'Découvrez nos guides complets sur les prix réels, la vigilance tarifaire et la préparation de voyage.',
    en: 'Discover our comprehensive guides on real prices, price vigilance, and travel preparation.',
    es: 'Descubre nuestras guías sobre precios reales, vigilancia tarifaria y preparación de viajes.',
    de: 'Entdecken Sie unsere umfassenden Leitfäden zu echten Preisen, Preisvigilanz und Reisevorbereitung.',
    ar: 'اكتشف أدلتنا الشاملة حول الأسعار الحقيقية واليقظة السعرية والتحضير للسفر.',
    darija: 'اكتشف الأدلة ديالنا على الأسعار الحقيقية واليقظة السعرية والتحضير للسفر.'
  },
  pillars_label: {
    fr: 'Piliers',
    en: 'Pillars',
    es: 'Pilares',
    de: 'Säulen',
    ar: 'الأعمدة',
    darija: 'الأعمدة'
  },
  cities_label: {
    fr: 'Villes',
    en: 'Cities',
    es: 'Ciudades',
    de: 'Städte',
    ar: 'المدن',
    darija: 'المدن'
  },
  categories_label: {
    fr: 'Catégories',
    en: 'Categories',
    es: 'Categorías',
    de: 'Kategorien',
    ar: 'الفئات',
    darija: 'الفئات'
  },
  all: {
    fr: 'Tous',
    en: 'All',
    es: 'Todos',
    de: 'Alle',
    ar: 'الكل',
    darija: 'الكل'
  },
  all_fem: {
    fr: 'Toutes',
    en: 'All',
    es: 'Todas',
    de: 'Alle',
    ar: 'الكل',
    darija: 'الكل'
  },
  read: {
    fr: 'Lire',
    en: 'Read',
    es: 'Leer',
    de: 'Lesen',
    ar: 'اقرأ',
    darija: 'اقرا'
  },
  article_count: {
    fr: (count) => `${count} article${count > 1 ? 's' : ''}`,
    en: (count) => `${count} article${count > 1 ? 's' : ''}`,
    es: (count) => `${count} artículo${count > 1 ? 's' : ''}`,
    de: (count) => `${count} Artikel`,
    ar: (count) => `${count} مقالة`,
    darija: (count) => `${count} مقالة`
  },
  no_articles: {
    fr: 'Aucun article ne correspond à vos filtres.',
    en: 'No articles match your filters.',
    es: 'Ningún artículo coincide con tus filtros.',
    de: 'Keine Artikel entsprechen Ihren Filtern.',
    ar: 'لا توجد مقالات تطابق مرشحاتك.',
    darija: 'ما فيهاش مقالات تطابق الفلاتر ديالك.'
  }
};

export function getBlogPageT(key, lang = 'fr', ...args) {
  const translation = BLOG_PAGE_TRANSLATIONS[key]?.[lang];
  if (typeof translation === 'function') {
    return translation(...args);
  }
  return translation || BLOG_PAGE_TRANSLATIONS[key]?.['fr'] || key;
}