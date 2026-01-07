import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

interface TrailPoint {
  x: number;
  y: number;
  id: number;
}

const CursorTrail = () => {
  const [trail, setTrail] = useState<TrailPoint[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  
  const springConfig = { damping: 20, stiffness: 400 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);

    if (isMobile) return; // Disable cursor trail on mobile

    let trailId = 0;
    
    const handleMouseMove = (e: MouseEvent) => {
      setIsVisible(true);
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      
      // Reduced trail length for better performance
      setTrail(prev => {
        const newTrail = [
          { x: e.clientX, y: e.clientY, id: trailId++ },
          ...prev.slice(0, 8) // Reduced from 20 to 8
        ];
        return newTrail;
      });
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
      setTrail([]);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", checkMobile);
    };
  }, [cursorX, cursorY, isMobile]);

  if (!isVisible || isMobile) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-40 hidden sm:block">
      {/* Simplified main cursor */}
      <motion.div
        className="absolute w-3 h-3 bg-primary/50 rounded-full"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />

      {/* Reduced trail points */}
      {trail.map((point, index) => (
        <motion.div
          key={point.id}
          className="absolute w-1 h-1 bg-primary/20 rounded-full"
          style={{
            left: point.x,
            top: point.y,
            translateX: "-50%",
            translateY: "-50%",
          }}
          initial={{ scale: 1, opacity: 0.4 }}
          animate={{ 
            scale: 0,
            opacity: 0,
          }}
          transition={{
            duration: 0.4,
            delay: index * 0.03,
            ease: "easeOut",
          }}
        />
      ))}

      {/* Simplified cursor glow */}
      <motion.div
        className="absolute w-6 h-6 bg-primary/10 rounded-full blur-sm"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
    </div>
  );
};

export default CursorTrail;