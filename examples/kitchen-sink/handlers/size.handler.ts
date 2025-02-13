import { Rect, WindowHandle } from '@ahmic/lib-native';
import { GetClientRect } from '@ahmic/lib-native/win32/user32/get-client-rect';
import { MoveWindow } from '@ahmic/lib-native/win32/user32/move-window';

import { PADDING } from '../kitchen-sink.constants';
import { state } from '../state';

export function handleSize(
  windowHandle: WindowHandle,
  _message: number,
  _wordParam: number,
  _longParam: number,
): number {
  const rect = new Rect();
  GetClientRect(windowHandle, rect);

  const rectangleWidth = Math.max(250, Math.round(rect.right / 4 - PADDING));

  MoveWindow(
    state.handles.dropdownHandle,
    PADDING * 2,
    PADDING * 3 + 26,
    rectangleWidth - PADDING * 3,
    26,
    0,
  );

  return 0;
}
