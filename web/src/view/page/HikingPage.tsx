import { useQuery } from '@apollo/client'
import { LinearProgress } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { RouteComponentProps } from '@reach/router'
import * as React from 'react'
import { Component } from 'react'
import { getApolloClient } from '../../graphql/apolloClient'
import { FetchLatLon, FetchLatLonVariables } from '../../graphql/query.gen'
import { H2 } from '../../style/header'
import { Spacer } from '../../style/spacer'
import { IntroText } from '../../style/text'
import { AppRouteParams } from '../nav/route'
import { addHikeToDB } from '../playground/mutateHikes'
import { fetchLatLon } from './fetchLatLon'
import { default as HikeList, Trail } from './HikeList'
import { Page } from './Page'

interface HikesPageProps extends RouteComponentProps, AppRouteParams {}

let zipcode: number
let lat: number
let lon: number
let getHikesButton = false

function GetLatLon({ children }: any) {
  if (zipcode) {
    const { data, error, loading } = useQuery<FetchLatLon, FetchLatLonVariables>(fetchLatLon, {
      variables: { zipcode },
    })
    if (data && data.coordinates) {
      lat = data.coordinates.lat
      lon = data.coordinates.lon
      getHikesButton = true
    } else if (loading) {
      return null
    } else if (error) {
      return null
    }
    return (
      <div>
        <Spacer $h4 />
        <IntroText>
          You are near latitude {lat} and longitude {lon}.
        </IntroText>
      </div>
    )
  } else {
    return null
  }
}

export default class HikingPage extends Component<HikesPageProps> {
  constructor(props: HikesPageProps) {
    super(props)
    this.state = { trails: [], zip: '', loading: false }
    this.getHikes = this.getHikes.bind(this)
    this.handleZipChange = this.handleZipChange.bind(this)
    this.handleLatLonChange = this.handleLatLonChange.bind(this)
  }
  state = {
    trails: [],
    zip: '',
    loading: false,
  }

  async addHikeInformation(hike: Trail) {
    await addHikeToDB(getApolloClient(), {
      id: parseInt(hike.id),
      name: hike.name,
      stars: hike.stars,
      summary: hike.summary,
      location: hike.location,
      difficulty: hike.difficulty,
      length: hike.length,
    })
  }

  async getHikes(event: any) {
    event.preventDefault()
    this.setState({ loading: true })
    const key = '200944544-1e585b592713e202989908ebc84f8478'

    if (lat && lon) {
      await fetch(
        'https://www.hikingproject.com/data/get-trails?lat=' + lat + '&lon=' + lon + '&maxDistance=10&key=' + key
      )
        .then(response => {
          return response.text()
        })
        .then(hikes => {
          const jsonObj = JSON.parse(hikes)
          const array: Trail[] = []
          for (const entry of jsonObj.trails) {
            const a: Trail = {
              id: entry.id,
              name: entry.name,
              length: entry.length,
              summary: entry.summary,
              difficulty: entry.difficulty,
              stars: entry.stars,
              starVotes: entry.starVotes,
              location: entry.location,
              conditionStatus: entry.conditionStatus,
              conditionDetails: entry.conditionDetails,
              conditionDate: entry.conditionDate,
              lat: entry.latitude,
              lon: entry.longitude,
            }
            void this.addHikeInformation(a)
            array.push(a)
          }
          this.setState({
            trails: array,
            loading: false,
          })
        })
        .catch(() => console.log('Can’t access hiking api response. Blocked by browser?'))
    }
  }
  handleZipChange(event: any) {
    this.setState({ zip: event.target.value })
  }
  handleLatLonChange() {
    getHikesButton = true
    return (
      <div>
        {(zipcode = Number(this.state.zip))}
        <GetLatLon>{({ data, error, loading }: any) => console.log(data)}</GetLatLon>
        {this.setState({ lat: lat, lon: lon })}
      </div>
    )
  }
  render() {
    const hikes = this.state.trails
    let progress = null
    if (this.state.loading) {
      progress = <LinearProgress />
    }
    return (
      <Page>
        <H2>Get Hikes Near You!</H2>
        <Spacer $h4 />
        <IntroText>Enter your location and get nearest hikes!</IntroText>
        <Spacer $h4 />
        <form onSubmit={this.handleLatLonChange}>
          <div>
            <TextField
              id="filled-number"
              placeholder="90024"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              label="Zipcode"
              value={this.state.zip}
              error={this.state.zip.length !== 5 && this.state.zip.length !== 0}
              onChange={this.handleZipChange}
            />
            <Button disabled={this.state.zip.length !== 5} onClick={this.handleLatLonChange}>
              Submit
            </Button>
            <GetLatLon>{({ data, error, loading }: any) => console.log(data)}</GetLatLon>
            {getHikesButton ? (
              <div className="v-mid">
                <Spacer $h4 />
                <Button variant="contained" color="primary" size="medium" onClick={this.getHikes}>
                  Get Hikes
                </Button>
              </div>
            ) : null}
          </div>
        </form>
        {progress}
        <HikeList allHikes={hikes} />
      </Page>
    )
  }
}
