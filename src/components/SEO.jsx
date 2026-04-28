import { Helmet } from 'react-helmet-async';
import { getSEOData } from '../lib/seo-data';

export default function SEO({ path, lang }) {
  const seoData = getSEOData(path, lang);
  
  if (!seoData) return null;

  const baseUrl = 'https://negoshield-ai.com';
  const fullUrl = `${baseUrl}${path}`;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{seoData.title}</title>
      <meta name="title" content={seoData.title} />
      <meta name="description" content={seoData.description} />
      <meta name="keywords" content={seoData.keywords} />
      <meta name="language" content={lang} />
      
      {/* Open Graph Meta Tags */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={seoData.title} />
      <meta property="og:description" content={seoData.description} />
      <meta property="og:image" content={`${baseUrl}/og-image.png`} />
      <meta property="og:site_name" content="NegoShield AI" />
      
      {/* Twitter Meta Tags */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={fullUrl} />
      <meta property="twitter:title" content={seoData.title} />
      <meta property="twitter:description" content={seoData.description} />
      <meta property="twitter:image" content={`${baseUrl}/og-image.png`} />
      
      {/* Additional Meta Tags */}
      <meta name="author" content="NegoShield AI" />
      <meta name="copyright" content="NegoShield AI © 2026" />
      <link rel="canonical" href={fullUrl} />
      
      {/* Hreflang for multilingual */}
      <link rel="alternate" hrefLang="fr" href={`${baseUrl}${path}?lang=fr`} />
      <link rel="alternate" hrefLang="en" href={`${baseUrl}${path}?lang=en`} />
      <link rel="alternate" hrefLang="es" href={`${baseUrl}${path}?lang=es`} />
      <link rel="alternate" hrefLang="de" href={`${baseUrl}${path}?lang=de`} />
      <link rel="alternate" hrefLang="ar" href={`${baseUrl}${path}?lang=ar`} />
    </Helmet>
  );
}