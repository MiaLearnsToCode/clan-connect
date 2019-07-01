import React from 'react'
import { Link } from 'react-router-dom'

const Homepage = () => {
  return(
    <section className="hero is-fullheight-with-navbar">
      <div className="hero-body has-text-centered">
        <div className="container">
          <h1 className="title is-1">
            Welcome to Clan Connect
          </h1>
          <section></section>
          <h2 className="subtitle is-3">
            The platform that allows families to connect 
          </h2>
          <Link to="/registerfamily" className="button is-medium is-danger">
            Create a new clan
          </Link>
          <Link to="/loginfamily" className="button is-medium is-danger">
            Join an existing clan
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Homepage
