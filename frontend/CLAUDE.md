# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Marketing site for Ro.Manic, a nail-manicure studio and manicure-courses business in Gdańsk. Next.js 15 (App Router) + React 19 + TypeScript + Tailwind CSS v4, internationalized with next-intl (`pl` / `ua` / `ru`). Static site — no backend, forms, or data mutations yet. Three pages so far: home (`/`), services & pricing (`/prices`), and the salon/about page (`/about`).

This `frontend/` directory is one service inside a larger monorepo (sibling `backend/`, `db` in the root `docker-compose.yml`).

## Environment: everything runs in Docker

**There is no Node/npm on the host.** Every command below must run inside the container, not on the host shell.

Start the dev container (bind-mounted, hot reload) from the **repo root** (one level up from `frontend/`):
```
docker compose up -d frontend
```
This builds the `dev` target of [Dockerfile](Dockerfile) and exposes the site on `http://localhost:3001` (container name `courses_frontend`, internal port 3000).

Run any npm/node command inside it, e.g.:
```
docker exec courses_frontend npm run lint
docker exec courses_frontend npx tsc --noEmit
docker exec courses_frontend npm install <pkg>
```
`npm install` inside this container writes back to `package.json`/`package-lock.json` on the host because the container bind-mounts `../frontend:/app` (with `node_modules` as an anonymous volume so host and container `node_modules` don't collide).

**Git Bash / MSYS path mangling:** when a command argument looks like a POSIX path (e.g. `/tmp/dev.log`), Git Bash rewrites it into a Windows path before Docker ever sees it. Prefix `docker exec`/`docker run` invocations with `MSYS_NO_PATHCONV=1` whenever the command touches a container-side path.

### Commands (all via `docker exec courses_frontend ...`)
- `npm run dev` — starts automatically as the container's CMD; no need to run manually
- `npm run build` — production build (`next build --turbopack`)
- `npm run lint` — ESLint (flat config, `next/core-web-vitals` + `next/typescript`)
- `npx tsc --noEmit` — type-check only

There is no test runner configured in this project yet.

### Production image
Built from the `runner` target (multi-stage: `deps` → `builder` → `runner`), using Next's `output: "standalone"` — the final image ships only the traced server bundle, not the source or full `node_modules`. Build/run it via [docker-compose.prod.yml](docker-compose.prod.yml) **from inside `frontend/`**:
```
docker compose -f docker-compose.prod.yml up -d --build
```
Serves on `http://localhost:3000` (container name `ro_manic_frontend`).

**Do not test a production build inside the `dev` container/target.** That target bakes in `NODE_ENV=development`; running `npm run build` with that set triggers an unrelated Next.js bug (`<Html> should not be imported outside of pages/_document` while prerendering `/404`). Always build production through the `builder`/`runner` stages (i.e. via `docker-compose.prod.yml` or `docker build --target runner`).

## Architecture

### Routing / i18n (next-intl)
All pages live under `src/app/[locale]/` — there is no locale-less route. Locale handling is centered on three files in `src/i18n/`:
- `routing.ts` — the single source of truth for supported locales (`["pl", "ua", "ru"]`, default `ru`) and exports the `Locale` type
- `navigation.ts` — locale-aware `Link`/`useRouter`/`usePathname`, re-exported wrappers around `next/navigation` that must be used instead of the plain Next.js versions anywhere a link should preserve the current locale
- `request.ts` — loads the matching `src/messages/<locale>.json` per request

`src/middleware.ts` runs `next-intl`'s middleware for locale detection/redirects on every non-asset path.

Every `page.tsx`/`layout.tsx` under `[locale]` must validate the incoming `locale` param with `hasLocale(routing.locales, locale)` and call `notFound()` if it fails, then `setRequestLocale(locale)` — this pattern is required both for correctness (unknown locale segments) and for TypeScript (see below), and must be duplicated in both `layout.tsx` and `page.tsx` since Next.js can invoke `generateMetadata`/the page before the layout's guard has run.

**Locale code note:** the Ukrainian locale is `ua` in URLs/message-file names (a deliberate product choice, not the ISO code), but the `<html lang>` attribute must still render the correct BCP-47 tag `uk` for that locale — see the `htmlLang` map in `src/app/[locale]/layout.tsx`. Don't "fix" one without the other.

### Typed translations
`global.d.ts` augments next-intl's `AppConfig` with the real `Locale` union and the shape of `src/messages/ru.json`, so `useTranslations()`/`t()` calls are checked against actual message keys at compile time. **All three locale JSON files must stay structurally identical (same keys, same nesting)** — a mismatch won't necessarily fail the TypeScript build (only `ru.json` is used for the type) but will silently produce missing text in the other two locales at runtime.

### TypeScript quirks in this project
This project's toolchain resolves to **TypeScript 6.x**, which is stricter about side-effect imports than most guides assume. Ambient module declarations for extensionless/CSS side-effect imports live in `css.d.ts` at the repo root — it must stay a file with **no top-level `import`/`export`** (that would make it a module and scope its wildcard `declare module` statements to itself instead of globally). Keep any new global ambient declarations that use `declare module "*.ext"` wildcard syntax in `css.d.ts`, not in `global.d.ts` (which has imports and is a module).

### Styling
Tailwind CSS v4, configured CSS-first in `src/app/globals.css` (`@import "tailwindcss"`, `@theme` blocks) — there is no `tailwind.config.js`. Custom animations (`animate-background`, `animate-marquee`, `animate-fade-in`, `animate-scale-in`, `animate-cta-glow`) and hand-rolled utility classes (`.btn-schedule`, `.btn-cta`, `.glass-card`) are defined there, all following the same convention: a base class built with `@apply`, with `before:`/`after:` pseudo-elements layered in for gradient/glow accents rather than extra markup. `.glass-card` is the shared "frosted panel" look used for cards on `/prices` and `/about`; `.btn-cta` is a larger, glowing variant of `.btn-schedule` for page-level closing CTAs — the header's own book button stays on `.btn-schedule`, deliberately smaller/plainer.

### Fonts
`src/lib/fonts.ts` loads three `next/font/google` fonts (Commissioner, Ephesis, Manrope). Commissioner and Manrope include `latin`, `latin-ext`, and `cyrillic` subsets — `latin-ext` is required for Polish diacritics (ą, ć, ę, ł, ń, ó, ś, ź, ż); don't drop it when touching this file.

### Component layout
- `src/components/layout/` — `Header` (nav + `LanguageSwitcher`) and `Footer`, both rendered once in `src/app/[locale]/layout.tsx`
- `src/components/ui/` — presentational pieces shared across pages: `AnimatedGallery`, `FadeInSection`, `Marquee`, `ReviewSlider` (home page), `PriceList` (services/pricing cards + photo lightbox, used by `/prices`)
- `src/data/` — static content kept out of the messages JSON:
  - `reviews.ts` — real client testimonials, kept in their original language regardless of site locale — do not run these through translation
  - `servicePhotos.ts` / `salonPhotos.ts` — `id` (or index) → image path lookups for photos the site owner adds later, pointing into `public/images/prices/` and `public/images/about/` respectively. Entries start empty/missing on purpose; the corresponding page renders a placeholder tile in that case, so an empty lookup is expected state, not a bug.
- Content pages (`/prices`, `/about`) share a page shape: a centered `h1` with a `text-yellow-100` highlight span, `FadeInSection`-wrapped content blocks, and a closing CTA card near the bottom built around the `.btn-cta` button.

### External embeds
`/about` embeds Google Maps **without an API key** via the public `https://www.google.com/maps?q=<address>&output=embed` iframe URL, alongside a plain `https://www.google.com/maps/search/?api=1&query=<address>` link that opens the same address in Google Maps itself. The address string lives once in `messages.footer.address` and is reused there rather than duplicated into `about`.
