
import { v4 as uuid } from 'uuid';
import { contains } from 'fast-deep-equal';
import { POOL } from '../constants';
import u from './util';

export const add = (id, attribute, value) => (dispatch, getState) => {
  if (!id) return;
  const prev = getState()[POOL][id];
  if (prev && prev[attribute] && prev[attribute].includes(value)) return;
  dispatch(u.push(id, prev, attribute, value));
};

export const push = (id, attribute, value) => (dispatch, getState) => {
  if (!id) return;
  const prev = getState()[POOL][id];
  dispatch(u.push(id, prev, attribute, value));
};

export const set = (id, payload) => (dispatch, getState) => {
  if (!id) return;
  const prev = getState()[POOL][id];
  if (prev && contains(prev, payload)) return;
  dispatch(u.set(id, payload));
};

export const create = (id, attribute, type, value) => (dispatch, getState) => {
  if (!id || !attribute) return;
  const subject = uuid();
  const prev = getState()[POOL][id];
  dispatch(u.set(subject, value ? { type, [value]: id } : { type }));
  dispatch(u.push(id, prev, attribute, {
    [attribute]: prev && prev[attribute] ? [...prev[attribute], subject] : [subject]
  }));
};

export const remove = (id, attribute, value) => (dispatch, getState) => {
  if (!id || !attribute || !value) return;
  const prev = getState()[POOL][id];
  if (!prev || !prev[attribute] || !prev[attribute].includes(value)) return;
  dispatch(u.set(id, {
    [attribute]: prev[attribute].filter(i => i !== value)
  }));
};
