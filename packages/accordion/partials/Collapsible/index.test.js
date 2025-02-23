import React from 'react'
import { render, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import Collapsible from './'

afterEach(cleanup)

describe('<Collapsible />', () => {
  it('should render a `.g-collapsible` <div> root element', () => {
    const { container } = render(<Collapsible>Hello world</Collapsible>)
    const rootElem = container.firstChild
    expect(rootElem.tagName).toBe('DIV')
    expect(rootElem).toHaveClass('g-collapsible')
  })

  it('should render text children', () => {
    const someText = 'This is some test text for this test'
    const { getByText } = render(<Collapsible>{someText}</Collapsible>)
    expect(getByText(someText)).toBeInTheDocument()
  })

  it('should render arbitrary React children', () => {
    const altText = 'Alt text on an image element'
    const { getByAltText } = render(
      <Collapsible>
        <img src="" alt={altText} />
      </Collapsible>
    )
    expect(getByAltText(altText)).toBeInTheDocument()
  })
})
