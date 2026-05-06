import { useState, useEffect } from "react";
import { Play, X } from "lucide-react";

const VIDEOS = [
  {
    id: "ILJbZDlJNRY",
    title: "How to login & dashboard overview",
    desc: "Get started with AgentBazar in 2 minutes",
  },
  {
    id: "ILJbZDlJNRY",
    title: "How to search & book flights",
    desc: "Find the best fares across 300+ sectors",
  },
  {
    id: "ILJbZDlJNRY",
    title: "Group fare booking tutorial",
    desc: "Book series and group tickets with ease",
  },
];

export function VideoTutorials() {
  const [openId, setOpenId] = useState<string | null>(null);

  useEffect(() => {
    if (!openId) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenId(null);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [openId]);

  return (
    <section
      id="tutorials"
      className="py-16 sm:py-20 px-5 bg-gradient-to-b from-neutral-50 to-white font-sans"
    >
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-10">
          <span className="inline-block tracking-[0.2em] uppercase font-bold mb-3 text-sm text-[#ff8b38]">
            Tutorials
          </span>
          <h2 className="font-display text-[clamp(26px,3.5vw,38px)] font-extrabold text-[var(--ab-navy)] tracking-tight mb-2">
            Learn how to use AgentBazar
          </h2>
          <p className="text-base text-neutral-600">
            Quick walkthroughs to get you booking in minutes.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5 sm:gap-6">
          {VIDEOS.map((v, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setOpenId(`${v.id}-${i}`)}
              className="group flex flex-col bg-white border border-neutral-200 rounded-2xl overflow-hidden text-left transition-all hover:-translate-y-1 hover:border-[var(--ab-orange)] hover:shadow-[0_16px_36px_-16px_rgba(0,29,74,0.18)]"
            >
              <div className="relative aspect-video bg-black overflow-hidden">
                <img
                  src={`https://img.youtube.com/vi/${v.id}/hqdefault.jpg`}
                  alt={v.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 group-hover:opacity-90"
                />
                <span
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full grid place-items-center shadow-[0_10px_30px_rgba(0,0,0,0.4)] transition-transform group-hover:scale-110"
                  style={{ background: "rgba(255,102,0,0.95)" }}
                >
                  <Play className="text-white ml-1" size={24} fill="white" />
                </span>
              </div>
              <div className="p-5">
                <h3 className="text-base font-bold text-[var(--ab-navy)] mb-1.5">
                  {v.title}
                </h3>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  {v.desc}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {openId && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setOpenId(null)}
          className="fixed inset-0 z-[9999] bg-black/80 grid place-items-center p-5 animate-ab-fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-[960px] bg-black rounded-xl overflow-hidden animate-ab-scale-in"
          >
            <button
              onClick={() => setOpenId(null)}
              aria-label="Close"
              className="absolute -top-11 right-0 w-9 h-9 rounded-full bg-white/15 hover:bg-white/30 text-white grid place-items-center sm:bg-white/15 max-sm:top-2 max-sm:right-2 max-sm:bg-black/60 z-10"
            >
              <X size={20} />
            </button>
            <div className="relative aspect-video">
              <iframe
                src={`https://www.youtube.com/embed/${openId.split("-")[0]}?autoplay=1&rel=0`}
                title="Video tutorial"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full border-0"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
