import { ArtworkGrid } from '../components/ArtworkGrid';
import { PageHero } from '../components/PageHero';
import { SectionHeading } from '../components/SectionHeading';
import { usePageMeta } from '../utils/UsePageMeta';

export function GalleryPage() {
  usePageMeta('Galería', 'Explorá trabajos conceptuales de tatuaje en distintos estilos: blackwork, fineline, ornamental y realismo.');
  return <><PageHero eyebrow="PORTFOLIO" title={<>Arte sobre <em>la piel.</em></>} description="Cada línea tiene un porqué. Explorá nuestros trabajos de demostración y filtrá por el estilo que más te inspire." number="04" />
    <section className="sectionPad galleryPageSection"><div className="container"><SectionHeading kicker="TRABAJOS SELECCIONADOS" title={<>Una historia en <em>cada trazo.</em></>} /><ArtworkGrid /><p className="galleryDisclaimer">Imágenes generadas para un proyecto conceptual. No representan tatuajes realizados por un estudio existente.</p></div></section>
  </>;
}
