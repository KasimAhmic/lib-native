import { join } from 'node:path';

import {
  ActivationContextW,
  ClassStyle,
  CommonControlStyles,
  IconHandle,
  InitCommonControlsExStruct,
  Message,
  RGB,
  WindowClassExW,
  WindowHandle,
} from '@ahmic/lib-native';
import { comctl32 } from '@ahmic/lib-native/win32/comctl32/comctl32';
import { InitCommonControlsEx } from '@ahmic/lib-native/win32/comctl32/init-common-controls-ex';
import { CreateSolidBrush } from '@ahmic/lib-native/win32/gdi32/create-solid-brush';
import { gdi32 } from '@ahmic/lib-native/win32/gdi32/gdi32';
import { createCookie } from '@ahmic/lib-native/win32/helpers/create-cookie';
import { ActivateActCtx } from '@ahmic/lib-native/win32/kernel32/activate-act-ctx';
import { CreateActCtxW } from '@ahmic/lib-native/win32/kernel32/create-act-ctx';
import { GetLastError } from '@ahmic/lib-native/win32/kernel32/get-last-error';
import { GetModuleHandleW } from '@ahmic/lib-native/win32/kernel32/get-module-handle';
import { kernel32 } from '@ahmic/lib-native/win32/kernel32/kernel32';
import { CreateAcceleratorTableW } from '@ahmic/lib-native/win32/user32/create-accelerator-table';
import {
  CreateWindowExW,
  ExtendedWindowStyle,
  WindowPosition,
  WindowStyle,
} from '@ahmic/lib-native/win32/user32/create-window-ex';
import { DefWindowProcW } from '@ahmic/lib-native/win32/user32/def-window-proc';
import { DispatchMessageW } from '@ahmic/lib-native/win32/user32/dispatch-message';
import { GetMessageW } from '@ahmic/lib-native/win32/user32/get-message';
import { Cursor, LoadCursorW } from '@ahmic/lib-native/win32/user32/load-cursor';
import { Image, LoadImageW, LoadResource } from '@ahmic/lib-native/win32/user32/load-image';
import { MessageBoxButtons, MessageBoxIcon, MessageBoxW } from '@ahmic/lib-native/win32/user32/message-box';
import { PostQuitMessage } from '@ahmic/lib-native/win32/user32/post-quit-message';
import { RegisterClassExW } from '@ahmic/lib-native/win32/user32/register-class-ex';
import { Control } from '@ahmic/lib-native/win32/user32/send-message';
import { SetWindowPos } from '@ahmic/lib-native/win32/user32/set-window-pos';
import { ShowWindow } from '@ahmic/lib-native/win32/user32/show-window';
import { TranslateMessage } from '@ahmic/lib-native/win32/user32/translate-message';
import { UpdateWindow } from '@ahmic/lib-native/win32/user32/update-window';
import { user32 } from '@ahmic/lib-native/win32/user32/user32';

import { handleCreate } from './handlers/create.handler';
import { handlePaint } from './handlers/paint.handler';
import { handleSize } from './handlers/size.handler';
import { CLASS_NAME, WINDOW_HEIGHT, WINDOW_WIDTH } from './kitchen-sink.constants';
import { state } from './state';

comctl32.load();
kernel32.load();
user32.load();
gdi32.load();

function WindowProcedure(
  windowHandle: WindowHandle,
  message: number,
  wordParam: number,
  longParam: number,
): number {
  switch (message) {
    case Control.WM_CREATE:
      state.handles.mainWindowHandle = windowHandle;
      return handleCreate(windowHandle, message, wordParam, longParam);

    case Control.WM_PAINT:
      return handlePaint(windowHandle, message, wordParam, longParam);

    case Control.WM_SIZE:
      return handleSize(windowHandle, message, wordParam, longParam);

    case Control.WM_DESTROY:
      PostQuitMessage(0);
      return 0;

    default:
      return DefWindowProcW(windowHandle, message, wordParam, longParam);
  }
}

function WinMain(instanceHandle: number, showCmd: number): number {
  state.handles.instanceHandle = instanceHandle;

  const initCommonControlsEx = new InitCommonControlsExStruct({
    dwICC: CommonControlStyles.BAR_CLASSES,
  });

  InitCommonControlsEx(initCommonControlsEx);

  const activationContext = new ActivationContextW({
    lpSource: join(process.cwd(), 'kitchen-sink', 'kitchen-sink.manifest'),
  });

  const activationContextHandle = CreateActCtxW(activationContext);

  if (!activationContextHandle) {
    const errorCode = GetLastError();

    MessageBoxW(
      null,
      `Error: ${errorCode}`,
      'Failed to create activation context.',
      MessageBoxButtons.OK | MessageBoxIcon.ICON_ERROR,
    );

    return 1;
  }

  const cookie = createCookie();

  if (!ActivateActCtx(activationContextHandle, cookie)) {
    const errorCode = GetLastError();

    MessageBoxW(
      null,
      `Error: ${errorCode}`,
      'Failed to activate activation context.',
      MessageBoxButtons.OK | MessageBoxIcon.ICON_ERROR,
    );
  }

  const windowClass = new WindowClassExW({
    style: ClassStyle.VREDRAW | ClassStyle.HREDRAW,
    lpszClassName: CLASS_NAME,
    hInstance: state.handles.instanceHandle,
    hCursor: LoadCursorW(null, Cursor.IDC_ARROW),
    hIcon: LoadImageW(
      null,
      join(process.cwd(), 'kitchen-sink', 'kitchen-sink.ico'),
      Image.ICON,
      64,
      64,
      LoadResource.LOADFROMFILE | LoadResource.SHARED,
    ) as IconHandle,
    hIconSm: LoadImageW(
      null,
      join(process.cwd(), 'kitchen-sink', 'kitchen-sink.ico'),
      Image.ICON,
      16,
      16,
      LoadResource.LOADFROMFILE | LoadResource.SHARED,
    ) as IconHandle,
    hbrBackground: CreateSolidBrush(RGB(240, 240, 240)),
    lpfnWndProc: WindowProcedure,
  });

  RegisterClassExW(windowClass);

  state.handles.mainWindowHandle = CreateWindowExW(
    ExtendedWindowStyle.WINDOW_EDGE,
    CLASS_NAME,
    'Kitchen Sink',
    WindowStyle.MAXIMIZE_BOX |
      WindowStyle.MINIMIZE_BOX |
      WindowStyle.SIZE_BOX |
      WindowStyle.SYS_MENU |
      WindowStyle.DLG_FRAME |
      WindowStyle.BORDER |
      WindowStyle.CLIP_SIBLINGS |
      WindowStyle.VISIBLE,
    WindowPosition.USE_DEFAULT,
    WindowPosition.USE_DEFAULT,
    WINDOW_WIDTH,
    WINDOW_HEIGHT,
    0,
    0,
    state.handles.instanceHandle,
    0,
  );

  if (!state.handles.mainWindowHandle) {
    const errorCode = GetLastError();

    MessageBoxW(
      null,
      `Error: ${errorCode}`,
      'Failed to create window.',
      MessageBoxButtons.OK | MessageBoxIcon.ICON_ERROR,
    );

    return 1;
  }

  ShowWindow(state.handles.mainWindowHandle, showCmd);
  UpdateWindow(state.handles.mainWindowHandle);

  const msg = new Message();

  while (GetMessageW(msg, null, 0, 0)) {
    TranslateMessage(msg);
    DispatchMessageW(msg);
  }

  return 0;
}

process.exitCode = WinMain(GetModuleHandleW(null), 1);
