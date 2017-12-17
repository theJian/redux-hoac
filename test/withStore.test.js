import assert from 'assert';
import withStore from '../src/withStore';
import middleware from '../src';

describe('withStore', () => {
  const store = {
    a: 'a',
    b: 'b',
    arr: ['x', 'y', 'z']
  }
  const getState = () => store;
  const dispatch = () => {};
  const nextHandler = middleware({ dispatch, getState });

  it('should pass store and merge additional payload', done => {
    const actionCreator = () => ({ type: 'UNKNOWN' });
    const selector = store => ({ a: store.a });
    const actionCreatorWithStore = withStore(selector)(actionCreator);
    const action = actionCreatorWithStore();

    nextHandler(action => { 
      assert.deepStrictEqual(action, Object.assign(
        {},
        actionCreator(),
        {
          payload: selector(store),
        }
      ))
      done();
    })(action);
  })

  it('should pass store and arguments and merge additional payload', done => {
    const index = 1;
    const actionCreator = () => ({ type: 'UNKNOWN' });
    const selector = store => index => ({ item: store.arr[index] })
    const actionCreatorWithStore = withStore(selector)(actionCreator);
    const action = actionCreatorWithStore(index);

    nextHandler(action => {
      assert.deepStrictEqual(action, Object.assign(
        {},
        actionCreator(),
        {
          payload: selector(store)(index)
        }
      ))
      done();
    })(action);
  })
})
