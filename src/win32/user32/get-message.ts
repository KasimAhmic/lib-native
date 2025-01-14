import koffi from 'koffi';

import { BOOL, HWND, Int, LPMSG, MSG_STRUCT, UINT, WindowHandle } from '../../@types';
import { user32 } from './user32';

export function GetMessageW(
  message: typeof MSG_STRUCT,
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
