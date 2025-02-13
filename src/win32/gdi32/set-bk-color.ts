import { COLORREF, ColorReference, DeviceContextHandle, HDC } from '../../@types';
import { gdi32 } from './gdi32';

export function SetBkColor(deviceContextHandle: DeviceContextHandle, color: ColorReference): ColorReference {
  return gdi32.invoke('SetBkColor', COLORREF, [HDC, COLORREF], [deviceContextHandle, color]);
}
