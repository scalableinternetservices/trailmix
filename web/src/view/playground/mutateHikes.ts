import { ApolloClient, gql } from '@apollo/client'
import {
  AddFavorite,
  AddFavoriteInput,
  AddFavoriteVariables,
  AddHike,
  AddHikeInput,
  AddHikeVariables,
  RemoveFavorite,
  RemoveFavoriteInput,
  RemoveFavoriteVariables
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
const removeFavorite = gql`
  mutation RemoveFavorite($input: RemoveFavoriteInput!) {
    removeFavorite(input: $input)
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
      id
      name
      summary
      length
      difficulty
      location
      stars
    }
  }
`

export const fetchHikesCoordinates = gql`
  query FetchHikesCoordinates($latitude: Int!, $longitude: Int!) {
    hikes(latitude: $latitude, longitude: $longitude) {
      id
      name
      summary
      length
      difficulty
      location
      stars
    }
  }
`

export function favorite(client: ApolloClient<any>, input: AddFavoriteInput) {
  return client.mutate<AddFavorite, AddFavoriteVariables>({
    mutation: addFavorite,
    variables: { input },
  })
}

export function unfavorite(client: ApolloClient<any>, input: RemoveFavoriteInput) {
  return client.mutate<RemoveFavorite, RemoveFavoriteVariables>({
    mutation: removeFavorite,
    variables: { input },
  })
}
