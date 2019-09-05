import React from 'react'
import { Link } from 'react-router-dom'

const Error = () => {
  return (
    <section className="homepage is-fullheight-with-navbar">
      <div className="columns is-mobile is-multiline">
        <div className="column is-full-mobile is-full-tablet is-one-fifth-desktop"></div>
        <div className="column container is-full-mobile is-full-tablet is-three-fifths-desktop homepage-content">
          <div>
            <h1 className="title is-1">Ooops, something wrong</h1>
          </div>
          <div>
            <Link to="/" className="button is-medium">
              Back to homepage
            </Link>
          </div>
        </div>
        <div className="column is-full-mobile is-full-tablet is-one-fifth-desktop"></div>
      </div>
    </section>
  )
}

export default Error
