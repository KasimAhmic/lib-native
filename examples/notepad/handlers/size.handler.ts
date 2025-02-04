import { highWord, int32ArrayToLongParam, lowWord } from '@ahmic/lib-native';
import { MoveWindow } from '@ahmic/lib-native/win32/user32/move-window';
import { Control, SendMessageW } from '@ahmic/lib-native/win32/user32/send-message';
import { SetWindowPos, WindowFlag } from '@ahmic/lib-native/win32/user32/set-window-pos';

import { state } from '../state';
import { getStatusBarParts } from './window-create.handler';

export function handleSize(longParam: number): number {
  const width = lowWord(longParam);
  const height = highWord(longParam);
  const parts = getStatusBarParts(width);

  MoveWindow(state.handles.editHandle, 0, 0, width, height - 23, 1);

  SetWindowPos(state.handles.statusBarHandle, null, 0, height - 20, width, 20, WindowFlag.NO_MOVE);

  SendMessageW(
    state.handles.statusBarHandle,
    Control.SB_SETPARTS,
    parts.length,
    int32ArrayToLongParam(parts),
  );

  return 0;
}
