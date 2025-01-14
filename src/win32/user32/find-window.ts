import { HWND, LPCSTR, LPCWSTR } from '../../@types';
import { user32 } from './user32';

export function FindWindowW(className: string | null, windowName: string | null): number {
  return user32.invoke('FindWindowW', HWND, [LPCWSTR, LPCWSTR], [className, windowName]);
}

export function FindWindowA(className: string | null, windowName: string | null): number {
  return user32.invoke('FindWindowA', HWND, [LPCSTR, LPCSTR], [className, windowName]);
}
