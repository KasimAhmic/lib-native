import { BOOL, HMENU, HWND, MenuHandle, WindowHandle } from '../../@types';
import { user32 } from './user32';

export function SetMenu(windowHandle: WindowHandle, menuHandle: MenuHandle): boolean {
  return user32.invoke('SetMenu', BOOL, [HWND, HMENU], [windowHandle, menuHandle]);
}
