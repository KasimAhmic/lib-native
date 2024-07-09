import { randomUUID } from 'node:crypto';

import { DataType, load } from 'ffi-rs';

import { User32 } from './user32';

export enum ExtendedWindowStyle {
  ACCEPT_FILES = 0x00000010,
  APP_WINDOW = 0x00040000,
  CLIENT_EDGE = 0x00000200,
  COMPOSITED = 0x02000000,
  CONTEXT_HELP = 0x00000400,
  CONTROL_PARENT = 0x00010000,
  DLG_MODAL_FRAME = 0x00000001,
  LAYERED = 0x0008000,
  LAYOUT_RTL = 0x00400000,
  LEFT = 0x00000000,
  LEFT_SCROLLBAR = 0x00004000,
  LTR_READING = 0x00000000,
  MDI_CHILD = 0x00000040,
  NO_ACTIVATE = 0x08000000,
  NO_INHERIT_LAYOUT = 0x00100000,
  NO_PARENT_NOTIFY = 0x00000004,
  NO_REDIRECTION_BITMAP = 0x00200000,
  RIGHT = 0x00001000,
  RIGHT_SCROLLBAR = 0x00000000,
  RTL_READING = 0x00002000,
  STATIC_EDGE = 0x00020000,
  TOOL_WINDOW = 0x00000080,
  TOP_MOST = 0x00000008,
  TRANSPARENT = 0x00000020,
  WINDOW_EDGE = 0x00000100,
  OVERLAPPED_WINDOW = WINDOW_EDGE | CLIENT_EDGE,
  PALETTE_WINDOW = WINDOW_EDGE | TOOL_WINDOW | TOP_MOST,
}

export enum WindowStyle {
  BORDER = 0x00800000,
  CAPTION = 0x00c00000,
  CHILD = 0x40000000,
  CHILD_WINDOW = 0x40000000,
  CLIP_CHILDREN = 0x02000000,
  CLIP_SIBLINGS = 0x04000000,
  DISABLED = 0x08000000,
  DLG_FRAME = 0x00400000,
  GROUP = 0x00020000,
  H_SCROLL = 0x00100000,
  ICONIC = 0x20000000,
  MAXIMIZE = 0x01000000,
  MAXIMIZE_BOX = 0x00010000,
  MINIMIZE = 0x20000000,
  MINIMIZE_BOX = 0x00020000,
  OVERLAPPED = 0x00000000,
  POPUP = 0x80000000,
  SIZE_BOX = 0x00040000,
  SYS_MENU = 0x00080000,
  TAB_STOP = 0x00010000,
  THICK_FRAME = 0x00040000,
  TILED = 0x00000000,
  VISIBLE = 0x10000000,
  V_SCROLL = 0x00200000,
  OVERLAPPED_WINDOW = OVERLAPPED | CAPTION | SYS_MENU | THICK_FRAME | MINIMIZE_BOX | MAXIMIZE_BOX,
  POPUP_WINDOW = POPUP | BORDER | SYS_MENU,
  TILED_WINDOW = OVERLAPPED | CAPTION | SYS_MENU | THICK_FRAME | MINIMIZE_BOX | MAXIMIZE_BOX,
}

export enum WindowPosition {
  USE_DEFAULT = 0x80000000,
}

type CreateWindowExWOptions = {
  windowName: string;
  width?: WindowPosition | number;
  height?: WindowPosition | number;
  xPosition?: WindowPosition | number;
  yPosition?: WindowPosition | number;
  style?: WindowStyle;
  extendedWindowStyle?: ExtendedWindowStyle;
  parentWindowHandle?: number;
  className?: string;
  menu?: number;
  instance?: number;
  param?: string;
};

export function CreateWindowExW(options: CreateWindowExWOptions): number {
  const { windowName } = options;

  const width = options.width ?? WindowPosition.USE_DEFAULT;
  const height = options.height ?? WindowPosition.USE_DEFAULT;
  const xPosition = options.xPosition ?? WindowPosition.USE_DEFAULT;
  const yPosition = options.yPosition ?? WindowPosition.USE_DEFAULT;
  const extendedWindowStyle = options.extendedWindowStyle ?? 0;
  const style = options.style ?? WindowStyle.OVERLAPPED_WINDOW;
  const parentWindowHandle = options.parentWindowHandle ?? 0;
  const className = options.className ?? randomUUID();
  const menu = options.menu ?? 0;
  const instance = options.instance ?? 0;
  const param = options.param ?? '';

  return load({
    library: User32.Name,
    funcName: 'CreateWindowExW',
    retType: DataType.I32,
    paramsType: [
      DataType.I32,
      DataType.String,
      DataType.String,
      DataType.I32,
      DataType.I32,
      DataType.I32,
      DataType.I32,
      DataType.I32,
      DataType.I32,
      DataType.I32,
      DataType.I32,
      DataType.String,
    ],
    paramsValue: [
      extendedWindowStyle,
      className,
      windowName,
      style,
      xPosition,
      yPosition,
      width,
      height,
      parentWindowHandle,
      menu,
      instance,
      param,
    ],
    freeResultMemory: true,
  });
}
