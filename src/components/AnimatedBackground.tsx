import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useRef, useEffect } from "react";

const AnimatedBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const { scrollYProgress } = useScroll();
  
  const springMouseX = useSpring(mouseX, { stiffness: 100, damping: 20 });
  const springMouseY = useSpring(mouseY, { stiffness: 100, damping: 20 });
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.6, 0.3, 0.6]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      mouseX.set((clientX / innerWidth - 0.5) * 50);
      mouseY.set((clientY / innerHeight - 0.5) * 50);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0">
      {/* Simplified animated grid */}
      <motion.div
        className="absolute inset-0 opacity-20"
        style={{ 
          y: backgroundY,
          opacity,
          x: useTransform(springMouseX, [-50, 50], [-10, 10]),
          backgroundImage: `
            linear-gradient(rgba(255, 68, 68, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 68, 68, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px"
        }}
        animate={{
          backgroundPosition: ["0% 0%", "60px 60px"],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Reduced floating particles */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-primary/40 rounded-full"
          initial={{
            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
            y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
          }}
          animate={{
            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
            y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
          }}
          transition={{
            duration: Math.random() * 15 + 10,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear",
          }}
          style={{
            x: useTransform(springMouseX, [-50, 50], [-5, 5]),
            y: useTransform(springMouseY, [-50, 50], [-5, 5]),
          }}
        />
      ))}

      {/* Single dynamic glow orb */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/8 rounded-full blur-[100px]"
        style={{
          x: useTransform(springMouseX, [-50, 50], [-30, 30]),
          y: useTransform(springMouseY, [-50, 50], [-20, 20]),
        }}
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
    </div>
  );
};

export default AnimatedBackground;