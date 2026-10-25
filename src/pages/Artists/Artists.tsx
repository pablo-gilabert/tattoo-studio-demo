import { ArrowUpRight } from "lucide-react"
import { Link } from "react-router-dom"

import { ArtistCards } from "../../components/ArtistCards/ArtistCards"
import { PageHero } from "../../components/PageHero/PageHero"
import { SectionHeading } from "../../components/SectionHeading/SectionHeading"
import { useContent } from "../../context/DisplayContext"
import { usePageMeta } from "../../hooks/UsePageMeta"

import styles from "./Artists.module.css"

// The artist biographies and photo cards share one localized source of truth.
export function Artists() {
    const t = useContent()
    const c = t.artistsPage

    usePageMeta(t.pageNames[2], t.pageDescriptions[2])

    return (
        <>
            <PageHero
                eyebrow={c.eyebrow}
                title={<>{c.title} <em>{c.emphasis}</em></>}
                description={c.description}
                number="03"
            />

            <section className="section-pad">
                <div className="container">
                    <div className="section-title-row">
                        <SectionHeading
                            eyebrow={c.listEyebrow}
                            title={<>{c.listTitle} <em>{c.listEmphasis}</em></>}
                            subtitle={c.listSubtitle}
                        />
                    </div>
                    <ArtistCards />
                </div>
            </section>

            <section className={`${styles.biographies} section-pad`}>
                <div className="container">
                    <SectionHeading
                        eyebrow={c.bioEyebrow}
                        title={<>{c.bioTitle} <em>{c.bioEmphasis}</em></>}
                    />
                    <div className={styles.rows}>
                        {t.artists.map((artist, index) => (
                            <article key={artist.name} className={styles.row}>
                                <span>0{index + 1}</span>
                                <div>
                                    <h3>{artist.name}</h3>
                                    <small>{artist.specialty}</small>
                                </div>
                                <p>{artist.description}</p>
                                <Link to="/contacto" aria-label={`${c.inquiry} ${artist.name}`}>
                                    <ArrowUpRight size={23} />
                                </Link>
                            </article>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}
