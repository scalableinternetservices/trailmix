import renderer from 'react-test-renderer'
import { TrailInfoCard } from '../../web/src/view/page/TrailInfo'
test('Math.random() returns value between 0 and 1', () => {
  expect(Math.random()).toBeGreaterThanOrEqual(0)
  expect(Math.random()).toBeLessThan(1)
})

const args = {
  title: 'Hollywood Sign Trail',
  description: 'Hike the Hollywood Sign!',
  onClick: () => console.log('CLICKED TRAIL'),
}
test('trail card renders correctly', () => {
  const tree = renderer.create(TrailInfoCard({ ...args })).toJSON()
  expect(tree).toMatchSnapshot()
})
