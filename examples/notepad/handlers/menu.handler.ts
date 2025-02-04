import {
  Logger,
  MenuFlagState,
  MenuItemInfoMask,
  MenuItemInfoW,
  Rect,
  lowWord,
  wideStringToLongParam,
} from '@ahmic/lib-native';
import { LIPSUM } from '@ahmic/lib-native/@testing/lipsum';
import { EDIT_CLASS_NAME } from '@ahmic/lib-native/win32/classes';
import {
  CreateWindowExW,
  WindowPosition,
  WindowStyle,
} from '@ahmic/lib-native/win32/user32/create-window-ex';
import { DestroyWindow } from '@ahmic/lib-native/win32/user32/destroy-window';
import { GetClientRect } from '@ahmic/lib-native/win32/user32/get-client-rect';
import { GetWindowLongPtrW, WindowLongPtrIndex } from '@ahmic/lib-native/win32/user32/get-window-long-ptr';
import { GetWindowTextW } from '@ahmic/lib-native/win32/user32/get-window-text';
import { MoveWindow } from '@ahmic/lib-native/win32/user32/move-window';
import { Control, SendMessageW } from '@ahmic/lib-native/win32/user32/send-message';
import { SetMenuItemInfoW } from '@ahmic/lib-native/win32/user32/set-menu-item-info';
import { SetWindowTextW } from '@ahmic/lib-native/win32/user32/set-window-text';
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
  STATUS_BAR_ZOOM_LEVEL,
  VIEW_MENU_RESTORE_DEFAULT_ZOOM,
  VIEW_MENU_STATUS_BAR,
  VIEW_MENU_ZOOM_IN,
  VIEW_MENU_ZOOM_OUT,
} from '../notepad.constants';
import { DEFAULT_ZOOM_LEVEL, ZOOM_LEVEL_INCREMENT, state } from '../state';

const logger = new Logger('MenuHandler');

export function handleMenu(wordParam: number, longParam: number): number {
  switch (lowWord(wordParam)) {
    case FILE_MENU_NEW:
      logger.debug('FILE_MENU_NEW', FILE_MENU_NEW);
      break;

    case FILE_MENU_NEW_WINDOW:
      logger.debug('FILE_MENU_NEW_WINDOW', FILE_MENU_NEW_WINDOW);
      break;

    case FILE_MENU_OPEN:
      logger.debug('FILE_MENU_OPEN', FILE_MENU_OPEN);
      break;

    case FILE_MENU_SAVE:
      logger.debug('FILE_MENU_SAVE', FILE_MENU_SAVE);
      break;

    case FILE_MENU_SAVE_AS:
      logger.debug('FILE_MENU_SAVE_AS', FILE_MENU_SAVE_AS);
      break;

    case FILE_MENU_PAGE_SETUP:
      logger.debug('FILE_MENU_PAGE_SETUP', FILE_MENU_PAGE_SETUP);
      break;

    case FILE_MENU_PRINT:
      logger.debug('FILE_MENU_PRINT', FILE_MENU_PRINT);
      break;

    case FILE_MENU_EXIT:
      logger.debug('FILE_MENU_EXIT', FILE_MENU_EXIT);
      SendMessageW(state.handles.mainWindowHandle, Control.WM_CLOSE, 0, 0);
      break;

    // ============================================================

    case EDIT_MENU_UNDO:
      logger.debug('EDIT_MENU_UNDO', EDIT_MENU_UNDO);
      SendMessageW(state.handles.editHandle, Control.EM_UNDO, 0, 0);
      break;

    case EDIT_MENU_CUT:
      logger.debug('EDIT_MENU_CUT', EDIT_MENU_CUT);
      SendMessageW(state.handles.editHandle, Control.WM_CUT, 0, 0);
      break;

    case EDIT_MENU_COPY:
      logger.debug('EDIT_MENU_COPY', EDIT_MENU_COPY);
      SendMessageW(state.handles.editHandle, Control.WM_COPY, 0, 0);
      break;

    case EDIT_MENU_PASTE:
      logger.debug('EDIT_MENU_PASTE', EDIT_MENU_PASTE);
      SendMessageW(state.handles.editHandle, Control.WM_PASTE, 0, 0);
      break;

    case EDIT_MENU_DELETE:
      logger.debug('EDIT_MENU_DELETE', EDIT_MENU_DELETE);
      // TODO: Figure out how to handle both the delete key and the delete menu item
      SendMessageW(state.handles.editHandle, Control.WM_CLEAR, 0, 0);
      break;

    case EDIT_MENU_FIND:
      logger.debug('EDIT_MENU_FIND', EDIT_MENU_FIND);
      break;

    case EDIT_MENU_FIND_NEXT:
      logger.debug('EDIT_MENU_FIND_NEXT', EDIT_MENU_FIND_NEXT);
      break;

    case EDIT_MENU_FIND_PREVIOUS:
      logger.debug('EDIT_MENU_FIND_PREVIOUS', EDIT_MENU_FIND_PREVIOUS);
      break;

    case EDIT_MENU_REPLACE:
      logger.debug('EDIT_MENU_REPLACE', EDIT_MENU_REPLACE);
      break;

    case EDIT_MENU_GO_TO:
      logger.debug('EDIT_MENU_GO_TO', EDIT_MENU_GO_TO);
      break;

    case EDIT_MENU_SELECT_ALL:
      logger.debug('EDIT_MENU_SELECT_ALL', EDIT_MENU_SELECT_ALL);
      SendMessageW(state.handles.editHandle, Control.EM_SETSEL, 0, -1);
      break;

    case EDIT_MENU_TIME_DATE:
      logger.debug('EDIT_MENU_TIME_DATE', EDIT_MENU_TIME_DATE);
      break;

    // ============================================================

    case FORMAT_MENU_WORD_WRAP:
      logger.debug('FORMAT_MENU_WORD_WRAP', FORMAT_MENU_WORD_WRAP);
      state.isWordWrapEnabled = !state.isWordWrapEnabled;
      toggleMenuItem(FORMAT_MENU_WORD_WRAP, state.isWordWrapEnabled);
      break;

    case FORMAT_MENU_FONT:
      logger.debug('FORMAT_MENU_FONT', FORMAT_MENU_FONT);
      break;

    // ============================================================

    case VIEW_MENU_ZOOM_IN:
      logger.debug('VIEW_MENU_ZOOM_IN', VIEW_MENU_ZOOM_IN);
      state.zoomLevel += ZOOM_LEVEL_INCREMENT;
      updateZoomLevel();
      break;

    case VIEW_MENU_ZOOM_OUT:
      logger.debug('VIEW_MENU_ZOOM_OUT', VIEW_MENU_ZOOM_OUT);
      state.zoomLevel -= ZOOM_LEVEL_INCREMENT;
      updateZoomLevel();
      break;

    case VIEW_MENU_RESTORE_DEFAULT_ZOOM:
      logger.debug('VIEW_MENU_RESTORE_DEFAULT_ZOOM', VIEW_MENU_RESTORE_DEFAULT_ZOOM);
      state.zoomLevel = DEFAULT_ZOOM_LEVEL;
      updateZoomLevel();
      break;

    case VIEW_MENU_STATUS_BAR:
      logger.debug('VIEW_MENU_STATUS_BAR', VIEW_MENU_STATUS_BAR);
      break;

    // ============================================================

    case HELP_MENU_VIEW_HELP:
      logger.debug('HELP_MENU_VIEW_HELP', HELP_MENU_VIEW_HELP);
      break;

    case HELP_MENU_SEND_FEEDBACK:
      logger.debug('HELP_MENU_SEND_FEEDBACK', HELP_MENU_SEND_FEEDBACK);
      break;

    case HELP_MENU_ABOUT_NOTEPAD:
      logger.debug('HELP_MENU_ABOUT_NOTEPAD', HELP_MENU_ABOUT_NOTEPAD);
      break;

    // ============================================================

    case DEBUG_MENU_LIPSUM:
      SendMessageW(state.handles.editHandle, Control.WM_SETTEXT, 0, wideStringToLongParam(LIPSUM));
      break;
  }

  return 0;
}

