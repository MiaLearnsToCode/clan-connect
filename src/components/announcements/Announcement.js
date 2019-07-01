import React from 'react'
import { Link } from 'react-router-dom'

const Announcement = ({text, user, comments, _id}) => {
  return(
    <div className ="container announcement">
      <h3 className="title is-4"> {user.username} said :</h3>
      <p className="subtitle is-4"> {text} </p>
      <hr />
      {comments.map(comment => {
        return <div key={comment._id} className="comment">
          <p className="subtitle is-5"> <strong>{comment.user.username}</strong>: {comment.text}</p>
        </div>
      })
      }
      <br />
      <div className="has-text-centered">
        <Link to={`/families/${user.family}/announcements/${_id}`} className="button is-danger"> Join this conversation </Link>
      </div>
    </div>
  )
}

export default Announcement
