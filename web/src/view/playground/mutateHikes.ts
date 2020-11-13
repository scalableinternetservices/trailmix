import { ApolloClient, gql } from '@apollo/client'
import {
  AddFavorite,
  AddFavoriteInput,
  AddFavoriteVariables,
  AddHike,
  AddHikeInput,
  AddHikeVariables
} from '../../graphql/query.gen'

const addHikeMutation = gql`
  mutation AddHike($input: AddHikeInput!) {
    addHike(input: $input)
  }
`

const addFavorite = gql`
  mutation AddFavorite($input: AddFavoriteInput!) {
    addFavorite(input: $input)
  }
`

export function addHikeToDB(client: ApolloClient<any>, input: AddHikeInput) {
  return client.mutate<AddHike, AddHikeVariables>({
    mutation: addHikeMutation,
    variables: { input },
  })
}

export const fetchHikes = gql`
  query FetchHikes {
    hikes {
      name
      summary
      length
      difficulty
    }
  }
`
export function favorite(client: ApolloClient<any>, input: AddFavoriteInput) {
  return client.mutate<AddFavorite, AddFavoriteVariables>({
    mutation: addFavorite,
    variables: { input },
  })
}
