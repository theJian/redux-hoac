import assert from 'assert';
import actionTypes from '../src/utils/actionTypes';
import cancel from '../src/cancel';

describe('cancel', () => {
  it('returns a action for cancellation', () => {
    const action = cancel();
    assert.equal(action.type, actionTypes.CANCEL);
  })
})
