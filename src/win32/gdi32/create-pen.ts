import { COLORREF, ColorReference, HPEN, INT, Int, PenHandle } from '../../@types';
import { gdi32 } from './gdi32';

export enum PenStyle {
  /* Pen Styles */
  SOLID = 0,
  DASH = 1 /* -------  */,
  DOT = 2 /* .......  */,
  DASHDOT = 3 /* _._._._  */,
  DASHDOTDOT = 4 /* _.._.._  */,
  NULL = 5,
  INSIDEFRAME = 6,
  USERSTYLE = 7,
  ALTERNATE = 8,
  STYLE_MASK = 0x0000000f,

  ENDCAP_ROUND = 0x00000000,
  ENDCAP_SQUARE = 0x00000100,
  ENDCAP_FLAT = 0x00000200,
  ENDCAP_MASK = 0x00000f00,

  JOIN_ROUND = 0x00000000,
  JOIN_BEVEL = 0x00001000,
  JOIN_MITER = 0x00002000,
  JOIN_MASK = 0x0000f000,

  COSMETIC = 0x00000000,
  GEOMETRIC = 0x00010000,
  TYPE_MASK = 0x000f0000,
}

export function CreatePen(style: PenStyle, width: Int, color: ColorReference): PenHandle {
  return gdi32.invoke('CreatePen', HPEN, [INT, INT, COLORREF], [style, width, color]);
}
