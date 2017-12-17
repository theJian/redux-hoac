const withStore = selector => fn => (...args) => {
  const action = fn(...args);
  return (_, getState) => {
    let extraPayload = selector(getState());

    if (typeof extraPayload === 'function') {
      extraPayload = extraPayload(...args);
    }

    const payload = action.payload;
    return Object.assign({}, action, {
      payload: Object.assign({}, payload, extraPayload)
    })
  }
}

export default withStore;
