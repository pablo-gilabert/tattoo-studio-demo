import { Route, Routes } from "react-router-dom"

import { Header } from "./components/Header/Header"
import { Footer } from "./components/Footer/Footer"
import { ScrollTop } from "./components/ScrollTop/ScrollTop"
import { Home } from "./pages/Home/Home"
import { Studio } from "./pages/Studio/Studio"
import { Artists } from "./pages/Artists/Artists"
import { Gallery } from "./pages/Gallery/Gallery"
import { Services } from "./pages/Services/Services"
import { Contact } from "./pages/Contact/Contact"
import { NotFound } from "./pages/NotFound/NotFound"

// All pages share the same navigation, footer, locale, and theme state.
export function App() {
    return (
        <>
            <ScrollTop />
            <Header />

            <main id="main-content">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/estudio" element={<Studio />} />
                    <Route path="/artistas" element={<Artists />} />
                    <Route path="/galeria" element={<Gallery />} />
                    <Route path="/servicios" element={<Services />} />
                    <Route path="/contacto" element={<Contact />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </main>

            <Footer />
        </>
    )
}
