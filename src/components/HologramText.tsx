import { motion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useState, useRef } from 'react'

interface HologramTextProps {
  children: React.ReactNode
  className?: string
  scrollProgress?: any
}

const HologramText = ({ children, className = '', scrollProgress }: HologramTextProps) => {
  const [mounted, setMounted] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Scroll-based transforms for 3D effect
  const opacity = scrollProgress
    ? useTransform(scrollProgress, [0, 0.4], [1, 0])
    : 1

  const scale = scrollProgress
    ? useTransform(scrollProgress, [0, 0.4], [1, 0.8])
    : 1

  const particleY = scrollProgress
    ? useTransform(scrollProgress, [0, 0.4], [0, -100])
    : 0

  const particleOpacity = scrollProgress
    ? useTransform(scrollProgress, [0, 0.4], [1, 0])
    : 1

  const rotateX = scrollProgress
    ? useTransform(scrollProgress, [0, 0.4], [0, -5])
    : 0

  const particleScale = scrollProgress
    ? useTransform(scrollProgress, [0, 0.4], [1, 0.3])
    : 1

  return (
    <div 
      ref={containerRef}
      className={`relative inline-block ${className}`}
      style={{
        perspective: '1000px',
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Projection Emitter/Base - Responsive */}
      <motion.div
        className={`absolute left-1/2 transform -translate-x-1/2 ${isMobile ? '-bottom-4 w-24 h-1' : '-bottom-8 w-40 h-2'}`}
        style={{
          background: 'linear-gradient(to top, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1), transparent)',
          filter: isMobile ? 'blur(6px)' : 'blur(10px)',
          opacity: particleOpacity,
          borderRadius: '50%',
        }}
        initial={{ opacity: 0, scaleY: 0 }}
        animate={mounted ? {
          opacity: [0.12, 0.18, 0.12],
          scaleY: [0.7, 1, 0.7],
        } : {}}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Projection Beam - Responsive */}
      <motion.div
        className={`absolute left-1/2 transform -translate-x-1/2 origin-bottom pointer-events-none ${isMobile ? '-bottom-4 w-20' : '-bottom-8 w-32'} h-full`}
        style={{
          background: 'linear-gradient(to top, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05), transparent)',
          clipPath: 'polygon(50% 0%, 45% 100%, 55% 100%)',
          opacity: particleOpacity,
          filter: isMobile ? 'blur(1px)' : 'blur(2px)',
        }}
        initial={{ opacity: 0 }}
        animate={mounted ? {
          opacity: [0.06, 0.12, 0.06],
        } : {}}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* 3D Hologram Container */}
      <motion.div
        className="relative"
        style={{
          opacity,
          scale,
          rotateX,
          transformStyle: 'preserve-3d',
          transformPerspective: 1000,
        }}
      >
        {/* Depth layers for 3D effect - reduced on mobile */}
        {[...Array(isMobile ? 3 : 5)].map((_, layerIndex) => {
          const depth = isMobile 
            ? (layerIndex - 1) * 1.5 // -1.5, 0, 1.5 on mobile
            : (layerIndex - 2) * 2 // -4, -2, 0, 2, 4 on desktop
          const layerOpacity = 1 - Math.abs(depth) * 0.15
          
          return (
            <motion.div
              key={layerIndex}
              className="absolute inset-0"
              style={{
                transform: `translateZ(${depth}px)`,
                opacity: layerOpacity * 0.3,
                filter: `blur(${Math.abs(depth) * 0.5}px)`,
              }}
              animate={mounted ? {
                opacity: [
                  layerOpacity * 0.25,
                  layerOpacity * 0.35,
                  layerOpacity * 0.25,
                ],
                y: [0, depth * 0.3, 0],
              } : {}}
              transition={{
                duration: 4 + layerIndex * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: layerIndex * 0.2,
              }}
            >
              <div
                style={{
                  textShadow: `
                    0 0 ${2 + Math.abs(depth)}px rgba(255, 255, 255, 0.4),
                    0 0 ${4 + Math.abs(depth) * 2}px rgba(255, 255, 255, 0.2),
                    0 0 ${6 + Math.abs(depth) * 3}px rgba(255, 255, 255, 0.1)
                  `,
                }}
              >
                {children}
              </div>
            </motion.div>
          )
        })}

        {/* Main hologram text */}
        <motion.div
          className="relative z-10"
          style={{
            textShadow: `
              0 0 10px rgba(255, 255, 255, 0.5),
              0 0 20px rgba(255, 255, 255, 0.3),
              0 0 30px rgba(255, 255, 255, 0.15),
              0 0 40px rgba(255, 255, 255, 0.08)
            `,
            filter: 'brightness(1.1)',
          }}
          animate={mounted ? {
            opacity: [0.92, 1, 0.95, 1],
            filter: [
              'brightness(1.05)',
              'brightness(1.15)',
              'brightness(1)',
              'brightness(1.1)',
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

        {/* Scan lines overlay */}
        <motion.div
          className="absolute inset-0 pointer-events-none overflow-hidden"
          style={{
            background: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255, 255, 255, 0.03) 3px, rgba(255, 255, 255, 0.03) 6px)',
            mixBlendMode: 'screen',
          }}
          animate={mounted ? {
            y: [0, 100, 0],
          } : {}}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Holographic shimmer */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(110deg, transparent 40%, rgba(255, 255, 255, 0.1) 50%, transparent 60%)',
            mixBlendMode: 'screen',
          }}
          animate={mounted ? {
            x: ['-100%', '200%'],
            opacity: [0, 0.3, 0],
          } : {}}
          transition={{
            duration: 5,
            repeat: Infinity,
            repeatDelay: 3,
            ease: "easeInOut",
          }}
        />

        {/* Light noise texture */}
        <motion.div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.4'/%3E%3C/svg%3E")`,
            mixBlendMode: 'screen',
          }}
          animate={mounted ? {
            opacity: [0.15, 0.25, 0.15],
          } : {}}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Particle field - rising from emitter */}
        <div className="absolute inset-0 overflow-visible pointer-events-none" style={{ bottom: '-20px' }}>
          {Array.from({ length: isMobile ? 10 : 25 }).map((_, i) => {
            const delay = i * 0.12
            const duration = 2.5 + Math.random() * 1.5
            const startX = 45 + Math.random() * 10
            const endY = -30 - Math.random() * 15
            const driftX = (Math.random() - 0.5) * 8
            
            return (
              <motion.div
                key={i}
                className="absolute w-0.5 h-0.5 bg-white rounded-full"
                style={{
                  left: `${startX}%`,
                  bottom: '0%',
                  opacity: particleOpacity,
                  filter: 'blur(0.5px)',
                }}
                initial={{ opacity: 0, scale: 0, y: 0, x: 0 }}
                animate={mounted ? {
                  opacity: [0, 0.7, 0.5, 0.3, 0],
                  scale: [0, 1.8, 1.2, 0.8, 0],
                  y: [0, endY * 15, endY * 25, endY * 35, endY * 50],
                  x: [0, driftX, driftX * 1.5, driftX * 2, driftX * 2.5],
                } : {}}
                transition={{
                  duration,
                  delay,
                  repeat: Infinity,
                  repeatDelay: 2 + Math.random() * 3,
                  ease: "easeOut",
                }}
              />
            )
          })}
        </div>

        {/* Dissolve particles on scroll */}
        {scrollProgress && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {Array.from({ length: isMobile ? 10 : 20 }).map((_, i) => {
              const angle = (i / 20) * Math.PI * 2
              const distance = 30 + Math.random() * 20
              
              return (
                <motion.div
                  key={`dissolve-${i}`}
                  className="absolute w-1 h-1 bg-white rounded-full"
                  style={{
                    left: '50%',
                    top: '50%',
                    opacity: particleOpacity,
                    y: particleY,
                    scale: particleScale,
                  }}
                  style={{
                    x: scrollProgress 
                      ? useTransform(scrollProgress, [0, 0.4], [0, Math.cos(angle) * distance])
                      : 0,
                    y: scrollProgress
                      ? useTransform(scrollProgress, [0, 0.4], [0, Math.sin(angle) * distance - 20])
                      : 0,
                    opacity: particleOpacity,
                    scale: particleScale,
                  }}
                  animate={mounted && !scrollProgress ? {
                    opacity: [0.8, 0.6, 0.8],
                    scale: [1, 1.1, 1],
                  } : {}}
                  transition={{
                    duration: 1.5,
                    delay: i * 0.05,
                    ease: "easeOut",
                  }}
                />
              )
            })}
          </div>
        )}
      </motion.div>

      {/* Volumetric depth indicator lines */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: particleOpacity,
        }}
      >
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-px bg-white"
            style={{
              left: `${20 + i * 30}%`,
              top: `${30 + i * 20}%`,
              width: `${10 + i * 5}%`,
              opacity: 0.1,
              transform: `rotateX(60deg) translateZ(${i * 5}px)`,
            }}
            animate={mounted ? {
              opacity: [0.05, 0.15, 0.05],
            } : {}}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          />
        ))}
      </motion.div>
    </div>
  )
}

export default HologramText
