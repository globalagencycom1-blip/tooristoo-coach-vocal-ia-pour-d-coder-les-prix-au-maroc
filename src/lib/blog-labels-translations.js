export const PILLAR_LABELS = {
  prix: {
    fr: 'Guide de prix réels',
    en: 'Real Price Guide',
    es: 'Guía de Precios Reales',
    de: 'Echter Preisleitfaden',
    ar: 'دليل الأسعار الحقيقية',
    darija: 'دليل الأسعار الحقيقية'
  },
  arnaque: {
    fr: 'Arnaques et protection',
    en: 'Scams & Protection',
    es: 'Estafas y Protección',
    de: 'Betrügereien und Schutz',
    ar: 'الاحتيالات والحماية',
    darija: 'الحيل والحماية'
  },
  preparation: {
    fr: 'Préparation de voyage',
    en: 'Travel Preparation',
    es: 'Preparación de Viaje',
    de: 'Reisevorbereitung',
    ar: 'تحضير السفر',
    darija: 'التحضير للسفر'
  }
};

export const CATEGORY_LABELS = {
  taxi: {
    fr: 'Taxis',
    en: 'Taxis',
    es: 'Taxis',
    de: 'Taxis',
    ar: 'سيارات الأجرة',
    darija: 'التاكسيات'
  },
  riad: {
    fr: 'Riads & Hôtels',
    en: 'Riads & Hotels',
    es: 'Riads y Hoteles',
    de: 'Riads & Hotels',
    ar: 'الدور والفنادق',
    darija: 'الدور والفنادق'
  },
  restaurant: {
    fr: 'Restaurants',
    en: 'Restaurants',
    es: 'Restaurantes',
    de: 'Restaurants',
    ar: 'المطاعم',
    darija: 'المطاعم'
  },
  guide: {
    fr: 'Guides',
    en: 'Guides',
    es: 'Guías',
    de: 'Reiseführer',
    ar: 'الأدلة',
    darija: 'الموجهين'
  },
  shopping: {
    fr: 'Shopping',
    en: 'Shopping',
    es: 'Compras',
    de: 'Einkaufen',
    ar: 'التسوق',
    darija: 'الشراء'
  },
  excursion: {
    fr: 'Excursions',
    en: 'Excursions',
    es: 'Excursiones',
    de: 'Ausflüge',
    ar: 'الرحلات',
    darija: 'الرحلات'
  },
  spa: {
    fr: 'Spa & Bien-être',
    en: 'Spa & Wellness',
    es: 'Spa y Bienestar',
    de: 'Spa & Wellness',
    ar: 'سبا والعافية',
    darija: 'السبا والراحة'
  },
  transport: {
    fr: 'Transport',
    en: 'Transport',
    es: 'Transporte',
    de: 'Verkehr',
    ar: 'النقل',
    darija: 'النقل'
  }
};

export const CITY_LABELS = {
  'Marrakech': {
    fr: 'Marrakech',
    en: 'Marrakech',
    es: 'Marrakech',
    de: 'Marrakesch',
    ar: 'مراكش',
    darija: 'مراكش'
  },
  'Fès': {
    fr: 'Fès',
    en: 'Fes',
    es: 'Fez',
    de: 'Fes',
    ar: 'فاس',
    darija: 'فاس'
  },
  'Chefchaouen': {
    fr: 'Chefchaouen',
    en: 'Chefchaouen',
    es: 'Chefchaouen',
    de: 'Chefchaouen',
    ar: 'شفشاون',
    darija: 'شفشاون'
  },
  'Casablanca': {
    fr: 'Casablanca',
    en: 'Casablanca',
    es: 'Casablanca',
    de: 'Casablanca',
    ar: 'الدار البيضاء',
    darija: 'الدار البيضاء'
  },
  'Agadir': {
    fr: 'Agadir',
    en: 'Agadir',
    es: 'Agadir',
    de: 'Agadir',
    ar: 'أكادير',
    darija: 'أكادير'
  },
  'Tanger': {
    fr: 'Tanger',
    en: 'Tangier',
    es: 'Tánger',
    de: 'Tanger',
    ar: 'طنجة',
    darija: 'طنجة'
  }
};

export function getPillarLabel(key, lang = 'fr') {
  return PILLAR_LABELS[key]?.[lang] || PILLAR_LABELS[key]?.['fr'] || key;
}

export function getCategoryLabel(key, lang = 'fr') {
  return CATEGORY_LABELS[key]?.[lang] || CATEGORY_LABELS[key]?.['fr'] || key;
}

export function getCityLabel(city, lang = 'fr') {
  return CITY_LABELS[city]?.[lang] || CITY_LABELS[city]?.['fr'] || city;
}