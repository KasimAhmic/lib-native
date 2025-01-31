import koffi from 'koffi';

import { BOOL, BYTE, Bool, Byte, DeviceContextHandle, HDC } from '../../@types';
import { IRect, RECT } from './rect';

export interface IPaint {
  hdc: DeviceContextHandle;
  erase: Bool;
  rect: IRect;
  restore: Bool;
  incUpdate: Bool;
  rgbReserved: Byte;
}

export class Paint implements IPaint {
  hdc: DeviceContextHandle;
  erase: Bool;
  rect: IRect;
  /** Reserverd; used internally by the system */
  restore: Bool;
  /** Reserverd; used internally by the system */
  incUpdate: Bool;
  /** Reserverd; used internally by the system */
  rgbReserved: Byte;

  constructor(options?: Omit<IPaint, 'restore' | 'incUpdate' | 'rgbReserved'>) {
    Object.assign(this, options ?? {});
  }
}

export const PAINTSTRUCT = koffi.struct('PAINTSTRUCT', {
  hdc: HDC,
  fErase: BOOL,
  rcPaint: RECT,
  fRestore: BOOL,
  fIncUpdate: BOOL,
  rgbReserved: BYTE,
});

export const LPPAINTSTRUCT = koffi.pointer('LPPAINTSTRUCT', PAINTSTRUCT);
