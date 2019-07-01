import React from 'react'
import axios from 'axios'
import Auth from '../../lib/Auth'

class Login extends React.Component {
  constructor() {
    super()

    this.state = { data: {}, error: '' }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault()
    axios.post('/api/loginfamily', this.state.data)
      .then(res => {
        Auth.setToken(res.data.token)
        this.props.history.push(`/families/${res.data.family._id}`)
      })
      .catch(() => this.setState({ error: 'Clan not found'}))
  }

  handleChange(e) {
    const name = e.target.name
    const value = e.target.value
    const data = { ...this.state.data, [name]: value}
    this.setState({ data, error: '' })
  }

  render() {
    return(
      <main className="section">
        <div className="container">
          <h1 className="title is-3">Join in an existing clan</h1>
          <h2 className="subtitle is-3">Whether you are an existing user or you are new here join your clan:</h2>
          <form onSubmit={this.handleSubmit}>
            <div className="field">
              <p className="control">
                <label className="label">Clan</label>
                <input
                  className={`input ${this.state.error ? 'is-danger' : ''} `}
                  name="family"
                  placeholder="Clan Name"
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
