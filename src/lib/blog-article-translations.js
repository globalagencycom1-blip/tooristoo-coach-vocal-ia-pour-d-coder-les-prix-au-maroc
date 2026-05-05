export const BLOG_ARTICLE_TRANSLATIONS = {
  back_to_blog: {
    fr: 'Retour au blog',
    en: 'Back to blog',
    es: 'Volver al blog',
    de: 'Zurück zum Blog',
    ar: 'العودة إلى المدونة',
    darija: 'رجع للبلوج'
  },
  article_not_found: {
    fr: 'Article non trouvé',
    en: 'Article not found',
    es: 'Artículo no encontrado',
    de: 'Artikel nicht gefunden',
    ar: 'المقالة غير موجودة',
    darija: 'المقالة ما كتوجدش'
  },
  related_articles: {
    fr: 'Articles connexes',
    en: 'Related articles',
    es: 'Artículos relacionados',
    de: 'Verwandte Artikel',
    ar: 'مقالات ذات صلة',
    darija: 'المقالات المتعلقة'
  },
  need_help_negotiating: {
    fr: 'Besoin d\'aide pour négocier?',
    en: 'Need help negotiating?',
    es: '¿Necesitas ayuda para negociar?',
    de: 'Benötigen Sie Hilfe beim Verhandeln?',
    ar: 'هل تحتاج إلى مساعدة في التفاوض؟',
    darija: 'واش احتاج ليك الساعدة فالفاوضة؟'
  },
  ai_coach_desc: {
    fr: 'Notre coach IA vous guide en temps réel lors de vos négociations au Maroc.',
    en: 'Our AI coach guides you in real-time during your negotiations in Morocco.',
    es: 'Nuestro entrenador de IA te guía en tiempo real durante tus negociaciones en Marruecos.',
    de: 'Unser KI-Coach leitet Sie in Echtzeit durch Ihre Verhandlungen in Marokko.',
    ar: 'يوجهك مدرب التفاوض بالذكاء الاصطناعي لدينا في الوقت الفعلي أثناء مفاوضاتك في المغرب.',
    darija: 'الكوتش ديال التفاوض بالذكاء الاصطناعي ديالنا كيوجهك ف الوقت الحقيقي أثناء المفاوضات ديالك فالمغرب.'
  },
  try_now: {
    fr: 'Essayer maintenant',
    en: 'Try now',
    es: 'Probar ahora',
    de: 'Jetzt versuchen',
    ar: 'جرب الآن',
    darija: 'جرب دابا'
  }
};

export function getBlogArticleT(key, lang = 'fr') {
  return BLOG_ARTICLE_TRANSLATIONS[key]?.[lang] || BLOG_ARTICLE_TRANSLATIONS[key]?.['fr'] || key;
}