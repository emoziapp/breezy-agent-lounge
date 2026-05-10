## Goal

Produce a Next.js / plain JavaScript version of the current login page so you can paste it directly into your existing Next.js project. No TypeScript, same design, same behavior.

## What I'll deliver

I'll generate a folder of `.js` / `.jsx` files written to `/mnt/documents/agentbazar-nextjs/` that you can download and drop into your Next.js project.

Files included:

1. **`components/LoginCard.jsx`** — full LoginCard converted from `.tsx` → `.jsx`
   - All TypeScript types/interfaces removed (`LoginCardProps`, `View`, generics)
   - Same JSX, same Tailwind classNames, same lucide-react icons
   - Same three views: login, forgot password, forgot success
   - Same form validation, password show/hide, error states

2. **`components/SignInModal.jsx`** — modal wrapper (TS removed)

3. **`components/RegistrationModal.jsx`** — registration modal (TS removed)

4. **`lib/api.js`** — `loginAgent`, `forgotPassword`, `loadConfig` converted from `src/lib/api.ts`

5. **`pages/login.js`** (Pages Router) **and** `app/login/page.jsx` (App Router) — example page that mounts `<LoginCard />`. You pick whichever your project uses.

6. **`styles/agentbazar.css`** — the CSS variables (`--ab-orange`, `--ab-orange-dark`, `--ab-ink`, `--ab-navy`, `--ab-glow`), `.glass-card`, `.shadow-ab-card`, `.shadow-ab-glow`, `animate-ab-fade-up-delay`, `animate-ab-scale-in`, `animate-ab-spin` — extracted from `src/styles.css` so the design renders identically.

7. **`README.md`** — quick install steps:
   - `npm i lucide-react`
   - Tailwind required (uses Tailwind classes throughout)
   - Import `agentbazar.css` in `_app.js` or `app/layout.jsx`
   - Replace `@/lib/api` import path if your alias differs

## Assumptions

- Your old project uses **Next.js + Tailwind + lucide-react** (same stack, just JS not TS). If Tailwind isn't set up there, tell me and I'll inline the styles instead.
- `window.location.href = "https://agentbazar.in/home"` redirect is kept as-is.
- Backend endpoints in `lib/api.ts` are kept identical.

## Technical notes

- Conversion is mechanical: strip type annotations, interfaces, generics, and `as` casts; rename `.tsx` → `.jsx`, `.ts` → `.js`. No logic changes.
- `useRef<HTMLInputElement>(null)` → `useRef(null)`.
- `useState<View>("login")` → `useState("login")`.
- Event handler types removed.
- If your Next.js page is a Server Component (App Router), I'll add `"use client"` at the top of `LoginCard.jsx` and the modals.

## Out of scope

- No design changes — pixel-identical to current preview.
- Not touching the current `.tsx` files in this Lovable project.

After you approve, I'll generate the files and give you a download link.