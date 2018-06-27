
import { POOL, HISTORY } from '../constants';
import { set } from './create';
import u from './util';

export const go = (url) => (dispatch) => {
  dispatch(set(HISTORY, { url, shift: 0 }));
};

export const push = (url) => (dispatch, getState) => {
  const history = getState()[POOL][HISTORY];
  if (history) {
    const { index = 0, stack = [], shift = 1 } = history;
    if (stack[index] === url) {
      dispatch(u.set(HISTORY, { url, shift: 1 }));
    } else {
      dispatch(u.set(HISTORY, {
        url,
        index: index + shift,
        stack: [...stack.slice(0, index + shift), url],
        shift: 1
      }));
    }
  } else {
    dispatch(u.set(HISTORY, {
      url,
      index: 0,
      stack: [url],
      shift: 1
    }));
  }
};

export const goBack = () => (dispatch, getState) => {
  const history = getState()[POOL][HISTORY];
  if (history && history.index > 0) {
    dispatch(u.set(HISTORY, {
      url: history.stack[history.index - 1],
      index: history.index - 1,
      shift: 0
    }));
  }
};

export const goForward = () => (dispatch, getState) => {
  const history = getState()[POOL][HISTORY];
  if (history && history.stack && history.index < history.stack.length - 1) {
    dispatch(u.set(HISTORY, {
      url: history.stack[history.index + 1],
      index: history.index + 1,
      shift: 0
    }));
  }
};
