import assert from 'assert';
import middleware from '../src';
import actionTypes from '../src/utils/actionTypes';

describe('middleware', () => {
  const action = { type: 'UNKNOWN' };
  const canceled = { type: actionTypes.CANCEL };
  const dispatch = () => {};
  const getState = () => {};
  const nextHandler = middleware({ dispatch, getState });

  it('should ignore cancellation action', () => {
    let called = false;
    const actionHandler = nextHandler(action => {
      called = true;
    })

    actionHandler(canceled);
    assert.strictEqual(called, false);

    actionHandler(action);
    assert.strictEqual(called, true);
  })
})

