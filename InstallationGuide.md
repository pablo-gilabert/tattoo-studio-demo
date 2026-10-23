# Installation and Deployment Guide

This guide supplements the main [README](./README.md). UMBRAL is a fictional tattoo studio demo: all UI copy is in Spanish, while code, comments and documentation are written in English.

## 1. Requirements

- **Node.js 22 LTS** (recommended): https://nodejs.org/
- **Git**: https://git-scm.com/downloads
- **Visual Studio Code** (optional): https://code.visualstudio.com/
- A GitHub account: https://github.com/
- A Vercel account: https://vercel.com/

Verify your tools in PowerShell or another terminal:

```powershell
node --version
npm --version
git --version
```

## 2. Start the development server

1. Extract the ZIP into an empty directory.
2. Open the **`umbralTattooDemo`** project root in your editor.
3. Open a terminal in that directory and run:

```powershell
npm install
npm run dev
```

4. Visit the URL printed by Vite (usually http://localhost:5173).

The `npm install` step requires an internet connection. The distributed ZIP does not include `node_modules`.

## 3. Validate and preview the production build

```powershell
npm run typecheck
npm run build
npm run preview
```

The build creates a static `dist/` directory. Check all routes, mobile navigation, form behavior and image assets before deploying.

## 4. Publish your source code to GitHub

Create an empty GitHub repository first, then run:

```powershell
git init
git add .
git commit -m "Build responsive tattoo studio portfolio"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/umbralTattooDemo.git
git push -u origin main
```

Replace `YOUR_USERNAME` with your GitHub handle. Skip `git init` if you already have a Git repository, and avoid adding a second `origin` remote.

## 5. Deploy to Vercel

1. Connect your GitHub account at https://vercel.com/.
2. Choose **Add New → Project**, then import your repository.
3. Framework preset: **Vite**.
4. Build command: **`npm run build`**.
5. Output directory: **`dist`**.
6. Install command: **`npm install`**.
7. No environment variables are required for the demo.
8. Click **Deploy**.

The included `vercel.json` configures SPA fallback routing, so refreshing pages such as `/galeria` works in production.

## 6. Updating the content for a real business

- Replace fictional business and staff details in `src/data/SiteData.ts`.
- Substitute AI-generated photos with licensed images of actual work.
- Replace placeholder social-media and WhatsApp contact details.
- Implement a proper contact-submission flow: the current form only previews a message locally.
- Confirm accessibility, privacy, consent and other business-specific requirements before production use.

## 7. Responsive design adjustments in this edition

The shared `.container` uses a 90% width and automatic side margins across screen sizes, subject to a maximum width on large screens. The home hero now preserves these margins inside its flex layout; the mobile menu, service banner and 404 page also use matching gutters.

The site keeps its original editorial alignment: blocks are centered inside the viewport, while headings and paragraphs remain left-aligned for readability.

All TS/TSX/CSS filenames use PascalCase, and all imports use the exact filename casing. The source code and explanatory comments are in English.
