import * as React from 'react'

interface commentInfo {
  name?: string
  message?: string
  time?: string
}

export function CommentCard(args: commentInfo) {
  return (
    <div className="media mb-3">
      <img
        className="mr-3 bg-light rounded"
        width="48"
        height="48"
        // src={} //TODO: use dog api to get user photos
        alt={args.name}
      />

      <div className="media-body p-2 shadow-sm rounded bg-light border">
        <small className="float-right text-muted">{args.time}</small>
        <h6 className="mt-0 mb-1 text-muted">{name}</h6>
        {args.message}
      </div>
    </div>
  )
}
