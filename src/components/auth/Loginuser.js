import React from 'react'
import axios from 'axios'
import Auth from '../../lib/Auth'

class Login extends React.Component {
  constructor() {
    super()

    this.state = { data: {}, error: ''}
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    const name = e.target.name
    const value = e.target.value
    const data = { ...this.state.data, [name]: value}
    this.setState({ data, error: '' })
  }

  handleSubmit(e) {
    e.preventDefault()
    axios.post(`/api/families/${this.props.match.params.familyId}/login`, this.state.data, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(res => {
        Auth.setToken(res.data.token)
        this.props.history.push(`/families/${this.props.match.params.familyId}/announcements`)
      })
      .catch(() => this.setState({ error: 'Invalid Crendentials'}))
  }



  render() {
    return(
      <main className="section">
        <div className="container">
          <h1 className="title is-3">Login to your existing account</h1>
          <h2 className="subtitle is-3">Enter your details to see what is happening in your clan</h2>
          <form onSubmit={this.handleSubmit}>
            <div className="field">
              <p className="control">
                <label className="label">Email</label>
                <input
                  className={`input ${this.state.error ? 'is-danger' : ''}`}
                  type="email"
                  name="email"
                  placeholder="📧 Email"
                  onChange={this.handleChange}
                />
              </p>
            </div>
            <div className="field">
              <p className="control">
                <label className="label">Password</label>
                <input
                  className={`input ${this.state.error ? 'is-danger' : ''}`}
                  type="password"
                  name="password"
                  placeholder="🔒 Password"
                  onChange={this.handleChange}
                />
              </p>
            </div>
            {this.state.error && <small className="help is-danger">{this.state.error}</small>}
            <br />
            <div className="field">
              <p className="control">
                <button className="button is-danger" type="submit">
                Login
                </button>
              </p>
            </div>
          </form>
        </div>
      </main>
    )
  }
}

export default Login
