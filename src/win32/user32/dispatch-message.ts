import { HWND, LPMSG, MSG_STRUCT } from '../../@types';
import { user32 } from './user32';

export function DispatchMessageW(message: typeof MSG_STRUCT): number {
  return user32.invoke('DispatchMessageW', HWND, [LPMSG], [message]);
}