function updateZoomLevel() {
  SendMessageW(
    state.handles.statusBarHandle,
    Control.SB_SETTEXTW,
    STATUS_BAR_ZOOM_LEVEL,
    wideStringToLongParam(`${state.zoomLevel}%`),
  );
}

function toggleMenuItem(index: number, checked: boolean) {
  const menuItemInfo = new MenuItemInfoW({
    fMask: MenuItemInfoMask.STATE,
    fState: checked ? MenuFlagState.CHECKED : MenuFlagState.UNCHECKED,
  });

  SetMenuItemInfoW(state.handles.formatMenuHandle, index, false, menuItemInfo);

  const rect = new Rect();
  GetClientRect(state.handles.mainWindowHandle, rect);

  const text = GetWindowTextW(state.handles.editHandle, 4096);
  let style = GetWindowLongPtrW(state.handles.editHandle, WindowLongPtrIndex.GWL_STYLE);

  if (checked) {
    style &= ~WindowStyle.H_SCROLL;
  } else {
    style |= WindowStyle.H_SCROLL;
  }

  // TODO: Break this out into a reusable function
  const editHandle = CreateWindowExW(
    0,
    EDIT_CLASS_NAME,
    null,
    style,
    WindowPosition.USE_DEFAULT,
    WindowPosition.USE_DEFAULT,
    WindowPosition.USE_DEFAULT,
    WindowPosition.USE_DEFAULT,
    state.handles.mainWindowHandle,
    EDIT_ID,
    state.handles.instanceHandle,
    0,
  );

  MoveWindow(editHandle, 0, 0, rect.right, rect.bottom - 23, 1);

  DestroyWindow(state.handles.editHandle);

  state.handles.editHandle = editHandle;
  SendMessageW(state.handles.editHandle, Control.WM_SETFONT, koffi.address(state.handles.fontHandle), 1);
  SetWindowTextW(state.handles.editHandle, text);
}
