import { BOOL, HWND, WindowHandle } from '../../@types/';
import { user32 } from './user32';

/**
 * @param windowHandle
 *
 * @see https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-setforegroundwindow
 */
export function SetForegroundWindow(windowHandle: WindowHandle | null): boolean {
  return user32.invoke('SetForegroundWindow', BOOL, [HWND], [windowHandle]) !== 0;
}
