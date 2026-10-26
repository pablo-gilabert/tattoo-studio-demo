import type { ImgHTMLAttributes } from "react"

interface StudioImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, "src"> {
    fileName: string
}

// Always use bundled project-owned portfolio images; do not re-download legacy assets.
export function StudioImage({ fileName, ...props }: StudioImageProps) {
    return <img src={`/images/${fileName}`} decoding="async" {...props} />
}
