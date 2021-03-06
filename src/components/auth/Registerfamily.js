import React from 'react'
import axios from 'axios'

class Register extends React.Component {
  constructor() {
    super()

    this.state = { data: {}, error: '' }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post('/api/registerfamily', this.state.data)
      this.props.history.push('/loginfamily')
    } catch {
      this.setState({ error: 'Clan already exists, try a different name' })
    }
  }

  handleChange({ target: { name, value } }) {
    const data = { ...this.state.data, [name]: value }
    this.setState({ data, error: ''  })
  }

  render() {
    return (
      <section className="section">
        <div className="container">
          <h1 className="title is-3">Create a new clan</h1>
          <h2 className="subtitle is-3">Simply choose a name and share it with your family members so they can join in</h2>
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
            <br/>
            <div className="field">
              <p className="control">
                <button className="button is-medium" type="submit">
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

export default Register
