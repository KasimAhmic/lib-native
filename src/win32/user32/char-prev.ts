import {
  LPCSTR,
  LPCWSTR,
  LPSTR,
  LPWSTR,
  LongPointerToConstantString,
  LongPointerToConstantWideString,
  LongPointerToString,
  LongPointerToWideString,
} from '../../@types';
import { user32 } from './user32';

/**
 * @deprecated In much the same way that CharNextW is broken due to Koffi's implicit string pointer
 * conversion, CharPrevW suffers the same fate. Koffi 3.0.0 should fix this issue.
 *
 * @see {@link https://github.com/Koromix/rygel/blob/master/src/koffi/CHANGELOG.md#koffi-3}
 */
export function CharPrevW(
  start: LongPointerToConstantWideString,
  current: LongPointerToConstantWideString,
): LongPointerToWideString {
  return user32.invoke('CharPrevW', LPWSTR, [LPCWSTR, LPCWSTR], [start, current]);
}

/**
 * @deprecated In much the same way that CharNextA is broken due to Koffi's implicit string pointer
 * conversion, CharPrevA suffers the same fate. Koffi 3.0.0 should fix this issue.
 *
 * @see {@link https://github.com/Koromix/rygel/blob/master/src/koffi/CHANGELOG.md#koffi-3}
 */
export function CharPrevA(
  start: LongPointerToConstantString,
  current: LongPointerToConstantString,
): LongPointerToString {
  return user32.invoke('CharPrevA', LPSTR, [LPCSTR, LPCSTR], [start, current]);
}
