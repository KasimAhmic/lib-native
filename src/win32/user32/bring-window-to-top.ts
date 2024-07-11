import { DataType, load } from 'ffi-rs';

import { User32 } from './user32';

export function BringWindowToTop(windowHandle: number): boolean {
  return load({
    library: User32.Name,
    funcName: 'BringWindowToTop',
    retType: DataType.Boolean,
    paramsType: [DataType.I32],
    paramsValue: [windowHandle],
  });
}
