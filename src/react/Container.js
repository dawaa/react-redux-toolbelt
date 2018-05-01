// external
import React from 'react'

class Container extends React.PureComponent {

  render() {
    const Component = this.constructor.Component

    if ( Component == null ) {
      console.warn(
        `Failed to render ${ this.constructor.name }, missing Component ` +
        `on the instance.`
      )
    }

    return Component != null ? <Component { ...this.props } /> : null
  }

}

export default Container
