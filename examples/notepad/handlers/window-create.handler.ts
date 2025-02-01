import { MenuFlag, int32ArrayToLongParam, wideStringToLongParam } from '@ahmic/lib-native';
import { EDIT_CLASS_NAME, STATUS_CLASS_NAME } from '@ahmic/lib-native/win32/classes';
import { CreateFontW } from '@ahmic/lib-native/win32/gdi32/create-font';
import { AppendMenuW } from '@ahmic/lib-native/win32/user32/append-menu';
import { CreateMenu } from '@ahmic/lib-native/win32/user32/create-menu';
import { CreatePopupMenu } from '@ahmic/lib-native/win32/user32/create-popup-menu';
import {
  CreateWindowExW,
  EditStyle,
  StatusBarStyle,
  WindowStyle,
} from '@ahmic/lib-native/win32/user32/create-window-ex';
import { Control, SendMessageW } from '@ahmic/lib-native/win32/user32/send-message';
import { SetMenu } from '@ahmic/lib-native/win32/user32/set-menu';
import koffi from 'koffi';

import {
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
  MAX_EDIT_LENGTH,
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
} from '../notepad.constants';
import { state } from '../state';

export function handleWindowCreate(): number {
  state.handles.editHandle = CreateWindowExW(
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

  SendMessageW(state.handles.editHandle, Control.EM_SETLIMITTEXT, MAX_EDIT_LENGTH, 0);

  createMenu();
  createStatusBar();

  state.handles.fontHandle = CreateFontW(
    state.font.height,
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

  /**
   * TODO: Figure out how to allow bigints into WordParam without breaking anything. Might be as simple
   * doing number | bigint in the WordParam definition
   */
  SendMessageW(state.handles.editHandle, Control.WM_SETFONT, koffi.address(state.handles.fontHandle), 1);

  return 0;
}

function createMenu() {
  state.handles.menuHandle = CreateMenu();
  state.handles.fileMenuHandle = CreateMenu();
  state.handles.editMenuHandle = CreateMenu();
  state.handles.formatMenuHandle = CreateMenu();
  state.handles.zoomMenuHandle = CreatePopupMenu();
  state.handles.viewMenuHandle = CreateMenu();
  state.handles.helpMenuHandle = CreateMenu();
  state.handles.debugMenuHandle = CreateMenu();

  // File menu
  AppendMenuW(state.handles.fileMenuHandle, MenuFlag.STRING, FILE_MENU_NEW, '&New\tCtrl+N');
  AppendMenuW(
    state.handles.fileMenuHandle,
    MenuFlag.STRING,
    FILE_MENU_NEW_WINDOW,
    'New &Window\tCtrl+Shift+N',
  );
  AppendMenuW(state.handles.fileMenuHandle, MenuFlag.STRING, FILE_MENU_OPEN, '&Open...\tCtrl+O');
  AppendMenuW(state.handles.fileMenuHandle, MenuFlag.STRING, FILE_MENU_SAVE, '&Save\tCtrl+S');
  AppendMenuW(state.handles.fileMenuHandle, MenuFlag.STRING, FILE_MENU_SAVE_AS, 'Save &As...\tCtrl+Shift+S');
  AppendMenuW(state.handles.fileMenuHandle, MenuFlag.SEPARATOR, 0, null);
  AppendMenuW(state.handles.fileMenuHandle, MenuFlag.STRING, FILE_MENU_PAGE_SETUP, 'Page Set&up...');
  AppendMenuW(state.handles.fileMenuHandle, MenuFlag.STRING, FILE_MENU_PRINT, '&Print...\tCtrl+P');
  AppendMenuW(state.handles.fileMenuHandle, MenuFlag.SEPARATOR, 0, null);
  AppendMenuW(state.handles.fileMenuHandle, MenuFlag.STRING, FILE_MENU_EXIT, 'E&xit');

  // Edit menu
  AppendMenuW(state.handles.editMenuHandle, MenuFlag.STRING, EDIT_MENU_UNDO, '&Undo\tCtrl+Z');
  AppendMenuW(state.handles.editMenuHandle, MenuFlag.SEPARATOR, 0, null);
  AppendMenuW(state.handles.editMenuHandle, MenuFlag.STRING, EDIT_MENU_CUT, 'Cu&t\tCtrl+X');
  AppendMenuW(state.handles.editMenuHandle, MenuFlag.STRING, EDIT_MENU_COPY, '&Copy\tCtrl+C');
  AppendMenuW(state.handles.editMenuHandle, MenuFlag.STRING, EDIT_MENU_PASTE, '&Paste\tCtrl+V');
  AppendMenuW(state.handles.editMenuHandle, MenuFlag.STRING, EDIT_MENU_DELETE, '&Delete\tDel');
  AppendMenuW(state.handles.editMenuHandle, MenuFlag.SEPARATOR, 0, null);
  AppendMenuW(state.handles.editMenuHandle, MenuFlag.STRING, EDIT_MENU_FIND, '&Find...\tCtrl+F');
  AppendMenuW(state.handles.editMenuHandle, MenuFlag.STRING, EDIT_MENU_FIND_NEXT, 'Find &Next\tF3');
  AppendMenuW(
    state.handles.editMenuHandle,
    MenuFlag.STRING,
    EDIT_MENU_FIND_PREVIOUS,
    'Find &Previous\tShift+F3',
  );
  AppendMenuW(state.handles.editMenuHandle, MenuFlag.STRING, EDIT_MENU_REPLACE, '&Replace...\tCtrl+H');
  AppendMenuW(state.handles.editMenuHandle, MenuFlag.STRING, EDIT_MENU_GO_TO, '&Go To...\tCtrl+G');
  AppendMenuW(state.handles.editMenuHandle, MenuFlag.SEPARATOR, 0, null);
  AppendMenuW(state.handles.editMenuHandle, MenuFlag.STRING, EDIT_MENU_SELECT_ALL, '&Select All\tCtrl+A');
  AppendMenuW(state.handles.editMenuHandle, MenuFlag.STRING, EDIT_MENU_TIME_DATE, '&Time/Date\tF5');

  // Format menu
  AppendMenuW(state.handles.formatMenuHandle, MenuFlag.STRING, FORMAT_MENU_WORD_WRAP, '&Word Wrap');
  AppendMenuW(state.handles.formatMenuHandle, MenuFlag.STRING, FORMAT_MENU_FONT, '&Font...');

  // Zoom menu
  AppendMenuW(state.handles.zoomMenuHandle, MenuFlag.STRING, VIEW_MENU_ZOOM_IN, 'Zoom &In\tCtrl+Plus');
  AppendMenuW(state.handles.zoomMenuHandle, MenuFlag.STRING, VIEW_MENU_ZOOM_OUT, 'Zoom &Out\tCtrl+Minus');
  AppendMenuW(
    state.handles.zoomMenuHandle,
    MenuFlag.STRING,
    VIEW_MENU_RESTORE_DEFAULT_ZOOM,
    '&Restore Default Zoom\tCtrl+0',
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
}

function createStatusBar() {
  state.handles.statusBarHandle = CreateWindowExW(
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

export function getStatusBarParts(totalWidth: number): number[] {
  const parts: number[] = [];

  const partOne = totalWidth - STATUS_BAR_PART_SIZES.reduce((acc, curr) => acc + curr, 0);
  parts.push(partOne);

  let runningTotal = partOne;

  for (let i = 0; i < STATUS_BAR_PART_SIZES.length; i++) {
    parts.push((runningTotal += STATUS_BAR_PART_SIZES[i]));
  }

  return parts;
}
