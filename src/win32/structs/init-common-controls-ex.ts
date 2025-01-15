import koffi from 'koffi';

import { DoubleWord, INITCOMMONCONTROLSEX } from '../../@types';

export enum CommonControlStyles {
  LISTVIEW_CLASSES = 0x00000001,
  TREEVIEW_CLASSES = 0x00000002,
  BAR_CLASSES = 0x00000004,
  TAB_CLASSES = 0x00000008,
  UPDOWN_CLASS = 0x00000010,
  PROGRESS_CLASS = 0x00000020,
  HOTKEY_CLASS = 0x00000040,
  ANIMATE_CLASS = 0x00000080,
  WIN95_CLASSES = 0x000000ff,
  DATE_CLASSES = 0x00000100,
  USEREX_CLASSES = 0x00000200,
  COOL_CLASSES = 0x00000400,
  INTERNET_CLASSES = 0x00000800,
  PAGESCROLLER_CLASS = 0x00001000,
  NATIVEFNTCTL_CLASS = 0x00002000,
  STANDARD_CLASSES = 0x00004000,
  LINK_CLASS = 0x00008000,
}

export interface IInitCommonControlsEx {
  dwSize: DoubleWord;
  dwICC: DoubleWord;
}

export class InitCommonControlsExStruct implements IInitCommonControlsEx {
  dwSize: DoubleWord;
  dwICC: DoubleWord;

  constructor(styles: CommonControlStyles) {
    this.dwSize = koffi.sizeof(INITCOMMONCONTROLSEX);
    this.dwICC = styles;
  }
}
