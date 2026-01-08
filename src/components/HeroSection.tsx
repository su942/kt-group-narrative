import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { ChevronDown, Zap, Star } from "lucide-react";
import QuantumMatrix from "./QuantumMatrix";
import HolographicText from "./HolographicText";
import FluidSmokeBackground from "./FluidSmokeBackground";

const HeroSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isMobile, setIsMobile] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  
  const springMouseX = useSpring(mouseX, { stiffness: 100, damping: 20 });
  const springMouseY = useSpring(mouseY, { stiffness: 100, damping: 20 });

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);

    const handleMouseMove = (e: MouseEvent) => {
      if (!isMobile) {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        
        mouseX.set((clientX / innerWidth - 0.5) * 20);
        mouseY.set((clientY / innerHeight - 0.5) * 20);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", checkMobile);
    };
  }, [mouseX, mouseY, isMobile]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8"
    >
      {/* Quantum Matrix Background - Reduced on mobile */}
      {!isMobile && <QuantumMatrix />}
      
      {/* Fluid Smoke Background */}
      <FluidSmokeBackground 
        intensity="medium" 
        colors="neon" 
        interactive={!isMobile} 
      />

      {/* Background layers */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 bg-gradient-to-b from-noir-deep/50 via-background/30 to-background/50"
      />

      {/* Simplified grid for mobile */}
      <motion.div
        className="absolute inset-0 opacity-10 sm:opacity-20"
        style={{
          x: !isMobile ? useTransform(springMouseX, [-20, 20], [-5, 5]) : 0,
          y: !isMobile ? useTransform(springMouseY, [-20, 20], [-3, 3]) : 0,
          backgroundImage: `
            linear-gradient(hsl(var(--primary) / 0.1) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--primary) / 0.1) 1px, transparent 1px)
          `,
          backgroundSize: isMobile ? "40px 40px" : "60px 60px",
        }}
        animate={{
          backgroundPosition: isMobile ? ["0% 0%", "40px 40px"] : ["0% 0%", "60px 60px"],
        }}
        transition={{
          duration: isMobile ? 15 : 25,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Reduced particles for mobile */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(isMobile ? 5 : 15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * (isMobile ? 2 : 3) + 1}px`,
              height: `${Math.random() * (isMobile ? 2 : 3) + 1}px`,
              backgroundColor: `hsl(var(--primary) / ${Math.random() * 0.3 + 0.1})`,
            }}
            animate={{
              y: [isMobile ? -15 : -30, isMobile ? 15 : 30],
              x: [isMobile ? -10 : -20, isMobile ? 10 : 20],
              opacity: [0, 0.8, 0],
              scale: [0.5, 1.2, 0.5],
            }}
            transition={{
              duration: Math.random() * (isMobile ? 4 : 6) + 3,
              repeat: Infinity,
              repeatType: "reverse",
              delay: Math.random() * 2,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Single pulsing radial glow - smaller on mobile */}
      <motion.div 
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${
          isMobile ? 'w-[400px] h-[400px]' : 'w-[800px] h-[800px]'
        } bg-primary/6 rounded-full blur-[150px]`}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Electric arcs - hidden on mobile */}
      {!isMobile && Array.from({ length: 3 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-[1px] bg-gradient-to-b from-transparent via-primary/40 to-transparent"
          style={{
            left: `${30 + i * 20}%`,
            height: "100%",
          }}
          animate={{
            opacity: [0, 0.6, 0],
            scaleY: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: i * 1,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Content */}
      <motion.div
        style={{ 
          opacity, 
          scale,
          x: !isMobile ? useTransform(springMouseX, [-20, 20], [-5, 5]) : 0,
          y: !isMobile ? useTransform(springMouseY, [-20, 20], [-3, 3]) : 0,
        }}
        className="relative z-10 text-center w-full max-w-6xl mx-auto"
      >
        <motion.div
          initial={{ opacity: 0, y: 100, rotateX: 45 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
        >
          <motion.p
            className="font-display text-xs sm:text-sm md:text-base tracking-[0.2em] sm:tracking-[0.3em] text-muted-foreground mb-4 sm:mb-6"
            initial={{ opacity: 0, letterSpacing: "1em" }}
            animate={{ opacity: 1, letterSpacing: isMobile ? "0.2em" : "0.3em" }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            WELCOME TO THE SQUAD
          </motion.p>

          <div className="relative">
            {/* Main title with responsive sizing */}
            <motion.h1
              className="relative font-display text-4xl sm:text-6xl md:text-8xl lg:text-9xl xl:text-[12rem] font-black tracking-wider"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.8, duration: 1.5, ease: "easeOut" }}
            >
              <HolographicText 
                text="KT GROUP" 
                className="text-glow-intense relative z-10"
                delay={1000}
              />
              
              {/* Animated underline - responsive */}
              <motion.div
                className={`absolute bottom-0 left-1/2 -translate-x-1/2 ${
                  isMobile ? 'h-1' : 'h-2'
                } bg-gradient-to-r from-transparent via-primary to-transparent`}
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ delay: 2.5, duration: 2, ease: "easeOut" }}
              />

              {/* Energy pulse behind text - smaller on mobile */}
              <motion.div
                className="absolute inset-0 -z-10"
                animate={{
                  background: [
                    "radial-gradient(ellipse at center, rgba(255, 68, 68, 0.1) 0%, transparent 70%)",
                    "radial-gradient(ellipse at center, rgba(255, 68, 68, 0.3) 0%, transparent 70%)",
                    "radial-gradient(ellipse at center, rgba(255, 68, 68, 0.1) 0%, transparent 70%)",
                  ],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.h1>

            {/* Floating icons - hidden on mobile */}
            {!isMobile && [Zap, Star].map((Icon, i) => (
              <motion.div
                key={i}
                className="absolute text-primary/50 hidden sm:block"
                style={{
                  left: i === 0 ? "-12%" : "112%",
                  top: "50%",
                  transform: "translateY(-50%)",
                }}
                animate={{
                  y: [-15, 15],
                  opacity: [0.3, 0.7, 0.3],
                  scale: [0.9, 1.1, 0.9],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  delay: i * 3,
                  ease: "easeInOut",
                }}
              >
                <Icon className="w-8 h-8 md:w-12 md:h-12 lg:w-14 lg:h-14" />
              </motion.div>
            ))}
          </div>

          <motion.p
            className="mt-6 sm:mt-8 font-display text-base sm:text-lg md:text-xl lg:text-2xl tracking-wide sm:tracking-widest text-foreground/80"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            <motion.span
              animate={{
                color: [
                  "hsl(var(--foreground) / 0.8)",
                  "hsl(var(--primary) / 0.9)",
                  "hsl(var(--foreground) / 0.8)",
                ]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              Friends. Legends. Unstoppable.
            </motion.span>
          </motion.p>
        </motion.div>

        {/* Enhanced CTA buttons - responsive */}
        <motion.div
          className="mt-8 sm:mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.8 }}
        >
          <motion.button 
            className="group relative px-6 sm:px-8 py-3 sm:py-4 font-display text-xs sm:text-sm tracking-widest bg-primary text-primary-foreground neon-border overflow-hidden w-full sm:w-auto max-w-xs"
            whileHover={{ scale: isMobile ? 1.02 : 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={{
              boxShadow: [
                "0 0 20px hsl(var(--primary) / 0.4)",
                "0 0 40px hsl(var(--primary) / 0.6)",
                "0 0 20px hsl(var(--primary) / 0.4)",
              ]
            }}
            transition={{
              boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" }
            }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.6 }}
            />
            <span className="relative z-10">MEET THE CREW</span>
          </motion.button>
          
          <motion.button 
            className="group px-6 sm:px-8 py-3 sm:py-4 font-display text-xs sm:text-sm tracking-widest border border-primary/50 text-foreground hover:bg-primary/10 transition-all relative overflow-hidden w-full sm:w-auto max-w-xs"
            whileHover={{ 
              scale: isMobile ? 1.02 : 1.05,
              borderColor: "hsl(var(--primary))",
              boxShadow: "0 0 30px hsl(var(--primary) / 0.3)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="absolute inset-0 bg-primary/5"
              initial={{ scale: 0 }}
              whileHover={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            />
            <span className="relative z-10">OUR STORY</span>
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Enhanced scroll indicator - responsive */}
      <motion.div
        className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.2, duration: 0.8 }}
      >
        <motion.div
          className="flex flex-col items-center gap-2 cursor-pointer group"
          animate={{ y: [0, isMobile ? 5 : 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          whileHover={{ scale: isMobile ? 1.05 : 1.1 }}
        >
          <span className="font-display text-xs tracking-widest text-muted-foreground group-hover:text-primary transition-colors">
            {isMobile ? "SCROLL" : "SCROLL TO EXPLORE"}
          </span>
          <motion.div
            className="relative"
            animate={{
              boxShadow: [
                "0 0 0 0 hsl(var(--primary) / 0)",
                "0 0 20px 5px hsl(var(--primary) / 0.3)",
                "0 0 0 0 hsl(var(--primary) / 0)",
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
          </motion.div>
          
          {/* Animated line - shorter on mobile */}
          <motion.div
            className={`w-[1px] ${isMobile ? 'h-8' : 'h-16'} bg-gradient-to-b from-primary/60 to-transparent`}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ delay: 2.5, duration: 1 }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;