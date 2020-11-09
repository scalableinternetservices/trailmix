import { ApolloClient, gql } from '@apollo/client'
import { AddComment, AddCommentInput, AddCommentVariables } from '../../graphql/query.gen'

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
