import React from 'react'
import './Exist.css'

function ExistsAlert({message, onClose}) {
  return (
    <div className="alert-overlay">
      <div className="alert-box">
        <p>{message}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  )
}

export default ExistsAlert
