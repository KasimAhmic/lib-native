import { BOOL, Bool, DeviceContextHandle, HDC, INT, Int } from '../../@types';
import { gdi32 } from './gdi32';

export function Rectangle(
  deviceContextHandle: DeviceContextHandle,
  left: Int,
  top: Int,
  right: Int,
  bottom: Int,
): Bool {
  return gdi32.invoke(
    'Rectangle',
    BOOL,
    [HDC, INT, INT, INT, INT],
    [deviceContextHandle, left, top, right, bottom],
  );
}
