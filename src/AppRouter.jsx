import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import App from './App'
import Photography from './pages/Photography'
import Projects from './pages/Projects'
import Videos from './pages/Videos'
import Consulting from './pages/Consulting'

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/photography" element={<Photography />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/videos" element={<Videos />} />
        <Route path="/consulting" element={<Consulting />} />
      </Routes>
    </Router>
  )
}

export default AppRouter


