import { motion } from "framer-motion";

const MovingMarquee = () => {
  // Create repeated text for seamless scrolling
  const marqueeText = Array(20).fill("KT GROUP").join(" • ");

  return (
    <div className="relative py-8 overflow-hidden bg-gradient-to-r from-background via-noir-medium to-background">
      {/* First line - Left to Right */}
      <div className="relative h-12 flex items-center overflow-hidden mb-4">
        <motion.div
          className="flex whitespace-nowrap"
          animate={{
            x: ["-100%", "0%"],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <span className="font-display text-2xl md:text-3xl font-black tracking-[0.2em] text-primary/30 select-none">
            {marqueeText}
          </span>
        </motion.div>
        
        {/* Duplicate for seamless loop */}
        <motion.div
          className="flex whitespace-nowrap absolute"
          animate={{
            x: ["0%", "100%"],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <span className="font-display text-2xl md:text-3xl font-black tracking-[0.2em] text-primary/30 select-none">
            {marqueeText}
          </span>
        </motion.div>
      </div>

      {/* Second line - Right to Left */}
      <div className="relative h-12 flex items-center overflow-hidden">
        <motion.div
          className="flex whitespace-nowrap"
          animate={{
            x: ["0%", "-100%"],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <span className="font-display text-2xl md:text-3xl font-black tracking-[0.2em] text-primary/20 select-none">
            {marqueeText}
          </span>
        </motion.div>
        
        {/* Duplicate for seamless loop */}
        <motion.div
          className="flex whitespace-nowrap absolute"
          animate={{
            x: ["100%", "0%"],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <span className="font-display text-2xl md:text-3xl font-black tracking-[0.2em] text-primary/20 select-none">
            {marqueeText}
          </span>
        </motion.div>
      </div>

      {/* Gradient overlays for fade effect */}
      <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-background to-transparent pointer-events-none z-10" />
      <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-background to-transparent pointer-events-none z-10" />
      
      {/* Subtle glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent pointer-events-none" />
    </div>
  );
};

export default MovingMarquee;