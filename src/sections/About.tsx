import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

const About = () => {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])

  return (
    <section id="about" ref={ref} className="relative min-h-screen flex items-center justify-center py-32 px-8">
      <div className="max-w-5xl mx-auto">
        <motion.div
          style={{ y, opacity }}
          className="relative"
        >
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.span
              className="text-sm font-medium tracking-[0.3em] uppercase opacity-60"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.6 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              About
            </motion.span>
            <motion.h2
              className="text-6xl md:text-8xl font-black mt-4 tracking-tight"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Tevin
            </motion.h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <motion.p
                className="text-lg md:text-xl font-light leading-relaxed mb-6 opacity-90"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.9 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
              >
                Developer by day, gamer by night. I craft digital experiences that blend
                technical excellence with creative vision.
              </motion.p>
              <motion.p
                className="text-lg md:text-xl font-light leading-relaxed opacity-90"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.9 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
              >
                When I'm not coding, you'll find me exploring virtual worlds, pushing pixels,
                and chasing that perfect balance between form and function.
              </motion.p>
            </motion.div>

            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              {/* Floating elements */}
              <motion.div
                className="relative border border-white/20 p-6 backdrop-blur-sm"
                whileHover={{ scale: 1.02, borderColor: "rgba(255, 255, 255, 0.4)" }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="absolute -top-2 -left-2 w-4 h-4 border-t border-l border-white"
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <h3 className="text-xl font-semibold mb-2">Code & Create</h3>
                <p className="text-sm opacity-70 leading-relaxed">
                  Building modern web experiences with cutting-edge technologies.
                </p>
              </motion.div>

              <motion.div
                className="relative border border-white/20 p-6 backdrop-blur-sm"
                whileHover={{ scale: 1.02, borderColor: "rgba(255, 255, 255, 0.4)" }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="absolute -top-2 -left-2 w-4 h-4 border-t border-l border-white"
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                />
                <h3 className="text-xl font-semibold mb-2">Game & Explore</h3>
                <p className="text-sm opacity-70 leading-relaxed">
                  Passionate about gaming culture and interactive experiences.
                </p>
              </motion.div>
            </motion.div>
          </div>

          {/* Animated separator */}
          <motion.div
            className="mt-24 flex items-center gap-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
          >
            <motion.div
              className="h-px bg-white flex-1"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.9 }}
            />
            <motion.div
              className="w-2 h-2 bg-white rounded-full"
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.div
              className="h-px bg-white flex-1"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.9 }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default About

