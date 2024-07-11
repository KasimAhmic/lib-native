import {
  DataType,
  PointerType,
  createPointer,
  freePointer,
  funcConstructor,
  load,
  unwrapPointer,
} from 'ffi-rs';

import { User32 } from './user32';

/**
 * Enumerates all top-level windows on the screen by passing the handle to each window, in turn, to an
 * application-defined callback function.
 *
 * @param callback The callback function that receives the handle to each window.
 * @param param An application-defined value to be passed to the callback function.
 *
 * @see https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-enumwindows
 */
export async function EnumWindows(
  callback: (windowHandle: number, lParam: number) => boolean,
  param: number = 0,
): Promise<boolean> {
  const funcParams = funcConstructor({
    paramsType: [DataType.I32, DataType.I32],
    retType: DataType.Boolean,
  });

  const callbackPointer = createPointer({
    paramsType: [funcParams],
    paramsValue: [callback],
  });

  const result = await load({
    library: User32.Name,
    funcName: 'EnumWindows',
    retType: DataType.Boolean,
    paramsType: [DataType.External, DataType.I32],
    paramsValue: [unwrapPointer(callbackPointer)[0], param],
    freeResultMemory: true,
    runInNewThread: true,
  });

  freePointer({
    paramsType: [funcParams],
    paramsValue: callbackPointer,
    pointerType: PointerType.RsPointer,
  });

  return result;
}
