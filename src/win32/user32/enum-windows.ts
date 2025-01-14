import koffi from 'koffi';

import { BOOL, LPARAM, LongParam, WNDENUMPROC, WindowHandle } from '../../@types';
import { user32 } from './user32';

/**
 * Enumerates all top-level windows on the screen by passing the handle to each window, in turn, to an
 * application-defined callback function.
 *
 * @param callback The callback function that receives the handle to each window.
 * @param param An application-defined value to be passed to the callback function.
 *
 * @see https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-enumwindows
 */
export function EnumWindows(
  callback: (windowHandle: WindowHandle, param: LongParam) => boolean,
  param: LongParam = 0,
): boolean {
  return user32.invoke('EnumWindows', BOOL, [koffi.pointer(WNDENUMPROC), LPARAM], [callback, param]) !== 0;
}
