import koffi from 'koffi';

import {
  BrushHandle,
  CursorHandle,
  HBRUSH,
  HCURSOR,
  HICON,
  HINSTANCE,
  INT,
  IconHandle,
  InstanceHandle,
  Int,
  LPCSTR,
  LPCWSTR,
  LongPointerToConstantString,
  LongPointerToConstantWideString,
  UINT,
  UnsignedInt,
  WNDPROC,
  WindowProcedure,
} from '../../@types';

export enum ClassStyle {
  BYTEALIGNCLIENT = 0x1000,
  BYTEALIGNWINDOW = 0x2000,
  CLASSDC = 0x0040,
  DBLCLKS = 0x0008,
  DROPSHADOW = 0x00020000,
  GLOBALCLASS = 0x4000,
  HREDRAW = 0x0002,
  NOCLOSE = 0x0200,
  OWNDC = 0x0020,
  PARENTDC = 0x0080,
  SAVEBITS = 0x0800,
  VREDRAW = 0x0001,
}

interface IWindowClassEx {
  cbSize: UnsignedInt;
  style?: ClassStyle;
  lpfnWndProc: WindowProcedure;
  cbClsExtra?: Int;
  cbWndExtra?: Int;
  hInstance: InstanceHandle;
  hIcon?: IconHandle;
  hCursor?: CursorHandle;
  hbrBackground?: BrushHandle;
  hIconSm?: IconHandle;
}

class WindowClassEx<T extends IWindowClassExW | IWindowClassExA> {
  cbSize: UnsignedInt;
  style: UnsignedInt;
  lpfnWndProc: WindowProcedure;
  cbClsExtra: Int;
  cbWndExtra: Int;
  hInstance: InstanceHandle;
  hIcon: IconHandle;
  hCursor: CursorHandle;
  hbrBackground: BrushHandle;
  lpszMenuName: T['lpszMenuName'];
  lpszClassName: T['lpszClassName'];
  hIconSm: IconHandle;

  constructor(options: Omit<T, 'cbSize'>) {
    const { lpfnWndProc, ...rest } = options;

    Object.assign(this, {
      style: 0,
      cbClsExtra: 0,
      cbWndExtra: 0,
      hIcon: 0,
      hCursor: 0,
      hIconSm: 0,
      lpszMenuName: null,
      lpfnWndProc: koffi.register(lpfnWndProc, WNDPROC),
      ...rest,
    });
  }
}

export interface IWindowClassExW extends IWindowClassEx {
  lpszMenuName?: LongPointerToConstantWideString;
  lpszClassName: LongPointerToConstantWideString;
}

export class WindowClassExW extends WindowClassEx<IWindowClassExW> {
  constructor(options: Omit<IWindowClassExW, 'cbSize'>) {
    super(options);

    this.cbSize = koffi.sizeof(WNDCLASSEXW);
  }
}

export interface IWindowClassExA extends IWindowClassEx {
  lpszMenuName?: LongPointerToConstantString;
  lpszClassName: LongPointerToConstantString;
}

export class WindowClassExA extends WindowClassEx<IWindowClassExA> {
  constructor(options: Omit<IWindowClassExA, 'cbSize'>) {
    super(options);

    this.cbSize = koffi.sizeof(WNDCLASSEXA);
  }
}

export const WNDCLASSEXW = koffi.struct('WNDCLASSEXW', {
  cbSize: UINT,
  style: UINT,
  lpfnWndProc: WNDPROC,
  cbClsExtra: INT,
  cbWndExtra: INT,
  hInstance: HINSTANCE,
  hIcon: HICON,
  hCursor: HCURSOR,
  hbrBackground: HBRUSH,
  lpszMenuName: LPCWSTR,
  lpszClassName: LPCWSTR,
  hIconSm: HICON,
});

export const LPWNDCLASSEXW = koffi.pointer('LPWNDCLASSEXW', WNDCLASSEXW);

export const WNDCLASSEXA = koffi.struct('WNDCLASSEXA', {
  cbSize: UINT,
  style: UINT,
  lpfnWndProc: WNDPROC,
  cbClsExtra: INT,
  cbWndExtra: INT,
  hInstance: HINSTANCE,
  hIcon: HICON,
  hCursor: HCURSOR,
  hbrBackground: HBRUSH,
  lpszMenuName: LPCSTR,
  lpszClassName: LPCSTR,
  hIconSm: HICON,
});

export const LPWNDCLASSEXA = koffi.pointer('LPWNDCLASSEXA', WNDCLASSEXA);
