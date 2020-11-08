import { Meta, Story } from '@storybook/react'
import * as React from 'react'
import { TrailInfoCard } from '../web/src/view/page/TrailInfo'

export default {
  title: 'Trail',
} as Meta

const TrailTemplate: Story = args => <TrailInfoCard {...args} />

export const Trail = TrailTemplate.bind({})
Trail.args = {
  title: 'Hollywood Sign Trail',
  description: 'Hike the Hollywood Sign!',
  //'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lacus viverra vitae congue eu consequat ac felis. Vel pretium lectus quam id. Est velit egestas dui id ornare arcu odio. Erat imperdiet sed euismod nisi porta lorem mollis. Tincidunt id aliquet risus feugiat in ante metus dictum. Quis eleifend quam adipiscing vitae proin sagittis nisl rhoncus. Lectus urna duis convallis convallis tellus id interdum velit. Eu augue ut lectus arcu. Vivamus at augue eget arcu dictum varius duis at consectetur. Id aliquet lectus proin nibh nisl condimentum id',
  // icon: mapIcon,
  onClick: () => console.log('CLICKED TRAIL'),
}
