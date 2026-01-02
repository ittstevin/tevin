import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState } from 'react'
import MagneticButton from '../components/MagneticButton'

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

  const y = useTransform(scrollYProgress, [0, 1], [150, -150])

  return (
    <section id="projects" ref={ref} className="relative min-h-screen py-32 px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="mb-24"
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
            Portfolio
          </motion.span>
          <motion.h2
            className="text-6xl md:text-8xl font-black mt-4 tracking-tight"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Projects
          </motion.h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} y={y} />
          ))}
        </div>
      </div>
    </section>
  )
}

interface ProjectCardProps {
  project: Project
  index: number
  y: any
}

const ProjectCard = ({ project, index, y }: ProjectCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      ref={cardRef}
      className="group relative overflow-hidden border border-white/10 bg-black/50 backdrop-blur-sm"
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ delay: index * 0.1, duration: 0.8 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.02 }}
      style={{ y: index % 2 === 0 ? y : undefined }}
    >
      {/* Hover overlay */}
      <motion.div
        className="absolute inset-0 bg-white/5"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* Corner accents */}
      <motion.div
        className="absolute top-0 left-0 w-8 h-8 border-t border-l border-white/20"
        animate={{
          opacity: isHovered ? 0.6 : 0.2,
        }}
        transition={{ duration: 0.3 }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-white/20"
        animate={{
          opacity: isHovered ? 0.6 : 0.2,
        }}
        transition={{ duration: 0.3 }}
      />

      <div className="p-8 relative z-10">
        <motion.h3
          className="text-3xl font-bold mb-4"
          animate={{ x: isHovered ? 5 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {project.title}
        </motion.h3>
        <motion.p
          className="text-base opacity-70 mb-6 leading-relaxed"
          animate={{ opacity: isHovered ? 0.9 : 0.7 }}
          transition={{ duration: 0.3 }}
        >
          {project.description}
        </motion.p>

        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.map((tag, tagIndex) => (
            <motion.span
              key={tag}
              className="px-3 py-1 text-xs border border-white/20 bg-white/5"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: tagIndex * 0.05 }}
              whileHover={{ scale: 1.1, borderColor: "rgba(255, 255, 255, 0.4)" }}
            >
              {tag}
            </motion.span>
          ))}
        </div>

        {project.link && (
          <MagneticButton href={project.link} className="text-sm">
            View Project →
          </MagneticButton>
        )}
      </div>

      {/* Animated background pattern */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          backgroundImage: `
            linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.02) 50%, transparent 70%),
            linear-gradient(-45deg, transparent 30%, rgba(255, 255, 255, 0.02) 50%, transparent 70%)
          `,
          backgroundSize: '20px 20px',
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
    </motion.div>
  )
}

export default Projects

