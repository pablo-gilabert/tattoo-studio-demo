import type { SVGProps } from "react"

// A bespoke old-school dual-coil tattoo machine icon, not a generic scissors glyph.
export function TattooMachineIcon({ size = 26, ...props }: SVGProps<SVGSVGElement> & { size?: number }) {
    return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
            <g transform="rotate(-19 31 32)">
                <path d="M14 16h31l6 7v4l-5 3H18l-5-4z" />
                <path d="M18 17V9h27v8M20 9V5m22 4V5" />
                <path d="M16 27v9l16 9 14-11v-6" />
                <rect x="20" y="16" width="10" height="16" rx="2" />
                <rect x="33" y="16" width="10" height="16" rx="2" />
                <path d="M23 17v14m3-14v14m10-14v14m4-14v14" strokeWidth="1.3" />
                <circle cx="46" cy="14" r="2.6" />
                <path d="M29 42h11l-3 5h-5zM33.5 47v6m0 0h7M33.5 53v7" />
                <path d="M40.5 53q8-4 11 3" strokeWidth="1.6" />
                <path d="M13 18l-5 2m5 5-5 2" strokeWidth="1.4" />
            </g>
        </svg>
    )
}
