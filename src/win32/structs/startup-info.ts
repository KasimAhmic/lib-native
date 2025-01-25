import koffi from 'koffi';

import {
  DWORD,
  DoubleWord,
  HANDLE,
  Handle,
  LPBYTE,
  LPSTR,
  LPWSTR,
  LongPointerToByte,
  LongPointerToString,
  LongPointerToWideString,
  WORD,
  Word,
} from '../../@types';

interface IStartupInfo {
  cb: DoubleWord;
  dwX: DoubleWord;
  dwY: DoubleWord;
  dwXSize: DoubleWord;
  dwYSize: DoubleWord;
  dwXCountChars: DoubleWord;
  dwYCountChars: DoubleWord;
  dwFillAttribute: DoubleWord;
  dwFlags: DoubleWord;
  wShowWindow: Word;
  cbReserved2: Word;
  lpReserved2: LongPointerToByte;
  hStdInput: Handle;
  hStdOutput: Handle;
  hStdError: Handle;
}

class StartupInfo<T extends IStartupInfoW | IStartupInfoA> {
  cb: DoubleWord;
  lpReserved: T['lpReserved'];
  lpDesktop: T['lpDesktop'];
  lpTitle: T['lpTitle'];
  dwX: DoubleWord;
  dwY: DoubleWord;
  dwXSize: DoubleWord;
  dwYSize: DoubleWord;
  dwXCountChars: DoubleWord;
  dwYCountChars: DoubleWord;
  dwFillAttribute: DoubleWord;
  dwFlags: DoubleWord;
  wShowWindow: Word;
  cbReserved2: Word;
  lpReserved2: LongPointerToByte;
  hStdInput: Handle;
  hStdOutput: Handle;
  hStdError: Handle;

  constructor(options: Partial<T>) {
    Object.assign(this, {
      ...{
        cb: 0,
        lpReserved: null,
        lpDesktop: null,
        lpTitle: null,
        dwX: 0,
        dwY: 0,
        dwXSize: 0,
        dwYSize: 0,
        dwXCountChars: 0,
        dwYCountChars: 0,
        dwFillAttribute: 0,
        dwFlags: 0,
        wShowWindow: 0,
        cbReserved2: 0,
        lpReserved2: null,
        hStdInput: null,
        hStdOutput: null,
        hStdError: null,
      },
      ...options,
    });
  }
}

export interface IStartupInfoW extends IStartupInfo {
  lpReserved: LongPointerToWideString;
  lpDesktop: LongPointerToWideString;
  lpTitle: LongPointerToWideString;
}

export class StartupInfoW extends StartupInfo<IStartupInfoW> {
  constructor(options: Partial<IStartupInfoW>) {
    super(options);
  }
}

export interface IStartupInfoA extends IStartupInfo {
  lpReserved: LongPointerToString;
  lpDesktop: LongPointerToString;
  lpTitle: LongPointerToString;
}

export class StartupInfoA extends StartupInfo<IStartupInfoA> {
  constructor(options: Partial<IStartupInfoA>) {
    super(options);
  }
}

export const STARTUPINFOW = koffi.struct('STARTUPINFOW', {
  cb: DWORD,
  lpReserved: LPWSTR,
  lpDesktop: LPWSTR,
  lpTitle: LPWSTR,
  dwX: DWORD,
  dwY: DWORD,
  dwXSize: DWORD,
  dwYSize: DWORD,
  dwXCountChars: DWORD,
  dwYCountChars: DWORD,
  dwFillAttribute: DWORD,
  dwFlags: DWORD,
  wShowWindow: WORD,
  cbReserved2: WORD,
  lpReserved2: LPBYTE,
  hStdInput: HANDLE,
  hStdOutput: HANDLE,
  hStdError: HANDLE,
});

export const LPSTARTUPINFOW = koffi.pointer('LPSTARTUPINFOW', STARTUPINFOW);

export const STARTUPINFOA = koffi.struct('STARTUPINFOA', {
  cb: DWORD,
  lpReserved: LPSTR,
  lpDesktop: LPSTR,
  lpTitle: LPSTR,
  dwX: DWORD,
  dwY: DWORD,
  dwXSize: DWORD,
  dwYSize: DWORD,
  dwXCountChars: DWORD,
  dwYCountChars: DWORD,
  dwFillAttribute: DWORD,
  dwFlags: DWORD,
  wShowWindow: WORD,
  cbReserved2: WORD,
  lpReserved2: LPBYTE,
  hStdInput: HANDLE,
  hStdOutput: HANDLE,
  hStdError: HANDLE,
});

export const LPSTARTUPINFOA = koffi.pointer('LPSTARTUPINFOA', STARTUPINFOA);
