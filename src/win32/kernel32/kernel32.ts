import { join } from 'node:path';

import { Library } from '../library';

export class Kernel32 extends Library {
  static readonly Name: string = 'kernel32';

  constructor() {
    super(Kernel32.Name, join('C:', 'Windows', 'System32', `${Kernel32.Name}.dll`));
  }
}
