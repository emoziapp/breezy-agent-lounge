import { Phone, Mail } from "lucide-react";

const NAV_LINKS = ["Home", "Terms & Conditions", "Disclaimer", "Privacy Policy", "Help & Support"];

export function Footer() {
  return (
    <footer className="relative bg-white text-[var(--ab-navy)] border-t border-black/10">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 py-6">
        {/* Top row: brand + contact + nav */}
        <div className="flex flex-wrap items-center justify-center lg:justify-between gap-x-6 gap-y-3 text-[14px]">
          <div className="font-bold text-[var(--ab-navy)] whitespace-nowrap">
            Tripforu Holidays Pvt. Ltd. (Agent Bazar)
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            <a
              href="tel:+919435009519"
              className="flex items-center gap-1.5 font-semibold text-[var(--ab-orange)] hover:opacity-80 transition-opacity"
            >
              <Phone size={15} />
              +91-9435009519
            </a>
            <a
              href="mailto:support@agentbazar.in"
              className="flex items-center gap-1.5 font-semibold text-[var(--ab-orange)] hover:opacity-80 transition-opacity"
            >
              <Mail size={15} />
              support@agentbazar.in
            </a>

            <nav className="flex flex-wrap items-center gap-x-5 gap-y-2">
              {NAV_LINKS.map((label, i) => (
                <span key={label} className="flex items-center gap-x-5">
                  {i > 0 && <span className="text-[var(--ab-navy)]/40">•</span>}
                  <a
                    href="#"
                    className="text-[var(--ab-navy)] hover:text-[var(--ab-orange)] transition-colors"
                  >
                    {label}
                  </a>
                </span>
              ))}
            </nav>
          </div>
        </div>

        <div className="my-5 h-px bg-black/10" />

        {/* Bottom: copyright + credits */}
        <div className="text-center space-y-1.5 text-[13px] text-[var(--ab-navy)]/80">
          <div>
            © Copyright {new Date().getFullYear()} by TRIPFORU HOLIDAYS PVT. LTD. All rights reserved.
          </div>
          <div>
            Developed and Maintained By :{" "}
            <span className="font-semibold text-[var(--ab-navy)]">Emozi Technologies</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
