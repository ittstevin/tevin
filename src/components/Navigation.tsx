import { motion, useScroll, useTransform } from 'framer-motion'
import { useState, useEffect } from 'react'
import ShuffleText from './ShuffleText'

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false)
  const { scrollYProgress } = useScroll()

  const navBgOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 0.9])
  const navBlur = useTransform(scrollYProgress, [0, 0.1], [0, 12])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: 'Home', href: '#hero' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Contact', href: '#contact' },
  ]

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Background with dynamic opacity and blur */}
      <motion.div
        className="absolute inset-0 bg-black border-b border-white/10"
        style={{
          opacity: navBgOpacity,
          backdropFilter: `blur(${navBlur}px)`,
          WebkitBackdropFilter: `blur(${navBlur}px)`,
        }}
      />
      
      {/* Subtle gradient overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent pointer-events-none"
        style={{ opacity: navBgOpacity }}
      />

      <div className="relative max-w-7xl mx-auto px-8 py-6 flex items-center justify-between">
        <motion.a
          href="#hero"
          className="text-2xl font-black tracking-tight relative group"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          dataLink
        >
          <span className="relative z-10">
            <ShuffleText
              speed={45}
              characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*"
              direction="left-to-right"
            >
              TNESH
            </ShuffleText>
          </span>
          {/* Hover underline */}
          <motion.span
            className="absolute bottom-0 left-0 h-0.5 bg-white"
            initial={{ width: 0 }}
            whileHover={{ width: '100%' }}
            transition={{ duration: 0.3 }}
          />
        </motion.a>

        <div className="hidden md:flex items-center gap-8 lg:gap-10">
          {navItems.map((item, index) => (
            <motion.a
              key={item.name}
              href={item.href}
              className="text-sm font-medium relative group py-2"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 + 0.4, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -3 }}
              dataLink
            >
              <span className="relative z-10">{item.name}</span>
              
              {/* Animated underline */}
              <motion.span
                className="absolute bottom-0 left-0 h-px bg-white"
                initial={{ width: 0 }}
                whileHover={{ width: '100%' }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              />
              
              {/* Hover glow effect */}
              <motion.span
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: 'radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, transparent 70%)',
                  filter: 'blur(8px)',
                }}
              />
            </motion.a>
          ))}
        </div>

        {/* Mobile menu button (optional) */}
        <motion.button
          className="md:hidden w-8 h-8 flex flex-col justify-center gap-1.5"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Menu"
        >
          <motion.span className="w-full h-0.5 bg-white" />
          <motion.span className="w-full h-0.5 bg-white" />
          <motion.span className="w-full h-0.5 bg-white" />
        </motion.button>
      </div>

      {/* Bottom border accent */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
        style={{ opacity: navBgOpacity }}
      />
    </motion.nav>
  )
}

export default Navigation
