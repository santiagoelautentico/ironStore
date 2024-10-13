import './App.css'
import { Routes, Route, Link } from 'react-router-dom'
import Login from './pages/Login.jsx'
import SignIn from './pages/SignIn.jsx'
import Dashboard from './pages/Dashboard.jsx'

function App() {

  return (
    <>
    <header className='header'>
      <h1>IronStone</h1>
      <ul className='nav'>
        <li><Link to="/">Login</Link></li>
        <li><Link to="/signin">SignIn</Link></li>
        <li><Link to="/dashboard">Dashboard</Link></li>
      </ul>
    </header>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  )
}

export default App
