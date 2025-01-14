import { INT } from '../../@types';
import { kernel32 } from './kernel32';

export function GetLastError(): number {
  return kernel32.invoke('GetLastError', INT, [], []);
}
