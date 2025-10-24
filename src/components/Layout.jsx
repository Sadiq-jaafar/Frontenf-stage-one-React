import React from 'react'
import Navbar from './Navbar'

export default function Layout({ children }) {
  return (
    <div className="container" role="application">
      <Navbar />
      <main>{children}</main>
      <footer className="app-footer">
        © {new Date().getFullYear()} TicketApp — Built for Frontend Stage 2
      </footer>
    </div>
  )
}
