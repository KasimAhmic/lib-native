import { GetCommandLineW } from '../kernel32/get-command-line';
import { GetModuleHandleW } from '../kernel32/get-module-handle';
import { GetStartupInfoW } from '../kernel32/get-startup-info';

export function getWinMainParams() {
  const instanceHandle = GetModuleHandleW(null);
  const previousInstanceHandle = null;
  const commandLine = GetCommandLineW();
  const showCommand = GetStartupInfoW().wShowWindow;

  return { instanceHandle, previousInstanceHandle, commandLine, showCommand };
}
