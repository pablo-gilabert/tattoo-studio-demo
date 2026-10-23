import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, Maximize2, X } from 'lucide-react';
import { artworks, type Artwork } from '../data/SiteData';

const categories = ['Todos', 'Blackwork', 'Fineline', 'Ornamental', 'Realismo'] as const;

/** Gallery filters and lightbox use local React state; no external plugin needed. */
export function ArtworkGrid({ compact = false }: { compact?: boolean }) {
  const [category, setCategory] = useState<(typeof categories)[number]>('Todos');
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const items = (category === 'Todos' ? artworks : artworks.filter((artwork) => artwork.category === category)).slice(0, compact ? 6 : undefined);
  const selected: Artwork | undefined = activeIndex === null ? undefined : items[activeIndex];

  // Escape closes the lightbox. Left/right keys work without on-screen arrow controls.
  useEffect(() => {
    if (activeIndex === null) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActiveIndex(null);
      if (event.key === 'ArrowRight') setActiveIndex((current) => current === null ? null : (current + 1) % items.length);
      if (event.key === 'ArrowLeft') setActiveIndex((current) => current === null ? null : (current - 1 + items.length) % items.length);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    return () => { document.body.style.overflow = previousOverflow; window.removeEventListener('keydown', onKeyDown); };
  }, [activeIndex, items.length]);

  const changeCategory = (nextCategory: (typeof categories)[number]) => {
    setCategory(nextCategory);
    setActiveIndex(null);
  };

  return <>
    <div className="filterBar" aria-label="Filtrar trabajos por estilo">{categories.map((item) => (
      <button type="button" key={item} className={`filterButton ${category === item ? 'filterButtonActive' : ''}`} aria-pressed={category === item} onClick={() => changeCategory(item)}>{item}</button>
    ))}</div>
    <div className="artworkGrid">{items.map((artwork, index) => (
      <button type="button" key={artwork.id} className="artworkCard" onClick={() => setActiveIndex(index)} aria-label={`Ampliar ${artwork.title}`}>
        <img src={artwork.image} alt={artwork.alt} loading="lazy" />
        <span className="artworkOverlay"><span><small>{artwork.category}</small><strong>{artwork.title}</strong></span><Maximize2 size={20} /></span>
      </button>
    ))}</div>
    {selected && <div className="lightboxBackdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setActiveIndex(null); }}>
      <div className="lightboxDialog" role="dialog" aria-modal="true" aria-label={`Detalle de ${selected.title}`}>
        <button type="button" className="lightboxClose" aria-label="Cerrar imagen" onClick={() => setActiveIndex(null)}><X size={24} /></button>
        <img src={selected.image} alt={selected.alt} />
        <div className="lightboxDetails"><span><small>{selected.category} · {String((activeIndex ?? 0) + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}</small><strong>{selected.title}</strong></span><div className="lightboxArrows">
          <button type="button" aria-label="Imagen anterior" onClick={() => setActiveIndex((activeIndex! - 1 + items.length) % items.length)}><ArrowLeft size={19} /></button>
          <button type="button" aria-label="Imagen siguiente" onClick={() => setActiveIndex((activeIndex! + 1) % items.length)}><ArrowRight size={19} /></button>
        </div></div>
      </div>
    </div>}
  </>;
}
