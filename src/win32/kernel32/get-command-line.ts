import { DataType, JsExternal, load } from 'ffi-rs';

import { Kernel32 } from './kernel32';

export function GetCommandLineW(): JsExternal {
  return load({
    library: Kernel32.Name,
    funcName: 'GetCommandLineW',
    retType: DataType.External,
    paramsType: [],
    paramsValue: [],
  });
}
