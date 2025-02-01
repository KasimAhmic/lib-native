/**
 * Unsure how I feel about this one. The goal of lib-native is to map the Win32 API to TypeScript as closely
 * as possible but this function has two different "modes" for lack of a better term. The first mode is to
 * convert a single character to lowercase and the second mode is to convert an entire string to lowercase.
 * I _could_ make the end user handle the argument type setup themselves (i.e. pass character code for
 * single, buffer for string) but I won't be able to match the Win32 API exactly. Not sure if that matters
 * really, but it's something to think about. For now, I'll handle all of the conversions and logic in the
 * function and leave it as a basic input/output function.
 *
 */
import koffi from 'koffi';

import { LPSTR, LPWSTR, WORD } from '../../@types';
import {
  ansiBufferToString,
  stringToAnsiBuffer,
  stringToUnicodeBuffer,
  unicodeBufferToString,
} from '../../util/type.util';
import { user32 } from './user32';

export function CharLowerW(character: string): string {
  if (character.length === 1) {
    const inputCharCode = character.charCodeAt(0);

    const outputCharCode = user32.invoke('CharLowerW', WORD, [WORD], [inputCharCode], 'CharLowerWChar');

    return String.fromCharCode(outputCharCode);
  } else {
    const buffer = stringToUnicodeBuffer(character);

    user32.invoke('CharLowerW', LPWSTR, [koffi.inout(LPWSTR)], [buffer], 'CharLowerWString');

    return unicodeBufferToString(buffer);
  }
}

export function CharLowerA(character: string): string {
  if (character.length === 1) {
    const inputCharCode = character.charCodeAt(0) & 0xff;

    const outputCharCode = user32.invoke('CharLowerA', WORD, [WORD], [inputCharCode], 'CharLowerAChar');

    return String.fromCharCode(outputCharCode);
  } else {
    const buffer = stringToAnsiBuffer(character);

    user32.invoke('CharLowerA', LPSTR, [koffi.inout(LPSTR)], [buffer], 'CharLowerAString');

    return ansiBufferToString(buffer);
  }
}
