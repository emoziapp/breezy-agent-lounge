import { Phone, Mail, MapPin, Facebook, Twitter, Linkedin, Instagram, Youtube, Award } from "lucide-react";

const COLS = [
  {
    title: "Product",
    links: ["Series Departures", "Flight Search", "Group Bookings", "GDS Connect", "API Access", "Wallet"],
  },
  {
    title: "Company",
    links: ["About Us", "17 Years Story", "Careers", "Press & Media", "Partners", "Contact"],
  },
  {
    title: "Resources",
    links: ["Help Center", "Tutorials", "Blog", "Agent Toolkit", "Refund Policy", "Service Status"],
  },
  {
    title: "Legal",
    links: ["Terms of Use", "Privacy Policy", "Cookie Policy", "GST & Compliance", "Disclaimer"],
  },
];

const SOCIALS = [
  { Icon: Facebook, label: "Facebook" },
  { Icon: Twitter, label: "Twitter" },
  { Icon: Linkedin, label: "LinkedIn" },
  { Icon: Instagram, label: "Instagram" },
  { Icon: Youtube, label: "YouTube" },
];

export function Footer() {
  return (
    <footer className="relative bg-[var(--ab-navy)] text-white/75 pt-16 pb-8 overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--ab-orange)]/40 to-transparent" />
      <div className="absolute -top-32 right-0 w-[400px] h-[400px] rounded-full blur-[120px] opacity-15 bg-[var(--ab-orange)]" aria-hidden />

      <div className="relative max-w-[1280px] mx-auto px-5 sm:px-8">
        <div className="grid lg:grid-cols-[1.4fr_2.6fr] gap-12 mb-12 pb-12 border-b border-white/10">
          {/* Brand block */}
          <div>
            <div className="font-display text-[24px] font-extrabold text-white mb-3">
              agent<span className="text-[var(--ab-orange)]">Bazar</span>.in
            </div>
            <p className="text-[14px] leading-relaxed mb-5 max-w-[320px]">
              India's most trusted B2B marketplace for flight tickets and series fixed departures — built by travel people, for travel people, since 2008.
            </p>
            <div className="inline-flex items-center gap-2.5 px-3.5 py-2 rounded-full bg-white/8 border border-white/15 mb-5">
              <Award size={14} className="text-[var(--ab-orange)]" />
              <span className="text-[12px] font-bold text-white">17 Years of Trust · Est. 2008</span>
            </div>

            <ul className="space-y-2.5 text-[13px]">
              <li className="flex items-start gap-2.5"><Phone size={14} className="mt-0.5 text-[var(--ab-orange)]" /><span>+91 99999 99999 (24×7)</span></li>
              <li className="flex items-start gap-2.5"><Mail size={14} className="mt-0.5 text-[var(--ab-orange)]" /><span>support@agentbazar.in</span></li>
              <li className="flex items-start gap-2.5"><MapPin size={14} className="mt-0.5 text-[var(--ab-orange)]" /><span>Mumbai · Delhi · Bengaluru</span></li>
            </ul>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
            {COLS.map(c => (
              <div key={c.title}>
                <h4 className="text-white font-bold text-[13px] tracking-wide uppercase mb-4">{c.title}</h4>
                <ul className="space-y-2.5">
                  {c.links.map(l => (
                    <li key={l}>
                      <a href="#" className="text-[13px] hover:text-[var(--ab-orange)] transition-colors">{l}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-5">
          <div className="text-[12px] text-white/55">
            © {new Date().getFullYear()} AgentBazar.in — All rights reserved · CIN U63000XX2008PTCXXXXXX
          </div>
          <div className="flex items-center gap-2">
            {SOCIALS.map(({ Icon, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="w-9 h-9 rounded-full bg-white/8 border border-white/15 grid place-items-center hover:bg-[var(--ab-orange)] hover:border-[var(--ab-orange)] hover:text-white transition-all"
              >
                <Icon size={15} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
