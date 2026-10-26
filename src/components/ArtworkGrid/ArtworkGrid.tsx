import { useEffect, useMemo, useState } from "react"
import { ArrowLeft, ArrowRight, Maximize2, X } from "lucide-react"

import { useContent } from "../../context/DisplayContext"
import { StudioImage } from "../StudioImage/StudioImage"
import type { ArtworkCategory } from "../../types/Content"

import styles from "./ArtworkGrid.module.css"

type ArtworkFilter = "all" | ArtworkCategory
const filters: ArtworkFilter[] = ["all", "Fineline", "Blackwork", "Ornamental", "Realism", "Old School", "Oriental"]

// One distinct image per tattoo category. The optional filter never duplicates cards.
export function ArtworkGrid({ compact = false }: { compact?: boolean }) {
    const t = useContent()
    const [filter, setFilter] = useState<ArtworkFilter>("all")
    const [activeIndex, setActiveIndex] = useState<number | null>(null)

    const artworks = t.artworks
    const visibleArtworks = useMemo(() => (
        filter === "all" ? artworks : artworks.filter((artwork) => artwork.category === filter)
    ), [artworks, filter])

    const selected = activeIndex === null ? undefined : visibleArtworks[activeIndex]

    useEffect(() => {
        if (activeIndex === null) return

        const previousOverflow = document.body.style.overflow
        document.body.style.overflow = "hidden"

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") setActiveIndex(null)
            if (event.key === "ArrowRight") {
                setActiveIndex((index) => index === null ? null : (index + 1) % visibleArtworks.length)
            }
            if (event.key === "ArrowLeft") {
                setActiveIndex((index) => index === null ? null : (index - 1 + visibleArtworks.length) % visibleArtworks.length)
            }
        }

        window.addEventListener("keydown", handleKeyDown)

        return () => {
            document.body.style.overflow = previousOverflow
            window.removeEventListener("keydown", handleKeyDown)
        }
    }, [activeIndex, visibleArtworks.length])

    function filterLabel(category: ArtworkFilter) {
        if (category === "all") return t.gallery.all
        if (category === "Realism") return t.gallery.realism
        return category
    }

    function selectCategory(category: ArtworkFilter) {
        setFilter(category)
        setActiveIndex(null)
    }

    return (
        <>
            {!compact && (
                <div className={styles.filterBar}>
                    <label className={styles.filterLabel} htmlFor="gallery-style-filter">
                        {t.gallery.filterLabel}
                    </label>
                    <select
                        id="gallery-style-filter"
                        className={styles.filterSelect}
                        value={filter}
                        onChange={(event) => selectCategory(event.target.value as ArtworkFilter)}
                    >
                        {filters.map((category) => (
                            <option key={category} value={category}>{filterLabel(category)}</option>
                        ))}
                    </select>
                </div>
            )}

            <div className={styles.grid}>
                {visibleArtworks.map((artwork, index) => (
                    <button
                        key={artwork.id}
                        type="button"
                        className={styles.card}
                        aria-label={`${t.gallery.openArtwork}: ${filterLabel(artwork.category)}`}
                        onClick={() => setActiveIndex(index)}
                    >
                        <StudioImage fileName={artwork.image} alt={artwork.alt} loading="lazy" />
                        <span className={styles.overlay}>
                            <strong>{filterLabel(artwork.category)}</strong>
                            <Maximize2 size={19} aria-hidden="true" />
                        </span>
                    </button>
                ))}
            </div>

            {selected && (
                <div
                    className={styles.backdrop}
                    role="presentation"
                    onMouseDown={(event) => {
                        if (event.target === event.currentTarget) setActiveIndex(null)
                    }}
                >
                    <div
                        className={styles.dialog}
                        role="dialog"
                        aria-modal="true"
                        aria-label={`${t.gallery.artworkDetail} ${filterLabel(selected.category)}`}
                    >
                        <button
                            type="button"
                            className={styles.close}
                            aria-label={t.imageClose}
                            onClick={() => setActiveIndex(null)}
                        >
                            <X size={24} />
                        </button>
                        <StudioImage fileName={selected.image} alt={selected.alt} />
                        <div className={styles.details}>
                            <div>
                                <strong>{filterLabel(selected.category)}</strong>
                                <small>{(activeIndex ?? 0) + 1} / {visibleArtworks.length}</small>
                            </div>
                            {visibleArtworks.length > 1 && (
                                <div className={styles.arrows}>
                                    <button
                                        aria-label={t.imagePrevious}
                                        type="button"
                                        onClick={() => setActiveIndex((activeIndex! - 1 + visibleArtworks.length) % visibleArtworks.length)}
                                    >
                                        <ArrowLeft size={19} />
                                    </button>
                                    <button
                                        aria-label={t.imageNext}
                                        type="button"
                                        onClick={() => setActiveIndex((activeIndex! + 1) % visibleArtworks.length)}
                                    >
                                        <ArrowRight size={19} />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
