import { BOOL, HWND, INT } from '../../@types';
import { user32 } from './user32';

export enum ShowWindowCommand {
  SW_HIDE = 0,
  SW_SHOWNORMAL = 1,
  SW_NORMAL = 1,
  SW_SHOWMINIMIZED = 2,
  SW_SHOWMAXIMIZED = 3,
  SW_MAXIMIZE = 3,
  SW_SHOWNOACTIVATE = 4,
  SW_SHOW = 5,
  SW_MINIMIZE = 6,
  SW_SHOWMINNOACTIVE = 7,
  SW_SHOWNA = 8,
  SW_RESTORE = 9,
  SW_SHOWDEFAULT = 10,
  SW_FORCEMINIMIZE = 11,
}

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
export function ShowWindow(windowHandle: number, cmdShow: ShowWindowCommand): boolean {
  return user32.invoke('ShowWindow', BOOL, [HWND, INT], [windowHandle, cmdShow]) !== 0;
}
