import { useInView } from "@/hooks/useInView";

const OUTLETS = [
  { name: "India.com", color: "#e63946" },
  { name: "ET Travel World", color: "#003a8c" },
  { name: "Travel Trends Today", color: "#10b981" },
  { name: "Express Travel World", color: "#f59e0b" },
  { name: "TravelBiz Monitor", color: "#8b5cf6" },
  { name: "TTW India", color: "#0ea5e9" },
];

export function NewsStrip() {
  const { ref, inView } = useInView();
  return (
    <section ref={ref} className="py-14 bg-white border-y border-neutral-100">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8">
        <div className={`text-center mb-8 reveal ${inView ? "is-in" : ""}`}>
          <span className="inline-block text-[11px] tracking-[0.22em] uppercase font-bold text-neutral-500">
            ★ Featured In · Trusted by India's leading travel media ★
          </span>
        </div>
        <div className={`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 reveal reveal-delay-2 ${inView ? "is-in" : ""}`}>
          {OUTLETS.map(o => (
            <div
              key={o.name}
              className="group flex items-center justify-center px-4 py-5 rounded-xl bg-gradient-to-br from-neutral-50 to-white border border-neutral-100 hover:border-[var(--ab-orange)]/30 hover:-translate-y-0.5 transition-all"
            >
              <div className="text-center">
                <div
                  className="font-display text-[15px] sm:text-[16px] font-extrabold tracking-tight transition-colors"
                  style={{ color: o.color }}
                >
                  {o.name}
                </div>
                <div className="text-[9px] tracking-[0.18em] uppercase font-bold text-neutral-400 mt-1">
                  Featured
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
