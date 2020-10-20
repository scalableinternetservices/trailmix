import * as React from 'react'
import { TrailDesc, TrailTitle } from '../../style/header'

interface trailInfo {
  title?: string
  description?: string
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

var buttonStyle: trailStyle = {
  outline: 'none',
  width: '40%',
  borderRadius: '25px',
  opacity: 1,
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
        <TrailTitle className="pv2">{args.title}</TrailTitle>
        <TrailDesc className="pb2">{args.description} </TrailDesc>
      </div>
    </div>
  )
}
