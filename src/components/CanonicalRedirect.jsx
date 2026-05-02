import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// Maps legacy/duplicate paths to their canonical lowercase/English equivalent
// Applied AFTER lowercasing, so keys must be lowercase
const REDIRECTS = {
  // French aliases
  '/prestataires': '/providers',
  '/alertes': '/alerts',
  '/apropos': '/about',
  '/a-propos': '/about',
  '/tarifs': '/#pricing',
  '/prix': '/#pricing',
  // English aliases
  '/home': '/',
  '/negotiate': '/app',
  '/coach': '/app',
  '/phrasebook': '/darija',
  // Ghost / phantom routes — redirect to home
  '/landing': '/',
  // Trailing slash normalization (except root)
  '/providers/': '/providers',
  '/alerts/': '/alerts',
  '/about/': '/about',
  '/faq/': '/faq',
  '/blog/': '/blog',
  '/darija/': '/darija',
  '/charter/': '/charter',
  '/app/': '/app',
  '/contact/': '/contact',
  '/privacy/': '/privacy',
  '/terms/': '/terms',
  '/legal/': '/legal',
  '/profile/': '/profile',
  '/admin/providers/': '/admin/providers',
  // Major route duplicates (case-insensitive, so these run after toLowerCase)
  // If the router somehow serves /About, /Providers, etc., redirect to lowercase
  // This handles any case inconsistency from hyperlinks or manual URLs
};

/**
 * - Redirects uppercase URLs to lowercase (e.g. /About → /about)
 * - Redirects French alias paths to canonical English paths (e.g. /prestataires → /providers)
 * - Removes trailing slashes (except root)
 */
export default function CanonicalRedirect() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    let path = location.pathname;
    
    // Remove trailing slash (except for root)
    if (path !== '/' && path.endsWith('/')) {
      path = path.slice(0, -1);
    }
    
    // Convert to lowercase
    const lower = path.toLowerCase();
    
    // Apply redirects
    const canonical = REDIRECTS[lower] || lower;
    
    // Redirect if needed
    if (canonical !== location.pathname) {
      navigate(canonical + location.search + location.hash, { replace: true });
    }
  }, [location.pathname, navigate]);

  return null;
}