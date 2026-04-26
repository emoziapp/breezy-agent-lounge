import { createFileRoute } from "@tanstack/react-router";
import { TopBar } from "@/components/agentbazar/TopBar";
import { HeroSplit } from "@/components/agentbazar/HeroSplit";
import { PartnerMarquee } from "@/components/agentbazar/PartnerMarquee";
import { SeriesDepartures } from "@/components/agentbazar/SeriesDepartures";
import { WhyChoose } from "@/components/agentbazar/WhyChoose";
import { PortalShowcase } from "@/components/agentbazar/PortalShowcase";
import { VideoTutorials } from "@/components/agentbazar/VideoTutorials";
import { TestimonialsCarousel } from "@/components/agentbazar/TestimonialsCarousel";
import { BlogCards } from "@/components/agentbazar/BlogCards";
import { NewsStrip } from "@/components/agentbazar/NewsStrip";
import { FAQ } from "@/components/agentbazar/FAQ";
import { CTABanner } from "@/components/agentbazar/CTABanner";
import { Footer } from "@/components/agentbazar/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AgentBazar.in — B2B Flight Tickets & Series Fixed Departures · 17 Years" },
      {
        name: "description",
        content:
          "India's #1 B2B airfare marketplace. Exclusive series fixed departures, zero-markup fares across 300+ sectors for 10,000+ travel agents. Trusted since 2008.",
      },
      { property: "og:title", content: "AgentBazar.in — B2B Airfare Marketplace" },
      {
        property: "og:description",
        content:
          "Series Fixed Departures and live flight inventory built for travel agents. 17 years of trust.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <HeroSplit />
      <PartnerMarquee />
      <SeriesDepartures />
      <WhyChoose />
      <PortalShowcase />
      <VideoTutorials />
      <TestimonialsCarousel />
      <BlogCards />
      <NewsStrip />
      <FAQ />
      <CTABanner />
      <Footer />
    </div>
  );
}
