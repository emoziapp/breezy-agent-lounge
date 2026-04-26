import { useEffect, useState } from "react";
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useInView } from "@/hooks/useInView";

const TESTIMONIALS = [
  {
    quote: "AgentBazar's series inventory has been a game-changer for our group bookings. We've grown our outbound business 3× in 18 months.",
    name: "Rahul Mehta",
    agency: "SkyHigh Holidays",
    city: "Mumbai",
    color: "#ff6600",
  },
  {
    quote: "17 years of trust shows. The team understands what an agent actually needs — not just clicks but margin, refunds, and accountability.",
    name: "Priya Sharma",
    agency: "WanderWell Travels",
    city: "Delhi",
    color: "#003a8c",
  },
  {
    quote: "Best fares for Diwali and summer Goa series, hands down. Their dedicated RM gets us blocks even when other portals show sold out.",
    name: "Anil Kumar",
    agency: "Coastline Tours",
    city: "Bengaluru",
    color: "#10b981",
  },
  {
    quote: "Refund automation alone saves my team 4 hours every day. The dashboard is genuinely the cleanest I've used in 12 years of agency life.",
    name: "Meera Iyer",
    agency: "Iyer Travel Solutions",
    city: "Chennai",
    color: "#8b5cf6",
  },
];

export function TestimonialsCarousel() {
  const [idx, setIdx] = useState(0);
  const { ref, inView } = useInView();

  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % TESTIMONIALS.length), 5500);
    return () => clearInterval(t);
  }, []);

  const t = TESTIMONIALS[idx];
  return (
    <section ref={ref} className="py-20 sm:py-24 bg-white">
      <div className="max-w-[1100px] mx-auto px-5 sm:px-8">
        <div className={`text-center mb-12 reveal ${inView ? "is-in" : ""}`}>
          <span className="inline-block text-[11px] tracking-[0.22em] uppercase font-bold text-[var(--ab-orange)] mb-3">
            Loved by Agents
          </span>
          <h2 className="font-display text-[clamp(28px,3.8vw,40px)] font-extrabold tracking-tight text-[var(--ab-navy)] mb-3">
            10,000+ agencies. <span className="text-ab-accent">One trusted partner.</span>
          </h2>
          <div className="inline-flex items-center gap-1.5 mt-2">
            {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={16} className="text-[var(--ab-orange)] fill-[var(--ab-orange)]" />)}
            <span className="ml-2 text-[13px] font-semibold text-neutral-600">4.8 / 5 from 2,400+ verified agents</span>
          </div>
        </div>

        <div className={`relative reveal reveal-delay-2 ${inView ? "is-in" : ""}`}>
          <div className="relative rounded-3xl bg-gradient-to-br from-white to-orange-50/40 border border-neutral-100 p-8 sm:p-12 shadow-[0_24px_60px_-30px_rgba(0,29,74,0.2)] overflow-hidden">
            <Quote className="absolute top-6 right-6 text-[var(--ab-orange)]/15" size={120} strokeWidth={1.5} />
            <div key={idx} className="animate-ab-fade-up relative z-10">
              <p className="font-display text-[clamp(18px,2.4vw,26px)] font-semibold text-[var(--ab-navy)] leading-relaxed mb-7 max-w-[820px]">
                "{t.quote}"
              </p>
              <div className="flex items-center gap-4">
                <div
                  className="w-14 h-14 rounded-full grid place-items-center text-white font-extrabold text-[18px]"
                  style={{ background: t.color }}
                >
                  {t.name.split(" ").map(w => w[0]).slice(0, 2).join("")}
                </div>
                <div>
                  <div className="font-bold text-[15px] text-[var(--ab-navy)]">{t.name}</div>
                  <div className="text-[13px] text-neutral-600">{t.agency} · {t.city}</div>
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-neutral-100">
              <div className="flex items-center gap-2">
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setIdx(i)}
                    aria-label={`Show testimonial ${i + 1}`}
                    className={`h-2 rounded-full transition-all ${i === idx ? "w-8 bg-[var(--ab-orange)]" : "w-2 bg-neutral-300 hover:bg-neutral-400"}`}
                  />
                ))}
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => setIdx((idx - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)} className="w-9 h-9 rounded-full border border-neutral-200 hover:border-[var(--ab-orange)] hover:text-[var(--ab-orange)] grid place-items-center transition-colors" aria-label="Previous">
                  <ChevronLeft size={16} />
                </button>
                <button onClick={() => setIdx((idx + 1) % TESTIMONIALS.length)} className="w-9 h-9 rounded-full bg-[var(--ab-navy)] text-white hover:bg-[var(--ab-orange)] grid place-items-center transition-colors" aria-label="Next">
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
