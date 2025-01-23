import koffi from 'koffi';

import { BOOL, Bool, HWND, WindowHandle } from '../../@types';
import { IRect, LPRECT } from '../structs/rect';
import { user32 } from './user32';

/**
 * Retrieves the dimensions of the bounding rectangle of the specified window's client area.
 *
 * @param windowHandle The handle to the window whose client area dimensions are to be retrieved.
 *
 * @returns The dimensions of the bounding rectangle of the specified window's client area.
 *
 * @see https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-getclientrect
 */
export function GetClientRect(windowHandle: WindowHandle, rect: IRect): Bool {
  return user32.invoke('GetClientRect', BOOL, [HWND, koffi.out(LPRECT)], [windowHandle, rect]);
}
