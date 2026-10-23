import { ArrowUpRight, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PageHero } from '../components/PageHero';
import { SectionHeading } from '../components/SectionHeading';
import { faqs, services } from '../data/SiteData';
import { usePageMeta } from '../utils/UsePageMeta';

export function ServicesPage() {
  usePageMeta('Servicios', 'Descubrí nuestros servicios conceptuales: diseños personalizados, tatuajes disponibles, cover ups y asesoramiento.');
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  return <><PageHero eyebrow="QUÉ HACEMOS" title={<>Diseñar es <em>conectar.</em></>} description="Hay tantas maneras de llevar arte en la piel como personas. Te ayudamos a encontrar la tuya." number="05" />
    <section className="sectionPad"><div className="container"><SectionHeading kicker="SERVICIOS" title={<>Cada proyecto es <em>único.</em></>} /><div className="servicesList">{services.map((service) => <article key={service.number} className="serviceRow"><span className="serviceRowNumber">{service.number}</span><div><h3>{service.name}</h3><p>{service.description}</p></div><Link to="/contacto" className="iconCircle" aria-label={`Consultar ${service.name}`}><ArrowUpRight size={21} /></Link></article>)}</div></div></section>
    <section className="serviceImageStrip"><img src="/images/session.webp" alt="Artista trabajando en una sesión de tatuaje" loading="lazy" /><div className="serviceImageText"><span className="eyebrow eyebrowLight"><span className="eyebrowLine" />ANTES DE EMPEZAR</span><h2>Tu idea merece su propio <em>proceso.</em></h2><Link to="/contacto" className="button buttonAccent">Contanos tu idea <ArrowUpRight size={17} /></Link></div></section>
    <section className="sectionPad faqSection"><div className="container faqGrid"><SectionHeading kicker="PREGUNTAS FRECUENTES" title={<>Todo lo que necesitás <em>saber.</em></>} /><div className="faqList">{faqs.map((faq, index) => <div className="faqItem" key={faq.question}><button type="button" onClick={() => setOpenFaq((current) => current === index ? null : index)} aria-expanded={openFaq === index}><span>{faq.question}</span><ChevronDown size={19} className={openFaq === index ? 'faqIconOpen' : ''} /></button>{openFaq === index && <p>{faq.answer}</p>}</div>)}</div></div></section>
  </>;
}
