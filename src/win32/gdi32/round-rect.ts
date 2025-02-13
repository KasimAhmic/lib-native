import { BOOL, Bool, DeviceContextHandle, HDC, INT, Int } from '../../@types';
import { gdi32 } from './gdi32';

export function RoundRect(
  deviceContextHandle: DeviceContextHandle,
  left: Int,
  top: Int,
  right: Int,
  bottom: Int,
  width: Int,
  height: Int,
): Bool {
  return gdi32.invoke(
    'RoundRect',
    BOOL,
    [HDC, INT, INT, INT, INT, INT, INT],
    [deviceContextHandle, left, top, right, bottom, width, height],
  );
}
