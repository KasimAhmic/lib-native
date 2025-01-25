import koffi from 'koffi';

import { VOID } from '../../@types';
import { IStartupInfoA, IStartupInfoW, LPSTARTUPINFOA, LPSTARTUPINFOW } from '../structs/startup-info';
import { kernel32 } from './kernel32';

export function GetStartupInfoW(startupInfo: IStartupInfoW): void {
  return kernel32.invoke('GetStartupInfoW', VOID, [koffi.out(LPSTARTUPINFOW)], [startupInfo]);
}

export function GetStartupInfoA(startupInfo: IStartupInfoA): void {
  return kernel32.invoke('GetStartupInfoA', VOID, [koffi.out(LPSTARTUPINFOA)], [startupInfo]);
}
