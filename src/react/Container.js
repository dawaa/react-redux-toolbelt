// external
import React from 'react'

class Container extends React.PureComponent {

  _getChildrenWithInheritedProps() {
    const { children, ...rest } = this.props

    return React.Children.map( children, child => {
      return React.cloneElement( child, { ...rest } )
    } )
  }

  render() {
    const children = this._getChildrenWithInheritedProps()

    return (
      <React.Fragment>
        { children }
      </React.Fragment>
    )
  }

}

export default Container
