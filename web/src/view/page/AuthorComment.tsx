import * as React from 'react'
import { useState } from 'react'
import { Button } from '../../style/button'
import { Input } from '../../style/input'

// interface AuthorCommentProps {
//   comments: JSX.Element[]
//   updateCommentsCallback: React.Dispatch<React.SetStateAction<JSX.Element>>
// }

interface AuthorCommentProps {
  comments: string[]
  names: string[]
  dates: string[]
  setCommentsCallback: React.Dispatch<React.SetStateAction<string[]>>
  setNamesCallback: React.Dispatch<React.SetStateAction<string[]>>
  setDatesCallback: React.Dispatch<React.SetStateAction<string[]>>
}

export function AuthorComment(props: AuthorCommentProps) {
  const [name, setName] = useState('')
  const [comment, setComment] = useState('')

  function submitComment() {
    const d = new Date()

    props.setCommentsCallback([comment, ...props.comments])
    props.setNamesCallback([name, ...props.names])
    props.setDatesCallback([d.toLocaleTimeString() + ', ' + d.toLocaleDateString(), ...props.dates])
  }

  return (
    <>
      <div className="mt3">
        <label className="db fw4 lh-copy f6" htmlFor="name">
          Name
        </label>
        <Input $onChange={setName} $onSubmit={submitComment} name="name" type="name" />
      </div>
      <div className="mt3">
        <label className="db fw4 lh-copy f6" htmlFor="comment">
          Comment
        </label>
        <Input $onChange={setComment} $onSubmit={submitComment} name="comment" type="comment" />
      </div>
      <div className="mt3">
        <Button onClick={submitComment}>Submit</Button>
      </div>
    </>
  )
}
