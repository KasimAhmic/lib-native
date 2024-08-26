import { DataType, load } from 'ffi-rs';

import { User32 } from './user32';

/**
 * Retrieves the text of the specified window's title bar (if it has one). If the specified window is a control, the
 * text of the control is retrieved.
 *
 * @param windowHandle The handle to the window or control containing the text.
 *
 * @returns The text of the specified window's title bar. If the specified window is a control, the text of the control.
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

  // detail: https://learn.microsoft.com/en-us/openspecs/windows_protocols/ms-dtyp/a66edeb1-52a0-4d64-a93b-2f5c833d7d92#gt_fd33af2e-e1ce-4f8e-a706-f9fb8123f9b0
  // all Unicode strings follow the UTF-16LE encoding scheme with no Byte Order Mark (BOM).
  return buffer.toString('utf16le').replace(/\0+$/, '');
}
