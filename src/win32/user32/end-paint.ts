import koffi from 'koffi';

import { BOOL, Bool, HWND, WindowHandle } from '../../@types';
import { IPaint, LPPAINTSTRUCT } from '../structs/paint';
import { user32 } from './user32';

export function EndPaint(windowHandle: WindowHandle, paint: IPaint): Bool {
  return user32.invoke('EndPaint', BOOL, [HWND, LPPAINTSTRUCT], [windowHandle, paint]);
}
