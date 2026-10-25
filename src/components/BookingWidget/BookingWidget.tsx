import { useMemo, useState, type FormEvent } from "react"
import { CalendarDays } from "lucide-react"

import { useAdmin } from "../../admin/AdminContext"
import { adminText } from "../../admin/AdminI18n"
import { availableTimes, dayNumber, formatPrice } from "../../admin/AdminScheduling"
import { useDisplay } from "../../context/DisplayContext"
import styles from "./BookingWidget.module.css"

// Public visitors can try a reservation only within this browser's demo database.
function futureDays(count: number): string[] {
    const days: string[] = []
    const today = new Date()
    today.setHours(12, 0, 0, 0)
    for (let i = 0; i < count; i++) {
        const day = new Date(today)
        day.setDate(day.getDate() + i)
        days.push(`${day.getFullYear()}-${String(day.getMonth() + 1).padStart(2, "0")}-${String(day.getDate()).padStart(2, "0")}`)
    }
    return days
}

export function BookingWidget() {
    const { language } = useDisplay()
    const { database, addBooking } = useAdmin()
    const a = (key: Parameters<typeof adminText>[1]) => adminText(language, key)
    const [serviceId, setServiceId] = useState("")
    const [selectedDate, setSelectedDate] = useState("")
    const [time, setTime] = useState("")
    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")
    const [note, setNote] = useState("")
    const [feedback, setFeedback] = useState("")

    // Display only dates that the administrator marked as open.
    const days = useMemo(() => futureDays(45).filter((date) => database.hours[dayNumber(date)].isOpen), [database.hours])
    const service = database.services.find((entry) => entry.id === serviceId)
    const selected = days.includes(selectedDate) ? selectedDate : days[0] ?? ""
    const chosenService = service?.id ?? database.services[0]?.id ?? ""
    const times = selected && chosenService ? availableTimes(database, selected, chosenService) : []
    const chosenTime = times.includes(time) ? time : times[0] ?? ""

    function submit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        if (!selected || !chosenService || !chosenTime || name.trim().length < 2 || phone.trim().length < 6) {
            setFeedback(a("invalid"))
            return
        }
        const result = addBooking({ date: selected, time: chosenTime, serviceId: chosenService, customerName: name.trim(), customerPhone: phone.trim(), customerEmail: email.trim(), note: note.trim() })
        if (!result.ok) { setFeedback(a("bookingConflict")); return }
        setFeedback(a("publicBookingSuccess"))
        setName("")
        setPhone("")
        setEmail("")
        setNote("")
        setTime("")
    }

    return (
        <section className={styles.section} aria-label={a("publicBookingTitle")}>
            <div className="container">
                <div className={styles.heading}><CalendarDays size={27} /><div><h2>{a("publicBookingTitle")}</h2><p>{a("publicBookingHint")}</p></div></div>
                <form className={styles.form} onSubmit={submit}>
                    <label>{a("service")}
                        <select value={chosenService} onChange={(event) => { setServiceId(event.target.value); setTime(""); setFeedback("") }} required>
                            {database.services.map((item) => <option value={item.id} key={item.id}>{item.name[language]} · {formatPrice(item.price)}</option>)}
                        </select>
                    </label>
                    <label>{a("bookingDate")}
                        <select value={selected} required onChange={(event) => { setSelectedDate(event.target.value); setTime(""); setFeedback("") }}>
                            {days.map((day) => <option value={day} key={day}>{day}</option>)}
                        </select>
                    </label>
                    <label>{a("bookingTime")}
                        <select value={chosenTime} disabled={!times.length} required onChange={(event) => { setTime(event.target.value); setFeedback("") }}>
                            {times.map((clock) => <option value={clock} key={clock}>{clock}</option>)}
                        </select>
                    </label>
                    <label>{a("publicFormName")}
                        <input type="text" required minLength={2} maxLength={100} value={name} onChange={(event) => { setName(event.target.value); setFeedback("") }} />
                    </label>
                    <label>{a("publicFormPhone")}
                        <input type="tel" required minLength={6} maxLength={40} value={phone} onChange={(event) => { setPhone(event.target.value); setFeedback("") }} />
                    </label>
                    <label>{a("clientEmail")}
                        <input type="email" maxLength={140} value={email} onChange={(event) => setEmail(event.target.value)} />
                    </label>
                    <label className={styles.wide}>{a("note")}
                        <textarea rows={3} maxLength={900} value={note} onChange={(event) => setNote(event.target.value)} />
                    </label>
                    <div className={styles.bottom}>
                        <div><strong>{service?.duration ?? database.services[0]?.duration ?? 0} {a("minutes")}</strong><p>{a("publicBookingNote")}</p></div>
                        <button type="submit" disabled={!times.length || !database.services.length}>{a("publicBook")} ↗</button>
                    </div>
                    {feedback && <p className={styles.feedback} role="status">{feedback}</p>}
                    {times.length === 0 && <p className={styles.feedback}>{a("noSlots")}</p>}
                    {days.length === 0 && <p className={styles.feedback}>{a("closed")}</p>}
                </form>
                <small className={styles.disclaimer}>{a("browserOnly")} {a("loginNote")}</small>
            </div>
        </section>
    )
}
