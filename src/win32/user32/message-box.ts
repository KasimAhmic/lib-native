import { DataType, load } from 'ffi-rs';

import { User32 } from './user32';

export enum MessageBoxButtons {
  OK = 0x00000000,
  OK_CANCEL = 0x00000001,
  ABORT_RETRY_IGNORE = 0x00000002,
  YES_NO_CANCEL = 0x00000003,
  YES_NO = 0x00000004,
  RETRY_CANCEL = 0x00000005,
  CANCEL_TRY_CONTINUE = 0x00000006,
}

export enum MessageBoxIcon {
  ICON_ERROR = 0x00000010,
  ICON_QUESTION = 0x00000020,
  ICON_WARNING = 0x00000030,
  ICON_INFORMATION = 0x00000040,
}

export enum MessageBoxDefaultButton {
  BUTTON1 = 0x00000000,
  BUTTON2 = 0x00000100,
  BUTTON3 = 0x00000200,
  BUTTON4 = 0x00000300,
}

enum MessageBoxResult {
  ABORT = 3, // The Abort button was selected.
  CANCEL = 2, // The Cancel button was selected.
  CONTINUE = 11, // The Continue button was selected.
  IGNORE = 5, // The Ignore button was selected.
  NO = 7, // The No button was selected.
  OK = 1, // The OK button was selected.
  RETRY = 4, // The Retry button was selected.
  TRYAGAIN = 10, // The Try Again button was selected.
  YES = 6, // The Yes button was selected.
}

type MessageBoxOptions = {
  buttons?: MessageBoxButtons;
  icon?: MessageBoxIcon;
  defaultButton?: MessageBoxDefaultButton;
};

export function MessageBox(title: string, content: string, options?: MessageBoxOptions): MessageBoxResult {
  return load({
    library: User32.Name,
    funcName: 'MessageBoxA',
    retType: DataType.I32,
    paramsType: [DataType.I32, DataType.String, DataType.String, DataType.U64],
    paramsValue: [
      0,
      content,
      title,
      (options?.buttons ?? 0) | (options?.icon ?? 0) | (options?.defaultButton ?? 0),
    ],
  });
}
