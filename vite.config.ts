import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

// Build the single-page application with React and modern browser targets.
export default defineConfig({
    plugins: [react()],
    build: {
        target: "es2022",
    },
})
