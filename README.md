# redux-hoax
Higher-order action creators for Redux


## Installation
```
npm install --save redux-hoax
```

## Usage

### Dispatch a action exactly once.

```js
// Import specific utils by path
import once from 'redux-hoax/once';

// Your action creator
const actionCreator = () => ({ type: 'INITIALIZE' });

// Creator a action that can only be dispatched once
const actionOnce = once(actionCreator);

dispatch(actionOnce()); // Dispatch succeeded

dispatch(actionOnce()): // Dropped and will never reach the store
```

### Create action payload from current app state

```js
import withStore from 'redux-hoax/withStore';

const actionCreator = message => ({
  type: 'NEW_MESSAGE',
  payload: {
    message
  }
});

// Select if current user is active
const isUserActive = store => store.userStatus === 'ACTIVE';

const messageNotifyActionCreator = withStore(
  // Only turn on notifies when user is active
  store => ({ notify: isUserActive(store) })
)(actionCreator);

// Dispatch a action with payload merged with the result of withStore
// {
//   ...
//   payload: { message, notify }
//   ...
// }
dispatch(messageNotifyActionCreator(message));
```


## License

MIT
