import React from 'react'
import axios from 'axios'
import Auth from '../../lib/Auth'

class Show extends React.Component {
  constructor() {
    super()

    this.state = { announcement: {}, name: '', value: ''}
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }

  componentDidMount() {
    this.getAnnouncement()
  }

  getAnnouncement() {
    axios.get(`/api/families/${this.props.match.params.familyId}/announcements/${this.props.match.params.id}`, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(res => this.setState({announcement: res.data}))
      .then(() => console.log(this.state))
      .catch(err => console.log(err))
  }

  handleChange(e) {
    const name = e.target.name
    const value = e.target.value
    this.setState({name, value})
    console.log(this.state.announcement.comments[0])
  }

  handleSubmit(e) {
    e.preventDefault()
    const newComment = {[this.state.name]: this.state.value}
    axios.post(`/api/families/${this.props.match.params.familyId}/announcements/${this.props.match.params.id}/comments`, newComment, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(() => this.getAnnouncement())
      .then(() => this.setState({name: '', value: ''}))
      .catch(err => console.log(err.response))
  }

  handleDelete() {
    axios.delete(`/api/families/${this.props.match.params.familyId}/announcements/${this.props.match.params.id}/comments/`, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(() => this.props.history.push(`/families/${this.state.announcement.family}/announcements`))
      .catch(err => console.log(err.response))
  }

  isOwner() {
    return Auth.getPayload().user === this.state.announcement.user._id
  }

  render() {
    if (!this.state.announcement) return null
    return(
      <section className="section">
        {this.state.announcement.user &&
          <div>
            <p className="subtitle is-3"> <strong>{this.state.announcement.user.username}</strong> said: </p>
            <p className="subtitle is-4"> {this.state.announcement.text} </p>
            <hr />
            {this.state.announcement.comments.map(comment => {
              return <div key={comment._id} className="comment">
                <p className="subtitle is-5"> <strong>{comment.user.username}</strong>: {comment.text}</p>
              </div>
            })
            }
            <hr />
            <form onSubmit={this.handleSubmit} className="post">
              <div className="field">
                <p className="control">
                  <input
                    className="input"
                    name="text"
                    placeholder="Leave a comment"
                    value={this.state.value}
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
            {this.isOwner() &&
              <div>
                <button
                  className="button is-danger"
                  onClick={this.handleDelete}
                >Delete this converation
                </button>
              </div>
            }
          </div>
        }
      </section>
    )
  }
}

export default Show


// axios.delete(`/api/families/${this.props.match.params.familyId}/announcements/${this.props.match.params.id}`, {
//   headers: { Authorization: `Bearer ${Auth.getToken()}` }
// })
//   .then(() => this.props.history.push(`/families/${this.state.announcement.family}/announcements`))
//   .catch(err => console.log(err.response))
