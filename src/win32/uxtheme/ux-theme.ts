import { join } from 'node:path';

import { Library } from '../library';

export class UxTheme extends Library {
  static readonly Name: string = 'UxTheme';

  constructor() {
    super(UxTheme.Name, join('C:', 'Windows', 'System32', `${UxTheme.Name}.dll`));
  }
}

export const uxTheme = new UxTheme();
