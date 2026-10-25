import { Clock3, Pencil } from "lucide-react"

import { openEditor, showAlert } from "../../admin/AdminAlerts"
import { useAdmin } from "../../admin/AdminContext"
import { adminText } from "../../admin/AdminI18n"
import type { Weekday } from "../../admin/AdminTypes"
import { useDisplay } from "../../context/DisplayContext"
import shared from "../../admin/AdminShared.module.css"

const Weekdays: Weekday[] = [1, 2, 3, 4, 5, 6, 0]

// Each day is edited in one SweetAlert2 dialog instead of an inline form.
export function AdminHours() {
    const { language } = useDisplay()
    const { database, setHours } = useAdmin()
    const a = (key: Parameters<typeof adminText>[1]) => adminText(language, key)

    async function edit(day: Weekday) {
        const hours = database.hours[day]
        const result = await openEditor({
            title: `${a("editHours")} · ${a(`weekday${day}` as Parameters<typeof adminText>[1])}`,
            fields: [
                { name: "isOpen", label: a("enabled"), kind: "checkbox", value: hours.isOpen, wide: true },
                { name: "start", label: a("opens"), kind: "time", value: hours.start, required: true },
                { name: "end", label: a("closes"), kind: "time", value: hours.end, required: true },
            ],
            confirmText: a("save"), cancelText: a("cancel"), invalidText: a("invalid"),
            validate: (values) => values.isOpen === true && String(values.start) >= String(values.end) ? a("invalidHours") : null,
        })
        if (!result) return
        if (setHours(day, { isOpen: result.isOpen === true, start: String(result.start), end: String(result.end) })) void showAlert(a("hoursSaved"))
    }

    return (
        <>
            <div className={shared.heading}>
                <div><h1>{a("hoursTitle")}</h1><p>{a("hoursHint")}</p></div>
                <Clock3 size={30} color="var(--color-accent)" />
            </div>
            <div className={shared.card}>
                <div className={shared.tableScroll}>
                    <table className={shared.table}>
                        <thead><tr><th>{a("date")}</th><th>{a("enabled")}</th><th>{a("opens")}</th><th>{a("closes")}</th><th /></tr></thead>
                        <tbody>
                            {Weekdays.map((day) => (
                                <tr key={day}>
                                    <td><strong>{a(`weekday${day}` as Parameters<typeof adminText>[1])}</strong></td>
                                    <td><span className={shared.pill}>{database.hours[day].isOpen ? a("confirmed") : a("closed")}</span></td>
                                    <td>{database.hours[day].isOpen ? database.hours[day].start : "—"}</td>
                                    <td>{database.hours[day].isOpen ? database.hours[day].end : "—"}</td>
                                    <td><button type="button" onClick={() => void edit(day)} className={shared.secondaryButton}><Pencil size={14} />{a("edit")}</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <p className={shared.notice}>{a("savedAppointments")}</p>
        </>
    )
}
