# react-redux-toolbelt

Just nifty things I've come to want to use in every React project I work with
nowadays.


## Table of Contents
* [Installation](#installation)
* [Components](#components)
  * [Container](#container)
* [Helpers](#helper)
  * [withRedux](#withredux)


## Installation

```
$ npm|yarn install|add react-redux-toolbelt
```

Also make sure to add to your `.babelrc` the following to make use of the
static props in your classes.

```jsonc
{
    "plugins": [ "transform-class-properties" ]
}
```


## Components

#### Container

Easily create container components that clearly defines what parts of the Store or which dispatch actions it'll be passing to its Children. In combination with using the helper function `withRedux()`.

> However, **note** that nesting containers can result in overriding props set by the previous outer container.

```jsx
// external
import { bindActionCreators }   from 'redux'
import { Container, withRedux } from 'react-redux-toolbelt'

// internal
import login from './actions/somewhere/loginUser'

class UserContainer extends Container {
  static setProps = {
    fromState: state => ({
      authorized: state.user.isAuthorized,
    }),
    fromDispatch: dispatch => ({
      loginUser: bindActionCreators( login, dispatch ),
    }),
  }
}

export default withRedux( UserContainer )
```


## Helpers

#### withRedux

Again, demonstrating using a Container example. Though it could just as appropriately be used for any "type" of component, or just be used as a more describing way of setting your props as opposed to how you'd do it otherwise with `connect(state, dispatch)(Component)`

So the role of `withRedux()` is to take what you've defined under the static prop `setProps` and pass whatever it sees there to the Component as props.

```jsx
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
```
