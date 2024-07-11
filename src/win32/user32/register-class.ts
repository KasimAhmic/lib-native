import { DataType, createPointer, funcConstructor, load, unwrapPointer } from 'ffi-rs';

import { User32 } from './user32';

type RegisterClassOptions = {
  style: number;
  windowProcedure: (windowPointer: number, uMsg: number, wParam: number, lParam: number) => void;
  instanceHandle: number;
  iconHandle: number;
  cursorHandle: number;
  backgroundBrushHandle: number;
  menuName: number;
  className: string;
  cbClsExtra?: number;
  cbWndExtra?: number;
};

/**
 *
 * @param options
 * @returns
 *
 * @deprecated Broken, needs to be fixed
 */
export function RegisterClassW(options: RegisterClassOptions) {
  const windowProcedurePointer = createPointer({
    paramsType: [
      funcConstructor({
        paramsType: [DataType.I32, DataType.I32, DataType.I32, DataType.I32],
        retType: DataType.Void,
      }),
    ],
    paramsValue: [options.windowProcedure],
  });
  const cbClsExtra = options.cbClsExtra ?? 0;
  const cbWndExtra = options.cbWndExtra ?? 0;

  const windowType = {
    lpfnWndProc: DataType.External,
    hInstance: DataType.I32,
    lpszClassName: DataType.String,
  };

  return load({
    library: User32.Name,
    funcName: 'RegisterClassW',
    retType: {
      style: DataType.I32,
      lpfnWndProc: DataType.External,
      hInstance: DataType.I32,
      lpszClassName: DataType.String,
    },
    paramsType: [windowType],
    paramsValue: [
      {
        style: 0,
        lpfnWndProc: windowProcedurePointer[0],
        hInstance: options.instanceHandle,
        lpszClassName: options.className,
      },
    ],
  });
}
