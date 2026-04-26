import { useState } from "react";
import { Plus, HelpCircle } from "lucide-react";
import { useInView } from "@/hooks/useInView";

const FAQS = [
  { q: "How do I register my agency on AgentBazar?",
    a: "Click 'Register' on the top-right and submit your IATA / TAFI / agency PAN details. Our onboarding team activates your account within 4 working hours and assigns a dedicated relationship manager." },
  { q: "What makes your Series Fixed Departures different?",
    a: "We pre-block bulk inventory directly with airlines on high-demand routes (Goa, Dubai, Bangkok, etc.) and pass the bulk-fare savings to you. You get confirmed PNRs, fixed dates, and zero overbooking risk." },
  { q: "How does the commission structure work?",
    a: "You see the exact net fare and your commission upfront on every search result. We do not add hidden markups. Higher monthly volume unlocks tier-based bonus commissions automatically." },
  { q: "What are your refund timelines?",
    a: "Online cancellations: refund initiated instantly to your wallet. Bank transfers: 3-5 working days. Our dashboard shows the exact refund amount before you confirm — no surprises." },
  { q: "Which payment modes do you accept?",
    a: "Wallet top-up via NEFT/RTGS/IMPS, UPI, net-banking, and credit-line for verified agencies (subject to KYC and credit-team approval)." },
  { q: "Is support available 24×7?",
    a: "Yes. WhatsApp, phone (+91 99999 99999) and email support are live 24×7. Emergency reissue / no-show desk is staffed round the clock." },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  const { ref, inView } = useInView();
  return (
    <section id="faq" ref={ref} className="py-20 sm:py-24 bg-ab-soft-cream">
      <div className="max-w-[900px] mx-auto px-5 sm:px-8">
        <div className={`text-center mb-12 reveal ${inView ? "is-in" : ""}`}>
          <span className="inline-flex items-center gap-2 text-[11px] tracking-[0.22em] uppercase font-bold text-[var(--ab-orange)] mb-3">
            <HelpCircle size={13} /> Questions? Look Here
          </span>
          <h2 className="font-display text-[clamp(28px,3.8vw,40px)] font-extrabold tracking-tight text-[var(--ab-navy)] mb-3">
            Frequently asked questions
          </h2>
          <p className="text-[15px] text-neutral-600">
            Can't find what you're looking for? <a href="#" className="text-[var(--ab-orange)] font-bold underline-offset-2 hover:underline">Talk to our experts →</a>
          </p>
        </div>

        <div className={`space-y-3 reveal reveal-delay-2 ${inView ? "is-in" : ""}`}>
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <div
                key={f.q}
                className={`bg-white rounded-2xl border transition-all overflow-hidden ${isOpen ? "border-[var(--ab-orange)]/40 shadow-[0_12px_32px_-16px_rgba(255,102,0,0.25)]" : "border-neutral-200/70"}`}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-5 sm:px-6 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-display text-[15px] sm:text-[16px] font-bold text-[var(--ab-navy)]">
                    {f.q}
                  </span>
                  <span className={`flex-shrink-0 w-8 h-8 rounded-full grid place-items-center transition-all ${isOpen ? "bg-[var(--ab-orange)] text-white rotate-45" : "bg-neutral-100 text-[var(--ab-navy)]"}`}>
                    <Plus size={16} strokeWidth={2.5} />
                  </span>
                </button>
                <div
                  className="grid transition-all duration-400"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 sm:px-6 pb-5 text-[14px] sm:text-[15px] text-neutral-600 leading-relaxed">
                      {f.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
