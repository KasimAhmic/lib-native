import { highWord, lowWord } from '../../../util/number.util';
import { int32ArrayToLongParam } from '../../../util/type.util';
import { Control, SendMessageW } from '../../../win32/user32/send-message';
import { SetWindowPos } from '../../../win32/user32/set-window-pos';
import { state } from '../state';
import { getStatusBarParts } from './window-create.handler';

export function handleSize(longParam: number): number {
  const width = lowWord(longParam);
  const height = highWord(longParam);
  const parts = getStatusBarParts(width);

  SetWindowPos({
    windowHandle: state.handles.editHandle,
    x: 0,
    y: 0,
    width: width,
    height: height - 23,
    flags: 0x0040 | 0x0020,
  });

  SetWindowPos({
    windowHandle: state.handles.statusBarHandle,
    x: 0,
    y: height - 20,
    width: width,
    height: 20,
    flags: 0x0002,
  });

  SendMessageW(
    state.handles.statusBarHandle,
    Control.SB_SETPARTS,
    parts.length,
    int32ArrayToLongParam(parts),
  );

  return 0;
}
