import koffi from 'koffi';

import {
  DWORD,
  DoubleWord,
  HMODULE,
  LANGID,
  LPCSTR,
  LPCWSTR,
  LanguageId,
  LongPointerToConstantString,
  LongPointerToConstantWideString,
  ModuleHandle,
  ULONG,
  USHORT,
  UnsignedLong,
  UnsignedShort,
} from '../../@types';

export enum ActivationContextFlag {
  PROCESSOR_ARCHITECTURE_VALID = 0x001,
  LANGID_VALID = 0x002,
  ASSEMBLY_DIRECTORY_VALID = 0x004,
  RESOURCE_NAME_VALID = 0x008,
  SET_PROCESS_DEFAULT = 0x010,
  APPLICATION_NAME_VALID = 0x020,
  HMODULE_VALID = 0x080,
}

class ActivationContext<T extends IActivationContextA | IActivationContextW> {
  cbSize: UnsignedLong;
  dwFlags: DoubleWord;
  lpSource: T['lpSource'];
  wProcessorArchitecture: UnsignedShort;
  wLangId: LanguageId;
  lpAssemblyDirectory: T['lpAssemblyDirectory'];
  lpResourceName: T['lpResourceName'];
  lpApplicationName: T['lpApplicationName'];
  hModule: ModuleHandle;

  constructor(options: Partial<Omit<T, 'cbSize'>>) {
    Object.assign(this, {
      ...{
        dwFlags: 0,
        lpSource: null,
        wProcessorArchitecture: 0,
        wLangId: 0,
        lpAssemblyDirectory: null,
        lpResourceName: null,
        lpApplicationName: null,
        hModule: 0,
      },
      ...options,
    });

    this.cbSize = koffi.sizeof(ACTCTXW);

    if (this.lpSource) {
      this.dwFlags |= 0x000;
    }

    if (this.wProcessorArchitecture) {
      this.dwFlags |= ActivationContextFlag.PROCESSOR_ARCHITECTURE_VALID;
    }

    if (this.wLangId) {
      this.dwFlags |= ActivationContextFlag.LANGID_VALID;
    }

    if (this.lpAssemblyDirectory) {
      this.dwFlags |= ActivationContextFlag.ASSEMBLY_DIRECTORY_VALID;
    }

    if (this.lpResourceName) {
      this.dwFlags |= ActivationContextFlag.RESOURCE_NAME_VALID;
    }

    if (this.lpApplicationName) {
      this.dwFlags |= ActivationContextFlag.APPLICATION_NAME_VALID;
    }

    if (this.hModule) {
      this.dwFlags |= ActivationContextFlag.HMODULE_VALID;
    }
  }
}

export interface IActivationContextW {
  cbSize: UnsignedLong;
  dwFlags: DoubleWord;
  lpSource: LongPointerToConstantWideString;
  wProcessorArchitecture: UnsignedShort;
  wLangId: LanguageId;
  lpAssemblyDirectory: LongPointerToConstantWideString;
  lpResourceName: LongPointerToConstantWideString;
  lpApplicationName: LongPointerToConstantWideString;
  hModule: ModuleHandle;
}

export class ActivationContextW extends ActivationContext<IActivationContextW> {
  constructor(options: Partial<Omit<IActivationContextW, 'cbSize'>> = {}) {
    super(options);
  }
}

export interface IActivationContextA {
  cbSize: UnsignedLong;
  dwFlags: DoubleWord;
  lpSource: LongPointerToConstantString;
  wProcessorArchitecture: UnsignedShort;
  wLangId: LanguageId;
  lpAssemblyDirectory: LongPointerToConstantString;
  lpResourceName: LongPointerToConstantString;
  lpApplicationName: LongPointerToConstantString;
  hModule: ModuleHandle;
}

export class ActivationContextA extends ActivationContext<IActivationContextA> {
  constructor(options: Partial<Omit<IActivationContextA, 'cbSize'>> = {}) {
    super(options);
  }
}

export const ACTCTXW = koffi.struct('ACTCTXW', {
  cbSize: ULONG,
  dwFlags: DWORD,
  lpSource: LPCWSTR,
  wProcessorArchitecture: USHORT,
  wLangId: LANGID,
  lpAssemblyDirectory: LPCWSTR,
  lpResourceName: LPCWSTR,
  lpApplicationName: LPCWSTR,
  hModule: HMODULE,
});

export const PACTCTXW = koffi.pointer('PACTCTXW', ACTCTXW);

export const ACTCTXA = koffi.struct('ACTCTXA', {
  cbSize: ULONG,
  dwFlags: DWORD,
  lpSource: LPCSTR,
  wProcessorArchitecture: USHORT,
  wLangId: LANGID,
  lpAssemblyDirectory: LPCSTR,
  lpResourceName: LPCSTR,
  lpApplicationName: LPCSTR,
  hModule: HMODULE,
});

export const PACTCTXA = koffi.pointer('PACTCTXA', ACTCTXA);
