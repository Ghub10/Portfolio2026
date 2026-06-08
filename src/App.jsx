import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './App.css'
import AOS from 'aos'
import 'aos/dist/aos.css'
import logo from './assets/sirlogo2.png'
import uofuLogo from './assets/uofu copy.png'
import ldsbcLogo from './assets/LDSBC copy.png'
import photographyIcon from './assets/photography copy.png'
import webIcon from './assets/web copy.png'
import videographyIcon from './assets/videography.png'
import designIcon from './assets/design copy.png'
import computer2Image from './assets/computer2 copy.png'
import computer1Image from './assets/computer1 copy.png'
import pricingImage from './assets/pricingimage copy.png'

function App() {
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)
  const [typewriterText, setTypewriterText] = useState('')
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

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
            <li><a href="#services" onClick={() => scrollToSection('services')}>Services</a></li>
            <li><a href="#github" onClick={() => scrollToSection('github')}>Github</a></li>
            <li><a href="#about" onClick={() => scrollToSection('about')}>About Me</a></li>
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
            <a href="#services" onClick={() => scrollToSection('services')}>Services</a>
            <a href="#github" onClick={() => scrollToSection('github')}>Github</a>
            <a href="#about" onClick={() => scrollToSection('about')}>About Me</a>
            <a href="#contact" onClick={() => scrollToSection('contact')}>Contact Me</a>
          </div>
        )}
      </nav>

      {/* Home/Hero Section */}
      <section id="home" className="hero-section">
        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-text">
              <h2 className="hero-subtitle">Hi I'm A Web Content Specialist</h2>
              <h1 className="hero-title">
                {typewriterText || 'Designer'}<span className="cursor-blink">|</span>
              </h1>
              <p className="hero-location">CDMX · SLC · Lisbon</p>
              <div className="hero-buttons">
                <button 
                  className="btn-primary btn-view-works" 
                  onClick={() => scrollToSection('services')}
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
            </div>
          </div>
          <div className="scroll-indicator">
            <span>↓</span>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="services-section">
        <div className="section-container">
          <h2 className="section-title" data-aos="fade-up" data-aos-duration="1000">Services</h2>
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">
                <img
                  src={webIcon}
                  alt="Web Development"
                  style={{ width: '200px', height: '200px', objectFit: 'contain' }}
                />
              </div>
              <h3>Web Development</h3>
              <p>Building responsive and interactive user interfaces with modern frameworks.</p>
              <ul>
                <li>Mobile Service Compatible</li>
                <li>Responsive Design</li>
                <li>Basic Application Development</li>
                <li>Custom Graphics</li>
                <li>WordPress Content Management</li>
                <li>Photo/Video Content</li>
              </ul>
              <button
                className="view-gallery-btn"
                onClick={() => navigate('/projects')}
              >
                View Projects →
              </button>
            </div>
            <div className="service-card">
              <div className="service-icon">
                <img 
                  src={photographyIcon} 
                  alt="Photography" 
                  style={{ width: '200px', height: '200px', objectFit: 'contain' }}
                />
              </div>
              <h3>Photography</h3>
              <p>Capturing compelling visual stories and professional imagery for your brand.</p>
              <ul>
                <li>Landscape</li>
                <li>Commercial</li>
                <li>Real Estate</li>
                <li>Special Events</li>
              </ul>
              <button
                className="view-gallery-btn"
                onClick={() => navigate('/photography')}
              >
                View Gallery →
              </button>
            </div>
            <div className="service-card">
              <div className="service-icon">
                <img 
                  src={designIcon} 
                  alt="Consulting" 
                  style={{ width: '200px', height: '200px', objectFit: 'contain' }}
                />
              </div>
              <h3>Consulting</h3>
              <p>Providing expert advice on design strategies and technical implementations.</p>
              <ul>
                <li>Assessment</li>
                <li>Strategic Planning</li>
                <li>Execution</li>
                <li>Payment Options</li>
              </ul>
              <button
                className="view-gallery-btn"
                onClick={() => navigate('/consulting')}
              >
                Get a Consultation →
              </button>
            </div>
            <div className="service-card">
              <div className="service-icon">
                <img 
                  src={videographyIcon} 
                  alt="Videography" 
                  style={{ width: '200px', height: '200px', objectFit: 'contain' }}
                />
              </div>
              <h3>Videography</h3>
              <p>Producing engaging video content for web, social media, and campaigns.</p>
              <ul>
                <li>Weddings</li>
                <li>Commercial</li>
                <li>Entertainment</li>
                <li>Informational</li>
              </ul>
              <button
                className="view-gallery-btn"
                onClick={() => navigate('/videos')}
              >
                See Videos →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* About Me Section */}
      <section id="about" className="about-section">
        <div className="section-container">
          <div className="about-content">
            <div className="about-text">
              <h2 className="section-title" data-aos="fade-up" data-aos-duration="1000">About Me</h2>
              <p className="about-first-paragraph">
                <img 
                  src={uofuLogo} 
                  alt="University of Utah Logo" 
                  className="about-logo"
                />
                Mr. Abonnanzieri began his professional journey as a Senior Account Manager at Discover Card, where he managed accounts payable and receivables as part of a strategic back office initiative. After two years of distinguished service, he transitioned to the Salt Lake City Justice Court, where he served as a Judicial Assistant.
              </p>
              <p>
                During his tenure at the Justice Court, he leveraged his educational background in media marketing to spearhead his first development projects and contribute significantly to the communications team, demonstrating his ability to bridge technical expertise with strategic communication.
              </p>
              <p className="about-first-paragraph">
                <img 
                  src={ldsbcLogo} 
                  alt="LDS Business College Logo" 
                  className="about-logo"
                />
                His exceptional work at the court led to an invitation to join ComV Productions, where he further refined his expertise in photography and video editing. His talent and dedication caught the attention of the University of Utah, which subsequently offered him the prestigious role of directing the "News Break" show.
              </p>
              <p>
                In 2017, Mr. Abonnanzieri embarked on an international career move, relocating to Lisbon, Portugal. There, he joined Agência de Marketing Digital as a Senior Content Development Manager, where he applied his diverse skill set for over a year, contributing to the agency's digital marketing initiatives.
              </p>
              <p>
                Most recently, Mr. Abonnanzieri served as Vice President at Red Star Transportation, where he successfully integrated his multifaceted expertise as a marketing director, financial strategist, and web developer. He has recently launched his own venture, Sirnetz, with the vision of exploring new opportunities and expanding his professional portfolio in the web development field.
              </p>
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
                    <p className="timeline-meta">Park City School District – Park City, UT / 05/2025 – Present</p>
                    <p className="timeline-description">
                      Leading transportation operations and technology initiatives for the district.
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
                    <h4>Senior Account Manager</h4>
                    <p className="timeline-meta">Discover Card / 2012 - 2014</p>
                    <p className="timeline-description">
                      Managed accounts payable and receivables as part of strategic back office initiative.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Skills with Progress Bars */}
          <div className="resume-skills">
            <h3 className="resume-column-title">My Skills</h3>
            <div className="skills-progress-grid">
              <div className="skill-progress-item">
                <div className="skill-header">
                  <span className="skill-name">React</span>
                  <span className="skill-percentage">85%</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: '85%' }}></div>
                </div>
              </div>
              <div className="skill-progress-item">
                <div className="skill-header">
                  <span className="skill-name">JavaScript</span>
                  <span className="skill-percentage">88%</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: '88%' }}></div>
                </div>
              </div>
              <div className="skill-progress-item">
                <div className="skill-header">
                  <span className="skill-name">CSS/SCSS</span>
                  <span className="skill-percentage">90%</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: '90%' }}></div>
                </div>
              </div>
              <div className="skill-progress-item">
                <div className="skill-header">
                  <span className="skill-name">PHP</span>
                  <span className="skill-percentage">75%</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: '75%' }}></div>
                </div>
              </div>
              <div className="skill-progress-item">
                <div className="skill-header">
                  <span className="skill-name">Responsive Design</span>
                  <span className="skill-percentage">92%</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: '92%' }}></div>
                </div>
              </div>
              <div className="skill-progress-item">
                <div className="skill-header">
                  <span className="skill-name">Advanced Custom Field</span>
                  <span className="skill-percentage">80%</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: '80%' }}></div>
                </div>
              </div>
              <div className="skill-progress-item">
                <div className="skill-header">
                  <span className="skill-name">HTML</span>
                  <span className="skill-percentage">95%</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: '95%' }}></div>
                </div>
              </div>
              <div className="skill-progress-item">
                <div className="skill-header">
                  <span className="skill-name">AI</span>
                  <span className="skill-percentage">70%</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: '70%' }}></div>
                </div>
              </div>
              <div className="skill-progress-item">
                <div className="skill-header">
                  <span className="skill-name">Lightroom</span>
                  <span className="skill-percentage">85%</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: '85%' }}></div>
                </div>
              </div>
              <div className="skill-progress-item">
                <div className="skill-header">
                  <span className="skill-name">Photoshop</span>
                  <span className="skill-percentage">88%</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: '88%' }}></div>
                </div>
              </div>
              <div className="skill-progress-item">
                <div className="skill-header">
                  <span className="skill-name">Illustrator</span>
                  <span className="skill-percentage">83%</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: '83%' }}></div>
                </div>
              </div>
              <div className="skill-progress-item">
                <div className="skill-header">
                  <span className="skill-name">Bootstrap</span>
                  <span className="skill-percentage">90%</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: '90%' }}></div>
                </div>
              </div>
              <div className="skill-progress-item">
                <div className="skill-header">
                  <span className="skill-name">Sass</span>
                  <span className="skill-percentage">85%</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: '85%' }}></div>
                </div>
              </div>
              <div className="skill-progress-item">
                <div className="skill-header">
                  <span className="skill-name">Videographer</span>
                  <span className="skill-percentage">87%</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: '87%' }}></div>
                </div>
              </div>
              <div className="skill-progress-item">
                <div className="skill-header">
                  <span className="skill-name">Photography</span>
                  <span className="skill-percentage">90%</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: '90%' }}></div>
                </div>
              </div>
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
                <p>The majority of small businesses aren't aware that their websites are the "Capital of their Digital Empire." The unnecessary waste of time and resources spent on inefficient marketing techniques is a very common mistake and as a consequence, they loose potential clients just for the simple fact that their site isn't designed to close a sale. As an entrepreneur, you need to know that most conversions happen on your website.</p>
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
                <h1>Our Mission</h1>
                <p>This is the reason why I decided to help entrepreneurs create their eMarketing/Branding plan at a fraction of the cost of the big design agencies. My philosophy is that everyone has a story to tell. Together we can develop a plan to effectively reach the right target audience, in the right places, delivering the right message, and as a result, creating a new business opportunity. Sirnetz combines the arts of photography and videography with web development creating beautiful websites/applications meeting the expectations of our clients.</p>
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
            <div className="github-stats">
              <div className="stat-card">
                <h3>Repositories</h3>
                <svg className="stat-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" width="40" height="40" aria-hidden="true">
                  <path d="M9.5 3.25a2.25 2.25 0 1 1 3 2.122V6A2.5 2.5 0 0 1 10 8.5H6a1 1 0 0 0-1 1v1.128a2.251 2.251 0 1 1-1.5 0V5.372a2.25 2.25 0 1 1 1.5 0v1.836A2.493 2.493 0 0 1 6 7h4a1 1 0 0 0 1-1v-.628A2.25 2.25 0 0 1 9.5 3.25Z"/>
                </svg>
              </div>
              <div className="stat-card">
                <h3>Contributions</h3>
                <svg className="stat-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" width="40" height="40" aria-hidden="true">
                  <path d="M6 2a.75.75 0 0 1 .696.471L10 10.731l1.304-3.26A.75.75 0 0 1 12 7h3.25a.75.75 0 0 1 0 1.5h-2.742l-1.812 4.528a.75.75 0 0 1-1.392 0L6 4.77 4.696 8.03A.75.75 0 0 1 4 8.5H.75a.75.75 0 0 1 0-1.5h2.742Z"/>
                </svg>
              </div>
              <div className="stat-card">
                <h3>Languages</h3>
                <svg className="stat-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" width="40" height="40" aria-hidden="true">
                  <path d="M0 1.75C0 .784.784 0 1.75 0h12.5C15.216 0 16 .784 16 1.75v12.5A1.75 1.75 0 0 1 14.25 16H1.75A1.75 1.75 0 0 1 0 14.25ZM1.75 1.5a.25.25 0 0 0-.25.25v12.5c0 .138.112.25.25.25h12.5a.25.25 0 0 0 .25-.25V1.75a.25.25 0 0 0-.25-.25ZM5.22 8.53a.75.75 0 0 1-1.06 1.06L1.97 7.4a.75.75 0 0 1 0-1.06L4.16 4.16a.75.75 0 0 1 1.06 1.06L3.31 6.87Zm6.62 0 2.19-2.19a.75.75 0 0 0-1.06-1.06L10.78 7.4a.75.75 0 0 0 0 1.06l2.19 2.19a.75.75 0 0 0 1.06-1.06ZM8.78 4.21a.75.75 0 0 0-1.44.42l1.5 5a.75.75 0 0 0 1.44-.42Z"/>
                </svg>
              </div>
            </div>
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
          <h2 className="section-title" data-aos="fade-up" data-aos-duration="1000">Contact Us</h2>
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




