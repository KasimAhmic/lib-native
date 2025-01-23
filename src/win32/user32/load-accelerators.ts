import {
  AcceleratorTableHandle,
  HACCEL,
  HINSTANCE,
  InstanceHandle,
  LPCWSTR,
  LongPointerToConstantWideString,
} from '../../@types';
import { user32 } from './user32';

/**
 * @deprecated Not sure if it's possible to use this function as we don't have an executable that would have
 * accelerators embedded in it. I'll leave it here for now, but the best course of action is to use
 * CreateAcceleratorTableW instead.
 */
export function LoadAcceleratorsW(
  instanceHandle: InstanceHandle,
  tableName: LongPointerToConstantWideString,
): AcceleratorTableHandle {
  return user32.invoke('LoadAcceleratorsW', HACCEL, [HINSTANCE, LPCWSTR], [instanceHandle, tableName]);
}
