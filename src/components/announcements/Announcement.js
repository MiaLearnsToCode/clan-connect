import React from 'react'
import { Link } from 'react-router-dom'

const Announcement = ({ text, user, comments, _id, createdAt }) => {
  return (
    <article className="message">
      <div className="message-header">
        <p>{user.username}: {text}</p>
        {new Date(createdAt).toLocaleString().substring(0, 17)}
      </div>
      <div className="message-body">
        <p>{comments.length} messages in this chat</p>
        <hr />
        <div className="has-text-centered">
          <Link to={`/families/${user.family}/announcements/${_id}`} className="button is-medium"> Join this conversation </Link>
        </div>
      </div>
    </article>
  )
}

export default Announcement
