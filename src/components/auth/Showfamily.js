import React from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import Auth from '../../lib/Auth'

class Showfamily extends React.Component {
  constructor() {
    super()
    this.state = { family: {}}
  }

  componentDidMount() {
    axios.get(`/api/families/${this.props.match.params.familyId}`, this.state.data, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(res => this.setState({ family: res.data }))
      .catch(err => console.log(err))
  }

  render() {
    if(!this.state.family) return null
    return(
      <section className="section is-fullheight-with-navbar">
        <div className="has-text-centered">
          <div className="container">
            <h1 className="title is-3">
              {`Welcome back to the ${this.state.family.family} clan`}
            </h1>
            <h2 className="subtitle is-3">
             Would you like to:
            </h2>
            <br />
            <Link to={`/families/${this.state.family._id}/register`} className="button is-medium is-danger">
              Register an account
            </Link>
            <Link to={`/families/${this.state.family._id}/login`} className="button is-medium is-danger">
              Login to your account
            </Link>


          </div>
        </div>
      </section>
    )
  }

}

export default Showfamily