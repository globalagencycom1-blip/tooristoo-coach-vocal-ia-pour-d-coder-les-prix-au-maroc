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
};

/**
 * - Redirects uppercase URLs to lowercase (e.g. /About → /about)
 * - Redirects French alias paths to canonical English paths (e.g. /prestataires → /providers)
 */
export default function CanonicalRedirect() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const lower = location.pathname.toLowerCase();
    const canonical = REDIRECTS[lower] || lower;
    if (canonical !== location.pathname) {
      navigate(canonical + location.search + location.hash, { replace: true });
    }
  }, [location.pathname]);

  return null;
}