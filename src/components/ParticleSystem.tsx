import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  duration: number;
  delay: number;
}

const ParticleSystem = () => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const generateParticles = () => {
      const newParticles: Particle[] = [];
      
      // Reduced to 20 particles for better performance
      for (let i = 0; i < 20; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
          y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
          size: Math.random() * 2 + 1,
          opacity: Math.random() * 0.3 + 0.1,
          duration: Math.random() * 15 + 10,
          delay: Math.random() * 5,
        });
      }
      
      setParticles(newParticles);
    };

    generateParticles();
    
    const handleResize = () => {
      generateParticles();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-5 overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-primary/20"
          style={{
            width: particle.size,
            height: particle.size,
            left: particle.x,
            top: particle.y,
            opacity: particle.opacity,
          }}
          animate={{
            y: [particle.y, particle.y - 100, particle.y],
            x: [
              particle.x,
              particle.x + Math.sin(particle.id) * 30,
              particle.x,
            ],
            opacity: [0, particle.opacity, 0],
            scale: [0.5, 1, 0.5],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
      
      {/* Reduced data streams */}
      {Array.from({ length: 2 }).map((_, i) => (
        <motion.div
          key={`stream-${i}`}
          className="absolute h-[1px] bg-gradient-to-r from-transparent via-primary/40 to-transparent"
          style={{
            top: `${30 + i * 40}%`,
            width: "150px",
          }}
          animate={{
            x: [-150, (typeof window !== 'undefined' ? window.innerWidth : 1200) + 150],
          }}
          transition={{
            duration: 10,
            delay: i * 5,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

export default ParticleSystem;