import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router-dom"

import { App } from "./App"
import { DisplayProvider } from "./context/DisplayContext"

import "./styles/Global.css"

// Mount the router, display preferences, and application shell once.
const container = document.getElementById("root")

if (!container) {
    throw new Error("Application root not found")
}

createRoot(container).render(
    <StrictMode>
        <DisplayProvider>
            <BrowserRouter
                future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
            >
                <App />
            </BrowserRouter>
        </DisplayProvider>
    </StrictMode>,
)
