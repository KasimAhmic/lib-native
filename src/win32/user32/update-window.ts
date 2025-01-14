import { BOOL, HWND } from '../../@types';
import { user32 } from './user32';

export function UpdateWindow(windowHandle: number): boolean {
  return user32.invoke('UpdateWindow', BOOL, [HWND], [windowHandle]) !== 0;
}
