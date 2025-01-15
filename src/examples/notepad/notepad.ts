/**
 * Proof of concept Notepad example using lib-native.
 *
 * Todos:
 * - Figure out how to set fonts, the default one is ugly
 * - Set the icon to a notepad icon
 * - Update the title bar to show the file name
 * - Implement a state system to track changes
 */
import { resolve } from 'node:path';

import koffi from 'koffi';

import { InstanceHandle, WindowHandle } from '../../@types';
import { highWord, lowWord } from '../../util/number.util';
import { int32ArrayToLongParam, wideStringToLongParam } from '../../util/type.util';
import { EDIT_CLASS_NAME, STATUS_CLASS_NAME } from '../../win32/classes';
import { comctl32 } from '../../win32/comctl32/comctl32';
import { InitCommonControlsEx } from '../../win32/comctl32/init-common-controls-ex';
import { createCookie } from '../../win32/helpers/create-cookie';
import { ActivateActCtx } from '../../win32/kernel32/activate-act-ctx';
import { CreateActCtxW } from '../../win32/kernel32/create-act-ctx';
import { GetLastError } from '../../win32/kernel32/get-last-error';
import { GetModuleHandleW } from '../../win32/kernel32/get-module-handle';
import { kernel32 } from '../../win32/kernel32/kernel32';
import { ActivationContextW } from '../../win32/structs/activation-context';
import { CommonControlStyles } from '../../win32/structs/init-common-controls-ex';
import { Message } from '../../win32/structs/message';
import { AppendMenuW, MenuFlag } from '../../win32/user32/append-menu';
import { CreateMenu } from '../../win32/user32/create-menu';
import { CreatePopupMenu } from '../../win32/user32/create-popup-menu';
import { CreateWindowEx, EditStyle, StatusBarStyle, WindowStyle } from '../../win32/user32/create-window-ex';
import { DefWindowProcW } from '../../win32/user32/def-window-proc';
import { DispatchMessageW } from '../../win32/user32/dispatch-message';
import { GetMessageW } from '../../win32/user32/get-message';
import { Cursor, LoadCursorW } from '../../win32/user32/load-cursor';
import { Icon, LoadIconW } from '../../win32/user32/load-icon';
import { MessageBoxButtons, MessageBoxIcon, MessageBoxW } from '../../win32/user32/message-box';
import { PostQuitMessage } from '../../win32/user32/post-quit-message';
import { RegisterClassExW } from '../../win32/user32/register-class-ex';
import { Control, SendMessageW } from '../../win32/user32/send-message';
import { SetMenu } from '../../win32/user32/set-menu';
import { SetWindowPos } from '../../win32/user32/set-window-pos';
import { ShowWindow } from '../../win32/user32/show-window';
import { TranslateMessage } from '../../win32/user32/translate-message';
import { UpdateWindow } from '../../win32/user32/update-window';
import { user32 } from '../../win32/user32/user32';
import { menuHandler } from './menu.handler';
import {
  CLASS_NAME,
  EDIT_ID,
  EDIT_MENU_COPY,
  EDIT_MENU_CUT,
  EDIT_MENU_DELETE,
  EDIT_MENU_FIND,
  EDIT_MENU_FIND_NEXT,
  EDIT_MENU_FIND_PREVIOUS,
  EDIT_MENU_GO_TO,
  EDIT_MENU_PASTE,
  EDIT_MENU_REPLACE,
  EDIT_MENU_SELECT_ALL,
  EDIT_MENU_TIME_DATE,
  EDIT_MENU_UNDO,
  FILE_MENU_EXIT,
  FILE_MENU_NEW,
  FILE_MENU_NEW_WINDOW,
  FILE_MENU_OPEN,
  FILE_MENU_PAGE_SETUP,
  FILE_MENU_PRINT,
  FILE_MENU_SAVE,
  FILE_MENU_SAVE_AS,
  FORMAT_MENU_FONT,
  FORMAT_MENU_WORD_WRAP,
  HELP_MENU_ABOUT_NOTEPAD,
  HELP_MENU_SEND_FEEDBACK,
  HELP_MENU_VIEW_HELP,
  STATUS_BAR_PART_SIZES,
  VIEW_MENU_RESTORE_DEFAULT_ZOOM,
  VIEW_MENU_STATUS_BAR,
  VIEW_MENU_ZOOM_IN,
  VIEW_MENU_ZOOM_OUT,
  WINDOW_HEIGHT,
  WINDOW_WIDTH,
} from './notepad.constants';

comctl32.load();
kernel32.load();
user32.load();

let editHandle: number;
let statusBarHandle: number;

