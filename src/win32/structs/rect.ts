import koffi from 'koffi';

import { LONG } from '../../@types';

export interface IRect {
  top: number;
  left: number;
  right: number;
  bottom: number;
}

export class Rect implements IRect {
  top: number;
  left: number;
  right: number;
  bottom: number;
}

export const RECT = koffi.struct('RECT', {
  left: LONG,
  top: LONG,
  right: LONG,
  bottom: LONG,
});

export const LPRECT = koffi.pointer('LPRECT', RECT);
