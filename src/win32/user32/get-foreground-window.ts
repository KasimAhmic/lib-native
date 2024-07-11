import { DataType, load } from 'ffi-rs';

import { User32 } from './user32';

/**
 * @see https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-getforegroundwindow
 */
export function GetForegroundWindow(): number {
  return load({
    library: User32.Name,
    funcName: 'GetForegroundWindow',
    retType: DataType.I32,
    paramsType: [],
    paramsValue: [],
  });
}
