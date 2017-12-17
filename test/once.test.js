import assert from 'assert';
import once from '../src/once';
import cancel from '../src/cancel';

describe('once', () => {
  function actionCreator(a, b) {
    return {
      type: 'ACTION_TYPE',
      payload: {
        a,
        b,
        c: a + b
      }
    }
  }

  it('returns the same action as wrapped action creator do', () => {
    const args = [1, 2];
    const onceActionCreator = once(actionCreator);
    const action = onceActionCreator(...args);
    assert.deepStrictEqual(action, actionCreator(...args));
  })

  it('return a cancellation action when invoked more than once', () => {
    let action;
    const args = [1, 2];
    const onceActionCreator = once(actionCreator);
    onceActionCreator(...args);

    action = onceActionCreator(...args);
    assert.deepStrictEqual(action, cancel());
  })
})
