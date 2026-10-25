import { useState, type FormEvent } from "react"
import { ArrowRight, CalendarDays, Eye, EyeOff, LockKeyhole, Palette, Wallet } from "lucide-react"
import { Link, Navigate, useNavigate } from "react-router-dom"

import { DEMO_ADMIN, useAdmin } from "../../admin/AdminContext"
import { adminText } from "../../admin/AdminI18n"
import { DisplayControls } from "../../components/DisplayControls/DisplayControls"
import { useDisplay } from "../../context/DisplayContext"
import styles from "./AdminLogin.module.css"

// A two-panel sign-in inspired by the Aula Studio demo exposes its fictional admin account.
export function AdminLogin() {
    const { loggedIn, login } = useAdmin()
    const { language } = useDisplay()
    const navigate = useNavigate()
    const a = (key: Parameters<typeof adminText>[1]) => adminText(language, key)
    const [email, setEmail] = useState<string>(DEMO_ADMIN.email)
    const [password, setPassword] = useState<string>(DEMO_ADMIN.password)
    const [visible, setVisible] = useState(false)
    const [error, setError] = useState(false)

    if (loggedIn) return <Navigate to="/admin/turnos" replace />

    function signIn(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        if (login(email, password)) navigate("/admin/turnos", { replace: true })
        else setError(true)
    }

    return (
        <div className={styles.page}>
            <aside className={styles.story}>
                <div className={styles.storyContent}>
                    <Link to="/" className={styles.brand}>✳ UMBRAL<span>TATTOO ATELIER</span></Link>
                    <div className={styles.storyMain}>
                        <span className={styles.kicker}>{a("loginEyebrow")}</span>
                        <h1>{a("loginStoryTitle")}<br /><em>{a("loginStoryAccent")}</em></h1>
                        <p>{a("loginStoryText")}</p>
                        <div className={styles.features}>
                            <div><CalendarDays size={23} /><strong>{a("loginFeatureOne")}</strong></div>
                            <div><Wallet size={23} /><strong>{a("loginFeatureTwo")}</strong></div>
                            <div><Palette size={23} /><strong>{a("loginFeatureThree")}</strong></div>
                        </div>
                    </div>
                    <span className={styles.storyFooter}>{a("demoLabel")}</span>
                </div>
            </aside>
            <main className={styles.area} id="main-content">
                <div className={styles.top}><span>{a("prototype")}</span><DisplayControls /></div>
                <div className={styles.panel}>
                    <span className={styles.lock}><LockKeyhole size={23} /></span>
                    <h2>{a("welcome")}<br /><em>{a("welcomeAccent")}</em></h2>
                    <p className={styles.intro}>{a("loginSubtitle")}</p>
                    <form className={styles.form} onSubmit={signIn}>
                        <label>{a("email")}
                            <input type="email" autoComplete="username" required value={email} onChange={(event) => { setEmail(event.target.value); setError(false) }} />
                        </label>
                        <label>{a("password")}
                            <span className={styles.passwordWrapper}>
                                <input type={visible ? "text" : "password"} autoComplete="current-password" required value={password} onChange={(event) => { setPassword(event.target.value); setError(false) }} />
                                <button type="button" aria-label={a(visible ? "hidePassword" : "showPassword")} onClick={() => setVisible((current) => !current)}>
                                    {visible ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </span>
                        </label>
                        {error && <p role="alert" className={styles.error}>{a("signInError")}</p>}
                        <button type="submit" className={styles.submit}>{a("signIn")} <ArrowRight size={18} /></button>
                    </form>
                    <div className={styles.credentials}>
                        <strong>{a("credentials")}</strong>
                        <p>{a("demoDescription")}</p>
                        <code>{DEMO_ADMIN.email}</code>
                        <code>{a("demoPassword")}: {DEMO_ADMIN.password}</code>
                        <button type="button" onClick={() => { login(DEMO_ADMIN.email, DEMO_ADMIN.password); navigate("/admin/turnos", { replace: true }) }}>
                            {a("quickLogin")} <ArrowRight size={17} />
                        </button>
                    </div>
                    <Link to="/" className={styles.back}>← {a("back")}</Link>
                </div>
                <footer className={styles.footer}>{a("loginNote")}</footer>
            </main>
        </div>
    )
}
