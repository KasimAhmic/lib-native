import { Paint, RGB, Rect, WindowHandle } from '@ahmic/lib-native';
import { CreatePen, PenStyle } from '@ahmic/lib-native/win32/gdi32/create-pen';
import { CreateSolidBrush } from '@ahmic/lib-native/win32/gdi32/create-solid-brush';
import { DeleteObject } from '@ahmic/lib-native/win32/gdi32/delete-object';
import { RoundRect } from '@ahmic/lib-native/win32/gdi32/round-rect';
import { SelectObject } from '@ahmic/lib-native/win32/gdi32/select-object';
import { SetBkColor } from '@ahmic/lib-native/win32/gdi32/set-bk-color';
import { BackgroundMode, SetBkMode } from '@ahmic/lib-native/win32/gdi32/set-bk-mode';
import { SetTextColor } from '@ahmic/lib-native/win32/gdi32/set-text-color';
import { TextOutW } from '@ahmic/lib-native/win32/gdi32/text-out';
import { BeginPaint } from '@ahmic/lib-native/win32/user32/begin-paint';
import { EndPaint } from '@ahmic/lib-native/win32/user32/end-paint';
import { GetClientRect } from '@ahmic/lib-native/win32/user32/get-client-rect';
import { SetWindowPos, WindowFlag } from '@ahmic/lib-native/win32/user32/set-window-pos';

import { PADDING } from '../kitchen-sink.constants';
import { state } from '../state';

const title = ' Form Elements ';

export function handlePaint(
  windowHandle: WindowHandle,
  _message: number,
  _wordParam: number,
  _longParam: number,
): number {
  const rect = new Rect();
  GetClientRect(windowHandle, rect);

  const rectangleWidth = Math.max(250, Math.round(rect.right / 4 - PADDING));
  const rectangleHeight = 250;

  const buttonWidth = Math.round(rectangleWidth / 2 - PADDING * 2);
  const okButtonX = PADDING * 2;
  const cancelButtonX = PADDING * 3 + buttonWidth;
  const buttonY = PADDING * 2;

  const paint = new Paint();

  const deviceContextHandle = BeginPaint(windowHandle, paint);

  const pen = CreatePen(PenStyle.SOLID, 1, RGB(144, 144, 144));
  SelectObject(deviceContextHandle, pen);

  const brush = CreateSolidBrush(RGB(240, 240, 240));
  SelectObject(deviceContextHandle, brush);

  RoundRect(deviceContextHandle, PADDING, PADDING, rectangleWidth, rectangleHeight, 8, 8);

  DeleteObject(pen);
  DeleteObject(brush);

  SelectObject(deviceContextHandle, state.handles.fontHandle);
  SetTextColor(deviceContextHandle, RGB(12, 12, 12));
  SetBkMode(deviceContextHandle, BackgroundMode.OPAQUE);
  SetBkColor(deviceContextHandle, RGB(240, 240, 240));

  TextOutW(deviceContextHandle, PADDING * 2, 0, title, title.length);

  EndPaint(windowHandle, paint);

  SetWindowPos(state.handles.okButtonHandle, null, okButtonX, buttonY, buttonWidth, 26, WindowFlag.NO_ZORDER);
  SetWindowPos(
    state.handles.cancelButtonHandle,
    null,
    cancelButtonX,
    buttonY,
    buttonWidth,
    26,
    WindowFlag.NO_ZORDER,
  );

  return 0;
}
