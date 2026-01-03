import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

type CursorType = 'default' | 'hover' | 'text' | 'link' | 'image' | 'button'

const CustomCursor = () => {
  const [cursorType, setCursorType] = useState<CursorType>('default')
  const [isClicking, setIsClicking] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Use motion values for smoother performance
  const cursorX = useMotionValue(0)
  const cursorY = useMotionValue(0)
  
  // High stiffness springs for very responsive cursor (almost instant but smooth)
  const springConfig = { stiffness: 2000, damping: 60, mass: 0.05 }
  const x = useSpring(cursorX, springConfig)
  const y = useSpring(cursorY, springConfig)

  // Ring position relative to cursor
  const ringX = useTransform(x, (val) => val - 16)
  const ringY = useTransform(y, (val) => val - 16)
  const dotX = useTransform(x, (val) => val - 4)
  const dotY = useTransform(y, (val) => val - 4)

  useEffect(() => {
    // Check if device is mobile/touch
    const checkMobile = () => {
      setIsMobile(window.matchMedia('(hover: none) and (pointer: coarse)').matches)
    }
    checkMobile()
    
    // Don't show custom cursor on mobile
    if (isMobile) return

    const updateMousePosition = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }

    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)

    // Advanced hover detection
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      
      if (target.tagName === 'BUTTON' || target.closest('button') || target.closest('[data-button]')) {
        setCursorType('button')
      } else if (target.tagName === 'A' || target.closest('a') || target.closest('[data-link]')) {
        setCursorType('link')
      } else if (target.tagName === 'IMG' || target.closest('img') || target.closest('[data-image]')) {
        setCursorType('image')
      } else if (target.tagName === 'P' || target.tagName === 'H1' || target.tagName === 'H2' || 
                 target.tagName === 'H3' || target.tagName === 'SPAN' || target.closest('[data-text]')) {
        setCursorType('text')
      } else if (target.closest('[data-hover]')) {
        setCursorType('hover')
      } else {
        setCursorType('default')
      }
    }

    window.addEventListener('mousemove', updateMousePosition, { passive: true })
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)
    window.addEventListener('mouseover', handleMouseOver)

    return () => {
      window.removeEventListener('mousemove', updateMousePosition)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      window.removeEventListener('mouseover', handleMouseOver)
    }
  }, [isMobile, cursorX, cursorY])

  // Don't render cursor on mobile
  if (isMobile) return null

  const getCursorScale = () => {
    if (isClicking) return 0.7
    switch (cursorType) {
      case 'button': return 1.8
      case 'link': return 1.6
      case 'image': return 1.4
      case 'text': return 1.2
      case 'hover': return 1.5
      default: return 1
    }
  }

  const getRingScale = () => {
    if (isClicking) return 0.85
    switch (cursorType) {
      case 'button': return 2.2
      case 'link': return 2.0
      case 'image': return 1.8
      case 'text': return 1.5
      case 'hover': return 1.8
      default: return 1
    }
  }

  const getRingOpacity = () => {
    switch (cursorType) {
      case 'button': return 0.8
      case 'link': return 0.7
      case 'image': return 0.6
      case 'text': return 0.5
      case 'hover': return 0.6
      default: return 0.3
    }
  }

  return (
    <>
      {/* Main cursor dot with glow */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[10000] mix-blend-difference"
        style={{
          x: dotX,
          y: dotY,
          scale: getCursorScale(),
          boxShadow: '0 0 10px rgba(255, 255, 255, 0.5)',
          willChange: 'transform',
        }}
        animate={{
          scale: getCursorScale(),
        }}
        transition={{
          type: 'spring',
          stiffness: 600,
          damping: 30,
        }}
      />

      {/* Enhanced cursor ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border border-white rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: ringX,
          y: ringY,
          scale: getRingScale(),
          opacity: getRingOpacity(),
          willChange: 'transform',
        }}
        animate={{
          scale: getRingScale(),
          opacity: getRingOpacity(),
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 30,
        }}
      />
    </>
  )
}

export default CustomCursor
