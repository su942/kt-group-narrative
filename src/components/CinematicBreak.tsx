import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const CinematicBreak = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background distortion */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-noir-deep" />
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-primary/10"
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      {/* Noise overlay */}
      <div className="absolute inset-0 opacity-[0.08]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Animated lines */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent"
            style={{
              top: `${20 + i * 15}%`,
              left: 0,
              right: 0,
            }}
            animate={{
              x: ["-100%", "100%"],
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              ease: "linear",
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <motion.div
        style={{ scale, opacity }}
        className="relative z-10 text-center px-4"
      >
        <motion.h2
          className="font-display text-5xl md:text-8xl lg:text-9xl font-black tracking-wider glitch text-glow-intense"
          data-text="BREAKING"
          animate={{
            textShadow: [
              "0 0 20px hsl(var(--primary))",
              "0 0 60px hsl(var(--primary))",
              "0 0 20px hsl(var(--primary))",
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        >
          BREAKING
        </motion.h2>

        <motion.h2
          className="font-display text-5xl md:text-8xl lg:text-9xl font-black tracking-wider mt-2 text-foreground/30"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          BOUNDARIES
        </motion.h2>

        <motion.div
          className="mt-8 flex justify-center gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="w-3 h-3 bg-primary"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </motion.div>
      </motion.div>

      {/* Scanlines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-5"
        style={{
          background: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            hsl(var(--foreground) / 0.1) 2px,
            hsl(var(--foreground) / 0.1) 4px
          )`,
        }}
      />
    </section>
  );
};

export default CinematicBreak;
