import { BOOL, Bool, HWND, INT, Int, WindowHandle } from '../../@types';
import { user32 } from './user32';

export function MoveWindow(
  windowHandle: WindowHandle,
  x: Int,
  y: Int,
  width: Int,
  height: Int,
  repaint: Bool,
): Bool {
  return user32.invoke(
    'MoveWindow',
    HWND,
    [HWND, INT, INT, INT, INT, BOOL],
    [windowHandle, x, y, width, height, repaint],
  );
}
