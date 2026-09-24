import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom'
import './App.css'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import { hasApiConfiguration } from './api.js'

const navigationItems = [
  ['/', 'Overview'],
  ['/activities', 'Activities'],
  ['/leaderboard', 'Leaderboard'],
  ['/teams', 'Teams'],
  ['/users', 'Users'],
  ['/workouts', 'Workouts'],
]

function App() {
  return (
    <BrowserRouter>
      <header className="app-header">
        <div className="brand-lockup">
          <span className="brand-mark">O</span>
          <div><strong>Octofit</strong><span>TRACKER</span></div>
        </div>
        <nav aria-label="Primary navigation">
          {navigationItems.map(([path, label]) => <NavLink key={path} to={path}>{label}</NavLink>)}
        </nav>
      </header>
      <main className="app-main">
        {!hasApiConfiguration && <div className="config-alert" role="status">Set <code>VITE_CODESPACE_NAME</code> in <code>.env.local</code> to connect to the API.</div>}
        <Routes>
          <Route path="/" element={<Activities />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
