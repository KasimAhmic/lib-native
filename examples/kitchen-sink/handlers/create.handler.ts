import {
  BUTTON_CLASS_NAME,
  COMBOBOX_CLASS_NAME,
  WindowHandle,
  wideStringToLongParam,
} from '@ahmic/lib-native';
import { CreateFontW } from '@ahmic/lib-native/win32/gdi32/create-font';
import {
  ComboBoxStyle,
  CreateWindowExW,
  ExtendedWindowStyle,
  WindowPosition,
  WindowStyle,
} from '@ahmic/lib-native/win32/user32/create-window-ex';
import { Control, SendMessageW } from '@ahmic/lib-native/win32/user32/send-message';
import koffi from 'koffi';

import { state } from '../state';

export function handleCreate(
  windowHandle: WindowHandle,
  _message: number,
  _wordParam: number,
  _longParam: number,
): number {
  state.handles.fontHandle = CreateFontW(
    -state.font.height,
    state.font.width,
    state.font.escapement,
    state.font.orientation,
    state.font.weight,
    state.font.italic,
    state.font.underline,
    state.font.strikeOut,
    state.font.charSet,
    state.font.outPrecision,
    state.font.clipPrecision,
    state.font.quality,
    state.font.pitchAndFamily,
    state.font.fontFaceName,
  );

  state.handles.okButtonHandle = createButton(windowHandle, 'OK', 10, 10, 100, 26);
  state.handles.cancelButtonHandle = createButton(windowHandle, 'Cancel', 110, 10, 100, 26);

  state.handles.dropdownHandle = CreateWindowExW(
    0,
    COMBOBOX_CLASS_NAME,
    null,
    WindowStyle.CHILD | WindowStyle.VISIBLE | ComboBoxStyle.DROPDOWN | WindowStyle.V_SCROLL,
    WindowPosition.USE_DEFAULT,
    WindowPosition.USE_DEFAULT,
    WindowPosition.USE_DEFAULT,
    WindowPosition.USE_DEFAULT,
    windowHandle,
    1,
    null,
    null,
  );

  SendMessageW(state.handles.dropdownHandle, Control.WM_SETFONT, koffi.address(state.handles.fontHandle), 1);
  SendMessageW(state.handles.dropdownHandle, Control.CB_ADDSTRING, 0, wideStringToLongParam('Option 1'));
  SendMessageW(state.handles.dropdownHandle, Control.CB_ADDSTRING, 0, wideStringToLongParam('Option 2'));
  SendMessageW(state.handles.dropdownHandle, Control.CB_ADDSTRING, 0, wideStringToLongParam('Option 3'));
  SendMessageW(state.handles.dropdownHandle, Control.CB_ADDSTRING, 0, wideStringToLongParam('Option 4'));
  SendMessageW(state.handles.dropdownHandle, Control.CB_ADDSTRING, 0, wideStringToLongParam('Option 5'));

  return 0;
}

function createButton(
  windowHandle: WindowHandle,
  text: string,
  x: number,
  y: number,
  width: number,
  height: number,
) {
  const handle = CreateWindowExW(
    0,
    BUTTON_CLASS_NAME,
    text,
    WindowStyle.CHILD | WindowStyle.VISIBLE,
    x,
    y,
    width,
    height,
    windowHandle,
    0,
    0,
    0,
  );

  SendMessageW(handle, Control.WM_SETFONT, koffi.address(state.handles.fontHandle), 1);

  return handle;
}
