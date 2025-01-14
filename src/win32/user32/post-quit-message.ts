import { INT, VOID } from '../../@types';
import { user32 } from './user32';

export function PostQuitMessage(exitCode: number): void {
  user32.invoke('PostQuitMessage', VOID, [INT], [exitCode]);
}
