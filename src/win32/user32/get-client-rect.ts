import { DataType, load } from 'ffi-rs';

import { User32 } from './user32';

export type ClientRect = {
  left: number;
  top: number;
  right: number;
  bottom: number;
};

/**
 * Retrieves the dimensions of the bounding rectangle of the specified window's client area.
 *
 * @param windowHandle The handle to the window whose client area dimensions are to be retrieved.
 *
 * @returns The dimensions of the bounding rectangle of the specified window's client area.
 *
 * @see https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-getclientrect
 */
export function GetClientRect(windowHandle: number): ClientRect {
  const buffer = Buffer.alloc(16);

  load({
    library: User32.Name,
    funcName: 'GetClientRect',
    retType: DataType.Boolean,
    paramsType: [DataType.I32, DataType.U8Array],
    paramsValue: [windowHandle, buffer],
  });

  return {
    left: buffer.readInt32LE(0),
    top: buffer.readInt32LE(4),
    right: buffer.readInt32LE(8),
    bottom: buffer.readInt32LE(12),
  };
}
