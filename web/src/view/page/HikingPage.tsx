import { RouteComponentProps } from '@reach/router'
import * as React from 'react'
import { Component } from 'react'
import { H2 } from '../../style/header'
import { Spacer } from '../../style/spacer'
import { IntroText } from '../../style/text'
import { AppRouteParams } from '../nav/route'
import HikeList from './HikeList'
import { Page } from './Page'

interface HikesPageProps extends RouteComponentProps, AppRouteParams {}
interface Trail {
  id: string
  name: string
  length: number
  description: string
  difficulty: string
  stars: number
  starVotes: number
  location: string
  conditionStatus: string
  conditionDetails: string
  conditionDate: string
  lat: number,
  lon: number,
}

// const Section = style('div', 'mb4 mid-gray ba b--mid-gray br2 pa3', (p: { $color?: ColorName }) => ({
//   borderLeftColor: Colors[p.$color || 'lemon'] + '!important',
//   borderLeftWidth: '3px',
// }))

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default class HikingPage extends Component<HikesPageProps> {
  constructor(props: HikesPageProps) {
    super(props);
    this.state = {trails: [], lat: '', lon: ''};
    this.getHikes = this.getHikes.bind(this);
    this.handleLatChange = this.handleLatChange.bind(this);
    this.handleLonChange = this.handleLonChange.bind(this);
  }
  state = {
    trails: [],
    lat: '40.0274',
    lon: '-105.2519',
  }
  async getHikes(event: any){
    event.preventDefault();
    const key = '200944544-1e585b592713e202989908ebc84f8478'
    const lat = this.state.lat
    const lon = this.state.lon
    await fetch('https://www.hikingproject.com/data/get-trails?lat='+lat+'&lon='+lon+'&maxDistance=10&key='+key)
      .then(response => {
        return response.text();
      })
      .then(hikes => {
        let jsonObj = JSON.parse(hikes)
        let array: Trail[] = [];
        for(let entry of jsonObj.trails){
          let a:Trail = {
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
          array.push(a);
        }
        this.setState({
          trails: array,
        })
        console.log(hikes);
      })
      .catch(() => console.log("Can’t access hiking api response. Blocked by browser?"))
  }
  handleLatChange(event: any) {
    this.setState({lat: event.target.value});
  }
  handleLonChange(event: any) {
    this.setState({lon: event.target.value});
  }
  render(){
    const hikes = this.state.trails;
    return (
    <Page>
        <H2>Get Hikes Near You!</H2>
        <Spacer $h4 />
        <IntroText>Enter your Latitude and Longitude and get nearest hikes!</IntroText>
        <Spacer $h4 />
        <form onSubmit={this.getHikes}>
          <label>
            Latitude:
            <input value={this.state.lat} onChange={this.handleLatChange} />
          </label>
          <label>
            Longitude:
            <input value={this.state.lon} onChange={this.handleLonChange} />
          </label>
          <button onClick={this.getHikes}>Find Hikes</button>
        </form>
        <HikeList allHikes={hikes} />
    </Page>
  )
}
}
