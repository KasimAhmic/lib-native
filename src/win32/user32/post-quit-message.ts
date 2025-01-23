import { INT, VOID, Void } from '../../@types';
import { user32 } from './user32';

export function PostQuitMessage(exitCode: number): Void {
  return user32.invoke('PostQuitMessage', VOID, [INT], [exitCode]);
}
