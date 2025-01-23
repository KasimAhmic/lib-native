import { HWND, LongResult } from '../../@types';
import { IMessage, LPMSG } from '../structs/message';
import { user32 } from './user32';

export function DispatchMessageW(message: IMessage): LongResult {
  return user32.invoke('DispatchMessageW', HWND, [LPMSG], [message]);
}

export function DispatchMessageA(message: IMessage): LongResult {
  return user32.invoke('DispatchMessageA', HWND, [LPMSG], [message]);
}
