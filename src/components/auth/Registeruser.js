import React from 'react'
import axios from 'axios'
import Auth from '../../lib/Auth'

class Registeruser extends React.Component {
  constructor() {
    super()

    this.state = { data: {}, errors: {} }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    const name = e.target.name
    const value = e.target.value
    const data = { ...this.state.data, [name]: value }
    const errors = { ...this.state.errors, [name]: '' }
    this.setState({ data, errors })
  }

  handleSubmit(e) {
    e.preventDefault()
    axios.post(`/api/families/${this.props.match.params.familyId}/register`, this.state.data, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(() => this.props.history.push(`/families/${this.props.match.params.familyId}/login`))
      .catch(err => this.setState({ errors: err.response.data.errors }))
  }



  render() {
    return (
      <section className="section">
        <div className="container">
          <h1 className="title is-3">Create your new account</h1>
          <h2 className="subtitle is-3">Enter your details to join in your clan</h2>
          <form onSubmit={this.handleSubmit}>
            <div className="field">
              <p className="control">
                <label className="label">Username</label>
                <input
                  className={`input ${this.state.errors.username ? 'is-danger' : ''}`}
                  name="username"
                  placeholder="🧘 Username"
                  onChange={this.handleChange}
                />
              </p>
            </div>
            {this.state.errors.username && <small className="help is-danger">{this.state.errors.username}</small>}
            <div className="field">
              <p className="control">
                <label className="label">Email</label>
                <input
                  className={`input ${this.state.errors.email ? 'is-danger' : ''}`}
                  name="email"
                  type="email"
                  placeholder="📧 Email"
                  onChange={this.handleChange}
                />
              </p>
            </div>
            {this.state.errors.email && <small className="help is-danger">{this.state.errors.email}</small>}
            <div className="field">
              <p className="control">
                <label className="label">Password</label>
                <input
                  className={`input ${this.state.errors.password ? 'is-danger' : ''}`}
                  type="password"
                  name="password"
                  placeholder="🔒 Password"
                  onChange={this.handleChange}
                />
              </p>
            </div>
            {this.state.errors.password && <small className="help is-danger">{this.state.errors.password}</small>}
            <div className="field">
              <p className="control">
                <label className="label">Password Confirmation</label>
                <input
                  className={`input ${this.state.errors.passwordConfirmation ? 'is-danger' : ''}`}
                  type="password"
                  name="passwordConfirmation"
                  placeholder="🔒 Password confirmation"
                  onChange={this.handleChange}
                />
              </p>
            </div>
            {this.state.errors.passwordConfirmation && <small className="help is-danger">{this.state.errors.passwordConfirmation}</small>}
            <br />
            <div className="field">
              <p className="control">
                <button className="button" type="submit">
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
