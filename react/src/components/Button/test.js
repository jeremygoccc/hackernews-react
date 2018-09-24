import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { Button } from './index'

Enzyme.configure({ adapter: new Adapter() })

describe('Button', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<Button>Give Me More</Button>, div)
  })
  test('has a valid snapshot', () => {
    const component = renderer.create(<Button>Give Me More</Button>)
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it('shows one button', () => {
    const element = shallow(
      <Button>Give Me More</Button>
    )
    expect(element.find('button').length).toBe(1)
  })
})