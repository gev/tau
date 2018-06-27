
import path from 'path';
import { remote } from 'electron';

export const POOL = 'pool';
export const HISTORY = 'history';

export const ACTION_GET = 'ACTION_GET';
export const ACTION_SET = 'ACTION_SET';

export const KEY_ENTER = 0x0d;

export const tmp = (a) => path.join(remote.app.getAppPath(), 'tmp', a);
export const FILE = tmp('state.json');
