import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

type CursorType = 'default' | 'hover' | 'text' | 'link' | 'image' | 'button'

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [cursorType, setCursorType] = useState<CursorType>('default')
  const [isClicking, setIsClicking] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Check if device is mobile/touch
    const checkMobile = () => {
      setIsMobile(window.matchMedia('(hover: none) and (pointer: coarse)').matches)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    // Don't show custom cursor on mobile
    if (isMobile) return

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
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

    window.addEventListener('mousemove', updateMousePosition)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)
    window.addEventListener('mouseover', handleMouseOver)

    return () => {
      window.removeEventListener('mousemove', updateMousePosition)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      window.removeEventListener('mouseover', handleMouseOver)
      window.removeEventListener('resize', checkMobile)
    }
  }, [isMobile])

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
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
          scale: getCursorScale(),
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 28,
          mass: 0.5,
        }}
        style={{
          boxShadow: '0 0 10px rgba(255, 255, 255, 0.5)',
        }}
      />

      {/* Enhanced cursor ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border border-white rounded-full pointer-events-none z-[9999] mix-blend-difference"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          scale: getRingScale(),
          opacity: getRingOpacity(),
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 30,
          mass: 0.8,
        }}
      />

      {/* Multiple trailing dots for smoother effect */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="fixed top-0 left-0 w-1 h-1 bg-white rounded-full pointer-events-none z-[9998] mix-blend-difference"
          animate={{
            x: mousePosition.x - 2,
            y: mousePosition.y - 2,
          }}
          transition={{
            type: 'spring',
            stiffness: 200 - i * 30,
            damping: 20 - i * 3,
            mass: 1 + i * 0.3,
          }}
          style={{
            opacity: 0.6 - i * 0.2,
          }}
        />
      ))}

      {/* Cursor label for special states */}
      {cursorType !== 'default' && (
        <motion.div
          className="fixed pointer-events-none z-[10001] mix-blend-difference"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            x: mousePosition.x + 20,
            y: mousePosition.y + 20,
            opacity: 1,
            scale: 1,
          }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        >
          <span className="text-xs font-medium uppercase tracking-wider opacity-60">
            {cursorType}
          </span>
        </motion.div>
      )}
    </>
  )
}

export default CustomCursor

