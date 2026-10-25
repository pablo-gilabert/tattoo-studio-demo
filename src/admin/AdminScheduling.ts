import type { BookingRequest, StudioDatabase, TattooBooking, TattooService, Weekday } from "./AdminTypes"

// All comparisons use local YYYY-MM-DD and HH:mm values, avoiding UTC day shifts.
export function localToday(): string {
    const date = new Date()
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`
}

export function clockToMinutes(clock: string): number {
    const [hours, minutes] = clock.split(":").map(Number)
    return (hours ?? 0) * 60 + (minutes ?? 0)
}

export function minutesToClock(minutes: number): string {
    return `${String(Math.floor(minutes / 60)).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}`
}

export function findService(database: StudioDatabase, id: string): TattooService | undefined {
    return database.services.find((service) => service.id === id)
}

export function dayNumber(date: string): Weekday {
    return new Date(`${date}T12:00:00`).getDay() as Weekday
}

export function isValidDate(date: string): boolean {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return false
    const parsed = new Date(`${date}T12:00:00`)
    return !Number.isNaN(parsed.getTime()) && `${parsed.getFullYear()}-${String(parsed.getMonth() + 1).padStart(2, "0")}-${String(parsed.getDate()).padStart(2, "0")}` === date
}

export function availableTimes(database: StudioDatabase, date: string, serviceId: string, ignoreBookingId?: string): string[] {
    const service = findService(database, serviceId)
    if (!service || !isValidDate(date) || date < localToday()) return []
    const hours = database.hours[dayNumber(date)]
    if (!hours?.isOpen) return []
    const start = clockToMinutes(hours.start)
    const end = clockToMinutes(hours.end)
    const now = new Date()
    const times: string[] = []
    for (let minute = start; minute + service.duration <= end; minute += 30) {
        if (date === localToday() && minute <= now.getHours() * 60 + now.getMinutes()) continue
        const overlap = database.bookings.some((booking) => {
            if (booking.id === ignoreBookingId || booking.status !== "booked" || booking.date !== date) return false
            // Preserve the original duration for appointments whose services were removed.
            const existingDuration = booking.duration || findService(database, booking.serviceId)?.duration || 60
            const occupiedStart = clockToMinutes(booking.time)
            return minute < occupiedStart + existingDuration && minute + service.duration > occupiedStart
        })
        if (!overlap) times.push(minutesToClock(minute))
    }
    return times
}

export function validBooking(database: StudioDatabase, booking: BookingRequest, ignoreBookingId?: string): boolean {
    return Boolean(booking.customerName.trim().length >= 2 && booking.customerPhone.trim().length >= 6 && availableTimes(database, booking.date, booking.serviceId, ignoreBookingId).includes(booking.time))
}

export function bookedOnDate(bookings: TattooBooking[], date: string): TattooBooking[] {
    return bookings.filter((booking) => booking.date === date).sort((a, b) => a.time.localeCompare(b.time))
}

export function formatPrice(price: number): string {
    return new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 }).format(price)
}

// The public footer and contact page reflect edited opening hours immediately.
export function formatOpeningHours(database: StudioDatabase, language: "es" | "en"): string {
    const days = language === "es" ? ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"] : ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    const groups = new Map<string, string[]>()
    for (const day of [1, 2, 3, 4, 5, 6, 0] as Weekday[]) {
        const hours = database.hours[day]
        if (!hours.isOpen) continue
        const times = `${hours.start}–${hours.end}`
        groups.set(times, [...(groups.get(times) ?? []), days[day] ?? ""])
    }
    return [...groups].map(([times, daysForHours]) => `${daysForHours.join(", ")} · ${times}`).join(" / ") || (language === "es" ? "Sin atención" : "Closed")
}
