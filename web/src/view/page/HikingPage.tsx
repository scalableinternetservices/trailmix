import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { RouteComponentProps } from '@reach/router'
import * as React from 'react'
import { Component } from 'react'
import { H2 } from '../../style/header'
import { Spacer } from '../../style/spacer'
import { IntroText } from '../../style/text'
import { AppRouteParams } from '../nav/route'
import { default as HikeList, Trail } from './HikeList'
import { Page } from './Page'

interface HikesPageProps extends RouteComponentProps, AppRouteParams {}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default class HikingPage extends Component<HikesPageProps> {
  constructor(props: HikesPageProps) {
    super(props);
    this.state = {trails: [], zip: ''};
    this.getHikes = this.getHikes.bind(this);
    this.handleZipChange = this.handleZipChange.bind(this);
  }
  state = {
    trails: [],
    zip: '',
  }
  async getHikes(event: any){
    event.preventDefault();
    const key = '200944544-1e585b592713e202989908ebc84f8478'
    //TODO: CONVERT FROM ZIP CODE TO LAT LON
    console.log(this.state.zip);
    const lat = 38;
    const lon = -122;
    //END TODO
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
  handleZipChange(event: any) {
    this.setState({zip: event.target.value});
  }
  render(){
    const hikes = this.state.trails;
    return (
    <Page>
        <H2>Get Hikes Near You!</H2>
        <Spacer $h4 />
        <IntroText>Enter your location and get nearest hikes!</IntroText>
        <Spacer $h4 />
        <form onSubmit={this.getHikes}>
          <div>
            <TextField id="filled-number"
              placeholder="90024"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              label="Zipcode"
              value={this.state.zip}
              onChange={this.handleZipChange} />
            <Button onClick={this.getHikes}>Find Hikes</Button>
          </div>
        </form>
        <HikeList allHikes={hikes} />
    </Page>
  )
}
}
