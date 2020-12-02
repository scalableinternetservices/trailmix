import { useQuery } from '@apollo/client'
import { LinearProgress } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { RouteComponentProps } from '@reach/router'
import * as React from 'react'
import { Component } from 'react'
import { getApolloClient } from '../../graphql/apolloClient'
import { FetchComments, FetchLatLon, FetchLatLonVariables } from '../../graphql/query.gen'
import { H2 } from '../../style/header'
import { Spacer } from '../../style/spacer'
import { IntroText } from '../../style/text'
import { AppRouteParams } from '../nav/route'
import { fetchComments } from '../playground/mutateComments'
import { addHikeToDB } from '../playground/mutateHikes'
import { fetchLatLon } from './fetchLatLon'
import { default as HikeList, Trail } from './HikeList'
import { Page } from './Page'

interface HikesPageProps extends RouteComponentProps, AppRouteParams {}

let zipcode: number
let lat: number
let lon: number
let getHikesButton = false
let idArr: number[] = []
let com_map: Map<number, string[]>
let name_map: Map<number, string[]>
let date_map: Map<number, string[]>

function GetLatLon({ children }: any) {
  if (zipcode) {
    const { data, error, loading } = useQuery<FetchLatLon, FetchLatLonVariables>(fetchLatLon, {
      variables: { zipcode },
    })
    console.log(idArr)
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
        <GetComments>{({ data, error, loading }: any) => console.log(data)}</GetComments>
      </div>
    )
  } else {
    return null
  }
}

function GetComments({ children }: any) {
  console.log(idArr)
  const { data } = useQuery<FetchComments>(fetchComments)
  console.log(data)
  if (data) {
    idArr.forEach(function (id) {
      const d = data.comments.filter(c => c.hikeNum !== id)
      if (d !== null) {
        const com_arr: string[] = []
        const names_arr: string[] = []
        const dates_arr: string[] = []
        d.forEach(function (arrayItem) {
          com_arr.push(arrayItem.text)
          names_arr.push(arrayItem.name)
          dates_arr.push(arrayItem.date)
        })
        com_map.set(id, com_arr)
        name_map.set(id, names_arr)
        date_map.set(id, dates_arr)
      }
      console.log(d)
    })
    idArr = []
  }
  return null
}

export default class HikingPage extends Component<HikesPageProps> {
  constructor(props: HikesPageProps) {
    super(props)
    this.state = { trails: [], zip: '', loading: false }
    this.getHikes = this.getHikes.bind(this)
    this.handleZipChange = this.handleZipChange.bind(this)
    this.handleLatLonChange = this.handleLatLonChange.bind(this)
    com_map = new Map<number, string[]>()
    name_map = new Map<number, string[]>()
    date_map = new Map<number, string[]>()
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
      latitude: hike.latitude,
      longitude: hike.longitude,
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
            if (entry.id != null && entry.id != undefined) {
              idArr.push(entry.id)
            }
            let comArr = com_map.get(entry.id)
            let nameArr = name_map.get(entry.id)
            let dateArr = date_map.get(entry.id)
            if (comArr == null) {
              comArr = []
            }
            if (nameArr == null) {
              nameArr = []
            }
            if (dateArr == null) {
              dateArr = []
            }
            const a: Trail = {
              id: entry.id,
              name: entry.name,
              length: entry.length,
              summary: entry.summary,
              difficulty: entry.difficulty,
              stars: entry.stars,
              starVotes: entry.starVotes,
              location: entry.location,
              latitude: entry.latitude,
              longitude: entry.longitude,
              conditionStatus: entry.conditionStatus,
              conditionDetails: entry.conditionDetails,
              conditionDate: entry.conditionDate,
              comments: comArr,
              names: nameArr,
              dates: dateArr,
            }
            array.push(a)
          }
          this.setState({
            trails: array,
            loading: false,
          })
        })
        .catch(error => console.error(error))
      for (const trail of this.state.trails) {
        console.log(trail)
        void this.addHikeInformation(trail)
      }
    }
  }
  handleZipChange(event: any) {
    this.setState({ zip: event.target.value })
  }
  handleLatLonChange(event: any) {
    getHikesButton = true
    zipcode = Number(this.state.zip)
    this.setState({ lat: lat, lon: lon })
    event.preventDefault()
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
              error={
                this.state.zip.length !== 0 && (this.state.zip.length !== 5 || /^\d+$/.test(this.state.zip) == false)
              }
              onChange={this.handleZipChange}
            />
            <Button
              disabled={this.state.zip.length !== 5 || /^\d+$/.test(this.state.zip) == false}
              onClick={this.handleLatLonChange}
            >
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
