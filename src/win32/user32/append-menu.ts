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
import { user32 } from './user32';

export enum MenuFlag {
  BITMAP = 0x00000004,
  CHECKED = 0x00000008,
  DISABLED = 0x00000002,
  ENABLED = 0x00000000,
  GRAYED = 0x00000001,
  MENUBARBREAK = 0x00000020,
  MENUBREAK = 0x00000040,
  OWNERDRAW = 0x00000100,
  POPUP = 0x00000010,
  SEPARATOR = 0x00000800,
  STRING = 0x00000000,
  UNCHECKED = 0x00000000,
}

export function AppendMenuW(
  menuHandle: MenuHandle,
  flags: MenuFlag,
  idNewItem: UnsignedLongPointer,
  newItem: LongPointerToConstantWideString,
): boolean {
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
  newItem: LongPointerToConstantString,
): boolean {
  return user32.invoke(
    'AppendMenuA',
    BOOL,
    [HMENU, UINT, UINT_PTR, LPCSTR],
    [menuHandle, flags, idNewItem, newItem],
  );
}
