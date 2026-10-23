import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ArtistCards } from '../components/ArtistCards';
import { PageHero } from '../components/PageHero';
import { SectionHeading } from '../components/SectionHeading';
import { artists } from '../data/SiteData';
import { usePageMeta } from '../utils/UsePageMeta';

export function ArtistsPage() {
  usePageMeta('Artistas', 'Conocé al equipo ficticio de UMBRAL y sus especialidades: blackwork, fineline y realismo.');
  return <><PageHero eyebrow="NUESTRO EQUIPO" title={<>Personas que <em>crean.</em></>} description="Tres miradas diferentes, un mismo compromiso con la creatividad y el detalle." number="03" />
    <section className="sectionPad"><div className="container"><SectionHeading kicker="CONOCÉ A LOS ARTISTAS" title={<>El talento toma <em>formas distintas.</em></>} subtitle="Explorá sus universos creativos y encontrá el estilo que más conecte con tu idea." /><ArtistCards /></div></section>
    <section className="sectionPad artistsBioSection"><div className="container"><SectionHeading kicker="DE CERCA" title={<>Cada artista, <em>una mirada.</em></>} /><div className="artistBioList">{artists.map((artist, index) => <article key={artist.name} className="artistBioRow"><span>0{index + 1}</span><div><h3>{artist.name}</h3><small>{artist.specialty}</small></div><p>{artist.description}</p><Link to="/contacto" aria-label={`Consultar por ${artist.name}`}><ArrowUpRight size={24} /></Link></article>)}</div></div></section>
  </>;
}
