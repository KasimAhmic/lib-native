import { BOOL } from '../../@types';
import { IInitCommonControlsEx, LPINITCOMMONCONTROLSEX } from '../structs/init-common-controls-ex';
import { comctl32 } from './comctl32';

export function InitCommonControlsEx(initCommonControlsEx: IInitCommonControlsEx): number {
  return comctl32.invoke('InitCommonControlsEx', BOOL, [LPINITCOMMONCONTROLSEX], [initCommonControlsEx]);
}
