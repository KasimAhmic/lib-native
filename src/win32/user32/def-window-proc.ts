import { HWND, LPARAM, LRESULT, UINT, WPARAM } from '../../@types';
import { user32 } from './user32';

export function DefWindowProcW(
  windowHandle: number,
  message: number,
  wParam: number,
  lParam: number,
): number {
  return user32.invoke(
    'DefWindowProcW',
    LRESULT,
    [HWND, UINT, WPARAM, LPARAM],
    [windowHandle, message, wParam, lParam],
  );
}
