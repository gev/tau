
import { writeFile, rename } from 'fs';
import { v4 as uuid } from 'uuid';
import debounce from 'debounce';
import { tmp, FILE, POOL, ACTION_SET } from '../constants';

const store = debounce((state) => {
  const file = tmp(uuid());
  writeFile(file, Buffer.from(JSON.stringify(state[POOL], null, 2)), e1 => {
    if (e1) console.error(e1);
    rename(file, FILE, e2 => {
      if (e2) console.error('error', e2);
    });
  });
}, 1000, true);

const apply = (action) => (dispatch, getState) => {
  dispatch(action);
  store(getState());
};

const set = (id, payload) => (dispatch) => {
  dispatch(apply({
    type: ACTION_SET, id, payload
  }));
};

const push = (id, prev, attribute, value) => (dispatch) => {
  dispatch(set(id, {
    [attribute]: prev && prev[attribute] ? [...prev[attribute], value] : [value]
  }));
};

export default { set, push };
