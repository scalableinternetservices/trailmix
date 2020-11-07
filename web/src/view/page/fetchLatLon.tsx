import { gql } from '@apollo/client'

export const fetchLatLon = gql`
  query FetchLatLon($zipcode: Int!) {
    coordinates(zipcode: $zipcode) {
      lat
      lon
    }
  }
`
