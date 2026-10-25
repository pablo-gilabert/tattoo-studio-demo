import { useMemo, useState } from "react"
import { CalendarDays, Plus } from "lucide-react"
import Swal from "sweetalert2"

import { confirmAction, createAlertOption, openEditor, showAlert } from "../../admin/AdminAlerts"
import { useAdmin } from "../../admin/AdminContext"
import { adminText } from "../../admin/AdminI18n"
import { availableTimes, bookedOnDate, clockToMinutes, dayNumber, findService, localToday, minutesToClock } from "../../admin/AdminScheduling"
import type { BookingRequest, TattooBooking } from "../../admin/AdminTypes"
import { useDisplay } from "../../context/DisplayContext"
import shared from "../../admin/AdminShared.module.css"
import styles from "./AdminDashboard.module.css"

// Select a near-future working day so the schedule is populated on a first demo visit.
function initialDay(isOpen: (day: number) => boolean): string {
    const date = new Date()
    date.setHours(12, 0, 0, 0)
    for (let offset = 0; offset < 14; offset++) {
        const day = new Date(date)
        day.setDate(day.getDate() + offset)
        const next = `${day.getFullYear()}-${String(day.getMonth() + 1).padStart(2, "0")}-${String(day.getDate()).padStart(2, "0")}`
        if (isOpen(day.getDay())) return next
    }
    return localToday()
}

