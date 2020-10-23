import * as React from 'react'

interface commentInfo {
  name?: string
  message?: string
  time?: string
}

interface commentStyle {
  outline: string
  width: string
  borderRadius: string
  opacity: number
}

const buttonStyle: commentStyle = {
  outline: 'none',
  width: '100%',
  borderRadius: '25px',
  opacity: 1,
}

export function CommentCard(props: commentInfo) {
  return (
    <div className="d-flex align-items-start pa3 bg-light-blue" style={buttonStyle}>
      <div className="mr-3 bg-light rounded">{props.name}</div>
      {/* <img
        className="mr-3 bg-light rounded"
        // src={} //TODO: use dog api to get user photos
        alt={args.name}
      /> */}

      <div className="media-body p-2 shadow-sm rounded bg-light border">
        <small className="float-right text-muted">{props.time}</small>
        <h6 className="mt-0 mb-1 text-muted">{name}</h6>
        {props.message}
      </div>
    </div>
  )
}