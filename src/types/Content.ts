// Shared contracts keep content and components consistent in both languages.
export type Language = "es" | "en"
export type Theme = "dark" | "light"
export type ArtworkCategory = "Blackwork" | "Fineline" | "Ornamental" | "Realism"

export interface Artwork {
    id: number
    title: string
    category: ArtworkCategory
    image: string
    alt: string
}

export interface Artist {
    name: string
    specialty: string
    description: string
    image: string
    position?: string
}

export interface Service {
    number: string
    name: string
    summary: string
    description: string
}

export interface Testimonial {
    name: string
    text: string
    work: string
}

export interface FrequentlyAskedQuestion {
    question: string
    answer: string
}
