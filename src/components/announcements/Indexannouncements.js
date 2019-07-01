import React from 'react'
import axios from 'axios'
import Auth from '../../lib/Auth'
import Announcement from './Announcement'

class Indexannouncements extends React.Component {
  constructor() {
    super()

    this.state = { announcements: [], name: '', value: ''}
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.getAnnouncements()
  }

  getAnnouncements() {
    axios.get(`/api/families/${this.props.match.params.familyId}/announcements`, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(res => this.setState({ announcements: res.data }))
      .catch(err => console.log(err))
  }

  handleChange(e) {
    const name = e.target.name
    const value = e.target.value
    this.setState({name, value})
  }

  handleSubmit(e) {
    e.preventDefault()
    const newPost = {[this.state.name]: this.state.value}
    axios.post(`/api/families/${this.props.match.params.familyId}/announcements`, newPost, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(() => this.getAnnouncements())
      .then(() => this.setState({name: '', value: ''}))
      .catch(err => console.log(err.response))
  }

  compareDates(a,b) {
    const dateA = new Date(a.updatedAt)
    const dateB = new Date(b.updatedAt)
    return dateB - dateA

  }

  render() {
    return(
      <section className="section">
        <h2 className="title is-3">Chat with the clan</h2>
        <form onSubmit={this.handleSubmit} className="post">
          <div className="field">
            <p className="control">
              <input
                className="input"
                name="text"
                placeholder="Share something"
                value = {this.state.value}
                onChange={this.handleChange}
              />
            </p>
          </div>
          <div className="field">
            <p className="control">
              <button className="button is-danger" type="submit">
              Post
              </button>
            </p>
          </div>
        </form>
        {this.state.announcements.sort(this.compareDates) && this.state.announcements.map(announcement => {
          return <Announcement key={announcement._id} {...announcement} />
        })
        }
      </section>
    )
  }
}

export default Indexannouncements