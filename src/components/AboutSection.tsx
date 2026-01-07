import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const storyContent = [
  {
    title: "THE BEGINNING",
    text: "It all started with a group of friends who shared one wild dream — to create something legendary together.",
  },
  {
    title: "THE JOURNEY",
    text: "Through late nights, crazy ideas, and countless adventures, we grew stronger as a crew. Every challenge only made us tighter.",
  },
  {
    title: "THE LEGEND",
    text: "Now we stand united — a squad that turns impossible dreams into reality. This is just the beginning of our story.",
  },
];

const AboutSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  return (
    <section ref={containerRef} className="relative py-32 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-noir-medium to-background" />

      {/* Accent line */}
      <motion.div
        className="absolute left-1/2 top-0 w-[1px] h-full bg-gradient-to-b from-transparent via-primary/50 to-transparent"
        style={{ scaleY: scrollYProgress }}
      />

      <div className="relative z-10 container mx-auto px-4">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <span className="font-display text-sm tracking-[0.3em] text-primary">
            OUR STORY
          </span>
          <h2 className="mt-4 font-display text-4xl md:text-6xl font-bold text-glow">
            THE JOURNEY
          </h2>
        </motion.div>

        {/* Story cards */}
        <div className="space-y-32">
          {storyContent.map((item, index) => (
            <StoryCard key={index} {...item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

const StoryCard = ({
  title,
  text,
  index,
}: {
  title: string;
  text: string;
  index: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 1]);
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    [index % 2 === 0 ? -100 : 100, 0]
  );
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity, x, scale }}
      className={`flex ${index % 2 === 0 ? "justify-start" : "justify-end"}`}
    >
      <div className="max-w-xl p-8 bg-card/50 backdrop-blur-sm neon-border">
        <span className="font-display text-6xl md:text-8xl font-black text-primary/20">
          0{index + 1}
        </span>
        <h3 className="mt-4 font-display text-2xl md:text-3xl font-bold text-foreground">
          {title}
        </h3>
        <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
          {text}
        </p>
      </div>
    </motion.div>
  );
};

export default AboutSection;
