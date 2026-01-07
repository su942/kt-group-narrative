import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Zap, Target, Rocket, Eye } from "lucide-react";

const visionItems = [
  {
    icon: Eye,
    title: "VISION",
    description: "To be the definitive leader in immersive digital experiences.",
  },
  {
    icon: Target,
    title: "MISSION",
    description: "Crafting groundbreaking solutions that transcend expectations.",
  },
  {
    icon: Zap,
    title: "VALUES",
    description: "Innovation, excellence, and relentless pursuit of perfection.",
  },
  {
    icon: Rocket,
    title: "FUTURE",
    description: "Building tomorrow's digital infrastructure, today.",
  },
];

const VisionSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <section ref={containerRef} className="relative py-32 overflow-hidden">
      {/* Parallax background */}
      <motion.div
        className="absolute inset-0"
        style={{ y: backgroundY }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-noir-deep via-background to-noir-medium" />
        <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[200px]" />
        <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-primary/3 rounded-full blur-[150px]" />
      </motion.div>

      <div className="relative z-10 container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="font-display text-sm tracking-[0.3em] text-primary">
            WHO WE ARE
          </span>
          <h2 className="mt-4 font-display text-4xl md:text-6xl font-bold text-glow">
            OUR VISION
          </h2>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {visionItems.map((item, index) => (
            <VisionCard key={index} {...item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

const VisionCard = ({
  icon: Icon,
  title,
  description,
  index,
}: {
  icon: typeof Eye;
  title: string;
  description: string;
  index: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
      className="group relative p-8 bg-card/30 backdrop-blur-sm border border-border hover:border-primary/50 transition-all duration-500"
    >
      {/* Hover glow effect */}
      <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-8 h-[1px] bg-primary" />
      <div className="absolute top-0 left-0 w-[1px] h-8 bg-primary" />
      <div className="absolute bottom-0 right-0 w-8 h-[1px] bg-primary" />
      <div className="absolute bottom-0 right-0 w-[1px] h-8 bg-primary" />

      <div className="relative z-10">
        <div className="w-16 h-16 flex items-center justify-center border border-primary/30 group-hover:border-primary group-hover:box-glow transition-all duration-500">
          <Icon className="w-8 h-8 text-primary group-hover:scale-110 transition-transform duration-300" />
        </div>

        <h3 className="mt-6 font-display text-xl font-bold tracking-wider">
          {title}
        </h3>

        <p className="mt-4 text-muted-foreground leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

export default VisionSection;
