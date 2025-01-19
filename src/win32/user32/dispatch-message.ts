import { HWND, LPMSG } from '../../@types';
import { IMessage } from '../structs/message';
import { user32 } from './user32';

export function DispatchMessageW(message: IMessage): number {
  return user32.invoke('DispatchMessageW', HWND, [LPMSG], [message]);
}
