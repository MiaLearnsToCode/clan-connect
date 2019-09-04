import React from 'react'
import { Link } from 'react-router-dom'

const Homepage = () => {
  return (
    <section className="homepage is-fullheight-with-navbar">
      <div className="columns is-mobile is-multiline">
        <div className="column is-full-mobile is-full-tablet is-one-fifth-desktop"></div>
        <div className="column container is-full-mobile is-full-tablet is-three-fifths-desktop homepage-content">
          <div>
            <h1 className="title is-1">Welcome to Clan Connect</h1>
          </div>
          <br />
          <div>
            <h2 className="subtitle is-3">The platform that allows families to connect</h2>
          </div>
          <div>
            <Link to="/registerfamily" className="button is-medium">
              Create a new clan
            </Link>
            <Link to="/loginfamily" className="button is-medium">
              Join an existing clan
            </Link>
          </div>
        </div>
        <div className="column is-full-mobile is-full-tablet is-one-fifth-desktop"></div>
      </div>
    </section>
  )
}

export default Homepage
