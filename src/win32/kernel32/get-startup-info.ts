import koffi from 'koffi';

import { LPSTARTUPINFO, VOID } from '../../@types';
import { IStartupInfo, StartupInfo } from '../structs/startup-info';
import { kernel32 } from './kernel32';

export function GetStartupInfoW(): IStartupInfo {
  const startupInfo = new StartupInfo();

  kernel32.invoke('GetStartupInfoW', VOID, [koffi.out(LPSTARTUPINFO)], [startupInfo]);

  return startupInfo;
}
