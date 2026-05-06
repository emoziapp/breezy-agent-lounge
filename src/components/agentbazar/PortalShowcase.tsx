import { useEffect, useRef, useState } from "react";
import { useInView } from "@/hooks/useInView";
import { MousePointerClick, CalendarDays, Headphones, LayoutDashboard, Check, ChevronLeft, ChevronRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import fareHunting from "@/assets/portal/fare-hunting.jpg";
import seriesCalendar from "@/assets/portal/series-calendar.jpg";
import serviceRequest from "@/assets/portal/service-request.jpg";
import dashboard from "@/assets/portal/dashboard.jpg";

type Feature = {
  icon: LucideIcon;
  eyebrow: string;
  title: string;
  desc: string;
  bullets: string[];
  image: string;
};

const FEATURES: Feature[] = [
  {
    icon: MousePointerClick,
    eyebrow: "No manual fare hunting",
    title: "Click any visible sector, check live availability, and issue tickets instantly",
    desc: "Skip manual fare searching and save valuable booking time. Simply click on any visible sector to instantly check live availability, view fixed fares, and issue tickets with immediate PNR confirmation — all from a single streamlined dashboard.",
    bullets: ["One-click sector selection", "Instant PNR confirmation", "Single streamlined dashboard"],
    image: fareHunting,
  },
  {
    icon: CalendarDays,
    eyebrow: "Plan Smarter",
    title: "Track live series fares across the month and book the best available departures instantly",
    desc: "View fixed fare availability date-wise across multiple sectors in a single calendar view. Quickly identify the lowest fares, upcoming departures, and active series routes without performing repeated searches.",
    bullets: ["Date-wise fare availability", "Lowest fares at a glance", "No repeated searches"],
    image: seriesCalendar,
  },
  {
    icon: Headphones,
    eyebrow: "Fast & Hassle-Free",
    title: "Service requests handled with faster processing and real-time tracking",
    desc: "Submit booking corrections, name changes, account-related requests, and other support queries through a dedicated service panel with faster processing and real-time tracking.",
    bullets: ["Booking corrections & name changes", "Account-related queries", "Real-time request tracking"],
    image: serviceRequest,
  },
  {
    icon: LayoutDashboard,
    eyebrow: "Smart Dashboard",
    title: "Faster booking management with insights built for travel agents",
    desc: "Monitor bookings, sales, revenue, top-performing airlines, and recent transactions from a centralized dashboard designed specifically for travel agents. Get quick business insights and manage daily operations more efficiently.",
    bullets: ["Sales, revenue & top airlines", "Centralized booking view", "Quick business insights"],
    image: dashboard,
  },
];

function Slide({ f }: { f: Feature }) {
  const Icon = f.icon;
  return (
    <div className="min-w-full grid lg:grid-cols-2 gap-10 lg:gap-16 items-center px-1">
      <div className="relative">
        <div className="relative bg-gradient-to-br from-neutral-100 to-neutral-200 rounded-2xl p-3 shadow-[0_30px_80px_-30px_rgba(0,29,74,0.4)]">
          <div className="relative bg-white rounded-xl overflow-hidden border border-neutral-200/60">
            <div className="relative h-7 bg-gradient-to-b from-neutral-50 to-neutral-100 border-b border-neutral-200/60 flex items-center gap-1.5 px-3">
              <span className="w-2 h-2 rounded-full bg-red-400" />
              <span className="w-2 h-2 rounded-full bg-yellow-400" />
              <span className="w-2 h-2 rounded-full bg-green-400" />
            </div>
            <img src={f.image} alt={f.eyebrow} className="block w-full h-auto" loading="lazy" />
          </div>
        </div>
        <div className="absolute -bottom-4 -right-4 px-3 py-2 rounded-full bg-[var(--ab-navy)] text-white text-[11px] font-bold shadow-xl animate-ab-float">
          ⚡ Real-time
        </div>
      </div>
      <div>
        <span className="inline-flex items-center gap-2 text-[11px] tracking-[0.22em] uppercase font-bold text-[var(--ab-orange)] mb-3">
          <Icon size={14} /> {f.eyebrow}
        </span>
        <h3 className="font-display text-[clamp(24px,3vw,34px)] font-extrabold text-[var(--ab-navy)] leading-tight mb-4">
          {f.title}
        </h3>
        <p className="text-[16px] text-neutral-600 leading-relaxed mb-6">{f.desc}</p>
        <ul className="space-y-2.5">
          {f.bullets.map((b) => (
            <li key={b} className="flex items-start gap-2.5 text-[15px] text-neutral-700">
              <span className="mt-0.5 w-5 h-5 rounded-full bg-[var(--ab-orange)] grid place-items-center flex-shrink-0">
                <Check className="text-white" size={12} strokeWidth={3} />
              </span>
              {b}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function PortalShowcase() {
  const view = useInView<HTMLDivElement>();
  const [index, setIndex] = useState(0);
  const total = FEATURES.length;
  const pausedRef = useRef(false);

  useEffect(() => {
    const id = window.setInterval(() => {
      if (!pausedRef.current) setIndex((i) => (i + 1) % total);
    }, 6000);
    return () => window.clearInterval(id);
  }, [total]);

  const go = (n: number) => setIndex((n + total) % total);

  return (
    <section id="showcase" className="py-20 sm:py-28 bg-ab-soft-peach overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8">
        <div className="text-center max-w-[760px] mx-auto mb-16">
          <span className="inline-block tracking-[0.22em] uppercase font-bold mb-4 text-sm text-[#ff8b38]">
            Inside the Portal
          </span>
          <h2 className="font-display text-[clamp(30px,4.2vw,46px)] font-extrabold tracking-tight text-[var(--ab-navy)] leading-tight mb-4">
            A workspace your team will actually <span className="text-ab-accent">enjoy using</span>
          </h2>
          <p className="text-[16px] text-neutral-600">
            Designed with 100+ travel agents over 17 years. Every screen is one click and zero confusion.
          </p>
        </div>

        <div
          ref={view.ref}
          className={`reveal ${view.inView ? "is-in" : ""}`}
          onMouseEnter={() => { pausedRef.current = true; }}
          onMouseLeave={() => { pausedRef.current = false; }}
        >
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-700 ease-[cubic-bezier(0.65,0,0.35,1)]"
              style={{ transform: `translateX(-${index * 100}%)` }}
            >
              {FEATURES.map((f) => (
                <Slide key={f.eyebrow} f={f} />
              ))}
            </div>
          </div>

          <div className="mt-10 flex items-center justify-between gap-4">
            <button
              onClick={() => go(index - 1)}
              aria-label="Previous"
              className="w-11 h-11 rounded-full bg-white border border-neutral-200 grid place-items-center text-[var(--ab-navy)] hover:bg-[var(--ab-navy)] hover:text-white transition-colors shadow-sm"
            >
              <ChevronLeft size={18} />
            </button>

            <div className="flex items-center gap-2">
              {FEATURES.map((f, i) => (
                <button
                  key={f.eyebrow}
                  onClick={() => go(i)}
                  aria-label={`Go to ${f.eyebrow}`}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    i === index ? "w-10 bg-[var(--ab-orange)]" : "w-4 bg-neutral-300 hover:bg-neutral-400"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={() => go(index + 1)}
              aria-label="Next"
              className="w-11 h-11 rounded-full bg-white border border-neutral-200 grid place-items-center text-[var(--ab-navy)] hover:bg-[var(--ab-navy)] hover:text-white transition-colors shadow-sm"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
