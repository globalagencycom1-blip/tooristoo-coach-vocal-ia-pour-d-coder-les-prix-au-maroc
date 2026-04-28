import { BLOG_ARTICLES_TRANSLATIONS } from './blog-translations';

export const BLOG_ARTICLES_BASE = [
  { id: 'marrakech-taxi-prix', city: 'Marrakech', category: 'taxi', pillar: 'prix', image: 'https://images.unsplash.com/photo-1464219414925-bed2e64f6df2?w=800&h=400&fit=crop', author: 'NegoShield AI', date: '2026-04-15' },
  { id: 'marrakech-riad-prix', city: 'Marrakech', category: 'riad', pillar: 'prix', image: 'https://images.unsplash.com/photo-1564540576632-4f46ffcd1c3e?w=800&h=400&fit=crop', author: 'NegoShield AI', date: '2026-04-10' },
  { id: 'marrakech-arnaque-guide', city: 'Marrakech', category: 'guide', pillar: 'arnaque', image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&h=400&fit=crop', author: 'NegoShield AI', date: '2026-04-05' },
  { id: 'marrakech-arnaque-shopping', city: 'Marrakech', category: 'shopping', pillar: 'arnaque', image: 'https://images.unsplash.com/photo-1555939594-58d7cb561140?w=800&h=400&fit=crop', author: 'NegoShield AI', date: '2026-03-28' },
  { id: 'marrakech-preparation-complet', city: 'Marrakech', category: 'transport', pillar: 'preparation', image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=400&fit=crop', author: 'NegoShield AI', date: '2026-04-01' },
  { id: 'marrakech-preparation-saisonnier', city: 'Marrakech', category: 'excursion', pillar: 'preparation', image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&h=400&fit=crop', author: 'NegoShield AI', date: '2026-03-20' },
  { id: 'fes-restaurant-prix', city: 'Fès', category: 'restaurant', pillar: 'prix', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=400&fit=crop', author: 'NegoShield AI', date: '2026-04-12' },
  { id: 'fes-guide-prix', city: 'Fès', category: 'guide', pillar: 'prix', image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&h=400&fit=crop', author: 'NegoShield AI', date: '2026-04-08' },
  { id: 'chefchaouen-riad-prix', city: 'Chefchaouen', category: 'riad', pillar: 'prix', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop', author: 'NegoShield AI', date: '2026-04-06' },
  { id: 'chefchaouen-arnaque-photo', city: 'Chefchaouen', category: 'shopping', pillar: 'arnaque', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop', author: 'NegoShield AI', date: '2026-03-25' }
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
  { key: 'arnaque', label: 'Arnaques et protection', icon: '⚠️' },
  { key: 'preparation', label: 'Préparation de voyage', icon: '✈️' }
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