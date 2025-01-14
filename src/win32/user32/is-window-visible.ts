import { BOOL, HWND, WindowHandle } from '../../@types';
import { user32 } from './user32';

/**
 * Determines the visibility state of the specified window.
 *
 * @param windowHandle The handle to the window to test.
 *
 * @returns `true` if the specified window is visible, otherwise `false`.
 *
 * @see https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-iswindowvisible
 */
export function IsWindowVisible(windowHandle: WindowHandle): boolean {
  return user32.invoke('IsWindowVisible', BOOL, [HWND], [windowHandle]) !== 0;
}
