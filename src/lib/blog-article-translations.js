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
    fr: 'Notre coach IA négociateur vous guide en temps réel lors de vos négociations au Maroc.',
    en: 'Our AI negotiation coach guides you in real time during your negotiations in Morocco.',
    es: 'Nuestro coach de negociación con IA te guía en tiempo real durante tus negociaciones en Marruecos.',
    de: 'Unser KI-Verhandlungscoach begleitet Sie in Echtzeit bei Ihren Verhandlungen in Marokko..',
    ar: 'مدربنا الذكي للتفاوض يرشدك في الوقت الفعلي أثناء مفاوضاتك في المغرب.',
    darija: 'كوتش التفاوض بالذكاء الاصطناعي ديالنا كيهديك فالوقت الحقيقي فمفاوضاتك فالمغرب.'
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