import { BOOL, Bool, HWND, WindowHandle } from '../../@types';
import { user32 } from './user32';

export function DestroyWindow(windowHandle: WindowHandle): Bool {
  return user32.invoke('DestroyWindow', BOOL, [HWND], [windowHandle]);
}
