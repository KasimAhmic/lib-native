import { DeviceContextHandle, HDC, INT, Int } from '../../@types';
import { gdi32 } from './gdi32';

export enum BackgroundMode {
  TRANSPARENT = 1,
  OPAQUE = 2,
}

export function SetBkMode(deviceContextHandle: DeviceContextHandle, mode: BackgroundMode): Int {
  return gdi32.invoke('SetBkMode', INT, [HDC, INT], [deviceContextHandle, mode]);
}
