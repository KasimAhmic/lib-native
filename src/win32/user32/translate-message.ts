import { BOOL, LPMSG } from '../../@types';
import { IMessage } from '../structs/message';
import { user32 } from './user32';

export function TranslateMessage(message: IMessage): number {
  return user32.invoke('TranslateMessage', BOOL, [LPMSG], [message]);
}
