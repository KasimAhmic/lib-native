import { resolve } from 'node:path';

import { Logger } from './util/logger';
import { comctl32 } from './win32/comctl32/comctl32';
import { InitCommonControlsEx } from './win32/comctl32/init-common-controls-ex';
import { createCookie } from './win32/helpers/create-cookie';
import { ActivateActCtx } from './win32/kernel32/activate-act-ctx';
import { CreateActCtxW } from './win32/kernel32/create-act-ctx';
import { GetModuleHandleW } from './win32/kernel32/get-module-handle';
import { kernel32 } from './win32/kernel32/kernel32';
import { ActivationContextW } from './win32/structs/activation-context';
import { Message } from './win32/structs/message';
import { Rect } from './win32/structs/rect';
import { ButtonStyle, CreateWindowEx, WindowStyle } from './win32/user32/create-window-ex';
import { DefWindowProcW } from './win32/user32/def-window-proc';
import { DispatchMessageW } from './win32/user32/dispatch-message';
import { GetClientRect } from './win32/user32/get-client-rect';
import { GetMessageW } from './win32/user32/get-message';
import { Cursor, LoadCursorW } from './win32/user32/load-cursor';
import { Icon, LoadIconW } from './win32/user32/load-icon';
import { MessageBoxButtons, MessageBoxIcon, MessageBoxW } from './win32/user32/message-box';
import { PostQuitMessage } from './win32/user32/post-quit-message';
import { RegisterClassExW } from './win32/user32/register-class-ex';
import { Control } from './win32/user32/send-message';
import { ShowWindow } from './win32/user32/show-window';
import { TranslateMessage } from './win32/user32/translate-message';
import { UpdateWindow } from './win32/user32/update-window';
import { user32 } from './win32/user32/user32';
import { uxTheme } from './win32/uxtheme/ux-theme';

console.log('\n'.repeat(20));

user32.load();
kernel32.load();
comctl32.load();
uxTheme.load();

const logger = new Logger('main');

const times: number[] = [];

function wndProc(windowPointer: number, uMsg: number, wParam: number, lParam: number) {
  let ret: number;
  switch (uMsg) {
    case Control.WM_DESTROY:
      PostQuitMessage(0);
      ret = 0;
      break;

    case Control.WM_COMMAND:
      switch (wParam) {
        case 1:
          MessageBoxW(windowPointer, 'OK button clicked', 'OK', {
            buttons: MessageBoxButtons.OK,
            icon: MessageBoxIcon.ICON_INFORMATION,
          });

          break;

        case 2:
          MessageBoxW(windowPointer, 'Cancel button clicked', 'Cancel', {
            buttons: MessageBoxButtons.OK,
            icon: MessageBoxIcon.ICON_INFORMATION,
          });

          break;

        default:
          break;
      }

      ret = 0;

      break;

    default:
      ret = DefWindowProcW(windowPointer, uMsg, wParam, lParam);

      break;
  }

  return ret;
}

function WinMain(instanceHandle: number, showCmd: number): number {
  InitCommonControlsEx(0x00004000);

  const actContext = new ActivationContextW({
    lpSource: resolve(process.cwd(), 'src', 'lib-native.manifest'),
  });

  const contextHandle = CreateActCtxW(actContext);

  if (!contextHandle) {
    MessageBoxW(null, 'Failed to create activation context.', 'Error', {
      buttons: MessageBoxButtons.OK,
      icon: MessageBoxIcon.ICON_ERROR,
    });

    return 1;
  }

  const cookie = createCookie();

  if (!ActivateActCtx(contextHandle, cookie)) {
    MessageBoxW(null, 'Failed to activate activation context.', 'Error', {
      buttons: MessageBoxButtons.OK,
      icon: MessageBoxIcon.ICON_ERROR,
    });
  }

  RegisterClassExW({
    className: 'TestWindowClass',
    style: 2 | 1,
    instanceHandle: instanceHandle,
    cursorHandle: LoadCursorW(null, Cursor.IDC_ARROW),
    iconHandle: LoadIconW(instanceHandle, Icon.IDI_APPLICATION),
    smallIconHandle: LoadIconW(instanceHandle, Icon.IDI_APPLICATION),
    backgroundBrushHandle: 13,
    windowProcedure: wndProc,
  });

  const mainWindowHandle = CreateWindowEx(
    512,
    'TestWindowClass',
    'Test Window',
    13565952 | 2097152,
    2147483648,
    2147483648,
    800,
    600,
    0,
    0,
    instanceHandle,
    0,
  );

  if (!mainWindowHandle) {
    MessageBoxW(null, 'Failed to create window.', 'Error', {
      buttons: MessageBoxButtons.OK,
      icon: MessageBoxIcon.ICON_ERROR,
    });
  }

  const okButtonHandle = CreateWindowEx(
    512,
    'BUTTON',
    'OK',
    WindowStyle.TAB_STOP | WindowStyle.VISIBLE | WindowStyle.CHILD | ButtonStyle.DEFPUSHBUTTON,
    10,
    10,
    100,
    25,
    mainWindowHandle,
    1,
    instanceHandle,
    0,
  );

  const cancelButtonHandle = CreateWindowEx(
    512,
    'BUTTON',
    'Cancel',
    WindowStyle.TAB_STOP | WindowStyle.VISIBLE | WindowStyle.CHILD | ButtonStyle.PUSHBUTTON,
    120,
    10,
    100,
    25,
    mainWindowHandle,
    2,
    instanceHandle,
    0,
  );

  ShowWindow(mainWindowHandle, showCmd);
  UpdateWindow(mainWindowHandle);

  const msg = new Message();

  while (GetMessageW(msg, null, 0, 0)) {
    TranslateMessage(msg);
    DispatchMessageW(msg);
  }

  return 0;
}

WinMain(GetModuleHandleW(null), 1);
