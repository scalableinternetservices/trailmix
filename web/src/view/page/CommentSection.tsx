import { RouteComponentProps } from '@reach/router'
import * as React from 'react'
import { Spacer } from '../../style/spacer'
import { AppRouteParams } from '../nav/route'
import { AuthorComment } from './AuthorComment'
import { CommentCard } from './Comment'

interface CommentsProps extends RouteComponentProps, AppRouteParams {
  comments: string[]
  names: string[]
  dates: string[]
}

export function CommentsSection(props: CommentsProps) {
  const [comments, setComments] = React.useState<string[]>(props.comments)
  const [names, setNames] = React.useState<string[]>(props.names)
  const [dates, setDates] = React.useState<string[]>(props.dates)

  return (
    <div>
      <Spacer $h4 />
      <div>
        <AuthorComment
          comments={comments}
          names={names}
          dates={dates}
          setCommentsCallback={setComments}
          setNamesCallback={setNames}
          setDatesCallback={setDates}
        />
      </div>
      <Spacer $h4 />
      <div>
        {comments.map((comment, index) => (
          // eslint-disable-next-line react/jsx-key
          <CommentCard message={comment} name={names[index]} time={dates[index]} />
        ))}
      </div>
      <Spacer $h4 />
    </div>
  )
}
