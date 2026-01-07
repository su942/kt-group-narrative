import { useState } from "react";
import Preloader from "@/components/Preloader";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import FriendsSection from "@/components/FriendsSection";
import VisionSection from "@/components/VisionSection";
import CinematicBreak from "@/components/CinematicBreak";
import CTASection from "@/components/CTASection";
import GrainOverlay from "@/components/GrainOverlay";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      
      <main className="relative bg-background overflow-x-hidden">
        <GrainOverlay />
        
        <HeroSection />
        <AboutSection />
        <FriendsSection />
        <VisionSection />
        <CinematicBreak />
        <CTASection />
      </main>
    </>
  );
};

export default Index;
