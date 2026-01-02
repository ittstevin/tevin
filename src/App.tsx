import { useEffect } from 'react'
import CustomCursor from './components/CustomCursor'
import FloatingParticles from './components/FloatingParticles'
import Hero from './sections/Hero'
import About from './sections/About'
import Projects from './sections/Projects'
import Skills from './sections/Skills'
import Contact from './sections/Contact'
import Navigation from './components/Navigation'
import { smoothScrollTo } from './utils/smoothScroll'

function App() {
  useEffect(() => {
    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth'
    
    // Prevent default cursor
    document.body.style.cursor = 'none'
    
    // Enhanced smooth scroll for anchor links
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const anchor = target.closest('a[href^="#"]')
      if (anchor) {
        const href = anchor.getAttribute('href')
        if (href && href !== '#') {
          e.preventDefault()
          smoothScrollTo(href)
        }
      }
    }
    
    document.addEventListener('click', handleAnchorClick)
    
    return () => {
      document.body.style.cursor = 'auto'
      document.removeEventListener('click', handleAnchorClick)
    }
  }, [])

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      <div className="noise" />
      <FloatingParticles count={20} />
      <CustomCursor />
      <Navigation />
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Contact />
    </div>
  )
}

export default App

