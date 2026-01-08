import { motion } from "framer-motion";

const MovingMarquee = () => {
  return (
    <section className="relative py-16 overflow-hidden bg-gradient-to-r from-background via-noir-medium to-background border-y border-primary/10">
      {/* First line - Left to Right */}
      <div className="relative h-20 flex items-center overflow-hidden mb-8">
        <motion.div
          className="absolute whitespace-nowrap"
          animate={{
            x: ["-100vw", "100vw"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <span className="font-display text-4xl md:text-5xl font-black tracking-[0.4em] text-primary/50 select-none">
            KT GROUP • KT GROUP • KT GROUP • KT GROUP • KT GROUP • KT GROUP • KT GROUP • KT GROUP • KT GROUP • KT GROUP
          </span>
        </motion.div>
      </div>

      {/* Second line - Right to Left */}
      <div className="relative h-20 flex items-center overflow-hidden">
        <motion.div
          className="absolute whitespace-nowrap"
          animate={{
            x: ["100vw", "-100vw"],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <span className="font-display text-4xl md:text-5xl font-black tracking-[0.4em] text-primary/30 select-none">
            KT GROUP • KT GROUP • KT GROUP • KT GROUP • KT GROUP • KT GROUP • KT GROUP • KT GROUP • KT GROUP • KT GROUP
          </span>
        </motion.div>
      </div>

      {/* Gradient overlays for fade effect */}
      <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-background to-transparent pointer-events-none z-10" />
      <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-background to-transparent pointer-events-none z-10" />
      
      {/* Subtle glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent pointer-events-none" />
    </section>
  );
};

export default MovingMarquee;