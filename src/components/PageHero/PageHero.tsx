import type { ReactNode } from "react"

import styles from "./PageHero.module.css"

interface PageHeroProps {
    eyebrow: string
    title: ReactNode
    description: string
    number: string
}

// Inner pages reuse the same introductory hierarchy and section numbering.
export function PageHero({ eyebrow, title, description, number }: PageHeroProps) {
    return (
        <section className={styles.hero}>
            <div className={`container ${styles.inner}`}>
                <div>
                    <span className="eyebrow"><span className="eyebrow-line" />{eyebrow}</span>
                    <h1>{title}</h1>
                    <p>{description}</p>
                </div>
                <span className={styles.counter}>{number} / 06</span>
            </div>
        </section>
    )
}
