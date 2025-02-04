import koffi from 'koffi';

import { HWND, INT, LPSTR, LPWSTR } from '../../@types';
import { ansiBufferToString, unicodeBufferToString } from '../../util';
import { NULL_TERMINATOR } from '../constants';
import { user32 } from './user32';

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
export function GetWindowTextW(windowHandle: number, bufferSize: number = 512): string {
  const outputBuffer = Buffer.alloc(bufferSize + 2);

  user32.invoke(
    'GetWindowTextW',
    INT,
    [HWND, koffi.out(LPWSTR), INT],
    [windowHandle, outputBuffer, outputBuffer.length],
  );

  return unicodeBufferToString(outputBuffer);
}

export function GetWindowTextA(windowHandle: number, bufferSize: number = 256): string {
  const outputBuffer = Buffer.alloc(bufferSize + 1);

  user32.invoke(
    'GetWindowTextA',
    INT,
    [HWND, koffi.out(LPSTR), INT],
    [windowHandle, outputBuffer, outputBuffer.length],
  );

  return ansiBufferToString(outputBuffer);
}
