import { HMENU, MenuHandle } from '../../@types';
import { user32 } from './user32';

export function CreatePopupMenu(): MenuHandle {
  return user32.invoke('CreatePopupMenu', HMENU, [], []);
}
