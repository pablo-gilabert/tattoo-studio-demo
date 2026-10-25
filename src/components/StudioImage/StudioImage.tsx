import { useState, type ImgHTMLAttributes } from "react"

import { OriginalImageBase } from "../../data/SiteContent"

interface StudioImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, "src"> {
    fileName: string
}

// Use the bundled image first, falling back to the original immutable source.
export function StudioImage({ fileName, ...props }: StudioImageProps) {
    const [fallback, setFallback] = useState(false)

    return (
        <img
            {...props}
            src={fallback ? `${OriginalImageBase}/${fileName}` : `/images/${fileName}`}
            onError={() => setFallback(true)}
        />
    )
}
