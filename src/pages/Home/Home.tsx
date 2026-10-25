import {
    ArrowDown,
    ArrowRight,
    ArrowUpRight,
    Asterisk,
    Flower2,
    ShieldCheck,
    Sparkles,
} from "lucide-react"
import { Link } from "react-router-dom"

import { ArtistCards } from "../../components/ArtistCards/ArtistCards"
import { ArtworkGrid } from "../../components/ArtworkGrid/ArtworkGrid"
import { SectionHeading } from "../../components/SectionHeading/SectionHeading"
import { StudioImage } from "../../components/StudioImage/StudioImage"
import { useContent } from "../../context/DisplayContext"
import { usePageMeta } from "../../hooks/UsePageMeta"

import styles from "./Home.module.css"

const benefitIcons = [Asterisk, Sparkles, ShieldCheck, Flower2]

// The landing page introduces the brand, featured work, artists, and inquiry flow.
export function Home() {
    const t = useContent()
    const c = t.home

    usePageMeta(t.pageNames[0], t.pageDescriptions[0])

    return (
        <>
            <section className={styles.hero}>
                <StudioImage fileName="hero.webp" alt={c.heroImageAlt} className={styles.heroImage} />
                <div className={styles.heroShade} />
                <div className={`container ${styles.heroInner}`}>
                    <div className={styles.heroContent}>
                        <span className="eyebrow eyebrow-on-photo">
                            <span className="eyebrow-line" />{c.eyebrow}
                        </span>
                        <h1>{c.heroBefore} <em>{c.heroEmphasis}</em></h1>
                        <p>{c.heroDescription}</p>
                        <div className={styles.actions}>
                            <Link to="/contacto" className="button button-accent">
                                {c.heroPrimary} <ArrowUpRight size={18} />
                            </Link>
                            <Link to="/galeria" className="button button-outline-photo">
                                {c.heroSecondary} <ArrowRight size={18} />
                            </Link>
                        </div>
                    </div>
                    <a className={styles.scroll} href="#introduccion">
                        {c.scroll} <ArrowDown size={18} />
                    </a>
                </div>
                <span className={styles.heroVertical} aria-hidden="true">EST. MMXXIV · MADE TO LAST</span>
                <span className={styles.heroIndex}>01 / 06</span>
            </section>

            <section className={styles.benefits}>
                <div className={`container ${styles.benefitsGrid}`}>
                    {c.benefits.map((label, index) => {
                        const Icon = benefitIcons[index] ?? Asterisk
                        return <div key={label}><Icon size={24} /><span>{label}</span></div>
                    })}
                </div>
            </section>

            <section id="introduccion" className="section-pad">
                <div className={`container ${styles.introGrid}`}>
                    <div className={styles.introPhoto}>
                        <StudioImage fileName="studio.webp" alt={c.introImageAlt} loading="lazy" />
                        <span>UMBRAL · TATTOO ATELIER</span>
                    </div>
                    <div className={styles.introCopy}>
                        <SectionHeading
                            eyebrow={c.introEyebrow}
                            title={<>{c.introTitle}<br /><em>{c.introEmphasis}</em></>}
                            subtitle={c.introSubtitle}
                        />
                        <p>{c.introBody}</p>
                        <Link to="/estudio" className="text-link">
                            {c.introLink} <ArrowUpRight size={19} />
                        </Link>
                    </div>
                </div>
            </section>

            <section className={`${styles.craft} section-pad`}>
                <div className="container">
                    <div className="section-title-row">
                        <SectionHeading
                            eyebrow={c.craftEyebrow}
                            title={<>{c.craftTitle}<br /><em>{c.craftEmphasis}</em></>}
                            subtitle={c.craftSubtitle}
                        />
                        <Link className="text-link" to="/servicios">
                            {c.craftLink} <ArrowUpRight size={19} />
                        </Link>
                    </div>
                    <div className={styles.serviceGrid}>
                        {t.services.slice(0, 3).map((service) => (
                            <Link to="/servicios" key={service.number} className={styles.service}>
                                <small>{service.number} / 04</small>
                                <div>
                                    <h3>{service.name}</h3>
                                    <p>{service.summary}</p>
                                </div>
                                <ArrowUpRight size={22} />
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            <section className="section-pad">
                <div className="container">
                    <div className="section-title-row">
                        <SectionHeading
                            eyebrow={c.workEyebrow}
                            title={<>{c.workTitle}<br /><em>{c.workEmphasis}</em></>}
                            subtitle={c.workSubtitle}
                        />
                        <Link className="text-link" to="/galeria">
                            {c.workLink} <ArrowUpRight size={19} />
                        </Link>
                    </div>
                    <ArtworkGrid compact />
                </div>
            </section>

            <section className={`${styles.team} section-pad`}>
                <div className="container">
                    <div className="section-title-row">
                        <SectionHeading
                            eyebrow={c.teamEyebrow}
                            title={<>{c.teamTitle}<br /><em>{c.teamEmphasis}</em></>}
                            subtitle={c.teamSubtitle}
                        />
                        <Link className="text-link" to="/artistas">
                            {c.teamLink} <ArrowUpRight size={19} />
                        </Link>
                    </div>
                    <ArtistCards />
                </div>
            </section>

            <section className={`${styles.quotes} section-pad`}>
                <div className="container">
                    <span className="eyebrow"><span className="eyebrow-line" />{c.reviewsEyebrow}</span>
                    <div className={styles.quoteGrid}>
                        {t.testimonials.map((quote) => (
                            <figure key={quote.name} className={styles.quote}>
                                <span className={styles.quoteSymbol}>“</span>
                                <blockquote>{quote.text}</blockquote>
                                <figcaption>
                                    <strong>{quote.name}</strong>
                                    <small>{quote.work} · {c.reviewDisclaimer}</small>
                                </figcaption>
                            </figure>
                        ))}
                    </div>
                </div>
            </section>

            <section className={styles.closing}>
                <StudioImage fileName="ritual.webp" alt={c.closingImageAlt} />
                <div className="container">
                    <span className="eyebrow eyebrow-on-photo"><span className="eyebrow-line" />{c.closingEyebrow}</span>
                    <h2>{c.closingTitle}<br /><em>{c.closingEmphasis}</em></h2>
                    <p>{c.closingBody}</p>
                    <Link to="/contacto" className="button button-accent">
                        {c.closingLink} <ArrowUpRight size={18} />
                    </Link>
                </div>
            </section>
        </>
    )
}
