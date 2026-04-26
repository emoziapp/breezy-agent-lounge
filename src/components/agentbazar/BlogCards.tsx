import { ArrowRight, Calendar } from "lucide-react";
import { useInView } from "@/hooks/useInView";

const POSTS = [
  {
    cat: "Series Fares",
    title: "How Diwali 2026 series blocks are pricing — what to book this week",
    date: "22 Apr 2026",
    read: "5 min read",
    grad: "from-orange-400 to-pink-500",
  },
  {
    cat: "GDS Update",
    title: "Amadeus PNR auto-reissue is live — here's how to enable it for your agency",
    date: "18 Apr 2026",
    read: "4 min read",
    grad: "from-blue-500 to-indigo-600",
  },
  {
    cat: "Agent Growth",
    title: "5 outbound destinations that grew 200% for our top agencies in Q1",
    date: "12 Apr 2026",
    read: "7 min read",
    grad: "from-emerald-400 to-teal-600",
  },
];

export function BlogCards() {
  const { ref, inView } = useInView();
  return (
    <section ref={ref} className="py-20 sm:py-24 bg-ab-soft-mint">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8">
        <div className={`flex flex-wrap items-end justify-between gap-4 mb-12 reveal ${inView ? "is-in" : ""}`}>
          <div>
            <span className="inline-block text-[11px] tracking-[0.22em] uppercase font-bold text-[var(--ab-orange)] mb-3">
              From the Blog
            </span>
            <h2 className="font-display text-[clamp(28px,3.8vw,40px)] font-extrabold tracking-tight text-[var(--ab-navy)]">
              Latest updates &amp; agent stories
            </h2>
          </div>
          <a href="#" className="inline-flex items-center gap-1.5 text-[14px] font-bold text-[var(--ab-navy)] hover:text-[var(--ab-orange)] transition-colors">
            View all posts <ArrowRight size={15} />
          </a>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {POSTS.map((p, i) => (
            <a
              key={p.title}
              href="#"
              className={`tilt-card group flex flex-col bg-white rounded-2xl overflow-hidden border border-neutral-100 hover:border-[var(--ab-orange)]/30 hover:shadow-[0_20px_50px_-20px_rgba(0,29,74,0.2)] transition-all reveal reveal-delay-${i + 1} ${inView ? "is-in" : ""}`}
            >
              <div className={`relative aspect-[16/10] bg-gradient-to-br ${p.grad} overflow-hidden`}>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.3),transparent_60%)]" />
                <span className="absolute top-4 left-4 text-[10px] tracking-[0.16em] uppercase font-extrabold text-white px-2.5 py-1 rounded-full bg-black/30 backdrop-blur-sm">
                  {p.cat}
                </span>
                <div className="absolute bottom-4 right-4 text-[60px] font-display font-extrabold text-white/15 leading-none transition-transform duration-500 group-hover:scale-110">
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
