import React from 'react'
import axios from 'axios'
import Auth from '../../lib/Auth'

class Show extends React.Component {
  constructor() {
    super()

    this.state = { announcement: {}, name: '', value: '', users: [] }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.addLike = this.addLike.bind(this)
  }

  componentDidMount() {
    this.getAnnouncement()
  }

  getAnnouncement = async () => {
    try {
      const res = await axios.get(`/api/families/${this.props.match.params.familyId}/announcements/${this.props.match.params.id}`, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      this.setState({ announcement: res.data })
    } catch {
      this.props.history.push('/error')
    }
  }

  addLike = async (comment) => {
    try {
      await axios.post(`/api/families/${this.props.match.params.familyId}/announcements/${this.props.match.params.id}/likes`, comment, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      this.getAnnouncement()
    } catch {
      this.props.history.push('/error')
    }
  }

  handleChange({ target: { name, value } }) {
    this.setState({ name, value })
  } 

  handleSubmit = async (e) => {
    e.preventDefault()
    const newComment = { [this.state.name]: this.state.value }
    try {
      await axios.post(`/api/families/${this.props.match.params.familyId}/announcements/${this.props.match.params.id}/comments`, newComment, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      this.getAnnouncement()
      this.setState({ name: '', value: '' })
    } catch {
      this.props.history.push('/error')
    }
  }

  handleDelete = async () => {
    try {
      await axios.delete(`/api/families/${this.props.match.params.familyId}/announcements/${this.props.match.params.id}`, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      this.props.history.push(`/families/${this.state.announcement.family}/announcements`)
    } catch {
      this.props.history.push('/error')
    }
  }

  userArray() {
    const arrayUsers = this.state.announcement.comments.map(comment => {
      return comment.user.username
    })
    const uniqueArrayUsers = [...new Set(arrayUsers)]
    return uniqueArrayUsers
  }

  isOwner() {
    return Auth.getPayload().user === this.state.announcement.user._id
  }

  isOwnerComment(comment) {
    return Auth.getPayload().user === comment.user._id
  }

  render() {
    if (!this.state.announcement) return null
    return (
      <section className="section show">
        <div className="columns is-mobile is-multiline">
          <div className="column is-full-mobile is-full-tablet is-one-fifth-desktop"></div>
          <div className="column container chat-box is-full-mobile is-full-tablet is-three-fifths-desktop homepage-content">
            {this.state.announcement.user &&
            <div>
              <div className="announcement-users">
                <p className="subtitle is-4">Users who are part of this conversation:</p>
                <br />
                {
                  this.userArray().map(username => {
                    return <span key={username}>{username}</span>
                  })
                }
              </div>
              <p className="subtitle is-3"> <strong>{this.state.announcement.user.username}</strong> said: </p>
              <p className="subtitle is-4"> {this.state.announcement.text} </p>
              <hr />
              {this.state.announcement.comments.map(comment => {
                return <div key={comment._id}>
                  
                  <div className={` ${this.isOwnerComment(comment) ? 'comment' : 'usercomment'} `} >
                    <p className="subtitle is-5"> <strong>{comment.user.username}</strong>: {comment.text}</p>
                  </div>
                  
                  {!this.isOwnerComment(comment) &&
                    <div className="like-content">
                      <button
                        className="button like"
                        onClick={() => this.addLike(comment)}
                      > 💚
                      </button>
                      <span className="like-count">{comment.likes.length}</span>
                    </div>
                  }
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
                      placeholder="Reply"
                      value={this.state.value}
                      onChange={this.handleChange}
                    />
                  </p>
                </div>
                <div className="field">
                  <p className="control">
                    <button className="button send" type="submit">
                    🏹
                    </button>
                  </p>
                </div>
              </form>
              {this.isOwner() &&
                <div>
                  <button
                    className="button"
                    onClick={this.handleDelete}
                  >Delete this converation
                  </button>
                </div>
              }
            </div>
            }
          </div>
          <div className="column is-full-mobile is-full-tablet is-one-fifth-desktop"></div>
        </div>
      </section>
    )
  }
}

export default Show

