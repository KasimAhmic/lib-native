import koffi from 'koffi';

import { DeviceContextHandle, HDC, HWND, WindowHandle } from '../../@types';
import { IPaint, LPPAINTSTRUCT } from '../structs/paint';
import { user32 } from './user32';

export function BeginPaint(windowHandle: WindowHandle, paint: IPaint): DeviceContextHandle {
  return user32.invoke('BeginPaint', HDC, [HWND, koffi.out(LPPAINTSTRUCT)], [windowHandle, paint]);
}
