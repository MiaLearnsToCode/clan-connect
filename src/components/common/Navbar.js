import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return(
    <nav className="navbar is-danger" role="navigation" aria-label="main navigation">

      <div className="navbar-menu">
        <div className="navbar-start">
          <Link to="/" className="navbar-item">
            ClanConnect
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
