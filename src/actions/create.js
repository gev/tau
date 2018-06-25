
import { writeFile, rename } from 'fs';
import { v4 as uuid } from 'uuid';
import { contains } from 'fast-deep-equal';
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

export const add = (id, attribute, value) => (dispatch, getState) => {
  if (!id) return;
  const prev = getState()[POOL][id];
  if (prev && prev[attribute] && prev[attribute].includes(value)) return;
  dispatch(apply({
    id,
    type: ACTION_SET,
    payload: {
      [attribute]: prev && prev[attribute] ? [...prev[attribute], value] : [value]
    }
  }));
};

export const set = (id, payload) => (dispatch, getState) => {
  if (!id) return;
  const prev = getState()[POOL][id];
  if (prev && contains(prev, payload)) return;
  dispatch(apply({
    type: ACTION_SET, id, payload
  }));
};

export const create = (id, attribute, type, value) => (dispatch, getState) => {
  if (!id || !attribute) return;
  const subject = uuid();
  const prev = getState()[POOL][id];
  dispatch(apply({
    id: subject,
    type: ACTION_SET,
    payload: value ? { type, [value]: id } : { type }
  }));
  dispatch(apply({
    id,
    type: ACTION_SET,
    payload: {
      [attribute]: prev && prev[attribute] ? [...prev[attribute], subject] : [subject]
    }
  }));
};

export const remove = (id, attribute, value) => (dispatch, getState) => {
  if (!id || !attribute || !value) return;
  const prev = getState()[POOL][id];
  if (!prev || !prev[attribute] || !prev[attribute].includes(value)) return;
  dispatch(apply({
    id,
    type: ACTION_SET,
    payload: {
      [attribute]: prev[attribute].filter(i => i !== value)
    }
  }));
};
