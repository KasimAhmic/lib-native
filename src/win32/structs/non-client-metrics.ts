import koffi from 'koffi';

import { INT, Int, UINT, UnsignedInt } from '../../@types';
import { ILogFontA, ILogFontW, LOGFONTA, LOGFONTW } from './log-font';

class NonClientMetrics<T extends INonClientMetricsA | INonClientMetricsW> {
  cbSize: UnsignedInt;
  iBorderWidth: Int;
  iScrollWidth: Int;
  iScrollHeight: Int;
  iCaptionWidth: Int;
  iCaptionHeight: Int;
  lfCaptionFont: T['lfCaptionFont'];
  iSmCaptionWidth: Int;
  iSmCaptionHeight: Int;
  lfSmCaptionFont: T['lfSmCaptionFont'];
  iMenuWidth: Int;
  iMenuHeight: Int;
  lfMenuFont: T['lfMenuFont'];
  lfStatusFont: T['lfStatusFont'];
  lfMessageFont: T['lfMessageFont'];
  iPaddedBorderWidth: Int;

  constructor(options: Partial<T>) {
    Object.assign(this, {
      ...{
        cbSize: 0,
        iBorderWidth: 0,
        iScrollWidth: 0,
        iScrollHeight: 0,
        iCaptionWidth: 0,
        iCaptionHeight: 0,
        lfCaptionFont: {},
        iSmCaptionWidth: 0,
        iSmCaptionHeight: 0,
        lfSmCaptionFont: {},
        iMenuWidth: 0,
        iMenuHeight: 0,
        lfMenuFont: {},
        lfStatusFont: {},
        lfMessageFont: {},
        iPaddedBorderWidth: 0,
      },
      ...options,
    });
  }
}

export interface INonClientMetricsW {
  cbSize: UnsignedInt;
  iBorderWidth: Int;
  iScrollWidth: Int;
  iScrollHeight: Int;
  iCaptionWidth: Int;
  iCaptionHeight: Int;
  lfCaptionFont: ILogFontW;
  iSmCaptionWidth: Int;
  iSmCaptionHeight: Int;
  lfSmCaptionFont: ILogFontW;
  iMenuWidth: Int;
  iMenuHeight: Int;
  lfMenuFont: ILogFontW;
  lfStatusFont: ILogFontW;
  lfMessageFont: ILogFontW;
  iPaddedBorderWidth: Int;
}

export class NonClientMetricsW extends NonClientMetrics<INonClientMetricsW> {
  constructor(options: Partial<Omit<INonClientMetricsW, 'cbSize'>> = {}) {
    super(options);

    this.cbSize = koffi.sizeof(NONCLIENTMETRICSW);
  }
}

export interface INonClientMetricsA {
  cbSize: UnsignedInt;
  iBorderWidth: Int;
  iScrollWidth: Int;
  iScrollHeight: Int;
  iCaptionWidth: Int;
  iCaptionHeight: Int;
  lfCaptionFont: ILogFontA;
  iSmCaptionWidth: Int;
  iSmCaptionHeight: Int;
  lfSmCaptionFont: ILogFontA;
  iMenuWidth: Int;
  iMenuHeight: Int;
  lfMenuFont: ILogFontA;
  lfStatusFont: ILogFontA;
  lfMessageFont: ILogFontA;
  iPaddedBorderWidth: Int;
}

export class NonClientMetricsA extends NonClientMetrics<INonClientMetricsA> {
  constructor(options: Partial<Omit<INonClientMetricsA, 'cbSize'>> = {}) {
    super(options);

    this.cbSize = koffi.sizeof(NONCLIENTMETRICSA);
  }
}

export const NONCLIENTMETRICSW = koffi.struct('NONCLIENTMETRICSW', {
  cbSize: UINT,
  iBorderWidth: INT,
  iScrollWidth: INT,
  iScrollHeight: INT,
  iCaptionWidth: INT,
  iCaptionHeight: INT,
  lfCaptionFont: LOGFONTW,
  iSmCaptionWidth: INT,
  iSmCaptionHeight: INT,
  lfSmCaptionFont: LOGFONTW,
  iMenuWidth: INT,
  iMenuHeight: INT,
  lfMenuFont: LOGFONTW,
  lfStatusFont: LOGFONTW,
  lfMessageFont: LOGFONTW,
  iPaddedBorderWidth: INT,
});

export const PNONCLIENTMETRICSW = koffi.pointer('PNONCLIENTMETRICSW', NONCLIENTMETRICSW);

export const NONCLIENTMETRICSA = koffi.struct('NONCLIENTMETRICSA', {
  cbSize: UINT,
  iBorderWidth: INT,
  iScrollWidth: INT,
  iScrollHeight: INT,
  iCaptionWidth: INT,
  iCaptionHeight: INT,
  lfCaptionFont: LOGFONTA,
  iSmCaptionWidth: INT,
  iSmCaptionHeight: INT,
  lfSmCaptionFont: LOGFONTA,
  iMenuWidth: INT,
  iMenuHeight: INT,
  lfMenuFont: LOGFONTA,
  lfStatusFont: LOGFONTA,
  lfMessageFont: LOGFONTA,
  iPaddedBorderWidth: INT,
});

export const PNONCLIENTMETRICSA = koffi.pointer('PNONCLIENTMETRICSA', NONCLIENTMETRICSA);
