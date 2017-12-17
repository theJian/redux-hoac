import actionTypes from './actionTypes';

const isIgnorable = action => action && action.type === actionTypes.CANCEL;

const middleware = ({ dispatch, getState }) => next => action => {
  if (typeof action === 'function') {
    action = action(dispatch, getState);
  }

  if (!isIgnorable(action)) next(action);
}

export default middleware;
