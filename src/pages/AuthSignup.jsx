import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { createUser, createSession } from '../lib/auth'

export default function AuthSignup({ showToast }){
  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [errors,setErrors] = useState({})
  const navigate = useNavigate()

  const submit = (e) => {
    e.preventDefault()
    const errs = {}
    if(!name.trim()) errs.name = 'Name required'
    if(!email.trim() || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) errs.email = 'Valid email required'
    if(!password || password.length < 6) errs.password = 'Password must be >= 6 chars'
    setErrors(errs)
    if(Object.keys(errs).length) return

    try {
      const user = createUser({ name, email, password })
      createSession(user)
      showToast('Account created — logged in', 'success')
      navigate('/dashboard')
    } catch (err) {
      setErrors({ form: err.message })
    }
  }

  return (
    <section className="profile-card card" aria-labelledby="signup-title">
      <h2 id="signup-title">Create Account</h2>
      <form onSubmit={submit} noValidate>
        <div className="form-group">
          <label htmlFor="name">Full name</label>
          <input id="name" type="text" value={name} onChange={e=>setName(e.target.value)} aria-describedby={errors.name ? 'err-name' : undefined} />
          {errors.name && <small id="err-name" role="alert" style={{color:'red'}}>{errors.name}</small>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" value={email} onChange={e=>setEmail(e.target.value)} aria-describedby={errors.email ? 'err-email' : undefined} />
          {errors.email && <small id="err-email" role="alert" style={{color:'red'}}>{errors.email}</small>}
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" value={password} onChange={e=>setPassword(e.target.value)} aria-describedby={errors.password ? 'err-password' : undefined} />
          {errors.password && <small id="err-password" role="alert" style={{color:'red'}}>{errors.password}</small>}
        </div>

        <div style={{display:'flex', gap:8}}>
          <button type="submit">Create account</button>
          <Link to="/auth/login"><button type="button" className="secondary">Back to login</button></Link>
        </div>
      </form>
    </section>
  )
}
