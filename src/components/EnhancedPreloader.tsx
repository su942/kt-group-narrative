import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

interface EnhancedPreloaderProps {
  onComplete: () => void;
}

const EnhancedPreloader = ({ onComplete }: EnhancedPreloaderProps) => {
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState<"loading" | "revealing" | "complete">("loading");
  const [glitchText, setGlitchText] = useState("KT GROUP");

  const loadingTexts = [
    "INITIALIZING SYSTEM...",
    "LOADING MEMORIES...",
    "CONNECTING CREW...",
    "PREPARING LEGEND...",
    "ALMOST READY...",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setStage("revealing");
          setTimeout(() => {
            setStage("complete");
            setTimeout(onComplete, 1000);
          }, 2000);
          return 100;
        }
        return prev + Math.random() * 3 + 1;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [onComplete]);

  useEffect(() => {
    if (stage === "revealing") {
      const glitchInterval = setInterval(() => {
        const glitchChars = "!@#$%^&*()_+-=[]{}|;:,.<>?";
        const original = "KT GROUP";
        let glitched = "";
        
        for (let i = 0; i < original.length; i++) {
          if (Math.random() < 0.3) {
            glitched += glitchChars[Math.floor(Math.random() * glitchChars.length)];
          } else {
            glitched += original[i];
          }
        }
        
        setGlitchText(glitched);
        
        setTimeout(() => setGlitchText("KT GROUP"), 100);
      }, 200);

      setTimeout(() => clearInterval(glitchInterval), 1500);
      return () => clearInterval(glitchInterval);
    }
  }, [stage]);

  const currentLoadingText = loadingTexts[Math.floor((progress / 100) * loadingTexts.length)] || loadingTexts[0];

  return (
    <AnimatePresence>
      {stage !== "complete" && (
        <motion.div
          className="fixed inset-0 z-50 bg-noir-deep flex items-center justify-center overflow-hidden"
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          {/* Animated background grid */}
          <motion.div
            className="absolute inset-0 opacity-20"
            animate={{
              backgroundPosition: ["0% 0%", "100% 100%"],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              backgroundImage: `
                linear-gradient(rgba(255, 68, 68, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255, 68, 68, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: "40px 40px",
            }}
          />

          {/* Scanning line */}
          <motion.div
            className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent"
            animate={{
              y: [0, window.innerHeight],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          <div className="relative z-10 text-center">
            {/* Main logo/title */}
            <motion.div
              className="mb-12"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <motion.h1
                className="font-display text-6xl md:text-8xl font-bold text-glow-intense mb-4"
                animate={stage === "revealing" ? {
                  textShadow: [
                    "0 0 20px hsl(var(--primary)), 0 0 40px hsl(var(--primary))",
                    "0 0 40px hsl(var(--primary)), 0 0 80px hsl(var(--primary)), 0 0 120px hsl(var(--primary))",
                    "0 0 20px hsl(var(--primary)), 0 0 40px hsl(var(--primary))",
                  ]
                } : {}}
                transition={{ duration: 0.5, repeat: stage === "revealing" ? Infinity : 0 }}
              >
                {glitchText}
              </motion.h1>
              
              <motion.p
                className="font-display text-lg tracking-[0.3em] text-primary/80"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                LEGENDARY CREW
              </motion.p>
            </motion.div>

            {/* Progress section */}
            <motion.div
              className="w-80 mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
            >
              {/* Progress bar container */}
              <div className="relative mb-6">
                <div className="w-full h-1 bg-noir-medium rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-primary via-primary to-primary/50 relative"
                    initial={{ width: "0%" }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  >
                    {/* Animated glow */}
                    <motion.div
                      className="absolute inset-0 bg-primary/50"
                      animate={{
                        opacity: [0.5, 1, 0.5],
                        scaleX: [1, 1.1, 1],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  </motion.div>
                </div>
                
                {/* Progress percentage */}
                <motion.div
                  className="absolute -top-8 right-0 font-display text-sm text-primary"
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  {Math.floor(progress)}%
                </motion.div>
              </div>

              {/* Loading text */}
              <motion.p
                className="font-display text-sm tracking-wider text-foreground/60"
                key={currentLoadingText}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {currentLoadingText}
              </motion.p>

              {/* Animated dots */}
              <motion.div
                className="flex justify-center gap-1 mt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
              >
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 bg-primary/60 rounded-full"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.6, 1, 0.6],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: i * 0.2,
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </motion.div>
            </motion.div>

            {/* Revealing stage effects */}
            {stage === "revealing" && (
              <motion.div
                className="absolute inset-0 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {/* Electric arcs */}
                {Array.from({ length: 8 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-[2px] bg-primary/60"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      height: `${Math.random() * 200 + 50}px`,
                      transform: `rotate(${Math.random() * 360}deg)`,
                    }}
                    animate={{
                      opacity: [0, 1, 0],
                      scaleY: [0, 1, 0],
                    }}
                    transition={{
                      duration: 0.3,
                      repeat: Infinity,
                      delay: Math.random() * 2,
                      repeatDelay: Math.random() * 1 + 0.5,
                    }}
                  />
                ))}

                {/* Expanding circles */}
                <motion.div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  animate={{
                    scale: [0, 3],
                    opacity: [1, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeOut",
                  }}
                >
                  <div className="w-20 h-20 border-2 border-primary/30 rounded-full" />
                </motion.div>
              </motion.div>
            )}
          </div>

          {/* Corner accents */}
          {[
            { top: "20px", left: "20px", rotate: "0deg" },
            { top: "20px", right: "20px", rotate: "90deg" },
            { bottom: "20px", left: "20px", rotate: "-90deg" },
            { bottom: "20px", right: "20px", rotate: "180deg" },
          ].map((pos, i) => (
            <motion.div
              key={i}
              className="absolute w-8 h-8"
              style={pos}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 2 + i * 0.1, duration: 0.5 }}
            >
              <div className="w-full h-[2px] bg-primary/60" />
              <div className="w-[2px] h-full bg-primary/60" />
            </motion.div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EnhancedPreloader;