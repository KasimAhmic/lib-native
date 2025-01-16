/**
 * Proof of concept Notepad example using lib-native.
 *
 * Todos:
 * - Figure out how to set fonts, the default one is ugly
 * - Set the icon to a notepad icon
 * - Update the title bar to show the file name
 * - Implement a state system to track changes (WIP)
 * - Implement File menu actions
 * - Implement Edit menu actions
 * - Implement Format menu actions (WIP)
 * - Implement View menu actions
 * - Implement Help menu actions
 */
import { resolve } from 'node:path';

import koffi from 'koffi';

import { InstanceHandle, WindowHandle } from '../../@types';
import { Logger } from '../../util/logger';
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
import {
  CreateWindowEx,
  EditStyle,
  ExtendedWindowStyle,
  StatusBarStyle,
  WindowStyle,
} from '../../win32/user32/create-window-ex';
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
  DEBUG_MENU_LIPSUM,
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
  STATUS_BAR_EMPTY,
  STATUS_BAR_ENCODING,
  STATUS_BAR_LINE_COL,
  STATUS_BAR_LINE_ENDING,
  STATUS_BAR_PART_SIZES,
  STATUS_BAR_ZOOM_LEVEL,
  VIEW_MENU_RESTORE_DEFAULT_ZOOM,
  VIEW_MENU_STATUS_BAR,
  VIEW_MENU_ZOOM_IN,
  VIEW_MENU_ZOOM_OUT,
  WINDOW_HEIGHT,
  WINDOW_WIDTH,
} from './notepad.constants';
import { state } from './state';

comctl32.load();
kernel32.load();
user32.load();

function WindowProcedure(
  windowPointer: number,
  message: number,
  wordParam: number,
  longParam: number,
): number {
  let ret: number | null = null;

  switch (message) {
    case Control.WM_COMMAND:
      menuHandler({ message, wordParam, longParam });

      break;

    case Control.WM_DESTROY:
      PostQuitMessage(0);
      ret = 0;
      break;

    case Control.WM_SIZE:
      const width = lowWord(longParam);
      const height = highWord(longParam);
      const parts = getStatusBarParts(width);

      SetWindowPos({
        windowHandle: state.handles.editHandle,
        x: 0,
        y: 0,
        width: width,
        height: height - 23,
        flags: 0x0040 | 0x0020,
      });

      SetWindowPos({
        windowHandle: state.handles.statusBarHandle,
        x: 0,
        y: height - 20,
        width: width,
        height: 20,
        flags: 0x0002,
      });

      SendMessageW(
        state.handles.statusBarHandle,
        Control.SB_SETPARTS,
        parts.length,
        int32ArrayToLongParam(parts),
      );

      ret = 0;

      break;

    default:
      ret = DefWindowProcW(windowPointer, message, wordParam, longParam);

      break;
  }

  return ret ?? 0;
}

function WinMain(instanceHandle: number, showCmd: number): number {
  state.handles.instanceHandle = instanceHandle;

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
    instanceHandle: state.handles.instanceHandle,
    cursorHandle: LoadCursorW(null, Cursor.IDC_ARROW),
    iconHandle: LoadIconW(state.handles.instanceHandle, Icon.IDI_APPLICATION),
    smallIconHandle: LoadIconW(state.handles.instanceHandle, Icon.IDI_APPLICATION),
    backgroundBrushHandle: 13,
    windowProcedure: WindowProcedure,
  });

  state.handles.mainWindowHandle = CreateWindowEx(
    ExtendedWindowStyle.WINDOW_EDGE | ExtendedWindowStyle.ACCEPT_FILES,
    CLASS_NAME,
    'Untitled - Notepad',
    13565952,
    2147483648,
    2147483648,
    WINDOW_WIDTH,
    WINDOW_HEIGHT,
    0,
    0,
    state.handles.instanceHandle,
    0,
  );

  if (!state.handles.mainWindowHandle) {
    const errorCode = GetLastError();

    MessageBoxW(null, 'Failed to create window.', `Error: ${errorCode}`, {
      buttons: MessageBoxButtons.OK,
      icon: MessageBoxIcon.ICON_ERROR,
    });
  }

  state.handles.editHandle = CreateWindowEx(
    0,
    EDIT_CLASS_NAME,
    '',
    WindowStyle.CHILD |
      WindowStyle.VISIBLE |
      WindowStyle.H_SCROLL |
      WindowStyle.V_SCROLL |
      EditStyle.NOHIDESEL |
      EditStyle.MULTILINE,
    0,
    0,
    WINDOW_WIDTH,
    WINDOW_HEIGHT - 580,
    state.handles.mainWindowHandle,
    EDIT_ID,
    state.handles.instanceHandle,
    0,
  );

  SendMessageW(state.handles.editHandle, Control.EM_SETLIMITTEXT, 1024 * 1024 * 1024, 0);
  createMenu();
  createStatusBar();

  ShowWindow(state.handles.mainWindowHandle, showCmd);
  UpdateWindow(state.handles.mainWindowHandle);

  const msg = new Message();

  while (GetMessageW(msg, null, 0, 0)) {
    TranslateMessage(msg);
    DispatchMessageW(msg);
  }

  return 0;
}

