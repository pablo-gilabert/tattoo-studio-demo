import { ArtworkGrid } from "../../components/ArtworkGrid/ArtworkGrid"
import { PageHero } from "../../components/PageHero/PageHero"
import { SectionHeading } from "../../components/SectionHeading/SectionHeading"
import { useContent } from "../../context/DisplayContext"
import { usePageMeta } from "../../hooks/UsePageMeta"

import styles from "./Gallery.module.css"

// Filters and the lightbox are provided by the reusable ArtworkGrid component.
export function Gallery() {
    const t = useContent()
    const c = t.gallery

    usePageMeta(t.pageNames[3], t.pageDescriptions[3])

    return (
        <>
            <PageHero
                eyebrow={c.eyebrow}
                title={<>{c.title} <em>{c.emphasis}</em></>}
                description={c.description}
                number="04"
            />

            <section className="section-pad">
                <div className="container">
                    <div className="section-title-row">
                        <SectionHeading
                            eyebrow={c.workEyebrow}
                            title={<>{c.workTitle} <em>{c.workEmphasis}</em></>}
                        />
                    </div>
                    <ArtworkGrid />
                    <p className={styles.disclaimer}>{c.disclaimer}</p>
                </div>
            </section>
        </>
    )
}
