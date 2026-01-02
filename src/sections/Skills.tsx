import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'
import { useRef, useState } from 'react'
import { 
  SiReact, 
  SiTypescript, 
  SiJavascript, 
  SiNodedotjs, 
  SiPython,
  SiGit,
  SiFigma,
  SiNextdotjs,
  SiTailwindcss,
  SiFramer
} from 'react-icons/si'
import ShuffleText from '../components/ShuffleText'

interface Skill {
  name: string
  icon: React.ComponentType<{ className?: string }>
  level: number
}

const skills: Skill[] = [
  { name: 'React', icon: SiReact, level: 95 },
  { name: 'TypeScript', icon: SiTypescript, level: 90 },
  { name: 'JavaScript', icon: SiJavascript, level: 92 },
  { name: 'Node.js', icon: SiNodedotjs, level: 85 },
  { name: 'Python', icon: SiPython, level: 80 },
  { name: 'Next.js', icon: SiNextdotjs, level: 88 },
  { name: 'Tailwind CSS', icon: SiTailwindcss, level: 90 },
  { name: 'Framer Motion', icon: SiFramer, level: 85 },
  { name: 'Git', icon: SiGit, level: 88 },
  { name: 'Figma', icon: SiFigma, level: 75 },
]

const Skills = () => {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0, 1], [100, -100])

  return (
    <section 
      id="skills" 
      ref={ref} 
      className="relative min-h-screen py-40 px-8 overflow-hidden"
    >
      {/* Background pattern */}
      <motion.div
        className="absolute inset-0 opacity-[0.02]"
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, 40]) }}
      >
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '120px 120px',
          }}
        />
      </motion.div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          className="mb-32 text-center"
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
            Expertise
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
              Skills & Stack
            </ShuffleText>
          </motion.h2>
          <motion.div
            className="mt-8 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent mx-auto max-w-2xl"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 1 }}
          />
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {skills.map((skill, index) => (
            <SkillCard 
              key={skill.name} 
              skill={skill} 
              index={index}
              parallaxY={index % 3 === 0 ? y : undefined}
            />
          ))}
        </div>

        {/* Enhanced additional info */}
        <motion.div
          className="mt-40 text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 1 }}
        >
          <motion.p
            className="text-lg md:text-xl opacity-60 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 0.6, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.9 }}
            dataText
          >
            Continuously learning and exploring new technologies to build better experiences.
            Always pushing the boundaries of what's possible.
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}

interface SkillCardProps {
  skill: Skill
  index: number
  parallaxY?: any
}

const SkillCard = ({ skill, index, parallaxY }: SkillCardProps) => {
  const Icon = skill.icon
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [5, -5]), { stiffness: 300, damping: 30 })
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-5, 5]), { stiffness: 300, damping: 30 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const distanceX = (e.clientX - centerX) / (rect.width / 2)
    const distanceY = (e.clientY - centerY) / (rect.height / 2)
    
    x.set(distanceX)
    y.set(distanceY)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
    setIsHovered(false)
  }

  return (
    <motion.div
      ref={cardRef}
      className="group relative flex flex-col items-center justify-center p-8 border border-white/10 bg-black/20 backdrop-blur-md hover:bg-black/30 transition-all duration-500"
      initial={{ opacity: 0, scale: 0.85, y: 60, rotateX: -15 }}
      whileInView={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.08, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setIsHovered(true)}
      whileHover={{ scale: 1.08, zIndex: 10 }}
      style={{ 
        y: parallaxY,
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      data-hover
    >
      {/* Glow effect on hover */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: 'radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, transparent 70%)',
          filter: 'blur(10px)',
        }}
      />

      {/* Enhanced border */}
      <motion.div
        className="absolute inset-0 border border-white/15"
        animate={{
          borderColor: isHovered ? "rgba(255, 255, 255, 0.4)" : "rgba(255, 255, 255, 0.1)",
          opacity: isHovered ? 1 : 0.6,
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Corner accents */}
      <motion.div
        className="absolute top-2 left-2 w-4 h-4 border-t border-l border-white/40"
        animate={{
          opacity: isHovered ? 1 : 0.3,
          scale: isHovered ? 1.3 : 1,
        }}
        transition={{ duration: 0.3 }}
      />
      <motion.div
        className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-white/40"
        animate={{
          opacity: isHovered ? 1 : 0.3,
          scale: isHovered ? 1.3 : 1,
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Icon with enhanced animation */}
      <motion.div
        className="relative mb-6"
        animate={{
          scale: isHovered ? 1.25 : 1,
          rotate: isHovered ? [0, -8, 8, -8, 0] : 0,
          y: isHovered ? -8 : 0,
        }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <Icon className="w-14 h-14 opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Icon glow */}
        <motion.div
          className="absolute inset-0 blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-300"
          style={{
            background: 'radial-gradient(circle, rgba(255,255,255,0.5) 0%, transparent 70%)',
          }}
        />
      </motion.div>

      {/* Skill name */}
      <motion.span
        className="text-sm font-medium opacity-70 group-hover:opacity-100 transition-opacity duration-300 text-center"
        animate={{
          y: isHovered ? -4 : 0,
        }}
        transition={{ duration: 0.3 }}
      >
        {skill.name}
      </motion.span>

      {/* Enhanced progress indicator */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 overflow-hidden"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.08 + 0.4, duration: 1 }}
      >
        <motion.div
          className="h-full bg-gradient-to-r from-white/60 to-white"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: skill.level / 100 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.08 + 0.6, duration: 1.2, ease: "easeOut" }}
          style={{ transformOrigin: "left" }}
        >
          {/* Shimmer effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent"
            animate={{
              x: ['-100%', '200%'],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 3,
              ease: "linear",
            }}
          />
        </motion.div>
      </motion.div>

      {/* Enhanced floating particles on hover */}
      {isHovered && (
        <>
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 bg-white rounded-full"
              initial={{
                x: "50%",
                y: "50%",
                opacity: 1,
                scale: 0,
              }}
              animate={{
                x: `${50 + (Math.random() - 0.5) * 120}%`,
                y: `${50 + (Math.random() - 0.5) * 120}%`,
                opacity: [1, 0],
                scale: [0, 1.5, 0],
              }}
              transition={{
                duration: 1.5,
                delay: i * 0.15,
                repeat: Infinity,
                repeatDelay: 2.5,
                ease: "easeOut",
              }}
            />
          ))}
        </>
      )}

      {/* Level indicator badge on hover */}
      <motion.div
        className="absolute -top-3 -right-3 px-2 py-1 bg-white/10 backdrop-blur-sm border border-white/20 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        initial={{ scale: 0, rotate: -180 }}
        animate={{
          scale: isHovered ? 1 : 0,
          rotate: isHovered ? 0 : -180,
        }}
        transition={{ duration: 0.4, ease: "backOut" }}
      >
        {skill.level}%
      </motion.div>
    </motion.div>
  )
}

export default Skills
