import { join } from 'node:path';

import { Library } from '../library';

export class Gdi32 extends Library {
  static readonly Name: string = 'gdi32';

  constructor() {
    super(Gdi32.Name, join('C:', 'Windows', 'System32', `${Gdi32.Name}.dll`));
  }
}

export const gdi32 = new Gdi32();
