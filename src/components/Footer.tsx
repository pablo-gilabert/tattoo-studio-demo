import { ArrowRight, ArrowUpRight, Instagram, Mail, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Brand } from './Brand';
import { navigation, studio } from '../data/SiteData';

/** Contact links and a clear disclaimer prevent visitors from mistaking the demo for a real business. */
export function Footer() {
  return (
    <footer className="siteFooter">
      <div className="container footerTop">
        <div className="footerIntro">
          <span className="eyebrow">EL PRÓXIMO CAPÍTULO</span>
          <h2>¿Tenés una idea <em>en mente?</em></h2>
          <Link to="/contacto" className="textLink textLinkLight">Hablemos de tu próximo tatuaje <ArrowRight size={21} /></Link>
        </div>
        <span className="footerStar" aria-hidden="true">✳</span>
      </div>
      <div className="container footerColumns">
        <div><Brand light /><p className="footerDescription">Un espacio dedicado al arte en la piel, a las ideas propias y a las historias que merecen quedarse.</p></div>
        <div><h3>Explorá</h3><nav aria-label="Enlaces del pie de página">{navigation.map((item) => <Link key={item.to} to={item.to}>{item.label}</Link>)}</nav></div>
        <div><h3>Encontranos</h3><p><MapPin size={16} /> {studio.address}</p><p><Mail size={16} /> {studio.email}</p><p>{studio.schedule}</p><span className="footerSocial"><Instagram size={17} /> {studio.instagramLabel} <ArrowUpRight size={14} /></span></div>
      </div>
      <div className="container footerBottom"><small>© {new Date().getFullYear()} UMBRAL Tattoo Atelier · Todos los derechos reservados.</small><small>Proyecto de portfolio. Marca, testimonios, artistas y datos de contacto ficticios.</small></div>
    </footer>
  );
}
