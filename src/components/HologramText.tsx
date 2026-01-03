import { motion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useState, useRef, useMemo } from 'react'

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
    const handleResize = () => checkMobile()
    window.addEventListener('resize', handleResize, { passive: true })
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Scroll-based transforms for 3D effect
  const opacity = scrollProgress
    ? useTransform(scrollProgress, [0, 0.4], [1, 0])
    : 1

  const scale = scrollProgress
    ? useTransform(scrollProgress, [0, 0.4], [1, 0.8])
    : 1

  const particleOpacity = scrollProgress
    ? useTransform(scrollProgress, [0, 0.4], [1, 0])
    : 1

  const rotateX = scrollProgress
    ? useTransform(scrollProgress, [0, 0.4], [0, -5])
    : 0

  // Reduced particle count
  const particleCount = useMemo(() => isMobile ? 8 : 15, [isMobile])
  const depthLayers = useMemo(() => isMobile ? 2 : 3, [isMobile])

  return (
    <div 
      ref={containerRef}
      className={`relative inline-block ${className}`}
      style={{
        perspective: '1000px',
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Projection Emitter/Base - Simplified */}
      {mounted && (
        <motion.div
          className={`absolute left-1/2 transform -translate-x-1/2 ${isMobile ? '-bottom-4 w-24 h-1' : '-bottom-8 w-40 h-2'}`}
          style={{
            background: 'linear-gradient(to top, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1), transparent)',
            filter: isMobile ? 'blur(6px)' : 'blur(10px)',
            opacity: particleOpacity,
            borderRadius: '50%',
            willChange: 'opacity',
          }}
          animate={{
            opacity: [0.12, 0.18, 0.12],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      )}

      {/* 3D Hologram Container */}
      <motion.div
        className="relative"
        style={{
          opacity,
          scale,
          rotateX,
          transformStyle: 'preserve-3d',
          willChange: 'transform',
        }}
      >
        {/* Reduced depth layers for performance */}
        {[...Array(depthLayers)].map((_, layerIndex) => {
          const depth = isMobile 
            ? (layerIndex - 0.5) * 2
            : (layerIndex - 1) * 3
          const layerOpacity = 1 - Math.abs(depth) * 0.2
          
          return (
            <div
              key={layerIndex}
              className="absolute inset-0 pointer-events-none"
              style={{
                transform: `translateZ(${depth}px)`,
                opacity: layerOpacity * 0.25,
                filter: `blur(${Math.abs(depth) * 0.3}px)`,
                willChange: 'transform',
              }}
            >
              <div
                style={{
                  textShadow: `0 0 ${2 + Math.abs(depth)}px rgba(255, 255, 255, 0.3)`,
                }}
              >
                {children}
              </div>
            </div>
          )
        })}

        {/* Main hologram text */}
        <motion.div
          className="relative z-10"
          style={{
            textShadow: `
              0 0 10px rgba(255, 255, 255, 0.4),
              0 0 20px rgba(255, 255, 255, 0.2),
              0 0 30px rgba(255, 255, 255, 0.1)
            `,
            willChange: 'filter',
          }}
          animate={mounted ? {
            opacity: [0.95, 1, 0.97, 1],
          } : {}}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {children}
        </motion.div>

        {/* Simplified scan lines */}
        {mounted && (
          <motion.div
            className="absolute inset-0 pointer-events-none overflow-hidden"
            style={{
              background: 'repeating-linear-gradient(0deg, transparent, transparent 4px, rgba(255, 255, 255, 0.02) 4px, rgba(255, 255, 255, 0.02) 8px)',
              mixBlendMode: 'screen',
              willChange: 'transform',
            }}
            animate={{
              y: [0, 100, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        )}

        {/* Reduced particle field */}
        {mounted && (
          <div className="absolute inset-0 overflow-visible pointer-events-none" style={{ bottom: '-20px' }}>
            {Array.from({ length: particleCount }).map((_, i) => {
              const delay = i * 0.15
              const duration = 3 + Math.random() * 1
              const startX = 45 + Math.random() * 10
              const endY = -25 - Math.random() * 10
              const driftX = (Math.random() - 0.5) * 6
              
              return (
                <motion.div
                  key={i}
                  className="absolute w-0.5 h-0.5 bg-white rounded-full"
                  style={{
                    left: `${startX}%`,
                    bottom: '0%',
                    opacity: particleOpacity,
                    willChange: 'transform',
                  }}
                  animate={{
                    opacity: [0, 0.5, 0.3, 0],
                    scale: [0, 1.2, 0.8, 0],
                    y: [0, endY * 20, endY * 30, endY * 40],
                    x: [0, driftX, driftX * 1.5],
                  }}
                  transition={{
                    duration,
                    delay,
                    repeat: Infinity,
                    repeatDelay: 3 + Math.random() * 2,
                    ease: "easeOut",
                  }}
                />
              )
            })}
          </div>
        )}
      </motion.div>
    </div>
  )
}

export default HologramText
