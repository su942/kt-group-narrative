import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Play, Pause, Camera, Users2 } from "lucide-react";

const galleryItems = [
  {
    id: 1,
    type: "photo",
    title: "Squad Goals",
    subtitle: "All 17 legends together",
    image: "/api/placeholder/600/400",
    description: "Epic group shot with Suraj, Aman, Hemant, Piyush, and the entire crew after our first major project launch",
  },
  {
    id: 2,
    type: "photo",
    title: "Late Night Vibes",
    subtitle: "3 AM coding session",
    image: "/api/placeholder/600/400",
    description: "Pavan, Prathamesh, and Yash when inspiration strikes at midnight",
  },
  {
    id: 3,
    type: "photo",
    title: "Victory Dance",
    subtitle: "Celebrating success",
    image: "/api/placeholder/600/400",
    description: "Sattu, Mojo, and Mithesh - the moment we knew we made it",
  },
  {
    id: 4,
    type: "photo",
    title: "Creative Chaos",
    subtitle: "Brainstorming session",
    image: "/api/placeholder/600/400",
    description: "Suyog, Karn, and Sanket - ideas flowing like electricity",
  },
  {
    id: 5,
    type: "photo",
    title: "Road Warriors",
    subtitle: "Adventure time",
    image: "/api/placeholder/600/400",
    description: "Roshan, Sidh, and Rajveer conquering the highway together",
  },
  {
    id: 6,
    type: "photo",
    title: "Behind the Scenes",
    subtitle: "Making magic happen",
    image: "/api/placeholder/600/400",
    description: "Athrva and the squad - the real work happens in the shadows",
  },
  {
    id: 7,
    type: "photo",
    title: "Sunset Squad",
    subtitle: "Golden hour memories",
    image: "/api/placeholder/600/400",
    description: "The entire KT Group crew - perfect ending to a perfect day",
  },
  {
    id: 8,
    type: "photo",
    title: "Future Legends",
    subtitle: "Looking ahead",
    image: "/api/placeholder/600/400",
    description: "All 17 members united - this is just the beginning",
  },
];

