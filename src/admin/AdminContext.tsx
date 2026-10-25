import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react"

import { createStudioSeed } from "./AdminSeed"
import { availableTimes, findService, validBooking } from "./AdminScheduling"
import type { BookingRequest, BookingResult, OpeningHours, StudioDatabase, TattooBooking, TattooService, Weekday } from "./AdminTypes"

const STORAGE_KEY = "umbral-admin-database-v1"
const SESSION_KEY = "umbral-admin-session-v1"

// This identity is public by design. It is NOT production authentication.
export const DEMO_ADMIN = { email: "admin@demo.tattoo", password: "Demo2026!" } as const

type AdminContextValue = {
    database: StudioDatabase
    loggedIn: boolean
    login: (email: string, password: string) => boolean
    logout: () => void
    addBooking: (request: BookingRequest, depositPaid?: boolean) => BookingResult
    editBooking: (id: string, patch: Partial<BookingRequest>) => BookingResult
    updateBooking: (id: string, patch: Partial<Pick<TattooBooking, "depositPaid" | "status">>) => void
    deleteBooking: (id: string) => void
    setHours: (day: Weekday, hours: OpeningHours) => boolean
    upsertService: (service: TattooService) => boolean
    deleteService: (id: string) => void
    resetDemo: () => void
}

const AdminContext = createContext<AdminContextValue | null>(null)

// Read one versioned database while rejecting malformed/obsolete localStorage payloads.
function readDatabase(): StudioDatabase {
    try {
        const content = localStorage.getItem(STORAGE_KEY)
        if (!content) return createStudioSeed()
        const input: unknown = JSON.parse(content)
        if (!input || typeof input !== "object") return createStudioSeed()
        const value = input as Partial<StudioDatabase>
        if (value.version !== 1 || !Array.isArray(value.services) || !Array.isArray(value.bookings) || !value.hours) return createStudioSeed()
        if (value.services.some((service) => !service || typeof service.id !== "string" || typeof service.duration !== "number" || typeof service.price !== "number" || !service.name?.es || !service.name?.en || !service.description)) return createStudioSeed()
        if (value.bookings.some((booking) => !booking || typeof booking.id !== "string" || typeof booking.date !== "string" || typeof booking.time !== "string" || typeof booking.duration !== "number" || typeof booking.customerName !== "string" || typeof booking.customerPhone !== "string" || !["booked", "cancelled"].includes(booking.status))) return createStudioSeed()
        if ([0, 1, 2, 3, 4, 5, 6].some((day) => {
            const hours = value.hours?.[day as Weekday]
            return !hours || typeof hours.isOpen !== "boolean" || typeof hours.start !== "string" || typeof hours.end !== "string"
        })) return createStudioSeed()
        return value as StudioDatabase
    } catch {
        return createStudioSeed()
    }
}

function readSession(): boolean {
    try {
        return sessionStorage.getItem(SESSION_KEY) === "demo-admin"
    } catch {
        return false
    }
}

export function AdminProvider({ children }: { children: ReactNode }) {
    const [database, setDatabase] = useState<StudioDatabase>(readDatabase)
    const [loggedIn, setLoggedIn] = useState<boolean>(readSession)

    // Frontend-only storage persists demo changes, but cannot synchronize real appointments.
    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(database))
        } catch {
            // Private browsing restrictions leave the demo usable in memory.
        }
    }, [database])

    function login(email: string, password: string): boolean {
        if (email.trim().toLowerCase() !== DEMO_ADMIN.email || password !== DEMO_ADMIN.password) return false
        setLoggedIn(true)
        try { sessionStorage.setItem(SESSION_KEY, "demo-admin") } catch { /* Optional session persistence. */ }
        return true
    }

    function logout() {
        setLoggedIn(false)
        try { sessionStorage.removeItem(SESSION_KEY) } catch { /* Optional session persistence. */ }
    }

    function addBooking(request: BookingRequest, depositPaid = false): BookingResult {
        if (!validBooking(database, request)) return { ok: false, error: "conflict" }
        const duration = findService(database, request.serviceId)?.duration ?? 30
        const booking: TattooBooking = {
            ...request,
            id: crypto.randomUUID(),
            createdAt: new Date().toISOString(),
            duration,
            depositPaid,
            status: "booked",
        }
        setDatabase((previous) => ({ ...previous, bookings: [...previous.bookings, booking] }))
        return { ok: true }
    }

    function editBooking(id: string, patch: Partial<BookingRequest>): BookingResult {
        const booking = database.bookings.find((entry) => entry.id === id)
        if (!booking) return { ok: false, error: "invalid" }
        const next = { ...booking, ...patch }
        if (!next.customerName.trim() || next.customerPhone.trim().length < 6) return { ok: false, error: "invalid" }
        const slotChanged = next.date !== booking.date || next.time !== booking.time || next.serviceId !== booking.serviceId
        if (slotChanged && !availableTimes(database, next.date, next.serviceId, id).includes(next.time)) return { ok: false, error: "conflict" }
        const duration = slotChanged ? findService(database, next.serviceId)?.duration ?? booking.duration : booking.duration
        setDatabase((previous) => ({ ...previous, bookings: previous.bookings.map((item) => item.id === id ? { ...next, duration } : item) }))
        return { ok: true }
    }

    function updateBooking(id: string, patch: Partial<Pick<TattooBooking, "depositPaid" | "status">>) {
        setDatabase((previous) => ({ ...previous, bookings: previous.bookings.map((booking) => booking.id === id ? { ...booking, ...patch } : booking) }))
    }

    function deleteBooking(id: string) {
        setDatabase((previous) => ({ ...previous, bookings: previous.bookings.filter((booking) => booking.id !== id) }))
    }

    function setHours(day: Weekday, hours: OpeningHours): boolean {
        if (hours.isOpen && hours.start >= hours.end) return false
        setDatabase((previous) => ({ ...previous, hours: { ...previous.hours, [day]: hours } }))
        return true
    }

    function upsertService(service: TattooService): boolean {
        if (!service.name.es.trim() || !service.name.en.trim() || !service.description.es.trim() || !service.description.en.trim() || !Number.isFinite(service.price) || service.price < 0 || !Number.isInteger(service.duration) || service.duration < 30 || service.duration > 480 || service.duration % 30 !== 0) return false
        setDatabase((previous) => ({
            ...previous,
            services: previous.services.some((item) => item.id === service.id)
                ? previous.services.map((item) => item.id === service.id ? service : item)
                : [...previous.services, service],
        }))
        return true
    }

    function deleteService(id: string) {
        setDatabase((previous) => ({ ...previous, services: previous.services.filter((service) => service.id !== id) }))
    }

    function resetDemo() {
        setDatabase(createStudioSeed())
    }

    const value = useMemo<AdminContextValue>(() => ({
        database, loggedIn, login, logout, addBooking, editBooking, updateBooking, deleteBooking, setHours, upsertService, deleteService, resetDemo,
    // Handlers intentionally close over the current database for conflict validation.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }), [database, loggedIn])

    return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
}

export function useAdmin(): AdminContextValue {
    const context = useContext(AdminContext)
    if (!context) throw new Error("useAdmin requires AdminProvider")
    return context
}
