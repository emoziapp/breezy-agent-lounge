import { ArrowRight, Phone } from "lucide-react";
import { useInView } from "@/hooks/useInView";

export function CTABanner() {
  const { ref, inView } = useInView();
  return (
    <section ref={ref} className="relative py-20 sm:py-24 bg-ab-aurora overflow-hidden">
      <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full blur-[120px] opacity-40 bg-[var(--ab-orange)] animate-ab-blob" aria-hidden />
      <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full blur-[120px] opacity-30 bg-[#003a8c] animate-ab-blob" style={{ animationDelay: "-8s" }} aria-hidden />

      <div className="relative max-w-[1100px] mx-auto px-5 sm:px-8 text-center">
        <div className={`reveal ${inView ? "is-in" : ""}`}>
          <span className="inline-flex items-center gap-2 text-[11px] tracking-[0.22em] uppercase font-bold text-[var(--ab-orange)] px-3.5 py-1.5 rounded-full bg-orange-500/15 border border-orange-500/30 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--ab-orange)] animate-ab-pulse-dot" />
            Onboarding open · Free for life
          </span>

          <h2 className="font-display text-[clamp(32px,5vw,54px)] font-extrabold text-white tracking-tight leading-[1.05] mb-5">
            Ready to grow your agency
            <br />
            with <span className="text-ab-accent">17 years of trust</span>?
          </h2>
          <p className="text-[17px] text-white/75 max-w-[640px] mx-auto mb-9">
            Join 10,000+ agents already using AgentBazar to book series fares, manage refunds and grow margins — every day.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 mb-7">
            <a href="#" className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-gradient-to-br from-[var(--ab-orange)] to-[var(--ab-orange-dark)] text-white font-extrabold text-[15px] shadow-ab-glow-lg hover:-translate-y-0.5 transition-all">
              Register your agency <ArrowRight size={17} />
            </a>
            <a href="tel:+919999999999" className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-white/10 border border-white/25 text-white font-extrabold text-[15px] hover:bg-white/20 transition-all backdrop-blur-md">
              <Phone size={16} /> Talk to an Expert
            </a>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[13px] text-white/70 font-medium">
            <span>✓ No setup fee</span>
            <span>✓ Approved in 4 hours</span>
            <span>✓ Dedicated RM</span>
            <span>✓ ​ support</span>
          </div>
        </div>
      </div>
    </section>
  );
}
