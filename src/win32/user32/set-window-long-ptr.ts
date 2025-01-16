import { BOOL, HWND, INT, Int, LONG_PTR, LongPointer, WindowHandle } from '../../@types';
import { WindowLongPtrIndex } from './get-window-long-ptr';
import { user32 } from './user32';

export function SetWindowLongPtrW(
  windowHandle: WindowHandle,
  index: WindowLongPtrIndex,
  newValue: number,
): LongPointer {
  return user32.invoke('SetWindowLongPtrW', BOOL, [HWND, INT, LONG_PTR], [windowHandle, index, newValue]);
}

export function SetWindowLongPtrA(
  windowHandle: WindowHandle,
  index: WindowLongPtrIndex,
  newValue: number,
): LongPointer {
  return user32.invoke('SetWindowLongPtrA', BOOL, [HWND, INT, LONG_PTR], [windowHandle, index, newValue]);
}
