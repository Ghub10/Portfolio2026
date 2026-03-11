import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import App from './App'
import Login from './components/Login'
import Profile from './pages/Profile'
import AdminPanel from './pages/AdminPanel'
import Photography from './pages/Photography'
import Projects from './pages/Projects'
import Videos from './pages/Videos'
import Consulting from './pages/Consulting'

const AppRouter = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/photography" element={<Photography />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/videos" element={<Videos />} />
          <Route path="/consulting" element={<Consulting />} />
        </Routes>
      </AuthProvider>
    </Router>
  )
}

export default AppRouter


