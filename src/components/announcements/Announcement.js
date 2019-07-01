import React from 'react'
import { Link } from 'react-router-dom'

const Announcement = ({text, user, comments, _id}) => {
  return(
    <article className="message">
      <div className="message-header">
        <p>{user.username}: {text}</p>
      </div>
      <div className="message-body">
        <p>{comments.length} messages in this chat</p>
        <hr />
        <div className="has-text-centered">
          <Link to={`/families/${user.family}/announcements/${_id}`} className="button is-danger"> Join this conversation </Link>
        </div>
      </div>
    </article>
  )
}

export default Announcement
