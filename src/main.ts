import { DataType } from 'ffi-rs';

import { Logger } from './util/logger';
import { GetCommandLineW } from './win32/kernel32/get-command-line';
import { GetModuleHandleW } from './win32/kernel32/get-module-handle';
import { GetStartupInfoW } from './win32/kernel32/get-startup-info';
import { loadWin32Libraries } from './win32/loader';
import { CreateWindowExW, ExtendedWindowStyle, WindowStyle } from './win32/user32/create-window-ex';
import { EnumWindows } from './win32/user32/enum-windows';
import { GetClientRect } from './win32/user32/get-client-rect';
import { GetWindowText } from './win32/user32/get-window-text';
import { IsWindowVisible } from './win32/user32/is-window-visible';
import { ShowWindow } from './win32/user32/show-window';

loadWin32Libraries();

const logger = new Logger('main');

async function main() {
  await EnumWindows((windowHandle) => {
    const title = GetWindowText(windowHandle);

    if (title.length > 0 && IsWindowVisible(windowHandle)) {
      const rect = GetClientRect(windowHandle);

      logger.log(title, `Width: ${rect.right}`, `Height: ${rect.bottom}`);
    }

    return false;
  });

  const hInstance = GetModuleHandleW();
  const pCmdLine = GetCommandLineW();

  const buffer = Buffer.alloc(68);
  buffer.writeUInt32LE(68, 0);

  GetStartupInfoW(buffer);

  const startupInfo = {
    wShowWindow: buffer.readUInt16LE(44),
  };
  const nCmdShow = startupInfo.wShowWindow;

  const WNDCLASS = {
    style: DataType.I32,
    lpfnWndProc: DataType.External,
    cbClsExtra: DataType.I32,
    cbWndExtra: DataType.I32,
    hInstance: DataType.I32,
    hIcon: DataType.I32,
    hCursor: DataType.I32,
    hbrBackground: DataType.I32,
    lpszMenuName: DataType.External,
    lpszClassName: DataType.External,
  };

  const windowHandle = CreateWindowExW({
    windowName: 'Hello, World!',
    width: 800,
    height: 600,
    xPosition: 100,
    yPosition: 100,
    style: WindowStyle.OVERLAPPED_WINDOW,
    extendedWindowStyle: ExtendedWindowStyle.OVERLAPPED_WINDOW,
    instance: hInstance,
    className: 'Sample Window Class\0',
  });

  const res = ShowWindow(windowHandle, nCmdShow);

  console.log({ hInstance });
  console.log({ pCmdLine });
  console.log({ nCmdShow });
  console.log({ windowHandle });
  console.log({ res });

  await new Promise((resolve) => setTimeout(resolve, 5000));
}

main();
