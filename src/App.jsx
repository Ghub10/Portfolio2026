import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './App.css'
import AOS from 'aos'
import 'aos/dist/aos.css'
import logo from './assets/sirlogo2.png'
import uuLogo from './assets/UU-Logo-HRZ_RGB.png'
import ensignLogo from './assets/Ensign.png'
import dtcLogo from './assets/DTC.png'
import commercialFundingLogo from './assets/CommercialFunding.png'
import deerValleyLogo from './assets/DeerValley.png'
import discoverLogo from './assets/Discover.png'
import pcsdLogo from './assets/PCSD.png'
import uofuLogo from './assets/UofULogo.png'
import westernerLogo from './assets/Westerner.png'
import womenEliteLogo from './assets/women-elite.png'
import redstarLogo from './assets/redstar.png'
import mpowerULogo from './assets/MPowerU.png'
import murrayLogo from './assets/Murray.png'
import executiveMindsetLogo from './assets/ExecutiveMindset.png'
import slcJusticeLogo from './assets/SLC Justice.png'
import dexaBodyLogo from './assets/dexabody.png'
import dailedLogo from './assets/Dailed.png'
import zadeBalanceLogo from './assets/zadebalance.png'
import computer2Image from './assets/computer2 copy.png'
import computer1Image from './assets/computer1 copy.png'
import pricingImage from './assets/pricingimage copy.png'
import { useGalleryItems } from './hooks/useGalleryItems'
import { fallbackProjects, fallbackPhotos, fallbackVideos } from './data/galleryFallbacks'

const skillGroups = [
  {
    title: 'Web Development',
    skills: ['React', 'JavaScript', 'HTML', 'CSS/SCSS', 'Sass', 'Bootstrap', 'PHP', 'Advanced Custom Field', 'Responsive Design', 'AI'],
  },
  {
    title: 'Industrial Automation',
    skills: ['Allen-Bradley PLCs', 'Studio 5000', 'PLC Programming', 'FANUC Robots', 'HMI Design', 'Machine Vision', 'Industrial Networking'],
  },
]

