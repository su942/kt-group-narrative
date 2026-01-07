import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface HolographicTextProps {
  text: string;
  className?: string;
  delay?: number;
}

const HolographicText = ({ text, className = "", delay = 0 }: HolographicTextProps) => {
  const [displayText, setDisplayText] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      let currentIndex = 0;
      const chars = "!@#$%^&*()_+-=[]{}|;:,.<>?";
      
      const typeInterval = setInterval(() => {
        if (currentIndex <= text.length) {
          let scrambledText = text.slice(0, currentIndex);
          
          // Add scrambled characters for remaining text
          for (let i = currentIndex; i < text.length; i++) {
            if (Math.random() < 0.3) {
              scrambledText += chars[Math.floor(Math.random() * chars.length)];
            } else {
              scrambledText += " ";
            }
          }
          
          setDisplayText(scrambledText);
          currentIndex++;
        } else {
          setDisplayText(text);
          setIsComplete(true);
          clearInterval(typeInterval);
        }
      }, 100);

      return () => clearInterval(typeInterval);
    }, delay);

    return () => clearTimeout(timer);
  }, [text, delay]);

  return (
    <motion.div className={`relative ${className}`}>
      {/* Main text */}
      <motion.span
        className="relative z-10"
        animate={{
          textShadow: isComplete ? [
            "0 0 20px hsl(var(--primary)), 0 0 40px hsl(var(--primary)), 0 0 80px hsl(var(--primary))",
            "0 0 30px hsl(var(--primary)), 0 0 60px hsl(var(--primary)), 0 0 120px hsl(var(--primary))",
            "0 0 20px hsl(var(--primary)), 0 0 40px hsl(var(--primary)), 0 0 80px hsl(var(--primary))",
          ] : "0 0 10px hsl(var(--primary))",
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {displayText}
      </motion.span>

      {/* Holographic layers */}
      {isComplete && (
        <>
          <motion.span
            className="absolute inset-0 text-cyan-400/30"
            animate={{
              opacity: [0, 0.5, 0],
              x: [2, -2, 2],
            }}
            transition={{
              duration: 0.1,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            {text}
          </motion.span>

          <motion.span
            className="absolute inset-0 text-red-400/30"
            animate={{
              opacity: [0, 0.5, 0],
              x: [-2, 2, -2],
            }}
            transition={{
              duration: 0.1,
              repeat: Infinity,
              repeatType: "reverse",
              delay: 0.05,
            }}
          >
            {text}
          </motion.span>
        </>
      )}

      {/* Scanning line effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent"
        style={{ width: "2px" }}
        animate={{
          x: ["-100%", "100%"],
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          delay: delay / 1000 + 1,
          ease: "easeInOut",
        }}
      />
    </motion.div>
  );
};

export default HolographicText;