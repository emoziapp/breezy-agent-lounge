# AgentBazar.in — Login Page + Home Hero Redesign

## Important context
This Lovable project (TanStack Start) is **not** where these changes will land — your real app is the Next.js App Router project you uploaded. This plan is written for **that** Next.js codebase. The deliverable is updated source files you drop into your `src/` tree. No backend, store, API, or routing changes — only the UI/UX layer of the Login page and the Home hero is rewritten.

I read your code. The redesign preserves:
- `useUserStore` (Zustand): `user`, `config`, `companyDetails`, `setUser`, `setLoading`, `loading`
- Login API: `POST ${config.login_base_url}` with `requestdata=...` form-urlencoded body, `{ username, password }`
- Email-check API: `POST ${config.common_base_url}` with `aid: "checkuseravailability"`
- Reset API: `POST ${config.forgot_base_url}` with `userid=...`
- Post-login redirect logic (`?redirect=` query param → else `/home`)
- Registration form switching via `showRegistrationForm` / `setEmailExists` props
- Dynamic company branding (`companyDetails.name` → `Login` vs `LoginGFT`)

---

## Files that change

### 1. `src/components/Login/Login.js` — full rewrite of JSX + handlers (logic preserved)
- Same props (`showRegistrationForm`, `setShowRegistrationForm`, `setEmailExists`), same state, same fetch calls, same redirect.
- New split layout:
  - **Left panel** (hidden on mobile, shown md+): animated navy gradient background with orange glow blob, headline "India's Most Powerful B2B Airfare Marketplace", subtext, three trust badge pills (10,000+ Agents · 300+ Routes · Real-Time Inventory), and a small "Trusted by 10,000+ travel agents" footer line. Uses `companyDetails.shortname` where appropriate so GFT branding still flows through.
  - **Right panel**: glassmorphism card (white/blur, 16px radius, soft shadow) holding the form.
- Form upgrades (UI only):
  - Floating-label inputs with orange focus ring/glow.
  - Password show/hide toggle as an inline button (replaces the absolute-positioned `inputEye.svg`, but the SVG asset is still used inside the button so no public asset changes are needed).
  - Inline field-level validation states (red ring + helper text) instead of one shared error.
  - "Access Dashboard" gradient button with hover scale + glow + spinner during submit (`isSubmitting` local state wraps the existing fetch — does not change the request).
  - Trust line under CTA: "🔒 Secure login · Trusted by 10,000+ agents".
  - Reset-password and Register-agency flows kept exactly as today, restyled to match.
- Fix: current `if (user !== null && config !== null) { window.location.href = "/home"; setLoading(true); return; }` runs on every render before `useEffect`. Wrap it in a `useEffect` so it doesn't violate hook order — same behavior, just safe. (This is the only logic touch and is necessary for the redesign to mount cleanly.)
- Fix: `isLoggedIn: () => token !== null` in `store/user.js` references an undefined `token`. **Not touching** — out of scope, just flagging.

### 2. `src/components/Login/Login.module.css` — full rewrite
- Brand tokens at top: `--ab-orange: #ff6600`, `--ab-navy: #001d4a`, `--ab-ink: #0b0b0b`, `--ab-gradient: linear-gradient(135deg,#001d4a,#003a8c)`, `--ab-glow: 0 0 0 4px rgba(255,102,0,.15)`.
- Inter via `@import` from Google Fonts at the top of the module (scoped to login page; no global font change).
- Glassmorphism card: `backdrop-filter: blur(20px); background: rgba(255,255,255,.85); border: 1px solid rgba(255,255,255,.4); box-shadow: 0 20px 60px -20px rgba(0,29,74,.35);`
- Animated background gradient (20s slow shift, `prefers-reduced-motion: reduce` disables it).
- Fade + slide-up keyframes for card and left panel on mount.
- Responsive: stacks below 900px, login card on top, sticky bottom CTA on <600px.

### 3. `src/components/Login/LoginGFT.js` — same redesign treatment, GFT branding kept
Mirrors the Login.js changes so the goflytrip variant stays consistent. Preserves its existing API calls and props.

