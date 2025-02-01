/**
 * See the documentation for CharLower(W/A) for my gripes with these functions.
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

export function CharUpperW(character: string): string {
  if (character.length === 1) {
    const inputCharCode = character.charCodeAt(0);

    const outputCharCode = user32.invoke('CharUpperW', WORD, [WORD], [inputCharCode], 'CharUpperWChar');

    return String.fromCharCode(outputCharCode);
  } else {
    const buffer = stringToUnicodeBuffer(character);

    user32.invoke('CharUpperW', LPWSTR, [koffi.inout(LPWSTR)], [buffer], 'CharUpperWString');

    return unicodeBufferToString(buffer);
  }
}

export function CharUpperA(character: string): string {
  if (character.length === 1) {
    const inputCharCode = character.charCodeAt(0) & 0xff;

    const outputCharCode = user32.invoke('CharUpperA', WORD, [WORD], [inputCharCode], 'CharUpperAChar');

    return String.fromCharCode(outputCharCode);
  } else {
    const buffer = stringToAnsiBuffer(character);

    user32.invoke('CharUpperA', LPSTR, [koffi.inout(LPSTR)], [buffer], 'CharUpperAString');

    return ansiBufferToString(buffer);
  }
}
