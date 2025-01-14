import { join } from 'node:path';

import { Library } from '../library';

export class ComCtl32 extends Library {
  static readonly Name: string = 'Comctl32';

  constructor() {
    super(ComCtl32.Name, join('C:', 'Windows', 'System32', `${ComCtl32.Name}.dll`));
  }
}

export const comctl32 = new ComCtl32();
