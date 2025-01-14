import { HMODULE, LPCWSTR } from '../../@types';
import { kernel32 } from './kernel32';

export function GetModuleHandleW(moduleName: string | null): number {
  return kernel32.invoke('GetModuleHandleW', HMODULE, [LPCWSTR], [moduleName]);
}
