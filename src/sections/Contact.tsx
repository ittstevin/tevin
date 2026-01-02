import { motion } from 'framer-motion'
import MagneticButton from '../components/MagneticButton'
import { SiGithub, SiTwitter, SiLinkedin, SiDiscord } from 'react-icons/si'

const Contact = () => {
  const socialLinks = [
    { name: 'GitHub', icon: SiGithub, href: 'https://github.com' },
    { name: 'Twitter', icon: SiTwitter, href: 'https://twitter.com' },
    { name: 'LinkedIn', icon: SiLinkedin, href: 'https://linkedin.com' },
    { name: 'Discord', icon: SiDiscord, href: 'https://discord.com' },
  ]

  return (
    <section id="contact" className="relative min-h-screen flex items-center justify-center py-32 px-8">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <motion.span
            className="text-sm font-medium tracking-[0.3em] uppercase opacity-60"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.6 }}
            viewport={{ once: true }}
          >
            Let's Connect
          </motion.span>
          <motion.h2
            className="text-6xl md:text-8xl font-black mt-4 mb-8 tracking-tight"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Get In Touch
          </motion.h2>
          <motion.p
            className="text-xl md:text-2xl font-light opacity-80 mb-16 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 0.8, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            Have a project in mind? Want to collaborate? Or just want to chat about code and games?
            I'm always open to new opportunities and conversations.
          </motion.p>
        </motion.div>

        <motion.div
          className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          <MagneticButton href="mailto:hello@tnesh.dev">
            Send Email
          </MagneticButton>
          <MagneticButton href="#projects">
            View Work
          </MagneticButton>
        </motion.div>

        {/* Social Links */}
        <motion.div
          className="flex justify-center items-center gap-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
        >
          {socialLinks.map((social, index) => {
            const Icon = social.icon
            return (
              <motion.a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 border border-white/20 hover:border-white/40 transition-colors duration-300 group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.9 + index * 0.1 }}
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.95 }}
                data-hover
              >
                <Icon className="w-6 h-6 opacity-70 group-hover:opacity-100 transition-opacity" />
              </motion.a>
            )
          })}
        </motion.div>

        {/* Footer */}
        <motion.div
          className="mt-32 pt-8 border-t border-white/10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.2 }}
        >
          <motion.p
            className="text-sm opacity-40"
            animate={{ opacity: [0.4, 0.6, 0.4] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            © 2024 TNESH • Built with passion and precision
          </motion.p>
        </motion.div>
      </div>

      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/2 left-1/4 w-64 h-64 border border-white/5 rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.05, 0.1, 0.05],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-48 h-48 border border-white/5 rounded-full"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.05, 0.08, 0.05],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>
    </section>
  )
}

export default Contact

