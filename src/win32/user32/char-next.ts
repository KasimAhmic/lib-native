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
 * @deprecated CharNextW returns a pointer to a string but Koffi implicitly converts it to a string. This
 * causes the lib-native implementation to return the rest of the string after the first character. Koffi
 * 3.0.0 removes this implicit conversion so hopefully that will fix the issue.
 *
 * @see {@link https://github.com/Koromix/rygel/blob/master/src/koffi/CHANGELOG.md#koffi-3}
 */
export function CharNextW(value: LongPointerToConstantWideString): LongPointerToWideString {
  return user32.invoke('CharNextW', LPWSTR, [LPCWSTR], [value]);
}

/**
 * @deprecated CharNextA returns a pointer to a string but Koffi implicitly converts it to a string. This
 * causes the lib-native implementation to return the rest of the string after the first character. Koffi
 * 3.0.0 removes this implicit conversion so hopefully that will fix the issue.
 *
 * @see {@link https://github.com/Koromix/rygel/blob/master/src/koffi/CHANGELOG.md#koffi-3}
 */
export function CharNextA(value: LongPointerToConstantString): LongPointerToString {
  return user32.invoke('CharNextA', LPSTR, [LPCSTR], [value]);
}
