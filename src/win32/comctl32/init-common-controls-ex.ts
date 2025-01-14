import koffi from 'koffi';

import { BOOL, INITCOMMONCONTROLSEX, LPINITCOMMONCONTROLSEX } from '../../@types';
import { IInitCommonControlsEx, InitCommonControlsExStruct } from '../structs/init-common-controls-ex';
import { comctl32 } from './comctl32';

export function InitCommonControlsEx(styles: IInitCommonControlsEx['dwICC']): boolean {
  const initCommonControlsEx = new InitCommonControlsExStruct();

  initCommonControlsEx.dwSize = koffi.sizeof(INITCOMMONCONTROLSEX);
  initCommonControlsEx.dwICC = styles;

  return (
    comctl32.invoke('InitCommonControlsEx', BOOL, [LPINITCOMMONCONTROLSEX], [initCommonControlsEx]) === 1
  );
}
