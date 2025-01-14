import { LPCWSTR } from '../../@types';
import { kernel32 } from './kernel32';

export function GetCommandLineW(): string {
  return kernel32.invoke('GetCommandLineW', LPCWSTR, [], []);
}
