import {
  DWORD,
  DoubleWord,
  HFONT,
  INT,
  Int,
  LPCSTR,
  LPCWSTR,
  LongPointerToConstantString,
  LongPointerToConstantWideString,
} from '../../@types';
import { gdi32 } from './gdi32';

export enum FontWeight {
  DONTCARE = 0,
  THIN = 100,
  EXTRALIGHT = 200,
  LIGHT = 300,
  NORMAL = 400,
  MEDIUM = 500,
  SEMIBOLD = 600,
  BOLD = 700,
  EXTRABOLD = 800,
  HEAVY = 900,
  ULTRALIGHT = EXTRALIGHT,
  REGULAR = NORMAL,
  DEMIBOLD = SEMIBOLD,
  ULTRABOLD = EXTRABOLD,
  BLACK = HEAVY,
}

export enum FontCharSet {
  ANSI = 0,
  DEFAULT = 1,
  SYMBOL = 2,
  SHIFTJIS = 128,
  HANGEUL = 129,
  HANGUL = 129,
  GB2312 = 134,
  CHINESEBIG5 = 136,
  OEM = 255,
  JOHAB = 130,
  HEBREW = 177,
  ARABIC = 178,
  GREEK = 161,
  TURKISH = 162,
  VIETNAMESE = 163,
  THAI = 222,
  EASTEUROPE = 238,
  RUSSIAN = 204,
  MAC = 77,
  BALTIC = 186,
}

export enum FontOutPrecision {
  DEFAULT_PRECIS = 0,
  STRING_PRECIS = 1,
  CHARACTER_PRECIS = 2,
  STROKE_PRECIS = 3,
  TT_PRECIS = 4,
  DEVICE_PRECIS = 5,
  RASTER_PRECIS = 6,
  TT_ONLY_PRECIS = 7,
  OUTLINE_PRECIS = 8,
  SCREEN_OUTLINE_PRECIS = 9,
  PS_ONLY_PRECIS = 10,
}

export enum FontClipPrecision {
  DEFAULT_PRECIS = 0,
  CHARACTER_PRECIS = 1,
  STROKE_PRECIS = 2,
  MASK = 0xf,
  LH_ANGLES = 0x10,
  TT_ALWAYS = 0x20,
  DFA_DISABLE = 0x40,
  EMBEDDED = 0x80,
}

export enum FontQuality {
  DEFAULT_QUALITY = 0,
  DRAFT_QUALITY = 1,
  PROOF_QUALITY = 2,
  NONANTIALIASED_QUALITY = 3,
  ANTIALIASED_QUALITY = 4,
  CLEARTYPE_QUALITY = 5,
  CLEARTYPE_NATURAL_QUALITY = 6,
}

export enum FontPitch {
  DEFAULT_PITCH = 0,
  FIXED_PITCH = 1,
  VARIABLE_PITCH = 2,
  MONO_FONT = 8,
}

export enum FontFamily {
  DONTCARE = 0,
  ROMAN = 1,
  SWISS = 2,
  MODERN = 3,
  SCRIPT = 4,
  DECORATIVE = 5,
}

export function CreateFontW(
  height: Int,
  width: Int,
  escapement: Int,
  orientation: Int,
  weight: FontWeight,
  italic: DoubleWord,
  underline: DoubleWord,
  strikeOut: DoubleWord,
  charSet: FontCharSet,
  outPrecision: FontOutPrecision,
  clipPrecision: FontClipPrecision,
  quality: FontQuality,
  pitchAndFamily: FontPitch | FontFamily,
  fontFaceName: LongPointerToConstantWideString,
) {
  return gdi32.invoke(
    'CreateFontW',
    HFONT,
    [INT, INT, INT, INT, INT, DWORD, DWORD, DWORD, DWORD, DWORD, DWORD, DWORD, DWORD, LPCWSTR],
    [
      height,
      width,
      escapement,
      orientation,
      weight,
      italic,
      underline,
      strikeOut,
      charSet,
      outPrecision,
      clipPrecision,
      quality,
      pitchAndFamily,
      fontFaceName,
    ],
  );
}

export function CreateFontA(
  height: Int,
  width: Int,
  escapement: Int,
  orientation: Int,
  weight: FontWeight,
  italic: DoubleWord,
  underline: DoubleWord,
  strikeOut: DoubleWord,
  charSet: FontCharSet,
  outPrecision: FontOutPrecision,
  clipPrecision: FontClipPrecision,
  quality: FontQuality,
  pitchAndFamily: FontPitch | FontFamily,
  fontFaceName: LongPointerToConstantString,
) {
  return gdi32.invoke(
    'CreateFontA',
    HFONT,
    [INT, INT, INT, INT, INT, DWORD, DWORD, DWORD, DWORD, DWORD, DWORD, DWORD, DWORD, LPCSTR],
    [
      height,
      width,
      escapement,
      orientation,
      weight,
      italic,
      underline,
      strikeOut,
      charSet,
      outPrecision,
      clipPrecision,
      quality,
      pitchAndFamily,
      fontFaceName,
    ],
  );
}
