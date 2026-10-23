import { Route, Routes } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ScrollTop } from './components/ScrollTop';
import { HomePage } from './pages/HomePage';
import { StudioPage } from './pages/StudioPage';
import { ArtistsPage } from './pages/ArtistsPage';
import { GalleryPage } from './pages/GalleryPage';
import { ServicesPage } from './pages/ServicesPage';
import { ContactPage } from './pages/ContactPage';
import { NotFoundPage } from './pages/NotFoundPage';

/** App shell is shared across all six React Router routes. */
export function App() {
  return <><ScrollTop /><Header /><main id="mainContent"><Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/estudio" element={<StudioPage />} />
    <Route path="/artistas" element={<ArtistsPage />} />
    <Route path="/galeria" element={<GalleryPage />} />
    <Route path="/servicios" element={<ServicesPage />} />
    <Route path="/contacto" element={<ContactPage />} />
    <Route path="*" element={<NotFoundPage />} />
  </Routes></main><Footer /></>;
}
