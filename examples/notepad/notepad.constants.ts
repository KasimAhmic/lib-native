import { Accelerator, AcceleratorBehavior, IAccelerator, VirtualKey } from '@ahmic/lib-native/win32';

// Class Names
export const CLASS_NAME = 'LibNativeNotepad';

// IDs
export const FILE_MENU_NEW = 1;
export const FILE_MENU_NEW_WINDOW = 2;
export const FILE_MENU_OPEN = 3;
export const FILE_MENU_SAVE = 4;
export const FILE_MENU_SAVE_AS = 5;
export const FILE_MENU_PAGE_SETUP = 6;
export const FILE_MENU_PRINT = 7;
export const FILE_MENU_EXIT = 8;

export const EDIT_MENU_UNDO = 9;
export const EDIT_MENU_CUT = 10;
export const EDIT_MENU_COPY = 11;
export const EDIT_MENU_PASTE = 12;
export const EDIT_MENU_DELETE = 13;
export const EDIT_MENU_FIND = 14;
export const EDIT_MENU_FIND_NEXT = 15;
export const EDIT_MENU_FIND_PREVIOUS = 16;
export const EDIT_MENU_REPLACE = 17;
export const EDIT_MENU_GO_TO = 18;
export const EDIT_MENU_SELECT_ALL = 19;
export const EDIT_MENU_TIME_DATE = 20;

export const FORMAT_MENU_WORD_WRAP = 21;
export const FORMAT_MENU_FONT = 22;

export const VIEW_MENU_ZOOM_IN = 23;
export const VIEW_MENU_ZOOM_OUT = 24;
export const VIEW_MENU_RESTORE_DEFAULT_ZOOM = 25;
export const VIEW_MENU_STATUS_BAR = 26;

export const HELP_MENU_VIEW_HELP = 27;
export const HELP_MENU_SEND_FEEDBACK = 28;
export const HELP_MENU_ABOUT_NOTEPAD = 29;

export const DEBUG_MENU_LIPSUM = 500;

export const EDIT_ID = 30;

// Status Bar Parts
export const STATUS_BAR_EMPTY = 0;
export const STATUS_BAR_LINE_COL = 1;
export const STATUS_BAR_ZOOM_LEVEL = 2;
export const STATUS_BAR_LINE_ENDING = 3;
export const STATUS_BAR_ENCODING = 4;

// Sizes
export const WINDOW_WIDTH = 800;
export const WINDOW_HEIGHT = 600;
export const STATUS_BAR_PART_SIZES: number[] = [140, 50, 120, 130];

// Misc
export const MAX_EDIT_LENGTH = 1024 * 1024 * 1024;

const { FCONTROL, FSHIFT, FVIRTKEY } = AcceleratorBehavior;

export const ACCELERATORS: IAccelerator[] = [
  // File
  new Accelerator({ fVirt: FVIRTKEY | FCONTROL, key: VirtualKey.N, cmd: FILE_MENU_NEW }),
  new Accelerator({ fVirt: FVIRTKEY | FCONTROL | FSHIFT, key: VirtualKey.N, cmd: FILE_MENU_NEW_WINDOW }),
  new Accelerator({ fVirt: FVIRTKEY | FCONTROL, key: VirtualKey.O, cmd: FILE_MENU_OPEN }),
  new Accelerator({ fVirt: FVIRTKEY | FCONTROL, key: VirtualKey.S, cmd: FILE_MENU_SAVE }),
  new Accelerator({ fVirt: FVIRTKEY | FCONTROL | FSHIFT, key: VirtualKey.S, cmd: FILE_MENU_SAVE_AS }),
  new Accelerator({ fVirt: FVIRTKEY | FCONTROL, key: VirtualKey.P, cmd: FILE_MENU_PRINT }),

  // Edit
  new Accelerator({ fVirt: FVIRTKEY | FCONTROL, key: VirtualKey.Z, cmd: EDIT_MENU_UNDO }),
  new Accelerator({ fVirt: FVIRTKEY | FCONTROL, key: VirtualKey.X, cmd: EDIT_MENU_CUT }),
  new Accelerator({ fVirt: FVIRTKEY | FCONTROL, key: VirtualKey.C, cmd: EDIT_MENU_COPY }),
  new Accelerator({ fVirt: FVIRTKEY | FCONTROL, key: VirtualKey.V, cmd: EDIT_MENU_PASTE }),
  new Accelerator({ fVirt: FVIRTKEY, key: VirtualKey.DELETE, cmd: EDIT_MENU_DELETE }),
  new Accelerator({ fVirt: FVIRTKEY | FCONTROL, key: VirtualKey.F, cmd: EDIT_MENU_FIND }),
  new Accelerator({ fVirt: FVIRTKEY, key: VirtualKey.F3, cmd: EDIT_MENU_FIND_NEXT }),
  new Accelerator({ fVirt: FVIRTKEY | FSHIFT, key: VirtualKey.F3, cmd: EDIT_MENU_FIND_PREVIOUS }),
  new Accelerator({ fVirt: FVIRTKEY | FCONTROL, key: VirtualKey.H, cmd: EDIT_MENU_REPLACE }),
  new Accelerator({ fVirt: FVIRTKEY | FCONTROL, key: VirtualKey.G, cmd: EDIT_MENU_GO_TO }),
  new Accelerator({ fVirt: FVIRTKEY | FCONTROL, key: VirtualKey.A, cmd: EDIT_MENU_SELECT_ALL }),
  new Accelerator({ fVirt: FVIRTKEY, key: VirtualKey.F5, cmd: EDIT_MENU_TIME_DATE }),

  // View
  new Accelerator({ fVirt: FVIRTKEY | FCONTROL, key: VirtualKey.ADD, cmd: VIEW_MENU_ZOOM_IN }),
  new Accelerator({ fVirt: FVIRTKEY | FCONTROL, key: VirtualKey.SUBTRACT, cmd: VIEW_MENU_ZOOM_OUT }),
  new Accelerator({ fVirt: FVIRTKEY | FCONTROL, key: VirtualKey.ZERO, cmd: VIEW_MENU_RESTORE_DEFAULT_ZOOM }),
  new Accelerator({ fVirt: FVIRTKEY | FCONTROL, key: VirtualKey.NUMPAD0, cmd: VIEW_MENU_RESTORE_DEFAULT_ZOOM }),
];
