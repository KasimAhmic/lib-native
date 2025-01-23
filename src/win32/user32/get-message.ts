import koffi from 'koffi';

import { BOOL, Bool, HWND, Int, UINT, WindowHandle } from '../../@types';
import { IMessage, LPMSG } from '../structs/message';
import { user32 } from './user32';

export function GetMessageW(
  message: IMessage,
  windowHandle: WindowHandle | null,
  filterMin: Int,
  filterMax: Int,
): Bool {
  return user32.invoke(
    'GetMessageW',
    BOOL,
    [koffi.out(LPMSG), HWND, UINT, UINT],
    [message, windowHandle, filterMin, filterMax],
  );
}

export function GetMessageA(
  message: IMessage,
  windowHandle: WindowHandle | null,
  filterMin: Int,
  filterMax: Int,
): Bool {
  return user32.invoke(
    'GetMessageA',
    BOOL,
    [koffi.out(LPMSG), HWND, UINT, UINT],
    [message, windowHandle, filterMin, filterMax],
  );
}
