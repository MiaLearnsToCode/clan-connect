import React from 'react'
import axios from 'axios'
import Auth from '../../lib/Auth'

class Registeruser extends React.Component {
  constructor() {
    super()

    this.state = { data: {}}
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault()
    axios.post(`/api/families/${this.props.match.params.familyId}/register`, this.state.data, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(() => this.props.history.push(`/families/${this.props.match.params.familyId}/login`))
      .catch(err => console.log(err.response))
  }

  handleChange(e) {
    const name = e.target.name
    const value = e.target.value
    const data = { ...this.state.data, [name]: value}
    this.setState({ data })
  }

  render() {
    return(
      <section className="section">
        <div className="container">
          <h1 className="title is-3">Create your new account</h1>
          <h2 className="subtitle is-3">Enter your details to join in your clan</h2>
          <form onSubmit={this.handleSubmit}>
            <div className="field">
              <p className="control">
                <label className="label">Username</label>
                <input
                  className="input"
                  name="username"
                  placeholder="🧘 Username"
                  onChange={this.handleChange}
                />
              </p>
            </div>
            <div className="field">
              <p className="control">
                <label className="label">Email</label>
                <input
                  className="input"
                  name="email"
                  type="email"
                  placeholder="📧 Email"
                  onChange={this.handleChange}
                />
              </p>
            </div>
            <div className="field">
              <p className="control">
                <label className="label">Password</label>
                <input
                  className="input"
                  type="password"
                  name="password"
                  placeholder="🔒 Password"
                  onChange={this.handleChange}
                />
              </p>
            </div>
            <div className="field">
              <p className="control">
                <label className="label">Password Confirmation</label>
                <input
                  className="input"
                  type="password"
                  name="passwordConfirmation"
                  placeholder="🔒 Password confirmation"
                  onChange={this.handleChange}
                />
              </p>
            </div>
            <br />
            <div className="field">
              <p className="control">
                <button className="button is-danger" type="submit">
                Register
                </button>
              </p>
            </div>
          </form>
        </div>
      </section>
    )
  }
}

export default Registeruser
