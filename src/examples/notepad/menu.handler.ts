import { highWord, lowWord } from '../../util/number.util';
import {
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
  VIEW_MENU_RESTORE_DEFAULT_ZOOM,
  VIEW_MENU_STATUS_BAR,
  VIEW_MENU_ZOOM_IN,
  VIEW_MENU_ZOOM_OUT,
} from './notepad.constants';

export function menuHandler(_windowPointer: number, _uMsg: number, wParam: number, _lParam: number) {
  switch (lowWord(wParam)) {
    case EDIT_ID:
      console.log('EDIT_ID', EDIT_ID);
      break;
    case EDIT_MENU_COPY:
      console.log('EDIT_MENU_COPY', EDIT_MENU_COPY);
      break;
    case EDIT_MENU_CUT:
      console.log('EDIT_MENU_CUT', EDIT_MENU_CUT);
      break;
    case EDIT_MENU_DELETE:
      console.log('EDIT_MENU_DELETE', EDIT_MENU_DELETE);
      break;
    case EDIT_MENU_FIND:
      console.log('EDIT_MENU_FIND', EDIT_MENU_FIND);
      break;
    case EDIT_MENU_FIND_NEXT:
      console.log('EDIT_MENU_FIND_NEXT', EDIT_MENU_FIND_NEXT);
      break;
    case EDIT_MENU_FIND_PREVIOUS:
      console.log('EDIT_MENU_FIND_PREVIOUS', EDIT_MENU_FIND_PREVIOUS);
      break;
    case EDIT_MENU_GO_TO:
      console.log('EDIT_MENU_GO_TO', EDIT_MENU_GO_TO);
      break;
    case EDIT_MENU_PASTE:
      console.log('EDIT_MENU_PASTE', EDIT_MENU_PASTE);
      break;
    case EDIT_MENU_REPLACE:
      console.log('EDIT_MENU_REPLACE', EDIT_MENU_REPLACE);
      break;
    case EDIT_MENU_SELECT_ALL:
      console.log('EDIT_MENU_SELECT_ALL', EDIT_MENU_SELECT_ALL);
      break;
    case EDIT_MENU_TIME_DATE:
      console.log('EDIT_MENU_TIME_DATE', EDIT_MENU_TIME_DATE);
      break;
    case EDIT_MENU_UNDO:
      console.log('EDIT_MENU_UNDO', EDIT_MENU_UNDO);
      break;
    case FILE_MENU_EXIT:
      console.log('FILE_MENU_EXIT', FILE_MENU_EXIT);
      break;
    case FILE_MENU_NEW:
      console.log('FILE_MENU_NEW', FILE_MENU_NEW);
      break;
    case FILE_MENU_NEW_WINDOW:
      console.log('FILE_MENU_NEW_WINDOW', FILE_MENU_NEW_WINDOW);
      break;
    case FILE_MENU_OPEN:
      console.log('FILE_MENU_OPEN', FILE_MENU_OPEN);
      break;
    case FILE_MENU_PAGE_SETUP:
      console.log('FILE_MENU_PAGE_SETUP', FILE_MENU_PAGE_SETUP);
      break;
    case FILE_MENU_PRINT:
      console.log('FILE_MENU_PRINT', FILE_MENU_PRINT);
      break;
    case FILE_MENU_SAVE:
      console.log('FILE_MENU_SAVE', FILE_MENU_SAVE);
      break;
    case FILE_MENU_SAVE_AS:
      console.log('FILE_MENU_SAVE_AS', FILE_MENU_SAVE_AS);
      break;
    case FORMAT_MENU_FONT:
      console.log('FORMAT_MENU_FONT', FORMAT_MENU_FONT);
      break;
    case FORMAT_MENU_WORD_WRAP:
      console.log('FORMAT_MENU_WORD_WRAP', FORMAT_MENU_WORD_WRAP);
      break;
    case HELP_MENU_ABOUT_NOTEPAD:
      console.log('HELP_MENU_ABOUT_NOTEPAD', HELP_MENU_ABOUT_NOTEPAD);
      break;
    case HELP_MENU_SEND_FEEDBACK:
      console.log('HELP_MENU_SEND_FEEDBACK', HELP_MENU_SEND_FEEDBACK);
      break;
    case HELP_MENU_VIEW_HELP:
      console.log('HELP_MENU_VIEW_HELP', HELP_MENU_VIEW_HELP);
      break;
    case VIEW_MENU_RESTORE_DEFAULT_ZOOM:
      console.log('VIEW_MENU_RESTORE_DEFAULT_ZOOM', VIEW_MENU_RESTORE_DEFAULT_ZOOM);
      break;
    case VIEW_MENU_STATUS_BAR:
      console.log('VIEW_MENU_STATUS_BAR', VIEW_MENU_STATUS_BAR);
      break;
    case VIEW_MENU_ZOOM_IN:
      console.log('VIEW_MENU_ZOOM_IN', VIEW_MENU_ZOOM_IN);
      break;
    case VIEW_MENU_ZOOM_OUT:
      console.log('VIEW_MENU_ZOOM_OUT', VIEW_MENU_ZOOM_OUT);
      break;
  }
}
