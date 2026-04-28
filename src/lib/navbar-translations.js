export const NAVBAR_TRANSLATIONS = {
  fr: {
    nav_blog: 'Blog',
    nav_faq: 'FAQ'
  },
  en: {
    nav_blog: 'Blog',
    nav_faq: 'FAQ'
  },
  es: {
    nav_blog: 'Blog',
    nav_faq: 'FAQ'
  },
  de: {
    nav_blog: 'Blog',
    nav_faq: 'FAQ'
  },
  ar: {
    nav_blog: 'المدونة',
    nav_faq: 'FAQ'
  },
  darija: {
    nav_blog: 'المدونة',
    nav_faq: 'FAQ'
  }
};

export function getNavbarT(key, lang = 'fr') {
  return NAVBAR_TRANSLATIONS[lang]?.[key] || NAVBAR_TRANSLATIONS['fr']?.[key] || key;
}