function WindowProcedure(windowPointer: number, uMsg: number, wParam: number, lParam: number): number {
  let ret: number | null = null;

  switch (uMsg) {
    case Control.WM_COMMAND:
      menuHandler(windowPointer, uMsg, wParam, lParam);

      break;

    case Control.WM_DESTROY:
      PostQuitMessage(0);
      ret = 0;
      break;

    case Control.WM_SIZE:
      const width = lowWord(lParam);
      const height = highWord(lParam);
      const parts = getStatusBarParts(width);

      SetWindowPos({
        windowHandle: editHandle,
        x: 0,
        y: 0,
        width: width,
        height: height - 23,
        flags: 0x0040 | 0x0020,
      });

      SetWindowPos({
        windowHandle: statusBarHandle,
        x: 0,
        y: height - 20,
        width: width,
        height: 20,
        flags: 0x0002,
      });

      SendMessageW(statusBarHandle, Control.SB_SETPARTS, parts.length, int32ArrayToLongParam(parts));

      ret = 0;

      break;

    default:
      ret = DefWindowProcW(windowPointer, uMsg, wParam, lParam);

      break;
  }

  return ret ?? 0;
}

function WinMain(instanceHandle: number, showCmd: number): number {
  // TODO: Create an enum for this
  InitCommonControlsEx(CommonControlStyles.BAR_CLASSES);

  const activationContext = new ActivationContextW({
    lpSource: resolve(process.cwd(), 'src', 'examples', 'notepad', 'notepad.manifest'),
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
    'Untitled - Notepad',
    13565952,
    2147483648,
    2147483648,
    WINDOW_WIDTH,
    WINDOW_HEIGHT,
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
    EDIT_CLASS_NAME,
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
    WINDOW_WIDTH,
    WINDOW_HEIGHT - 580,
    mainWindowHandle,
    EDIT_ID,
    instanceHandle,
    0,
  );

  SendMessageW(editHandle, Control.EM_SETLIMITTEXT, 1024 * 1024, 0);
  createMenu(mainWindowHandle);
  createStatusBar(mainWindowHandle, instanceHandle);

  ShowWindow(mainWindowHandle, showCmd);
  UpdateWindow(mainWindowHandle);

  const msg = new Message();

  while (GetMessageW(msg, null, 0, 0)) {
    TranslateMessage(msg);
    DispatchMessageW(msg);
  }

  return 0;
}

function createMenu(windowHandle: WindowHandle): number {
  const menuHandle = CreateMenu();
  const fileMenuHandle = CreateMenu();
  const editMenuHandle = CreateMenu();
  const formatMenuHandle = CreateMenu();
  const zoomMenuHandle = CreatePopupMenu();
  const viewMenuHandle = CreateMenu();
  const helpMenuHandle = CreateMenu();

  // File menu
  AppendMenuW(fileMenuHandle, MenuFlag.STRING, FILE_MENU_NEW, '&New');
  AppendMenuW(fileMenuHandle, MenuFlag.STRING, FILE_MENU_NEW_WINDOW, 'New &Window');
  AppendMenuW(fileMenuHandle, MenuFlag.STRING, FILE_MENU_OPEN, '&Open...');
  AppendMenuW(fileMenuHandle, MenuFlag.STRING, FILE_MENU_SAVE, '&Save');
  AppendMenuW(fileMenuHandle, MenuFlag.STRING, FILE_MENU_SAVE_AS, 'Save &As...');
  AppendMenuW(fileMenuHandle, MenuFlag.SEPARATOR, 0, null);
  AppendMenuW(fileMenuHandle, MenuFlag.STRING, FILE_MENU_PAGE_SETUP, 'Page Set&up...');
  AppendMenuW(fileMenuHandle, MenuFlag.STRING, FILE_MENU_PRINT, '&Print...');
  AppendMenuW(fileMenuHandle, MenuFlag.SEPARATOR, 0, null);
  AppendMenuW(fileMenuHandle, MenuFlag.STRING, FILE_MENU_EXIT, 'E&xit');

  // Edit menu
  AppendMenuW(editMenuHandle, MenuFlag.STRING, EDIT_MENU_UNDO, '&Undo');
  AppendMenuW(editMenuHandle, MenuFlag.SEPARATOR, 0, null);
  AppendMenuW(editMenuHandle, MenuFlag.STRING, EDIT_MENU_CUT, 'Cu&t');
  AppendMenuW(editMenuHandle, MenuFlag.STRING, EDIT_MENU_COPY, '&Copy');
  AppendMenuW(editMenuHandle, MenuFlag.STRING, EDIT_MENU_PASTE, '&Paste');
  AppendMenuW(editMenuHandle, MenuFlag.STRING, EDIT_MENU_DELETE, '&Delete');
  AppendMenuW(editMenuHandle, MenuFlag.SEPARATOR, 0, null);
  AppendMenuW(editMenuHandle, MenuFlag.STRING, EDIT_MENU_FIND, '&Find...');
  AppendMenuW(editMenuHandle, MenuFlag.STRING, EDIT_MENU_FIND_NEXT, 'Find &Next');
  AppendMenuW(editMenuHandle, MenuFlag.STRING, EDIT_MENU_FIND_PREVIOUS, 'Find &Previous');
  AppendMenuW(editMenuHandle, MenuFlag.STRING, EDIT_MENU_REPLACE, '&Replace...');
  AppendMenuW(editMenuHandle, MenuFlag.STRING, EDIT_MENU_GO_TO, '&Go To...');
  AppendMenuW(editMenuHandle, MenuFlag.SEPARATOR, 0, null);
  AppendMenuW(editMenuHandle, MenuFlag.STRING, EDIT_MENU_SELECT_ALL, '&Select All');
  AppendMenuW(editMenuHandle, MenuFlag.STRING, EDIT_MENU_TIME_DATE, '&Time/Date');

  // Format menu
  AppendMenuW(formatMenuHandle, MenuFlag.STRING, FORMAT_MENU_WORD_WRAP, '&Word Wrap');
  AppendMenuW(formatMenuHandle, MenuFlag.STRING, FORMAT_MENU_FONT, '&Font...');

  // Zoom menu
  AppendMenuW(zoomMenuHandle, MenuFlag.STRING, VIEW_MENU_ZOOM_IN, 'Zoom &In');
  AppendMenuW(zoomMenuHandle, MenuFlag.STRING, VIEW_MENU_ZOOM_OUT, 'Zoom &Out');
  AppendMenuW(zoomMenuHandle, MenuFlag.STRING, VIEW_MENU_RESTORE_DEFAULT_ZOOM, '&Restore Default Zoom');

  // View menu
  AppendMenuW(viewMenuHandle, MenuFlag.POPUP, koffi.address(zoomMenuHandle), '&Zoom');
  AppendMenuW(viewMenuHandle, MenuFlag.STRING, VIEW_MENU_STATUS_BAR, '&Status Bar');

  // Help menu
  AppendMenuW(helpMenuHandle, MenuFlag.STRING, HELP_MENU_VIEW_HELP, '&View Help');
  AppendMenuW(helpMenuHandle, MenuFlag.STRING, HELP_MENU_SEND_FEEDBACK, '&Send Feedback');
  AppendMenuW(helpMenuHandle, MenuFlag.SEPARATOR, 0, null);
  AppendMenuW(helpMenuHandle, MenuFlag.STRING, HELP_MENU_ABOUT_NOTEPAD, '&About Notepad');

  // TODO: See if there's a better way to do this, or at least create a helper function
  AppendMenuW(menuHandle, MenuFlag.POPUP, koffi.address(fileMenuHandle), '&File');
  AppendMenuW(menuHandle, MenuFlag.POPUP, koffi.address(editMenuHandle), '&Edit');
  AppendMenuW(menuHandle, MenuFlag.POPUP, koffi.address(formatMenuHandle), 'F&ormat');
  AppendMenuW(menuHandle, MenuFlag.POPUP, koffi.address(viewMenuHandle), '&View');
  AppendMenuW(menuHandle, MenuFlag.POPUP, koffi.address(helpMenuHandle), '&Help');

  SetMenu(windowHandle, menuHandle);

  return 0;
}

function createStatusBar(mainWindowHandle: WindowHandle, instanceHandle: InstanceHandle) {
  statusBarHandle = CreateWindowEx(
    0,
    STATUS_CLASS_NAME,
    null,
    WindowStyle.CHILD | WindowStyle.VISIBLE | StatusBarStyle.SIZEGRIP,
    0,
    0,
    2000,
    0,
    mainWindowHandle,
    0,
    instanceHandle,
    0,
  );

  const parts = getStatusBarParts(WINDOW_WIDTH);

  SendMessageW(statusBarHandle, Control.WM_SIZE, 0, 0);
  SendMessageW(statusBarHandle, Control.SB_SETPARTS, parts.length, int32ArrayToLongParam(parts));
  SendMessageW(statusBarHandle, Control.SB_SETTEXTW, 0, wideStringToLongParam(''));
  SendMessageW(statusBarHandle, Control.SB_SETTEXTW, 1, wideStringToLongParam('Ln 1, Col 1'));
  SendMessageW(statusBarHandle, Control.SB_SETTEXTW, 2, wideStringToLongParam('100%'));
  SendMessageW(statusBarHandle, Control.SB_SETTEXTW, 3, wideStringToLongParam('Windows (CRLF)'));
  SendMessageW(statusBarHandle, Control.SB_SETTEXTW, 4, wideStringToLongParam('UTF-8'));
}

function getStatusBarParts(totalWidth: number): number[] {
  const parts: number[] = [];

  const partOne = totalWidth - STATUS_BAR_PART_SIZES.reduce((acc, curr) => acc + curr, 0);
  parts.push(partOne);

  let runningTotal = partOne;

  for (let i = 0; i < STATUS_BAR_PART_SIZES.length; i++) {
    parts.push((runningTotal += STATUS_BAR_PART_SIZES[i]));
  }

  return parts;
}

process.exitCode = WinMain(GetModuleHandleW(null), 1);
