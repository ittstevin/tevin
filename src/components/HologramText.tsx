import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'

interface HologramTextProps {
  children: React.ReactNode
  className?: string
  scrollProgress?: any
}

const HologramText = ({ children, className = '', scrollProgress }: HologramTextProps) => {
  const [mounted, setMounted] = useState(false)
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Particle count - fixed for consistent effect
  const particleCount = 40

  // Generate particles
  const particles = Array.from({ length: particleCount }, (_, i) => ({
    id: i,
    initialX: Math.random() * 100,
    initialY: Math.random() * 100,
    delay: Math.random() * 0.8,
    duration: 1.2 + Math.random() * 0.5,
  }))

  // Scroll-based opacity and particle dispersion
  const opacity = scrollProgress
    ? useTransform(scrollProgress, [0, 0.3], [1, 0])
    : 1

  const particleOpacity = scrollProgress
    ? useTransform(scrollProgress, [0, 0.3], [1, 0])
    : 1

  const particleY = scrollProgress
    ? useTransform(scrollProgress, [0, 0.3], [0, -50])
    : 0

  const particleScale = scrollProgress
    ? useTransform(scrollProgress, [0, 0.3], [1, 0.3])
    : 1

  return (
    <div ref={textRef} className={`relative inline-block ${className}`}>
      {/* Background particles layer */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-0.5 h-0.5 bg-white rounded-full"
            style={{
              left: `${particle.initialX}%`,
              top: `${particle.initialY}%`,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={mounted ? {
              opacity: [0, 0.4, 0.2, 0.4],
              scale: [0, 1.5, 1, 1.2],
            } : {}}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              repeatDelay: 2 + Math.random() * 3,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Main text with hologram effects */}
      <motion.div
        className="relative"
        style={{ opacity }}
      >
        {/* Scan lines overlay */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.03) 4px)',
          }}
          animate={{
            y: [0, 100, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Flicker effect */}
        <motion.div
          className="absolute inset-0 pointer-events-none bg-white"
          animate={{
            opacity: [0, 0, 0.02, 0, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatDelay: 2,
          }}
        />

        {/* Text with glow */}
        <motion.div
          className="relative z-10"
          style={{
            textShadow: `
              0 0 8px rgba(255, 255, 255, 0.25),
              0 0 16px rgba(255, 255, 255, 0.15),
              0 0 24px rgba(255, 255, 255, 0.08)
            `,
          }}
          animate={mounted ? {
            opacity: [0.92, 1, 0.96, 1],
            filter: [
              'brightness(1)',
              'brightness(1.08)',
              'brightness(0.97)',
              'brightness(1)',
            ],
          } : {}}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {children}
        </motion.div>

        {/* Particle drift effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {particles.slice(0, Math.floor(particleCount / 4)).map((particle) => (
            <motion.div
              key={`drift-${particle.id}`}
              className="absolute w-0.5 h-0.5 bg-white rounded-full"
              style={{
                left: `${particle.initialX}%`,
                top: `${particle.initialY}%`,
              }}
              animate={mounted ? {
                x: [0, (Math.random() - 0.5) * 20],
                y: [0, (Math.random() - 0.5) * 20],
                opacity: [0.2, 0.4, 0.2],
              } : {}}
              transition={{
                duration: 4 + Math.random() * 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        {/* Light noise texture */}
        <motion.div
          className="absolute inset-0 pointer-events-none opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.4'/%3E%3C/svg%3E")`,
            mixBlendMode: 'screen',
          }}
          animate={{
            opacity: [0.05, 0.15, 0.05],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>

      {/* Dissolve particles on scroll */}
      {scrollProgress && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {particles.map((particle) => (
            <motion.div
              key={`dissolve-${particle.id}`}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: `${particle.initialX}%`,
                top: `${particle.initialY}%`,
                opacity: particleOpacity,
                y: particleY,
                scale: particleScale,
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default HologramText

