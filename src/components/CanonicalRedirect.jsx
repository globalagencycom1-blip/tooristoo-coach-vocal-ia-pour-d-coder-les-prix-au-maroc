import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// Maps legacy/duplicate paths to their canonical English equivalent
const REDIRECTS = {
  '/prestataires': '/providers',
  '/alertes': '/alerts',
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