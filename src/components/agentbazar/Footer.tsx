export function Footer() {
  return (
    <footer className="bg-[var(--ab-ink)] text-white/70 py-10 px-5 font-sans">
      <div className="max-w-[1200px] mx-auto grid sm:grid-cols-3 gap-8 items-start">
        <div>
          <div className="font-display text-xl font-extrabold text-white mb-2">
            agent<span className="text-[var(--ab-orange)]">Bazar</span>.in
          </div>
          <p className="text-sm leading-relaxed">
            Place to buy &amp; sell series tickets — India's B2B airfare marketplace.
          </p>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3 text-sm">Product</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-[var(--ab-orange)]">Dashboard</a></li>
            <li><a href="#" className="hover:text-[var(--ab-orange)]">Series Tickets</a></li>
            <li><a href="#" className="hover:text-[var(--ab-orange)]">Group Fares</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3 text-sm">Company</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-[var(--ab-orange)]">About</a></li>
            <li><a href="#" className="hover:text-[var(--ab-orange)]">Contact</a></li>
            <li><a href="#" className="hover:text-[var(--ab-orange)]">Privacy</a></li>
          </ul>
        </div>
      </div>
      <div className="max-w-[1200px] mx-auto mt-8 pt-6 border-t border-white/10 text-center text-xs text-white/50">
        © {new Date().getFullYear()} AgentBazar.in — All rights reserved.
      </div>
    </footer>
  );
}
