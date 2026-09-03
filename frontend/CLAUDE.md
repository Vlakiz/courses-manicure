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
Tailwind CSS v4, configured CSS-first in `src/app/globals.css` (`@import "tailwindcss"`, `@theme` blocks) — there is no `tailwind.config.js`. Custom animations (`animate-background`, `animate-marquee`, `animate-fade-in`, `animate-scale-in`, `animate-cta-glow`) and hand-rolled utility classes (`.btn-schedule`, `.btn-cta`, `.glass-card`) are defined there, all following the same convention: a base class built with `@apply`, with `before:`/`after:` pseudo-elements layered in for gradient/glow accents rather than extra markup. `.glass-card` is the shared "frosted panel" look used for some cards on `/prices` and `/about`; `.btn-cta` is a larger, glowing variant of `.btn-schedule` for page-level closing CTAs — the header's own book button stays on `.btn-schedule`, deliberately smaller/plainer.

**Dark theme is hardcoded, not `prefers-color-scheme`-driven.** `:root` in `globals.css` sets `--background`/`--foreground` directly to dark values, and `html { color-scheme: dark }` is set explicitly. This site has no light theme — the original `create-next-app` boilerplate wrapped the dark colors in `@media (prefers-color-scheme: dark)`, which meant devices in light mode (e.g. iPhones not set to Dark Mode) rendered a white background under the dark-only UI. Don't reintroduce that media query.

**Content pages deliberately avoid repeating the same section layout twice in a row.** On `/about`, each feature-list section uses a genuinely different presentation so the page doesn't feel like a stack of identical boxes: `values` is a grid of separate `.glass-card` tiles, `comfort` is a single bordered panel with internal `divide-x`/`divide-y` lines and circular icon badges (no `.glass-card`), and `hygiene` is a split heading-left/checklist-right layout. When adding a new feature-list section, pick a layout distinct from its neighbors rather than reusing the nearest existing card-grid.

