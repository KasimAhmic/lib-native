import { BOOL, HWND, WindowHandle } from '../../@types';
import { user32 } from './user32';

/**
 * Brings the specified window to the top of the Z order.
 *
 * @param windowHandle The handle to the window to bring to the top.
 *
 * @returns `true` if the function succeeds, otherwise `false`.
 *
 * @see https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-bringwindowtotop
 */
export function BringWindowToTop(windowHandle: WindowHandle | null): boolean {
  return user32.invoke('BringWindowToTop', BOOL, [HWND], [windowHandle]) !== 0;
}
