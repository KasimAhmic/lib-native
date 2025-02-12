import { BOOL, Bool, FontHandle, GDIObjectHandle, HGDIOBJ } from '../../@types';
import { gdi32 } from './gdi32';

export function DeleteObject(objectHandle: GDIObjectHandle | FontHandle): Bool {
  return gdi32.invoke('DeleteObject', BOOL, [HGDIOBJ], [objectHandle]);
}
