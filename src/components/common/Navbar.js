import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import Auth from '../../lib/Auth'

class Navbar extends React.Component {
  constructor() {
    super()

    this.state = {}
    this.toggleNavbar = this.toggleNavbar.bind(this)
    this.logout = this.logout.bind(this)
  }

  logout() {
    Auth.logout()
    this.props.history.push('/')
  }

  toggleNavbar() {
    this.setState({ navbarOpen: !this.state.navbarOpen})
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.setState({ navbarOpen: false })
    }
  }

  render() {
    return (
      <nav className="navbar is-danger" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <Link to="/" className="navbar-item logo">
            ClanConnect
          </Link>

        </div>
        <div className="navbar-end">
          {Auth.isAuthenticated() &&
            <div className="dropdown is-right is-hoverable">
              <div className="dropdown-trigger">
                <button className="button logout" aria-haspopup="true" aria-controls="dropdown-menu4">
                  <span className="icon is-large">
                    🔓
                  </span>
                </button>
              </div>
              <div className="dropdown-menu" id="dropdown-menu4" role="menu">
                <div className="dropdown-content">
                  <div className="dropdown-item">
                    <a className="navbar-item is-danger" onClick={this.logout}>Logout</a>
                  </div>
                </div>
              </div>
            </div>
          }
        </div>
      </nav>
    )
  }
}


export default withRouter(Navbar)
