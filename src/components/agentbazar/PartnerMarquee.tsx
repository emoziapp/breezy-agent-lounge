import indigo from "@/assets/airlines/indigo.jpg";
import airIndia from "@/assets/airlines/air-india.jpg";
import airIndiaExpress from "@/assets/airlines/air-india-express.jpg";
import akasa from "@/assets/airlines/akasa-air.jpg";
import spicejet from "@/assets/airlines/spicejet.jpg";
import airasia from "@/assets/airlines/airasia.jpg";
import flydubai from "@/assets/airlines/flydubai.jpg";

const AIRLINES = [
  { name: "IndiGo", logo: indigo },
  { name: "Air India", logo: airIndia },
  { name: "Air India Express", logo: airIndiaExpress },
  { name: "Akasa Air", logo: akasa },
  { name: "SpiceJet", logo: spicejet },
  { name: "AirAsia", logo: airasia },
  { name: "Fly Dubai", logo: flydubai },
];

export function PartnerMarquee() {
  const items = [...AIRLINES, ...AIRLINES];
  return (
    <section className="relative py-7 bg-white border-y border-neutral-100 overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 mb-4 flex items-center gap-3">
        <span className="h-px flex-1 bg-neutral-200" />
        <span className="text-[11px] tracking-[0.22em] uppercase font-bold text-neutral-500">
          Inventory from 60+ airlines & 4 major GDS
        </span>
        <span className="h-px flex-1 bg-neutral-200" />
      </div>
      <div
        className="relative group"
        style={{ maskImage: "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)", WebkitMaskImage: "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)" }}
      >
        <div className="flex w-max items-center animate-ab-marquee group-hover:[animation-play-state:paused]">
          {items.map((a, i) => (
            <div
              key={i}
              className="mx-10 sm:mx-14 flex items-center justify-center transition-transform duration-300 hover:scale-105"
            >
              <img
                src={a.logo}
                alt={`${a.name} logo`}
                className="h-12 sm:h-14 w-auto object-contain"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
