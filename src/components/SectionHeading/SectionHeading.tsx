import type { ReactNode } from "react"

import styles from "./SectionHeading.module.css"

interface SectionHeadingProps {
    eyebrow: string
    title: ReactNode
    subtitle?: string
}

// A consistent editorial heading pattern anchors every content section.
export function SectionHeading({ eyebrow, title, subtitle }: SectionHeadingProps) {
    return (
        <div className={styles.heading}>
            <span className="eyebrow"><span className="eyebrow-line" />{eyebrow}</span>
            <h2>{title}</h2>
            {subtitle && <p>{subtitle}</p>}
        </div>
    )
}
