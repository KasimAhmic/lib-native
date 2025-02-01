# lib-native

lib-native aims to provide a 1 to 1 map of the Win32 API in JavaScript. This is done by leveraging the Koffi library whcih provides a Foreign Function Interface (FFI) for JavaScript, allowing us to call into the Win32 API directly.

## What about other operating systems?

While lib-native is currently focussed on the Win32 API, I'm not against adding mappings for other operating systems as well. I happen to currently be using Windows so that's what I'm starting with. If you would like to see support for Linux or macOS, please don't hesitate to open a PR!

## How do I use it?

You simply import the functions you want to use, and you call them in much the same way you would in C. Some special care needs to be taken when moving values between JavaScript and C but besides that, it's largely the same experience.

```c++
#include <windows.h>
#include <stdio.h>

HWND windowHandle = GetForegroundWindow();
RECT rect = {};

GetClientRect(windowHandle, &rect);

printf("RECT { left: %ld, top: %ld, right: %ld, bottom: %ld }\n",
       rect.left, rect.top, rect.right, rect.bottom);
```

```typescript
import { GetClientRect, GetForegroundWindow, Rect, user32 } from '@ahmic/lib-native/win32';

user32.load(); // You must load the library before you can use it

const windowHandle = GetForegroundWindow();
const rect = new Rect();

GetClientRect(windowHandle, rect);

console.log(rect); // Rect { top: 0, left: 0, right: 763, bottom: 557 }
```

## Example Usages

You can find examples in the `/examples` directory.

| Application      | Location                                     | Command                    |
| ---------------- | -------------------------------------------- | -------------------------- |
| Notepad (WIP)    | [examples/notepad](./examples/notepad)       | `npm run start:notepad`    |
| Calculator (WIP) | [examples/calculator](./examples/calculator) | `npm run start:calculator` |
