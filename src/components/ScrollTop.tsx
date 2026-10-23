import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Resets the document scroll position whenever the URL pathname changes.
 * The effect does not return the result of window.scrollTo(), as React effects
 * may only return a cleanup function (or nothing).
 */
export function ScrollTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [pathname]);

  return null;
}
