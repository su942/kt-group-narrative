import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const CTASection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["50%", "-20%"]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Animated background */}
      <motion.div className="absolute inset-0" style={{ y }}>
        <div className="absolute inset-0 bg-gradient-to-t from-noir-deep via-background to-noir-deep" />
        
        {/* Pulsing glow */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] rounded-full"
          animate={{
            background: [
              "radial-gradient(circle, hsl(var(--primary) / 0.1) 0%, transparent 70%)",
              "radial-gradient(circle, hsl(var(--primary) / 0.2) 0%, transparent 70%)",
              "radial-gradient(circle, hsl(var(--primary) / 0.1) 0%, transparent 70%)",
            ],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(hsl(var(--primary)) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)
          `,
          backgroundSize: "100px 100px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="font-display text-sm tracking-[0.3em] text-primary">
            THE NEXT CHAPTER
          </span>

          <h2 className="mt-6 font-display text-5xl md:text-7xl lg:text-8xl font-black tracking-wider">
            <span className="glitch text-glow-intense" data-text="JOIN">
              JOIN
            </span>
            <br />
            <span className="text-foreground/50">KT GROUP</span>
          </h2>

          <p className="mt-8 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Be part of the revolution. Together, we'll create experiences that
            define the future of digital innovation.
          </p>

          <motion.div
            className="mt-12 flex flex-col sm:flex-row gap-6 justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-12 py-5 font-display text-sm tracking-widest bg-primary text-primary-foreground overflow-hidden"
            >
              <span className="relative z-10">GET STARTED</span>
              <motion.div
                className="absolute inset-0 bg-glow-intense"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.5 }}
              />
              <div className="absolute inset-0 animate-pulse-glow" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-12 py-5 font-display text-sm tracking-widest border border-primary/50 text-foreground hover:bg-primary/10 hover:border-primary transition-all duration-300"
            >
              CONTACT US
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Footer */}
        <motion.div
          className="mt-32"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          <div className="flex justify-center gap-8 mb-8">
            {["TWITTER", "LINKEDIN", "INSTAGRAM"].map((social, index) => (
              <motion.a
                key={social}
                href="#"
                className="font-display text-xs tracking-widest text-muted-foreground hover:text-primary transition-colors"
                whileHover={{ y: -2 }}
              >
                {social}
              </motion.a>
            ))}
          </div>

          <div className="h-[1px] w-32 mx-auto bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

          <p className="mt-8 font-display text-xs tracking-widest text-muted-foreground">
            © 2024 KT GROUP. ALL RIGHTS RESERVED.
          </p>
        </motion.div>
      </div>

      {/* Corner decorations */}
      <div className="absolute bottom-8 left-8 flex flex-col gap-2">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="w-8 h-[1px] bg-primary/30" />
        ))}
      </div>

      <div className="absolute bottom-8 right-8 flex flex-col gap-2 items-end">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="w-8 h-[1px] bg-primary/30" />
        ))}
      </div>
    </section>
  );
};

export default CTASection;
