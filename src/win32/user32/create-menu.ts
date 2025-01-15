import { HMENU, MenuHandle } from '../../@types';
import { user32 } from './user32';

export function CreateMenu(): MenuHandle {
  return user32.invoke('CreateMenu', HMENU, [], []);
}
