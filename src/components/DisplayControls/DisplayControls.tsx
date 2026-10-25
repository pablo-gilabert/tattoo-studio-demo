import { ChevronDown, Moon, Sun } from "lucide-react"

import { useContent, useDisplay } from "../../context/DisplayContext"
import type { Language } from "../../types/Content"

import styles from "./DisplayControls.module.css"

// A native select remains keyboard-accessible and shows real SVG country flags.
export function DisplayControls() {
    const { language, theme, setLanguage, toggleTheme } = useDisplay()
    const t = useContent()

    return (
        <div className={styles.controls}>
            <div className={styles.language}>
                <img
                    className={styles.flag}
                    src={language === "es" ? "/icons/Spain.svg" : "/icons/UnitedKingdom.svg"}
                    alt={language === "es" ? "España" : "United Kingdom"}
                />
                <select
                    aria-label={t.localeLabel}
                    value={language}
                    onChange={(event) => setLanguage(event.target.value as Language)}
                    className={styles.select}
                >
                    <option value="es">ESP</option>
                    <option value="en">EN</option>
                </select>
                <ChevronDown aria-hidden="true" size={13} />
            </div>

            <button
                className={styles.themeSwitch}
                type="button"
                aria-label={t.themeLabel}
                aria-pressed={theme === "light"}
                onClick={toggleTheme}
            >
                <Moon size={15} aria-hidden="true" />
                <span className={styles.track}>
                    <span className={styles.thumb} />
                </span>
                <Sun size={15} aria-hidden="true" />
            </button>
        </div>
    )
}
