import { useEffect } from "react"
import { useLocation } from "react-router-dom"

// Reset scroll position after client-side navigation between pages.
export function ScrollTop() {
    const { pathname } = useLocation()

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "instant" })
    }, [pathname])

    return null
}
