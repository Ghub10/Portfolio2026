import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Photography.css'
import logo from '../assets/sirlogo2.png'
import { supabase } from '../config/supabase'
import { usePageView } from '../hooks/usePageView'

const Photography = () => {
  const [photos, setPhotos]     = useState([])
  const [loading, setLoading]   = useState(true)
  const [lightbox, setLightbox] = useState(null)

  usePageView('/photography')

  useEffect(() => {
    supabase
      .from('gallery_items')
      .select('*')
      .eq('type', 'photo')
      .eq('published', true)
      .order('sort_order', { ascending: true })
      .then(({ data }) => {
        setPhotos(data || [])
        setLoading(false)
      })
  }, [])

  const openLightbox = (photo) => setLightbox(photo)
  const closeLightbox = () => setLightbox(null)

  const navigateLightbox = (dir) => {
    const currentIndex = photos.findIndex(p => p.id === lightbox.id)
    const next = (currentIndex + dir + photos.length) % photos.length
    setLightbox(photos[next])
  }

  return (
    <div className="pg-page">
      {/* Navbar */}
      <nav className="pg-nav">
        <div className="pg-nav-inner">
          <Link to="/" className="pg-logo">
            <img src={logo} alt="Sirnetz Logo" className="logo-img" />
          </Link>
          <div className="pg-nav-links">
            <Link to="/">← Back to Portfolio</Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <header className="pg-hero">
        <div className="pg-hero-inner">
          <p className="pg-hero-tag">Visual Stories</p>
          <h1 className="pg-hero-title">Photography</h1>
        </div>
        <div className="pg-hero-bar" />
      </header>

      {/* Gallery */}
      <main className="pg-main">
        {loading ? (
          <div className="pg-loading">Loading...</div>
        ) : (
          <div className="pg-grid">
            {photos.map((photo, index) => (
              <button
                key={photo.id}
                className="pg-card"
                style={{ animationDelay: `${(index % 8) * 50}ms` }}
                onClick={() => openLightbox(photo)}
                aria-label={`View ${photo.title}`}
              >
                <img src={photo.image_url} alt={photo.title} className="pg-card-img" />
              </button>
            ))}
          </div>
        )}
      </main>

      {/* Lightbox */}
      {lightbox && (
        <div className="pg-lightbox" onClick={closeLightbox}>
          <div className="pg-lightbox-inner" onClick={e => e.stopPropagation()}>
            <button className="pg-lb-close" onClick={closeLightbox} aria-label="Close">✕</button>
            <button className="pg-lb-prev" onClick={() => navigateLightbox(-1)} aria-label="Previous">‹</button>
            <button className="pg-lb-next" onClick={() => navigateLightbox(1)} aria-label="Next">›</button>
            <img src={lightbox.image_url} alt={lightbox.title} className="pg-lb-img" />
            <div className="pg-lb-caption">
              <span className="pg-lb-label">{lightbox.title}</span>
              <span className="pg-lb-cat">{lightbox.category}</span>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="pg-footer">
        <p>&copy; 2026 Sirnetz · <Link to="/">Portfolio</Link></p>
      </footer>
    </div>
  )
}

export default Photography
