import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { Brand } from './Brand';
import { navigation } from '../data/SiteData';

/** Accessible mobile menu that automatically closes on navigation or Escape. */
export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);
  useEffect(() => {
    const onEscape = (event: KeyboardEvent) => { if (event.key === 'Escape') setMenuOpen(false); };
    window.addEventListener('keydown', onEscape);
    return () => window.removeEventListener('keydown', onEscape);
  }, []);

  return (
    <header className="siteHeader">
      <div className="container headerInner">
        <Brand />
        <nav id="mainNavigation" className={`headerNavigation ${menuOpen ? 'headerNavigationOpen' : ''}`} aria-label="Navegación principal">
          {navigation.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.to === '/'} className={({ isActive }) => `navigationLink ${isActive ? 'navigationLinkActive' : ''}`}>
              {item.label}
            </NavLink>
          ))}
          <NavLink className="button buttonAccent mobileBooking" to="/contacto">Reservar consulta <ArrowUpRight size={16} /></NavLink>
        </nav>
        <NavLink className="button buttonAccent desktopBooking" to="/contacto">Reservar consulta <ArrowUpRight size={16} /></NavLink>
        <button className="menuToggle" type="button" aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={menuOpen} aria-controls="mainNavigation" onClick={() => setMenuOpen((value) => !value)}>
          {menuOpen ? <X size={25} /> : <Menu size={25} />}
        </button>
      </div>
    </header>
  );
}
