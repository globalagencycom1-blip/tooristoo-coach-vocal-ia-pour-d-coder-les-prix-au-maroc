import { BLOG_ARTICLES_TRANSLATIONS } from './blog-translations';

export const BLOG_ARTICLES_BASE = [
  { id: 'marrakech-taxi-prix', city: 'Marrakech', category: 'taxi', pillar: 'prix', image: 'https://images.openai.com/static-rsc-4/Hw9959y90JVcN4985nj7j6lgooqJzpvPb9Vc-c5oHu62bZ2sajX9ElmW1LSTSdFEyb_rd6DXTaz8JaT4uLid5qF6WkVUM0BszFoq7FaHsDeiqJ_2cHv5QeGzdfuSIXJaVj-WY2bVRj_6ZRtzIJ49kxSL-_85T1_xJQbyT_eTgLg?purpose=inline', author: 'Tooristoo', date: '2026-04-15' },
  { id: 'marrakech-riad-prix', city: 'Marrakech', category: 'riad', pillar: 'prix', image: 'https://images.openai.com/static-rsc-4/V81KkiE3INNzzn8nco1fdQnm4pndkDfQ92AO0sXyxF9VK0UQtBuFy5aB3UQi4j0F21KbP5KQNwrZEe0Vjbddxx5ZYxHGAirkL7vtU1e02_FdhO8Pf0YJB5sfCU3xvK_0PutslRM47kRXR75jqoCcaSWlk3L12QpsqyVkENRPrf8?purpose=inline', author: 'Tooristoo', date: '2026-04-10' },
  { id: 'marrakech-vigilance-guide', city: 'Marrakech', category: 'guide', pillar: 'vigilance', image: 'https://images.openai.com/static-rsc-4/wmKcmDhRAof0EeDq4T2Ubmmeyp-1GBP-5XU1T4eOhlXYK76_DxWlEQcU_N1MaipN_ZiqgVNPI3mEP61aXPqX8dOQAWewx-Hry0-df-0YAP2Ntwuiy3Mq18sv5uq4mtO-svo4PaCOOiKVPcVlXymHYoBqRnFZk53hvmpqPL6iVbnXXyrmqn6GnAoIWURbBFwp?purpose=fullsize', author: 'Tooristoo', date: '2026-04-05' },
  { id: 'marrakech-vigilance-shopping', city: 'Marrakech', category: 'shopping', pillar: 'vigilance', image: 'https://images.openai.com/static-rsc-4/ngtJL81qmIYRHDALlSkSOwTLnOdbSBAyIY7h-KOUlboDDFmVa8zhEBXt85IWA9x_JBRbdzIUjPvmmDnnAEEMKIX0VTsrQhSYJdy8SNU1HUjQRo1Z47sbHLzAqS7WIRZ4VXTQnUMuy1uhmv50-cxJJb2D_86-Sd3QBs5LuLTp6pzaXB1sm47ij_OORLRXHMC3?purpose=fullsize', author: 'Tooristoo', date: '2026-03-28' },
  { id: 'marrakech-preparation-complet', city: 'Marrakech', category: 'transport', pillar: 'preparation', image: 'https://images.openai.com/static-rsc-4/c96dP1W9_wEoGtley8QrQadGOcZHjeF88WnlZw6JNAyTVqDfBdSk5ndJi2kHDfqtErKThoOZQXEpOe3qYxtQvJnpAZrBdE0smFkwxkzfnbkfW9ydSYHYsgXwVftwCLd4kSgxyk6XSXOSpdoOYXwyP8p3uE3bZbq8bTvg653tntXarSK05GJaUMUx5xsI6hQa?purpose=fullsize', author: 'Tooristoo', date: '2026-04-01' },
  { id: 'marrakech-preparation-saisonnier', city: 'Marrakech', category: 'excursion', pillar: 'preparation', image: 'https://images.openai.com/static-rsc-4/c96dP1W9_wEoGtley8QrQadGOcZHjeF88WnlZw6JNAyTVqDfBdSk5ndJi2kHDfqtErKThoOZQXEpOe3qYxtQvJnpAZrBdE0smFkwxkzfnbkfW9ydSYHYsgXwVftwCLd4kSgxyk6XSXOSpdoOYXwyP8p3uE3bZbq8bTvg653tntXarSK05GJaUMUx5xsI6hQa?purpose=fullsize', author: 'Tooristoo', date: '2026-03-20' },
  { id: 'fes-restaurant-prix', city: 'Fès', category: 'restaurant', pillar: 'prix', image: 'https://images.openai.com/static-rsc-4/Tr8d33BCIqGq_B8fmbBT2QC0TYBCYaw2NfUHkhQhSDgEDqjpGHh8CIbJ6odI6mHNUDVvX9RwF4kNZzBEqnpSKE5N0U_CG_WR1_zHvWJ3D5LGw-PNpG5Dh4o-wXy0wqy6xOPYmXrvzGYlyO5lY1QgOM7bdqJ8-6SBvt90xE_c5i_Ky4u-I8_OJHOOYP-L9YB4?purpose=fullsize', author: 'Tooristoo', date: '2026-04-12' },
  { id: 'fes-guide-prix', city: 'Fès', category: 'guide', pillar: 'prix', image: 'https://images.openai.com/static-rsc-4/ikxtDiPoqzTe1I-XDO9F-CnsDtiSx9a9SQCbEpZBf-_MWzEswAQsv-_o829d6l6WsuESEhaLGLwMA8l-04o8q_sNiaRn00IiSaSZQ7ZEF8SD_pOf_faypsO3NCHVk9-1HnOHgH69rh1Lmpv5QIxOaL4WNeSnoosTfyvtcgwNsZDzlaiW7zjqzkVa8Y_N-xzD?purpose=fullsize', author: 'Tooristoo', date: '2026-04-08' },
  { id: 'chefchaouen-riad-prix', city: 'Chefchaouen', category: 'riad', pillar: 'prix', image: 'https://images.openai.com/static-rsc-4/ew86bFbiXZpBAluKNgQNgLyigDa65m_TS2zSnftIDdyT_LX87BWeVUeVOCJZbBwWNGvktCHLSpyilxIqqheKVgVuuPsuh_wMrO3WobMtRwuY_Gwzc-ZGWn-wLQBKO1tJnb7vRCFazQdrIJpwQWTZK_PlKe9IkNXB5sfPkPnvuN0?purpose=inline', author: 'Tooristoo', date: '2026-04-06' },
  { id: 'marrakech-top10-vigilances', city: 'Marrakech', category: 'guide', pillar: 'vigilance', image: 'https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?w=800&q=80', author: 'Tooristoo', date: '2026-04-20' },
  { id: 'marrakech-negocier-souk', city: 'Marrakech', category: 'shopping', pillar: 'negociation', image: 'https://images.unsplash.com/photo-1548199569-8e8a91d17441?w=800&q=80', author: 'Tooristoo', date: '2026-04-18' },
  { id: 'casablanca-taxi-aeroport', city: 'Casablanca', category: 'taxi', pillar: 'prix', image: 'https://images.unsplash.com/photo-1577086664693-894d8405334a?w=800&q=80', author: 'Tooristoo', date: '2026-04-16' },
  { id: 'fes-riad-vs-hotel', city: 'Fès', category: 'riad', pillar: 'prix', image: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=800&q=80', author: 'Tooristoo', date: '2026-04-14' },
  { id: 'maroc-ramadan-voyage', city: 'Marrakech', category: 'excursion', pillar: 'preparation', image: 'https://images.unsplash.com/photo-1547489432-cf93fa6c71ee?w=800&q=80', author: 'Tooristoo', date: '2026-04-12' },
  { id: 'merzouga-excursion-prix', city: 'Merzouga', category: 'excursion', pillar: 'prix', image: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800&q=80', author: 'Tooristoo', date: '2026-04-10' },
  { id: 'agadir-vigilance-plage', city: 'Agadir', category: 'shopping', pillar: 'vigilance', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80', author: 'Tooristoo', date: '2026-04-08' },
  { id: 'maroc-hammam-prix', city: 'Marrakech', category: 'spa', pillar: 'prix', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80', author: 'Tooristoo', date: '2026-04-06' },
  { id: 'marrakech-si-vigilance', city: 'Marrakech', category: 'guide', pillar: 'vigilance', image: 'https://images.unsplash.com/photo-1523978591478-c753949ff840?w=800&q=80', author: 'Tooristoo', date: '2026-04-04' },
  { id: 'tanger-vigilance-port', city: 'Tanger', category: 'transport', pillar: 'vigilance', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80', author: 'Tooristoo', date: '2026-04-02' },
  { id: 'maroc-haute-saison-prix', city: 'Marrakech', category: 'riad', pillar: 'preparation', image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80', author: 'Tooristoo', date: '2026-03-30' },
  { id: 'chefchaouen-vigilance-photo', city: 'Chefchaouen', category: 'shopping', pillar: 'vigilance', image: 'https://images.openai.com/static-rsc-4/K4l5bKHxFCYT9hQsy4371M3rctO9xc7AEGZxwzQnZz3xQ48jAYT9DcF4hf2Fpzimx9pmqjx1dJ31Ijy80Rd-JCvIQXbpgT6UKcWfHWpRLIJeoamJI7XU2WiGqq59oF14itIAujULXxkl7jlQSfCWVPCE7cAUcBsKPjbTjzNgS87jtK50m2y6JnK9LTAKgVL8?purpose=fullsize', author: 'Tooristoo', date: '2026-03-25' }
];

export function getBlogArticles(lang = 'fr') {
  return BLOG_ARTICLES_BASE.map(article => {
    const trans = BLOG_ARTICLES_TRANSLATIONS[article.id]?.[lang];
    if (!trans) return null;
    return {
      ...article,
      title: trans.title,
      excerpt: trans.excerpt,
      content: trans.content,
      lang
    };
  }).filter(Boolean);
}

export const BLOG_ARTICLES = getBlogArticles('fr');

export const PILLARS = [
  { key: 'prix', label: 'Guide de prix réels', icon: '💰' },
  { key: 'vigilance', label: 'Vigilance & protection', icon: '⚠️' },
  { key: 'preparation', label: 'Préparation de voyage', icon: '✈️' },
  { key: 'negociation', label: 'Techniques de négociation', icon: '🤝' }
];

export const CATEGORIES = [
  { key: 'taxi', label: 'Taxis' },
  { key: 'riad', label: 'Riads & Hôtels' },
  { key: 'restaurant', label: 'Restaurants' },
  { key: 'guide', label: 'Guides' },
  { key: 'shopping', label: 'Shopping' },
  { key: 'excursion', label: 'Excursions' },
  { key: 'spa', label: 'Spa & Bien-être' },
  { key: 'transport', label: 'Transport' }
];

export const CITIES = ['Marrakech', 'Fès', 'Chefchaouen', 'Casablanca', 'Agadir', 'Tanger', 'Rabat', 'Meknès', 'Ouarzazate', 'Merzouga', 'Dakhla', 'El Jadida', 'Essaouira'];

export function getArticleById(id, lang = 'fr') {
  const articles = getBlogArticles(lang);
  return articles.find(a => a.id === id);
}

export function getArticlesByFilters(pillar = null, city = null, category = null, lang = 'fr') {
  const articles = getBlogArticles(lang);
  return articles.filter(article => {
    const pillarMatch = !pillar || article.pillar === pillar;
    const cityMatch = !city || article.city === city;
    const categoryMatch = !category || article.category === category;
    return pillarMatch && cityMatch && categoryMatch;
  });
}