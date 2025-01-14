import koffi from 'koffi';

import { ATOM, WNDCLASSEXW, WNDPROC } from '../../@types';
import { user32 } from './user32';

type RegisterClassOptions = {
  style: number;
  windowProcedure: (windowPointer: number, uMsg: number, wParam: number, lParam: number) => void;
  instanceHandle: number;
  iconHandle: number;
  smallIconHandle: number;
  cursorHandle: number;
  backgroundBrushHandle: number;
  menuName?: number;
  className: string;
  cbClsExtra?: number;
  cbWndExtra?: number;
};

export function RegisterClassExW(options: RegisterClassOptions) {
  return user32.invoke(
    'RegisterClassExW',
    ATOM,
    [WNDCLASSEXW],
    [
      {
        cbSize: koffi.sizeof(WNDCLASSEXW),
        style: options.style,
        lpfnWndProc: koffi.register(options.windowProcedure, WNDPROC),
        cbClsExtra: options.cbClsExtra ?? 0,
        cbWndExtra: options.cbWndExtra ?? 0,
        hInstance: options.instanceHandle ?? 0,
        hIcon: options.iconHandle ?? 0,
        hCursor: options.cursorHandle ?? 0,
        hbrBackground: options.backgroundBrushHandle ?? 0,
        lpszMenuName: options.menuName ?? 0,
        lpszClassName: options.className,
        hIconSm: options.smallIconHandle ?? 0,
      },
    ],
  );
}
