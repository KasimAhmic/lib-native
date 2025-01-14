import koffi from 'koffi';

import { PVOID, UINT, UnsignedInt } from '../../@types';
import { user32 } from './user32';

export function SystemParametersInfoW(
  uiAction: UnsignedInt,
  uiParam: UnsignedInt,
  pvParam: Buffer,
  fWinIni: UnsignedInt,
) {
  return user32.invoke(
    'SystemParametersInfoW',
    UINT,
    [UINT, UINT, koffi.inout(PVOID), UINT],
    [uiAction, uiParam, pvParam, fWinIni],
  );
}
