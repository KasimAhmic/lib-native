import koffi from 'koffi';

import { LPARAM } from '../@types';

export function wideStringToLongParam(string: string): bigint {
  const buffer = Buffer.from(string + '\0', 'utf16le');
  const size = buffer.length / 2;
  const pointer = koffi.alloc(LPARAM, size);

  koffi.encode(pointer, 0, LPARAM, buffer, size);

  return koffi.address(pointer);
}

export function stringToLParam(string: string): bigint {
  const buffer = Buffer.from(string + '\0', 'utf8');
  const pointer = koffi.alloc(LPARAM, buffer.length);

  koffi.encode(pointer, 0, LPARAM, buffer);

  return koffi.address(pointer);
}

export function int32ArrayToLongParam(array: number[]) {
  const buffer = Buffer.alloc(array.length * 4);

  for (let i = 0; i < array.length; i++) {
    buffer.writeInt32LE(array[i], i * 4);
  }

  const pointer = koffi.alloc(LPARAM, buffer.length);

  koffi.encode(pointer, 0, LPARAM, buffer, buffer.length);

  return koffi.address(pointer);
}

export function stringToAnsiBuffer(string: string): Buffer {
  return Buffer.from(string, 'latin1');
}

export function ansiBufferToString(buffer: Buffer): string {
  return buffer.toString('latin1');
}

export function stringToUnicodeBuffer(string: string): Buffer {
  return Buffer.from(string, 'utf16le');
}

export function unicodeBufferToString(buffer: Buffer): string {
  return buffer.toString('utf16le');
}
