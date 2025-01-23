import { AcceleratorTableHandle, HACCEL, INT } from '../../@types';
import { IAccelerator, LPACCEL } from '../structs/accelerator';
import { user32 } from './user32';

export function CreateAcceleratorTableW(accelerators: IAccelerator[], count: number): AcceleratorTableHandle {
  return user32.invoke('CreateAcceleratorTableW', HACCEL, [LPACCEL, INT], [accelerators, count]);
}

export function CreateAcceleratorTableA(accelerators: IAccelerator[], count: number): AcceleratorTableHandle {
  return user32.invoke('CreateAcceleratorTableA', HACCEL, [LPACCEL, INT], [accelerators, count]);
}
