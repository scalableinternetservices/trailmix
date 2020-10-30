import { RouteComponentProps } from '@reach/router'
import * as React from 'react'
import { useEffect, useState } from 'react'
import { H2 } from '../../style/header'
import { Spacer } from '../../style/spacer'
import { IntroText } from '../../style/text'
import { AppRouteParams } from '../nav/route'
import { default as HikeList, Trail } from './HikeList'
import { Page } from './Page'

interface HikesPageProps extends RouteComponentProps, AppRouteParams {}

function convertZipToCoords(zipcode: string) {
  const zipCodeNum = Number(zipcode)
  //const { loading, data } = useQuery<FetchLatLon>(fetchLatLon)
  console.log('GRAPHQL inside convert function')
  // console.log(loading)
  // console.log(data)
  console.log(zipCodeNum)
  return 3
}

// eslint-disable-next-line @typescript-eslint/no-unusedvars
// export default class HikingPage extends Component<HikesPageProps> {
export function HikingPage(props: HikesPageProps) {
  // constructor(props: HikesPageProps) {
  // super(props)
  const [trails, setTrails] = useState([] as Trail[])
  const [lat, setLat] = useState('')
  const [lon, setLon] = useState('')
  const [zip, setZip] = useState('')

  // this.state = { trails: [], lat: '', lon: '', zip: '' }
  // this.getHikes = this.getHikes.bind(this)
  // this.handleLatChange = this.handleLatChange.bind(this)
  // this.handleLonChange = this.handleLonChange.bind(this)
  // this.handleZipChange = this.handleZipChange.bind(this)
  //}
  // state = {
  //   trails: [],
  //   lat: '',
  //   lon: '',
  //   zip: '',
  // }
  useEffect(() => {
    const zipcode = Number(zip)
    // const { loading, data } = useQuery<FetchLatLon, FetchLatLonVariables>(fetchLatLon, {
    //   variables: { zipcode },
    // })
    console.log('inside effect')
    console.log(zipcode)
    // console.log(loading)
    // console.log(data)
  }, [zip])
  async function getHikes(event: any) {
    event.preventDefault()
    const key = '200944544-1e585b592713e202989908ebc84f8478'
    // const { loading, data } = useQuery<FetchLatLon>(fetchLatLon)
    console.log('GRAPHQL')
    // console.log(loading)
    // console.log(data)
    console.log('before zip conversion')
    const convertFunction = convertZipToCoords(zip)
    console.log('back in async')
    console.log(convertFunction)
    setLat(lat)
    setLon(lon)
    // const lat = this.state.lat
    // const lon = this.state.lon
    await fetch(
      'https://www.hikingproject.com/data/get-trails?lat=' + lat + '&lon=' + lon + '&maxDistance=10&key=' + key
    )
      .then(response => {
        return response.text()
      })
      .then(hikes => {
        let jsonObj = JSON.parse(hikes)
        let array: Trail[] = []
        for (let entry of jsonObj.trails) {
          let a: Trail = {
            id: entry.id,
            name: entry.name,
            length: entry.length,
            description: entry.summary,
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
          array.push(a)
        }
        // this.setState({
        //   trails: array,
        // })
        setTrails(array)
        console.log(hikes)
      })
      .catch(() => console.log('Can’t access hiking api response. Blocked by browser?'))
  }
  function handleLatChange(event: any) {
    setLat(event.target.value)
  }
  function handleLonChange(event: any) {
    setLon(event.target.value)
  }
  function handleZipChange(event: any) {
    setZip(event.target.value)
  }
  // render() {
  const hikes = trails
  return (
    <Page>
      <H2>Get Hikes Near You!</H2>
      <Spacer $h4 />
      <IntroText>Enter your zip code and get nearest hikes!</IntroText>
      <Spacer $h4 />
      <form onSubmit={getHikes}>
        <label>
          Zip Code:
          <input value={zip} onChange={handleZipChange} />
        </label>
        <label>
          Latitude:
          <input value={lat} onChange={handleLatChange} />
        </label>
        <label>
          Longitude:
          <input value={lon} onChange={handleLonChange} />
        </label>
        <button onClick={getHikes}>Find Hikes</button>
      </form>
      <HikeList allHikes={hikes} />
    </Page>
  )
}
//}
