import koffi from 'koffi';

import { DWORD, DoubleWord, LPSTR, LPWSTR } from '../../@types';
import { user32 } from './user32';

export function CharUpperBuffW(characters: Buffer, length: DoubleWord): DoubleWord {
  return user32.invoke('CharUpperBuffW', DWORD, [koffi.inout(LPWSTR), DWORD], [characters, length]);
}

export function CharUpperBuffA(characters: Buffer, length: DoubleWord): DoubleWord {
  return user32.invoke('CharUpperBuffA', DWORD, [koffi.inout(LPSTR), DWORD], [characters, length]);
}
