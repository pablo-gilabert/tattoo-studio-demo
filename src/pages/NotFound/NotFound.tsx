import { ArrowLeft } from "lucide-react"
import { Link } from "react-router-dom"

import { useContent } from "../../context/DisplayContext"
import { usePageMeta } from "../../hooks/UsePageMeta"

import styles from "./NotFound.module.css"

// Provide a translated recovery route for unknown SPA paths.
export function NotFound() {
    const t = useContent()

    usePageMeta(t.pageNames[6], t.pageDescriptions[6])

    return (
        <section className={styles.notFound}>
            <span className="eyebrow"><span className="eyebrow-line" />ERROR 404</span>
            <h1>{t.notFound.title} <em>{t.notFound.emphasis}</em></h1>
            <p>{t.notFound.description}</p>
            <Link to="/" className="button button-accent">
                <ArrowLeft size={18} /> {t.notFound.link}
            </Link>
        </section>
    )
}
