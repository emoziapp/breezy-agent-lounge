import { Phone, Mail, Facebook, Instagram, Linkedin, Youtube, Twitter } from "lucide-react";

const NAV_LINKS: { label: string; href: string }[] = [
  { label: "Home", href: "/" },
  { label: "Terms & Conditions", href: "https://agentbazar.in/terms-conditions" },
  { label: "Disclaimer", href: "https://agentbazar.in/booking-refund-policy" },
  { label: "Privacy Policy", href: "https://agentbazar.in/privacy" },
  { label: "Help & Support", href: "https://agentbazar.in/support-center" },
];

const SOCIAL_LINKS = [
  { label: "Facebook", href: "https://facebook.com/agentbazar", Icon: Facebook },
  { label: "Instagram", href: "https://instagram.com/agentbazar", Icon: Instagram },
  { label: "Twitter", href: "https://twitter.com/agentbazar", Icon: Twitter },
  { label: "LinkedIn", href: "https://linkedin.com/company/agentbazar", Icon: Linkedin },
  { label: "YouTube", href: "https://youtube.com/@agentbazar", Icon: Youtube },
];

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
              {NAV_LINKS.map((link, i) => (
                <span key={link.label} className="flex items-center gap-x-5">
                  {i > 0 && <span className="text-[var(--ab-navy)]/40">•</span>}
                  <a
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="text-[var(--ab-navy)] hover:text-[var(--ab-orange)] transition-colors"
                  >
                    {link.label}
                  </a>
                </span>
              ))}
            </nav>
          </div>
        </div>

        <div className="my-5 h-px bg-black/10" />

        {/* Bottom: copyright + socials + credits */}
        <div className="flex flex-col items-center gap-3 text-center text-[13px] text-[var(--ab-navy)]/80">
          <div className="flex items-center gap-3">
            {SOCIAL_LINKS.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--ab-navy)] text-white hover:bg-[var(--ab-orange)] transition-colors"
              >
                <Icon size={15} />
              </a>
            ))}
          </div>
          <div className="space-y-1.5">
            <div>
              © Copyright {new Date().getFullYear()} by TRIPFORU HOLIDAYS PVT. LTD. All rights reserved.
            </div>
            <div>
              Developed and Maintained By :{" "}
              <span className="font-semibold text-[var(--ab-navy)]">Emozi Technologies</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
