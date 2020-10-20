import { Meta, Story } from '@storybook/react'
import * as React from 'react'
import mapIcon from '../public/assets/map-pin.svg'
import { TrailDesc, TrailTitle } from '../web/src/style/header'

export default {
  title: 'Trail',
} as Meta

interface trailInfo {
  title?: string
  description?: string
  icon?: HTMLImageElement
  onClick: () => void | undefined
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

function MakeTrail(args: trailInfo) {
  return (
    <div
      id="trailInfo"
      className="flex items-center pa2 hover-bg-light-green bg-washed-green"
      style={buttonStyle}
      onClick={() => console.log('CLICKED TRAIL')}
    >
      <img src={mapIcon} className="ph3" />
      <div className="flex flex-column">
        <TrailTitle className="pv2">{args.title}</TrailTitle>
        <TrailDesc className="pb2">{args.description} </TrailDesc>
      </div>
    </div>
  )
}
const TrailTemplate: Story = args => <MakeTrail {...args} />

export const Trail = TrailTemplate.bind({})
Trail.args = {
  title: 'Hollywood Sign Trail',
  description: 'Hike the Hollywood Sign!',
  //'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lacus viverra vitae congue eu consequat ac felis. Vel pretium lectus quam id. Est velit egestas dui id ornare arcu odio. Erat imperdiet sed euismod nisi porta lorem mollis. Tincidunt id aliquet risus feugiat in ante metus dictum. Quis eleifend quam adipiscing vitae proin sagittis nisl rhoncus. Lectus urna duis convallis convallis tellus id interdum velit. Eu augue ut lectus arcu. Vivamus at augue eget arcu dictum varius duis at consectetur. Id aliquet lectus proin nibh nisl condimentum id',
  icon: mapIcon,
  onClick: () => console.log('CLICKED TRAIL'),
}
