import { useState } from "react"
import { ArrowUpRight, ChevronDown } from "lucide-react"
import { Link } from "react-router-dom"

import { PageHero } from "../../components/PageHero/PageHero"
import { SectionHeading } from "../../components/SectionHeading/SectionHeading"
import { StudioImage } from "../../components/StudioImage/StudioImage"
import { useContent } from "../../context/DisplayContext"
import { usePageMeta } from "../../hooks/UsePageMeta"
import { useAdmin } from "../../admin/AdminContext"
import { formatPrice } from "../../admin/AdminScheduling"
import { useDisplay } from "../../context/DisplayContext"

import styles from "./Services.module.css"

// A controlled FAQ accordion preserves the selected item across language changes.
export function Services() {
    const t = useContent()
    const c = t.servicesPage
    const { database } = useAdmin()
    const { language } = useDisplay()
    const [openQuestion, setOpenQuestion] = useState<number | null>(0)

    usePageMeta(t.pageNames[4], t.pageDescriptions[4])

    return (
        <>
            <PageHero
                eyebrow={c.eyebrow}
                title={<>{c.title} <em>{c.emphasis}</em></>}
                description={c.description}
                number="05"
            />

            <section className="section-pad">
                <div className="container">
                    <SectionHeading
                        eyebrow={c.listEyebrow}
                        title={<>{c.listTitle} <em>{c.listEmphasis}</em></>}
                    />
                    <div className={styles.list}>
                        {database.services.map((service, index) => (
                            <article className={styles.row} key={service.id}>
                                <span>{String(index + 1).padStart(2, "0")}</span>
                                <div>
                                    <h3>{service.name[language]}</h3>
                                    <p>{service.description[language]}</p>
                                    <strong>{formatPrice(service.price)} · {service.duration} min</strong>
                                </div>
                                <Link
                                    to="/contacto"
                                    className="icon-circle"
                                    aria-label={`${c.inquire} ${service.name[language]}`}
                                >
                                    <ArrowUpRight size={21} />
                                </Link>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section className={styles.banner}>
                <StudioImage fileName="session.webp" alt={c.bannerAlt} loading="lazy" />
                <div className={styles.bannerContent}>
                    <span className="eyebrow eyebrow-on-photo">
                        <span className="eyebrow-line" />{c.bannerEyebrow}
                    </span>
                    <h2>{c.bannerTitle} <em>{c.bannerEmphasis}</em></h2>
                    <Link className="button button-accent" to="/contacto">
                        {c.bannerLink} <ArrowUpRight size={17} />
                    </Link>
                </div>
            </section>

            <section className={`${styles.faq} section-pad`}>
                <div className={`container ${styles.faqGrid}`}>
                    <SectionHeading
                        eyebrow={c.faqEyebrow}
                        title={<>{c.faqTitle} <em>{c.faqEmphasis}</em></>}
                    />
                    <div className={styles.questions}>
                        {t.faqs.map((faq, index) => (
                            <div className={styles.question} key={index}>
                                <button
                                    type="button"
                                    aria-expanded={openQuestion === index}
                                    onClick={() => setOpenQuestion((current) => current === index ? null : index)}
                                >
                                    <span>{faq.question}</span>
                                    <ChevronDown
                                        size={19}
                                        className={openQuestion === index ? styles.rotated : ""}
                                    />
                                </button>
                                {openQuestion === index && <p>{faq.answer}</p>}
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}
