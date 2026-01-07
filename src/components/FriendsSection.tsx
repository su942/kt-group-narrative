import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const friends = [
  {
    name: "SURAJ",
    role: "The Sigma",
    quote: "Walking my own path, creating my own rules",
    image: "/src/assets/suraj.jpg",
    specialty: "Independence",
  },
  {
    name: "SATTU",
    role: "The Invincible",
    quote: "Suggests being too powerful to be overcome or conquered.",
    image: "/src/assets/sattu.jpg",
    specialty: "Indomitability",
  },
  {
    name: "AMAN",
    role: "The Strategist",
    quote: "Every move calculated, every plan perfect",
    image: "/src/assets/aman.jpg",
    specialty: "Strategy",
  },
  {
    name: "HEMANT",
    role: "The Innovator",
    quote: "Breaking boundaries with every idea",
    image: "/src/assets/hemant.jpg",
    specialty: "Innovation",
  },
  {
    name: "PIYUSH",
    role: "The Creator",
    quote: "Turning visions into reality",
    image: "/src/assets/piyush.jpg",
    specialty: "Creation",
  },
  {
    name: "PAVAN",
    role: "The Catalyst",
    quote: "Sparking change wherever I go",
    image: "/src/assets/pavan.jpg",
    specialty: "Motivation",
  },
  {
    name: "PRATHAMESH",
    role: "The Architect",
    quote: "Building the future, one step at a time",
    image: "/src/assets/prathamesh.jpg",
    specialty: "Architecture",
  },
  {
    name: "YASH",
    role: "The Maverick",
    quote: "Rules are meant to be rewritten",
    image: "/src/assets/yash.jpg",
    specialty: "Innovation",
  },
  {
    name: "MOJO",
    role: "The black magic",
    quote: "Making the impossible look easy",
    image: "/src/assets/mojo.jpg",
    specialty: "Magic",
  },
  {
    name: "MITHESH",
    role: "The Analyst",
    quote: "Data tells stories, I listen",
    image: "/src/assets/mithesh.jpg",
    specialty: "Analysis",
  },
  {
    name: "SUYOG",
    role: "The Connector",
    quote: "Bridging ideas and making them happen",
    image: "/src/assets/suyog.jpg",
    specialty: "Connection",
  },
  {
    name: "KARN",
    role: "The Warrior",
    quote: "Fighting for what we believe in",
    image: "/src/assets/karn.jpg",
    specialty: "Determination",
  },
  {
    name: "SANKET",
    role: "The Optimizer",
    quote: "Making everything better, faster, stronger",
    image: "/src/assets/sanket.jpg",
    specialty: "Optimization",
  },
  {
    name: "ROSHAN",
    role: "The Illuminator",
    quote: "Bringing light to every challenge",
    image: "/src/assets/roshan.jpg",
    specialty: "Clarity",
  },
  {
    name: "SIDH",
    role: "The Perfectionist",
    quote: "Excellence is not a skill, it's an attitude",
    image: "/src/assets/sidh.jpg",
    specialty: "Perfection",
  },
  {
    name: "RAJVEER",
    role: "The Champion",
    quote: "Victory is not just a goal, it's a way of life",
    image: "/src/assets/rajveer.jpg",
    specialty: "Victory",
  },
  {
    name: "ATHRVA",
    role: "The Visionary",
    quote: "Seeing tomorrow's possibilities today",
    image: "/src/assets/athrva.jpg",
    specialty: "Vision",
  },
];

