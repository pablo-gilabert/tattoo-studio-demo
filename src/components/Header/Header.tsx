import { useEffect, useState } from "react"
import { ArrowUpRight, LockKeyhole, Menu, X } from "lucide-react"
import { NavLink, useLocation } from "react-router-dom"

import { useContent, useDisplay } from "../../context/DisplayContext"
import { adminText } from "../../admin/AdminI18n"
import { Brand } from "../Brand/Brand"
import { DisplayControls } from "../DisplayControls/DisplayControls"

import styles from "./Header.module.css"

const paths = ["/", "/estudio", "/artistas", "/galeria", "/servicios", "/contacto"]

// Responsive navigation closes after route changes and Escape key presses.
export function Header() {
    const t = useContent()
    const { language } = useDisplay()
    const { pathname } = useLocation()
    const [menuOpen, setMenuOpen] = useState(false)

    useEffect(() => {
        setMenuOpen(false)
    }, [pathname])

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") setMenuOpen(false)
        }

        window.addEventListener("keydown", handleKeyDown)

        return () => {
            window.removeEventListener("keydown", handleKeyDown)
        }
    }, [])

    return (
        <header className={styles.header}>
            <div className={`container ${styles.inner}`}>
                <Brand />

                <nav
                    id="main-navigation"
                    className={`${styles.navigation} ${menuOpen ? styles.navigationOpen : ""}`}
                    aria-label={t.localeLabel === "Idioma" ? "Navegación principal" : "Main navigation"}
                >
                    {paths.map((path, index) => (
                        <NavLink
                            key={path}
                            end={path === "/"}
                            to={path}
                            className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ""}`}
                        >
                            {t.navigation[index]}
                        </NavLink>
                    ))}
                    <NavLink to="/admin/login" className={styles.adminAccess}>
                        <LockKeyhole size={15} /> {adminText(language, "loginNav")}
                    </NavLink>
                    <NavLink to="/contacto" className={`${styles.mobileBooking} button button-accent`}>
                        {t.booking} <ArrowUpRight size={16} />
                    </NavLink>
                </nav>

                <div className={styles.actions}>
                    <DisplayControls />
                    <NavLink to="/contacto" className={`${styles.desktopBooking} button button-accent`}>
                        {t.booking} <ArrowUpRight size={16} />
                    </NavLink>
                    <button
                        className={styles.menuToggle}
                        type="button"
                        aria-label={menuOpen ? t.menuClose : t.menuOpen}
                        aria-controls="main-navigation"
                        aria-expanded={menuOpen}
                        onClick={() => setMenuOpen((current) => !current)}
                    >
                        {menuOpen ? <X size={23} /> : <Menu size={23} />}
                    </button>
                </div>
            </div>
        </header>
    )
}
