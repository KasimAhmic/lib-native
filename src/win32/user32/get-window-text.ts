import { DataType, load } from 'ffi-rs';

import { User32 } from './user32';

/**
 * @param windowHandle
 *
 * @see https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-getwindowtexta
 */
export function GetWindowTextW(windowHandle: number): string {
  const buffer = Buffer.alloc(1024);

  load({
    library: User32.Name,
    funcName: 'GetWindowTextW',
    retType: DataType.I32,
    paramsType: [DataType.I32, DataType.U8Array, DataType.I32],
    paramsValue: [windowHandle, buffer, buffer.length],
  });

  return buffer.toString('utf-8').replaceAll('\0', '');
}
