import { RouteComponentProps } from '@reach/router';
import { Component } from 'react';
import { AppRouteParams } from '../nav/route';
import { TrailInfoCard } from './TrailInfo';

//const TD = style('td', 'mid-gray pa3 v-mid', { minWidth: '7em' })

interface HikingListProps extends RouteComponentProps, AppRouteParams {
  allHikes: Trail[];
}
export interface Trail {
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
        return TrailInfoCard({
            title: item.name,
            description: item.description,
        })
      })
    )
  }
}
