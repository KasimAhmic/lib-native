import { HRESULT, HWND, LPCWSTR, LongPointerToConstantWideString, WindowHandle } from '../../@types';
import { uxTheme } from './ux-theme';

export function SetWindowTheme(
  windowHandle: WindowHandle,
  subAppName: LongPointerToConstantWideString,
  subIdList: LongPointerToConstantWideString,
) {
  return uxTheme.invoke(
    'SetWindowTheme',
    HRESULT,
    [HWND, LPCWSTR, LPCWSTR],
    [windowHandle, subAppName, subIdList],
  );
}
