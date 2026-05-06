import { useInView } from "@/hooks/useInView";
import { Search, MousePointerClick, BarChart3, Check } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Feature = {
  icon: LucideIcon;
  eyebrow: string;
  title: string;
  desc: string;
  bullets: string[];
  mock: "search" | "booking" | "dashboard";
  flip?: boolean;
};

const FEATURES: Feature[] = [
  {
    icon: Search,
    eyebrow: "Smart Search",
    title: "Find the cheapest series fare in under 1 second",
    desc: "Unified search across 60+ airlines, 4 GDS and our exclusive series inventory — sorted by your preferred margin.",
    bullets: ["Multi-city & round-trip", "Filter by airline / refund rules", "Save searches"],
    mock: "search",
  },
  {
    icon: MousePointerClick,
    eyebrow: "One-click Booking",
    title: "Block, hold, or ticket — your call",
    desc: "Pre-fill passenger details from your CRM, lock fare for 30 minutes, or ticket instantly. PNR generated in real time.",
    bullets: ["Auto fare-rule check", "GST invoice on the spot", "Bulk PAX upload"],
    mock: "booking",
    flip: true,
  },
  {
    icon: BarChart3,
    eyebrow: "Live Dashboard",
    title: "Reissue, refund and reports — one screen",
    desc: "Track every PNR, exact refund amount, commission earned and pending receivables in real time.",
    bullets: ["Daily P&L breakdown", "Wallet auto-reconciliation", "Export to Excel / Tally"],
    mock: "dashboard",
  },
];

