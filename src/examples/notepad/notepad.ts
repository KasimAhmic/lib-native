/**
 * Proof of concept Notepad example using lib-native.
 *
 * Todos:
 * - Update the title bar to show the file name
 * - Implement a state system to track changes (WIP)
 * - Implement File menu actions
 * - Implement Edit menu actions
 * - Implement Format menu actions (WIP)
 * - Implement View menu actions
 * - Implement Help menu actions
 */
import { join, resolve } from 'node:path';

import { IconHandle, WindowHandle } from '../../@types';
import { comctl32 } from '../../win32/comctl32/comctl32';
import { InitCommonControlsEx } from '../../win32/comctl32/init-common-controls-ex';
import { gdi32 } from '../../win32/gdi32/gdi32';
import { createCookie } from '../../win32/helpers/create-cookie';
import { ActivateActCtx } from '../../win32/kernel32/activate-act-ctx';
import { CreateActCtxW } from '../../win32/kernel32/create-act-ctx';
import { GetLastError } from '../../win32/kernel32/get-last-error';
import { GetModuleHandleW } from '../../win32/kernel32/get-module-handle';
import { kernel32 } from '../../win32/kernel32/kernel32';
import { ActivationContextW } from '../../win32/structs/activation-context';
import { CommonControlStyles, InitCommonControlsExStruct } from '../../win32/structs/init-common-controls-ex';
import { Message } from '../../win32/structs/message';
import { ClassStyle, WindowClassExW } from '../../win32/structs/window-class';
import { CreateAcceleratorTableW } from '../../win32/user32/create-accelerator-table';
import {
  CreateWindowExW,
  ExtendedWindowStyle,
  WindowPosition,
  WindowStyle,
} from '../../win32/user32/create-window-ex';
import { DefWindowProcW } from '../../win32/user32/def-window-proc';
import { DispatchMessageW } from '../../win32/user32/dispatch-message';
import { GetMessageW } from '../../win32/user32/get-message';
import { Cursor, LoadCursorW } from '../../win32/user32/load-cursor';
import { Image, LoadImageW, LoadResource } from '../../win32/user32/load-image';
import { MessageBoxButtons, MessageBoxIcon, MessageBoxW } from '../../win32/user32/message-box';
import { PostQuitMessage } from '../../win32/user32/post-quit-message';
import { RegisterClassExW } from '../../win32/user32/register-class-ex';
import { Control } from '../../win32/user32/send-message';
import { ShowWindow } from '../../win32/user32/show-window';
import { TranslateAcceleratorW } from '../../win32/user32/translate-accelerator';
import { TranslateMessage } from '../../win32/user32/translate-message';
import { UpdateWindow } from '../../win32/user32/update-window';
import { user32 } from '../../win32/user32/user32';
import { handleMenu } from './handlers/menu.handler';
import { handleSize } from './handlers/size.handler';
import { handleWindowCreate } from './handlers/window-create.handler';
import { ACCELERATORS, CLASS_NAME, WINDOW_HEIGHT, WINDOW_WIDTH } from './notepad.constants';
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
      return handleWindowCreate();

    case Control.WM_COMMAND:
      return handleMenu(wordParam, longParam);

    case Control.WM_DESTROY:
      PostQuitMessage(0);
      return 0;

    case Control.WM_SIZE:
      return handleSize(longParam);

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
    lpSource: resolve(process.cwd(), 'src', 'examples', 'notepad', 'notepad.manifest'),
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

  const acceleratorTable = CreateAcceleratorTableW(ACCELERATORS, ACCELERATORS.length);

  if (!acceleratorTable) {
    const errorCode = GetLastError();

    MessageBoxW(
      null,
      `Error: ${errorCode}`,
      'Failed to create accelerator table.',
      MessageBoxButtons.OK | MessageBoxIcon.ICON_ERROR,
    );

    return 1;
  }

  const windowClass = new WindowClassExW({
    style: ClassStyle.VREDRAW | ClassStyle.HREDRAW,
    lpszClassName: CLASS_NAME,
    hInstance: state.handles.instanceHandle,
    hCursor: LoadCursorW(null, Cursor.IDC_ARROW),
    hIcon: LoadImageW(
      null,
      join(process.cwd(), 'src', 'examples', 'notepad', 'notepad.ico'),
      Image.ICON,
      64,
      64,
      LoadResource.LOADFROMFILE | LoadResource.SHARED,
    ) as IconHandle,
    hIconSm: LoadImageW(
      null,
      join(process.cwd(), 'src', 'examples', 'notepad', 'notepad.ico'),
      Image.ICON,
      16,
      16,
      LoadResource.LOADFROMFILE | LoadResource.SHARED,
    ) as IconHandle,
    hbrBackground: 13,
    lpfnWndProc: WindowProcedure,
  });

  RegisterClassExW(windowClass);

  state.handles.mainWindowHandle = CreateWindowExW(
    ExtendedWindowStyle.WINDOW_EDGE | ExtendedWindowStyle.ACCEPT_FILES,
    CLASS_NAME,
    'Untitled - Notepad',
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
    if (!TranslateAcceleratorW(state.handles.mainWindowHandle, acceleratorTable, msg)) {
      TranslateMessage(msg);
      DispatchMessageW(msg);
    }
  }

  return 0;
}

process.exitCode = WinMain(GetModuleHandleW(null), 1);
