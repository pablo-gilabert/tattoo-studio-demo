import { ArrowUpRight, HeartHandshake, Leaf, ShieldCheck } from "lucide-react"
import { Link } from "react-router-dom"

import { PageHero } from "../../components/PageHero/PageHero"
import { SectionHeading } from "../../components/SectionHeading/SectionHeading"
import { StudioImage } from "../../components/StudioImage/StudioImage"
import { useContent } from "../../context/DisplayContext"
import { usePageMeta } from "../../hooks/UsePageMeta"

import styles from "./Studio.module.css"

const valueIcons = [HeartHandshake, Leaf, ShieldCheck]

// Studio story, values, and visual presentation stay translated together.
export function Studio() {
    const t = useContent()
    const c = t.studio

    usePageMeta(t.pageNames[1], t.pageDescriptions[1])

    return (
        <>
            <PageHero
                eyebrow={c.eyebrow}
                title={<>{c.title} <em>{c.emphasis}</em></>}
                description={c.description}
                number="02"
            />

            <div className={styles.banner}>
                <StudioImage fileName="studio.webp" alt={c.bannerAlt} />
            </div>

            <section className="section-pad">
                <div className={`container ${styles.story}`}>
                    <SectionHeading
                        eyebrow={c.storyEyebrow}
                        title={<>{c.storyTitle}<br /><em>{c.storyEmphasis}</em></>}
                    />
                    <div className={styles.storyText}>
                        {c.story.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                    </div>
                </div>
            </section>

            <section className={`${styles.values} section-pad`}>
                <div className="container">
                    <SectionHeading
                        eyebrow={c.valuesEyebrow}
                        title={<>{c.valuesTitle} <em>{c.valuesEmphasis}</em></>}
                    />
                    <div className={styles.valueGrid}>
                        {c.values.map((value, index) => {
                            const Icon = valueIcons[index] ?? HeartHandshake

                            return (
                                <article key={value.title}>
                                    <Icon size={34} strokeWidth={1.5} />
                                    <span>0{index + 1}</span>
                                    <h3>{value.title}</h3>
                                    <p>{value.body}</p>
                                </article>
                            )
                        })}
                    </div>
                </div>
            </section>

            <section className="section-pad">
                <div className={`container ${styles.experience}`}>
                    <StudioImage fileName="atelier.webp" alt={c.detailAlt} loading="lazy" />
                    <div>
                        <span className="eyebrow"><span className="eyebrow-line" />{c.experienceEyebrow}</span>
                        <h2>{c.experienceTitle} <em>{c.experienceEmphasis}</em></h2>
                        <p>{c.experienceBody}</p>
                        <Link to="/contacto" className="text-link">
                            {c.experienceLink} <ArrowUpRight size={19} />
                        </Link>
                    </div>
                </div>
            </section>
        </>
    )
}
