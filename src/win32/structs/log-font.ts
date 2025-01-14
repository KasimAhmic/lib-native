import koffi from 'koffi';

import { BYTE, Byte, CHAR, Char, LONG, Long, WCHAR, WideChar } from '../../@types';

class LogFont<T extends ILogFontA | ILogFontW> {
  lfHeight: Long;
  lfWidth: Long;
  lfEscapement: Long;
  lfOrientation: Long;
  lfWeight: Long;
  lfItalic: Byte;
  lfUnderline: Byte;
  lfStrikeOut: Byte;
  lfCharSet: Byte;
  lfOutPrecision: Byte;
  lfClipPrecision: Byte;
  lfQuality: Byte;
  lfPitchAndFamily: Byte;
  lfFaceName: T['lfFaceName'];

  constructor(options: Partial<T>) {
    Object.assign(this, {
      ...{
        lfHeight: 0,
        lfWidth: 0,
        lfEscapement: 0,
        lfOrientation: 0,
        lfWeight: 0,
        lfItalic: 0,
        lfUnderline: 0,
        lfStrikeOut: 0,
        lfCharSet: 0,
        lfOutPrecision: 0,
        lfClipPrecision: 0,
        lfQuality: 0,
        lfPitchAndFamily: 0,
        lfFaceName: '',
      },
      ...options,
    });
  }
}

export interface ILogFontW {
  lfHeight: Long;
  lfWidth: Long;
  lfEscapement: Long;
  lfOrientation: Long;
  lfWeight: Long;
  lfItalic: Byte;
  lfUnderline: Byte;
  lfStrikeOut: Byte;
  lfCharSet: Byte;
  lfOutPrecision: Byte;
  lfClipPrecision: Byte;
  lfQuality: Byte;
  lfPitchAndFamily: Byte;
  lfFaceName: Char;
}

export class LogFontW extends LogFont<ILogFontW> {
  constructor(options: Partial<ILogFontW>) {
    super(options);
  }
}

export interface ILogFontA {
  lfHeight: Long;
  lfWidth: Long;
  lfEscapement: Long;
  lfOrientation: Long;
  lfWeight: Long;
  lfItalic: Byte;
  lfUnderline: Byte;
  lfStrikeOut: Byte;
  lfCharSet: Byte;
  lfOutPrecision: Byte;
  lfClipPrecision: Byte;
  lfQuality: Byte;
  lfPitchAndFamily: Byte;
  lfFaceName: WideChar;
}

export class LogFontA extends LogFont<ILogFontA> {
  constructor(options: Partial<ILogFontA>) {
    super(options);
  }
}

export const LOGFONTA = koffi.struct('LOGFONTA', {
  lfHeight: LONG,
  lfWidth: LONG,
  lfEscapement: LONG,
  lfOrientation: LONG,
  lfWeight: LONG,
  lfItalic: BYTE,
  lfUnderline: BYTE,
  lfStrikeOut: BYTE,
  lfCharSet: BYTE,
  lfOutPrecision: BYTE,
  lfClipPrecision: BYTE,
  lfQuality: BYTE,
  lfPitchAndFamily: BYTE,
  lfFaceName: CHAR,
});

export const PLOGFONTA = koffi.pointer('PLOGFONTA', LOGFONTA);

export const LOGFONTW = koffi.struct('LOGFONTW', {
  lfHeight: LONG,
  lfWidth: LONG,
  lfEscapement: LONG,
  lfOrientation: LONG,
  lfWeight: LONG,
  lfItalic: BYTE,
  lfUnderline: BYTE,
  lfStrikeOut: BYTE,
  lfCharSet: BYTE,
  lfOutPrecision: BYTE,
  lfClipPrecision: BYTE,
  lfQuality: BYTE,
  lfPitchAndFamily: BYTE,
  lfFaceName: WCHAR,
});

export const PLOGFONTW = koffi.pointer('PLOGFONTW', LOGFONTW);
