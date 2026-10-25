# Deployment guide

This Vite application produces a static site suitable for Vercel or similar providers.

## Run locally

```bash
npm install
npm run typecheck
npm run build
npm run dev
```

The `postinstall` script downloads the original WebP images from the initial UMBRAL portfolio commit to `public/images`. This requires network access to `raw.githubusercontent.com` on first installation; if a download is unavailable, the React image component can fall back to the same pinned public URL at runtime.

## Update the existing GitHub repository

Before replacing the existing project, create a local backup or Git tag of its last working version. Copy the files from this project's root into the cloned GitHub repository, including the hidden `.github` directory. Remove the former `src/components/*.tsx`, `src/pages/*.tsx`, and `src/styles/Global.css` files that are not part of the new structure; otherwise, outdated files may continue to be included by TypeScript. Keep `.git` untouched.

Run the local checks, then commit and push the changes:

```bash
npm install
npm run typecheck
npm run build
git add -A
git commit -m "Refactor portfolio and add bilingual themes"
git push origin main
```

## Vercel settings

| Setting | Value |
| --- | --- |
| Framework | Vite |
| Root Directory | `./` |
| Install Command | `npm install` |
| Build Command | `npm run build` |
| Output Directory | `dist` |
| Environment Variables | None |

The included `vercel.json` configures an SPA rewrite for React Router, allowing URLs such as `/artistas`, `/galeria`, and `/contacto` to work when visited directly.

## Smoke test

- Confirm the homepage opens in Spanish and dark mode on a new browser profile.
- Toggle the language from ESP to EN; verify text on all six routes, the FAQ, gallery captions, and form messages.
- Toggle dark and light appearances on every route; check contrast of cards, headings, input controls, and borders.
- Test the mobile menu and deep-link navigation.
- Filter the gallery and close the image viewer with Escape.
- Generate and copy a sample contact message; verify no request is sent to an API.
- Refresh and confirm display preferences are retained.

The contact details are deliberately non-functional and should not be treated as a production contact channel.
