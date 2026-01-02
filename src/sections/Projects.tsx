import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'
import { useRef, useState } from 'react'
import MagneticButton from '../components/MagneticButton'
import ShuffleText from '../components/ShuffleText'

interface Project {
  title: string
  description: string
  tags: string[]
  link?: string
}

const projects: Project[] = [
  {
    title: "Project Alpha",
    description: "A cutting-edge web application built with modern technologies. Features smooth animations and premium UX.",
    tags: ["React", "TypeScript", "Framer Motion"],
  },
  {
    title: "Project Beta",
    description: "An immersive gaming experience platform. Combining technical excellence with creative vision.",
    tags: ["Next.js", "Three.js", "WebGL"],
  },
  {
    title: "Project Gamma",
    description: "A minimalist design system and component library. Built for scale and performance.",
    tags: ["Design System", "React", "Storybook"],
  },
  {
    title: "Project Delta",
    description: "A real-time collaboration tool with seamless interactions and beautiful interfaces.",
    tags: ["WebSocket", "React", "Node.js"],
  },
]

const Projects = () => {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0, 1], [200, -200])

  return (
    <section 
      id="projects" 
      ref={ref} 
      className="relative min-h-screen py-40 px-8 overflow-hidden"
    >
      {/* Background elements */}
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

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          className="mb-32"
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
            Portfolio
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
              Projects
            </ShuffleText>
          </motion.h2>
          <motion.div
            className="mt-8 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 1 }}
          />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10">
          {projects.map((project, index) => (
            <ProjectCard 
              key={index} 
              project={project} 
              index={index} 
              parallaxY={index % 2 === 0 ? y : undefined}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

interface ProjectCardProps {
  project: Project
  index: number
  parallaxY?: any
}

const ProjectCard = ({ project, index, parallaxY }: ProjectCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [7.5, -7.5]), { stiffness: 300, damping: 30 })
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-7.5, 7.5]), { stiffness: 300, damping: 30 })

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
      className="group relative overflow-hidden border border-white/10 bg-black/30 backdrop-blur-md"
      initial={{ opacity: 0, y: 120, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ delay: index * 0.15, duration: 1, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setIsHovered(true)}
      whileHover={{ scale: 1.02, zIndex: 10 }}
      style={{ 
        y: parallaxY,
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      data-hover
    >
      {/* Gradient overlay on hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.4 }}
      />

      {/* Animated border glow */}
      <motion.div
        className="absolute inset-0 border border-white/20"
        animate={{
          opacity: isHovered ? 0.6 : 0.2,
          borderColor: isHovered ? "rgba(255, 255, 255, 0.4)" : "rgba(255, 255, 255, 0.1)",
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Enhanced corner accents */}
      <motion.div
        className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-white/30"
        animate={{
          opacity: isHovered ? 1 : 0.3,
          scale: isHovered ? 1.2 : 1,
        }}
        transition={{ duration: 0.3 }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-white/30"
        animate={{
          opacity: isHovered ? 1 : 0.3,
          scale: isHovered ? 1.2 : 1,
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Content */}
      <div className="p-10 relative z-10" style={{ transform: 'translateZ(20px)' }}>
        <motion.div
          animate={{ x: isHovered ? 8 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.h3
            className="text-4xl font-black mb-6 tracking-tight"
            animate={{ 
              opacity: isHovered ? 1 : 0.9,
            }}
            transition={{ duration: 0.3 }}
          >
            <ShuffleText
              speed={55}
              characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*"
              direction="left-to-right"
            >
              {project.title}
            </ShuffleText>
          </motion.h3>
        </motion.div>
        
        <motion.p
          className="text-base opacity-70 mb-8 leading-relaxed"
          animate={{ opacity: isHovered ? 0.9 : 0.7 }}
          transition={{ duration: 0.3 }}
          dataText
        >
          {project.description}
        </motion.p>

        <div className="flex flex-wrap gap-3 mb-8">
          {project.tags.map((tag, tagIndex) => (
            <motion.span
              key={tag}
              className="px-4 py-2 text-xs font-medium border border-white/20 bg-white/5 backdrop-blur-sm"
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: tagIndex * 0.08 + index * 0.1 }}
              whileHover={{ 
                scale: 1.15, 
                borderColor: "rgba(255, 255, 255, 0.5)",
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                y: -2,
              }}
            >
              {tag}
            </motion.span>
          ))}
        </div>

        {project.link && (
          <motion.div
            animate={{ opacity: isHovered ? 1 : 0.8 }}
            transition={{ duration: 0.3 }}
          >
            <MagneticButton href={project.link} className="text-sm">
              View Project →
            </MagneticButton>
          </motion.div>
        )}
      </div>

      {/* Animated diagonal pattern */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              45deg,
              transparent,
              transparent 10px,
              rgba(255, 255, 255, 0.02) 10px,
              rgba(255, 255, 255, 0.02) 20px
            )
          `,
        }}
        animate={{
          backgroundPosition: isHovered ? ['0 0', '20px 20px'] : '0 0',
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Shimmer effect */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100"
        style={{
          background: 'linear-gradient(110deg, transparent 40%, rgba(255, 255, 255, 0.1) 50%, transparent 60%)',
        }}
        animate={{
          x: isHovered ? ['-100%', '200%'] : '-100%',
        }}
        transition={{
          duration: 1.5,
          repeat: isHovered ? Infinity : 0,
          repeatDelay: 2,
        }}
      />

      {/* Floating particles on hover */}
      {isHovered && (
        <>
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              initial={{
                x: '50%',
                y: '50%',
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
                duration: 2,
                delay: i * 0.2,
                repeat: Infinity,
                repeatDelay: 3,
              }}
            />
          ))}
        </>
      )}
    </motion.div>
  )
}

export default Projects
