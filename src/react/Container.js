// external
import React from 'react'

// internal
import withRedux from './utils/withRedux'

class Container extends React.PureComponent {

  _getChildrenWithInheritedProps() {
    const { children, ...rest } = this.props

    return React.Children.map( children, child => {
      return React.cloneElement( child, { ...rest } )
    } )
  }

  render() {
    const children = this._getChildrenWithInheritedProps()

    class WrappedContainer extends Container {
      render() {
        const children = this._getChildrenWithInheritedProps()

        return (
          <React.Fragment>
            { children }
          </React.Fragment>
        )
      }
    }

    WrappedContainer.setProps       = this.constructor.setProps
    const ConnectedWrappedContainer = withRedux( WrappedContainer )

    return (
      <ConnectedWrappedContainer>
        { children }
      </ConnectedWrappedContainer>
    )
  }

}

export default Container
