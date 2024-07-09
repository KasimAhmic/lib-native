import { DataType, load } from 'ffi-rs';

import { User32 } from './user32';

export function ShowWindow(windowHandle: number, cmdShow: number): boolean {
  return load({
    library: User32.Name,
    funcName: 'ShowWindow',
    retType: DataType.Boolean,
    paramsType: [DataType.I32, DataType.I32],
    paramsValue: [windowHandle, 1],
  });
}
