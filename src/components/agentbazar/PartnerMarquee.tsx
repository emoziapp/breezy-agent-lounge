const AIRLINES = [
  "IndiGo", "Air India", "Vistara", "Akasa Air", "SpiceJet", "GoAir",
  "Emirates", "Qatar Airways", "Etihad", "Singapore Airlines", "Lufthansa", "Thai Airways",
];

export function PartnerMarquee() {
  const items = [...AIRLINES, ...AIRLINES];
  return (
    <section className="relative py-7 bg-white border-y border-neutral-100 overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 mb-4 flex items-center gap-3">
        <span className="h-px flex-1 bg-neutral-200" />
        <span className="text-[11px] tracking-[0.22em] uppercase font-bold text-neutral-500">
          Inventory from 60+ airlines & 4 major GDS
        </span>
        <span className="h-px flex-1 bg-neutral-200" />
      </div>
      <div
        className="relative group"
        style={{ maskImage: "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)", WebkitMaskImage: "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)" }}
      >
        <div className="flex w-max animate-ab-marquee group-hover:[animation-play-state:paused]">
          {items.map((a, i) => (
            <div
              key={i}
              className="mx-6 sm:mx-8 flex items-center gap-2.5 text-[var(--ab-navy)]/75 hover:text-[var(--ab-orange)] transition-colors"
            >
              <span className="inline-grid place-items-center w-9 h-9 rounded-lg bg-gradient-to-br from-neutral-100 to-neutral-200 text-[var(--ab-navy)] font-extrabold text-[13px]">
                {a.split(" ").map(w => w[0]).slice(0, 2).join("")}
              </span>
              <span className="font-display font-bold text-[15px] sm:text-[17px] tracking-tight whitespace-nowrap">
                {a}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
