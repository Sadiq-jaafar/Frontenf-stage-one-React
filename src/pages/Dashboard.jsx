import React from 'react'
import { Link } from 'react-router-dom'
import { loadTickets } from '/src/lib/storage.js'

export default function Dashboard(){
  const tickets = loadTickets()
  const total = tickets.length
  const open = tickets.filter(t => t.status === 'open').length
  const inProgress = tickets.filter(t => t.status === 'in_progress').length
  const closed = tickets.filter(t => t.status === 'closed').length

  return (
    <section className="profile-card card" aria-labelledby="dashboard-title">
      <h2 id="dashboard-title">Dashboard</h2>
      <p>Overview of tickets</p>

      <div className="stats" style={{marginTop:12}}>
        <div className="stat card">
          <div>Total tickets</div>
          <div style={{fontSize:20, fontWeight:700}}>{total}</div>
        </div>

        <div className="stat card">
          <div>Open</div>
          <div style={{fontSize:20, fontWeight:700}}>{open}</div>
        </div>

        <div className="stat card">
          <div>In progress</div>
          <div style={{fontSize:20, fontWeight:700}}>{inProgress}</div>
        </div>

        <div className="stat card">
          <div>Resolved</div>
          <div style={{fontSize:20, fontWeight:700}}>{closed}</div>
        </div>
      </div>

      <div style={{marginTop:16}}>
        <Link to="/tickets"><button>Go to Tickets</button></Link>
      </div>
    </section>
  )
}
