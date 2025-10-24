import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getSession, clearSession } from '../lib/auth'

export default function Navbar(){
  const navigate = useNavigate()
  const session = getSession()
  const [isOpen, setIsOpen] = useState(false)

  const logout = () => {
    clearSession()
    navigate('/')
  }

  const toggleMenu = () => setIsOpen(!isOpen)

  return (
    <nav className="nav" aria-label="Main navigation">
      <button 
        className="nav-toggle" 
        onClick={toggleMenu}
        aria-expanded={isOpen}
        aria-controls="nav-menu"
      >
        <span className="sr-only">Menu</span>
        <div className="hamburger">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </button>

      <div className={`nav-menu ${isOpen ? 'show' : ''}`} id="nav-menu">
        <Link to="/" onClick={toggleMenu}>Home</Link>
        <Link to="/tickets" onClick={toggleMenu}>Tickets</Link>
        <Link to="/dashboard" onClick={toggleMenu}>Dashboard</Link>
        {!session ? (
          <Link to="/auth/login" onClick={toggleMenu}>Login</Link>
        ) : (
          <>
            <button onClick={() => { logout(); toggleMenu(); }} className="logout-btn">Logout</button>
          </>
        )}
      </div>
    </nav>
  )
}
