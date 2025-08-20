import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import UnusedLettersPage from './pages/UnusedLettersPage'
import ParticleChamberPage from './pages/ParticleChamberPage'
import './index.css'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/unused-letters" element={<UnusedLettersPage />} />
          <Route path="/particle-chamber" element={<ParticleChamberPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
