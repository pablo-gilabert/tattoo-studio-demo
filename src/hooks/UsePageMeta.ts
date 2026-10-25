import { useEffect } from "react"

// Synchronize document metadata with both the current route and the language.
export function usePageMeta(title: string, description: string) {
    useEffect(() => {
        document.title = `${title} | UMBRAL Tattoo Atelier`
        document.querySelector('meta[name="description"]')?.setAttribute(
            "content",
            description,
        )
    }, [title, description])
}
