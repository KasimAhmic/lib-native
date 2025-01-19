import koffi from 'koffi';

import { BOOL, HANDLE, Handle, PULONG_PTR } from '../../@types';
import { kernel32 } from './kernel32';

export function ActivateActCtx(windowHandle: Handle, cookie: Buffer): number {
  return kernel32.invoke('ActivateActCtx', BOOL, [HANDLE, koffi.out(PULONG_PTR)], [windowHandle, cookie]);
}
