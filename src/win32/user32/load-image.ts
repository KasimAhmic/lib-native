import {
  HANDLE,
  HINSTANCE,
  Handle,
  INT,
  InstanceHandle,
  Int,
  LPCSTR,
  LPCWSTR,
  LongPointerToConstantWideString,
  UINT,
  UnsignedInt,
} from '../../@types';
import { user32 } from './user32';

export function LoadImageW(
  instanceHandle: InstanceHandle | null,
  name: LongPointerToConstantWideString,
  type: UnsignedInt,
  width: Int,
  height: Int,
  loadFlags: UnsignedInt,
): Handle {
  return user32.invoke(
    'LoadImageW',
    HANDLE,
    [HINSTANCE, LPCWSTR, UINT, INT, INT, UINT],
    [instanceHandle, name, type, width, height, loadFlags],
  );
}

export function LoadImageA(
  instanceHandle: InstanceHandle | null,
  name: LongPointerToConstantWideString,
  type: UnsignedInt,
  width: Int,
  height: Int,
  loadFlags: UnsignedInt,
): Handle {
  return user32.invoke(
    'LoadImageA',
    HANDLE,
    [HINSTANCE, LPCSTR, UINT, INT, INT, UINT],
    [instanceHandle, name, type, width, height, loadFlags],
  );
}

// TODO: Look into extracting these enums into a separate file or something

export enum OldBitmapMap {
  CLOSE = 32754,
  UPARROW = 32753,
  DNARROW = 32752,
  RGARROW = 32751,
  LFARROW = 32750,
  REDUCE = 32749,
  ZOOM = 32748,
  RESTORE = 32747,
  REDUCED = 32746,
  ZOOMD = 32745,
  RESTORED = 32744,
  UPARROWD = 32743,
  DNARROWD = 32742,
  RGARROWD = 32741,
  LFARROWD = 32740,
  MNARROW = 32739,
  COMBO = 32738,
  UPARROWI = 32737,
  DNARROWI = 32736,
  RGARROWI = 32735,
  LFARROWI = 32734,
  OLD_CLOSE = 32767,
  SIZE = 32766,
  OLD_UPARROW = 32765,
  OLD_DNARROW = 32764,
  OLD_RGARROW = 32763,
  OLD_LFARROW = 32762,
  BTSIZE = 32761,
  CHECK = 32760,
  CHECKBOXES = 32759,
  BTNCORNERS = 32758,
  OLD_REDUCE = 32757,
  OLD_ZOOM = 32756,
  OLD_RESTORE = 32755,
}

export enum OldCursorResource {
  NORMAL = 32512,
  IBEAM = 32513,
  WAIT = 32514,
  CROSS = 32515,
  UP = 32516,
  SIZE = 32640 /* OBSOLETE: use SIZEALL */,
  ICON = 32641 /* OBSOLETE: use NORMAL */,
  SIZENWSE = 32642,
  SIZENESW = 32643,
  SIZEWE = 32644,
  SIZENS = 32645,
  SIZEALL = 32646,
  ICOCUR = 32647 /* OBSOLETE: use OldIconConstant.WINLOGO */,
  NO = 32648,
  HAND = 32649,
  APPSTARTING = 32650,
}

export enum OldIconConstant {
  SAMPLE = 32512,
  HAND = 32513,
  QUES = 32514,
  BANG = 32515,
  NOTE = 32516,
  WINLOGO = 32517,
  WARNING = BANG,
  ERROR = HAND,
  INFORMATION = NOTE,
  SHIELD = 32518,
}

export enum IconDefinitionIdentifier {
  APPLICATION = 32512,
  HAND = 32513,
  QUESTION = 32514,
  EXCLAMATION = 32515,
  ASTERISK = 32516,
  WINLOGO = 32517,
  SHIELD = 32518,
  WARNING = 32515,
  ERROR = 32513,
  INFORMATION = 32516,
}

export enum IconCursorDefinition {
  ARROW = 32512,
  IBEAM = 32513,
  WAIT = 32514,
  CROSS = 32515,
  UPARROW = 32516,
  SIZE = 32640 /* OBSOLETE: use IconDefinitionIdentifier.SIZEALL */,
  ICON = 32641 /* OBSOLETE: use IconDefinitionIdentifier.ARROW */,
  SIZENWSE = 32642,
  SIZENESW = 32643,
  SIZEWE = 32644,
  SIZENS = 32645,
  SIZEALL = 32646,
  NO = 32648 /*not in win3.1 */,
  HAND = 32649,
  APPSTARTING = 32650 /*not in win3.1 */,
  HELP = 32651,
  PIN = 32671,
  PERSON = 32672,
}

export enum LoadResource {
  DEFAULTCOLOR = 0x00000000,
  MONOCHROME = 0x00000001,
  COLOR = 0x00000002,
  COPYRETURNORG = 0x00000004,
  COPYDELETEORG = 0x00000008,
  LOADFROMFILE = 0x00000010,
  LOADTRANSPARENT = 0x00000020,
  DEFAULTSIZE = 0x00000040,
  VGACOLOR = 0x00000080,
  LOADMAP3DCOLORS = 0x00001000,
  CREATEDIBSECTION = 0x00002000,
  COPYFROMRESOURCE = 0x00004000,
  SHARED = 0x00008000,
}

export enum Image {
  BITMAP = 0,
  ICON = 1,
  CURSOR = 2,
  ENHMETAFILE = 3,
}
