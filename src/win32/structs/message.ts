import koffi from 'koffi';

import {
  DWORD,
  DoubleWord,
  HWND,
  LPARAM,
  LongParam,
  UINT,
  UnsignedInt,
  WPARAM,
  WindowHandle,
  WordParam,
} from '../../@types';
import { IPoint, POINT } from './point';

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
  pt: IPoint;
  lPrivate: DoubleWord;
}

export const MSG = koffi.struct('MSG', {
  hwnd: HWND,
  message: UINT,
  wParam: WPARAM,
  lParam: LPARAM,
  time: DWORD,
  pt: POINT,
  lPrivate: DWORD,
});

export const LPMSG = koffi.pointer('LPMSG', MSG);
