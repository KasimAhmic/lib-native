import { BOOL, HWND, INT, LongPointer, WindowHandle } from '../../@types';
import { user32 } from './user32';

export enum WindowLongPtrIndex {
  GWL_EXSTYLE = -20,
  GWLP_HINSTANCE = -6,
  GWL_ID = -12,
  GWL_STYLE = -16,
  GWLP_USERDATA = -21,
  GWLP_WNDPROC = -4,
  DWLP_DLGPROC = 8, // TODO: Appears to be calculated according to Microsoft Docs, investigate later
  DWLP_MSGRESULT = 0,
  DWLP_USER = 8, // TODO: Appears to be calculated according to Microsoft Docs, investigate later
}

export function GetWindowLongPtrW(windowHandle: WindowHandle, index: WindowLongPtrIndex): LongPointer {
  return user32.invoke('GetWindowLongPtrW', BOOL, [HWND, INT], [windowHandle, index]);
}

export function GetWindowLongPtrA(windowHandle: WindowHandle, index: WindowLongPtrIndex): LongPointer {
  return user32.invoke('GetWindowLongPtrA', BOOL, [HWND, INT], [windowHandle, index]);
}
