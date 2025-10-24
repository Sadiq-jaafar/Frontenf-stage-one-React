import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { mockLogin } from '../lib/auth'

export default function AuthLogin({ showToast }){
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [errors,setErrors] = useState({})
  const navigate = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    setErrors({})
    if(!email.trim()) return setErrors({email:'Email is required'})
    if(!password) return setErrors({password:'Password is required'})

    try {
      await mockLogin({email,password})
      showToast('Login successful','success')
      navigate('/dashboard')
    } catch(err){
      setErrors({form:err.message})
    }
  }

  return (
    <section className="profile-card card" aria-labelledby="login-title">
      <h2 id="login-title">Login</h2>
      <form onSubmit={submit} aria-describedby={errors.form ? 'login-error' : undefined} noValidate>
        {errors.form && <div id="login-error" role="alert" style={{color:'red'}}>{errors.form}</div>}
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" value={email} onChange={e=>setEmail(e.target.value)} aria-describedby={errors.email ? 'err-email' : undefined} />
          {errors.email && <small id="err-email" role="alert" style={{color:'red'}}>{errors.email}</small>}
        </div>
        <div className="form-group">
          <label htmlFor="pwd">Password</label>
          <input id="pwd" type="password" value={password} onChange={e=>setPassword(e.target.value)} aria-describedby={errors.password ? 'err-pwd' : undefined} />
          {errors.password && <small id="err-pwd" role="alert" style={{color:'red'}}>{errors.password}</small>}
        </div>

        <div style={{display:'flex', gap:8}}>
          <button type="submit">Login</button>
          <Link to="/auth/signup"><button type="button" className="secondary">Sign up</button></Link>
        </div>

        <p style={{marginTop:10, color:'#555'}}>Need an account? Click Sign up to create one.</p>
      </form>
    </section>
  )
}
