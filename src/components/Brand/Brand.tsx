import { Link } from "react-router-dom"

import styles from "./Brand.module.css"

// Reusable custom wordmark keeps the fictitious brand consistent site-wide.
export function Brand() {
    return (
        <Link className={styles.brand} to="/" aria-label="UMBRAL Tattoo Atelier">
            <span className={styles.symbol} aria-hidden="true">✳</span>
            <span className={styles.text}>
                <strong>UMBRAL</strong>
                <small>TATTOO ATELIER</small>
            </span>
        </Link>
    )
}
