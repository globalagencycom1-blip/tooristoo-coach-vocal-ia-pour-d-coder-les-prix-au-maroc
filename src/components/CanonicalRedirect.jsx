import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

/**
 * Redirects any URL with uppercase letters to its lowercase equivalent.
 * This prevents duplicate content issues for Google (e.g. /About → /about).
 */
export default function CanonicalRedirect() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const lower = location.pathname.toLowerCase();
    if (lower !== location.pathname) {
      navigate(lower + location.search + location.hash, { replace: true });
    }
  }, [location.pathname]);

  return null;
}