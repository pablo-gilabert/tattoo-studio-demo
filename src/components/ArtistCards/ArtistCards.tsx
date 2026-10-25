import { ArrowUpRight } from "lucide-react"
import { Link } from "react-router-dom"

import { useContent } from "../../context/DisplayContext"
import { StudioImage } from "../StudioImage/StudioImage"

import styles from "./ArtistCards.module.css"

// Cards are driven by localized content and link to the demonstration inquiry.
export function ArtistCards() {
    const t = useContent()

    return (
        <div className={styles.grid}>
            {t.artists.map((artist, index) => (
                <article key={artist.name} className={styles.card}>
                    <div className={styles.photo}>
                        <StudioImage
                            fileName={artist.image}
                            alt={`${t.artistsPage.imageAlt}: ${artist.name}`}
                            loading="lazy"
                            style={{ objectPosition: artist.position ?? "center" }}
                        />
                        <span className={styles.index}>0{index + 1}</span>
                    </div>
                    <div className={styles.info}>
                        <div>
                            <h3>{artist.name}</h3>
                            <p>{artist.specialty}</p>
                        </div>
                        <Link
                            to="/contacto"
                            className="icon-circle"
                            aria-label={`${t.artistsPage.inquiry} ${artist.name}`}
                        >
                            <ArrowUpRight size={20} />
                        </Link>
                    </div>
                </article>
            ))}
        </div>
    )
}
