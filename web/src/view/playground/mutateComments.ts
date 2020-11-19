import { ApolloClient, gql } from '@apollo/client'
import {
  AddComment,
  AddCommentInput,
  AddCommentVariables,
  DownvoteComment,
  DownvoteCommentVariables,
  DownvoteInput,
  UpvoteComment,
  UpvoteCommentVariables,
  UpvoteInput
} from '../../graphql/query.gen'

const addCommentMutation = gql`
  mutation AddComment($input: AddCommentInput!) {
    addComment(input: $input)
  }
`

export function addCommentToDB(client: ApolloClient<any>, input: AddCommentInput) {
  return client.mutate<AddComment, AddCommentVariables>({
    mutation: addCommentMutation,
    variables: { input },
  })
}

export const fragmentComment = gql`
  fragment Comment on Comment {
    name
    text
    date
    hike {
      id
    }
  }
`

export const fetchComments = gql`
  query FetchComments {
    comments {
      ...Comment
    }
    ${fragmentComment}
  }
`
const upvoteCommentMutation = gql`
  mutation UpvoteComment($input: UpvoteInput!) {
    upvoteComment(input: $input)
  }
`

export function upvote(client: ApolloClient<any>, input: UpvoteInput) {
  return client.mutate<UpvoteComment, UpvoteCommentVariables>({
    mutation: upvoteCommentMutation,
    variables: { input },
  })
}

const downvoteCommentMutation = gql`
  mutation DownvoteComment($input: DownvoteInput!) {
    downvoteComment(input: $input)
  }
`

export function downvote(client: ApolloClient<any>, input: DownvoteInput) {
  return client.mutate<DownvoteComment, DownvoteCommentVariables>({
    mutation: downvoteCommentMutation,
    variables: { input },
  })
}
