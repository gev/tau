
import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';

export default function (reducer, state, history) {
  const router = routerMiddleware(history);
  const enhancer = applyMiddleware(thunk, router);
  return createStore(reducer, state, enhancer);
}
