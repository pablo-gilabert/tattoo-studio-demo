import { useEffect } from 'react';

/** Update the browser title and description whenever the route changes. */
export function usePageMeta(title: string, description: string): void {
  useEffect(() => {
    document.title = `${title} | UMBRAL Tattoo Atelier`;
    const meta = document.querySelector('meta[name="description"]');
    meta?.setAttribute('content', description);
  }, [title, description]);
}
