import {
  BOOL,
  Bool,
  HWND,
  LPCSTR,
  LPCWSTR,
  LongPointerToConstantString,
  LongPointerToConstantWideString,
  WindowHandle,
} from '../../@types';
import { user32 } from './user32';

export function SetWindowTextW(
  windowHandle: WindowHandle,
  text: LongPointerToConstantWideString | null,
): Bool {
  return user32.invoke('SetWindowTextW', BOOL, [HWND, LPCWSTR], [windowHandle, text]);
}

export function SetWindowTextA(windowHandle: WindowHandle, text: LongPointerToConstantString | null): Bool {
  return user32.invoke('SetWindowTextA', BOOL, [HWND, LPCSTR], [windowHandle, text]);
}
