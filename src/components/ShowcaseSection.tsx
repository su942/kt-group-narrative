import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const projects = [
  {
    title: "NEXUS",
    category: "Digital Experience",
    description: "A revolutionary platform redefining user interaction.",
  },
  {
    title: "CIPHER",
    category: "Cybersecurity",
    description: "Next-generation encryption for the modern age.",
  },
  {
    title: "QUANTUM",
    category: "AI Solutions",
    description: "Intelligent systems that learn and evolve.",
  },
  {
    title: "ECLIPSE",
    category: "Brand Design",
    description: "Visual identities that command attention.",
  },
];

const ShowcaseSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-25%"]);

  return (
    <section ref={containerRef} className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-noir-deep to-background" />

      {/* Header */}
      <div className="relative z-10 container mx-auto px-4 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <span className="font-display text-sm tracking-[0.3em] text-primary">
            PORTFOLIO
          </span>
          <h2 className="mt-4 font-display text-4xl md:text-6xl font-bold text-glow">
            OUR WORK
          </h2>
        </motion.div>
      </div>

      {/* Horizontal scroll projects */}
      <motion.div style={{ x }} className="relative z-10 flex gap-8 pl-8">
        {projects.map((project, index) => (
          <ProjectCard key={index} {...project} index={index} />
        ))}
      </motion.div>

      {/* Grid projects for mobile */}
      <div className="relative z-10 container mx-auto px-4 mt-16 md:hidden">
        <div className="grid gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={`mobile-${index}`} {...project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

const ProjectCard = ({
  title,
  category,
  description,
  index,
}: {
  title: string;
  category: string;
  description: string;
  index: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -10 }}
      className="group relative min-w-[300px] md:min-w-[400px] aspect-[4/5] bg-card border border-border hover:border-primary/50 transition-all duration-500 overflow-hidden cursor-pointer"
    >
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, hsl(var(--primary) / 0.2) 1px, transparent 1px)`,
          backgroundSize: "30px 30px",
        }}
      />

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80" />

      {/* Content */}
      <div className="absolute inset-0 p-8 flex flex-col justify-end">
        <span className="font-display text-xs tracking-[0.2em] text-primary">
          {category}
        </span>
        <h3 className="mt-2 font-display text-3xl md:text-4xl font-black tracking-wider group-hover:text-glow transition-all duration-300">
          {title}
        </h3>
        <p className="mt-4 text-muted-foreground text-sm opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
          {description}
        </p>

        {/* Animated line */}
        <div className="mt-6 h-[1px] bg-primary/30 overflow-hidden">
          <motion.div
            className="h-full bg-primary"
            initial={{ x: "-100%" }}
            whileHover={{ x: "0%" }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* Corner decorations */}
      <div className="absolute top-4 right-4 flex gap-2">
        <div className="w-2 h-2 border border-primary/30" />
        <div className="w-2 h-2 bg-primary/50" />
      </div>
    </motion.div>
  );
};

export default ShowcaseSection;
