# Contribution Guidelines

## Implementing New Functions

When implementing new functions from the Win32 API, you should first look at the [official documentation](https://learn.microsoft.com/en-us/windows/win32/apiindex/windows-api-list) to understand the function's purpose, parameters, and return values. Once you have a clear understanding, you can follow these steps to implement the function. We're going to use the `GetMessage` functions as an example.

The `GetMessage` functions are defined as follows:

```c
BOOL GetMessageA(
  [out]          LPMSG lpMsg,
  [in, optional] HWND  hWnd,
  [in]           UINT  wMsgFilterMin,
  [in]           UINT  wMsgFilterMax
);

BOOL GetMessageW(
  [out]          LPMSG lpMsg,
  [in, optional] HWND  hWnd,
  [in]           UINT  wMsgFilterMin,
  [in]           UINT  wMsgFilterMax
);
```

Create a new file using the kebab-case naming convention, e.g., `get-message.ts`

Next, create and export the wrapper function using the the same PascalCase naming convention used in the Win32 API, e.g., `GetMessage`

```typescript
import koffi from 'koffi';

import { BOOL, Bool, HWND, UINT, UnsignedInt, WindowHandle } from '../../@types';
import { IMessage, LPMSG } from '../structs/message';
import { user32 } from './user32';

export function GetMessageW(
  message: IMessage,
  windowHandle: WindowHandle | null,
  filterMin: UnsignedInt,
  filterMax: UnsignedInt,
): Bool {
  return user32.invoke(
    'GetMessageW',
    BOOL,
    [koffi.out(LPMSG), HWND, UINT, UINT],
    [message, windowHandle, filterMin, filterMax],
  );
}

export function GetMessageA(
  message: IMessage,
  windowHandle: WindowHandle | null,
  filterMin: UnsignedInt,
  filterMax: UnsignedInt,
): Bool {
  return user32.invoke(
    'GetMessageA',
    BOOL,
    [koffi.out(LPMSG), HWND, UINT, UINT],
    [message, windowHandle, filterMin, filterMax],
  );
}
```

Some notes on the code above:

1. The types used in the function signature are custom nominal types that serve as a TypeScript representation of the native C-types. You can find the full list of nominal types in the `src/@types/win32.ts` file.
2. When you have a parameter that is optional, you define that parameter as `SomeType | null` in the function signature.
3. When you have an argument that is marked as `out` in the C signature, you need to use the `koffi.out` function to mark that parameter as an output parameter.
4. Win32 function parameters are usually named using the Hungarian notation. You can use the original parameter names as a reference, but you should use more descriptive names in the TypeScript function signature. For example, `hWnd` becomes `windowHandle`, `wMsgFilterMin` becomes `filterMin`, and so on.
5. If the function you are implementing has a corresponding `A` and `W` version, you should implement both versions in the same file.
6. Your function should match the return type of the original function. Avoid handling the return value in the wrapper function. Instead, leave that to the caller.
7. If your function utilizes structs, the structs should go into the `src/structs` directory.

## Implementing New Structs

TODO: Write this
