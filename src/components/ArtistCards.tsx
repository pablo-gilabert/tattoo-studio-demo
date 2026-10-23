import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { artists } from '../data/SiteData';

/** Artists are data-driven and ready for a future CMS. Profiles are fictional. */
export function ArtistCards() {
  return <div className="artistGrid">{artists.map((artist, index) => (
    <article key={artist.name} className="artistCard">
      <div className="artistPhoto"><img src={artist.image} alt={`Portfolio visual de ${artist.name}, artista ficticio`} loading="lazy" style={{ objectPosition: artist.position ?? 'center' }} /><span className="artistIndex">0{index + 1}</span></div>
      <div className="artistCardInfo"><div><h3>{artist.name}</h3><p>{artist.specialty}</p></div><Link to="/contacto" aria-label={`Consultar por trabajos de ${artist.name}`} className="iconCircle"><ArrowUpRight size={20} /></Link></div>
    </article>
  ))}</div>;
}
