import { Link } from 'react-router-dom';

/** Reusable wordmark and custom compass-star symbol: no third-party logo assets. */
export function Brand({ light = false }: { light?: boolean }) {
  return (
    <Link className={`brand ${light ? 'brandLight' : ''}`} to="/" aria-label="UMBRAL, volver al inicio">
      <span className="brandMark" aria-hidden="true">✳</span>
      <span className="brandText"><strong>UMBRAL</strong><small>TATTOO ATELIER</small></span>
    </Link>
  );
}
