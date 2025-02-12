import { BOOL, Bool, DWORD, DoubleWord, HWND, WindowHandle } from '../../@types';
import { user32 } from './user32';

export enum AnimateWindowFlag {
  ACTIVATE = 0x00020000,
  BLEND = 0x00080000,
  CENTER = 0x00000010,
  HIDE = 0x00010000,
  HOR_POSITIVE = 0x00000001,
  HOR_NEGATIVE = 0x00000002,
  SLIDE = 0x00040000,
  VER_POSITIVE = 0x00000004,
  VER_NEGATIVE = 0x00000008,
}

export function AnimateWindow(windowHandle: WindowHandle, time: DoubleWord, flags: AnimateWindowFlag): Bool {
  return user32.invoke('AnimateWindow', BOOL, [HWND, DWORD, DWORD], [windowHandle, time, flags]);
}
