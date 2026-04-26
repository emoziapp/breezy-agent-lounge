# AgentBazar.in — Homepage Rebuild Plan

A premium B2B SaaS homepage built around your two core USPs: **17 years in flight ticketing** and **Series Fixed Departures**. Tripgain-style gradient accents, Tripjack-clean structure, Cleartrip-style screenshot showcases, eTrav-style news strip — all with rich, scroll-linked animations.

## What I'm taking from each reference

| Reference | What we borrow |
|---|---|
| **Tripjack** | Split hero with login card top-right, clean orange CTA, "Get Started With Us" 3-card row, benefit grid with icons, testimonial carousel, sticky top nav |
| **Travelogy** | Big "PARTNER LOGIN" emphasis, "Why ___?" 3x3 icon grid, "Advantage" two-column list with circular icons, numbered features pill-list, big agent-count tagline, dark navy footer |
| **eTrav** | "Latest Updates & Stories" blog cards, "Latest News & Updates" press-mention strip (logos like india.com), "Questions? Look Here" FAQ accordion, contact-experts CTA block |
| **Cleartrip** | Browser-mockup screenshots of the actual portal UI, pastel section backgrounds to break rhythm, agent stat cards (100%, 24x7, etc.), partner-logo strip under hero |
| **Tripgain (your color match)** | Animated gradient blobs, glow halos behind cards, marquee/parallax motion, dark hero with neon-orange highlights, scroll-linked aurora wash |
| **Akbar** | Top utility bar (helpline + email + language), product-category icon row (Flights / Series FD / Visa / Insurance — but we'll restrict to flight-only), "X Years of Excellence" badge, global partners logo grid |

We **skip**: hotels/cruise/bus/car blocks (you only do flights), white-label section, mobile-app QR (unless you have an app), generic stock travel imagery.

## Final section list (top → bottom)

1. **Sticky top bar** — helpline, email, language, "Register" + "Sign In" pills. Logo left, nav center.
2. **Hero (split)** — Left: animated headline "India's #1 B2B platform for Flight Tickets & Series Fixed Departures", subhead, 4 trust chips (17 Yrs · 10K+ Agents · 300+ Sectors · 24×7), animated SVG flight path with dotted route line drawing on load. Right: glassmorphism Login card. Background: animated navy gradient + slow-drifting orange glow blobs.
3. **Marquee partner-airlines strip** — IndiGo, Air India, Vistara, Akasa, SpiceJet, Emirates, etc. (placeholders) scrolling infinitely on hover-pause.
4. **USP — Series Fixed Departures showcase** *(your hero offering)* — Section badge "OUR FLAGSHIP", heading "Series Fixed Departures, exclusively yours". 3-card grid showing sample series deals (Route · Date · Airline · Fare from · Seats left · "Block Now" CTA). Glow halo behind the middle card. Live "X agents booking now" pulse dot.
5. **Why Choose AgentBazar** — Animated count-up stats row: **17** Years · **10,000+** Agents · **300+** Sectors · **₹0** Markup · **24×7** Support. Then 6-card icon grid (Best Series Fares, Instant Refunds, GDS + LCC, WhatsApp Notifications, Multi-Fare Choice, Dedicated Account Manager).
6. **Portal screenshots showcase** — Cleartrip-style browser mockups (placeholder UI screenshots) with feature copy on alternating sides: "Smart Search", "One-click Booking", "Live Reissue & Refund Dashboard". Parallax tilt on scroll.
7. **Video tutorials** — 6-card grid, lazy-loaded YouTube modal (kept from current build, restyled).
8. **Testimonials carousel** — Auto-rotating agent quotes with avatar + agency name + city, navigable dots. Subtle drift animation.
9. **Latest from the Blog** — 3 blog cards with cover image, category pill, title, date, "Read more". Hover lift + image zoom.
10. **In the News strip** — eTrav-style horizontal logo row of media outlets (placeholder: india.com, ET Travel, Travel Trends, etc.) with "Featured in" label.
11. **FAQ accordion** — 6–8 questions (How to register · Commission structure · Series FD booking process · Refund timelines · Payment modes · Support hours). Smooth expand animation.
12. **Final CTA banner** — Full-width navy gradient with orange aurora, "Ready to grow your agency?" + dual CTA (Register Free / Talk to Expert).
13. **Rich footer** — 4 columns (Policies · Get in Touch · Our Services · More Links), social icons, copyright, "17 years of trust" badge.

## Visual system

- **Colors**: Navy `#001d4a`, Orange `#ff6600`, Orange-dark `#e65a00`, soft section washes (mint `#e8f7f1`, peach `#fff3eb`, lavender `#f1eef9`) to alternate rhythm like Cleartrip.
- **Typography**: Sora (display, bold) + Inter (body) — already wired.
- **Animation library**: Pure CSS + Tailwind keyframes + IntersectionObserver hook for scroll reveals. No heavy libs. Includes:
  - Animated gradient mesh background (hero + CTA banner)
  - Floating glow blobs (slow 20s drift)
  - SVG route-line draw on hero
  - Count-up numbers on scroll into view
  - Marquee logo strips
  - Card hover tilt + lift
  - Fade-up staggered reveals
  - Pulse dots on "live" indicators
  - Accordion smooth height
  - Carousel auto-advance with crossfade

## Technical approach

- Single route `src/routes/index.tsx` composing all sections (this is the marketing landing page; login is a card embedded in the hero, matching Tripjack/Travelogy pattern).
- New components under `src/components/agentbazar/`:
  - `TopBar.tsx`, `HeroSplit.tsx` (rebuild), `PartnerMarquee.tsx`, `SeriesDepartures.tsx`, `WhyChoose.tsx` (with `CountUp.tsx`), `PortalShowcase.tsx`, `VideoTutorials.tsx` (restyle), `TestimonialsCarousel.tsx`, `BlogCards.tsx`, `NewsStrip.tsx`, `FAQ.tsx`, `CTABanner.tsx`, `Footer.tsx` (rebuild).
- Hook: `src/hooks/useInView.ts` for scroll-triggered animations.
- All animations defined in `src/styles.css` as `@keyframes` + utility classes (Tailwind v4 native theme).
- All copy, stats, routes, testimonials, blog titles use realistic placeholders clearly inferable as such — easy to swap later.
- Existing TanStack route shell, `__root.tsx`, and login card logic untouched (LoginCard still posts to your real API in your Next.js repo; preview uses demo handler).
- No new npm dependencies needed.

## Out of scope (this turn)

- Real API wiring (your Next.js repo already has the production-ready files from earlier).
- Real CMS/blog backend — cards are static.
- Mobile app section (no app yet).
- Multi-route expansion (About, Contact, Pricing pages) — can be a follow-up if you want them.

After approval I'll build all sections in one pass and QA at mobile + desktop viewports.