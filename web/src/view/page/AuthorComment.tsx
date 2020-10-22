import * as React from 'react'
import { Field } from './CommentField'
import { CommentForm } from './CommentForm'

export const AuthorComment: React.SFC = () => {
  return (
    <CommentForm
      action="http://localhost:4351/api/contactus"
      render={() => (
        <React.Fragment>
          <div className="alert alert-info" role="alert">
            Enter your Comment Below
          </div>
          <Field id="name" label="Name: " />
          <Field id="comment" label="Comment: " editor="multilinetextbox" />
        </React.Fragment>
      )}
    />
  )
}
