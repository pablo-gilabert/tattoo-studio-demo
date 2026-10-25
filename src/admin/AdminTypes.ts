// The studio's browser-only domain model is deliberately independent of React.
export type Weekday = 0 | 1 | 2 | 3 | 4 | 5 | 6
export type LocalizedText = { es: string; en: string }

export type TattooService = {
    id: string
    name: LocalizedText
    description: LocalizedText
    price: number
    duration: number
}

export type OpeningHours = {
    isOpen: boolean
    start: string
    end: string
}

export type TattooBooking = {
    id: string
    date: string
    time: string
    serviceId: string
    customerName: string
    customerPhone: string
    customerEmail: string
    note: string
    depositPaid: boolean
    duration: number
    status: "booked" | "cancelled"
    createdAt: string
}

export type BookingRequest = Omit<TattooBooking, "id" | "createdAt" | "status" | "depositPaid" | "duration">
export type StudioDatabase = {
    version: 1
    services: TattooService[]
    hours: Record<Weekday, OpeningHours>
    bookings: TattooBooking[]
}

export type BookingResult = { ok: boolean; error?: "conflict" | "invalid" }
