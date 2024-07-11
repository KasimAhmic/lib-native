import { Logger } from './util/logger';
import { loadWin32Libraries } from './win32/loader';
import { EnumWindows } from './win32/user32/enum-windows';
import { GetClientRect } from './win32/user32/get-client-rect';
import { GetForegroundWindow } from './win32/user32/get-foreground-window';
import { GetWindowTextW } from './win32/user32/get-window-text';
import { IsWindowVisible } from './win32/user32/is-window-visible';
import { SetForegroundWindow } from './win32/user32/set-forground-window';
import { SetWindowPos, WindowFlag, WindowLevel } from './win32/user32/set-window-pos';

loadWin32Libraries();

const logger = new Logger('main');

async function main() {
  await EnumWindows((windowHandle) => {
    const title = GetWindowTextW(windowHandle);

    if (title.length > 0 && IsWindowVisible(windowHandle)) {
      const rect = GetClientRect(windowHandle);

      logger.log(title, `Width: ${rect.right}`, `Height: ${rect.bottom}`);

      if (title.includes('Discord')) {
        SetForegroundWindow(windowHandle);

        const foregroundWindow = GetForegroundWindow();

        if (foregroundWindow !== windowHandle) {
          SetForegroundWindow(windowHandle);
        }

        SetWindowPos({
          windowHandle,
          insertAfter: WindowLevel.TOP,
          xPosition: 0,
          yPosition: 0,
          width: 600,
          height: 400,
          flags: WindowFlag.SHOW_WINDOW,
        });
      }
    }

    return false;
  });
}

main();
