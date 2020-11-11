import * as React from 'react'
import { TrailDesc, TrailTitle } from '../../style/header'

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
    </div>
  )
}
