import { motion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useState, useRef } from 'react'
import MagneticButton from '../components/MagneticButton'
import ShuffleText from '../components/ShuffleText'
import HologramText from '../components/HologramText'

const Hero = () => {
  const [mounted, setMounted] = useState(false)
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95])

  useEffect(() => {
    setMounted(true)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  const text = "Developer • Gamer • Creator"
  const [displayedText, setDisplayedText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(text.slice(0, currentIndex + 1))
        setCurrentIndex(currentIndex + 1)
      }, 80)
      return () => clearTimeout(timeout)
    }
  }, [currentIndex, text])

  return (
    <section 
      id="hero" 
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Enhanced animated background elements with depth */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Large orbiting circle */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] border border-white/8 rounded-full blur-[1px]"
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.08, 0.15, 0.08],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{ y }}
        />
        
        {/* Medium circle */}
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] border border-white/6 rounded-full blur-[0.5px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.06, 0.12, 0.06],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, 50]) }}
        />
        
        {/* Small accent circle */}
        <motion.div
          className="absolute top-1/2 right-1/3 w-[200px] h-[200px] border border-white/10 rounded-full"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.2, 0.1],
            rotate: [0, -180, -360],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Animated lines */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"
            style={{
              top: `${20 + i * 30}%`,
              left: '10%',
              width: '80%',
            }}
            animate={{
              opacity: [0.05, 0.15, 0.05],
              scaleX: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      {/* Enhanced grid pattern with parallax */}
      <motion.div 
        className="absolute inset-0 opacity-[0.02]"
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, 20]) }}
      >
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
      </motion.div>

      {/* Main content with parallax */}
      <motion.div
        className="relative z-10 text-center px-8 max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate={mounted ? "visible" : "hidden"}
        style={{ y, opacity, scale }}
      >
        {/* Welcome text with enhanced animation */}
        <motion.div
          variants={itemVariants}
          className="mb-8"
        >
          <motion.span
            className="inline-block text-xs md:text-sm font-medium tracking-[0.4em] uppercase mb-12 opacity-50"
            initial={{ opacity: 0, y: 30, letterSpacing: '0.2em' }}
            animate={{ opacity: 0.5, y: 0, letterSpacing: '0.4em' }}
            transition={{ delay: 0.4, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            Welcome to
          </motion.span>
        </motion.div>

        {/* Main title with layered effect */}
        <motion.h1
          variants={itemVariants}
          className="text-8xl md:text-[12rem] font-black mb-12 tracking-[-0.02em] leading-[0.9] relative"
        >
          {/* Glow effect behind text */}
          <motion.span
            className="absolute inset-0 blur-3xl opacity-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 3, repeat: Infinity }}
            style={{
              background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)',
            }}
          />
          
          <motion.div
            className="block relative z-10"
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <HologramText scrollProgress={scrollYProgress}>
              <ShuffleText
                speed={50}
                characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*"
                direction="left-to-right"
              >
                TNESH
              </ShuffleText>
            </HologramText>
          </motion.div>
          
          {/* Decorative underline */}
          <motion.div
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-1 bg-white"
            initial={{ width: 0 }}
            animate={{ width: '60%' }}
            transition={{ delay: 1.2, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          />
        </motion.h1>

        {/* Typing text with enhanced styling */}
        <motion.div
          variants={itemVariants}
          className="mb-16"
        >
          <motion.p
            className="text-xl md:text-3xl font-light tracking-wide leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 1 }}
            dataText
          >
            <span className="opacity-90">{displayedText}</span>
            <motion.span
              className="inline-block w-0.5 h-8 bg-white ml-2 align-middle"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          </motion.p>
        </motion.div>

        {/* Buttons with staggered entrance */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-6 sm:gap-8 justify-center items-center px-4"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 0.8 }}
            className="w-full sm:w-auto"
          >
            <MagneticButton href="#projects" variant="primary" className="w-full sm:w-auto text-center">
              View Work
            </MagneticButton>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 0.8 }}
            className="w-full sm:w-auto"
          >
            <MagneticButton href="#contact" variant="secondary" className="w-full sm:w-auto text-center">
              Get In Touch
            </MagneticButton>
          </motion.div>
        </motion.div>

        {/* Enhanced scroll indicator */}
        <motion.div
          className="absolute bottom-16 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5, duration: 1 }}
        >
          <motion.div
            className="flex flex-col items-center gap-3"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <motion.span 
              className="text-[10px] font-medium tracking-[0.3em] uppercase opacity-30"
              animate={{ opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Scroll
            </motion.span>
            <motion.div className="relative">
              <motion.div
                className="w-px h-16 bg-gradient-to-b from-white/60 to-transparent"
                animate={{ scaleY: [1, 0.3, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
              {/* Pulsing dot */}
              <motion.div
                className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-white rounded-full"
                animate={{ 
                  y: [0, 64, 0],
                  opacity: [1, 0, 1],
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Floating accent dots */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full opacity-20"
          style={{
            top: `${20 + i * 15}%`,
            left: `${10 + i * 20}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.1, 0.3, 0.1],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.3,
            ease: "easeInOut",
          }}
        />
      ))}
    </section>
  )
}

export default Hero
