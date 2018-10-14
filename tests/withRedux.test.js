// external
import React                  from 'react'
import { Provider }           from 'react-redux'
import { bindActionCreators } from 'redux'
import { mount, shallow }     from 'enzyme'
import chai                   from 'chai'
import sinon                  from 'sinon'
import sinonChai              from 'sinon-chai'
chai.use( sinonChai )

const should = chai.should()

const sandbox = sinon.createSandbox()

// internal
const withRedux = require( '../src/react/utils/withRedux' ).default

describe( 'withRedux', () => {
  let component
  let mockStore

  function mountWithStore(Comp) {
    return mount(
      <Provider store={ mockStore }>
        <Comp />
      </Provider>
    )
  }

  beforeEach(() => {
    mockStore = {
      getState: sandbox.stub().returns({
        user: {
          isAuthorized : true,
        },
      }),
      dispatch: sandbox.stub(),
      subscribe: sandbox.stub()
    }
  })

  afterEach(() => {
    component = null
    mockStore = null
    sandbox.restore()
  })

  it('should just run through if `setProps` not defined', () => {
    class TestContainer extends React.Component {
      render() {
        return <div />
      }
    }

    component = mountWithStore( withRedux( TestContainer ) )

    const props = component.find( 'TestContainer' ).props()

    props.should.deep.equal({
      dispatch : mockStore.dispatch,
    })
  })

  it('should pass chosen parts of the state to the component as props', () => {
    class TestContainer extends React.Component {
      static setProps = {
        fromState: state => ({
          isAuthorized : state.user.isAuthorized,
        }),
      }

      render() {
        return <div />
      }
    }

    component = mountWithStore( withRedux( TestContainer ) )

    const props = component.find( 'TestContainer' ).props()

    props.should.deep.equal({
      dispatch     : mockStore.dispatch,
      isAuthorized : true,
    })
  })

  it('should pass dispatch methods to component as props', () => {
    const fakeActionFn = sandbox.stub()

    class TestContainer extends React.Component {
      static setProps = {
        fromDispatch : dispatch => ({
          loginUser : fakeActionFn,
        }),
      }

      render() {
        return <div />
      }
    }

    component = mountWithStore( withRedux( TestContainer ) )

    const props = component.find( 'TestContainer' ).props()

    props.should.deep.equal({
      loginUser : fakeActionFn,
    })
  })

  it('should pass chosen parts of the state and dispatch methods as props', () => {
    const fakeActionFn = sandbox.stub()

    class TestContainer extends React.Component {
      static setProps = {
        fromState: state => ({
          isAuthorized : state.user.isAuthorized,
        }),
        fromDispatch : dispatch => ({
          loginUser : fakeActionFn,
        }),
      }

      render() {
        return <div />
      }
    }

    component = mountWithStore( withRedux( TestContainer ) )

    const props = component.find( 'TestContainer' ).props()

    props.should.deep.equal({
      isAuthorized : true,
      loginUser    : fakeActionFn,
    })
  })
} )
