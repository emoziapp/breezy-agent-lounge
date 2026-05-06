import { LoginCard } from "./LoginCard";
import { ShieldCheck, Award, TrendingUp, IndianRupee } from "lucide-react";

const TRUST_CHIPS = [
  { icon: Award, strong: "17 Years", label: "of Excellence" },
  { icon: ShieldCheck, strong: "10K+", label: "Travel Agents" },
  { icon: TrendingUp, strong: "300+", label: "Sectors" },
  { icon: IndianRupee, strong: "​", label: "Support" },
];

export function HeroSplit() {
  return (
    <section id="login" className="relative w-full bg-ab-aurora overflow-hidden font-sans">
      {/* Animated glow blobs */}
      <div
        className="pointer-events-none absolute -top-40 -left-32 w-[520px] h-[520px] rounded-full blur-[100px] opacity-40 animate-ab-blob"
        style={{ background: "radial-gradient(circle, #ff6600 0%, transparent 70%)" }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute top-1/2 -right-40 w-[600px] h-[600px] rounded-full blur-[110px] opacity-50 animate-ab-blob"
        style={{ background: "radial-gradient(circle, #003a8c 0%, transparent 70%)", animationDelay: "-6s" }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-32 left-1/3 w-[420px] h-[420px] rounded-full blur-[100px] opacity-30 animate-ab-blob"
        style={{ background: "radial-gradient(circle, #ff8a3d 0%, transparent 70%)", animationDelay: "-12s" }}
        aria-hidden
      />

      {/* Animated SVG flight path */}
      <svg
        className="pointer-events-none absolute inset-0 w-full h-full opacity-[0.18]"
        viewBox="0 0 1200 700"
        preserveAspectRatio="none"
        aria-hidden
      >
        <defs>
          <linearGradient id="ab-route" x1="0" x2="1">
            <stop offset="0%" stopColor="#ff6600" />
            <stop offset="100%" stopColor="#ff8a3d" />
          </linearGradient>
        </defs>
        <path
          d="M 60 540 Q 350 80 700 320 T 1180 160"
          fill="none"
          stroke="url(#ab-route)"
          strokeWidth="2.5"
          strokeDasharray="6 8"
          strokeLinecap="round"
          className="animate-ab-draw"
        />
      </svg>

      {/* Split layout */}
      <div className="relative z-10 mx-auto max-w-[1280px] px-5 sm:px-8 py-12 sm:py-20 grid lg:grid-cols-[1.15fr_0.85fr] gap-10 lg:gap-14 items-center">
        {/* LEFT */}
        <div className="text-white order-2 lg:order-1 text-center lg:text-left">
          <span className="inline-flex items-center gap-2 text-[11px] tracking-[0.22em] uppercase font-bold text-[var(--ab-orange)] px-3.5 py-1.5 rounded-full bg-orange-500/12 border border-orange-500/30 mb-6 animate-ab-fade-up">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--ab-orange)] animate-ab-pulse-dot" />
            India's #1 B2B Flight Marketplace · Since 2008
          </span>

          <h1 className="font-display tracking-tight leading-[1.02] text-[clamp(36px,5.2vw,64px)] mb-6 animate-ab-fade-up font-bold">
            Flight Tickets &{" "}
            <span className="text-ab-accent">Series Fixed</span>{" "}
            Departures —{" "}
            <span className="relative inline-block">
              built for agents
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 8" preserveAspectRatio="none" aria-hidden>
                <path d="M2 5 Q 50 0 100 4 T 198 3" stroke="#ff6600" strokeWidth="3" fill="none" strokeLinecap="round" />
              </svg>
            </span>
          </h1>

          <p className="text-[17px] sm:text-[18px] leading-relaxed text-white/80 max-w-[600px] mb-8 mx-auto lg:mx-0 animate-ab-fade-up-delay">
            17 years of trust. Exclusive series-fare inventory across 300+ sectors with
            live block, instant ticketing, and zero hidden markup — purpose-built for
            travel agents and consolidators.
          </p>

          {/* Trust chips */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8 max-w-[640px] mx-auto lg:mx-0">
            {TRUST_CHIPS.map((b, i) => {
              const Icon = b.icon;
              return (
                <div
                  key={b.label}
                  className="flex flex-col items-start p-3.5 rounded-xl bg-white/[0.06] border border-white/12 backdrop-blur-md transition-all hover:-translate-y-1 hover:bg-white/[0.10] hover:border-[var(--ab-orange)]/40 animate-ab-fade-up"
                  style={{ animationDelay: `${0.15 + i * 0.07}s` }}
                >
                  <Icon className="text-[var(--ab-orange)] mb-2" size={18} />
                  <strong className="font-display text-[20px] font-extrabold text-white leading-none">
                    {b.strong}
                  </strong>
                  <span className="text-[12px] text-white/65 font-medium mt-1">
                    {b.label}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="flex flex-wrap items-center gap-3 justify-center lg:justify-start">
            <a href="#flagship" className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-gradient-to-br from-[var(--ab-orange)] to-[var(--ab-orange-dark)] text-white font-bold text-[14px] shadow-ab-glow hover:shadow-ab-glow-lg hover:-translate-y-0.5 transition-all">
              See Today's Series Deals →
            </a>
            <a href="#why" className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white/8 border border-white/20 text-white font-bold text-[14px] hover:bg-white/15 transition-all backdrop-blur-md">
              Why AgentBazar
            </a>
          </div>
        </div>

        {/* RIGHT — Login */}
        <div className="flex justify-center order-1 lg:order-2 relative">
          {/* Card glow */}
          <div className="absolute inset-0 -z-0 blur-3xl opacity-40 rounded-3xl"
               style={{ background: "radial-gradient(circle at 50% 30%, #ff6600 0%, transparent 60%)" }} />
          <LoginCard />
        </div>
      </div>
    </section>
  );
}
