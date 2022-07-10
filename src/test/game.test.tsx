import React from 'react'
import renderer from 'react-test-renderer'
import App from '../App'

describe('The app', () => {
  it('Mounts the app', () => {
    const component = renderer.create(<App />)
    const result = component.toJSON()
    expect(result).toBeDefined()
  })
})
