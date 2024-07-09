import { DataType, load } from 'ffi-rs';

import { Kernel32 } from './kernel32';

export function GetModuleHandleW(moduleName: number = 0): number {
  return load({
    library: Kernel32.Name,
    funcName: 'GetModuleHandleW',
    retType: DataType.I32,
    paramsType: [DataType.I32],
    paramsValue: [moduleName],
  });
}
