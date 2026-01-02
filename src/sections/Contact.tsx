import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import MagneticButton from '../components/MagneticButton'
import ShuffleText from '../components/ShuffleText'
import { SiGithub, SiTwitter, SiLinkedin, SiDiscord } from 'react-icons/si'

const Contact = () => {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0, 1], [100, -100])

  const socialLinks = [
    { name: 'GitHub', icon: SiGithub, href: 'https://github.com' },
    { name: 'Twitter', icon: SiTwitter, href: 'https://twitter.com' },
    { name: 'LinkedIn', icon: SiLinkedin, href: 'https://linkedin.com' },
    { name: 'Discord', icon: SiDiscord, href: 'https://discord.com' },
  ]

  return (
    <section 
      id="contact" 
      ref={ref}
      className="relative min-h-screen flex items-center justify-center py-40 px-8 overflow-hidden"
    >
      {/* Enhanced background elements */}
      <motion.div
        className="absolute inset-0 opacity-[0.02]"
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, 30]) }}
      >
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px',
          }}
        />
      </motion.div>

      <div className="max-w-5xl mx-auto text-center relative z-10">
        <motion.div
          style={{ opacity }}
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
            Let's Connect
          </motion.span>
          <motion.h2
            className="text-7xl md:text-9xl font-black mt-4 mb-12 tracking-tight leading-none"
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
              Get In Touch
            </ShuffleText>
          </motion.h2>
          
          {/* Decorative line */}
          <motion.div
            className="h-px bg-gradient-to-r from-transparent via-white/30 to-transparent max-w-2xl mx-auto mb-16"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 1 }}
          />
          
          <motion.p
            className="text-xl md:text-3xl font-light opacity-80 mb-20 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 0.8, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            dataText
          >
            Have a project in mind? Want to collaborate? Or just want to chat about code and games?
            I'm always open to new opportunities and conversations.
          </motion.p>
        </motion.div>

        {/* Enhanced buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-6 sm:gap-8 justify-center items-center mb-16 sm:mb-24 px-4"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.9 }}
            className="w-full sm:w-auto"
          >
            <MagneticButton href="mailto:hello@tnesh.dev" variant="primary" className="w-full sm:w-auto text-center">
              Send Email
            </MagneticButton>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 1 }}
            className="w-full sm:w-auto"
          >
            <MagneticButton href="#projects" variant="secondary" className="w-full sm:w-auto text-center">
              View Work
            </MagneticButton>
          </motion.div>
        </motion.div>

        {/* Enhanced Social Links */}
        <motion.div
          className="flex justify-center items-center gap-6 flex-wrap"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.1 }}
        >
          {socialLinks.map((social, index) => {
            const Icon = social.icon
            return (
              <motion.a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="relative p-5 border border-white/15 bg-black/20 backdrop-blur-sm hover:bg-black/30 transition-all duration-500 group overflow-hidden"
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 1.2 + index * 0.1, duration: 0.6 }}
                whileHover={{ 
                  scale: 1.15, 
                  y: -8,
                  borderColor: "rgba(255, 255, 255, 0.4)",
                }}
                whileTap={{ scale: 0.95 }}
                dataLink
              >
                {/* Hover glow */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: 'radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, transparent 70%)',
                  }}
                />
                
                {/* Corner accents */}
                <motion.div
                  className="absolute top-2 left-2 w-3 h-3 border-t border-l border-white/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
                <motion.div
                  className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-white/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
                
                <Icon className="w-7 h-7 opacity-70 group-hover:opacity-100 transition-opacity relative z-10" />
                
                {/* Tooltip on hover */}
                <motion.span
                  className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap"
                  initial={{ y: 5 }}
                  whileHover={{ y: 0 }}
                >
                  {social.name}
                </motion.span>
              </motion.a>
            )
          })}
        </motion.div>

        {/* Enhanced Footer */}
        <motion.div
          className="mt-40 pt-12 border-t border-white/10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.5 }}
        >
          <motion.p
            className="text-sm opacity-40 font-light tracking-wide"
            animate={{ opacity: [0.4, 0.6, 0.4] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            © 2024 TNESH • Built with passion and precision
          </motion.p>
          
          {/* Floating accent */}
          <motion.div
            className="mt-6 flex justify-center gap-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1.6 }}
          >
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="w-1 h-1 bg-white rounded-full opacity-30"
                animate={{
                  y: [0, -8, 0],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: "easeInOut",
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Enhanced background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/2 left-1/4 w-80 h-80 border border-white/5 rounded-full blur-[1px]"
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.05, 0.12, 0.05],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{ y }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-64 h-64 border border-white/5 rounded-full blur-[0.5px]"
          animate={{
            scale: [1, 1.25, 1],
            opacity: [0.05, 0.1, 0.05],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, -50]) }}
        />
        
        {/* Floating lines */}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-px bg-gradient-to-r from-transparent via-white/5 to-transparent"
            style={{
              top: `${20 + i * 20}%`,
              left: '10%',
              width: '80%',
            }}
            animate={{
              opacity: [0.03, 0.1, 0.03],
              scaleX: [0.9, 1.1, 0.9],
            }}
            transition={{
              duration: 5 + i,
              repeat: Infinity,
              delay: i * 0.8,
            }}
          />
        ))}
      </div>
    </section>
  )
}

export default Contact
