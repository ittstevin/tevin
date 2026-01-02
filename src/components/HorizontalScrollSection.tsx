import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

interface HorizontalScrollSectionProps {
  children: React.ReactNode
  className?: string
}

const HorizontalScrollSection = ({ children, className = '' }: HorizontalScrollSectionProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [scrollWidth, setScrollWidth] = useState(0)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  useEffect(() => {
    const updateDimensions = () => {
      if (contentRef.current && containerRef.current) {
        const contentWidth = contentRef.current.scrollWidth
        const containerWidth = containerRef.current.clientWidth
        const scrollDistance = contentWidth - containerWidth
        setScrollWidth(Math.max(0, scrollDistance))
      }
    }

    // Initial update
    updateDimensions()

    // Multiple updates to ensure content is rendered
    const timeouts = [
      setTimeout(updateDimensions, 100),
      setTimeout(updateDimensions, 300),
      setTimeout(updateDimensions, 500),
    ]
    
    window.addEventListener('resize', updateDimensions)
    
    // Also update when images/content loads
    window.addEventListener('load', updateDimensions)
    
    return () => {
      timeouts.forEach(clearTimeout)
      window.removeEventListener('resize', updateDimensions)
      window.removeEventListener('load', updateDimensions)
    }
  }, [children])

  // Smooth spring animation for horizontal movement
  const rawX = useTransform(scrollYProgress, [0, 1], [0, -scrollWidth])
  const x = useSpring(rawX, {
    stiffness: 150,
    damping: 30,
    mass: 0.5,
  })

  return (
    <div 
      ref={containerRef}
      className={`relative w-full ${className}`}
      style={{ 
        height: '400vh', // Very tall to force horizontal scroll
      }}
    >
      {/* Sticky container that locks content in view */}
      <div 
        className="sticky top-0 h-screen flex items-center overflow-hidden"
        style={{
          willChange: 'transform',
        }}
      >
        <motion.div
          ref={contentRef}
          className="flex items-center"
          style={{
            x,
            willChange: 'transform',
          }}
        >
          {children}
        </motion.div>
      </div>
    </div>
  )
}

export default HorizontalScrollSection
