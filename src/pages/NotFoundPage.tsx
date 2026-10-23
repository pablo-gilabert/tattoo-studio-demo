import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { usePageMeta } from '../utils/UsePageMeta';

export function NotFoundPage() {
  usePageMeta('Página no encontrada', 'La página que intentaste visitar no existe.');
  return <section className="notFound"><span className="eyebrow"><span className="eyebrowLine" />ERROR 404</span><h1>Este camino no deja <em>huella.</em></h1><p>No encontramos la página que buscás.</p><Link to="/" className="button buttonAccent"><ArrowLeft size={18} /> Volver al inicio</Link></section>;
}
