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
const Container = require( '../src/react/Container' ).default
const withRedux = require( '../src/react/utils/withRedux' ).default

describe( 'Container', () => {
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

  it('should wrap Component', () => {
    class TestContainer extends Container {
    }

    class TestComponent extends React.Component {
      render() {
        return <div />
      }
    }

    component = mountWithStore(() => (
      <TestContainer>
        <TestComponent />
      </TestContainer>
    ))

    component.find( 'TestContainer' ).length.should.equal( 1 )
    component.find( 'TestContainer' ).children().length.should.equal( 1 )
    component.find( 'TestComponent' ).length.should.equal( 1 )
  })

  it('should wrap Component with a connected Container and pass props to child component', () => {
    class TestContainer extends Container {
      static setProps = {
        fromState : state => ({
          isAuthorized : state.user.isAuthorized,
        }),
      }
    }

    class TestComponent extends React.Component {
      render() {
        return <div />
      }
    }

    component = mountWithStore(() => (
      <TestContainer>
        <TestComponent />
      </TestContainer>
    ))

    const childProps = component.find( 'TestComponent' ).props()
    childProps.should.deep.equal({
      isAuthorized : true,
      dispatch     : mockStore.dispatch,
    })
  })

  it('should wrap Component with two connected Containers and pass props to child component', () => {
    class OuterTestContainer extends Container {
      static setProps = {
        fromState : state => ({
          isAuthorized : state.user.isAuthorized,
        }),
      }
    }

    const fakeActionFn = sandbox.stub()
    class InnerTestContainer extends Container {
      static setProps = {
        fromDispatch : dispatch => ({
          loginUser : fakeActionFn,
        }),
      }
    }

    class TestComponent extends React.Component {
      render() {
        return <div />
      }
    }

    component = mountWithStore(() => (
      <OuterTestContainer>
        <InnerTestContainer>
          <TestComponent />
        </InnerTestContainer>
      </OuterTestContainer>
    ))

    const childProps = component.find( 'TestComponent' ).props()
    childProps.should.deep.equal({
      isAuthorized : true,
      dispatch     : mockStore.dispatch,
      loginUser    : fakeActionFn,
    })
  })

  it.skip('should override outer prop with a warning', () => {
    class OuterTestContainer extends Container {
      static setProps = {
        fromState : state => ({
          isAuthorized : true,
        }),
      }
    }

    const fakeActionFn = sandbox.stub()
    class InnerTestContainer extends Container {
      static setProps = {
        fromState : state => ({
          isAuthorized : false,
          userId       : 1,
        }),
        fromDispatch : dispatch => ({
          loginUser : fakeActionFn,
        }),
      }
    }

    class TestComponent extends React.Component {
      render() {
        return <div />
      }
    }

    component = mountWithStore(() => (
      <OuterTestContainer>
        <InnerTestContainer>
          <TestComponent />
        </InnerTestContainer>
      </OuterTestContainer>
    ))

    const childProps = component.find( 'TestComponent' ).props()
    childProps.should.deep.equal({
      isAuthorized : false,
      userId       : 1,
      dispatch     : mockStore.dispatch,
      loginUser    : fakeActionFn,
    })
  })
} )
