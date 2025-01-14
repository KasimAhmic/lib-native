import koffi from 'koffi';

import { BOOL, HWND, PULONG_PTR, WindowHandle } from '../../@types';
import { kernel32 } from './kernel32';

export function ActivateActCtx(windowHandle: WindowHandle, cookie: Buffer) {
  return kernel32.invoke('ActivateActCtx', BOOL, [HWND, PULONG_PTR], [windowHandle, cookie]);
}
