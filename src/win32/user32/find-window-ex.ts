import { HWND, LPCSTR, LPCWSTR } from '../../@types';
import { user32 } from './user32';

export function FindWindowExW(
  parentWindowHandle: number | null,
  childWindowHandle: number | null,
  className: string | null,
  windowName: string | null,
): number {
  return user32.invoke(
    'FindWindowExW',
    HWND,
    [HWND, HWND, LPCWSTR, LPCWSTR],
    [parentWindowHandle, childWindowHandle, className, windowName],
  );
}

export function FindWindowExA(
  parentWindowHandle: number,
  childWindowHandle: number,
  className: string,
  windowName: string,
): number {
  return user32.invoke(
    'FindWindowExA',
    HWND,
    [HWND, HWND, LPCSTR, LPCSTR],
    [parentWindowHandle, childWindowHandle, className, windowName],
  );
}
