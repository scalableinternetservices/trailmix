import React from 'react'
import CommentCard from './Comment'

type CommentCardType = typeof CommentCard

interface CommentListProps {
  comments: CommentCardType[]
  loading: boolean
}

export default function CommentList(props: CommentListProps) {
  return (
    <div className="commentList">
      <h5 className="text-muted mb-4">
        <span className="badge badge-success">{props.comments.length}</span> Comment
        {props.comments.length > 0 ? 's' : ''}
      </h5>

      {props.comments.length === 0 && !props.loading ? (
        <div className="alert text-center alert-info">Be the first to comment</div>
      ) : null}

      {props.comments.map((comment, index) => {
        return CommentCard(comment.arguments)
      })}
    </div>
  )
}
