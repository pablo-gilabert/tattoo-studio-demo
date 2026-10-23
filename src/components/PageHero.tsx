import type { ReactNode } from 'react';

interface PageHeroProps { eyebrow: string; title: ReactNode; description: string; number: string; }

/** Compact editorial intro for interior pages. */
export function PageHero({ eyebrow, title, description, number }: PageHeroProps) {
  return <section className="pageHero"><div className="container pageHeroInner"><div><span className="eyebrow"><span className="eyebrowLine" />{eyebrow}</span><h1>{title}</h1><p>{description}</p></div><span className="pageHeroNumber">{number} / 06</span></div></section>;
}
