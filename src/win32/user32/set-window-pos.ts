import { DataType, load } from 'ffi-rs';

import { User32 } from './user32';

export enum WindowLevel {
  BOTTOM = 1,
  NO_TOP_MOST = -2,
  TOP_MOST = -1,
  TOP = 0,
}

export enum WindowFlag {
  ASYNC_WINDOW_POS = 0x4000,
  DEFER_ERASE = 0x2000,
  DRAW_FRAME = 0x0020,
  FRAME_CHANGED = 0x0020,
  HIDE_WINDOW = 0x0080,
  NO_ACTIVATE = 0x0010,
  NO_COPY_BITS = 0x0100,
  NO_MOVE = 0x0002,
  NO_OWNER_Z_ORDER = 0x0200,
  NO_REDRAW = 0x0008,
  NO_REPOSITION = 0x0200,
  NO_SEND_CHANGING = 0x0400,
  NO_SIZE = 0x0001,
  NO_ZORDER = 0x0004,
  SHOW_WINDOW = 0x0040,
}

type SetWindowPosOptions = {
  windowHandle: number;
  insertAfter: number | WindowLevel;
  xPosition: number;
  yPosition: number;
  width: number;
  height: number;
  flags: WindowFlag;
};

/**
 *
 * @param windowHandle
 *
 * @see https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-setwindowpos
 */
export function SetWindowPos(options: SetWindowPosOptions): boolean {
  return load({
    library: User32.Name,
    funcName: 'SetWindowPos',
    retType: DataType.Boolean,
    paramsType: [
      DataType.I32,
      DataType.I32,
      DataType.I32,
      DataType.I32,
      DataType.I32,
      DataType.I32,
      DataType.I32,
    ],
    paramsValue: [
      options.windowHandle,
      options.insertAfter,
      options.xPosition,
      options.yPosition,
      options.width,
      options.height,
      options.flags ?? 0,
    ],
  });
}