const MemoriesGallery = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const x = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 30 });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const glowIntensity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 0.3]);

  // Auto-scroll functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % galleryItems.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  // Update scroll position based on current index
  useEffect(() => {
    const itemWidth = typeof window !== 'undefined' && window.innerWidth < 768 ? 280 : 400; // Smaller width on mobile
    const gap = typeof window !== 'undefined' && window.innerWidth < 768 ? 16 : 24; // Smaller gap on mobile
    const newX = -(currentIndex * (itemWidth + gap));
    x.set(newX);
  }, [currentIndex, x]);

  const handlePrevious = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + galleryItems.length) % galleryItems.length);
  };

  const handleNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % galleryItems.length);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  return (
    <section ref={containerRef} className="relative py-32 overflow-hidden">
      {/* Parallax background */}
      <motion.div
        className="absolute inset-0"
        style={{ y: backgroundY }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-noir-deep via-background to-noir-deep" />
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[600px] bg-primary/8 rounded-full blur-[200px]"
          style={{ opacity: glowIntensity }}
        />
      </motion.div>

      {/* Scanline effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary/50 to-transparent animate-scanline" />
      </div>

      <div className="relative z-10 container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Camera className="w-6 h-6 text-primary" />
            <Users2 className="w-6 h-6 text-primary" />
            <Camera className="w-6 h-6 text-primary" />
          </div>
          <span className="font-display text-sm tracking-[0.3em] text-primary">
            CAPTURED MOMENTS
          </span>
          <h2 className="mt-4 font-display text-4xl md:text-6xl font-bold text-glow">
            GALLERY
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-lg">
            A visual journey through our adventures. Every frame tells a story of friendship, dreams, and legendary moments.
          </p>
        </motion.div>

        {/* Gallery Controls - Mobile Responsive */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center justify-center gap-3 sm:gap-4 mb-8 sm:mb-12"
        >
          <motion.button
            onClick={handlePrevious}
            className="p-2 sm:p-3 rounded-full bg-card/50 backdrop-blur-sm border border-primary/20 text-primary hover:bg-primary/10 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </motion.button>

          <motion.button
            onClick={toggleAutoPlay}
            className="p-2 sm:p-3 rounded-full bg-card/50 backdrop-blur-sm border border-primary/20 text-primary hover:bg-primary/10 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {isAutoPlaying ? <Pause className="w-4 h-4 sm:w-5 sm:h-5" /> : <Play className="w-4 h-4 sm:w-5 sm:h-5" />}
          </motion.button>

          <motion.button
            onClick={handleNext}
            className="p-2 sm:p-3 rounded-full bg-card/50 backdrop-blur-sm border border-primary/20 text-primary hover:bg-primary/10 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </motion.button>
        </motion.div>

        {/* Horizontal Scrolling Gallery */}
        <div className="relative">
          <div className="overflow-hidden">
            <motion.div
              ref={scrollRef}
              className="flex gap-6"
              style={{ x: springX }}
            >
              {galleryItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  className="flex-shrink-0 w-[280px] sm:w-[400px] group cursor-pointer"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  onMouseEnter={() => {
                    setHoveredItem(item.id);
                    setIsAutoPlaying(false);
                  }}
                  onMouseLeave={() => {
                    setHoveredItem(null);
                  }}
                  onTouchStart={() => {
                    setHoveredItem(item.id);
                    setIsAutoPlaying(false);
                  }}
                  onTouchEnd={() => {
                    setTimeout(() => setHoveredItem(null), 2000);
                  }}
                  onClick={() => setCurrentIndex(index)}
                >
                  <div className="relative bg-card/30 backdrop-blur-sm rounded-xl overflow-hidden neon-border">
                    {/* Image Container */}
                    <div className="relative h-64 overflow-hidden">
                      <motion.img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                      />
                      
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-noir-deep/90 via-noir-deep/20 to-transparent" />
                      
                      {/* Hover glow overlay */}
                      <motion.div
                        className="absolute inset-0 bg-primary/20"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: hoveredItem === item.id ? 1 : 0 }}
                        transition={{ duration: 0.3 }}
                      />

                      {/* Active indicator */}
                      {currentIndex === index && (
                        <motion.div
                          className="absolute top-4 right-4 w-3 h-3 bg-primary rounded-full"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="absolute inset-0 bg-primary rounded-full animate-ping" />
                        </motion.div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <motion.h3
                        className="font-display text-xl font-bold mb-1 text-glow"
                        animate={{
                          textShadow: hoveredItem === item.id || currentIndex === index
                            ? "0 0 15px hsl(var(--primary)), 0 0 30px hsl(var(--primary))"
                            : "0 0 10px hsl(var(--primary) / 0.6)"
                        }}
                      >
                        {item.title}
                      </motion.h3>
                      
                      <p className="text-primary/80 text-sm font-display tracking-wide mb-3">
                        {item.subtitle}
                      </p>
                      
                      <p className="text-foreground/70 text-sm leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    {/* Glow effect */}
                    <motion.div
                      className="absolute inset-0 rounded-xl pointer-events-none"
                      initial={{ boxShadow: "0 0 0 0 hsl(var(--primary) / 0)" }}
                      animate={{
                        boxShadow: hoveredItem === item.id || currentIndex === index
                          ? "0 0 40px 0 hsl(var(--primary) / 0.4), inset 0 0 40px 0 hsl(var(--primary) / 0.1)"
                          : "0 0 0 0 hsl(var(--primary) / 0)"
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Progress indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {galleryItems.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => {
                  setCurrentIndex(index);
                  setIsAutoPlaying(false);
                }}
                className="w-2 h-2 rounded-full transition-colors"
                animate={{
                  backgroundColor: currentIndex === index 
                    ? "hsl(var(--primary))" 
                    : "hsl(var(--primary) / 0.3)"
                }}
                whileHover={{ scale: 1.2 }}
              />
            ))}
          </div>
        </div>

        {/* Bottom accent with glitch effect */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.8 }}
          className="mt-20 relative"
        >
          <div className="h-[1px] bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
          <motion.div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-[1px] bg-primary"
            animate={{
              opacity: [1, 0.5, 1],
              scaleX: [1, 1.2, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>

        {/* Gallery stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-center mt-12"
        >
          <div className="inline-flex items-center gap-6 px-6 py-3 bg-card/20 backdrop-blur-sm rounded-full border border-primary/20">
            <div className="text-center">
              <div className="font-display text-2xl font-bold text-primary">{galleryItems.length}</div>
              <div className="text-xs text-muted-foreground tracking-wide">MEMORIES</div>
            </div>
            <div className="w-[1px] h-8 bg-primary/30" />
            <div className="text-center">
              <div className="font-display text-2xl font-bold text-primary">∞</div>
              <div className="text-xs text-muted-foreground tracking-wide">MORE TO COME</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MemoriesGallery;