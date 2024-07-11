import { DataType, load } from 'ffi-rs';

import { User32 } from './user32';

/**
 * Brings the specified window to the top of the Z order.
 *
 * @param windowHandle The handle to the window to bring to the top.
 *
 * @returns `true` if the function succeeds, otherwise `false`.
 *
 * @see https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-bringwindowtotop
 */
export function BringWindowToTop(windowHandle: number): boolean {
  return load({
    library: User32.Name,
    funcName: 'BringWindowToTop',
    retType: DataType.Boolean,
    paramsType: [DataType.I32],
    paramsValue: [windowHandle],
  });
}
