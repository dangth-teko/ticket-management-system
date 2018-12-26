import React from 'react'
import './Logo.css'

const Logo = props => {
  console.log(props.src)
  return (
    <div className="logo">
      <img src="assets/avatars/teko-vietnam-logo.png" />
    </div>
  )
}

export default Logo