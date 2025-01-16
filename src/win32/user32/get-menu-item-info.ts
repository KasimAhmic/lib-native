import koffi from 'koffi';

import { BOOL, HMENU, MenuHandle, UINT, UnsignedInt } from '../../@types';
import { IMenuItemInfoA, IMenuItemInfoW, LPMENUITEMINFOA, LPMENUITEMINFOW } from '../structs/menu-item-info';
import { user32 } from './user32';

export function GetMenuItemInfoW(
  menuHandle: MenuHandle,
  item: UnsignedInt,
  byPosition: boolean,
  menuItemInfo: IMenuItemInfoW,
) {
  return user32.invoke(
    'GetMenuItemInfoW',
    BOOL,
    [HMENU, UINT, BOOL, koffi.inout(LPMENUITEMINFOW)],
    [menuHandle, item, byPosition ? 1 : 0, menuItemInfo],
  );
}

export function GetMenuItemInfoA(
  menuHandle: MenuHandle,
  item: UnsignedInt,
  byPosition: boolean,
  menuItemInfo: IMenuItemInfoA,
) {
  return user32.invoke(
    'GetMenuItemInfoA',
    BOOL,
    [HMENU, UINT, BOOL, koffi.inout(LPMENUITEMINFOA)],
    [menuHandle, item, byPosition ? 1 : 0, menuItemInfo],
  );
}
