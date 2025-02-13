import { BOOL, Bool, BrushHandle, FontHandle, GDIObjectHandle, HGDIOBJ, PenHandle } from '../../@types';
import { gdi32 } from './gdi32';

export function DeleteObject(objectHandle: GDIObjectHandle | FontHandle | PenHandle | BrushHandle): Bool {
  return gdi32.invoke('DeleteObject', BOOL, [HGDIOBJ], [objectHandle]);
}
