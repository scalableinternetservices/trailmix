import { ApolloClient, gql } from '@apollo/client'
import { AddHike, AddHikeInput, AddHikeVariables } from '../../graphql/query.gen'

const addHikeMutation = gql`
  mutation AddHike($input: AddHikeInput!) {
    addHike(input: $input)
  }
`

export function addHikeToDB(client: ApolloClient<any>, input: AddHikeInput) {
  return client.mutate<AddHike, AddHikeVariables>({
    mutation: addHikeMutation,
    variables: { input },
  })
}
