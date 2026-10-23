import type { ReactNode } from 'react';

interface SectionHeadingProps {
  kicker: string;
  title: ReactNode;
  subtitle?: string;
  align?: 'left' | 'center';
}

/** Standardized heading pattern makes future rebranding consistent across all routes. */
export function SectionHeading({ kicker, title, subtitle, align = 'left' }: SectionHeadingProps) {
  return (
    <div className={`sectionHeading ${align === 'center' ? 'sectionHeadingCenter' : ''}`}>
      <span className="eyebrow"><span className="eyebrowLine" />{kicker}</span>
      <h2>{title}</h2>
      {subtitle && <p>{subtitle}</p>}
    </div>
  );
}
