import { Kernel32 } from './kernel32/kernel32';
import { Library } from './library';
import { User32 } from './user32/user32';

const libraries: Library[] = [];

export function loadWin32Libraries() {
  libraries.push(new User32(), new Kernel32());

  for (const library of libraries) {
    library.load();
  }
}

process.on('exit', () => {
  for (const library of libraries) {
    library.unload();
  }
});
