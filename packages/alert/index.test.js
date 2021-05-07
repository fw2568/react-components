import Alert from './'
import { render, screen } from '@testing-library/react'
import props from './props'
import { getTestValues } from 'swingset/testing'

const defaultProps = getTestValues(props)

describe('<Alert />', () => {
  test('renders correctly', () => {
    const { container } = render(
      <Alert {...defaultProps} className="g-alert" />
    )
    const rootElem = container.firstChild
    expect(rootElem).toHaveClass('g-alert')
    expect(rootElem).toHaveClass(defaultProps.product)
    expect(rootElem).toHaveClass(defaultProps.textColor)
    expect(rootElem).toHaveAttribute('href', defaultProps.url)
    expect(screen.getByTestId('tag')).toHaveTextContent(defaultProps.tag)
    expect(screen.getByTestId('text')).toHaveTextContent(defaultProps.text)
  })
})
