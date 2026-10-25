# UMBRAL Tattoo Atelier — Studio Management Demo

A responsive, bilingual tattoo studio concept combining an editorial public website with an interactive **appointment and administration demo**. Built with React, TypeScript, Vite, React Router, CSS Modules, Lucide React, and SweetAlert2.

This is a portfolio demonstration. UMBRAL, its artists, client records, prices, contact information, deposits, and appointments are fictional.

## Highlights

- **Public experience:** Home, Studio, Artists, Gallery, Services, and Contact pages with responsive editorial layouts.
- **Bilingual UI:** Spanish (default) and English throughout the public website, sign-in screen, administration pages, form labels, and modals.
- **Dark and light themes:** Accessible semantic design tokens, with dark mode selected on first visit.
- **Portfolio artwork:** Filterable gallery, keyboard-accessible lightbox, and artist profiles.
- **Live demo catalog:** Services, prices in illustrative Argentine pesos, and expected durations are maintained from one shared local data model. Admin edits appear on the public site in the same browser.
- **Public booking simulation:** Choose a service, an open date and an available time. The appointment becomes visible on the local administrator calendar.
- **Discoverable admin sign-in:** Public navigation link, split-screen form inspired by the Aula Studio demo, prominently displayed demo credentials, and one-click account access.
- **Admin dashboard:** Half-hour availability intervals, sample appointments, client names and phone numbers, appointment duration, status, and deposit tracking.
- **Booking operations:** Create, edit, cancel, restore, delete and mark deposits using responsive SweetAlert2 dialogs.
- **Configurable opening hours:** Set open/closed days and opening/closing times through pop-up editors.
- **Editable service catalog:** Add, edit and remove localized service records, fees and durations with validation and deletion confirmations.
- **Persistence:** A versioned, sample-filled database in `localStorage`; demonstration login stored in `sessionStorage`; language and theme preferences in `localStorage`.
- **No server required:** All interactions run entirely in the browser.

## Admin demo

Visit `/admin/login`, or choose **Iniciar sesión / Sign in** from the public navigation.

| Field | Demo value |
| --- | --- |
| Email | `admin@demo.tattoo` |
| Password | `Demo2026!` |

The demo also displays these credentials and a one-click sign-in action.

## Architecture

```text
src/
├── admin/
│   ├── AdminAlerts.ts               # SweetAlert2 modal builders
│   ├── AdminContext.tsx             # Login and local data store
│   ├── AdminI18n.ts                 # Strictly typed ES/EN admin copy
│   ├── AdminScheduling.ts           # Availability and overlap rules
│   ├── AdminSeed.ts                 # Fictional default records
│   ├── AdminShared.module.css       # Shared admin styling
│   └── AdminTypes.ts                # Domain contracts
├── components/
│   ├── AdminShell/                 # Responsive administrative layout
│   ├── BookingWidget/              # Public local booking form
│   └── ...                         # Original reusable public components
├── context/DisplayContext.tsx      # Language and theme
├── data/SiteContent.ts             # Original bilingual public content
├── pages/
│   ├── AdminLogin/
│   ├── AdminDashboard/
│   ├── AdminHours/
│   ├── AdminServices/
│   └── ...                         # Original public page folders
├── styles/
│   ├── AdminAlerts.css              # Theme-aware SweetAlert2 styling
│   └── Global.css
├── App.tsx
└── Main.tsx
```

Public page and visual component files retain PascalCase folder names, TSX component files, and colocated CSS Modules. New code and explanatory comments are in English. The interface content is bilingual.

## Technical design

**Scheduling.** Every service has a duration in increments of 30 minutes. Available starting times depend on the configured weekday opening hours and existing bookings. The overlap algorithm excludes conflicts and past time slots. Each appointment records its original duration so later service-price or service-duration edits do not retroactively shrink occupied calendar intervals. Existing bookings remain available for review after a service is deleted.

**Mutations.** Service and opening-hour editors use SweetAlert2 pop-ups. Destructive changes require explicit confirmation. The admin calendar also allows creation, detail inspection, editing, status changes and deletion through dialogs. User content placed in the appointment details modal is inserted using DOM `textContent`, rather than unsafe HTML interpolation.

**Data ownership.** The `AdminProvider` wraps the site in `Main.tsx`. The public booking widget and private demo routes read the same local state. Updates are saved to a versioned `localStorage` key. Browser session sign-in is a UI demonstration, and the route guard is client-side only.

**Localization and themes.** `AdminI18n.ts` contains a fully typed bilingual set of labels for the additional features. Public content remains in `SiteContent.ts`. CSS themes share semantic variables to keep editing dialogs, form controls and dashboard elements readable in both modes.

## Important limitations

**This is not a real booking or management system.** The login credentials and all business logic are public frontend code, so there is no secure authentication, server-side authorization, database, or synchronization between devices, browsers or visitors. A public booking does not reach the fictitious studio or any other administrator. Local data can be modified or cleared by the browser. Never enter real personal information into this demo.

To turn this into a production service, implement secure server-side authentication and role checks, a transactional booking API with concurrency control, a durable database, privacy safeguards, and real notification/payment integrations. The studio imagery and contact details are illustrative.

## Author

Pablo Gilabert — Software Developer

Repository: https://github.com/pablo-gilabert/tattoo-studio-demo
