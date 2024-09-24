import React from 'react'
import './Invalid.css'

function Invalid({message, onClose}) {
  return (
    <div className="alert-overlay">
      <div className="alert-box">
        <p>{message}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  )
}

export default Invalid