function createMenu(): number {
  state.handles.menuHandle = CreateMenu();
  state.handles.fileMenuHandle = CreateMenu();
  state.handles.editMenuHandle = CreateMenu();
  state.handles.formatMenuHandle = CreateMenu();
  state.handles.zoomMenuHandle = CreatePopupMenu();
  state.handles.viewMenuHandle = CreateMenu();
  state.handles.helpMenuHandle = CreateMenu();
  state.handles.debugMenuHandle = CreateMenu();

  // File menu
  AppendMenuW(state.handles.fileMenuHandle, MenuFlag.STRING, FILE_MENU_NEW, '&New');
  AppendMenuW(state.handles.fileMenuHandle, MenuFlag.STRING, FILE_MENU_NEW_WINDOW, 'New &Window');
  AppendMenuW(state.handles.fileMenuHandle, MenuFlag.STRING, FILE_MENU_OPEN, '&Open...');
  AppendMenuW(state.handles.fileMenuHandle, MenuFlag.STRING, FILE_MENU_SAVE, '&Save');
  AppendMenuW(state.handles.fileMenuHandle, MenuFlag.STRING, FILE_MENU_SAVE_AS, 'Save &As...');
  AppendMenuW(state.handles.fileMenuHandle, MenuFlag.SEPARATOR, 0, null);
  AppendMenuW(state.handles.fileMenuHandle, MenuFlag.STRING, FILE_MENU_PAGE_SETUP, 'Page Set&up...');
  AppendMenuW(state.handles.fileMenuHandle, MenuFlag.STRING, FILE_MENU_PRINT, '&Print...');
  AppendMenuW(state.handles.fileMenuHandle, MenuFlag.SEPARATOR, 0, null);
  AppendMenuW(state.handles.fileMenuHandle, MenuFlag.STRING, FILE_MENU_EXIT, 'E&xit');

  // Edit menu
  AppendMenuW(state.handles.editMenuHandle, MenuFlag.STRING, EDIT_MENU_UNDO, '&Undo');
  AppendMenuW(state.handles.editMenuHandle, MenuFlag.SEPARATOR, 0, null);
  AppendMenuW(state.handles.editMenuHandle, MenuFlag.STRING, EDIT_MENU_CUT, 'Cu&t');
  AppendMenuW(state.handles.editMenuHandle, MenuFlag.STRING, EDIT_MENU_COPY, '&Copy');
  AppendMenuW(state.handles.editMenuHandle, MenuFlag.STRING, EDIT_MENU_PASTE, '&Paste');
  AppendMenuW(state.handles.editMenuHandle, MenuFlag.STRING, EDIT_MENU_DELETE, '&Delete');
  AppendMenuW(state.handles.editMenuHandle, MenuFlag.SEPARATOR, 0, null);
  AppendMenuW(state.handles.editMenuHandle, MenuFlag.STRING, EDIT_MENU_FIND, '&Find...');
  AppendMenuW(state.handles.editMenuHandle, MenuFlag.STRING, EDIT_MENU_FIND_NEXT, 'Find &Next');
  AppendMenuW(state.handles.editMenuHandle, MenuFlag.STRING, EDIT_MENU_FIND_PREVIOUS, 'Find &Previous');
  AppendMenuW(state.handles.editMenuHandle, MenuFlag.STRING, EDIT_MENU_REPLACE, '&Replace...');
  AppendMenuW(state.handles.editMenuHandle, MenuFlag.STRING, EDIT_MENU_GO_TO, '&Go To...');
  AppendMenuW(state.handles.editMenuHandle, MenuFlag.SEPARATOR, 0, null);
  AppendMenuW(state.handles.editMenuHandle, MenuFlag.STRING, EDIT_MENU_SELECT_ALL, '&Select All');
  AppendMenuW(state.handles.editMenuHandle, MenuFlag.STRING, EDIT_MENU_TIME_DATE, '&Time/Date');

  // Format menu
  AppendMenuW(state.handles.formatMenuHandle, MenuFlag.STRING, FORMAT_MENU_WORD_WRAP, '&Word Wrap');
  AppendMenuW(state.handles.formatMenuHandle, MenuFlag.STRING, FORMAT_MENU_FONT, '&Font...');

  // Zoom menu
  AppendMenuW(state.handles.zoomMenuHandle, MenuFlag.STRING, VIEW_MENU_ZOOM_IN, 'Zoom &In');
  AppendMenuW(state.handles.zoomMenuHandle, MenuFlag.STRING, VIEW_MENU_ZOOM_OUT, 'Zoom &Out');
  AppendMenuW(
    state.handles.zoomMenuHandle,
    MenuFlag.STRING,
    VIEW_MENU_RESTORE_DEFAULT_ZOOM,
    '&Restore Default Zoom',
  );

  // View menu
  AppendMenuW(
    state.handles.viewMenuHandle,
    MenuFlag.POPUP,
    koffi.address(state.handles.zoomMenuHandle),
    '&Zoom',
  );
  AppendMenuW(state.handles.viewMenuHandle, MenuFlag.STRING, VIEW_MENU_STATUS_BAR, '&Status Bar');

  // Help menu
  AppendMenuW(state.handles.helpMenuHandle, MenuFlag.STRING, HELP_MENU_VIEW_HELP, '&View Help');
  AppendMenuW(state.handles.helpMenuHandle, MenuFlag.STRING, HELP_MENU_SEND_FEEDBACK, '&Send Feedback');
  AppendMenuW(state.handles.helpMenuHandle, MenuFlag.SEPARATOR, 0, null);
  AppendMenuW(state.handles.helpMenuHandle, MenuFlag.STRING, HELP_MENU_ABOUT_NOTEPAD, '&About Notepad');

  // Debug menu
  AppendMenuW(state.handles.debugMenuHandle, MenuFlag.STRING, DEBUG_MENU_LIPSUM, 'Load Lorem &Ipsum');

  // TODO: See if there's a better way to do this, or at least create a helper function
  AppendMenuW(state.handles.menuHandle, MenuFlag.POPUP, koffi.address(state.handles.fileMenuHandle), '&File');
  AppendMenuW(state.handles.menuHandle, MenuFlag.POPUP, koffi.address(state.handles.editMenuHandle), '&Edit');
  AppendMenuW(
    state.handles.menuHandle,
    MenuFlag.POPUP,
    koffi.address(state.handles.formatMenuHandle),
    'F&ormat',
  );
  AppendMenuW(state.handles.menuHandle, MenuFlag.POPUP, koffi.address(state.handles.viewMenuHandle), '&View');
  AppendMenuW(state.handles.menuHandle, MenuFlag.POPUP, koffi.address(state.handles.helpMenuHandle), '&Help');
  AppendMenuW(
    state.handles.menuHandle,
    MenuFlag.POPUP,
    koffi.address(state.handles.debugMenuHandle),
    '&Debug',
  );

  SetMenu(state.handles.mainWindowHandle, state.handles.menuHandle);

  return 0;
}

