import type { ReactNode } from "react"
import { Navigate, Route, Routes, useLocation } from "react-router-dom"

import { useAdmin } from "./admin/AdminContext"
import { AdminShell } from "./components/AdminShell/AdminShell"
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
import { AdminLogin } from "./pages/AdminLogin/AdminLogin"
import { AdminDashboard } from "./pages/AdminDashboard/AdminDashboard"
import { AdminHours } from "./pages/AdminHours/AdminHours"
import { AdminServices } from "./pages/AdminServices/AdminServices"

// Route protection illustrates role-based routing; authorization is not server-side.
function RequireAdmin({ children }: { children: ReactNode }) {
    const { loggedIn } = useAdmin()
    return loggedIn ? children : <Navigate to="/admin/login" replace />
}

export function App() {
    const { pathname } = useLocation()
    const inAdmin = pathname.startsWith("/admin")

    return (
        <>
            <ScrollTop />
            {!inAdmin && <Header />}
            {inAdmin ? (
                <Routes>
                    <Route path="/admin/login" element={<AdminLogin />} />
                    <Route path="/admin" element={<RequireAdmin><Navigate to="/admin/turnos" replace /></RequireAdmin>} />
                    <Route element={<RequireAdmin><AdminShell /></RequireAdmin>}>
                        <Route path="/admin/turnos" element={<AdminDashboard />} />
                        <Route path="/admin/horarios" element={<AdminHours />} />
                        <Route path="/admin/servicios" element={<AdminServices />} />
                    </Route>
                    <Route path="*" element={<Navigate to="/admin/login" replace />} />
                </Routes>
            ) : (
                <>
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
            )}
        </>
    )
}
