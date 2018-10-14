// external
import React       from 'react'
import { connect } from 'react-redux'

/**
 * Helper to wrap a Component with connect()() and pass in
 * mapStateToProps, mapDispatchToProps.
 *
 * Usage:
class SomeContainer extends React.Component {
  static setProps = {
    fromState: state => ({
    }),
    fromDispatch: dispatch => ({
    }),
  }

  // .. code
}

export default withRedux( SomeContainer )
 */
const withRedux = (Component) => {
  let mapStateToProps    = null
  let mapDispatchToProps = null

  if ( Component.setProps ) {
    mapStateToProps    = Component.setProps.fromState || null
    mapDispatchToProps = Component.setProps.fromDispatch || null
  }

  return connect( mapStateToProps, mapDispatchToProps )( Component )
}

export default withRedux
