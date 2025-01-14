/**
 * Proof of concept Notepad example using lib-native.
 *
 * Todos:
 * - Add a menu bar
 * - Add a status bar
 * - Figure out how to set fonts, the default one is ugly
 * - Set the icon to a notepad icon
 * - Update the title bar to show the file name
 */
import { resolve } from 'node:path';

import { comctl32 } from '../win32/comctl32/comctl32';
import { InitCommonControlsEx } from '../win32/comctl32/init-common-controls-ex';
import { createCookie } from '../win32/helpers/create-cookie';
import { ActivateActCtx } from '../win32/kernel32/activate-act-ctx';
import { CreateActCtxW } from '../win32/kernel32/create-act-ctx';
import { GetLastError } from '../win32/kernel32/get-last-error';
import { GetModuleHandleW } from '../win32/kernel32/get-module-handle';
import { kernel32 } from '../win32/kernel32/kernel32';
import { ActivationContextW } from '../win32/structs/activation-context';
import { Message } from '../win32/structs/message';
import { CreateWindowEx, EditStyle, WindowStyle } from '../win32/user32/create-window-ex';
import { DefWindowProcW } from '../win32/user32/def-window-proc';
import { DispatchMessageW } from '../win32/user32/dispatch-message';
import { GetMessageW } from '../win32/user32/get-message';
import { Cursor, LoadCursorW } from '../win32/user32/load-cursor';
import { Icon, LoadIconW } from '../win32/user32/load-icon';
import { MessageBoxButtons, MessageBoxIcon, MessageBoxW } from '../win32/user32/message-box';
import { PostQuitMessage } from '../win32/user32/post-quit-message';
import { RegisterClassExW } from '../win32/user32/register-class-ex';
import { Control, SendMessageW } from '../win32/user32/send-message';
import { SetWindowPos } from '../win32/user32/set-window-pos';
import { ShowWindow } from '../win32/user32/show-window';
import { TranslateMessage } from '../win32/user32/translate-message';
import { UpdateWindow } from '../win32/user32/update-window';
import { user32 } from '../win32/user32/user32';

comctl32.load();
kernel32.load();
user32.load();

const CLASS_NAME = 'LibNativeNotepadClass';
const EDIT_ID = 1;

let editHandle: number;

function WindowProcedure(windowPointer: number, uMsg: number, wParam: number, lParam: number) {
  let ret: number;
  switch (uMsg) {
    case Control.WM_DESTROY:
      PostQuitMessage(0);
      ret = 0;
      break;

    case Control.WM_SIZE:
      const width = lParam & 0xffff;
      const height = (lParam >> 16) & 0xffff;

      SetWindowPos({
        windowHandle: editHandle,
        x: 0,
        y: 0,
        width: width,
        height: height,
        flags: 0x0040 | 0x0020,
      });
    default:
      ret = DefWindowProcW(windowPointer, uMsg, wParam, lParam);

      break;
  }

  return ret;
}

function WinMain(instanceHandle: number, showCmd: number): number {
  // TODO: Create an enum for this
  InitCommonControlsEx(0x00004000);

  const activationContext = new ActivationContextW({
    lpSource: resolve(process.cwd(), 'src', 'examples', 'notepad.manifest'),
  });

  const activationContextHandle = CreateActCtxW(activationContext);

  if (!activationContextHandle) {
    const errorCode = GetLastError();

    MessageBoxW(null, 'Failed to create activation context.', `Error: ${errorCode}`, {
      buttons: MessageBoxButtons.OK,
      icon: MessageBoxIcon.ICON_ERROR,
    });

    return 1;
  }

  const cookie = createCookie();

  if (!ActivateActCtx(activationContextHandle, cookie)) {
    const errorCode = GetLastError();

    MessageBoxW(null, 'Failed to activate activation context.', `Error: ${errorCode}`, {
      buttons: MessageBoxButtons.OK,
      icon: MessageBoxIcon.ICON_ERROR,
    });
  }

  RegisterClassExW({
    className: CLASS_NAME,
    // TODO: Create an enum for these
    style: 2 | 1,
    instanceHandle: instanceHandle,
    cursorHandle: LoadCursorW(null, Cursor.IDC_ARROW),
    iconHandle: LoadIconW(instanceHandle, Icon.IDI_APPLICATION),
    smallIconHandle: LoadIconW(instanceHandle, Icon.IDI_APPLICATION),
    backgroundBrushHandle: 13,
    windowProcedure: WindowProcedure,
  });

  const mainWindowHandle = CreateWindowEx(
    512,
    CLASS_NAME,
    'Lib Native Notepad',
    13565952,
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
    const errorCode = GetLastError();

    MessageBoxW(null, 'Failed to create window.', `Error: ${errorCode}`, {
      buttons: MessageBoxButtons.OK,
      icon: MessageBoxIcon.ICON_ERROR,
    });
  }

  editHandle = CreateWindowEx(
    0,
    'EDIT',
    '',
    WindowStyle.CHILD |
      WindowStyle.VISIBLE |
      WindowStyle.V_SCROLL |
      WindowStyle.H_SCROLL |
      EditStyle.LEFT |
      EditStyle.MULTILINE |
      EditStyle.AUTOVSCROLL,
    0,
    0,
    800,
    600,
    mainWindowHandle,
    EDIT_ID,
    instanceHandle,
    0,
  );

  SendMessageW(editHandle, Control.EM_SETLIMITTEXT, 1024 * 1024, 0);

  ShowWindow(mainWindowHandle, showCmd);
  UpdateWindow(mainWindowHandle);

  const msg = new Message();

  while (GetMessageW(msg, null, 0, 0)) {
    TranslateMessage(msg);
    DispatchMessageW(msg);
  }

  return 0;
}

process.exitCode = WinMain(GetModuleHandleW(null), 1);
