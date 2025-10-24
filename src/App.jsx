import React, { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import Landing from './pages/Landing'
import AuthLogin from './pages/AuthLogin'
import AuthSignup from './pages/AuthSignup'
import Dashboard from './pages/Dashboard'
import Tickets from './pages/Tickets'
// import { getSession } from "./lib/auth"
import ProtectedRoute from './components/ProtectedRoute'
import Toast from './components/Toast'

export default function App(){
  const [toast, setToast] = useState(null)
  const showToast = (msg, type='info') => {
    setToast({ msg, type })
    setTimeout(()=> setToast(null), 3500)
  }

  return (
    <>
      <Layout showToast={showToast}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/auth/login" element={<AuthLogin showToast={showToast} />} />
          <Route path="/auth/signup" element={<AuthSignup showToast={showToast} />} />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard showToast={showToast}/>
            </ProtectedRoute>
          } />
          <Route path="/tickets" element={
            <ProtectedRoute>
              <Tickets showToast={showToast}/>
            </ProtectedRoute>
          } />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
      {toast && <Toast {...toast} />}
    </>
  )
}
