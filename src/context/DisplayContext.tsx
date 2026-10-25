import {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
    type ReactNode,
} from "react"

import { SiteContent } from "../data/SiteContent"
import type { Language, Theme } from "../types/Content"

interface DisplayContextValue {
    language: Language
    theme: Theme
    setLanguage: (language: Language) => void
    toggleTheme: () => void
}

const DisplayContext = createContext<DisplayContextValue | null>(null)

// Read a preference safely and fall back to the requested default on first visit.
function readPreference<T extends string>(key: string, allowed: T[], fallback: T): T {
    try {
        const value = window.localStorage.getItem(key) as T | null
        return value && allowed.includes(value) ? value : fallback
    } catch {
        return fallback
    }
}

// The provider keeps language and visual theme consistent across every route.
export function DisplayProvider({ children }: { children: ReactNode }) {
    const [language, setLanguage] = useState<Language>(() =>
        readPreference("umbral-language", ["es", "en"], "es"),
    )
    const [theme, setTheme] = useState<Theme>(() =>
        readPreference("umbral-theme", ["dark", "light"], "dark"),
    )

    useEffect(() => {
        document.documentElement.dataset.theme = theme
        document.documentElement.lang = language
        document.querySelector('meta[name="theme-color"]')?.setAttribute(
            "content",
            theme === "dark" ? "#161310" : "#f6f0e8",
        )

        try {
            window.localStorage.setItem("umbral-theme", theme)
            window.localStorage.setItem("umbral-language", language)
        } catch {
            // Private browsing can restrict storage without breaking preferences.
        }
    }, [language, theme])

    const value = useMemo<DisplayContextValue>(() => ({
        language,
        theme,
        setLanguage,
        toggleTheme: () => setTheme((current) => current === "dark" ? "light" : "dark"),
    }), [language, theme])

    return <DisplayContext.Provider value={value}>{children}</DisplayContext.Provider>
}

// Only components within DisplayProvider may access the display preferences.
export function useDisplay() {
    const context = useContext(DisplayContext)

    if (!context) {
        throw new Error("useDisplay must be used within DisplayProvider")
    }

    return context
}

// Access one complete locale dictionary to avoid mixed-language interface strings.
export function useContent() {
    const { language } = useDisplay()
    return SiteContent[language]
}
