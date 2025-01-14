import { DoubleWord, LongParam, UnsignedInt, WindowHandle, WordParam } from '../../@types';
import { IPoint } from './point';

export interface IMessage {
  hwnd: WindowHandle;
  message: UnsignedInt;
  wParam: WordParam;
  lParam: LongParam;
  time: DoubleWord;
  pt: IPoint;
  lPrivate: DoubleWord;
}

export class Message {
  hwnd: WindowHandle;
  message: UnsignedInt;
  wParam: WordParam;
  lParam: LongParam;
  time: DoubleWord;
  pt: {
    x: IPoint['x'];
    y: IPoint['y'];
  };
  lPrivate: DoubleWord;
}
