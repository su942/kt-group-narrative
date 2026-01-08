import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface FluidSmokeBackgroundProps {
  intensity?: "low" | "medium" | "high";
  colors?: "neon" | "warm" | "cool" | "rainbow";
  interactive?: boolean;
}

const FluidSmokeBackground = ({ 
  intensity = "medium", 
  colors = "neon", 
  interactive = true 
}: FluidSmokeBackgroundProps) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!interactive) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [interactive]);

  const getColorPalette = () => {
    switch (colors) {
      case "warm":
        return [
          "rgba(239, 68, 68, 0.4)", // red
          "rgba(251, 146, 60, 0.4)", // orange
          "rgba(245, 158, 11, 0.4)", // amber
          "rgba(236, 72, 153, 0.4)", // pink
        ];
      case "cool":
        return [
          "rgba(59, 130, 246, 0.4)", // blue
          "rgba(6, 182, 212, 0.4)", // cyan
          "rgba(34, 197, 94, 0.4)", // green
          "rgba(147, 51, 234, 0.4)", // purple
        ];
      case "rainbow":
        return [
          "rgba(239, 68, 68, 0.4)", // red
          "rgba(251, 146, 60, 0.4)", // orange
          "rgba(245, 158, 11, 0.4)", // yellow
          "rgba(34, 197, 94, 0.4)", // green
          "rgba(59, 130, 246, 0.4)", // blue
          "rgba(99, 102, 241, 0.4)", // indigo
          "rgba(147, 51, 234, 0.4)", // purple
          "rgba(236, 72, 153, 0.4)", // pink
        ];
      default: // neon
        return [
          "rgba(147, 51, 234, 0.4)", // purple
          "rgba(59, 130, 246, 0.4)", // blue
          "rgba(236, 72, 153, 0.4)", // pink
          "rgba(34, 197, 94, 0.4)", // green
        ];
    }
  };

  const getIntensitySettings = () => {
    switch (intensity) {
      case "low":
        return { opacity: 0.3, particleCount: 4, blurAmount: 20 };
      case "high":
        return { opacity: 0.8, particleCount: 12, blurAmount: 60 };
      default: // medium
        return { opacity: 0.6, particleCount: 8, blurAmount: 40 };
    }
  };

  const colorPalette = getColorPalette();
  const { opacity: baseOpacity, particleCount, blurAmount } = getIntensitySettings();

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Base gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
      
      {/* Animated fluid smoke layers */}
      <div className="absolute inset-0">
        {/* Primary smoke cloud */}
        <motion.div
          className="absolute inset-0"
          style={{ opacity: baseOpacity }}
          animate={{
            background: [
              `radial-gradient(circle at 20% 30%, ${colorPalette[0]} 0%, transparent 50%)`,
              `radial-gradient(circle at 80% 70%, ${colorPalette[1]} 0%, transparent 50%)`,
              `radial-gradient(circle at 40% 80%, ${colorPalette[2]} 0%, transparent 50%)`,
              `radial-gradient(circle at 70% 20%, ${colorPalette[3] || colorPalette[0]} 0%, transparent 50%)`,
              `radial-gradient(circle at 20% 30%, ${colorPalette[0]} 0%, transparent 50%)`,
            ],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Secondary smoke layer */}
        <motion.div
          className="absolute inset-0"
          style={{ opacity: baseOpacity * 0.7 }}
          animate={{
            background: [
              `radial-gradient(ellipse at 60% 40%, ${colorPalette[1].replace('0.4', '0.3')} 0%, transparent 60%)`,
              `radial-gradient(ellipse at 30% 80%, ${colorPalette[2].replace('0.4', '0.3')} 0%, transparent 60%)`,
              `radial-gradient(ellipse at 90% 20%, ${colorPalette[3] || colorPalette[0]} 0%, transparent 60%)`,
              `radial-gradient(ellipse at 10% 60%, ${colorPalette[0].replace('0.4', '0.3')} 0%, transparent 60%)`,
              `radial-gradient(ellipse at 60% 40%, ${colorPalette[1].replace('0.4', '0.3')} 0%, transparent 60%)`,
            ],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Tertiary flowing layer */}
        <motion.div
          className="absolute inset-0"
          style={{ opacity: baseOpacity * 0.5 }}
          animate={{
            background: [
              `conic-gradient(from 0deg at 25% 25%, ${colorPalette[0].replace('0.4', '0.2')} 0deg, transparent 120deg, ${colorPalette[2].replace('0.4', '0.2')} 240deg, transparent 360deg)`,
              `conic-gradient(from 90deg at 75% 75%, ${colorPalette[1].replace('0.4', '0.2')} 0deg, transparent 120deg, ${colorPalette[3] || colorPalette[0]} 240deg, transparent 360deg)`,
              `conic-gradient(from 180deg at 50% 50%, ${colorPalette[2].replace('0.4', '0.2')} 0deg, transparent 120deg, ${colorPalette[0].replace('0.4', '0.2')} 240deg, transparent 360deg)`,
              `conic-gradient(from 270deg at 25% 75%, ${colorPalette[3] || colorPalette[1]} 0deg, transparent 120deg, ${colorPalette[1].replace('0.4', '0.2')} 240deg, transparent 360deg)`,
              `conic-gradient(from 0deg at 25% 25%, ${colorPalette[0].replace('0.4', '0.2')} 0deg, transparent 120deg, ${colorPalette[2].replace('0.4', '0.2')} 240deg, transparent 360deg)`,
            ],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Interactive mouse-following smoke */}
        {interactive && (
          <motion.div
            className="absolute w-96 h-96 rounded-full"
            style={{
              background: `radial-gradient(circle, ${colorPalette[0].replace('0.4', '0.6')} 0%, ${colorPalette[1].replace('0.4', '0.4')} 30%, transparent 70%)`,
              filter: `blur(${blurAmount}px)`,
              opacity: baseOpacity * 0.3,
            }}
            animate={{
              x: mousePosition.x * 8 - 192,
              y: mousePosition.y * 6 - 192,
            }}
            transition={{
              type: "spring",
              stiffness: 50,
              damping: 30,
            }}
          />
        )}

        {/* Floating smoke particles */}
        {Array.from({ length: particleCount }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${Math.random() * 200 + 100}px`,
              height: `${Math.random() * 200 + 100}px`,
              background: `radial-gradient(circle, ${colorPalette[i % colorPalette.length].replace('0.4', '0.8')} 0%, transparent 70%)`,
              filter: `blur(${blurAmount * 0.75}px)`,
              opacity: baseOpacity * 0.15,
            }}
            animate={{
              x: [
                Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920),
                Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920),
                Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920),
              ],
              y: [
                Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1080),
                Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1080),
                Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1080),
              ],
              scale: [0.5, 1.2, 0.8, 1, 0.5],
              opacity: [baseOpacity * 0.1, baseOpacity * 0.3, baseOpacity * 0.15, baseOpacity * 0.25, baseOpacity * 0.1],
            }}
            transition={{
              duration: 15 + Math.random() * 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 2,
            }}
          />
        ))}

        {/* Volumetric lighting effects */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(45deg, transparent 30%, ${colorPalette[0].replace('0.4', '0.1')} 50%, transparent 70%),
              linear-gradient(-45deg, transparent 30%, ${colorPalette[1].replace('0.4', '0.1')} 50%, transparent 70%)
            `,
          }}
          animate={{
            opacity: [baseOpacity * 0.3, baseOpacity * 0.6, baseOpacity * 0.4, baseOpacity * 0.5, baseOpacity * 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Cinematic vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              radial-gradient(ellipse at center, transparent 20%, rgba(0, 0, 0, 0.3) 70%, rgba(0, 0, 0, 0.8) 100%)
            `,
          }}
        />

        {/* Subtle noise texture overlay */}
        <div
          className="absolute inset-0 opacity-5 mix-blend-overlay"
          style={{
            backgroundImage: `
              repeating-conic-gradient(from 0deg at 50% 50%, transparent 0deg, rgba(255, 255, 255, 0.1) 1deg, transparent 2deg),
              repeating-linear-gradient(0deg, transparent 0px, rgba(255, 255, 255, 0.05) 1px, transparent 2px)
            `,
          }}
        />
      </div>
    </div>
  );
};

export default FluidSmokeBackground;