function Mock({ kind }: { kind: Feature["mock"] }) {
  return (
    <div className="relative w-full">
      <div className="relative bg-gradient-to-br from-neutral-100 to-neutral-200 rounded-2xl p-3 shadow-[0_30px_80px_-30px_rgba(0,29,74,0.4)]">
        <div className="relative bg-white rounded-xl overflow-hidden border border-neutral-200/60">
          <div className="browser-chrome relative h-7 bg-gradient-to-b from-neutral-50 to-neutral-100 border-b border-neutral-200/60" />
          <div className="p-4 sm:p-5 min-h-[280px]">
            {kind === "search" && (
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-2">
                  <div className="h-12 rounded-lg bg-orange-50 border border-orange-200 p-2">
                    <div className="text-[9px] text-neutral-500 uppercase font-bold">From</div>
                    <div className="text-[14px] font-extrabold text-[var(--ab-navy)]">DEL</div>
                  </div>
                  <div className="h-12 rounded-lg bg-orange-50 border border-orange-200 p-2">
                    <div className="text-[9px] text-neutral-500 uppercase font-bold">To</div>
                    <div className="text-[14px] font-extrabold text-[var(--ab-navy)]">CCU</div>
                  </div>
                  <div className="h-12 rounded-lg bg-[var(--ab-orange)] grid place-items-center text-white text-[12px] font-bold">Search</div>
                </div>
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center justify-between p-2.5 rounded-lg border border-neutral-200 hover:border-[var(--ab-orange)] transition-colors">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-md bg-neutral-100 grid place-items-center text-[10px] font-bold text-[var(--ab-navy)]">6E</div>
                      <div>
                        <div className="text-[11px] font-bold text-[var(--ab-navy)]">06:30 → 08:50</div>
                        <div className="text-[9px] text-neutral-500">2h 20m · Non-stop</div>
                      </div>
                    </div>
                    <div className="text-[13px] font-extrabold text-[var(--ab-orange)]">₹{4890 + i * 120}</div>
                  </div>
                ))}
              </div>
            )}
            {kind === "booking" && (
              <div className="space-y-3">
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-emerald-50 border border-emerald-200">
                  <div className="text-[11px] font-bold text-emerald-800">PNR Confirmed</div>
                  <div className="text-[11px] font-extrabold text-emerald-800">XYZ123</div>
                </div>
                {[
                  { l: "Passenger", v: "Mr. Rahul Sharma" },
                  { l: "Flight", v: "6E-2034 · DEL→BOM" },
                  { l: "Date", v: "12 Nov 2026" },
                  { l: "Fare", v: "₹4,890" },
                  { l: "Commission", v: "₹245" },
                ].map((r) => (
                  <div key={r.l} className="flex items-center justify-between text-[12px] py-2 border-b border-dashed border-neutral-200">
                    <span className="text-neutral-500 font-medium">{r.l}</span>
                    <span className="font-bold text-[var(--ab-navy)]">{r.v}</span>
                  </div>
                ))}
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <div className="h-9 rounded-lg bg-[var(--ab-navy)] grid place-items-center text-white text-[11px] font-bold">Issue Ticket</div>
                  <div className="h-9 rounded-lg border border-neutral-200 grid place-items-center text-[11px] font-bold text-[var(--ab-navy)]">Hold 30m</div>
                </div>
              </div>
            )}
            {kind === "dashboard" && (
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { l: "Today's GMV", v: "₹4.2L" },
                    { l: "Bookings", v: "127" },
                    { l: "Commission", v: "₹18.4K" },
                  ].map((s) => (
                    <div key={s.l} className="p-2 rounded-lg bg-gradient-to-br from-orange-50 to-white border border-orange-100">
                      <div className="text-[9px] text-neutral-500 uppercase font-bold">{s.l}</div>
                      <div className="text-[14px] font-extrabold text-[var(--ab-navy)]">{s.v}</div>
                    </div>
                  ))}
                </div>
                <div className="h-24 rounded-lg bg-gradient-to-tr from-orange-50 via-orange-100/40 to-transparent relative overflow-hidden">
                  <svg viewBox="0 0 200 80" className="w-full h-full" preserveAspectRatio="none">
                    <defs><linearGradient id="g" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#ff6600" /><stop offset="100%" stopColor="#ff6600" stopOpacity="0" /></linearGradient></defs>
                    <path d="M0 60 Q 30 40 50 50 T 100 30 T 150 38 T 200 12 L 200 80 L 0 80 Z" fill="url(#g)" opacity="0.3" />
                    <path d="M0 60 Q 30 40 50 50 T 100 30 T 150 38 T 200 12" fill="none" stroke="#ff6600" strokeWidth="2" />
                  </svg>
                </div>
                {["Refund · DEL-BLR · ₹2,340 ✓", "Reissue · BOM-DXB · pending"].map((t) => (
                  <div key={t} className="text-[11px] text-neutral-700 flex items-center gap-2 py-1.5 border-b border-dashed border-neutral-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--ab-orange)]" /> {t}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="absolute -bottom-4 -right-4 px-3 py-2 rounded-full bg-[var(--ab-navy)] text-white text-[11px] font-bold shadow-xl animate-ab-float">
        ⚡ Real-time
      </div>
    </div>
  );
}

function FeatureRow({ f }: { f: Feature }) {
  const view = useInView();
  const Icon = f.icon;
  return (
    <div ref={view.ref} className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
      <div className={`${f.flip ? "lg:order-2" : ""} reveal ${view.inView ? "is-in" : ""}`}>
        <Mock kind={f.mock} />
      </div>
      <div className={`${f.flip ? "lg:order-1" : ""} reveal reveal-delay-2 ${view.inView ? "is-in" : ""}`}>
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
  return (
    <section id="showcase" className="py-20 sm:py-28 bg-ab-soft-peach overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8">
        <div className="text-center max-w-[760px] mx-auto mb-16">
          <span className="inline-block text-[11px] tracking-[0.22em] uppercase font-bold text-[var(--ab-orange)] mb-4">
            Inside the Portal
          </span>
          <h2 className="font-display text-[clamp(30px,4.2vw,46px)] font-extrabold tracking-tight text-[var(--ab-navy)] leading-tight mb-4">
            A workspace your team will actually <span className="text-ab-accent">enjoy using</span>
          </h2>
          <p className="text-[16px] text-neutral-600">
            Designed with 100+ travel agents over 17 years. Every screen is one click and zero confusion.
          </p>
        </div>

        <div className="space-y-20 sm:space-y-28">
          {FEATURES.map((f) => <FeatureRow key={f.eyebrow} f={f} />)}
        </div>
      </div>
    </section>
  );
}
