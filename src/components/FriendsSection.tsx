import { motion } from "framer-motion";
import { useState } from "react";
import friend1 from "@/assets/friend-1.jpg";
import friend2 from "@/assets/friend-2.jpg";
import friend3 from "@/assets/friend-3.jpg";
import friend4 from "@/assets/friend-4.jpg";

const friends = [
  {
    name: "ALEX",
    role: "The Visionary",
    quote: "Dreams are just plans waiting to happen",
    image: friend1,
  },
  {
    name: "MAYA",
    role: "The Creator",
    quote: "Art is the soul made visible",
    image: friend2,
  },
  {
    name: "CHRIS",
    role: "The Strategist",
    quote: "Every problem has a elegant solution",
    image: friend3,
  },
  {
    name: "ZANE",
    role: "The Rebel",
    quote: "Rules are just suggestions",
    image: friend4,
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
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            The legendary crew that makes the impossible happen
          </p>
        </motion.div>

        {/* Friends Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {friends.map((friend, index) => (
            <FriendCard key={index} {...friend} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

const FriendCard = ({
  name,
  role,
  quote,
  image,
  index,
}: {
  name: string;
  role: string;
  quote: string;
  image: string;
  index: number;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotateY: -15 }}
      whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative perspective-1000"
    >
      <motion.div
        animate={{
          rotateY: isHovered ? 5 : 0,
          rotateX: isHovered ? -5 : 0,
          scale: isHovered ? 1.05 : 1,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="relative aspect-[3/4] overflow-hidden bg-card border border-border group-hover:border-primary/50 transition-colors duration-500"
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
        <div className="absolute bottom-0 left-0 right-0 p-6">
          {/* Name with glitch effect */}
          <motion.h3
            className="font-display text-2xl font-black tracking-wider"
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

          {/* Quote - appears on hover */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{
              opacity: isHovered ? 1 : 0,
              y: isHovered ? 0 : 10,
            }}
            transition={{ duration: 0.3 }}
            className="mt-3 text-sm text-muted-foreground italic"
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
          <div className="w-8 h-[1px] bg-primary" />
          <div className="w-4 h-[1px] bg-primary mt-1" />
        </motion.div>

        {/* Neon border glow on hover */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
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
        className="absolute -bottom-2 -right-2 w-16 h-16 border border-primary/20"
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
