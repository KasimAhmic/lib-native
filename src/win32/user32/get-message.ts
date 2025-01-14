import koffi from 'koffi';

import { BOOL, HWND, Int, LPMSG, UINT, WindowHandle } from '../../@types';
import { IMessage } from '../structs/message';
import { user32 } from './user32';

export function GetMessageW(
  message: IMessage,
  windowHandle: WindowHandle | null,
  filterMin: Int,
  filterMax: Int,
): boolean {
  return (
    user32.invoke(
      'GetMessageW',
      BOOL,
      [koffi.out(LPMSG), HWND, UINT, UINT],
      [message, windowHandle, filterMin, filterMax],
    ) === 1
  );
}
