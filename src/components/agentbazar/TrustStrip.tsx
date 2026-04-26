const AGENCIES = [
  { name: "TripFly Holidays", color: "#0ea5e9" },
  { name: "SkyBridge Travels", color: "#8b5cf6" },
  { name: "GlobeTrek Tours", color: "#10b981" },
  { name: "AeroGate Agencies", color: "#f59e0b" },
  { name: "BlueWing Travel", color: "#ef4444" },
  { name: "Voyager Bookings", color: "#3b82f6" },
];

const initials = (n: string) =>
  n.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();

export function TrustStrip() {
  return (
    <section className="px-5 py-9 bg-gradient-to-br from-[var(--ab-navy)] to-[var(--ab-navy-2)] text-white font-sans">
      <div className="max-w-[1200px] mx-auto flex flex-wrap items-center justify-between gap-8">
        <div className="flex flex-col leading-snug max-sm:items-center max-sm:text-center w-full sm:w-auto">
          <strong className="text-[22px] font-extrabold text-[var(--ab-orange)] tracking-tight">
            Trusted by 10,000+
          </strong>
          <span className="text-sm text-white/75">
            travel agents across India
          </span>
        </div>
        <div className="flex flex-wrap gap-4 items-center justify-center w-full sm:w-auto">
          {AGENCIES.map((a) => (
            <div
              key={a.name}
              title={a.name}
              className="inline-flex items-center gap-2.5 bg-white/[0.06] border border-white/12 pl-2 pr-3.5 py-2 rounded-full transition-all hover:-translate-y-px hover:bg-white/10 max-sm:p-1"
            >
              <span
                className="w-8 h-8 rounded-full grid place-items-center text-[11px] font-extrabold text-white tracking-wide"
                style={{ background: a.color }}
              >
                {initials(a.name)}
              </span>
              <span className="text-[13px] font-semibold text-white/90 max-sm:hidden">
                {a.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
