import koffi from 'koffi';

import { LPSTR, LPWSTR, LongPointerToString, LongPointerToWideString } from '../../@types';
import { user32 } from './user32';

export function CharLowerW(character: Buffer): LongPointerToWideString {
  return user32.invoke('CharLowerW', LPWSTR, [koffi.inout(LPWSTR)], [character]);
}

export function CharLowerA(character: Buffer): LongPointerToString {
  return user32.invoke('CharLowerA', LPSTR, [koffi.inout(LPSTR)], [character]);
}
