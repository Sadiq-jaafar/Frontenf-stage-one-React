import React from 'react'
import { Link } from 'react-router-dom'

export default function Landing(){
  return (
    <div>
      <section className="hero" aria-labelledby="hero-title">
        <div className="circle one" aria-hidden></div>
        <div className="circle two" aria-hidden></div>

        <div className="hero-inner container">
          <div>
            <h1 id="hero-title">TicketApp — Manage work like magic</h1>
            <p>A simple multi-frontend ticket manager stage 2 (React implementation). Create, update, and track tickets with a clean interface.</p>
            <p style={{marginTop:12}}>
              <Link className="cta primary" to="/auth/login" aria-label="Login">Login</Link>
              <span style={{marginLeft:10}} />
              <Link className="cta ghost" to="/auth/signup" aria-label="Get started">Get Started</Link>
            </p>
          </div>

          <div className="card" aria-hidden>
            <strong>Quick features</strong>
            <ul style={{marginTop:12}}>
              <li>Auth (localStorage)</li>
              <li>Ticket CRUD</li>
              <li>Protected routes</li>
              <li>Accessible forms</li>
            </ul>
          </div>
        </div>

        <div className="wave" aria-hidden>
          <img src="/hero-wave.svg" alt="" style={{width:'100%'}} />
        </div>
      </section>

      <section style={{marginTop:80}} className="profile-card card">
        <h2>Why this demo</h2>
        <p>This project demonstrates consistent visuals and behavior across frameworks. The React version is an app using localStorage for persistence.</p>
      </section>
    </div>
  )
}
