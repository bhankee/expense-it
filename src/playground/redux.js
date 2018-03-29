import { createStore } from 'redux';
const incrementCount = () => ({
  type: 'INCREMENT'
});

const store = createStore((state = { count: 0 }) => {
  console.log('running');
  return state;
});

store.dispatch({
  type: 'INCREMENT'
});

console.log(store.getState());
