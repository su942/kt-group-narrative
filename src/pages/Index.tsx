import { useState } from "react";
import EnhancedPreloader from "@/components/EnhancedPreloader";
import AnimatedBackground from "@/components/AnimatedBackground";
import ParticleSystem from "@/components/ParticleSystem";
import CursorTrail from "@/components/CursorTrail";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import FriendsSection from "@/components/FriendsSection";
import VisionSection from "@/components/VisionSection";
import MemoriesSection from "@/components/MemoriesSection";
import MovingMarquee from "@/components/MovingMarquee";
import MemoriesGallery from "@/components/MemoriesGallery";
import CinematicBreak from "@/components/CinematicBreak";
import CTASection from "@/components/CTASection";
import GrainOverlay from "@/components/GrainOverlay";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading && <EnhancedPreloader onComplete={() => setIsLoading(false)} />}
      
      <main className="relative bg-background overflow-x-hidden">
        <AnimatedBackground />
        <ParticleSystem />
        <CursorTrail />
        <GrainOverlay />
        
        <HeroSection />
        <AboutSection />
        <FriendsSection />
        <VisionSection />
        <MemoriesSection />
        <MovingMarquee />
        <MemoriesGallery />
        <CinematicBreak />
        <CTASection />
      </main>
    </>
  );
};

export default Index;
