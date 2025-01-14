import { Long } from '../../@types';

export interface IPoint {
  x: Long;
  y: Long;
}

export class Point implements IPoint {
  x: Long;
  y: Long;
}
