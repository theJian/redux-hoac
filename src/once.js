import cancel from './cancel';

const once = fn => {
  let called = false;
  return function(...args) {
    if (called) {
      return cancel();
    }

    called = true;
    return fn(...args);
  }
}

export default once;
