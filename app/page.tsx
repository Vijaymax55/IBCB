import { Hero } from "@/components/sections/home/Hero";
import { ImpactBar } from "@/components/sections/home/ImpactBar";
import { VisionMission } from "@/components/sections/home/VisionMission";
import { GrowthChart } from "@/components/sections/home/GrowthChart";
import { InitiativesPreviews } from "@/components/sections/home/InitiativesPreviews";
import { PartnersStrip } from "@/components/sections/home/PartnersStrip";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ImpactBar />
      <VisionMission />
      <GrowthChart />
      <InitiativesPreviews />
      <PartnersStrip />
    </>
  );
}
