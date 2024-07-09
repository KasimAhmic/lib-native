import { DataType, load } from 'ffi-rs';

import { Kernel32 } from './kernel32';

export function GetStartupInfoW(buffer: Buffer): void {
  return load({
    library: Kernel32.Name,
    funcName: 'GetStartupInfoW',
    retType: DataType.Void,
    paramsType: [DataType.U8Array],
    paramsValue: [buffer],
  });
}
