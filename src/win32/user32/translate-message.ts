import { BOOL, Bool } from '../../@types';
import { IMessage, LPMSG } from '../structs/message';
import { user32 } from './user32';

export function TranslateMessage(message: IMessage): Bool {
  return user32.invoke('TranslateMessage', BOOL, [LPMSG], [message]);
}
