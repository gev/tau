
import path from 'path';
import { remote } from 'electron';

export const POOL = 'pool';

export const ACTION_GET = 'ACTION_GET';
export const ACTION_SET = 'ACTION_SET';

export const tmp = (a) => path.join(remote.app.getAppPath(), 'tmp', a);
export const FILE = tmp('state.json');
