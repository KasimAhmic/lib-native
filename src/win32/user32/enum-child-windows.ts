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
 * Enumerates the child windows that belong to the specified parent window by passing the handle to each
 * child window, in turn, to an application-defined callback function. EnumChildWindows continues until the
 * last child window is enumerated or the callback function returns FALSE.
 *
 * @param parentWindowHandle The handle to the parent window whose child windows are to be enumerated.
 * @param callback The callback function that receives the handle to each window.
 * @param param An application-defined value to be passed to the callback function.
 *
 * @see https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-enumchildwindows
 */
export async function EnumChildWindows(
  parentWindowHandle: number,
  callback: (childWindowHandle: number, param: number) => boolean,
  param: number,
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
    funcName: 'EnumChildWindows',
    retType: DataType.Boolean,
    paramsType: [DataType.I32, DataType.External, DataType.I32],
    paramsValue: [parentWindowHandle, unwrapPointer(callbackPointer)[0], param],
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
