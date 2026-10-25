import { ArrowRight, ArrowUpRight, Instagram, Mail, MapPin } from "lucide-react"
import { Link } from "react-router-dom"

import { useContent } from "../../context/DisplayContext"
import { Studio } from "../../data/SiteContent"
import { Brand } from "../Brand/Brand"

import styles from "./Footer.module.css"

const paths = ["/", "/estudio", "/artistas", "/galeria", "/servicios", "/contacto"]

// Contact details stay visibly fictional to prevent confusion about the demo.
export function Footer() {
    const t = useContent()

    return (
        <footer className={styles.footer}>
            <div className={`container ${styles.feature}`}>
                <div>
                    <span className="eyebrow"><span className="eyebrow-line" />{t.footer.eyebrow}</span>
                    <h2>{t.footer.title} <em>{t.footer.emphasis}</em></h2>
                    <Link className="text-link" to="/contacto">
                        {t.footer.link} <ArrowRight size={20} />
                    </Link>
                </div>
                <span className={styles.star} aria-hidden="true">✳</span>
            </div>

            <div className={`container ${styles.columns}`}>
                <div>
                    <Brand />
                    <p>{t.footer.description}</p>
                </div>
                <div>
                    <h3>{t.footer.explore}</h3>
                    <nav aria-label={t.footer.explore}>
                        {paths.map((path, index) => (
                            <Link key={path} to={path}>{t.navigation[index]}</Link>
                        ))}
                    </nav>
                </div>
                <div>
                    <h3>{t.footer.findUs}</h3>
                    <p className={styles.contactLine}><MapPin size={17} />{Studio.address}</p>
                    <p className={styles.contactLine}><Mail size={17} />{Studio.email}</p>
                    <p>{t.schedule}</p>
                    <span className={styles.contactLine}>
                        <Instagram size={17} />{Studio.instagram}<ArrowUpRight size={14} />
                    </span>
                </div>
            </div>

            <div className={`container ${styles.bottom}`}>
                <small>© {new Date().getFullYear()} UMBRAL Tattoo Atelier · {t.footer.copyright}</small>
                <small>{t.footer.disclaimer}</small>
            </div>
        </footer>
    )
}