function createStatusBar() {
  state.handles.statusBarHandle = CreateWindowEx(
    0,
    STATUS_CLASS_NAME,
    null,
    WindowStyle.CHILD | WindowStyle.VISIBLE | StatusBarStyle.SIZEGRIP,
    0,
    0,
    2000,
    0,
    state.handles.mainWindowHandle,
    0,
    state.handles.instanceHandle,
    0,
  );

  const parts = getStatusBarParts(WINDOW_WIDTH);

  SendMessageW(state.handles.statusBarHandle, Control.WM_SIZE, 0, 0);
  SendMessageW(
    state.handles.statusBarHandle,
    Control.SB_SETPARTS,
    parts.length,
    int32ArrayToLongParam(parts),
  );
  SendMessageW(
    state.handles.statusBarHandle,
    Control.SB_SETTEXTW,
    STATUS_BAR_EMPTY,
    wideStringToLongParam(''),
  );
  SendMessageW(
    state.handles.statusBarHandle,
    Control.SB_SETTEXTW,
    STATUS_BAR_LINE_COL,
    wideStringToLongParam('Ln 1, Col 1'),
  );
  SendMessageW(
    state.handles.statusBarHandle,
    Control.SB_SETTEXTW,
    STATUS_BAR_ZOOM_LEVEL,
    wideStringToLongParam('100%'),
  );
  SendMessageW(
    state.handles.statusBarHandle,
    Control.SB_SETTEXTW,
    STATUS_BAR_LINE_ENDING,
    wideStringToLongParam('Windows (CRLF)'),
  );
  SendMessageW(
    state.handles.statusBarHandle,
    Control.SB_SETTEXTW,
    STATUS_BAR_ENCODING,
    wideStringToLongParam('UTF-8'),
  );
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
