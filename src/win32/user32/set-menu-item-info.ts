import { BOOL, HMENU, MenuHandle, PVOID, UINT, UnsignedInt } from '../../@types';
import { IMenuItemInfoA, IMenuItemInfoW, LPMENUITEMINFOA, LPMENUITEMINFOW } from '../structs/menu-item-info';
import { user32 } from './user32';

export function SetMenuItemInfoW(
  menuHandle: MenuHandle,
  item: UnsignedInt,
  byPosition: boolean,
  menuItemInfo: IMenuItemInfoW,
): number {
  return user32.invoke(
    'SetMenuItemInfoW',
    BOOL,
    [HMENU, UINT, BOOL, LPMENUITEMINFOW],
    [menuHandle, item, byPosition ? 1 : 0, menuItemInfo],
  );
}

export function SetMenuItemInfoA(
  menuHandle: MenuHandle,
  item: UnsignedInt,
  byPosition: boolean,
  menuItemInfo: IMenuItemInfoA,
): number {
  return user32.invoke(
    'SetMenuItemInfoA',
    BOOL,
    [HMENU, UINT, BOOL, LPMENUITEMINFOA],
    [menuHandle, item, byPosition ? 1 : 0, menuItemInfo],
  );
}
