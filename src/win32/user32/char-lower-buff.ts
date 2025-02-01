import koffi from 'koffi';

import { DWORD, DoubleWord, LPSTR, LPWSTR, LongPointerToString, LongPointerToWideString } from '../../@types';
import { user32 } from './user32';

export function CharLowerBuffW(characters: Buffer, length: DoubleWord): DoubleWord {
  return user32.invoke('CharLowerBuffW', DWORD, [koffi.inout(LPWSTR), DWORD], [characters, length]);
}

export function CharLowerBuffA(characters: Buffer, length: DoubleWord): DoubleWord {
  return user32.invoke('CharLowerBuffA', DWORD, [koffi.inout(LPSTR), DWORD], [characters, length]);
}
