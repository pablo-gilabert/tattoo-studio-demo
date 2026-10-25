import { useEffect, useMemo, useState } from "react"
import { ArrowLeft, ArrowRight, Maximize2, X } from "lucide-react"

import { useContent } from "../../context/DisplayContext"
import { StudioImage } from "../StudioImage/StudioImage"
import type { ArtworkCategory } from "../../types/Content"

import styles from "./ArtworkGrid.module.css"

type ArtworkFilter = "all" | ArtworkCategory
const filters: ArtworkFilter[] = ["all", "Blackwork", "Fineline", "Ornamental", "Realism"]

// Filtering and modal navigation remain entirely client-side for the demo.
export function ArtworkGrid({ compact = false }: { compact?: boolean }) {
    const t = useContent()
    const [filter, setFilter] = useState<ArtworkFilter>("all")
    const [activeIndex, setActiveIndex] = useState<number | null>(null)

    const artworks = t.artworks
    const visibleArtworks = useMemo(() => (
        (filter === "all" ? artworks : artworks.filter((artwork) => artwork.category === filter))
            .slice(0, compact ? 6 : undefined)
    ), [artworks, filter, compact])

    const selected = activeIndex === null ? undefined : visibleArtworks[activeIndex]

    // Lock background scrolling and support arrow/Escape keys while the modal is open.
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

    function selectCategory(category: ArtworkFilter) {
        setFilter(category)
        setActiveIndex(null)
    }

    function filterLabel(category: ArtworkFilter) {
        if (category === "all") return t.gallery.all
        if (category === "Realism") return t.gallery.realism
        return category
    }

    return (
        <>
            <div className={styles.filters} aria-label={t.gallery.filterLabel}>
                {filters.map((category) => (
                    <button
                        key={category}
                        type="button"
                        className={`${styles.filter} ${filter === category ? styles.selected : ""}`}
                        aria-pressed={filter === category}
                        onClick={() => selectCategory(category)}
                    >
                        {filterLabel(category)}
                    </button>
                ))}
            </div>

            <div className={styles.grid}>
                {visibleArtworks.map((artwork, index) => (
                    <button
                        key={artwork.id}
                        type="button"
                        className={styles.card}
                        aria-label={`${t.gallery.openArtwork} ${artwork.title}`}
                        onClick={() => setActiveIndex(index)}
                    >
                        <StudioImage fileName={artwork.image} alt={artwork.alt} loading="lazy" />
                        <span className={styles.overlay}>
                            <span>
                                <small>{filterLabel(artwork.category)}</small>
                                <strong>{artwork.title}</strong>
                            </span>
                            <Maximize2 size={19} />
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
                        aria-label={`${t.gallery.artworkDetail} ${selected.title}`}
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
                                <small>{filterLabel(selected.category)} · {(activeIndex ?? 0) + 1} / {visibleArtworks.length}</small>
                                <strong>{selected.title}</strong>
                            </div>
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
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
