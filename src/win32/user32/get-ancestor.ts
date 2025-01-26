// HWND GetAncestor(
//   [in] HWND hwnd,
//   [in] UINT gaFlags
// );
import { HWND, UINT, WindowHandle } from '../../@types';
import { user32 } from './user32';

export enum GetAncestorFlag {
  PARENT = 1,
  ROOT = 2,
  ROOTOWNER = 3,
}

export function GetAncestor(windowHandle: WindowHandle, flags: GetAncestorFlag): WindowHandle {
  return user32.invoke('GetAncestor', HWND, [HWND, UINT], [windowHandle, flags]);
}
