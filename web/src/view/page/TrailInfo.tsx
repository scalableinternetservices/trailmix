import Checkbox from '@material-ui/core/Checkbox'
import HeartIcon from '@material-ui/icons/Favorite'
import * as React from 'react'
import { getApolloClient } from '../../graphql/apolloClient'
import { TrailDesc, TrailTitle } from '../../style/header'
import { favorite } from '../playground/mutateHikes'

interface trailInfo {
  id?: number
  title?: string
  description?: string
  distance?: string
  difficulty?: string
  stars?: number
  icon?: undefined | string
  onClick?: () => void | undefined
}

interface trailStyle {
  background?: string
  outline: string
  width: string
  borderRadius: string
  opacity: number
}

const buttonStyle: trailStyle = {
  outline: 'none',
  width: '70%',
  borderRadius: '25px',
  opacity: 1,
}

function getStars(args: number | undefined) {
  if (args == undefined) {
    return ''
  }
  let str = ' '
  for (let i = 0; i < args; i++) {
    str += '☆'
  }
  console.log(str)
  return str
}
async function addFav(hike: trailInfo) {
  if (hike.id == null || hike.title == null || hike.difficulty == null || hike.stars == null || hike.description) {
    return
  }
  void favorite(getApolloClient(), {
    hike: {
      id: hike.id,
      name: hike.title,
      summary: hike.description,
      distance: hike.distance,
      difficulty: hike.difficulty,
      stars: hike.stars,
    },
  })
}
export function TrailInfoCard(args: trailInfo) {
  return (
    <div
      id="trailInfo"
      className="flex items-center pa2 hover-bg-light-green bg-washed-green"
      style={buttonStyle}
      onClick={args.onClick}
    >
      <img src={args.icon ? args.icon : undefined} className="ph3" />
      <div className="flex flex-column">
        <div>
          <TrailTitle className="pv2">{args.title}</TrailTitle>
          <TrailTitle className="pv2">{getStars(args.stars)}</TrailTitle>
        </div>
        <TrailTitle className="pv2">
          {'Trail Length: ' + args.distance + ' miles Difficulty: ' + args.difficulty}
        </TrailTitle>
        <TrailDesc className="pb2">{args.description} </TrailDesc>
      </div>
      <Checkbox onClick={() => addFav(args)} icon={<HeartIcon />} checkedIcon={<HeartIcon />} name="checkedH" />
    </div>
  )
}
