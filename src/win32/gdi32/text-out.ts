import {
  BOOL,
  Bool,
  DeviceContextHandle,
  HDC,
  INT,
  Int,
  LPCSTR,
  LPCWSTR,
  LongPointerToConstantString,
  LongPointerToConstantWideString,
} from '../../@types';
import { gdi32 } from './gdi32';

export function TextOutW(
  deviceContextHandle: DeviceContextHandle,
  x: Int,
  y: Int,
  text: LongPointerToConstantWideString,
  length: Int,
): Bool {
  return gdi32.invoke(
    'TextOutW',
    BOOL,
    [HDC, INT, INT, LPCWSTR, INT],
    [deviceContextHandle, x, y, text, length],
  );
}

export function TextOutA(
  deviceContextHandle: DeviceContextHandle,
  x: Int,
  y: Int,
  text: LongPointerToConstantString,
  length: Int,
): Bool {
  return gdi32.invoke(
    'TextOutA',
    BOOL,
    [HDC, INT, INT, LPCSTR, INT],
    [deviceContextHandle, x, y, text, length],
  );
}
