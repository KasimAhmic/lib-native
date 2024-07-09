import { DataType, load } from 'ffi-rs';

import { User32 } from './user32';

/**
 *
 * @param windowHandle
 *
 * @see https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-iswindowvisible
 */
export function IsWindowVisible(windowHandle: number): boolean {
  return load({
    library: User32.Name,
    funcName: 'IsWindowVisible',
    retType: DataType.Boolean,
    paramsType: [DataType.I32],
    paramsValue: [windowHandle],
  });
}
