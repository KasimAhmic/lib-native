import { AcceleratorTableHandle, HACCEL, HWND, INT, Int, WindowHandle } from '../../@types';
import { IMessage, LPMSG } from '../structs/message';
import { user32 } from './user32';

export function TranslateAcceleratorW(
  windowHandle: WindowHandle,
  acceleratorTable: AcceleratorTableHandle,
  message: IMessage,
): Int {
  return user32.invoke(
    'TranslateAcceleratorW',
    INT,
    [HWND, HACCEL, LPMSG],
    [windowHandle, acceleratorTable, message],
  );
}

export function TranslateAcceleratorA(
  windowHandle: WindowHandle,
  acceleratorTable: AcceleratorTableHandle,
  message: IMessage,
): Int {
  return user32.invoke(
    'TranslateAcceleratorA',
    INT,
    [HWND, HACCEL, LPMSG],
    [windowHandle, acceleratorTable, message],
  );
}
