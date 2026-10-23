import { ArrowUpRight, HeartHandshake, Leaf, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageHero } from '../components/PageHero';
import { SectionHeading } from '../components/SectionHeading';
import { usePageMeta } from '../utils/UsePageMeta';

export function StudioPage() {
  usePageMeta('El estudio', 'Conocé UMBRAL: un atelier de tatuajes conceptual creado para celebrar la expresión individual.');
  return <>
    <PageHero eyebrow="EL ESTUDIO" title={<>Un lugar para <em>crear.</em></>} description="Un espacio donde las ideas se escuchan, los detalles importan y el arte encuentra su lugar en la piel." number="02" />
    <section className="studioBanner"><img src="/images/studio.webp" alt="Interior del atelier y sus estaciones de trabajo" /></section>
    <section className="sectionPad"><div className="container storyGrid"><div><SectionHeading kicker="NUESTRA HISTORIA" title={<>El arte comienza<br /><em>escuchando.</em></>} /></div><div className="storyText"><p>UMBRAL nace como una idea simple: imaginar un estudio donde cada persona encuentre el tiempo, el acompañamiento y la sensibilidad que su proyecto merece.</p><p>No trabajamos con fórmulas. Nos inspira conversar, investigar técnicas, crear bocetos y convertir pequeñas intuiciones en piezas personales.</p><p>Este sitio es una demostración de portfolio: el espacio, la historia y todo el equipo son ficticios.</p></div></div></section>
    <section className="sectionPad valuesSection"><div className="container"><SectionHeading kicker="NUESTRA FORMA DE TRABAJAR" title={<>Tres cosas que <em>nos definen.</em></>} /><div className="valueGrid"><article><HeartHandshake size={34} strokeWidth={1.4} /><span>01</span><h3>Escuchar primero</h3><p>Entender tu idea, las referencias y lo que te gustaría expresar antes de dibujar.</p></article><article><Leaf size={34} strokeWidth={1.4} /><span>02</span><h3>Diseñar con intención</h3><p>Elegir cada línea, contraste y proporción para lograr una pieza con identidad propia.</p></article><article><ShieldCheck size={34} strokeWidth={1.4} /><span>03</span><h3>Cuidar cada detalle</h3><p>Trabajar con criterios de higiene, comunicación clara y atención en cada etapa.</p></article></div></div></section>
    <section className="sectionPad"><div className="container studioCollage"><img src="/images/atelier.webp" alt="Detalle de los ambientes del atelier" loading="lazy" /><div><span className="eyebrow"><span className="eyebrowLine" />UNA EXPERIENCIA PERSONAL</span><h2>Un espacio pensado para <em>sentirte vos.</em></h2><p>La música, la iluminación, la charla y el tiempo forman parte de la experiencia. Cada encuentro es una oportunidad para hacer algo que dure.</p><Link to="/contacto" className="textLink">Hablemos de tu tatuaje <ArrowUpRight size={20} /></Link></div></div></section>
  </>;
}
