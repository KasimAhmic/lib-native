import { DataType, load } from 'ffi-rs';

import { User32 } from './user32';

/**
 * Sets the specified window's show state.
 *
 * @param windowHandle The handle to the window.
 * @param cmdShow Controls how the window is to be shown.
 *
 * @returns `true` if the window was previously visible, otherwise `false`.
 *
 * @see https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-showwindow
 */
export function ShowWindow(windowHandle: number, cmdShow: number): boolean {
  return load({
    library: User32.Name,
    funcName: 'ShowWindow',
    retType: DataType.Boolean,
    paramsType: [DataType.I32, DataType.I32],
    paramsValue: [windowHandle, 1],
  });
}
