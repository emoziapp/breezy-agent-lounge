import { ArrowRight, Calendar } from "lucide-react";
import { useInView } from "@/hooks/useInView";
import noidaAirport from "@/assets/blog/noida-airport.png";
import ahmedabadTerminal from "@/assets/blog/ahmedabad-terminal2.png";
import railwayRules from "@/assets/blog/railway-rules.png";

const POSTS = [
  {
    cat: "Aviation",
    title: "Noida Airport boosts India–US & UK travel routes",
    date: "28 Mar 2026",
    read: "1 min read",
    image: noidaAirport,
    href: "https://blog.agentbazar.in/noida-airport-boosts-indiaus-uk-travel-routes",
  },
  {
    cat: "Aviation",
    title: "Air India Ahmedabad Terminal 2 shift from March 29",
    date: "28 Mar 2026",
    read: "1 min read",
    image: ahmedabadTerminal,
    href: "https://blog.agentbazar.in/air-india-ahmedabad-terminal-2",
  },
  {
    cat: "Industry Trends",
    title: "Indian Railways cancellation rules 2026 update",
    date: "25 Mar 2026",
    read: "2 min read",
    image: railwayRules,
    href: "https://blog.agentbazar.in/indian-railways-cancellation-rules-2026-update",
  },
];

export function BlogCards() {
  const { ref, inView } = useInView();
  return (
    <section ref={ref} className="py-20 sm:py-24 bg-ab-soft-mint">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8">
        <div className={`flex flex-wrap items-end justify-between gap-4 mb-12 reveal ${inView ? "is-in" : ""}`}>
          <div>
            <span className="inline-block tracking-[0.22em] uppercase font-bold mb-3 text-sm text-[#ff8b38]">
              From the Blog
            </span>
            <h2 className="font-display text-[clamp(28px,3.8vw,40px)] font-extrabold tracking-tight text-[var(--ab-navy)]">
              Latest updates &amp; agent stories
            </h2>
          </div>
          <a
            href="https://blog.agentbazar.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[14px] font-bold text-[var(--ab-navy)] hover:text-[var(--ab-orange)] transition-colors"
          >
            View all posts <ArrowRight size={15} />
          </a>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {POSTS.map((p, i) => (
            <a
              key={p.title}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`tilt-card group flex flex-col bg-white rounded-2xl overflow-hidden border border-neutral-100 hover:border-[var(--ab-orange)]/30 hover:shadow-[0_20px_50px_-20px_rgba(0,29,74,0.2)] transition-all reveal reveal-delay-${i + 1} ${inView ? "is-in" : ""}`}
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-neutral-100">
                <img
                  src={p.image}
                  alt={p.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <span className="absolute top-4 left-4 text-[10px] tracking-[0.16em] uppercase font-extrabold text-white px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-sm">
                  {p.cat}
                </span>
                <div className="absolute bottom-4 right-4 text-[60px] font-display font-extrabold text-white/70 leading-none drop-shadow-[0_2px_10px_rgba(0,0,0,0.4)] transition-transform duration-500 group-hover:scale-110">
                  0{i + 1}
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="font-display text-[17px] font-extrabold text-[var(--ab-navy)] leading-snug mb-3 group-hover:text-[var(--ab-orange)] transition-colors">
                  {p.title}
                </h3>
                <div className="mt-auto flex items-center justify-between text-[12px] text-neutral-500 font-medium">
                  <span className="inline-flex items-center gap-1.5"><Calendar size={12} /> {p.date}</span>
                  <span>{p.read}</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
