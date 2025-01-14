import koffi from 'koffi';

import { HANDLE } from '../../@types';
import { IActivationContextW, PACTCTXW } from '../structs/activation-context';
import { kernel32 } from './kernel32';

export function CreateActCtxW(actContext: IActivationContextW) {
  return kernel32.invoke('CreateActCtxW', HANDLE, [koffi.inout(PACTCTXW)], [actContext]);
}
