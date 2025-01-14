import { HICON, HINSTANCE, InstanceHandle, LPCWSTR } from '../../@types';
import { user32 } from './user32';

export enum Icon {
  IDI_APPLICATION = 32512,
  IDI_HAND = 32513,
  IDI_QUESTION = 32514,
  IDI_EXCLAMATION = 32515,
  IDI_ASTERISK = 32516,
  IDI_WINLOGO = 32517,
  IDI_SHIELD = 32518,
  IDI_WARNING = IDI_EXCLAMATION,
  IDI_ERROR = IDI_HAND,
  IDI_INFORMATION = IDI_ASTERISK,
}

export function LoadIconW(instanceHandle: InstanceHandle, iconName: Icon): number {
  return user32.invoke('LoadIconW', HICON, [HINSTANCE, LPCWSTR], [instanceHandle, iconName]);
}
