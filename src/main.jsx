import React, { useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { ArrowRight, ArrowUpRight, Github, Instagram, Linkedin, X } from 'lucide-react'
import { posts, projects } from './data/content'
import './styles.css'

const sections = [
  { id: 'home', label: 'Home', number: '01' },
  { id: 'projects', label: 'Projects', number: '02' },
  { id: 'blog', label: 'Blog', number: '03' },
]

function PageNavigator({ activeSection, onNavigate }) {
  return (
    <nav className="page-navigator" aria-label="Site pages">
      {sections.map((section, index) => (
        <button
          className={activeSection === index ? 'page-marker active' : 'page-marker'}
          key={section.id}
          onClick={() => onNavigate(index)}
          aria-label={`Open page ${section.number}: ${section.label}`}
        >
          <span>{section.number}</span>
          <i>{section.label}</i>
        </button>
      ))}
    </nav>
  )
}

function HomeSection({ onNext }) {
  const messageRef = useRef(null)

  useEffect(() => {
    const message = messageRef.current
    const section = message?.parentElement
    if (!message || !section) return undefined

    let animationFrame
    let lastTime = performance.now()
    let x = 0
    let y = 0
    let velocityX = 0.11
    let velocityY = 0.075

    const animate = (time) => {
      const elapsed = Math.min(32, time - lastTime)
      lastTime = time
      const maxX = Math.max(0, section.clientWidth - message.offsetWidth)
      const maxY = Math.max(0, section.clientHeight - message.offsetHeight)

      x += velocityX * elapsed
      y += velocityY * elapsed

      if (x <= 0 || x >= maxX) {
        x = Math.max(0, Math.min(maxX, x))
        velocityX *= -1
      }
      if (y <= 0 || y >= maxY) {
        y = Math.max(0, Math.min(maxY, y))
        velocityY *= -1
      }

      message.style.transform = `translate3d(${x}px, ${y}px, 0)`
      animationFrame = requestAnimationFrame(animate)
    }

    animationFrame = requestAnimationFrame(animate)
    const onResize = () => {
      x = Math.min(x, Math.max(0, section.clientWidth - message.offsetWidth))
      y = Math.min(y, Math.max(0, section.clientHeight - message.offsetHeight))
    }
    window.addEventListener('resize', onResize)
    return () => {
      cancelAnimationFrame(animationFrame)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <section className="horizontal-section home-section" id="home" aria-label="Home">
      <div className="home-content">
        <p className="section-kicker">/ 01. HOME</p>
        <h1>HUGO<br /><span>OLMO</span></h1>
        <div className="home-socials" aria-label="Social links">
          <a href="https://github.com/hugoolmo63" target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={18} /></a>
          <a href="https://www.linkedin.com/in/hugo-olmo-764874392?utm_source=share_via&utm_content=profile&utm_medium=member_android" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={18} /></a>
          <a href="https://www.instagram.com/hugoolmoo._/" target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram size={18} /></a>
        </div>
        <button className="home-next" onClick={onNext} aria-label="Go to projects"><ArrowRight size={20} /></button>
      </div>
      <div className="signal-message" ref={messageRef}>Student <i /> Builder</div>
    </section>
  )
}

function ProjectCard({ project, onOpen }) {
  return (
    <article className="project-card">
      <div className="card-topline"><span>{project.category}</span><span>{project.number}</span></div>
      <h3>{project.title}</h3>
      <p>{project.description}</p>
      <div className="tag-list">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
      <button className="card-action" onClick={() => onOpen(project, 'project')}>View project <ArrowUpRight size={15} /></button>
    </article>
  )
}

function ProjectsSection({ onOpen }) {
  return (
    <section className="horizontal-section content-section projects-section" id="projects" aria-label="Featured projects">
      <div className="section-heading">
        <p className="section-kicker">/ 02. FEATURED PROJECTS</p>
        <h2>Things I’ve<br /><em>built.</em></h2>
      </div>
      <div className="projects-grid">{projects.map((project) => <ProjectCard key={project.number} project={project} onOpen={onOpen} />)}</div>
    </section>
  )
}

function BlogSection({ onOpen }) {
  return (
    <section className="horizontal-section content-section blog-section" id="blog" aria-label="Posts and notes">
      <div className="section-heading">
        <p className="section-kicker">/ 03. POSTS &amp; NOTES</p>
        <h2>Notes from<br /><em>the margins.</em></h2>
      </div>
      <div className="posts-list">
        {posts.map((post) => (
          <button className="post-row" onClick={() => onOpen(post, 'post')} key={post.title}>
            <span className="post-date">{post.date}</span>
            <span className="post-title">{post.title}</span>
            <span className="post-category">{post.category}</span>
            <span className="post-time">{post.readTime}</span>
            <ArrowUpRight className="post-arrow" size={18} />
          </button>
        ))}
      </div>
    </section>
  )
}

function DetailModal({ item, type, onClose }) {
  if (!item) return null
  const isProject = type === 'project'
  return (
    <div className="modal-backdrop" role="presentation" onClick={onClose}>
      <section className="detail-modal" role="dialog" aria-modal="true" aria-label={item.title} onClick={(event) => event.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close"><X size={18} /></button>
        <p className="section-kicker">{isProject ? `/ ${item.category}` : `${item.date} / ${item.category}`}</p>
        <h2>{item.title}</h2>
        <p className="modal-copy">{isProject ? item.fullDescription : 'A short note about the process, decisions, and ideas behind this topic.'}</p>
        {isProject && <div className="tag-list">{item.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>}
        <div className="modal-actions">
          {isProject && <a href={item.link} target="_blank" rel="noreferrer">Open project <ArrowUpRight size={15} /></a>}
          <button onClick={onClose}>Close</button>
        </div>
      </section>
    </div>
  )
}

function App() {
  const scrollerRef = useRef(null)
  const activeSectionRef = useRef(0)
  const touchStartRef = useRef(null)
  const [activeSection, setActiveSection] = useState(0)
  const [selectedItem, setSelectedItem] = useState(null)
  const [selectedType, setSelectedType] = useState(null)

  const goToSection = (index) => {
    const scroller = scrollerRef.current
    if (!scroller) return
    scroller.scrollTo({ left: index * scroller.clientWidth, behavior: 'smooth' })
    activeSectionRef.current = index
    setActiveSection(index)
  }

  const onNavigate = (event, index) => {
    event?.preventDefault()
    goToSection(index)
  }

  const openDetail = (item, type) => {
    setSelectedItem(item)
    setSelectedType(type)
  }

  useEffect(() => {
    const scroller = scrollerRef.current
    if (!scroller) return undefined
    const onScroll = () => {
      const index = Math.min(sections.length - 1, Math.max(0, Math.round(scroller.scrollLeft / scroller.clientWidth)))
      activeSectionRef.current = index
      setActiveSection(index)
    }
    const onTouchStart = (event) => {
      const touch = event.touches[0]
      touchStartRef.current = { x: touch.clientX, y: touch.clientY }
    }
    const onTouchEnd = (event) => {
      if (!touchStartRef.current) return
      const touch = event.changedTouches[0]
      const distanceX = touch.clientX - touchStartRef.current.x
      const distanceY = touch.clientY - touchStartRef.current.y
      touchStartRef.current = null
      if (Math.abs(distanceX) < 110 || Math.abs(distanceX) < Math.abs(distanceY) * 1.25) return
      const direction = distanceX < 0 ? 1 : -1
      const nextIndex = Math.min(sections.length - 1, Math.max(0, activeSectionRef.current + direction))
      if (nextIndex !== activeSectionRef.current) goToSection(nextIndex)
    }
    scroller.addEventListener('scroll', onScroll, { passive: true })
    scroller.addEventListener('touchstart', onTouchStart, { passive: true })
    scroller.addEventListener('touchend', onTouchEnd, { passive: true })
    return () => {
      scroller.removeEventListener('scroll', onScroll)
      scroller.removeEventListener('touchstart', onTouchStart)
      scroller.removeEventListener('touchend', onTouchEnd)
    }
  }, [])

  return (
    <div className="app-shell">
      <main className="horizontal-scroller" ref={scrollerRef}>
        <HomeSection onNext={() => goToSection(1)} />
        <ProjectsSection onOpen={openDetail} />
        <BlogSection onOpen={openDetail} />
      </main>
      <PageNavigator activeSection={activeSection} onNavigate={goToSection} />
      <div className="scroll-hint">© 2026 <span>/</span> V 1.0</div>
      <DetailModal item={selectedItem} type={selectedType} onClose={() => setSelectedItem(null)} />
    </div>
  )
}

export default App

createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>)
