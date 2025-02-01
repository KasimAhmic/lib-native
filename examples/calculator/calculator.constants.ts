import { Accelerator, AcceleratorBehavior, IAccelerator, VirtualKey } from '@ahmic/lib-native';

export const CLASS_NAME = 'LibNativeCalculator';

// IDs
export const VIEW_MENU_STANDARD = 1;
export const VIEW_MENU_SCIENTIFIC = 2;
export const VIEW_MENU_PROGRAMMER = 3;
export const VIEW_MENU_STATISTICS = 4;
export const VIEW_MENU_HISTORY = 5;
export const VIEW_MENU_DIGIT_GROUPING = 6;
export const VIEW_MENU_BASIC = 7;
export const VIEW_MENU_UNIT_CONVERSION = 8;
export const VIEW_MENU_DATE_CALCULATION = 9;
export const VIEW_MENU_WORKSHEET_MORTGAGE = 10;
export const VIEW_MENU_WORKSHEET_VEHICLE_LEASE = 11;
export const VIEW_MENU_WORKSHEET_FUEL_ECONOMY = 12;
export const VIEW_MENU_WORKSHEET_FUEL_CONSUMPTION = 13;

export const EDIT_MENU_COPY = 14;
export const EDIT_MENU_PASTE = 15;
export const EDIT_MENU_HISTORY_COPY = 16;
export const EDIT_MENU_HISTORY_EDIT = 17;
export const EDIT_MENU_HISTORY_CANCEL_EDIT = 18;
export const EDIT_MENU_HISTORY_CLEAR = 19;

export const HELP_MENU_VIEW_HELP = 20;
export const HELP_MENU_SEND_FEEDBACK = 21;
export const HELP_MENU_ABOUT_CALCULATOR = 22;

// Sizes
export const WINDOW_WIDTH = 350;
export const WINDOW_HEIGHT = 500;

const { FCONTROL, FSHIFT, FVIRTKEY, FALT } = AcceleratorBehavior;

export const ACCELERATORS: IAccelerator[] = [
  // View
  new Accelerator({ fVirt: FVIRTKEY | FALT, key: VirtualKey.ONE, cmd: VIEW_MENU_STANDARD }),
  new Accelerator({ fVirt: FVIRTKEY | FALT, key: VirtualKey.TWO, cmd: VIEW_MENU_SCIENTIFIC }),
  new Accelerator({ fVirt: FVIRTKEY | FALT, key: VirtualKey.THREE, cmd: VIEW_MENU_PROGRAMMER }),
  new Accelerator({ fVirt: FVIRTKEY | FALT, key: VirtualKey.FOUR, cmd: VIEW_MENU_STATISTICS }),
  new Accelerator({ fVirt: FVIRTKEY | FCONTROL, key: VirtualKey.H, cmd: VIEW_MENU_HISTORY }),
  new Accelerator({ fVirt: FVIRTKEY | FCONTROL, key: VirtualKey.F4, cmd: VIEW_MENU_BASIC }),
  new Accelerator({ fVirt: FVIRTKEY | FCONTROL, key: VirtualKey.U, cmd: VIEW_MENU_UNIT_CONVERSION }),
  new Accelerator({ fVirt: FVIRTKEY | FCONTROL, key: VirtualKey.E, cmd: VIEW_MENU_DATE_CALCULATION }),

  // Edit
  new Accelerator({ fVirt: FVIRTKEY | FCONTROL, key: VirtualKey.C, cmd: EDIT_MENU_COPY }),
  new Accelerator({ fVirt: FVIRTKEY | FCONTROL, key: VirtualKey.V, cmd: EDIT_MENU_PASTE }),
  new Accelerator({ fVirt: FVIRTKEY, key: VirtualKey.F2, cmd: EDIT_MENU_HISTORY_EDIT }),
  new Accelerator({ fVirt: FVIRTKEY, key: VirtualKey.ESCAPE, cmd: EDIT_MENU_HISTORY_CANCEL_EDIT }),
  new Accelerator({ fVirt: FVIRTKEY | FCONTROL | FSHIFT, key: VirtualKey.D, cmd: EDIT_MENU_HISTORY_CLEAR }),
];
