import { ArrowUpRight, Check, Clock3, Copy, Mail, MapPin, MessageCircle } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import { PageHero } from '../components/PageHero';
import { createWhatsAppUrl, studio } from '../data/SiteData';
import { usePageMeta } from '../utils/UsePageMeta';

interface ContactForm { name: string; email: string; style: string; message: string; }
const initialForm: ContactForm = { name: '', email: '', style: '', message: '' };

export function ContactPage() {
  usePageMeta('Contacto', 'Iniciá tu consulta en UMBRAL Tattoo Atelier. Proyecto de demostración con datos ficticios.');
  const [form, setForm] = useState<ContactForm>(initialForm);
  const [preparedMessage, setPreparedMessage] = useState('');
  const [copied, setCopied] = useState(false);

  // Demo-only form: generates a message locally. No user information is uploaded or stored.
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const message = `Hola, soy ${form.name}. Mi correo es ${form.email}. Me interesa ${form.style || 'consultar por un tatuaje'}. Mi idea: ${form.message}`;
    setPreparedMessage(message);
    setCopied(false);
  };
  const copyMessage = async () => {
    try { await navigator.clipboard.writeText(preparedMessage); setCopied(true); }
    catch { setCopied(false); }
  };

  return <><PageHero eyebrow="CONTACTO" title={<>Las buenas ideas <em>empiezan hablando.</em></>} description="Contanos qué imaginás. Podemos partir de una referencia, un recuerdo o una idea todavía sin forma." number="06" />
    <section className="sectionPad contactSection"><div className="container contactGrid">
      <div className="contactInfo"><span className="eyebrow"><span className="eyebrowLine" />ENCONTRANOS</span><h2>Hablemos de lo que <em>te inspira.</em></h2><p>Podés completar este formulario de demostración para preparar tu consulta. Antes de usarlo en un negocio real, reemplazá los datos ficticios.</p>
        <div className="contactMethods"><div><MapPin size={22} /><span><strong>Visitanos</strong><small>{studio.address}</small></span></div><div><Clock3 size={22} /><span><strong>Horarios</strong><small>{studio.schedule}</small></span></div><div><MessageCircle size={22} /><span><strong>WhatsApp de ejemplo</strong><small>{studio.phoneLabel}</small></span></div><div><Mail size={22} /><span><strong>Correo ficticio</strong><small>{studio.email}</small></span></div></div>
        <div className="contactNote">✳ Este estudio y sus medios de contacto son ficticios. La demo no recibe mensajes ni toma reservas.</div>
      </div>
      <div className="contactFormWrapper"><span className="formKicker">DEJANOS TU IDEA</span><h3>Empecemos con una charla.</h3><form onSubmit={handleSubmit} className="contactForm">
        <div className="formRow"><label>Tu nombre<input name="name" type="text" autoComplete="name" required minLength={2} maxLength={80} placeholder="¿Cómo te llamás?" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} /></label><label>Tu correo<input name="email" type="email" autoComplete="email" required maxLength={120} placeholder="tu@email.com" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} /></label></div>
        <label>¿Qué estilo te interesa?<select name="style" value={form.style} onChange={(event) => setForm({ ...form, style: event.target.value })}><option value="">Elegí una opción</option><option value="fineline">Fineline</option><option value="blackwork">Blackwork</option><option value="ornamental">Ornamental</option><option value="realismo">Realismo</option><option value="asesoramiento">Todavía no lo sé</option></select></label>
        <label>Contanos tu idea<textarea name="message" rows={6} minLength={10} maxLength={1200} required placeholder="Tu idea, tamaño aproximado, zona del cuerpo, referencias..." value={form.message} onChange={(event) => setForm({ ...form, message: event.target.value })} /></label>
        <button className="button buttonAccent" type="submit">Preparar mi consulta <ArrowUpRight size={18} /></button><small>El formulario es demostrativo: genera un texto en este navegador y no envía información.</small>
      </form>
      {preparedMessage && <div className="preparedMessage" role="status"><strong>¡Tu consulta está preparada!</strong><p>{preparedMessage}</p><div className="preparedButtons"><button type="button" className="button buttonOutlineDark" onClick={copyMessage}>{copied ? <Check size={17} /> : <Copy size={17} />}{copied ? 'Copiado' : 'Copiar mensaje'}</button><a className="textLink" href={createWhatsAppUrl(preparedMessage)} target="_blank" rel="noopener noreferrer">Abrir WhatsApp de ejemplo <ArrowUpRight size={17} /></a></div><small>El número usado es ficticio y no está configurado para recibir mensajes.</small></div>}
      </div>
    </div></section>
    <section className="contactPhoto"><img src="/images/atelier.webp" alt="Detalles de la estética interior del estudio" loading="lazy" /><div className="contactPhotoCaption">EL ARTE EMPIEZA CON UNA CONVERSACIÓN.</div></section>
  </>;
}
