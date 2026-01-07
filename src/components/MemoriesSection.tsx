import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { Calendar, MapPin, Users, Heart } from "lucide-react";

const memories = [
  {
    id: 1,
    title: "THE FIRST MEETUP",
    date: "Summer 2023",
    location: "Downtown Coffee Shop",
    description: "Where it all began. Suraj, Aman, and the crew became legends over terrible coffee and wild dreams.",
    image: "/api/placeholder/400/300",
    tags: ["Origin Story", "Coffee", "Dreams"],
  },
  {
    id: 2,
    title: "MIDNIGHT CODING SESSION",
    date: "October 2023",
    location: "Hemant's Place",
    description: "48 hours straight with Piyush, Pavan, and the squad. Pizza boxes, energy drinks, and pure determination.",
    image: "/api/placeholder/400/300",
    tags: ["Code", "All-nighter", "Pizza"],
  },
  {
    id: 3,
    title: "THE BREAKTHROUGH",
    date: "December 2023",
    location: "Prathamesh's Studio",
    description: "The moment everything clicked. Yash and Sattu's vision became reality in a burst of creative chaos.",
    image: "/api/placeholder/400/300",
    tags: ["Breakthrough", "Art", "Vision"],
  },
  {
    id: 4,
    title: "VICTORY CELEBRATION",
    date: "March 2024",
    location: "Rooftop Bar",
    description: "Celebrating with Mojo, Mithesh, and the entire squad. The city lights below, the stars above, and us in between.",
    image: "/api/placeholder/400/300",
    tags: ["Victory", "Celebration", "Stars"],
  },
  {
    id: 5,
    title: "THE ROAD TRIP",
    date: "June 2024",
    location: "Pacific Coast Highway",
    description: "Epic adventure with Suyog, Karn, Sanket, and the crew. Music loud, windows down, memories made at every mile.",
    image: "/api/placeholder/400/300",
    tags: ["Adventure", "Road Trip", "Freedom"],
  },
  {
    id: 6,
    title: "PRESENT DAY",
    date: "Now",
    location: "Everywhere",
    description: "Roshan, Sidh, Rajveer, Athrva, and all 17 legends still writing our story. Every day brings new adventures.",
    image: "/api/placeholder/400/300",
    tags: ["Present", "Future", "Legends"],
  },
];

const MemoriesSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredMemory, setHoveredMemory] = useState<number | null>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);

  return (
    <section ref={containerRef} className="relative py-32 overflow-hidden">
      {/* Parallax background */}
      <motion.div
        className="absolute inset-0"
        style={{ y: backgroundY }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background via-noir-deep to-background" />
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-primary/10 rounded-full blur-[300px]"
          style={{ opacity: glowOpacity }}
        />
      </motion.div>

      {/* Accent lines */}
      <div className="absolute left-1/4 top-0 w-[1px] h-full bg-gradient-to-b from-transparent via-primary/30 to-transparent" />
      <div className="absolute right-1/4 top-0 w-[1px] h-full bg-gradient-to-b from-transparent via-primary/30 to-transparent" />

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
            OUR JOURNEY
          </span>
          <h2 className="mt-4 font-display text-4xl md:text-6xl font-bold text-glow">
            MEMORIES
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-lg">
            Every legend has its moments. These are the memories that forged us into who we are today.
          </p>
        </motion.div>

        {/* Memories Grid - Mobile Responsive */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {memories.map((memory, index) => (
            <motion.div
              key={memory.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative"
              onMouseEnter={() => setHoveredMemory(memory.id)}
              onMouseLeave={() => setHoveredMemory(null)}
              onTouchStart={() => setHoveredMemory(memory.id)}
              onTouchEnd={() => setTimeout(() => setHoveredMemory(null), 2000)}
            >
              {/* Memory Card */}
              <motion.div
                className="relative bg-card/50 backdrop-blur-sm rounded-lg overflow-hidden neon-border hover-lift"
                whileHover={{ 
                  scale: 1.03, 
                  y: -8,
                  rotateY: 5,
                  rotateX: 5,
                }}
                whileTap={{ scale: 0.98 }}
                transition={{ 
                  duration: 0.4, 
                  ease: "easeOut",
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                }}
                style={{
                  transformStyle: "preserve-3d",
                }}
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <motion.img
                    src={memory.image}
                    alt={memory.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.15, rotate: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-noir-deep/80 via-transparent to-transparent" />
                  
                  {/* Animated scan lines */}
                  <motion.div
                    className="absolute inset-0"
                    style={{
                      backgroundImage: `repeating-linear-gradient(
                        0deg,
                        transparent,
                        transparent 2px,
                        hsl(var(--primary) / 0.1) 2px,
                        hsl(var(--primary) / 0.1) 4px
                      )`,
                    }}
                    animate={{
                      backgroundPosition: ["0px 0px", "0px 20px"],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                  
                  {/* Hover overlay with electric effect */}
                  <motion.div
                    className="absolute inset-0 bg-primary/20"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredMemory === memory.id ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {hoveredMemory === memory.id && (
                      <motion.div
                        className="absolute inset-0"
                        animate={{
                          background: [
                            "radial-gradient(circle at 20% 20%, hsl(var(--primary) / 0.3) 0%, transparent 50%)",
                            "radial-gradient(circle at 80% 80%, hsl(var(--primary) / 0.3) 0%, transparent 50%)",
                            "radial-gradient(circle at 20% 80%, hsl(var(--primary) / 0.3) 0%, transparent 50%)",
                            "radial-gradient(circle at 80% 20%, hsl(var(--primary) / 0.3) 0%, transparent 50%)",
                          ]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                    )}
                  </motion.div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Title */}
                  <motion.h3
                    className="font-display text-xl font-bold mb-2 text-glow"
                    data-text={memory.title}
                    animate={{
                      textShadow: hoveredMemory === memory.id 
                        ? "0 0 10px hsl(var(--primary)), 0 0 20px hsl(var(--primary)), 0 0 40px hsl(var(--primary))"
                        : "0 0 20px hsl(var(--primary) / 0.8), 0 0 40px hsl(var(--primary) / 0.4)"
                    }}
                  >
                    {memory.title}
                  </motion.h3>

                  {/* Meta info */}
                  <div className="flex items-center gap-4 mb-3 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{memory.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{memory.location}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-foreground/80 mb-4 leading-relaxed">
                    {memory.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {memory.tags.map((tag, tagIndex) => (
                      <motion.span
                        key={tagIndex}
                        className="px-2 py-1 text-xs font-display tracking-wider bg-primary/10 text-primary rounded border border-primary/20"
                        whileHover={{ scale: 1.05, backgroundColor: "hsl(var(--primary) / 0.2)" }}
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>
                </div>

                {/* Glow effect on hover */}
                <motion.div
                  className="absolute inset-0 rounded-lg pointer-events-none"
                  initial={{ boxShadow: "0 0 0 0 hsl(var(--primary) / 0)" }}
                  animate={{
                    boxShadow: hoveredMemory === memory.id
                      ? "0 0 30px 0 hsl(var(--primary) / 0.3), inset 0 0 30px 0 hsl(var(--primary) / 0.1)"
                      : "0 0 0 0 hsl(var(--primary) / 0)"
                  }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Bottom accent */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-20 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent"
        />

        {/* Quote */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-center mt-12"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Heart className="w-5 h-5 text-primary" />
            <Users className="w-5 h-5 text-primary" />
            <Heart className="w-5 h-5 text-primary" />
          </div>
          <p className="font-display text-lg text-primary/80 tracking-wide">
            "These moments made us who we are. The legend continues..."
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default MemoriesSection;