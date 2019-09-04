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

  getAnnouncement() {
    axios.get(`/api/families/${this.props.match.params.familyId}/announcements/${this.props.match.params.id}`, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(res => this.setState({ announcement: res.data }))
      .catch(err => console.log(err))
  }

  addLike(comment) {
    axios.post(`/api/families/${this.props.match.params.familyId}/announcements/${this.props.match.params.id}/likes`, comment ,{
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(console.log(comment))
      .then(() => this.getAnnouncement())
      .then(() => console.log(this.state))
      .catch(err => console.log(err))
  }

  handleChange(e) {
    const name = e.target.name
    const value = e.target.value
    this.setState({ name, value })
    console.log(this.state.announcement.comments[0])
  }

  handleSubmit(e) {
    e.preventDefault()
    const newComment = { [this.state.name]: this.state.value }
    axios.post(`/api/families/${this.props.match.params.familyId}/announcements/${this.props.match.params.id}/comments`, newComment, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(() => this.getAnnouncement())
      .then(() => this.setState({ name: '', value: '' }))
      .catch(err => console.log(err.response))
  }

  handleDelete() {
    axios.delete(`/api/families/${this.props.match.params.familyId}/announcements/${this.props.match.params.id}/comments/`, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(() => this.props.history.push(`/families/${this.state.announcement.family}/announcements`))
      .catch(err => console.log(err.response))
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
                      <span className="like-count">{comment.likeCount}</span>
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

