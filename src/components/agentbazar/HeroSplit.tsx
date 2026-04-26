import { LoginCard } from "./LoginCard";
import logo from "@/assets/agentbazar-logo.png";

export function HeroSplit() {
  return (
    <section className="relative min-h-screen w-full bg-ab-gradient overflow-hidden font-sans">
      {/* glow blobs */}
      <div
        className="pointer-events-none absolute -top-32 -right-32 w-[480px] h-[480px] rounded-full blur-[80px] opacity-25"
        style={{ background: "var(--ab-orange)" }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-52 -left-52 w-[600px] h-[600px] rounded-full blur-[80px] opacity-40"
        style={{ background: "var(--ab-navy-2)" }}
        aria-hidden
      />

      {/* Top bar */}
      <header className="relative z-10 mx-auto max-w-[1280px] px-6 sm:px-10 pt-6 flex items-center justify-between">
        <img
          src={logo}
          alt="AgentBazar.in"
          className="h-12 sm:h-14 w-auto bg-white/95 rounded-lg px-3 py-1.5"
        />
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-white/80">
          <a href="#" className="hover:text-white transition-colors">Home</a>
          <a href="#" className="hover:text-white transition-colors">Features</a>
          <a href="#tutorials" className="hover:text-white transition-colors">Tutorials</a>
          <a href="#" className="hover:text-white transition-colors">Contact</a>
        </nav>
      </header>

      {/* Split layout */}
      <div className="relative z-10 mx-auto max-w-[1280px] px-6 sm:px-10 py-12 sm:py-16 grid lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-12 items-center">
        {/* LEFT */}
        <div className="text-white animate-ab-fade-up order-2 lg:order-1 text-center lg:text-left">
          <span className="inline-block text-[11px] tracking-[0.2em] uppercase font-bold text-[var(--ab-orange)] px-3.5 py-1.5 rounded-full bg-orange-500/12 border border-orange-500/30 mb-5">
            B2B Airfare Marketplace
          </span>

          <h1 className="font-display font-extrabold tracking-tight leading-[1.05] text-[clamp(36px,4.5vw,56px)] mb-5">
            India's Most Powerful{" "}
            <span className="text-ab-accent">B2B Airfare</span>{" "}
            Marketplace
          </h1>

          <p className="text-[17px] sm:text-lg leading-relaxed text-white/80 max-w-[560px] lg:max-w-none mb-8 mx-auto lg:mx-0">
            Zero-markup fares across 300+ sectors with real-time booking tools
            built for travel agents and consolidators.
          </p>

          {/* Trust badges */}
          <div className="grid grid-cols-3 gap-3 mb-7 max-w-[560px] mx-auto lg:mx-0">
            {[
              { strong: "10,000+", label: "Travel Agents" },
              { strong: "300+", label: "Routes" },
              { strong: "Real-Time", label: "Inventory" },
            ].map((b) => (
              <div
                key={b.label}
                className="flex flex-col p-4 rounded-xl bg-white/[0.07] border border-white/12 backdrop-blur-md transition-all hover:-translate-y-0.5 hover:bg-white/10"
              >
                <strong className="font-display text-[22px] font-bold text-[var(--ab-orange)] mb-1 leading-none">
                  {b.strong}
                </strong>
                <span className="text-[13px] text-white/70 font-medium">
                  {b.label}
                </span>
              </div>
            ))}
          </div>

          {/* Feature chips */}
          <div className="flex flex-wrap gap-2.5 mb-7 justify-center lg:justify-start">
            {["✈ Domestic & International", "⚡ Instant Booking", "💼 Group Fares"].map(
              (c) => (
                <span
                  key={c}
                  className="text-[13px] px-3.5 py-2 rounded-full bg-white/8 border border-white/15 text-white font-medium"
                >
                  {c}
                </span>
              ),
            )}
          </div>

          <p className="text-sm text-white/60">
            🔒 Trusted by 10,000+ travel agents across India
          </p>
        </div>

        {/* RIGHT */}
        <div className="flex justify-center order-1 lg:order-2">
          <LoginCard />
        </div>
      </div>
    </section>
  );
}
