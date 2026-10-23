import { ArrowDown, ArrowRight, ArrowUpRight, Asterisk, Flower2, ShieldCheck, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SectionHeading } from '../components/SectionHeading';
import { ArtworkGrid } from '../components/ArtworkGrid';
import { ArtistCards } from '../components/ArtistCards';
import { services, testimonials } from '../data/SiteData';
import { usePageMeta } from '../utils/UsePageMeta';

export function HomePage() {
  usePageMeta('Inicio', 'UMBRAL: un estudio de tatuajes conceptual, artistas y diseños personalizados en Buenos Aires.');
  return <>
    {/* The large photographic hero uses a CSS gradient rather than an overlaid screenshot. */}
    <section className="homeHero">
      <div className="heroBackdrop" />
      <div className="container heroContent"><div className="heroCopy">
        <span className="eyebrow eyebrowLight"><span className="eyebrowLine" />TATTOO ATELIER · BUENOS AIRES</span>
        <h1>Donde las<br />ideas se vuelven <em>eternas.</em></h1>
        <p>No hacemos tatuajes en serie. Creamos piezas que hablan de quién sos, lo que sentís y lo que elegís llevar con vos.</p>
        <div className="heroActions"><Link className="button buttonAccent" to="/contacto">Hablemos de tu idea <ArrowUpRight size={18} /></Link><Link className="button buttonOutlineLight" to="/galeria">Explorar trabajos <ArrowRight size={18} /></Link></div>
      </div><a className="scrollCue" href="#introduccion"><span>DESLIZÁ PARA DESCUBRIR</span><ArrowDown size={19} /></a></div>
      <span className="heroVertical" aria-hidden="true">EST. MMXXIV · MADE TO LAST</span>
      <div className="heroCounter"><b>01</b><span>/</span>06</div>
    </section>

    {/* Distinct value propositions make the template useful for real client pitches. */}
    <section className="benefitsStrip"><div className="container benefitGrid">
      <div><Asterisk size={25} /><span>Arte auténtico</span></div><div><Sparkles size={25} /><span>Diseños originales</span></div><div><ShieldCheck size={25} /><span>Espacio cuidado</span></div><div><Flower2 size={25} /><span>Historias personales</span></div>
    </div></section>

    <section id="introduccion" className="sectionPad introductionSection"><div className="container introductionGrid">
      <div className="introductionImage"><img src="/images/studio.webp" alt="Interior cálido del estudio de tatuajes ficticio" loading="lazy" /><span className="imageCornerLabel">UMBRAL · EL ATELIER</span></div>
      <div className="introductionCopy"><span className="oversizedNumber" aria-hidden="true">01</span><SectionHeading kicker="LA ESENCIA" title={<>Más que tinta,<br /><em>una forma de arte.</em></>} subtitle="Creemos que un tatuaje no es solamente una imagen. Es una experiencia, una memoria y una parte de tu identidad." />
        <p>En UMBRAL combinamos distintas técnicas, conversaciones sin apuro y una mirada artística para encontrar el lenguaje visual de cada persona.</p>
        <Link className="textLink" to="/estudio">Conocé nuestro espacio <ArrowUpRight size={20} /></Link>
      </div>
    </div></section>

    <section className="sectionPad inkSection"><div className="container"><div className="sectionTitleRow"><SectionHeading kicker="EL OFICIO" title={<>Cada trazo tiene<br /><em>una intención.</em></>} subtitle="Desde una pieza pequeña hasta un proyecto de gran formato, acompañamos cada etapa de tu idea." /><Link className="textLink textLinkLight" to="/servicios">Todos los servicios <ArrowUpRight size={20} /></Link></div>
      <div className="servicePreviewGrid">{services.slice(0, 3).map((service) => <Link to="/servicios" key={service.number} className="servicePreview"><small>{service.number} / 04</small><div><h3>{service.name}</h3><p>{service.summary}</p></div><span className="servicePreviewArrow"><ArrowUpRight size={21} /></span></Link>)}</div>
    </div></section>

    <section className="sectionPad gallerySection"><div className="container"><div className="sectionTitleRow"><SectionHeading kicker="NUESTRO TRABAJO" title={<>Pieles que cuentan<br /><em>historias.</em></>} subtitle="Una selección de ideas que se convirtieron en arte. Cada trabajo es distinto, porque cada historia también lo es." /><Link className="textLink" to="/galeria">Ver galería completa <ArrowUpRight size={20} /></Link></div><ArtworkGrid compact /></div></section>

    <section className="sectionPad artistsSection"><div className="container"><div className="sectionTitleRow"><SectionHeading kicker="LAS PERSONAS DETRÁS DEL ARTE" title={<>Manos distintas.<br /><em>Una misma pasión.</em></>} subtitle="Un equipo con estilos propios, criterios compartidos y ganas de crear algo que te represente." /><Link className="textLink textLinkLight" to="/artistas">Conocé al equipo <ArrowUpRight size={20} /></Link></div><ArtistCards /></div></section>

    <section className="sectionPad quoteSection"><div className="container"><span className="eyebrow"><span className="eyebrowLine" />VOCES QUE DEJAN HUELLA</span><div className="quoteGrid">{testimonials.map((item) => <figure key={item.name} className="quoteCard"><span className="quoteSymbol">“</span><blockquote>{item.text}</blockquote><figcaption><strong>{item.name}</strong><small>{item.work} · Testimonio ficticio</small></figcaption></figure>)}</div></div></section>

    <section className="endCta"><div className="container endCtaContent"><span className="eyebrow eyebrowLight"><span className="eyebrowLine" />EL PRIMER PASO</span><h2>Tu próxima historia<br /><em>empieza acá.</em></h2><p>Traé tus ideas, tus referencias o simplemente una intuición. Lo demás lo construimos juntos.</p><Link to="/contacto" className="button buttonAccent">Quiero hacer una consulta <ArrowUpRight size={18} /></Link></div></section>
  </>;
}
