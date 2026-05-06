import { useInView, useCountUp } from "@/hooks/useInView";
import {
  Wallet, Zap, RefreshCw, MessageSquare, LayoutDashboard, UserCheck,
  Award, Users, Globe, IndianRupee, Coins,
} from "lucide-react";

const STATS = [
  { value: 17, suffix: "", label: "Years of Excellence", icon: Award },
  { value: 10000, suffix: "+", label: "Travel Agents", icon: Users, format: "k" },
  { value: 300, suffix: "+", label: "Active Sectors", icon: Globe },
  { value: 0, suffix: "₹0", label: "PAYMENT GATEWAY CHARGES", icon: Coins, isText: true },
  { value: 24, suffix: "​", label: "Live Support", icon: IndianRupee },
];

const FEATURES = [
  { icon: Wallet, title: "Best Series Fares", desc: "Pre-negotiated bulk inventory at fares no other platform can match." },
  { icon: Zap, title: "Instant Ticketing", desc: "Sub-second PNR generation with auto-fare validation." },
  { icon: RefreshCw, title: "Instant Refunds", desc: "Online cancellation with exact refund preview before you confirm." },
  { icon: MessageSquare, title: "WhatsApp Updates", desc: "Itinerary, reschedules and refund alerts straight to WhatsApp." },
  { icon: LayoutDashboard, title: "Multi-Fare Choice", desc: "Compare 60+ airlines and 4 GDS in one unified search." },
  { icon: UserCheck, title: "Account Manager", desc: "A dedicated relationship manager for every active agency." },
];

function Stat({ s, start }: { s: typeof STATS[number]; start: boolean }) {
  const v = useCountUp(s.value, 1800, start);
  const Icon = s.icon;
  const display = s.isText
    ? s.suffix
    : s.format === "k"
      ? `${Math.floor(v / 1000)}K${s.suffix}`
      : `${v}${s.suffix}`;
  return (
    <div className="flex flex-col items-center text-center px-4">
      <Icon className="text-[var(--ab-orange)] mb-2" size={22} />
      <div className="font-display text-[clamp(28px,4vw,42px)] font-extrabold text-white leading-none mb-1.5">
        {display}
      </div>
      <div className="text-[12px] sm:text-[13px] text-white/70 font-semibold tracking-wide uppercase">
        {s.label}
      </div>
    </div>
  );
}

export function WhyChoose() {
  const stats = useInView();
  const grid = useInView();
  return (
    <section id="why" className="relative bg-white">
      {/* Stats band */}
      <div ref={stats.ref} className="relative bg-ab-aurora overflow-hidden">
        <div className="absolute -top-32 left-1/4 w-[400px] h-[400px] rounded-full blur-[100px] opacity-30 bg-[var(--ab-orange)] animate-ab-blob" aria-hidden />
        <div className="relative max-w-[1280px] mx-auto px-5 sm:px-8 py-16">
          <div className={`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-4 reveal ${stats.inView ? "is-in" : ""}`}>
            {STATS.map((s) => (
              <Stat key={s.label} s={s} start={stats.inView} />
            ))}
          </div>
        </div>
      </div>

      {/* Feature grid */}
      <div ref={grid.ref} className="bg-ab-soft-mint py-20 sm:py-24">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8">
          <div className={`text-center max-w-[720px] mx-auto mb-14 reveal ${grid.inView ? "is-in" : ""}`}>
            <span className="inline-block text-[11px] tracking-[0.22em] uppercase font-bold text-[var(--ab-orange)] mb-4">
              Why AgentBazar
            </span>
            <h2 className="font-display text-[clamp(30px,4.2vw,44px)] font-extrabold tracking-tight text-[var(--ab-navy)] leading-tight mb-4">
              Built for travel agents, <span className="text-ab-accent">by travel people</span>
            </h2>
            <p className="text-[16px] text-neutral-600">
              17 years of being on your side of the counter — every feature shipped because an agent asked for it.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((f, i) => {
              const Icon = f.icon;
              return (
                <article
                  key={f.title}
                  className={`tilt-card group relative bg-white rounded-2xl p-6 border border-neutral-100 hover:border-[var(--ab-orange)]/30 hover:shadow-[0_20px_50px_-20px_rgba(0,29,74,0.2)] transition-all reveal reveal-delay-${(i % 5) + 1} ${grid.inView ? "is-in" : ""}`}
                >
                  <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-orange-100 to-orange-50 grid place-items-center mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="text-[var(--ab-orange)]" size={22} />
                    <div className="absolute inset-0 rounded-xl bg-[var(--ab-orange)] opacity-0 group-hover:opacity-10 blur-xl transition-opacity" />
                  </div>
                  <h3 className="font-display text-[18px] font-extrabold text-[var(--ab-navy)] mb-1.5">
                    {f.title}
                  </h3>
                  <p className="text-[14px] text-neutral-600 leading-relaxed">{f.desc}</p>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
