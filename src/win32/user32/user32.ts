import { join } from 'node:path';

import { Library } from '../library';

export class User32 extends Library {
  static readonly Name: string = 'user32';

  constructor() {
    super(User32.Name, join('C:', 'Windows', 'System32', `${User32.Name}.dll`));
  }
}
