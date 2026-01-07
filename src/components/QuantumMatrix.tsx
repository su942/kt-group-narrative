import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useEffect } from "react";

// Optimized Quantum Matrix with reduced animations
const QuantumMatrix = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springMouseX = useSpring(mouseX, { stiffness: 150, damping: 25 });
  const springMouseY = useSpring(mouseY, { stiffness: 150, damping: 25 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      mouseX.set((clientX / innerWidth - 0.5) * 1);
      mouseY.set((clientY / innerHeight - 0.5) * 1);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden">
      {/* Simplified holographic grid */}
      <motion.div
        className="absolute inset-0 opacity-30"
        style={{
          x: useTransform(springMouseX, [-1, 1], [-20, 20]),
          y: useTransform(springMouseY, [-1, 1], [-15, 15]),
          background: `
            linear-gradient(90deg, transparent 98%, rgba(255, 68, 68, 0.3) 100%),
            linear-gradient(0deg, transparent 98%, rgba(255, 68, 68, 0.3) 100%)
          `,
          backgroundSize: "50px 50px",
        }}
        animate={{
          backgroundPosition: ["0px 0px", "50px 50px"],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Reduced quantum energy waves */}
      {Array.from({ length: 3 }).map((_, i) => (
        <motion.div
          key={`wave-${i}`}
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse at ${50 + Math.sin(i * 2) * 20}% ${50 + Math.cos(i * 2) * 20}%, 
              rgba(255, 68, 68, 0.1) 0%, 
              transparent 60%)`,
          }}
          animate={{
            scale: [0.8, 1.5, 0.8],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            delay: i * 2,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Single reality distortion field */}
      <motion.div
        className="absolute inset-0 opacity-40"
        style={{
          background: `conic-gradient(from 0deg at 50% 50%, 
            transparent 0deg, 
            rgba(255, 68, 68, 0.15) 120deg,
            rgba(68, 255, 255, 0.15) 240deg,
            transparent 360deg)`,
          filter: "blur(1px)",
        }}
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Simplified quantum tunnels */}
      {Array.from({ length: 3 }).map((_, i) => (
        <motion.div
          key={`tunnel-${i}`}
          className="absolute"
          style={{
            left: `${25 + i * 25}%`,
            top: "0%",
            width: "2px",
            height: "100%",
            background: `linear-gradient(to bottom, 
              transparent 0%, 
              rgba(255, 68, 68, 0.6) 30%, 
              rgba(68, 255, 255, 0.8) 50%, 
              rgba(255, 68, 68, 0.6) 70%, 
              transparent 100%)`,
            filter: "blur(0.5px)",
          }}
          animate={{
            scaleY: [0.5, 1.2, 0.5],
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            delay: i * 1,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Reduced matrix rain */}
      {Array.from({ length: 6 }).map((_, i) => (
        <motion.div
          key={`matrix-${i}`}
          className="absolute font-mono text-primary/50 text-xs"
          style={{
            left: `${15 + i * 15}%`,
            fontFamily: "monospace",
          }}
          animate={{
            y: [-50, (typeof window !== 'undefined' ? window.innerHeight : 800) + 50],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            delay: i * 2,
            ease: "linear",
          }}
        >
          {Array.from({ length: 8 }).map((_, j) => (
            <motion.div
              key={j}
              animate={{
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: j * 0.2,
              }}
            >
              {String.fromCharCode(0x30A0 + Math.random() * 96)}
            </motion.div>
          ))}
        </motion.div>
      ))}

      {/* Single dimensional portal */}
      <motion.div
        className="absolute rounded-full border-2"
        style={{
          left: "50%",
          top: "50%",
          width: "120px",
          height: "120px",
          marginLeft: "-60px",
          marginTop: "-60px",
          borderColor: "rgba(255, 68, 68, 0.4)",
        }}
        animate={{
          scale: [0.8, 1.3, 0.8],
          rotate: [0, 360],
          borderColor: [
            "rgba(255, 68, 68, 0.4)",
            "rgba(68, 255, 255, 0.6)",
            "rgba(255, 68, 68, 0.4)",
          ],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Single energy pulse ring */}
      <motion.div
        className="absolute rounded-full border border-primary/20"
        style={{
          left: "50%",
          top: "50%",
          width: "200px",
          height: "200px",
          marginLeft: "-100px",
          marginTop: "-100px",
        }}
        animate={{
          scale: [0, 2],
          opacity: [0.6, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeOut",
        }}
      />
    </div>
  );
};

export default QuantumMatrix;