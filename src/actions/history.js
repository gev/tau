
import { POOL, HISTORY } from '../constants';
import { set } from './create';
import u from './util';

export const go = (url) => (dispatch) => {
  dispatch(set(HISTORY, { url }));
};

export const push = (url) => (dispatch, getState) => {
  const history = getState()[POOL][HISTORY];
  if (history) {
    const { index = -1, stack = [] } = history;
    if (stack[index] === url) return;
    dispatch(u.set(HISTORY, {
      url,
      index: index + 1,
      stack: [...stack.slice(0, index + 1), url]
    }));
  } else {
    dispatch(u.set(HISTORY, {
      url,
      index: 0,
      stack: [url]
    }));
  }
};

export const goBack = () => (dispatch, getState) => {
  const history = getState()[POOL][HISTORY];
  if (history && history.index > 0) {
    dispatch(u.set(HISTORY, {
      url: history.stack[history.index - 1],
      index: history.index - 1
    }));
  }
};

export const goForward = () => (dispatch, getState) => {
  const history = getState()[POOL][HISTORY];
  if (history && history.stack && history.index < history.stack.length - 1) {
    dispatch(u.set(HISTORY, {
      url: history.stack[history.index + 1],
      index: history.index + 1
    }));
  }
};
