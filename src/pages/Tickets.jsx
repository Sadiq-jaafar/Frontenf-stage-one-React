import React, { useEffect, useState } from 'react'
import { loadTickets, addTicket, updateTicket, deleteTicket } from '/src/lib/storage.js'
import TicketForm from './TicketForm'
import Modal from '../components/Modal'

function TicketRow({t, onEdit, onDelete}){
  return (
    <div className="ticket" role="article" aria-label={t.title}>
      <div className="meta">
        <strong>{t.title}</strong>
        <small>{t.description ? t.description.slice(0,140) : 'No description'}</small>
        <small>Created: {new Date(t.createdAt).toLocaleString()}</small>
      </div>
      <div style={{textAlign:'right'}}>
        <div className={`status ${t.status}`}>{t.status}</div>
        <div className="actions" style={{marginTop:8}}>
          <button onClick={()=>onEdit(t)} aria-label={`Edit ${t.title}`}>Edit</button>
          <button onClick={()=>onDelete(t.id)} aria-label={`Delete ${t.title}`} style={{background:'#ffdddd', color:'#900'}}>Delete</button>
        </div>
      </div>
    </div>
  )
}

export default function Tickets({ showToast }){
  const [tickets, setTickets] = useState([])
  const [editing, setEditing] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [deleteModal, setDeleteModal] = useState({ show: false, ticketId: null })

  useEffect(()=>{
    try{
      setTickets(loadTickets(true))
    }catch(e){
      console.error('Failed to load tickets', e)
      setTickets([])
      if(typeof showToast === 'function') showToast('Failed to load tickets. Please retry.','error')
    }
  }, [showToast])

  const handleCreate = (payload) => {
    addTicket(payload)
    setTickets(loadTickets())
    setShowForm(false)
    showToast('Ticket created', 'success')
  }

  const handleUpdate = (payload) => {
    updateTicket(payload)
    setTickets(loadTickets())
    setEditing(null)
    setShowForm(false)
    showToast('Ticket updated', 'success')
  }

  const handleDelete = (id) => {
    setDeleteModal({ show: true, ticketId: id })
  }

  const confirmDelete = () => {
    const { ticketId } = deleteModal
    if (!ticketId) return
    
    deleteTicket(ticketId)
    setTickets(loadTickets())
    showToast('Ticket deleted', 'success')
    setDeleteModal({ show: false, ticketId: null })
  }

  const startEdit = (t) => {
    setEditing(t)
    setShowForm(true)
  }

  const startCreate = () => {
    setEditing(null)
    setShowForm(true)
  }

  return (
    <section>
      <div className="profile-card card">
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <h2>Tickets</h2>
          <div>
            <button onClick={startCreate}>New Ticket</button>
          </div>
        </div>

        {showForm && (
          <TicketForm
            initial={editing}
            onCancel={()=>{ setShowForm(false); setEditing(null) }}
            onCreate={handleCreate}
            onUpdate={handleUpdate}
          />
        )}

        <div style={{marginTop:12}}>
          {tickets.length === 0 ? (
            <div className="card">No tickets yet. Create one to get started.</div>
          ) : (
            tickets.map(t => <TicketRow key={t.id} t={t} onEdit={startEdit} onDelete={handleDelete} />)
          )}
        </div>
      </div>

      <Modal
        isOpen={deleteModal.show}
        onClose={() => setDeleteModal({ show: false, ticketId: null })}
        onConfirm={confirmDelete}
        title="Delete Ticket"
      >
        <p>Are you sure you want to delete this ticket? This action cannot be undone.</p>
      </Modal>
    </section>
  )
}
