import { MenuFlag } from '@ahmic/lib-native';
import { AppendMenuW } from '@ahmic/lib-native/win32/user32/append-menu';
import { CreateMenu } from '@ahmic/lib-native/win32/user32/create-menu';
import { SetMenu } from '@ahmic/lib-native/win32/user32/set-menu';
import koffi from 'koffi';

import {
  EDIT_MENU_COPY,
  EDIT_MENU_HISTORY_CANCEL_EDIT,
  EDIT_MENU_HISTORY_CLEAR,
  EDIT_MENU_HISTORY_COPY,
  EDIT_MENU_HISTORY_EDIT,
  EDIT_MENU_PASTE,
  HELP_MENU_ABOUT_CALCULATOR,
  HELP_MENU_SEND_FEEDBACK,
  HELP_MENU_VIEW_HELP,
  VIEW_MENU_BASIC,
  VIEW_MENU_DATE_CALCULATION,
  VIEW_MENU_DIGIT_GROUPING,
  VIEW_MENU_HISTORY,
  VIEW_MENU_PROGRAMMER,
  VIEW_MENU_SCIENTIFIC,
  VIEW_MENU_STANDARD,
  VIEW_MENU_STATISTICS,
  VIEW_MENU_UNIT_CONVERSION,
  VIEW_MENU_WORKSHEET_FUEL_CONSUMPTION,
  VIEW_MENU_WORKSHEET_FUEL_ECONOMY,
  VIEW_MENU_WORKSHEET_MORTGAGE,
  VIEW_MENU_WORKSHEET_VEHICLE_LEASE,
} from '../calculator.constants';
import { state } from '../state';

export function handleWindowCreate(): number {
  createMenu();

  return 0;
}

function createMenu() {
  state.handles.menuHandle = CreateMenu();
  state.handles.worksheetsMenuHandle = CreateMenu();
  state.handles.viewMenuHandle = CreateMenu();
  state.handles.historyMenuHandle = CreateMenu();
  state.handles.editMenuHandle = CreateMenu();
  state.handles.helpMenuHandle = CreateMenu();

  // Worksheets menu
  AppendMenuW(state.handles.worksheetsMenuHandle, MenuFlag.STRING, VIEW_MENU_WORKSHEET_MORTGAGE, 'Mortgage');
  AppendMenuW(
    state.handles.worksheetsMenuHandle,
    MenuFlag.STRING,
    VIEW_MENU_WORKSHEET_VEHICLE_LEASE,
    'Vehicle lease',
  );
  AppendMenuW(
    state.handles.worksheetsMenuHandle,
    MenuFlag.STRING,
    VIEW_MENU_WORKSHEET_FUEL_ECONOMY,
    'Fuel economy',
  );
  AppendMenuW(
    state.handles.worksheetsMenuHandle,
    MenuFlag.STRING,
    VIEW_MENU_WORKSHEET_FUEL_CONSUMPTION,
    'Fuel consumption',
  );

  // View menu
  AppendMenuW(state.handles.viewMenuHandle, MenuFlag.STRING, VIEW_MENU_STANDARD, 'Standard\tAlt+1');
  AppendMenuW(state.handles.viewMenuHandle, MenuFlag.STRING, VIEW_MENU_SCIENTIFIC, 'Scientific\tAlt+2');
  AppendMenuW(state.handles.viewMenuHandle, MenuFlag.STRING, VIEW_MENU_PROGRAMMER, 'Programmer\tAlt+3');
  AppendMenuW(state.handles.viewMenuHandle, MenuFlag.STRING, VIEW_MENU_STATISTICS, 'Statistics\tAlt+4');
  AppendMenuW(state.handles.viewMenuHandle, MenuFlag.SEPARATOR, 0, null);
  AppendMenuW(state.handles.viewMenuHandle, MenuFlag.STRING, VIEW_MENU_HISTORY, 'History\tCtrl+H');
  AppendMenuW(state.handles.viewMenuHandle, MenuFlag.STRING, VIEW_MENU_DIGIT_GROUPING, 'Digit grouping');
  AppendMenuW(state.handles.viewMenuHandle, MenuFlag.SEPARATOR, 0, null);
  AppendMenuW(state.handles.viewMenuHandle, MenuFlag.STRING, VIEW_MENU_BASIC, 'Basic\tCtrl+F4');
  AppendMenuW(
    state.handles.viewMenuHandle,
    MenuFlag.STRING,
    VIEW_MENU_UNIT_CONVERSION,
    'Unit conversion\tCtrl+U',
  );
  AppendMenuW(
    state.handles.viewMenuHandle,
    MenuFlag.STRING,
    VIEW_MENU_DATE_CALCULATION,
    'Date calculation\tCtrl+E',
  );
  AppendMenuW(
    state.handles.viewMenuHandle,
    MenuFlag.POPUP,
    koffi.address(state.handles.worksheetsMenuHandle),
    'Worksheets',
  );

  // History menu
  AppendMenuW(state.handles.historyMenuHandle, MenuFlag.STRING, EDIT_MENU_HISTORY_COPY, 'Copy History');
  AppendMenuW(state.handles.historyMenuHandle, MenuFlag.STRING, EDIT_MENU_HISTORY_EDIT, 'Edit\tF2');
  AppendMenuW(
    state.handles.historyMenuHandle,
    MenuFlag.STRING,
    EDIT_MENU_HISTORY_CANCEL_EDIT,
    'Cancel Edit\tEsc',
  );
  AppendMenuW(
    state.handles.historyMenuHandle,
    MenuFlag.STRING,
    EDIT_MENU_HISTORY_CLEAR,
    'Clear\tCtrl+Shift+D',
  );

  // Edit menu
  AppendMenuW(state.handles.editMenuHandle, MenuFlag.STRING, EDIT_MENU_COPY, 'Copy\tCtrl+C');
  AppendMenuW(state.handles.editMenuHandle, MenuFlag.STRING, EDIT_MENU_PASTE, 'Copy\tCtrl+V');
  AppendMenuW(state.handles.editMenuHandle, MenuFlag.SEPARATOR, 0, null);
  AppendMenuW(
    state.handles.editMenuHandle,
    MenuFlag.POPUP,
    koffi.address(state.handles.historyMenuHandle),
    'History',
  );

  // Help menu
  AppendMenuW(state.handles.helpMenuHandle, MenuFlag.STRING, HELP_MENU_VIEW_HELP, '&View Help');
  AppendMenuW(state.handles.helpMenuHandle, MenuFlag.STRING, HELP_MENU_SEND_FEEDBACK, '&Send Feedback');
  AppendMenuW(state.handles.helpMenuHandle, MenuFlag.SEPARATOR, 0, null);
  AppendMenuW(state.handles.helpMenuHandle, MenuFlag.STRING, HELP_MENU_ABOUT_CALCULATOR, '&About Calculator');

  // TODO: See if there's a better way to do this, or at least create a helper function
  AppendMenuW(state.handles.menuHandle, MenuFlag.POPUP, koffi.address(state.handles.viewMenuHandle), '&View');
  AppendMenuW(state.handles.menuHandle, MenuFlag.POPUP, koffi.address(state.handles.editMenuHandle), '&Edit');
  AppendMenuW(state.handles.menuHandle, MenuFlag.POPUP, koffi.address(state.handles.helpMenuHandle), '&Help');

  SetMenu(state.handles.mainWindowHandle, state.handles.menuHandle);
}
