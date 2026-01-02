import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface AmbientTechTextProps {
  text: string
  delay?: number
  position?: { top?: string; bottom?: string; left?: string; right?: string }
}

const AmbientTechText = ({ text, delay = 0, position }: AmbientTechTextProps) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, delay)
    return () => clearTimeout(timer)
  }, [delay])

  // Random animation variants
  const variants = [
    {
      opacity: [0.02, 0.08, 0.02],
      y: [0, -5, 0],
    },
    {
      opacity: [0.03, 0.06, 0.03],
      x: [0, 3, 0],
    },
    {
      opacity: [0.02, 0.05, 0.02],
    },
  ]

  const randomVariant = variants[Math.floor(Math.random() * variants.length)]

  return (
    <motion.div
      className="absolute text-[9px] md:text-[10px] font-mono opacity-0"
      style={{
        top: position?.top,
        bottom: position?.bottom,
        left: position?.left,
        right: position?.right,
        color: 'rgba(255, 255, 255, 0.12)',
        textShadow: '0 0 1px rgba(255, 255, 255, 0.08)',
        letterSpacing: '0.12em',
        fontWeight: 300,
      }}
      initial={{ opacity: 0 }}
      animate={isVisible ? {
        ...randomVariant,
        opacity: randomVariant.opacity || [0.015, 0.05, 0.015],
      } : { opacity: 0 }}
      transition={{
        duration: 10 + Math.random() * 6,
        repeat: Infinity,
        ease: "easeInOut",
        delay: Math.random() * 3,
      }}
    >
      // {text}
    </motion.div>
  )
}

const AmbientTechElements = () => {
  const techTexts = [
    'INITIALIZING SYSTEM',
    'LOADING INTERFACE',
    'NEW FILES DETECTED',
    'DATABASE SYNCED',
    'SIGNAL STABLE',
    'RENDER PIPELINE READY',
    'USER ONLINE',
    'ACCESS GRANTED',
    'SYSTEM OPTIMAL',
    'CONNECTION SECURE',
  ]

  // Random positions for each text - more scattered
  const positions = techTexts.map((_, i) => ({
    top: `${8 + (i * 9.5) % 82}%`,
    left: `${3 + (i * 13.7) % 88}%`,
  }))

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {techTexts.map((text, index) => (
        <AmbientTechText
          key={text}
          text={text}
          delay={index * 500}
          position={positions[index]}
        />
      ))}
    </div>
  )
}

export default AmbientTechElements

