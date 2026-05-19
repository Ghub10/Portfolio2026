import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Photography.css'
import logo from '../assets/sirlogo2.png'
import pic1  from '../assets/TRA/San Francisco copy.png'
import pic2  from '../assets/TRA/Times Square copy.jpeg'
import pic5  from '../assets/TRA/pic 5 copy.png'
import pic7  from '../assets/TRA/pic 7 copy.png'
import pic8  from '../assets/TRA/pic 8 copy.png'
import pic9  from '../assets/TRA/pic 9 copy.png'
import pic10 from '../assets/TRA/pic 10 copy.png'
import pic11 from '../assets/TRA/pic 11 copy.png'
import pic12 from '../assets/TRA/pic 12 copy.png'
import pic13 from '../assets/TRA/pic 13 copy.png'
import pic14 from '../assets/TRA/pic 14 copy.png'
import pic15 from '../assets/TRA/pic 15 copy.png'
import pic16 from '../assets/TRA/pic 16 copy.png'
import pic17 from '../assets/TRA/pic 17 copy.png'
import pic18 from '../assets/TRA/pic 18 copy.png'
import pic21 from '../assets/TRA/pic 21 copy.png'
import pic22 from '../assets/TRA/pic 22 copy.png'
import pic23 from '../assets/TRA/pic 23 copy.png'
import pic24 from '../assets/TRA/pic 24 copy.png'
import pic25 from '../assets/TRA/pic 25 copy.png'
import pic26 from '../assets/TRA/pic 26 copy.png'
import hawaii from '../assets/TRA/Hawaii copy.png'
import pic27 from '../assets/TRA/pic 27 copy.png'

const photos = [
  { id: 1,  label: 'San Francisco', category: 'USA',     src: pic1  },
  { id: 2,  label: 'Times Square',  category: 'USA',     src: pic2  },
  { id: 5,  label: 'Amsterdam',     category: 'Europe',  src: pic5  },
  { id: 7,  label: 'Paris',         category: 'Europe',  src: pic7  },
  { id: 8,  label: 'Pisa',          category: 'Europe',  src: pic8  },
  { id: 9,  label: 'Rome',          category: 'Europe',  src: pic9  },
  { id: 10, label: 'Firenze',       category: 'Europe',  src: pic10 },
  { id: 11, label: 'Camp Nou',      category: 'Europe',  src: pic11 },
  { id: 12, label: 'Sintra',        category: 'Europe',  src: pic12 },
  { id: 13, label: 'Barcelona',     category: 'Europe',  src: pic13 },
  { id: 14, label: 'London',        category: 'Europe',  src: pic14 },
  { id: 15, label: 'Cambridge',     category: 'Europe',  src: pic15 },
  { id: 16, label: 'Lisbon',        category: 'Europe',  src: pic16 },
  { id: 17, label: 'Warsawa',       category: 'Europe',  src: pic17 },
  { id: 18, label: 'Vatican',       category: 'Europe',  src: pic18 },
  { id: 21, label: 'Mexico City',   category: 'Mexico',  src: pic21 },
  { id: 22, label: 'Chichenitza',   category: 'Mexico',  src: pic22 },
  { id: 23, label: 'Tulum',         category: 'Mexico',  src: pic23 },
  { id: 24, label: 'Haleakalā',     category: 'Pacific', src: pic24 },
  { id: 25, label: 'Kauai',         category: 'Pacific', src: pic25 },
  { id: 26, label: 'Maui',          category: 'Pacific', src: pic26 },
  { id: 27, label: 'Hawaii',        category: 'Pacific', src: hawaii },
  { id: 28, label: 'Photo 27',     category: 'Pacific', src: pic27 },
]

const Photography = () => {
  const [lightbox, setLightbox] = useState(null)

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
        {/* Grid */}
        <div className="pg-grid">
          {photos.map((photo, index) => (
            <button
              key={photo.id}
              className="pg-card"
              style={{ animationDelay: `${(index % 8) * 50}ms` }}
              onClick={() => openLightbox(photo)}
              aria-label={`View ${photo.label}`}
            >
              <img src={photo.src} alt={photo.label} className="pg-card-img" />
            </button>
          ))}
        </div>


      </main>

      {/* Lightbox */}
      {lightbox && (
        <div className="pg-lightbox" onClick={closeLightbox}>
          <div className="pg-lightbox-inner" onClick={e => e.stopPropagation()}>
            <button className="pg-lb-close" onClick={closeLightbox} aria-label="Close">✕</button>
            <button className="pg-lb-prev" onClick={() => navigateLightbox(-1)} aria-label="Previous">‹</button>
            <button className="pg-lb-next" onClick={() => navigateLightbox(1)} aria-label="Next">›</button>
            <img src={lightbox.src} alt={lightbox.label} className="pg-lb-img" />
            <div className="pg-lb-caption">
              <span className="pg-lb-label">{lightbox.label}</span>
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