const FriendsSection = () => {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-noir-medium to-background" />
      
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[200px]" />

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
            THE CREW
          </span>
          <h2 className="mt-4 font-display text-4xl md:text-6xl font-bold text-glow">
            OUR SQUAD
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-lg">
            17 legends united by friendship, driven by dreams, and bound by an unbreakable bond. Meet the squad that's redefining what's possible.
          </p>
        </motion.div>

        {/* Friends Grid - Responsive */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 max-w-7xl mx-auto">
          {friends.map((friend, index) => (
            <FriendCard key={index} {...friend} index={index} />
          ))}
        </div>

        {/* Squad Stats - Mobile Responsive */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 sm:mt-20 text-center"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 sm:gap-8 px-6 sm:px-8 py-4 bg-card/20 backdrop-blur-sm rounded-full border border-primary/20">
            <div className="text-center">
              <div className="font-display text-2xl sm:text-3xl font-bold text-primary">{friends.length}</div>
              <div className="text-xs text-muted-foreground tracking-wide">LEGENDS</div>
            </div>
            <div className="w-8 h-[1px] sm:w-[1px] sm:h-12 bg-primary/30" />
            <div className="text-center">
              <div className="font-display text-2xl sm:text-3xl font-bold text-primary">∞</div>
              <div className="text-xs text-muted-foreground tracking-wide">POSSIBILITIES</div>
            </div>
            <div className="w-8 h-[1px] sm:w-[1px] sm:h-12 bg-primary/30" />
            <div className="text-center">
              <div className="font-display text-2xl sm:text-3xl font-bold text-primary">1</div>
              <div className="text-xs text-muted-foreground tracking-wide">UNSTOPPABLE CREW</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const FriendCard = ({
  name,
  role,
  quote,
  image,
  specialty,
  index,
}: {
  name: string;
  role: string;
  quote: string;
  image: string;
  specialty: string;
  index: number;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotateY: -15 }}
      whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseEnter={() => !isMobile && setIsHovered(true)}
      onMouseLeave={() => !isMobile && setIsHovered(false)}
      onTouchStart={() => isMobile && setIsHovered(true)}
      onTouchEnd={() => isMobile && setTimeout(() => setIsHovered(false), 2000)}
      className="group relative perspective-1000"
    >
      <motion.div
        animate={{
          rotateY: isHovered && !isMobile ? 5 : 0,
          rotateX: isHovered && !isMobile ? -5 : 0,
          scale: isHovered ? (isMobile ? 1.02 : 1.05) : 1,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="relative aspect-[3/4] overflow-hidden bg-card border border-border group-hover:border-primary/50 transition-colors duration-500 rounded-lg"
      >
        {/* Image */}
        <motion.img
          src={image}
          alt={name}
          className="absolute inset-0 w-full h-full object-cover"
          animate={{
            scale: isHovered ? 1.1 : 1,
            filter: isHovered ? "brightness(0.7)" : "brightness(0.9)",
          }}
          transition={{ duration: 0.5 }}
        />

        {/* Glitch overlay on hover */}
        <motion.div
          className="absolute inset-0 bg-primary/20 mix-blend-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? [0, 0.5, 0, 0.3, 0] : 0 }}
          transition={{ duration: 0.3 }}
        />

        {/* Scanline effect */}
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            background: `repeating-linear-gradient(
              0deg,
              transparent,
              transparent 2px,
              hsl(var(--foreground) / 0.03) 2px,
              hsl(var(--foreground) / 0.03) 4px
            )`,
          }}
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
          {/* Name with glitch effect */}
          <motion.h3
            className="font-display text-lg sm:text-xl md:text-2xl font-black tracking-wider"
            animate={{
              textShadow: isHovered
                ? [
                    "0 0 0 transparent",
                    "-2px 0 hsl(var(--primary)), 2px 0 hsl(180 100% 50%)",
                    "0 0 0 transparent",
                  ]
                : "0 0 0 transparent",
            }}
            transition={{ duration: 0.2, repeat: isHovered ? 2 : 0 }}
          >
            {name}
          </motion.h3>

          <p className="mt-1 font-display text-xs tracking-widest text-primary">
            {role}
          </p>
          
          <div className="mt-2 px-2 py-1 bg-primary/10 rounded text-xs font-display tracking-wide text-primary/80 inline-block">
            {specialty}
          </div>

          {/* Quote - appears on hover/touch */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{
              opacity: isHovered ? 1 : 0,
              y: isHovered ? 0 : 10,
            }}
            transition={{ duration: 0.3 }}
            className="mt-3 text-xs sm:text-sm text-muted-foreground italic"
          >
            "{quote}"
          </motion.p>
        </div>

        {/* Corner accents */}
        <motion.div
          className="absolute top-4 left-4 flex gap-1"
          animate={{ opacity: isHovered ? 1 : 0.3 }}
        >
          <div className="w-2 h-2 border border-primary" />
          <div className="w-2 h-2 bg-primary" />
        </motion.div>

        <motion.div
          className="absolute top-4 right-4"
          animate={{ opacity: isHovered ? 1 : 0.3 }}
        >
          <div className="w-6 sm:w-8 h-[1px] bg-primary" />
          <div className="w-3 sm:w-4 h-[1px] bg-primary mt-1" />
        </motion.div>

        {/* Neon border glow on hover */}
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-lg"
          animate={{
            boxShadow: isHovered
              ? "inset 0 0 30px hsl(var(--primary) / 0.3), 0 0 30px hsl(var(--primary) / 0.2)"
              : "inset 0 0 0 transparent",
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>

      {/* Floating elements */}
      <motion.div
        className="absolute -bottom-2 -right-2 w-12 sm:w-16 h-12 sm:h-16 border border-primary/20"
        animate={{
          opacity: isHovered ? 0.5 : 0,
          scale: isHovered ? 1 : 0.8,
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

export default FriendsSection;
