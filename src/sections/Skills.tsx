import { motion, useScroll, useTransform } from 'framer-motion'
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

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])

  return (
    <section id="skills" ref={ref} className="relative min-h-screen py-32 px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="mb-24 text-center"
          style={{ opacity }}
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
            Expertise
          </motion.span>
          <motion.h2
            className="text-6xl md:text-8xl font-black mt-4 tracking-tight"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Skills & Stack
          </motion.h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {skills.map((skill, index) => (
            <SkillCard key={skill.name} skill={skill} index={index} />
          ))}
        </div>

        {/* Additional info */}
        <motion.div
          className="mt-32 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <motion.p
            className="text-lg opacity-60 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 0.6, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
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
}

const SkillCard = ({ skill, index }: SkillCardProps) => {
  const Icon = skill.icon
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className="group relative flex flex-col items-center justify-center p-6 border border-white/10 bg-black/30 backdrop-blur-sm"
      initial={{ opacity: 0, scale: 0.8, y: 50 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.05, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.1, borderColor: "rgba(255, 255, 255, 0.3)" }}
    >
      {/* Animated border on hover */}
      <motion.div
        className="absolute inset-0 border border-white/20"
        animate={{
          opacity: isHovered ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
      />

      <motion.div
        animate={{
          scale: isHovered ? 1.2 : 1,
          rotate: isHovered ? [0, -5, 5, -5, 0] : 0,
        }}
        transition={{ duration: 0.3 }}
      >
        <Icon className="w-12 h-12 mb-4 opacity-80" />
      </motion.div>

      <motion.span
        className="text-sm font-medium opacity-70"
        animate={{
          opacity: isHovered ? 1 : 0.7,
        }}
        transition={{ duration: 0.3 }}
      >
        {skill.name}
      </motion.span>

      {/* Progress indicator */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/20 overflow-hidden"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.05 + 0.3, duration: 1 }}
      >
        <motion.div
          className="h-full bg-white"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: skill.level / 100 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.05 + 0.5, duration: 1, ease: "easeOut" }}
          style={{ transformOrigin: "left" }}
        />
      </motion.div>

      {/* Floating particles on hover */}
      {isHovered && (
        <>
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              initial={{
                x: "50%",
                y: "50%",
                opacity: 0.8,
                scale: 0,
              }}
              animate={{
                x: `${50 + (Math.random() - 0.5) * 100}%`,
                y: `${50 + (Math.random() - 0.5) * 100}%`,
                opacity: [0.8, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 1,
                delay: i * 0.1,
                repeat: Infinity,
                repeatDelay: 2,
              }}
            />
          ))}
        </>
      )}
    </motion.div>
  )
}

export default Skills

