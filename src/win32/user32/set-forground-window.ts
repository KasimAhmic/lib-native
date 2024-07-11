import { DataType, load } from 'ffi-rs';

import { User32 } from './user32';

/**
 * @param windowHandle
 *
 * @see https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-setforegroundwindow
 */
export function SetForegroundWindow(windowHandle: number): boolean {
  return load({
    library: User32.Name,
    funcName: 'SetForegroundWindow',
    retType: DataType.Boolean,
    paramsType: [DataType.I32],
    paramsValue: [windowHandle],
  });
}
