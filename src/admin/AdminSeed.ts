import type { StudioDatabase, TattooBooking, TattooService, Weekday } from "./AdminTypes"

// All people, phone numbers, service fees and appointments are fictional examples.
export const DemoServices: TattooService[] = [
    { id: "fineline", name: { es: "Fineline personalizado", en: "Custom fine-line tattoo" }, description: { es: "Diseño de líneas delicadas y minimalistas.", en: "Delicate, minimalist linework." }, price: 38000, duration: 60 },
    { id: "blackwork", name: { es: "Blackwork", en: "Blackwork" }, description: { es: "Arte de alto contraste en tinta negra.", en: "High-contrast black ink artwork." }, price: 65000, duration: 120 },
    { id: "ornamental", name: { es: "Diseño ornamental", en: "Ornamental tattoo" }, description: { es: "Geometría y composición ornamental.", en: "Ornamental composition and geometry." }, price: 55000, duration: 90 },
    { id: "realism", name: { es: "Realismo", en: "Realism" }, description: { es: "Trabajo de sombreado y detalle.", en: "Detailed shading and realistic artwork." }, price: 90000, duration: 180 },
    { id: "consultation", name: { es: "Consulta de diseño", en: "Design consultation" }, description: { es: "Charla y planificación de una pieza.", en: "Project discussion and tattoo planning." }, price: 0, duration: 30 },
]

function dayOfWeek(date: string): Weekday {
    return new Date(`${date}T12:00:00`).getDay() as Weekday
}

function nextOpenDate(daysAhead: number): string {
    const date = new Date()
    date.setHours(12, 0, 0, 0)
    date.setDate(date.getDate() + daysAhead)
    while (![2, 3, 4, 5, 6].includes(dayOfWeek(`${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,"0")}-${String(date.getDate()).padStart(2,"0")}`))) date.setDate(date.getDate() + 1)
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2,"0")}-${String(date.getDate()).padStart(2,"0")}`
}

// Seed appointments are deliberately scheduled in the future for easy portfolio testing.
export function createStudioSeed(): StudioDatabase {
    const bookings: TattooBooking[] = [
        { id: "demo-booking-1", date: nextOpenDate(1), time: "11:00", serviceId: "fineline", customerName: "Lucía Fernández", customerPhone: "11 0000 0101", customerEmail: "lucia@example.com", note: "Diseño botánico pequeño.", depositPaid: true, duration: 60, status: "booked", createdAt: new Date().toISOString() },
        { id: "demo-booking-2", date: nextOpenDate(1), time: "14:00", serviceId: "blackwork", customerName: "Mateo Rodríguez", customerPhone: "11 0000 0202", customerEmail: "mateo@example.com", note: "Referencia geométrica.", depositPaid: false, duration: 120, status: "booked", createdAt: new Date().toISOString() },
        { id: "demo-booking-3", date: nextOpenDate(2), time: "16:00", serviceId: "consultation", customerName: "Valentina Díaz", customerPhone: "11 0000 0303", customerEmail: "valentina@example.com", note: "Primera consulta.", depositPaid: false, duration: 30, status: "booked", createdAt: new Date().toISOString() },
    ]
    return {
        version: 1,
        services: DemoServices.map((service) => ({ ...service, name: { ...service.name }, description: { ...service.description } })),
        hours: {
            0: { isOpen: false, start: "11:00", end: "20:00" },
            1: { isOpen: false, start: "11:00", end: "20:00" },
            2: { isOpen: true, start: "11:00", end: "20:00" },
            3: { isOpen: true, start: "11:00", end: "20:00" },
            4: { isOpen: true, start: "11:00", end: "20:00" },
            5: { isOpen: true, start: "11:00", end: "20:00" },
            6: { isOpen: true, start: "11:00", end: "20:00" },
        },
        bookings,
    }
}
