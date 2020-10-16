import { RouteComponentProps } from '@reach/router'
import * as React from 'react'
import { Component } from 'react'
import { ColorName, Colors } from '../../../../common/src/colors'
import { H2 } from '../../style/header'
import { Spacer } from '../../style/spacer'
import { style } from '../../style/styled'
import { IntroText } from '../../style/text'
import { AppRouteParams } from '../nav/route'
import HikeList from './HikeList'
import { Page } from './Page'

interface LecturesPageProps extends RouteComponentProps, AppRouteParams {}
interface Trail {
  title: string
  description: string
}
const Table = style('table', 'w-100 ba b--black')

const Section = style('div', 'mb4 mid-gray ba b--mid-gray br2 pa3', (p: { $color?: ColorName }) => ({
  borderLeftColor: Colors[p.$color || 'lemon'] + '!important',
  borderLeftWidth: '3px',
}))

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default class HikingPage extends Component<LecturesPageProps> {
  constructor(props: LecturesPageProps) {
    super(props);
    this.state = {trails: [], lat: '', lon: ''};
    this.getHikes = this.getHikes.bind(this);
  }
  state = {
    trails: [],
    lat: '40.0274',
    lon: '-105.2519',
  }
  getHikes(){
    const key = '200944544-1e585b592713e202989908ebc84f8478'
    const lat = this.state.lat
    const lon = this.state.lon
    fetch('https://www.hikingproject.com/data/get-trails?lat='+lat+'&lon='+lon+'&maxDistance=10&key='+key)
      .then(response => {
        return response.text();
      })
      .then(hikes => {
        let jsonObj = JSON.parse(hikes)
        let array: Trail[] = [];
        for(let entry of jsonObj.trails){
          let a:Trail = {
            title: entry.name,
            description: entry.location,
          }
          array.push(a);
        }
        this.setState({
          trails: array,
        })
        console.log(hikes);
      })
  }

  render(){
    const hikes = this.state.trails;
    return (
    <Page>
      <Section>
        <H2>Lectures</H2>
        <Spacer $h4 />
        <IntroText>Lecture slides and code will be posted regularly. Schedule subject to change.</IntroText>
        <Spacer $h4 />
        <Table>
          <tbody>
            <button onClick={this.getHikes}>GET HIKES</button>
            {/* <form>
              <input type='text'>Latitude</input>
              <input type='text'>Longitude</input>
            </form> */}
            <HikeList allHikes={hikes} />
          </tbody>
        </Table>
      </Section>
    </Page>
  )
}
}
