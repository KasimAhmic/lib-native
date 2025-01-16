import koffi from 'koffi';

import {
  BitmapHandle,
  HBITMAP,
  HMENU,
  LPWSTR,
  LongPointerToString,
  MenuHandle,
  UINT,
  ULONG_PTR,
  UnsignedInt,
  UnsignedLongPointer,
} from '../../@types';

export enum MenuItemInfoMask {
  STATE = 0x00000001,
  ID = 0x00000002,
  SUBMENU = 0x00000004,
  CHECKMARKS = 0x00000008,
  TYPE = 0x00000010,
  DATA = 0x00000020,
  STRING = 0x00000040,
  BITMAP = 0x00000080,
  FTYPE = 0x00000100,
}

export enum MenuFlag {
  INSERT = 0x00000000,
  CHANGE = 0x00000080,
  APPEND = 0x00000100,
  DELETE = 0x00000200,
  REMOVE = 0x00001000,
  BYCOMMAND = 0x00000000,
  BYPOSITION = 0x00000400,
  SEPARATOR = 0x00000800,
  ENABLED = 0x00000000,
  GRAYED = 0x00000001,
  DISABLED = 0x00000002,
  UNCHECKED = 0x00000000,
  CHECKED = 0x00000008,
  USECHECKBITMAPS = 0x00000200,
  STRING = 0x00000000,
  BITMAP = 0x00000004,
  OWNERDRAW = 0x00000100,
  POPUP = 0x00000010,
  MENUBARBREAK = 0x00000020,
  MENUBREAK = 0x00000040,
  UNHILITE = 0x00000000,
  HILITE = 0x00000080,
  DEFAULT = 0x00001000,
  SYSMENU = 0x00002000,
  HELP = 0x00004000,
  RIGHTJUSTIFY = 0x00004000,
  MOUSESELECT = 0x00008000,
  END = 0x00000080,
}

export enum MenuFlagState {
  GRAYED = 0x00000003,
  DISABLED = GRAYED,
  CHECKED = MenuFlag.CHECKED,
  HILITE = MenuFlag.HILITE,
  ENABLED = MenuFlag.ENABLED,
  UNCHECKED = MenuFlag.UNCHECKED,
  UNHILITE = MenuFlag.UNHILITE,
  DEFAULT = MenuFlag.DEFAULT,
}

class MenuItemInfo<T extends IMenuItemInfoA | IMenuItemInfoW> {
  cbSize: UnsignedInt;
  fMask: UnsignedInt;
  fType: UnsignedInt;
  fState: UnsignedInt;
  wID: UnsignedInt;
  hSubMenu: MenuHandle;
  hbmpChecked: BitmapHandle;
  hbmpUnchecked: BitmapHandle;
  dwItemData: UnsignedLongPointer;
  dwTypeData: T['dwTypeData'];
  cch: UnsignedInt;
  hbmpItem: BitmapHandle;

  constructor(options?: Partial<Omit<T, 'cbSize'>>) {
    Object.assign(this, options);
  }
}

export interface IMenuItemInfoA {
  cbSize: UnsignedInt;
  fMask: UnsignedInt;
  fType: UnsignedInt;
  fState: UnsignedInt;
  wID: UnsignedInt;
  hSubMenu: MenuHandle;
  hbmpChecked: BitmapHandle;
  hbmpUnchecked: BitmapHandle;
  dwItemData: UnsignedLongPointer;
  dwTypeData: LongPointerToString;
  cch: UnsignedInt;
  hbmpItem: BitmapHandle;
}

export class MenuItemInfoW extends MenuItemInfo<IMenuItemInfoW> {
  constructor(options?: Partial<Omit<IMenuItemInfoW, 'cbSize'>>) {
    super(options);

    this.cbSize = koffi.sizeof(MENUITEMINFOW);
  }
}

export interface IMenuItemInfoW {
  cbSize: UnsignedInt;
  fMask: UnsignedInt;
  fType: UnsignedInt;
  fState: UnsignedInt;
  wID: UnsignedInt;
  hSubMenu: MenuHandle;
  hbmpChecked: BitmapHandle;
  hbmpUnchecked: BitmapHandle;
  dwItemData: UnsignedLongPointer;
  dwTypeData: LongPointerToString;
  cch: UnsignedInt;
  hbmpItem: BitmapHandle;
}

export class MenuItemInfoA extends MenuItemInfo<IMenuItemInfoA> {
  constructor(options: Partial<Omit<IMenuItemInfoA, 'cbSize'>>) {
    super(options);

    this.cbSize = koffi.sizeof(MENUITEMINFOA);
  }
}

export const MENUITEMINFOW = koffi.struct('MENUITEMINFOW', {
  cbSize: UINT,
  fMask: UINT,
  fType: UINT,
  fState: UINT,
  wID: UINT,
  hSubMenu: HMENU,
  hbmpChecked: HBITMAP,
  hbmpUnchecked: HBITMAP,
  dwItemData: ULONG_PTR,
  dwTypeData: LPWSTR,
  cch: UINT,
  hbmpItem: HBITMAP,
});

export const LPMENUITEMINFOW = koffi.pointer('LPMENUITEMINFOW', MENUITEMINFOW);

export const MENUITEMINFOA = koffi.struct('MENUITEMINFOA', {
  cbSize: UINT,
  fMask: UINT,
  fType: UINT,
  fState: UINT,
  wID: UINT,
  hSubMenu: HMENU,
  hbmpChecked: HBITMAP,
  hbmpUnchecked: HBITMAP,
  dwItemData: ULONG_PTR,
  dwTypeData: LPWSTR,
  cch: UINT,
  hbmpItem: HBITMAP,
});

export const LPMENUITEMINFOA = koffi.pointer('LPMENUITEMINFOA', MENUITEMINFOA);