// Date, service and slot choices are linked inside one SweetAlert2 form.
export function AdminDashboard() {
    const { language } = useDisplay()
    const { database, addBooking, editBooking, updateBooking, deleteBooking } = useAdmin()
    const a = (key: Parameters<typeof adminText>[1]) => adminText(language, key)
    const [date, setDate] = useState(() => initialDay((day) => database.hours[day as keyof typeof database.hours].isOpen))
    const daily = useMemo(() => bookedOnDate(database.bookings, date), [database.bookings, date])
    const active = daily.filter((booking) => booking.status === "booked")
    const hours = database.hours[dayNumber(date)]

    // Every half-hour cell identifies its active booking, including multi-hour tattoos.
    const slots = useMemo(() => {
        if (!hours?.isOpen || hours.start >= hours.end) return []
        const array: Array<{ time: string; booking?: TattooBooking; free: boolean }> = []
        for (let minute = clockToMinutes(hours.start); minute < clockToMinutes(hours.end); minute += 30) {
            const booking = active.find((item) => clockToMinutes(item.time) <= minute && minute < clockToMinutes(item.time) + item.duration)
            const time = minutesToClock(minute)
            const free = !booking && date >= localToday() && (date !== localToday() || minute > new Date().getHours() * 60 + new Date().getMinutes())
            array.push({ time, booking, free })
        }
        return array
    // active is a derived list from the selected day.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [database, date])

    async function bookingDialog(existing?: TattooBooking, presetTime?: string) {
        if (!database.services.length) {
            void showAlert(a("noServices"), "info")
            return
        }
        const fields = [
            { name: "date", label: a("bookingDate"), kind: "date" as const, value: existing?.date ?? date, required: true },
            { name: "serviceId", label: a("service"), kind: "select" as const, value: existing?.serviceId ?? database.services[0]?.id ?? "", options: database.services.map((service) => ({ value: service.id, label: service.name[language] })), required: true },
            { name: "time", label: a("bookingTime"), kind: "select" as const, value: existing?.time ?? presetTime ?? "", options: [], required: true },
            { name: "customerName", label: a("client"), value: existing?.customerName ?? "", required: true, maxLength: 100 },
            { name: "customerPhone", label: a("phone"), kind: "tel" as const, value: existing?.customerPhone ?? "", required: true, maxLength: 40 },
            { name: "customerEmail", label: a("clientEmail"), kind: "email" as const, value: existing?.customerEmail ?? "", maxLength: 140 },
            { name: "note", label: a("note"), kind: "textarea" as const, value: existing?.note ?? "", wide: true },
            { name: "depositPaid", label: a("deposit"), kind: "checkbox" as const, value: existing?.depositPaid ?? false, wide: true },
        ]
        const values = await openEditor({
            title: existing ? a("editBooking") : a("addBooking"),
            fields,
            confirmText: a("save"), cancelText: a("cancel"), invalidText: a("invalid"),
            onOpen: (form) => {
                const dateInput = form.querySelector<HTMLInputElement>('[name="date"]')
                const serviceSelect = form.querySelector<HTMLSelectElement>('[name="serviceId"]')
                const timeSelect = form.querySelector<HTMLSelectElement>('[name="time"]')
                if (!dateInput || !serviceSelect || !timeSelect) return
                const refresh = () => {
                    const old = timeSelect.value || existing?.time || presetTime || ""
                    const choices = availableTimes(database, dateInput.value, serviceSelect.value, existing?.id)
                    if (existing && dateInput.value === existing.date && serviceSelect.value === existing.serviceId && !choices.includes(existing.time)) choices.unshift(existing.time)
                    timeSelect.replaceChildren(...choices.map((clock) => createAlertOption(clock, clock)))
                    if (choices.includes(old)) timeSelect.value = old
                    if (!choices.length) timeSelect.add(createAlertOption("", a("noSlots")))
                }
                dateInput.addEventListener("change", refresh)
                serviceSelect.addEventListener("change", refresh)
                refresh()
            },
            validate: (v) => String(v.customerName).trim().length < 2 || String(v.customerPhone).trim().length < 6 || !String(v.time) ? a("invalid") : null,
        })
        if (!values) return
        const request: BookingRequest = {
            date: String(values.date), time: String(values.time), serviceId: String(values.serviceId),
            customerName: String(values.customerName).trim(), customerPhone: String(values.customerPhone).trim(),
            customerEmail: String(values.customerEmail).trim(), note: String(values.note).trim(),
        }
        const result = existing ? editBooking(existing.id, request) : addBooking(request, values.depositPaid === true)
        if (!result.ok) { void showAlert(a("bookingConflict"), "error"); return }
        if (existing) updateBooking(existing.id, { depositPaid: values.depositPaid === true })
        setDate(request.date)
        void showAlert(a(existing ? "bookingUpdated" : "bookingSaved"))
    }

    async function changeStatus(booking: TattooBooking, action: "deposit" | "cancel" | "restore" | "delete") {
        const title = a(action === "deposit" ? "depositToggle" : action === "cancel" ? "cancelBooking" : action === "restore" ? "restoreBooking" : "deleteBooking")
        if (!await confirmAction({ title, text: `${booking.customerName} · ${booking.date} ${booking.time}`, confirmText: a("confirm"), cancelText: a("cancel"), destructive: action === "delete" || action === "cancel" })) return
        if (action === "delete") deleteBooking(booking.id)
        if (action === "deposit") updateBooking(booking.id, { depositPaid: !booking.depositPaid })
        if (action === "cancel") updateBooking(booking.id, { status: "cancelled" })
        if (action === "restore") {
            if (!availableTimes(database, booking.date, booking.serviceId, booking.id).includes(booking.time)) { void showAlert(a("bookingConflict"), "error"); return }
            updateBooking(booking.id, { status: "booked" })
        }
    }

    // Display customer details safely using textContent, never interpolated HTML.
    async function details(booking: TattooBooking) {
        const content = document.createElement("div")
        content.className = "salonAlertDetails"
        const values: Array<[string, string]> = [
            [a("client"), booking.customerName], [a("phone"), booking.customerPhone],
            [a("clientEmail"), booking.customerEmail || "—"],
            [a("service"), findService(database, booking.serviceId)?.name[language] ?? "—"],
            [a("bookingDate"), booking.date], [a("bookingTime"), booking.time],
            [a("deposit"), booking.depositPaid ? a("deposits") : a("pending")],
            [a("note"), booking.note || "—"],
        ]
        values.forEach(([label, value]) => {
            const row = document.createElement("p")
            const strong = document.createElement("strong")
            strong.textContent = `${label}: `
            row.append(strong, document.createTextNode(value))
            content.append(row)
        })
        const tools = document.createElement("div")
        tools.className = "salonAlertTools"
        const actions: Array<{ label: string; do: () => void }> = [
            { label: a("edit"), do: () => void bookingDialog(booking) },
            { label: booking.depositPaid ? a("pending") : a("deposits"), do: () => void changeStatus(booking, "deposit") },
            { label: booking.status === "booked" ? a("cancel") : a("confirmed"), do: () => void changeStatus(booking, booking.status === "booked" ? "cancel" : "restore") },
            { label: a("delete"), do: () => void changeStatus(booking, "delete") },
        ]
        actions.forEach((action) => {
            const button = document.createElement("button")
            button.type = "button"
            button.textContent = action.label
            button.addEventListener("click", () => { Swal.close(); action.do() })
            tools.append(button)
        })
        content.append(tools)
        await Swal.fire({ title: a("bookingDetails"), html: content, showCloseButton: true, showConfirmButton: false, customClass: { popup: "salonAlertPopup" } })
    }

    return (
        <>
            <div className={shared.heading}>
                <div><h1>{a("overview")}</h1><p>{a("dashboardHint")}</p></div>
                <button type="button" className={shared.button} onClick={() => void bookingDialog()}><Plus size={18} />{a("addBooking")}</button>
            </div>
            <div className={shared.toolbar}>
                <label htmlFor="admin-date">{a("date")}</label>
                <input id="admin-date" type="date" value={date} onChange={(event) => setDate(event.target.value)} />
                <button type="button" className={shared.secondaryButton} onClick={() => setDate(localToday())}><CalendarDays size={16} />{a("today")}</button>
            </div>
            <div className={shared.grid}>
                <div className={shared.card}><span className={shared.muted}>{a("occupied")}</span><p className={shared.statValue}>{active.length}</p></div>
                <div className={shared.card}><span className={shared.muted}>{a("available")}</span><p className={shared.statValue}>{slots.filter((slot) => slot.free).length}</p></div>
                <div className={shared.card}><span className={shared.muted}>{a("deposits")}</span><p className={shared.statValue}>{active.filter((booking) => booking.depositPaid).length}</p></div>
            </div>
            <section className={`${shared.card} ${styles.agenda}`}>
                <h2>{a("agenda")}</h2><p className={shared.muted}>{a("agendaHelp")}</p>
                <div className={styles.slots}>
                    {slots.map((slot) => (
                        <button type="button" key={slot.time}
                            className={`${styles.slot} ${slot.booking ? styles.occupied : slot.free ? styles.free : styles.unavailable}`}
                            disabled={!slot.booking && !slot.free}
                            onClick={() => slot.booking ? void details(slot.booking) : void bookingDialog(undefined, slot.time)}>
                            <strong>{slot.time}</strong>
                            <span>{slot.booking ? `${a("booked")} · ${slot.booking.customerName}` : slot.free ? a("free") : a("closed")}</span>
                        </button>
                    ))}
                    {!slots.length && <p className={shared.muted}>{a("closed")}</p>}
                </div>
            </section>
            <section className={`${shared.card} ${styles.agenda}`}>
                <h2>{a("appointments")}</h2>
                <div className={shared.tableScroll}>
                    <table className={shared.table}>
                        <thead><tr><th>{a("bookingTime")}</th><th>{a("client")}</th><th>{a("service")}</th><th>{a("deposit")}</th><th /></tr></thead>
                        <tbody>
                            {daily.map((booking) => (
                                <tr key={booking.id}>
                                    <td><strong>{booking.time}</strong><small>{booking.status === "booked" ? a("confirmed") : a("cancelled")}</small></td>
                                    <td>{booking.customerName}<small>{booking.customerPhone}</small></td>
                                    <td>{findService(database, booking.serviceId)?.name[language] ?? "—"}</td>
                                    <td>{booking.depositPaid ? a("deposits") : a("pending")}</td>
                                    <td><button type="button" className={shared.secondaryButton} onClick={() => void details(booking)}>{a("edit")}</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {!daily.length && <p className={shared.muted}>{a("emptyBookings")}</p>}
            </section>
            <p className={shared.notice}>{a("peopleNote")}</p>
        </>
    )
}
