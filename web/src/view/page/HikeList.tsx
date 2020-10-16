import { RouteComponentProps } from '@reach/router';
import { Component } from 'react';
import { AppRouteParams } from '../nav/route';
import { TrailInfoCard } from './TrailInfo';
<<<<<<< HEAD
=======

//const TR = style('tr', 'ba b--black')
>>>>>>> 1ae13e4... Added basic functionality given lat and lon

//const TD = style('td', 'mid-gray pa3 v-mid', { minWidth: '7em' })

interface HikingListProps extends RouteComponentProps, AppRouteParams {
  allHikes: Trail[];
}
<<<<<<< HEAD
<<<<<<< HEAD
export interface Trail {
=======
interface Trail {
>>>>>>> 1ae13e4... Added basic functionality given lat and lon
=======
export interface Trail {
>>>>>>> 95e41fe... Fixed links
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

export default class HikeList extends Component<HikingListProps> {
  constructor(props: HikingListProps){
    super(props);
  }
  render() {
    return (
      this.props.allHikes.map(item => {
<<<<<<< HEAD
<<<<<<< HEAD
        return TrailInfoCard({
            title: item.name,
            description: item.description,
        })
      })
=======
        return TrailInfoCard(
          {
            title: item.name,
            description: item.description,
          })
        }
      )
>>>>>>> 1ae13e4... Added basic functionality given lat and lon
=======
        return TrailInfoCard({
            title: item.name,
            description: item.description,
        })
      })
>>>>>>> 34ac353... Updated db values for zipcode
    )
  }
}