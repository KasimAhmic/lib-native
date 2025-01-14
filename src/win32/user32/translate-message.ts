import { BOOL, LPMSG, MSG_STRUCT } from '../../@types';
import { user32 } from './user32';

export function TranslateMessage(message: typeof MSG_STRUCT): boolean {
  return user32.invoke('TranslateMessage', BOOL, [LPMSG], [message]) !== 0;
}
