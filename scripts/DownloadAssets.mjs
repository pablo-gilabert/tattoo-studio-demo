import { mkdir, readFile, writeFile } from "node:fs/promises"
import { join } from "node:path"

// Keep the original portfolio photography pinned to the source repository commit.
// Assets are downloaded to /public/images during npm install if they are absent.
const sourceCommit = "257c3252c854b415ea964e11a707da06db7a27a3"
const fileNames = [
    "atelier.webp",
    "botanical.webp",
    "craft.webp",
    "floralDetail.webp",
    "hero.webp",
    "linework.webp",
    "ornamental.webp",
    "portrait.webp",
    "ritual.webp",
    "session.webp",
    "snake.webp",
    "studio.webp",
]

const outputDirectory = join(process.cwd(), "public", "images")
await mkdir(outputDirectory, { recursive: true })

let downloadErrors = 0

for (const fileName of fileNames) {
    const filePath = join(outputDirectory, fileName)

    try {
        const existing = await readFile(filePath)
        if (existing.length > 1000) continue
    } catch {
        // Missing files must be downloaded before the production build.
    }

    const url = `https://raw.githubusercontent.com/pablo-gilabert/tattoo-studio-demo/${sourceCommit}/public/images/${fileName}`

    try {
        const response = await fetch(url)
        if (!response.ok) throw new Error(`HTTP ${response.status}`)

        await writeFile(filePath, Buffer.from(await response.arrayBuffer()))
        console.log(`Downloaded image: ${fileName}`)
    } catch (error) {
        downloadErrors += 1
        console.warn(`Unable to download ${fileName}: ${String(error)}`)
    }
}

if (downloadErrors > 0) {
    console.warn(`${downloadErrors} images could not be cached. The website can fall back to their original public URLs when online.`)
}
