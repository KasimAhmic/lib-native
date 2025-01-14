import { DoubleWord, Handle, LongPointerToByte, LongPointerToWideString, Word } from '../../@types';

export interface IStartupInfo {
  cb: DoubleWord;
  lpReserved: LongPointerToWideString;
  lpDesktop: LongPointerToWideString;
  lpTitle: LongPointerToWideString;
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

export class StartupInfo implements IStartupInfo {
  cb: DoubleWord;
  lpReserved: LongPointerToWideString;
  lpDesktop: LongPointerToWideString;
  lpTitle: LongPointerToWideString;
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
