import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import ShuffleText from '../components/ShuffleText'

const About = () => {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [150, -150])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.98])

  return (
    <section 
      id="about" 
      ref={ref} 
      className="relative min-h-screen flex items-center justify-center py-40 px-8 overflow-hidden"
    >
      {/* Background depth layers */}
      <motion.div
        className="absolute inset-0 opacity-5"
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, -50]) }}
      >
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
          }}
        />
      </motion.div>

      {/* Floating geometric shapes */}
      <motion.div
        className="absolute top-20 right-20 w-32 h-32 border border-white/5 rotate-45"
        animate={{
          rotate: [45, 225, 45],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, 100]) }}
      />
      <motion.div
        className="absolute bottom-20 left-20 w-24 h-24 border border-white/5"
        animate={{
          rotate: [0, 360],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, -100]) }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          style={{ opacity, scale }}
          className="relative"
        >
          {/* Section header with enhanced animation */}
          <motion.div
            className="mb-24"
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.span
              className="text-xs md:text-sm font-medium tracking-[0.4em] uppercase opacity-50 block mb-6"
              initial={{ opacity: 0, letterSpacing: '0.2em' }}
              whileInView={{ opacity: 0.5, letterSpacing: '0.4em' }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              About
            </motion.span>
            <motion.h2
              className="text-7xl md:text-9xl font-black mt-4 tracking-tight leading-none"
              initial={{ opacity: 0, x: -80 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
              <ShuffleText
                speed={50}
                characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*"
                direction="left-to-right"
              >
                Tevin
              </ShuffleText>
            </motion.h2>
            
            {/* Decorative line */}
            <motion.div
              className="mt-8 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 1 }}
            />
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-start">
            {/* Left column - text */}
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              <motion.p
                className="text-lg md:text-2xl font-light leading-relaxed mb-8 opacity-90"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 0.9, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                dataText
              >
                Developer by day, gamer by night. I craft digital experiences that blend
                technical excellence with creative vision.
              </motion.p>
              <motion.p
                className="text-lg md:text-2xl font-light leading-relaxed opacity-90"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 0.9, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                dataText
              >
                When I'm not coding, you'll find me exploring virtual worlds, pushing pixels,
                and chasing that perfect balance between form and function.
              </motion.p>
            </motion.div>

            {/* Right column - floating cards */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              {/* Card 1 */}
              <motion.div
                className="relative border border-white/15 p-8 backdrop-blur-sm bg-black/20 group hover:bg-black/30 transition-all duration-500"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                whileHover={{ 
                  scale: 1.02, 
                  borderColor: "rgba(255, 255, 255, 0.3)",
                  y: -5,
                }}
                style={{ y }}
              >
                {/* Animated corner accents */}
                <motion.div
                  className="absolute top-0 left-0 w-6 h-6 border-t border-l border-white/40"
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                <motion.div
                  className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-white/40"
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                />
                
                {/* Content */}
                <h3 className="text-2xl font-bold mb-3 group-hover:opacity-100 opacity-90 transition-opacity">
                  Code & Create
                </h3>
                <p className="text-sm opacity-70 leading-relaxed group-hover:opacity-90 transition-opacity">
                  Building modern web experiences with cutting-edge technologies.
                </p>
                
                {/* Hover glow effect */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: 'radial-gradient(circle at center, rgba(255,255,255,0.05) 0%, transparent 70%)',
                  }}
                />
              </motion.div>

              {/* Card 2 */}
              <motion.div
                className="relative border border-white/15 p-8 backdrop-blur-sm bg-black/20 group hover:bg-black/30 transition-all duration-500"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7 }}
                whileHover={{ 
                  scale: 1.02, 
                  borderColor: "rgba(255, 255, 255, 0.3)",
                  y: -5,
                }}
                style={{ y: useTransform(scrollYProgress, [0, 1], [100, -100]) }}
              >
                <motion.div
                  className="absolute top-0 left-0 w-6 h-6 border-t border-l border-white/40"
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 0.3 }}
                />
                <motion.div
                  className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-white/40"
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 0.8 }}
                />
                <h3 className="text-2xl font-bold mb-3 group-hover:opacity-100 opacity-90 transition-opacity">
                  Game & Explore
                </h3>
                <p className="text-sm opacity-70 leading-relaxed group-hover:opacity-90 transition-opacity">
                  Passionate about gaming culture and interactive experiences.
                </p>
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: 'radial-gradient(circle at center, rgba(255,255,255,0.05) 0%, transparent 70%)',
                  }}
                />
              </motion.div>
            </motion.div>
          </div>

          {/* Enhanced animated separator */}
          <motion.div
            className="mt-32 flex items-center gap-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.9 }}
          >
            <motion.div
              className="h-px bg-white/20 flex-1"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 1 }}
            />
            <motion.div
              className="w-3 h-3 bg-white rounded-full relative"
              animate={{ 
                scale: [1, 1.3, 1], 
                opacity: [0.4, 0.8, 0.4] 
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <motion.div
                className="absolute inset-0 bg-white rounded-full"
                animate={{ scale: [1, 2, 1], opacity: [0.3, 0, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
            <motion.div
              className="h-px bg-white/20 flex-1"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 1 }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default About
