import React, { useState } from 'react'
// import { v4 as uid } from './uid'

const allowed = ['open','in_progress','closed']

// simple uid fallback
// We'll create a tiny uid function if v4 not available
function getId(){
  return 't_' + Math.random().toString(36).slice(2,9)
}

export default function TicketForm({ initial=null, onCreate, onUpdate, onCancel }){
  const [title,setTitle] = useState(initial ? initial.title : '')
  const [status,setStatus] = useState(initial ? initial.status : 'open')
  const [description,setDescription] = useState(initial ? initial.description : '')
  const [errors,setErrors] = useState({})

  const validate = () => {
    const errs = {}
    if(!title.trim()) errs.title = 'Title is required.'
    if(!allowed.includes(status)) errs.status = 'Invalid status.'
    if(description && description.length > 1000) errs.description = 'Description too long.'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const submit = (e) => {
    e.preventDefault()
    if(!validate()) return
    const now = Date.now()
    if(initial){
      onUpdate({...initial, title: title.trim(), status, description: description.trim(), updatedAt: now})
    } else {
      const t = { id: getId(), title: title.trim(), status, description: description.trim(), createdAt: now, updatedAt: now }
      onCreate(t)
      setTitle(''); setStatus('open'); setDescription('')
    }
  }

  return (
    <form onSubmit={submit} className="card" style={{marginTop:12}}>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <strong>{initial ? 'Edit Ticket' : 'New Ticket'}</strong>
        <div>
          <button type="button" className="secondary" onClick={onCancel}>Cancel</button>
        </div>
      </div>

      

      <div className="form-group">
        <label htmlFor="t-title">Title</label>
        <input id="t-title" type="text" value={title} onChange={e=>setTitle(e.target.value)} aria-describedby={errors.title ? 'err-title' : undefined} />
        {errors.title && <small id="err-title" role="alert" style={{color:'red'}}>{errors.title}</small>}
      </div>

      <div className="form-group">
        <label htmlFor="t-status">Status</label>
        <select id="t-status" value={status} onChange={e=>setStatus(e.target.value)} aria-describedby={errors.status ? 'err-status' : undefined}>
          <option value="open">open</option>
          <option value="in_progress">in_progress</option>
          <option value="closed">closed</option>
        </select>
        {errors.status && <small id="err-status" role="alert" style={{color:'red'}}>{errors.status}</small>}
      </div>

      <div className="form-group">
        <label htmlFor="t-desc">Description (optional)</label>
        <textarea id="t-desc" value={description} onChange={e=>setDescription(e.target.value)} aria-describedby={errors.description ? 'err-desc' : undefined} />
        {errors.description && <small id="err-desc" role="alert" style={{color:'red'}}>{errors.description}</small>}
      </div>

      <div>
        <button type="submit">{initial ? 'Update' : 'Create'}</button>
      </div>
    </form>
  )
}
