import { Pencil, Plus, Trash2 } from "lucide-react"

import { confirmAction, openEditor, showAlert } from "../../admin/AdminAlerts"
import { useAdmin } from "../../admin/AdminContext"
import { adminText } from "../../admin/AdminI18n"
import { formatPrice } from "../../admin/AdminScheduling"
import type { TattooService } from "../../admin/AdminTypes"
import { useDisplay } from "../../context/DisplayContext"
import shared from "../../admin/AdminShared.module.css"

// Service editors update one bilingual catalog consumed by the public pages and booking widget.
export function AdminServices() {
    const { language } = useDisplay()
    const { database, upsertService, deleteService } = useAdmin()
    const a = (key: Parameters<typeof adminText>[1]) => adminText(language, key)

    async function edit(existing?: TattooService) {
        const result = await openEditor({
            title: existing ? a("editService") : a("addService"),
            fields: [
                { name: "nameEs", label: a("serviceNameEs"), value: existing?.name.es ?? "", required: true, maxLength: 90 },
                { name: "nameEn", label: a("serviceNameEn"), value: existing?.name.en ?? "", required: true, maxLength: 90 },
                { name: "descriptionEs", label: a("serviceDescriptionEs"), kind: "textarea", value: existing?.description.es ?? "", required: true, wide: true },
                { name: "descriptionEn", label: a("serviceDescriptionEn"), kind: "textarea", value: existing?.description.en ?? "", required: true, wide: true },
                { name: "price", label: a("servicePrice"), kind: "number", value: existing?.price ?? 0, min: 0, step: 100, required: true },
                { name: "duration", label: a("duration"), kind: "number", value: existing?.duration ?? 60, min: 30, max: 480, step: 30, required: true },
            ],
            confirmText: a("save"), cancelText: a("cancel"), invalidText: a("invalid"),
            validate: (values) => Number(values.duration) % 30 || Number(values.duration) < 30 || Number(values.duration) > 480 || Number(values.price) < 0 ? a("invalid") : null,
        })
        if (!result) return
        const service: TattooService = {
            id: existing?.id ?? crypto.randomUUID(),
            name: { es: String(result.nameEs).trim(), en: String(result.nameEn).trim() },
            description: { es: String(result.descriptionEs).trim(), en: String(result.descriptionEn).trim() },
            price: Number(result.price), duration: Number(result.duration),
        }
        if (upsertService(service)) void showAlert(a("serviceSaved"))
    }

    async function remove(service: TattooService) {
        if (!await confirmAction({ title: a("removeService"), text: service.name[language], confirmText: a("delete"), cancelText: a("cancel"), destructive: true })) return
        deleteService(service.id)
    }

    return (
        <>
            <div className={shared.heading}>
                <div><h1>{a("servicesTitle")}</h1><p>{a("servicesHint")}</p></div>
                <button className={shared.button} type="button" onClick={() => void edit()}><Plus size={18} /> {a("addService")}</button>
            </div>
            <div className={shared.card}>
                <div className={shared.tableScroll}>
                    <table className={shared.table}>
                        <thead><tr><th>{a("service")}</th><th>{a("servicePrice")}</th><th>{a("duration")}</th><th /></tr></thead>
                        <tbody>
                            {database.services.map((service) => (
                                <tr key={service.id}>
                                    <td><strong>{service.name[language]}</strong><small>{service.description[language]}</small></td>
                                    <td>{formatPrice(service.price)}</td>
                                    <td>{service.duration} {a("minutes")}</td>
                                    <td><div className={shared.toolbar}>
                                        <button className={shared.secondaryButton} type="button" onClick={() => void edit(service)}><Pencil size={14} />{a("edit")}</button>
                                        <button className={shared.dangerButton} type="button" onClick={() => void remove(service)}><Trash2 size={14} />{a("delete")}</button>
                                    </div></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {!database.services.length && <p className={shared.notice}>{a("noServices")}</p>}
            </div>
        </>
    )
}
