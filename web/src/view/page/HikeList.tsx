import { RouteComponentProps } from '@reach/router'
import * as React from 'react'
import { Component } from 'react'
import { style } from '../../style/styled'
import { AppRouteParams } from '../nav/route'

const TR = style('tr', 'ba b--black')

//const TD = style('td', 'mid-gray pa3 v-mid', { minWidth: '7em' })

interface HikingListProps extends RouteComponentProps, AppRouteParams {
  allHikes: Trail[];
}
interface Trail {
  title: string
  description: string
}

export default class HikeList extends Component<HikingListProps> {
  constructor(props: HikingListProps){
    super(props);
  }
  render() {
    return (
    <TR>
      {this.props.allHikes.map(item => {
        return <h3>{item.title + " " + item.description}</h3>
      })}
    </TR>
    )
  }
}