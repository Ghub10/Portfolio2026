import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Videos.css'
import logo from '../assets/sirlogo2.png'
import { usePageView } from '../hooks/usePageView'
import { useGalleryItems } from '../hooks/useGalleryItems'
import { fallbackVideos } from '../data/galleryFallbacks'

const Videos = () => {
  const { items: videos, loading } = useGalleryItems('video', fallbackVideos)
  const [activeVimeoId, setActiveVimeoId] = useState(null)

  usePageView('/videos')

  return (
    <div className="vid-page">
      {/* Navbar */}
      <nav className="vid-nav">
        <div className="vid-nav-inner">
          <Link to="/" className="vid-logo">
            <img src={logo} alt="Sirnetz Logo" className="logo-img" />
          </Link>
          <div className="vid-nav-links">
            <Link to="/">← Back to Portfolio</Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <header className="vid-hero">
        <div className="vid-hero-inner">
          <p className="vid-hero-tag">Videography</p>
          <h1 className="vid-hero-title">Videos</h1>
        </div>
      </header>

      {/* Gallery */}
      <main className="vid-main">
        {loading ? (
          <div className="vid-loading">Loading...</div>
        ) : (
          <div className="vid-grid">
            {videos.map((video, index) => (
              <div
                key={video.id}
                className="vid-card"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                {video.image_url ? (
                  <button
                    className="vid-thumb-btn"
                    onClick={() => setActiveVimeoId(video.vimeo_id)}
                    aria-label={`Play ${video.title}`}
                  >
                    <img src={video.image_url} alt={video.title} className="vid-thumb-img" />
                    <div className="vid-play-overlay">
                      <span className="vid-play-icon">▶</span>
                    </div>
                  </button>
                ) : (
                  <div className="vid-embed-wrapper">
                    <iframe
                      src={`https://player.vimeo.com/video/${video.vimeo_id}`}
                      title={video.title}
                      frameBorder="0"
                      allow="autoplay; fullscreen; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                )}
                <p className="vid-label">{video.title}</p>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Lightbox */}
      {activeVimeoId && (
        <div className="vid-lightbox" onClick={() => setActiveVimeoId(null)}>
          <div className="vid-lightbox-inner" onClick={e => e.stopPropagation()}>
            <button className="vid-lb-close" onClick={() => setActiveVimeoId(null)} aria-label="Close">✕</button>
            <div className="vid-lb-embed">
              <iframe
                src={`https://player.vimeo.com/video/${activeVimeoId}?autoplay=1`}
                title="Video"
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="vid-footer">
        <p>&copy; 2026 Sirnetz · <Link to="/">Portfolio</Link></p>
        <div className="vid-footer-links">
          <a
            href="https://www.linkedin.com/in/alejandro-abonnanzieri-929b84b3/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
          </a>
          <a
            href="https://github.com/Ghub10"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </a>
        </div>
      </footer>
    </div>
  )
}

export default Videos
