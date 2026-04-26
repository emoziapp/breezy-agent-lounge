import { Phone, Mail, Globe2, UserPlus, LogIn } from "lucide-react";

export function TopBar() {
  return (
    <div className="relative z-20 w-full text-[13px] font-medium">
      {/* Utility row */}
      <div className="bg-[var(--ab-ink)] text-white/80">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 h-9 flex items-center justify-between">
          <div className="flex items-center gap-5">
            <a href="tel:+919999999999" className="inline-flex items-center gap-1.5 hover:text-[var(--ab-orange)] transition-colors">
              <Phone size={13} /> +91 99999 99999
            </a>
            <a href="mailto:support@agentbazar.in" className="hidden sm:inline-flex items-center gap-1.5 hover:text-[var(--ab-orange)] transition-colors">
              <Mail size={13} /> support@agentbazar.in
            </a>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline-flex items-center gap-1.5 text-white/70">
              <Globe2 size={13} /> EN · INR
            </span>
            <span className="hidden md:inline-flex items-center gap-1.5 text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ab-pulse-dot" />
              All systems operational
            </span>
          </div>
        </div>
      </div>

      {/* Nav row */}
      <div className="bg-white/95 backdrop-blur-md border-b border-neutral-200/80">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
          <a href="#" className="font-display text-[22px] font-extrabold tracking-tight text-[var(--ab-navy)]">
            agent<span className="text-[var(--ab-orange)]">Bazar</span>
            <span className="text-[var(--ab-navy)]">.in</span>
          </a>
          <nav className="hidden lg:flex items-center gap-8 text-[14px] font-semibold text-neutral-700">
            <a href="#flagship" className="hover:text-[var(--ab-orange)] transition-colors">Series Departures</a>
            <a href="#why" className="hover:text-[var(--ab-orange)] transition-colors">Why Us</a>
            <a href="#showcase" className="hover:text-[var(--ab-orange)] transition-colors">Portal</a>
            <a href="#tutorials" className="hover:text-[var(--ab-orange)] transition-colors">Tutorials</a>
            <a href="#faq" className="hover:text-[var(--ab-orange)] transition-colors">FAQ</a>
          </nav>
          <div className="flex items-center gap-2.5">
            <button className="hidden sm:inline-flex items-center gap-1.5 text-[13px] font-bold text-[var(--ab-navy)] px-3.5 py-2 rounded-full border border-neutral-200 hover:border-[var(--ab-orange)] hover:text-[var(--ab-orange)] transition-all">
              <UserPlus size={14} /> Register
            </button>
            <a href="#login" className="inline-flex items-center gap-1.5 text-[13px] font-bold text-white px-4 py-2 rounded-full bg-gradient-to-br from-[var(--ab-orange)] to-[var(--ab-orange-dark)] shadow-ab-glow hover:shadow-ab-glow-lg hover:-translate-y-px transition-all">
              <LogIn size={14} /> Sign In
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
