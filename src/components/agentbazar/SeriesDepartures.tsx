import { Plane, Calendar, Users, ArrowRight, Sparkles } from "lucide-react";
import { useInView } from "@/hooks/useInView";

const DEALS = [
  {
    from: "GAU", to: "MAA", airline: "​", dates: "01 May → 30 July",
    fare: "₹6,600", seats: 0, tag: "Diwali Special",
  },
  {
    from: "GAU", to: "CCU", airline: "Air India AI", dates: "01 May → 30 July",
    fare: "₹6,600", seats: 0, tag: "Most Booked", featured: true,
  },
  {
    from: "BLR", to: "BKK", airline: "Thai TG", dates: "01 May → 30 July",
    fare: "₹17,990", seats: 0, tag: "Group Series",
  },
];

export function SeriesDepartures() {
  const { ref, inView } = useInView();
  return (
    <section
      id="flagship"
      ref={ref}
      className="relative py-20 bg-ab-soft-cream overflow-hidden sm:py-[100px]"
    >
      {/* Decorative blob */}
      <div className="absolute top-20 -left-32 w-[400px] h-[400px] rounded-full blur-[100px] opacity-25 bg-[var(--ab-orange)] animate-ab-blob" aria-hidden />
      <div className="absolute bottom-10 -right-32 w-[420px] h-[420px] rounded-full blur-[100px] opacity-20 bg-[var(--ab-navy-2)] animate-ab-blob" style={{ animationDelay: "-9s" }} aria-hidden />

      <div className="relative max-w-[1280px] mx-auto px-5 sm:px-8">
        <div className={`text-center max-w-[760px] mx-auto mb-14 reveal ${inView ? "is-in" : ""}`}>
          <span className="inline-flex items-center gap-2 text-[11px] tracking-[0.22em] uppercase font-bold text-[var(--ab-orange)] px-3.5 py-1.5 rounded-full bg-orange-100/70 border border-orange-200 mb-5">
            <Sparkles size={12} /> Our Flagship · 17 Years of Series Fares
          </span>
          <h2 className="font-display text-[clamp(30px,4.2vw,46px)] font-extrabold tracking-tight text-[var(--ab-navy)] leading-tight mb-4">
            Series Fixed Departures, <span className="text-ab-accent">exclusively yours</span>
          </h2>
          <p className="text-[16px] sm:text-[17px] leading-relaxed text-neutral-600">
            Block guaranteed seats from our exclusive series inventory — pre-negotiated fares,
            confirmed PNRs, and instant blocking for your group bookings.
          </p>
          <div className="inline-flex items-center gap-2 mt-5 text-[13px] font-semibold text-emerald-700 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ab-pulse-dot" />
            <span>247 agents booking now · 12 series released today</span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {DEALS.map((d, i) => (
            <div
              key={i}
              className={`relative reveal reveal-delay-${i + 1} ${inView ? "is-in" : ""} ${d.featured ? "md:-translate-y-3" : ""}`}
            >
              {d.featured && (
                <div className="absolute -inset-1.5 rounded-3xl bg-gradient-to-br from-[var(--ab-orange)] to-[#ff8a3d] opacity-60 blur-xl -z-10" />
              )}
              <article className={`tilt-card relative bg-white p-6 border-2 transition-all hover:shadow-[0_24px_60px_-20px_rgba(0,29,74,0.25)] ${d.featured ? "border-[var(--ab-orange)] shadow-[0_24px_60px_-20px_rgba(255,102,0,0.4)]" : "border-neutral-100"} rounded-3xl`}>
                <div className="flex items-start justify-between mb-5">
                  <span className={`text-[10px] tracking-[0.16em] uppercase font-bold px-2.5 py-1 rounded-full ${d.featured ? "bg-[var(--ab-orange)] text-white" : "bg-orange-50 text-[var(--ab-orange)]"}`}>
                    {d.tag}
                  </span>
                  <span className="text-[11px] font-bold text-emerald-700 inline-flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ab-pulse-dot" />
                    LIVE
                  </span>
                </div>

                <div className="flex items-center gap-3 mb-1">
                  <span className="font-display text-[32px] font-extrabold text-[var(--ab-navy)] leading-none">{d.from}</span>
                  <div className="flex-1 relative h-px bg-gradient-to-r from-neutral-200 via-[var(--ab-orange)] to-neutral-200">
                    <Plane size={18} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[var(--ab-orange)] bg-white px-0.5" />
                  </div>
                  <span className="font-display text-[32px] font-extrabold text-[var(--ab-navy)] leading-none">{d.to}</span>
                </div>
                <p className="text-[13px] text-neutral-500 font-medium mb-5">{d.airline}</p>

                <div className="space-y-2.5 mb-6 text-[13px] text-neutral-700">
                  <div className="flex items-center gap-2 font-normal text-sm"><Calendar size={14} className="text-[var(--ab-orange)]" /> {d.dates}</div>
                  <div className="flex items-center gap-2 font-normal text-sm">
                    {d.seats > 0 && <><Users size={14} className="text-[var(--ab-orange)]" /> {d.seats} seats remaining</>}
                  </div>
                </div>

                <div className="flex items-end justify-between pt-5 border-t border-dashed border-neutral-200">
                  <div>
                    <span className="text-[11px] text-neutral-500 font-medium uppercase tracking-wide">Fare from</span>
                    <div className="font-display text-[24px] font-extrabold text-[var(--ab-navy)] leading-none mt-1">{d.fare}</div>
                  </div>
                  <button className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-[var(--ab-navy)] text-white text-[13px] font-bold hover:bg-[var(--ab-orange)] transition-all hover:shadow-ab-glow group/btn font-sans">
                    Book Now
                    <ArrowRight size={14} className="transition-transform group-hover/btn:translate-x-0.5" />
                  </button>
                </div>
              </article>
            </div>
          ))}
        </div>

        <div className={`text-center mt-10 reveal reveal-delay-4 ${inView ? "is-in" : ""}`}>
          <a href="#" className="inline-flex items-center gap-2 text-[var(--ab-navy)] font-bold text-[15px] hover:text-[var(--ab-orange)] transition-colors">
            Browse all 80+ live series departures <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