### 4. `src/app/page.js` — minor cleanup only
- Wrap the `new URLSearchParams(window.location.search)` in a `useEffect` (currently runs at module init, which breaks SSR/hydration). Behavior identical, just SSR-safe.
- Reorder the below-fold blocks to **remove** `LoginImageCrousel` and `Advantages` from the page (per your "remove FAQ + repetitive feature boxes" rule) — keep `EmailInput`, `AgentCard`, and `LoginFooter`. If you'd rather keep the carousel, say so and I'll leave it in.

### 5. `src/components/Banner/Banner.js` + `Banner.module.css` — hero shell upgrade only
Banner.js is 792 lines of search/booking logic — I will **not** touch the search form, airport selectors, calendars, or any handlers. Only:
- Wrap the existing banner output in a new hero container with the navy gradient background + orange accent glow + animated subtle motion.
- Add a hero copy block **above** the existing search form: headline "India's Most Powerful B2B Airfare Marketplace", subtext "Zero-markup fares across 300+ sectors with real-time booking tools", and three trust pills.
- "Explore Dashboard" ghost-style scroll-hint button below the search form that scrolls to the next section (`FixedFlights` / `ImageCrousel`).
- Mobile (`MobileBanner.js`): same hero copy added above existing mobile search; sticky CTA untouched (your existing booking UX).

### 6. NEW: `src/components/VideoTutorials/VideoTutorials.js` + `.module.css`
- Section title "Learn How to Use AgentBazar".
- Three cards (responsive grid → stack on mobile) with YouTube thumbnail (`https://img.youtube.com/vi/<id>/hqdefault.jpg`) + centered play icon.
- Click opens a lightweight modal with a lazy-mounted `<iframe>` (iframe only renders when modal is open, so page-load cost is just three images).
- Video IDs in a config array at the top of the file — swap in your real videos in seconds.
- Added to `src/app/home/page.js` between `Banner` and `FixedFlights`.

### 7. NEW: `src/components/TrustStrip/TrustStrip.js` + `.module.css`
- Horizontal band: "Trusted by 10,000+ Travel Agents" + a row of 6 placeholder agency logo chips (uses initials in colored circles until you provide real logos).
- Added to home page below the new `VideoTutorials` section.

---

## Design system (applied via CSS modules, no global change)
- **Colors**: orange `#ff6600`, navy `#001d4a`, ink `#0b0b0b`, gradient `linear-gradient(135deg,#001d4a,#003a8c)`, glow `rgba(255,102,0,.15)`.
- **Typography**: Inter (with Sora fallback) loaded per-component to avoid touching your global layout.
- **Spacing**: 8px grid.
- **Motion**: fade-in + slide-up on mount, animated gradient background, button hover scale 1.02 + orange glow shadow, input focus orange ring. All gated by `prefers-reduced-motion`.

## Mobile UX
- Login page: stacks; login card first; sticky bottom "Access Dashboard" CTA on <600px.
- Tap targets ≥ 44px; larger input padding on mobile.

## Performance
- YouTube iframes mount only on modal open (thumbnails are static images).
- All animations use transform/opacity (GPU-friendly).
- No new npm dependencies — uses your existing React + CSS modules setup.

---

## Strict guarantees (what I am NOT doing)
- No changes to: `useUserStore`, `flight.js`, `booking.js`, `passengerBooking.js`, `filters.js`, any API URL, any request/response shape, any redirect logic, the registration form, the search/airport/calendar logic in `Banner.js`, or any backend.
- No new npm packages.
- No global CSS or layout changes outside the listed files.

## Open questions before I generate the code
1. **Drop `LoginImageCrousel` + `Advantages` from `/` (login page)** as the brief implies, or keep them? (Default: drop.)
2. **Real YouTube video IDs** for the three tutorials, or use placeholders for now? (Default: placeholders, easy to swap.)
3. **GFT variant**: redesign `LoginGFT.js` to match, or leave it untouched for now? (Default: redesign both.)

Once you confirm (or just say "go with defaults"), I'll generate the updated files for you to drop into your Next.js `src/`.
