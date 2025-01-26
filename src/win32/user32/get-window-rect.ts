import koffi from 'koffi';

import { BOOL, HWND, WindowHandle } from '../../@types';
import { IRect, LPRECT } from '../structs/rect';
import { user32 } from './user32';

export function GetWindowRect(windowHandle: WindowHandle, rect: IRect) {
  return user32.invoke('GetWindowRect', BOOL, [HWND, koffi.out(LPRECT)], [windowHandle, rect]);
}
