import React from 'react'

export default function Toast({ msg, type = 'info' }){
  // Minimal visual variants for toast types. Inline styles keep this self-contained.
  const variantStyles = {
    success: { background: '#2f855a', color: '#fff' }, // green
    error: { background: '#b00020', color: '#fff' },   // red
    info: { background: '#111', color: '#fff' }        // dark
  }

  const style = { 
    ...variantStyles[type] || variantStyles.info,
    padding: '0.8rem 1rem',
    borderRadius: 8,
    boxShadow: '0 8px 30px rgba(0,0,0,0.2)',
    maxWidth: '420px'
  }

  // Use assertive for errors so screen readers announce them promptly
  const ariaLive = type === 'error' ? 'assertive' : 'polite'

  return (
    <div className="toast" role="status" aria-live={ariaLive} style={style}>
      {msg}
    </div>
  )
}
