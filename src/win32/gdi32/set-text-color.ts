import { COLORREF, ColorReference, DeviceContextHandle, HDC } from '../../@types';
import { gdi32 } from './gdi32';

export function SetTextColor(
  deviceContextHandle: DeviceContextHandle,
  color: ColorReference,
): ColorReference {
  return gdi32.invoke('SetTextColor', COLORREF, [HDC, COLORREF], [deviceContextHandle, color]);
}
