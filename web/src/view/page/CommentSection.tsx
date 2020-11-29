import { useQuery } from '@apollo/client'
import { RouteComponentProps } from '@reach/router'
import * as React from 'react'
import { FetchComments } from '../../graphql/query.gen'
import { Spacer } from '../../style/spacer'
import { AppRouteParams } from '../nav/route'
import { fetchComments } from '../playground/mutateComments'
import { AuthorComment } from './AuthorComment'
import { CommentCard } from './Comment'

interface CommentsProps extends RouteComponentProps, AppRouteParams {
  comments: string[]
  names: string[]
  dates: string[]
  hikeid: number
}

export function CommentsSection(props: CommentsProps) {
  const [comments, setComments] = React.useState<string[]>(props.comments)
  const [names, setNames] = React.useState<string[]>(props.names)
  const [dates, setDates] = React.useState<string[]>(props.dates)
  //const [hikeid, setHikeId] = React.useState<number>(props.hikeid)

  const { data } = useQuery<FetchComments>(fetchComments)
  console.log(data)
  if (data) {
    data.comments.forEach(comment => {
      comments.push(comment.text)
      names.push(comment.name)
      dates.push(comment.date)
    })
  }

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
          hikeid={props.hikeid}
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
