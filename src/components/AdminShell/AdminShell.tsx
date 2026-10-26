import { CalendarDays, Clock3, LogOut, RotateCcw } from "lucide-react"
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom"

import { confirmAction, showAlert } from "../../admin/AdminAlerts"
import { useAdmin } from "../../admin/AdminContext"
import { adminText } from "../../admin/AdminI18n"
import { DisplayControls } from "../DisplayControls/DisplayControls"
import { useDisplay } from "../../context/DisplayContext"
import { TattooMachineIcon } from "../TattooMachineIcon/TattooMachineIcon"
import styles from "./AdminShell.module.css"

// Private demo routes share navigation and preferences while public pages stay untouched.
export function AdminShell() {
    const { language } = useDisplay()
    const { logout, resetDemo } = useAdmin()
    const navigate = useNavigate()
    const a = (key: Parameters<typeof adminText>[1]) => adminText(language, key)

    async function reset() {
        if (!await confirmAction({ title: a("reset"), text: a("resetConfirm"), confirmText: a("confirm"), cancelText: a("cancel"), destructive: true })) return
        resetDemo()
        void showAlert(a("resetDone"))
    }

    return (
        <div className={styles.shell}>
            <header className={styles.header}>
                <Link to="/" className={styles.brand}><TattooMachineIcon size={27} /> UMBRAL <span>TATTOO ATELIER</span></Link>
                <div className={styles.actions}>
                    <DisplayControls />
                    <button type="button" onClick={() => { logout(); navigate("/admin/login", { replace: true }) }} className={styles.logout}>
                        <LogOut size={16} /> {a("logout")}
                    </button>
                </div>
            </header>
            <div className={styles.layout}>
                <aside className={styles.sidebar} aria-label={a("panel")}>
                    <p className={styles.kicker}>{a("demoLabel")}</p>
                    <h2>{a("panel")}</h2>
                    <nav>
                        <NavLink to="/admin/turnos" className={({ isActive }) => isActive ? styles.active : styles.link}><CalendarDays size={18} /> {a("appointments")}</NavLink>
                        <NavLink to="/admin/horarios" className={({ isActive }) => isActive ? styles.active : styles.link}><Clock3 size={18} /> {a("hours")}</NavLink>
                        <NavLink to="/admin/servicios" className={({ isActive }) => isActive ? styles.active : styles.link}><TattooMachineIcon size={19} /> {a("services")}</NavLink>
                    </nav>
                    <div className={styles.sidebarBottom}>
                        <button type="button" onClick={() => void reset()}><RotateCcw size={15} /> {a("reset")}</button>
                        <Link to="/">← {a("back")}</Link>
                    </div>
                </aside>
                <main id="main-content" className={styles.content}>
                    <Outlet />
                    <p className={styles.warning}>{a("browserOnly")} {a("loginNote")}</p>
                </main>
            </div>
        </div>
    )
}
