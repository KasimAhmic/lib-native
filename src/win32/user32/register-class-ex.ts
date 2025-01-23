import { ATOM, Atom } from '../../@types';
import { IWindowClassExA, IWindowClassExW, WNDCLASSEXA, WNDCLASSEXW } from '../structs/window-class';
import { user32 } from './user32';

export function RegisterClassExW(windowClass: IWindowClassExW): Atom {
  return user32.invoke('RegisterClassExW', ATOM, [WNDCLASSEXW], [windowClass]);
}

export function RegisterClassExA(windowClass: IWindowClassExA): Atom {
  return user32.invoke('RegisterClassExA', ATOM, [WNDCLASSEXA], [windowClass]);
}
