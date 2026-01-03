import { motion } from 'framer-motion'
import { useEffect, useState, useMemo } from 'react'

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

  const variant = useMemo(() => {
    const variants = [
      { opacity: [0.015, 0.05, 0.015] },
      { opacity: [0.02, 0.04, 0.02] },
    ]
    return variants[Math.floor(Math.random() * variants.length)]
  }, [])

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
        willChange: 'opacity',
      }}
      initial={{ opacity: 0 }}
      animate={isVisible ? variant : { opacity: 0 }}
      transition={{
        duration: 12,
        repeat: Infinity,
        ease: "easeInOut",
        delay: Math.random() * 2,
      }}
    >
      // {text}
    </motion.div>
  )
}

const AmbientTechElements = () => {
  const techTexts = useMemo(() => [
    'INITIALIZING SYSTEM',
    'LOADING INTERFACE',
    'NEW FILES DETECTED',
    'DATABASE SYNCED',
    'SIGNAL STABLE',
    'RENDER PIPELINE READY',
  ], [])

  const positions = useMemo(() => techTexts.map((_, i) => ({
    top: `${10 + (i * 15) % 75}%`,
    left: `${5 + (i * 18) % 85}%`,
  })), [techTexts])

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {techTexts.map((text, index) => (
        <AmbientTechText
          key={text}
          text={text}
          delay={index * 800}
          position={positions[index]}
        />
      ))}
    </div>
  )
}

export default AmbientTechElements
