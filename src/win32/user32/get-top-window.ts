import { HWND, WindowHandle } from '../../@types';
import { user32 } from './user32';

export function GetTopWindow(windowHandle: WindowHandle | null): WindowHandle {
  return user32.invoke('GetTopWindow', HWND, [HWND], [windowHandle]);
}