function App() {
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)
  const [typewriterText, setTypewriterText] = useState('')
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const { items: projects } = useGalleryItems('project', fallbackProjects)
  const { items: photos } = useGalleryItems('photo', fallbackPhotos)
  const { items: videos } = useGalleryItems('video', fallbackVideos)
  const [projectLightbox, setProjectLightbox] = useState(null)

  const words = ['Designer', 'Creator', 'Innovator']

  useEffect(() => {
    // Start typing the first word on mount
    if (typewriterText === '' && !isDeleting) {
      setTypewriterText('D')
      return
    }
  }, [])

  useEffect(() => {
    const currentWord = words[currentWordIndex]
    
    if (!isDeleting && typewriterText === currentWord) {
      // Word is complete, wait 3 seconds then start deleting
      const timeout = setTimeout(() => {
        setIsDeleting(true)
      }, 3000)
      return () => clearTimeout(timeout)
    }

    if (isDeleting && typewriterText === '') {
      // Word is deleted, wait 2 seconds before moving to next word
      const timeout = setTimeout(() => {
        setIsDeleting(false)
        setCurrentWordIndex((prev) => (prev + 1) % words.length)
      }, 2000)
      return () => clearTimeout(timeout)
    }

    const typeSpeed = isDeleting ? 50 : 100
    const timeout = setTimeout(() => {
      if (isDeleting) {
        setTypewriterText((prev) => prev.substring(0, prev.length - 1))
      } else {
        setTypewriterText(currentWord.substring(0, typewriterText.length + 1))
      }
    }, typeSpeed)

    return () => clearTimeout(timeout)
  }, [typewriterText, isDeleting, currentWordIndex, words])

  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 2000,
      once: false,
      offset: 100,
      delay: 0,
      easing: 'ease-in-out',
      startEvent: 'DOMContentLoaded',
      disable: false,
    })
    
    // Refresh AOS after React has rendered all components
    const timer1 = setTimeout(() => {
      AOS.refresh()
    }, 500)
    
    // Also refresh on window load
    const handleLoad = () => {
      setTimeout(() => {
        AOS.refresh()
      }, 100)
    }
    
    window.addEventListener('load', handleLoad)
    
    return () => {
      clearTimeout(timer1)
      window.removeEventListener('load', handleLoad)
    }
  }, [])

  // Handle scroll to show/hide scroll to top button and parallax
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true)
      } else {
        setShowScrollTop(false)
      }

      // Subtle parallax effect for hero section background
      const heroSection = document.querySelector('.hero-section')
      if (heroSection) {
        const rect = heroSection.getBoundingClientRect()
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          const scrolled = window.pageYOffset
          const rate = scrolled * 0.1 // Subtle parallax
          heroSection.style.backgroundPosition = `center ${50 + rate}px`
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Loading animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setMenuOpen(false)
    }
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner">
          <div className="spinner-ring"></div>
          <div className="spinner-ring"></div>
          <div className="spinner-ring"></div>
        </div>
        <p className="loading-text">Loading Portfolio...</p>
      </div>
    )
  }

  return (
    <div className="app">
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="logo">
            <img src={logo} alt="Portfolio Logo" className="logo-img" />
          </div>
          <ul className="nav-menu">
            <li><a href="#home" onClick={() => scrollToSection('home')}>Home</a></li>
            <li><a href="#projects" onClick={() => scrollToSection('projects')}>Projects</a></li>
            <li><a href="#about" onClick={() => scrollToSection('about')}>About Me</a></li>
            <li><a href="#github" onClick={() => scrollToSection('github')}>Github</a></li>
            <li><a href="#contact" onClick={() => scrollToSection('contact')}>Contact Me</a></li>
          </ul>
          <div className="nav-right">
            <div className="nav-contact">
              <span className="phone-icon">📞</span>
              <span className="phone-number">1 385 515 2421</span>
            </div>
            <button 
              className="menu-toggle" 
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="mobile-menu">
            <a href="#home" onClick={() => scrollToSection('home')}>Home</a>
            <a href="#projects" onClick={() => scrollToSection('projects')}>Projects</a>
            <a href="#about" onClick={() => scrollToSection('about')}>About Me</a>
            <a href="#github" onClick={() => scrollToSection('github')}>Github</a>
            <a href="#contact" onClick={() => scrollToSection('contact')}>Contact Me</a>
          </div>
        )}
      </nav>

      {/* Home/Hero Section */}
      <section id="home" className="hero-section">
        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-text">
              <h2 className="hero-subtitle">Automation Technician & Web Developer</h2>
              <h1 className="hero-title">
                {typewriterText || 'Designer'}<span className="cursor-blink">|</span>
              </h1>
              <p className="hero-location">CDMX · SLC · Lisbon</p>
              <div className="hero-buttons">
                <button
                  className="btn-primary btn-view-works"
                  onClick={() => scrollToSection('projects')}
                >
                  View My Works
                </button>
                <a 
                  href="#contact" 
                  className="btn-link"
                  onClick={() => scrollToSection('contact')}
                >
                  Contact Me <span className="arrow">↘</span>
                </a>
              </div>
            </div>
            <div className="hero-image-container">
              <div className="hero-image-circle">
                <img 
                  src="/Images/hero-photo.jpg" 
                  alt="Portrait" 
                  className="hero-image"
                />
              </div>
              <p className="hero-name">Alejandro Abonnanzieri</p>
            </div>
          </div>
          <div className="scroll-indicator">
            <span>↓</span>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="projects-section">
        <div className="section-container">
          <div className="projects-cards-grid">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className={`project-card ${project.featured ? 'featured' : ''}`}
                style={{ animationDelay: `${index * 80}ms` }}
                data-aos="fade-up"
                data-aos-duration="1000"
              >
                {project.featured && <span className="featured-badge">Featured</span>}

                <img src={project.image_url} alt={project.title} className="project-card-img" />

                <div className="project-card-content">
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-description">{project.description}</p>

                  {project.role && (
                    <div className="project-meta">
                      <div className="meta-item">
                        <span className="meta-label">Role</span>
                        <span className="meta-value">{project.role}</span>
                      </div>
                      {project.result && (
                        <div className="meta-item">
                          <span className="meta-label">Result</span>
                          <span className="meta-value">{project.result}</span>
                        </div>
                      )}
                    </div>
                  )}

                  {project.technologies && project.technologies.length > 0 && (
                    <div className="project-technologies">
                      {project.technologies.map((tech, idx) => (
                        <span key={idx} className="tech-badge">{tech}</span>
                      ))}
                    </div>
                  )}

                  {project.links && project.links.some((link) => link.url) && (
                    <div className="project-links">
                      {project.links.filter((link) => link.url).map((link, idx) => (
                        <a
                          key={idx}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`project-link ${link.type}`}
                          aria-label={link.label}
                        >
                          {link.type === 'demo' && '↗ '}
                          {link.type === 'github' && '🐙 '}
                          {link.type === 'study' && '📄 '}
                          {link.type === 'site' && '↗ '}
                          {link.type === 'repo' && '🔒 '}
                          {link.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Videos in Horizontal Layout */}
          <div className="projects-videos-section">
            <div className="videos-grid">
              {videos.map((video) => (
                <div key={video.id} className="video-card">
                  <div className="video-thumbnail">
                    {video.image_url ? (
                      <img src={video.image_url} alt={video.title} />
                    ) : (
                      <div className="video-placeholder">
                        <span className="video-icon">🎬</span>
                      </div>
                    )}
                    <div className="video-overlay">
                      <a
                        href={`https://vimeo.com/${video.vimeo_id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="video-play-btn"
                        aria-label={`Watch ${video.title}`}
                      >
                        ▶
                      </a>
                    </div>
                  </div>
                  <p className="video-title">{video.title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About Me Section */}
      <section id="about" className="about-section">
        <div className="section-container">
          <h2 className="section-title" data-aos="fade-up" data-aos-duration="1000">About Me</h2>

          <div className="about-content">
            <div className="about-text">
              <p>
                My career has never followed a straight line, and I’ve come to see that as my advantage.
              </p>
              <p className="about-first-paragraph">
                <img
                  src={uuLogo}
                  alt="University of Utah Logo"
                  className="about-logo"
                />
                My career began in retirement finance at Discover, where I managed Roth IRA accounts and learned how much trust depends on accuracy. From there I moved to the Salt Lake City Justice Court as a Judicial Assistant. That’s where my marketing background and my curiosity came together: I took on my first development projects and started helping the communications team. I found I loved building things that made work run better.
              </p>
              <p className="about-first-paragraph">
                <img
                  src={ensignLogo}
                  alt="Ensign College Logo"
                  className="about-logo"
                />
                That pulled me toward creative work. I did photography and video editing with ComV Productions, and later directed the “News Break” show at the University of Utah. Then in 2017 I took a big leap and moved to Lisbon, Portugal, where I worked as a Senior Content Development Manager at Frederico Carvalho, a digital marketing agency. Living and working abroad taught me to adapt fast and to see problems from more than one angle.
              </p>
              <p>
                When I came back, I became Vice President at Red Star Transportation. There I wore every hat I had: marketing, finance, and web development. Running operations up close showed me how much a business depends on systems that just work. Later I launched my own web development company, Sirnetz.
              </p>
              <p className="about-first-paragraph">
                <img
                  src={dtcLogo}
                  alt="DTC Logo"
                  className="about-logo"
                />
                Eventually, all those threads led me to automation. I trained in Robotics and Automation Technology, programming Allen-Bradley PLCs in Studio 5000, operating FANUC robots, and learning servo systems, machine vision, networking, and HMI design. Writing code taught me logic. Leading a business taught me why efficiency and reliability matter. Automation is where the two come together.
              </p>
              <p>
                Today, I&apos;m training as an Automation Technician and building web tools, so I can help manufacturers run smarter, one system at a time.
              </p>
            </div>
          </div>

          {/* Photos in Horizontal Layout - Two Rows */}
          <div className="about-photos-horizontal">
            <div className="about-photos-grid">
              {photos.map((photo) => (
                <div key={photo.id} className="about-photo-surround">
                  <img src={photo.image_url} alt={photo.title} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Resume Summary Section */}
      <section id="resume" className="resume-section">
        <div className="section-container">
          <h2 className="section-title" data-aos="fade-up" data-aos-duration="1000">Professional Journey</h2>
          
          <div className="resume-content">
            {/* Education Column */}
            <div className="resume-column">
              <h3 className="resume-column-title">My Education</h3>
              <div className="timeline">
                <div className="timeline-item">
                  <div className="timeline-content">
                    <h4>Automated Manufacturing Certificate</h4>
                    <p className="timeline-meta">Expected April 2027</p>
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-content">
                    <h4>Robotics and Automation Technology</h4>
                    <p className="timeline-meta">Full-time student / 2026 – Present</p>
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-content">
                    <h4>Web & Graphic Design Certificate 2020 (900-Hour Program)</h4>
                    <p className="timeline-meta">Davis Technical College — Kaysville, UT / 2020</p>
                    <p className="timeline-description">
                      Completed a comprehensive 900-hour program in web and graphic design.
                    </p>
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-content">
                    <h4>Bachelors of Science in Communications With Emphasis in Business Technology</h4>
                    <p className="timeline-meta">University of Utah / 2012</p>
                    <p className="timeline-description">
                      Completed a comprehensive program focusing on business technology and communications strategies.
                    </p>
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-content">
                    <h4>Associates of Science in Integrated Studies in Accounting & Finance</h4>
                    <p className="timeline-meta">LDS Business College / 2010</p>
                    <p className="timeline-description">
                      Gained foundational knowledge in accounting principles and financial management.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Experience Column */}
            <div className="resume-column">
              <h3 className="resume-column-title">My Experience</h3>
              <div className="timeline">
                <div className="timeline-item">
                  <div className="timeline-content">
                    <h4>Transportation Director – Information Technology</h4>
                    <p className="timeline-meta">Park City School District – Park City, UT / 05/2025 – 10/2026</p>
                    <p className="timeline-description">
                      Led transportation operations and technology initiatives for the district.
                    </p>
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-content">
                    <h4>Vice President</h4>
                    <p className="timeline-meta">Red Star Transportation / 2017 - 2023</p>
                    <p className="timeline-description">
                      Successfully integrated multifaceted expertise as marketing director, financial strategist, and web developer.
                    </p>
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-content">
                    <h4>Director of "News Break" Show</h4>
                    <p className="timeline-meta">University of Utah / 2016 - 2017</p>
                    <p className="timeline-description">
                      Directed the prestigious "News Break" show, showcasing leadership in media production.
                    </p>
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-content">
                    <h4>Judicial Assistant</h4>
                    <p className="timeline-meta">Salt Lake City Justice Court / 2014 - 2016</p>
                    <p className="timeline-description">
                      Leveraged educational background in media marketing to spearhead development projects and contribute to communications team.
                    </p>
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-content">
                    <h4>Roth IRA Specialist</h4>
                    <p className="timeline-meta">Discover Card / 2012 - 2014</p>
                    <p className="timeline-description">
                      Helped customers open and manage Roth IRA accounts, answering questions about retirement savings options.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Skills grouped by area */}
          <div className="resume-skills">
            <h3 className="resume-column-title">My Skills</h3>
            <div className="skill-groups">
              {skillGroups.map((group) => (
                <div className="skill-group" key={group.title}>
                  <h4 className="skill-group-title">{group.title}</h4>
                  <div className="skill-tags">
                    {group.skills.map((skill) => (
                      <span className="skill-tag" key={skill}>{skill}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Download Resume Button */}
          <div className="download-cv-container">
            <a 
              href={`${import.meta.env.BASE_URL}New Resume2026.docx`}
              download="Alejandro_Abonnanzieri_Resume.docx"
              className="download-cv-btn"
            >
              Resume
            </a>
          </div>

          {/* Logo Row */}
          <div className="resume-logos">
            <img src={commercialFundingLogo} alt="Commercial Funding Logo" className="resume-logo" />
            <img src={deerValleyLogo} alt="Deer Valley Logo" className="resume-logo" />
            <img src={discoverLogo} alt="Discover Logo" className="resume-logo" />
            <img src={pcsdLogo} alt="PCSD Logo" className="resume-logo" />
            <img src={uofuLogo} alt="University of Utah Logo" className="resume-logo" />
            <img src={westernerLogo} alt="Westerner Logo" className="resume-logo" />
            <img src={womenEliteLogo} alt="Women Elite Logo" className="resume-logo" />
            <img src={redstarLogo} alt="Redstar Logo" className="resume-logo" />
            <img src={mpowerULogo} alt="MPowerU Logo" className="resume-logo" />
            <img src={murrayLogo} alt="Murray Logo" className="resume-logo" />
            <img src={executiveMindsetLogo} alt="Executive Mindset Logo" className="resume-logo" />
            <img src={slcJusticeLogo} alt="SLC Justice Court Logo" className="resume-logo" />
            <img src={dexaBodyLogo} alt="DexaBody Logo" className="resume-logo" />
            <img src={dailedLogo} alt="Dailed In Fitness Logo" className="resume-logo" />
            <img src={zadeBalanceLogo} alt="Zade Balance Logo" className="resume-logo" />
          </div>
        </div>
      </section>

      {/* New Page Section */}
      <section id="newpage" className="newpage-section">
        <div className="section-container">
          <div className="newpage-content">
            <div className="newpage-image">
              <img src={computer2Image} alt="Computer" className="computer-image" />
            </div>
            <div className="right" data-aos="fade-left" data-aos-duration="3000">
              <div className="content">
                <h1>Knowledge is Power</h1>
                <p>Before I ever programmed a PLC, I spent years writing code for the web. I learned to think in logic, build interfaces people actually understand, and track down bugs until the real cause turned up. It turns out that’s the same thinking a production line needs.</p>
                <p>Today I use those skills to write clean, well-documented PLC programs, design HMI screens that make problems easy to spot, and troubleshoot systems so they keep running. Whether it’s a website or a robot cell, I believe the same thing: when you truly understand how a system works, you can make it work better.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section id="mission" className="mission-section">
        <div className="section-container">
          <div className="mission-content">
            <div className="mission-text">
              <div className="content">
                <h1>My Mission</h1>
                <p>Everyone has a story to tell, and for years I helped businesses tell theirs through photography, video, and web development. Along the way I learned that the best work happens when creativity meets precision: the right camera settings, the right edit, the right line of code. Now I bring that same mindset to the factory floor. My camera background gives me a natural eye for machine vision, and my design work helps me build HMI screens that operators can read at a glance. Whether through a lens, a website, or a robot cell, my mission is the same: turn complex ideas into something people can see, understand, and trust.</p>
              </div>
            </div>
            <div className="mission-image">
              <img src={computer1Image} alt="Computer" className="computer-image" />
            </div>
          </div>
        </div>
      </section>

      {/* Github Section */}
      <section id="github" className="github-section" style={{ backgroundImage: `url(${pricingImage})` }}>
        <div className="section-container">
          <h2 className="section-title" data-aos="fade-up" data-aos-duration="1000">Github</h2>
          <div className="github-content">
            <p className="github-description">
              Check out my latest projects and contributions on GitHub. I'm always working on 
              new ideas and open to collaboration.
            </p>
            <a 
              href="https://github.com/Ghub10" 
              target="_blank" 
              rel="noopener noreferrer"
              className="github-link"
            >
              Visit My GitHub Profile →
            </a>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section">
        <div className="section-container">
          <h2 className="section-title" data-aos="fade-up" data-aos-duration="1000">Contact Me</h2>
          <div className="contact-content">
            <div className="contact-info">
              <div className="contact-item">
                <span className="contact-icon">📧</span>
                <div>
                  <h3>Email</h3>
                  <p>aabonnanzieri@gmail.com</p>
                </div>
              </div>
              <div className="contact-item">
                <span className="contact-icon">📞</span>
                <div>
                  <h3>Phone</h3>
                  <p>1 385 515 2421</p>
                </div>
              </div>
              <div className="contact-item">
                <span className="contact-icon">📍</span>
                <div>
                  <h3>Location</h3>
                  <p>Salt Lake City, Utah</p>
                </div>
              </div>
            </div>
            <form className="contact-form">
              <div className="form-group">
                <input type="text" placeholder="Your Name" required />
              </div>
              <div className="form-group">
                <input type="email" placeholder="Your Email" required />
              </div>
              <div className="form-group">
                <textarea placeholder="Your Message" rows="5" required></textarea>
              </div>
              <button type="submit" className="btn-submit">Send Message</button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <p>&copy; 2026 Portfolio. All rights reserved.</p>
          <a 
            href="https://www.linkedin.com/in/alejandro-abonnanzieri-929b84b3/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="linkedin-link"
            aria-label="LinkedIn Profile"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="currentColor"
              className="linkedin-icon"
            >
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
          </a>
          <a 
            href="https://github.com/Ghub10" 
            target="_blank" 
            rel="noopener noreferrer"
            className="github-link-footer"
            aria-label="GitHub Profile"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="currentColor"
              className="github-icon"
            >
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </a>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button 
          className="scroll-to-top" 
          onClick={scrollToTop}
          aria-label="Scroll to top"
        >
          ↑
        </button>
      )}
    </div>
  )
}

export default App




