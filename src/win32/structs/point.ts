import koffi from 'koffi';

import { LONG, Long } from '../../@types';

export interface IPoint {
  x: Long;
  y: Long;
}

export class Point implements IPoint {
  x: Long;
  y: Long;
}

export const POINT = koffi.struct('POINT', {
  x: LONG,
  y: LONG,
});

export const LPPOINT = koffi.pointer('LPPOINT', POINT);
