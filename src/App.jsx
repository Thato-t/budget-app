import Sign from "./components/Sign/Sign.jsx"
import Dashboard from "./components/Dashboard/dashboard.jsx"
import Report from './components/Reports/report.jsx'
import Settings from "./components/Settings/settings.jsx"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {

  return (
    <>
      <Router>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/reports" element={<Report />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/sign" element={<Sign />} /> 
          </Routes>
      </Router>

    </>
  )
}

export default App
