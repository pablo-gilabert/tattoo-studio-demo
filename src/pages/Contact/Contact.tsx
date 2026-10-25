import { useState, type FormEvent } from "react"
import { ArrowUpRight, Check, Clock3, Copy, Mail, MapPin, MessageCircle } from "lucide-react"

import { PageHero } from "../../components/PageHero/PageHero"
import { BookingWidget } from "../../components/BookingWidget/BookingWidget"
import { StudioImage } from "../../components/StudioImage/StudioImage"
import { useContent, useDisplay } from "../../context/DisplayContext"
import { useAdmin } from "../../admin/AdminContext"
import { formatOpeningHours } from "../../admin/AdminScheduling"
import { Studio, getWhatsAppUrl } from "../../data/SiteContent"
import { usePageMeta } from "../../hooks/UsePageMeta"

import styles from "./Contact.module.css"

interface ContactForm {
    name: string
    email: string
    style: string
    message: string
}

const emptyForm: ContactForm = {
    name: "",
    email: "",
    style: "",
    message: "",
}

// The form prepares an inquiry locally; it never submits private data to a server.
export function Contact() {
    const t = useContent()
    const c = t.contact
    const { language } = useDisplay()
    const { database } = useAdmin()
    const [form, setForm] = useState<ContactForm>(emptyForm)
    const [submittedForm, setSubmittedForm] = useState<ContactForm | null>(null)
    const [copied, setCopied] = useState(false)

    usePageMeta(t.pageNames[5], t.pageDescriptions[5])

    // Keep submitted fields separate from translated presentation text.
    const styleLabel = submittedForm?.style === "unsure"
        ? c.unsure
        : submittedForm?.style === "Realism"
            ? t.gallery.realism
            : submittedForm?.style || c.inquiryGeneral
    const preparedMessage = submittedForm
        ? `${c.inquiryIntro} ${submittedForm.name}. ${c.inquiryEmail} ${submittedForm.email}. ` +
            `${c.inquiryInterested} ${styleLabel}. ${c.inquiryIdea}: ${submittedForm.message}`
        : ""

    // Compose the message using the currently selected interface language.
    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        setSubmittedForm({ ...form })
        setCopied(false)
    }

    async function copyMessage() {
        try {
            await navigator.clipboard.writeText(preparedMessage)
            setCopied(true)
        } catch {
            setCopied(false)
        }
    }

    return (
        <>
            <PageHero
                eyebrow={c.eyebrow}
                title={<>{c.title} <em>{c.emphasis}</em></>}
                description={c.description}
                number="06"
            />

            <section className="section-pad">
                <div className={`container ${styles.grid}`}>
                    <div className={styles.info}>
                        <span className="eyebrow"><span className="eyebrow-line" />{c.infoEyebrow}</span>
                        <h2>{c.infoTitle} <em>{c.infoEmphasis}</em></h2>
                        <p>{c.infoBody}</p>
                        <div className={styles.methods}>
                            <div>
                                <MapPin size={23} />
                                <span><strong>{c.visit}</strong><small>{Studio.address}</small></span>
                            </div>
                            <div>
                                <Clock3 size={23} />
                                <span><strong>{c.hours}</strong><small>{formatOpeningHours(database, language)}</small></span>
                            </div>
                            <div>
                                <MessageCircle size={23} />
                                <span><strong>{c.whatsapp}</strong><small>{Studio.phone}</small></span>
                            </div>
                            <div>
                                <Mail size={23} />
                                <span><strong>{c.email}</strong><small>{Studio.email}</small></span>
                            </div>
                        </div>
                        <div className={styles.note}>✳ {c.note}</div>
                    </div>

                    <div className={styles.formPanel}>
                        <span className="eyebrow"><span className="eyebrow-line" />{c.formEyebrow}</span>
                        <h3>{c.formTitle}</h3>
                        <form onSubmit={handleSubmit} className={styles.form}>
                            <div className={styles.fieldsRow}>
                                <label>
                                    {c.name}
                                    <input
                                        name="name"
                                        type="text"
                                        autoComplete="name"
                                        minLength={2}
                                        maxLength={80}
                                        required
                                        placeholder={c.namePlaceholder}
                                        value={form.name}
                                        onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
                                    />
                                </label>
                                <label>
                                    {c.emailLabel}
                                    <input
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        maxLength={120}
                                        required
                                        placeholder={c.emailPlaceholder}
                                        value={form.email}
                                        onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
                                    />
                                </label>
                            </div>
                            <label>
                                {c.style}
                                <select
                                    name="style"
                                    value={form.style}
                                    onChange={(event) => setForm((current) => ({ ...current, style: event.target.value }))}
                                >
                                    <option value="">{c.choose}</option>
                                    <option value="Fineline">Fineline</option>
                                    <option value="Blackwork">Blackwork</option>
                                    <option value="Ornamental">Ornamental</option>
                                    <option value="Realism">{t.gallery.realism}</option>
                                    <option value="unsure">{c.unsure}</option>
                                </select>
                            </label>
                            <label>
                                {c.message}
                                <textarea
                                    name="message"
                                    rows={6}
                                    minLength={10}
                                    maxLength={1200}
                                    required
                                    placeholder={c.messagePlaceholder}
                                    value={form.message}
                                    onChange={(event) => setForm((current) => ({ ...current, message: event.target.value }))}
                                />
                            </label>
                            <button type="submit" className="button button-accent">
                                {c.submit} <ArrowUpRight size={18} />
                            </button>
                            <small>{c.formDisclaimer}</small>
                        </form>

                        {preparedMessage && (
                            <div className={styles.prepared} role="status">
                                <strong>{c.prepared}</strong>
                                <p>{preparedMessage}</p>
                                <div className={styles.preparedActions}>
                                    <button type="button" className="button button-outline" onClick={copyMessage}>
                                        {copied ? <Check size={17} /> : <Copy size={17} />}
                                        {copied ? c.copied : c.copy}
                                    </button>
                                    <a className="text-link" href={getWhatsAppUrl(preparedMessage)} target="_blank" rel="noopener noreferrer">
                                        {c.openWhatsapp} <ArrowUpRight size={17} />
                                    </a>
                                </div>
                                <small>{c.numberDisclaimer}</small>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            <BookingWidget />

            <section className={styles.photo}>
                <StudioImage fileName="atelier.webp" alt={c.photoAlt} loading="lazy" />
                <span>{c.photoCaption}</span>
            </section>
        </>
    )
}