### Background video (home closing CTA)
The home page's closing CTA section uses a looping background `<video>` (`public/videos/home/closing-loop.mp4`), dimmed and faded behind the "lamp beam" accent and heading — not the hero, which stays a static photo (a full-bleed autoplay video was tried in the hero first and reverted: at hero's framed/boxed size it read as just another photo box, and the source footage's portrait crop didn't suit a small frame — the same video works much better as a large, heavily dimmed ambient backdrop behind text). Conventions to follow if adding another background video:
- **No local ffmpeg on the host or in the dev container.** Process video via a throwaway `docker run --rm jrottenberg/ffmpeg:6-alpine ...` container with the source/output directories bind-mounted — remember `MSYS_NO_PATHCONV=1` (see Git Bash note above) so the container-side paths in `-v`/args survive Git Bash.
- **Raw phone footage is rarely a clean loop.** Rather than trimming a segment and hoping the first/last frames match, build a ping-pong loop (`split` the trimmed clip into two copies, `reverse` one, `concat` them) so the video always returns to its exact starting frame with no jump cut — see the `filter_complex` used to produce `closing-loop.mp4`.
- Strip audio (`-an`) — required for reliable autoplay and saves size — and encode H.264 `yuv420p` (`libx264 -pix_fmt yuv420p -movflags +faststart`) for cross-browser/iOS Safari playback; there is no WebM fallback.
- The `<video>` needs `autoPlay muted loop playsInline` (playsInline is required for iOS to autoplay inline instead of forcing fullscreen).
- As a background layer it's `absolute inset-0 w-full h-full object-cover`, dimmed (`opacity-30`) with a dark gradient overlay on top for text legibility — always inside a `relative overflow-hidden` section so nothing bleeds past the section's own bounds. **Cap its width to the site's `.container` (not `100vw`/full viewport)**: an uncapped full-bleed video upscales way past its source resolution on wide/ultrawide monitors and turns visibly soft/blurry — constraining it to the same `.container` max-width the rest of the page already uses caps the upscale to something reasonable while still reading as an edge-to-edge background on realistic screen sizes.
- Capping the width to `.container` means on wide viewports there's now a visible seam where the video's edges meet the plain section background — fade the edges with `mask-image`, not a radial/oval "vignette" (that shrinks the whole video into a small isolated blob with unclear content, it doesn't read as a background at all). The left/right seam always needs fading (`linear-gradient(to right, transparent 0%, black 18%, black 82%, transparent 100%)`); the bottom only needed it here because the section is immediately followed by the footer's own top margin — a plain content section following it might not need a bottom fade. To fade horizontally *and* at the bottom without also fading the top (which already reads fine under the overlay's lighter `from-background/20`), layer a second `linear-gradient(to bottom, black 0%, black 70%, transparent 100%)` in the same `mask-image` and add `mask-composite: intersect` (plus `-webkit-mask-composite: source-in` for older WebKit) so the two gradients multiply together instead of just unioning.
- **Accessibility fallback:** a static poster frame (extracted with `ffmpeg -frames:v 1`, saved as `.webp` next to the other home images) is wired up two ways — as the `<video poster="...">` attribute (shown while the video loads), and as a separate `<Image>` toggled via Tailwind's `motion-reduce:hidden` (on the video) / `motion-reduce:block` (on the image, which is `hidden` by default) so anyone with "reduce motion" enabled gets the still frame instead. This is CSS-only (`@media (prefers-reduced-motion: reduce)`), so it works from `page.tsx` as a server component with no client-side JS needed.

### Fonts
`src/lib/fonts.ts` loads three `next/font/google` fonts (Commissioner, Ephesis, Manrope). Commissioner and Manrope include `latin`, `latin-ext`, and `cyrillic` subsets — `latin-ext` is required for Polish diacritics (ą, ć, ę, ł, ń, ó, ś, ź, ż); don't drop it when touching this file.

### Component layout
- `src/components/layout/` — `Header` (nav + `LanguageSwitcher`) and `Footer`, both rendered once in `src/app/[locale]/layout.tsx`. `Header` is a client component: the mobile menu is React state (`open`) tied to `usePathname()`, not a CSS-only checkbox toggle — this is required so the menu auto-closes when a nav link is clicked (a pure `peer-checked` CSS toggle has no way to react to route changes).
- **The mobile-drawer/inline-nav switch happens at `xl` (1280px), not `lg`.** It used to be `lg` (1024px), but right at that breakpoint the inline row (logo + 3 links + book button + language switcher) didn't have enough room and wrapped into two lines. `.btn-schedule`'s own `text-2xl → text-base` size step is intentionally kept on the same `xl:` breakpoint as the header, since the header's book button uses that class — if you ever change one, change the other, or the button will already be showing its compact desktop size while still sitting inside the (still-open) mobile drawer. In the drawer, `<ul>` (nav links) is one flex item and the book button + `LanguageSwitcher` are grouped together as a second item, pinned as a pair to the bottom of the drawer via `mt-auto` on that group (not on each of them separately — two competing `mt-auto`s on siblings was the original bug here, it left the button stranded mid-drawer instead of at the bottom). Inside that bottom group the button sits above a `border-t` divider and `LanguageSwitcher` sits below it — both still part of the same bottom-pinned cluster, just visually separated by the line. At `xl` the divider/stacking (`flex-col` → `flex-row`, `border-t` → `border-none`) collapses away and the two items just sit inline as part of the single-row nav: links, book button, language switcher.
- `src/components/ui/` — presentational pieces shared across pages: `FadeInSection`, `Marquee` (infinite text ticker — home page's brand-name band only; kept intentionally as a single stylistic flourish, don't reuse it for photos/other content), `WorksShowcase` (static bento-style photo grid, home page works section), `ReviewSlider` (home page), `PriceList` (services/pricing cards, used by `/prices`), `SalonGallery` (instagram-style photo feed, used by `/about`), `PhotoLightbox` (shared fullscreen photo viewer with prev/next + swipe, used by `PriceList`, `SalonGallery`, and `WorksShowcase`).
- `src/data/` — static content kept out of the messages JSON:
  - `reviews.ts` — real client testimonials, kept in their original language regardless of site locale — do not run these through translation
  - `servicePhotos.ts` / `salonPhotos.ts` — `id` (or index) → image path lookups, pointing into `public/images/prices/` and `public/images/about/salon/` respectively. Entries start empty/missing on purpose; the corresponding page renders a placeholder tile in that case, so an empty lookup is expected state, not a bug.
- Content pages (`/prices`, `/about`) share a page shape: a centered `h1` with a `text-yellow-100` highlight span, `FadeInSection`-wrapped content blocks, and a closing CTA card near the bottom built around the `.btn-cta` button.

### Mobile / iOS Safari gotchas
- **Fullscreen overlays must render via `createPortal(..., document.body)`, not inline in the page tree.** `PhotoLightbox` does this because it's used inside `FadeInSection`-wrapped sections, and `FadeInSection` sets an inline `transform` style on its wrapper — any ancestor `transform` becomes the containing block for `position: fixed` descendants (and starts a new stacking context). Without the portal, a "fullscreen" overlay nested under a `FadeInSection` actually positions itself relative to that section (opens at the wrong scroll position) and can render behind the header's `z-50`. If you add another fixed-position overlay/modal anywhere a `FadeInSection` might be an ancestor, portal it too.
- **`overflow: hidden` on `body` does not stop background touch-scroll on iOS Safari** while a fullscreen overlay is open. `PhotoLightbox` locks scroll with `body { position: fixed; top: -<scrollY>px }` and restores/re-scrolls on close — use the same technique for any future modal.
- Touch swipe (in `PhotoLightbox`) follows one consistent pattern: `touchstart` stores `clientX` in a ref, `touchend` diffs against it and fires prev/next past a ~50px threshold. Match this pattern rather than introducing a different gesture library.

### External embeds
`/about` embeds Google Maps **without an API key** via the public `https://www.google.com/maps?q=<address>&output=embed` iframe URL, alongside a plain `https://www.google.com/maps/search/?api=1&query=<address>` link that opens the same address in Google Maps itself. The address string lives once in `messages.footer.address` and is reused there rather than duplicated into `about`.

The weekly hours list on `/about` ("Как нас найти") is built in `about/page.tsx` by pairing `footer.days.*` (short day-name abbreviations, e.g. `Пн`/`Вт`) with the existing grouped `footer.workHours` / `workHours2` / `dayOff` strings — the actual hour ranges still live once in `footer.*` (also used by `Footer.tsx`'s compact 3-line summary) and aren't duplicated per day.
