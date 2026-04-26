import { createFileRoute } from "@tanstack/react-router";
import { HeroSplit } from "@/components/agentbazar/HeroSplit";
import { TrustStrip } from "@/components/agentbazar/TrustStrip";
import { VideoTutorials } from "@/components/agentbazar/VideoTutorials";
import { Footer } from "@/components/agentbazar/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AgentBazar.in — India's B2B Airfare Marketplace" },
      {
        name: "description",
        content:
          "Zero-markup fares across 300+ sectors. Real-time booking for 10,000+ travel agents. Login to access your dashboard.",
      },
      { property: "og:title", content: "AgentBazar.in — B2B Airfare Marketplace" },
      {
        property: "og:description",
        content:
          "India's most powerful B2B airfare marketplace for travel agents and consolidators.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen">
      <HeroSplit />
      <TrustStrip />
      <VideoTutorials />
      <Footer />
    </div>
  );
}
