import Checkbox from '@material-ui/core/Checkbox'
import ThumbDownIcon from '@material-ui/icons/ThumbDown'
import ThumbUpIcon from '@material-ui/icons/ThumbUp'
import * as React from 'react'
import { getApolloClient } from '../../graphql/apolloClient'
import { DownvoteInput, UpvoteInput } from '../../graphql/query.gen'
import { Spacer } from '../../style/spacer'
import { downvote, upvote } from '../playground/mutateComments'

interface commentInfo {
  name: string
  message: string
  time: string
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
async function like(obj: UpvoteInput) {
  await upvote(getApolloClient(), obj)
}
async function unlike(obj: DownvoteInput) {
  await downvote(getApolloClient(), obj)
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
        <Spacer></Spacer>
        <Checkbox
          onClick={() => like({ name: props.name, text: props.message, date: props.time, id: 1 })}
          icon={<ThumbUpIcon />}
          checkedIcon={<ThumbUpIcon />}
          name="checkedH"
        />
        <Checkbox
          onClick={() => unlike({ name: props.name, text: props.message, date: props.time, id: 1 })}
          icon={<ThumbDownIcon />}
          checkedIcon={<ThumbDownIcon />}
          name="checkedH"
        />
      </div>
    </div>
  )
}
