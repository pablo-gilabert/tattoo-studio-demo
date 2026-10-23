/**
 * The complete fictional business dataset is kept in one place.
 * A real client can replace these values without rewriting the page components.
 */
export const studio = {
  name: 'UMBRAL',
  subtitle: 'Tattoo Atelier',
  city: 'Buenos Aires, Argentina',
  address: 'Calle Imaginaria 128, CABA',
  phoneLabel: '+54 11 0000-0000',
  phoneInternational: '5491100000000',
  email: 'hola@umbral-tattoo.example',
  instagramLabel: '@umbral.tattoo.demo',
  schedule: 'Martes a sábados · 11:00 a 20:00',
};

export const navigation = [
  { label: 'Inicio', to: '/' },
  { label: 'El estudio', to: '/estudio' },
  { label: 'Artistas', to: '/artistas' },
  { label: 'Galería', to: '/galeria' },
  { label: 'Servicios', to: '/servicios' },
  { label: 'Contacto', to: '/contacto' },
] as const;

export type ArtworkCategory = 'Blackwork' | 'Fineline' | 'Ornamental' | 'Realismo';

export interface Artwork {
  id: number;
  title: string;
  category: ArtworkCategory;
  image: string;
  imagePosition?: string;
  alt: string;
}

export const artworks: Artwork[] = [
  { id: 1, title: 'Jardín de tinta', category: 'Fineline', image: '/images/botanical.webp', alt: 'Tatuaje botánico de peonías sobre el hombro' },
  { id: 2, title: 'Instinto', category: 'Blackwork', image: '/images/snake.webp', alt: 'Serpiente y rosa tatuadas en negro y gris' },
  { id: 3, title: 'Línea viva', category: 'Ornamental', image: '/images/floralDetail.webp', alt: 'Detalle ornamental de una flor tatuada' },
  { id: 4, title: 'Trazos de sombra', category: 'Realismo', image: '/images/craft.webp', alt: 'Artista trabajando un tatuaje de gran detalle' },
  { id: 5, title: 'Herencia', category: 'Blackwork', image: '/images/ornamental.webp', alt: 'Detalle oscuro de un tatuaje de serpiente' },
  { id: 6, title: 'Piel y pétalos', category: 'Fineline', image: '/images/portrait.webp', alt: 'Retrato con tatuaje floral en brazo y espalda' },
  { id: 7, title: 'Raíces', category: 'Ornamental', image: '/images/linework.webp', alt: 'Sombreado del diseño de rosa y serpiente' },
  { id: 8, title: 'El oficio', category: 'Realismo', image: '/images/ritual.webp', alt: 'Proceso creativo de un tatuaje con máquina profesional' },
];

export interface Artist {
  name: string;
  specialty: string;
  description: string;
  image: string;
  position?: string;
}
export const artists: Artist[] = [
  { name: 'Alma Ríos', specialty: 'Fineline · Botánico', description: 'Trazos delicados, composiciones naturales y detalles que se descubren de cerca.', image: '/images/portrait.webp' },
  { name: 'Dante Vidal', specialty: 'Blackwork · Ornamental', description: 'Contrastes profundos, geometrías libres y piezas con personalidad.', image: '/images/craft.webp' },
  { name: 'Vera Montes', specialty: 'Realismo · Black & Grey', description: 'Texturas, sombras y relatos personales convertidos en imágenes.', image: '/images/session.webp', position: '74% center' },
];

export const services = [
  { number: '01', name: 'Tatuajes a medida', summary: 'Una pieza única, creada desde cero para vos.', description: 'Conversamos sobre tu idea, armamos referencias y diseñamos una composición para tu anatomía y tu historia.' },
  { number: '02', name: 'Diseños disponibles', summary: 'Piezas originales listas para convertirse en tinta.', description: 'Elegí una ilustración de nuestros artistas y adaptamos tamaño y ubicación en una consulta previa.' },
  { number: '03', name: 'Cover up', summary: 'Una nueva historia sobre una marca anterior.', description: 'Analizamos el tatuaje existente y evaluamos alternativas reales para una cobertura creativa y responsable.' },
  { number: '04', name: 'Asesoramiento', summary: 'Cada gran tatuaje empieza con una buena charla.', description: 'Te orientamos sobre estilos, tamaño, ubicación, preparación y cuidados posteriores.' },
];

export const testimonials = [
  { name: 'Camila P.', text: 'Desde la primera charla entendieron exactamente lo que quería. Cada detalle fue pensado con muchísimo cuidado.', work: 'Diseño botánico' },
  { name: 'Julián M.', text: 'El ambiente transmite confianza y el proceso fue impecable. Me encantó poder construir el diseño con el artista.', work: 'Blackwork personalizado' },
  { name: 'Sol V.', text: 'El trato, la paciencia y el resultado superaron mis expectativas. Volvería sin dudarlo.', work: 'Fineline' },
];

export const faqs = [
  { question: '¿Cómo reservo una sesión?', answer: 'Nos contás tu idea, tamaño aproximado, zona del cuerpo y referencias. Coordinamos una consulta y definimos la disponibilidad.' },
  { question: '¿El diseño está incluido?', answer: 'Cada propuesta se conversa antes de confirmar la sesión. El alcance del diseño y el presupuesto dependen de cada pieza.' },
  { question: '¿Qué cuidados necesita un tatuaje?', answer: 'Al finalizar te entregamos instrucciones específicas de higiene, protección y cicatrización. Siempre seguí las recomendaciones profesionales.' },
  { question: '¿Se pueden cubrir tatuajes anteriores?', answer: 'Sí, evaluamos cada caso. Algunas coberturas requieren trabajar con tamaños, contrastes y diseños específicos.' },
];

/** A contact action remains configurable until a real business number is available. */
export function createWhatsAppUrl(message: string): string {
  return `https://wa.me/${studio.phoneInternational}?text=${encodeURIComponent(message)}`;
}
