import { access } from "node:fs/promises"
import { join } from "node:path"

// Local image assets are included in the project ZIP. Never fetch images at install time.
const names = [
    "hero.webp", "studio.webp", "intro-studio.webp", "login-studio.webp", "contact-studio.webp", "atelier.webp", "session.webp", "ritual.webp", "craft.webp",
    "artist-alma.webp", "artist-dante.webp", "artist-vera.webp",
    "gallery-fineline.webp", "gallery-blackwork.webp", "gallery-ornamental.webp",
    "gallery-realism.webp", "gallery-old-school.webp", "gallery-oriental.webp",
]
const missing = []
for (const name of names) {
    try { await access(join(process.cwd(), "public", "images", name)) }
    catch { missing.push(name) }
}
if (missing.length) {
    console.error(`Missing local portfolio images: ${missing.join(", ")}`)
    process.exitCode = 1
} else {
    console.log(`Verified ${names.length} bundled portfolio images.`)
}
