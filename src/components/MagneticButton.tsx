import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useRef, useState } from 'react'

interface MagneticButtonProps {
  children: React.ReactNode
  className?: string
  href?: string
  onClick?: () => void
  variant?: 'primary' | 'secondary'
}

const MagneticButton = ({ children, className = '', href, onClick, variant = 'primary' }: MagneticButtonProps) => {
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  
  const springConfig = { stiffness: 300, damping: 30 }
  const mx = useSpring(x, springConfig)
  const my = useSpring(y, springConfig)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const distanceX = e.clientX - centerX
    const distanceY = e.clientY - centerY
    
    x.set(distanceX * 0.3)
    y.set(distanceY * 0.3)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
    setIsHovered(false)
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const baseClasses = 'relative inline-block px-10 py-5 border border-white/30 bg-transparent text-white font-medium transition-all duration-500 overflow-hidden group backdrop-blur-sm'
  const variantClasses = variant === 'primary' 
    ? 'hover:border-white hover:bg-white/5 glow' 
    : 'hover:border-white/50'

  const content = (
    <>
      {/* Animated background */}
      <motion.span
        className="absolute inset-0 bg-white"
        initial={{ scaleX: 0, scaleY: 0 }}
        animate={{
          scaleX: isHovered ? 1 : 0,
          scaleY: isHovered ? 1 : 0,
        }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformOrigin: 'center' }}
      />
      
      {/* Shimmer effect */}
      <motion.span
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        initial={{ x: '-100%' }}
        animate={{ x: isHovered ? '100%' : '-100%' }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
      />

      {/* Text content */}
      <motion.span
        className="relative z-10 flex items-center gap-2"
        animate={{
          color: isHovered ? '#000000' : '#ffffff',
        }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.span>

      {/* Corner accents */}
      <motion.div
        className="absolute top-0 left-0 w-4 h-4 border-t border-l border-white/50"
        animate={{
          opacity: isHovered ? 1 : 0.3,
          scale: isHovered ? 1.2 : 1,
        }}
        transition={{ duration: 0.3 }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-white/50"
        animate={{
          opacity: isHovered ? 1 : 0.3,
          scale: isHovered ? 1.2 : 1,
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Subtle glow on hover */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          boxShadow: 'inset 0 0 30px rgba(255, 255, 255, 0.1)',
        }}
      />
    </>
  )

  const motionProps = {
    ref: ref as any,
    className: `${baseClasses} ${variantClasses} ${className}`,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    onMouseEnter: handleMouseEnter,
    style: {
      x: mx,
      y: my,
    },
    whileHover: { scale: 1.02 },
    whileTap: { scale: 0.98 },
    transition: { type: 'spring', stiffness: 400, damping: 25 },
    dataButton: true,
  }

  if (href) {
    return (
      <motion.a
        {...motionProps}
        href={href}
      >
        {content}
      </motion.a>
    )
  }

  return (
    <motion.button
      {...motionProps}
      onClick={onClick}
    >
      {content}
    </motion.button>
  )
}

export default MagneticButton

