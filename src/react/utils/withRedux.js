// external
import React                  from 'react'
import { connect }            from 'react-redux'
import { bindActionCreators } from 'redux'

/**
 * Helper to wrap a Component with connect()() and pass in
 * mapStateToProps, mapDispatchToProps.
 *
 * Usage:
 *  class SomeContainer extends React.Component {
 *    static setProps = {
 *      fromState: state => ({
 *      }),
 *      fromDispatch: dispatch => ({
 *      }),
 *    }
 *
 *    // .. code
 *  }
 *
 *  export default withRedux( SomeContainer )
 */
const withRedux = (Component) => {
  const mapStateToProps    = Component.setProps.fromState || null
  const mapDispatchToProps = Component.setProps.fromDispatch || null

  return connect( mapStateToProps, mapDispatchToProps )( Component )
}

export default withRedux
