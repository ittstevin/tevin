import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

interface ShuffleTextProps {
  children: string
  className?: string
  speed?: number // Shuffle speed in ms per frame
  characters?: string // Characters to use for shuffling
  direction?: 'left-to-right' | 'right-to-left'
}

const ShuffleText = ({
  children,
  className = '',
  speed = 40,
  characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*',
  direction = 'left-to-right',
}: ShuffleTextProps) => {
  const [displayText, setDisplayText] = useState(children)
  const [isHovered, setIsHovered] = useState(false)
  const animationFrameRef = useRef<number | null>(null)
  const originalText = useRef(children)
  const startTimeRef = useRef<number | null>(null)

  const getRandomChar = () => {
    return characters[Math.floor(Math.random() * characters.length)]
  }

  const shuffle = () => {
    const text = originalText.current
    const length = text.length
    const duration = 1200 // Total animation duration in ms (slower for more noticeable effect)
    startTimeRef.current = Date.now()

    const animate = () => {
      if (!startTimeRef.current) return
      
      const elapsed = Date.now() - startTimeRef.current
      const progress = Math.min(elapsed / duration, 1)

      if (progress >= 1) {
        setDisplayText(text)
        setIsHovered(false)
        startTimeRef.current = null
        return
      }

      // Easing function for smooth animation
      const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)
      const easedProgress = easeOutCubic(progress)

      const newText = text.split('').map((char, index) => {
        if (char === ' ') return ' ' // Preserve spaces

        if (direction === 'left-to-right') {
          // Calculate when this character should start and end shuffling
          const charStart = index / length
          const charEnd = (index + 1) / length
          
          if (easedProgress < charStart) {
            // Not reached this character yet - show original
            return char
          } else if (easedProgress >= charEnd) {
            // This character is resolved - show original
            return char
          } else {
            // This character is being shuffled
            const charProgress = (easedProgress - charStart) / (charEnd - charStart)
            // More intense shuffling in the middle, resolve at the end
            if (charProgress < 0.75) {
              // Still shuffling - show random char
              return getRandomChar()
            } else {
              // Resolving - show original with some randomness for smooth transition
              return Math.random() > (charProgress - 0.75) * 4 ? getRandomChar() : char
            }
          }
        } else {
          // Right to left
          const charStart = (length - index - 1) / length
          const charEnd = (length - index) / length
          
          if (easedProgress < charStart) {
            return char
          } else if (easedProgress >= charEnd) {
            return char
          } else {
            const charProgress = (easedProgress - charStart) / (charEnd - charStart)
            if (charProgress < 0.75) {
              return getRandomChar()
            } else {
              return Math.random() > (charProgress - 0.75) * 4 ? getRandomChar() : char
            }
          }
        }
      }).join('')

      setDisplayText(newText)
      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animate()
  }

  const handleMouseEnter = () => {
    if (isHovered || startTimeRef.current !== null) return
    setIsHovered(true)
    shuffle()
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    if (animationFrameRef.current !== null) {
      cancelAnimationFrame(animationFrameRef.current)
      animationFrameRef.current = null
    }
    startTimeRef.current = null
    // Smoothly reset to original
    setDisplayText(originalText.current)
  }

  useEffect(() => {
    originalText.current = children
    if (!isHovered && startTimeRef.current === null) {
      setDisplayText(children)
    }
  }, [children, isHovered])

  useEffect(() => {
    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [])

  return (
    <motion.span
      className={`inline-block ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ 
        display: 'inline-block',
        fontVariantNumeric: 'normal',
        fontFeatureSettings: 'normal',
        letterSpacing: 'inherit',
      }}
      dataText
    >
      {displayText}
    </motion.span>
  )
}

export default ShuffleText
