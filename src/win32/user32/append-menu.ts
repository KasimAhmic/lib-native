import {
  BOOL,
  HMENU,
  LPCSTR,
  LPCWSTR,
  LongPointerToConstantString,
  LongPointerToConstantWideString,
  MenuHandle,
  UINT,
  UINT_PTR,
  UnsignedLongPointer,
} from '../../@types';
import { MenuFlag } from '../structs';
import { user32 } from './user32';

export function AppendMenuW(
  menuHandle: MenuHandle,
  flags: MenuFlag,
  idNewItem: UnsignedLongPointer,
  newItem: LongPointerToConstantWideString | null,
): number {
  return user32.invoke(
    'AppendMenuW',
    BOOL,
    [HMENU, UINT, UINT_PTR, LPCWSTR],
    [menuHandle, flags, idNewItem, newItem],
  );
}

export function AppendMenuA(
  menuHandle: MenuHandle,
  flags: MenuFlag,
  idNewItem: UnsignedLongPointer,
  newItem: LongPointerToConstantString | null,
): number {
  return user32.invoke(
    'AppendMenuA',
    BOOL,
    [HMENU, UINT, UINT_PTR, LPCSTR],
    [menuHandle, flags, idNewItem, newItem],
  );
}
