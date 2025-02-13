import {
  BrushHandle,
  DeviceContextHandle,
  FontHandle,
  GDIObjectHandle,
  HDC,
  HGDIOBJ,
  PenHandle,
} from '../../@types';
import { gdi32 } from './gdi32';

export function SelectObject(
  deviceContextHandle: DeviceContextHandle,
  gdiObjectHandle: GDIObjectHandle | PenHandle | BrushHandle | FontHandle,
): GDIObjectHandle {
  return gdi32.invoke('SelectObject', HGDIOBJ, [HDC, HGDIOBJ], [deviceContextHandle, gdiObjectHandle]);
}
