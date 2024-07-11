import { DataType, load } from 'ffi-rs';

import { User32 } from './user32';

/**
 * Determines the visibility state of the specified window.
 *
 * @param windowHandle The handle to the window to test.
 *
 * @returns `true` if the specified window is visible, otherwise `false`.
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
