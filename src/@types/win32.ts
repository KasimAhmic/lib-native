import koffi from 'koffi';

export const VOID = koffi.alias('VOID', 'void');
export const PVOID = koffi.alias('PVOID', 'void*');
export const ATOM = koffi.alias('ATOM', 'uint16_t');
export const WORD = koffi.alias('WORD', 'uint16_t');
export const DWORD = koffi.alias('DWORD', 'uint32_t');
export const BYTE = koffi.alias('BYTE', 'unsigned char');
export const WCHAR = koffi.alias('WCHAR', 'char16_t');
export const CHAR = koffi.alias('CHAR', 'char');
export const LONG = koffi.alias('LONG', 'long');
export const ULONG = koffi.alias('ULONG', 'unsigned long');
export const INT = koffi.alias('INT', 'int');
export const UINT = koffi.alias('UINT', 'uint32_t');
export const BOOL = koffi.alias('BOOL', 'int');
export const SHORT = koffi.alias('SHORT', 'int16_t');
export const USHORT = koffi.alias('USHORT', 'uint16_t');
export const WPARAM = koffi.alias('WPARAM', 'uintptr_t');
export const LPARAM = koffi.alias('LPARAM', 'intptr_t');
export const LRESULT = koffi.alias('LRESULT', 'intptr_t');
export const LANGID = koffi.alias('LANGID', 'uint16_t');
export const ULONG_PTR = koffi.alias('ULONG_PTR', 'uintptr_t');

export type Void = void;
export type Atom = number;
export type Word = number;
export type DoubleWord = number;
export type Byte = number;
export type WideChar = number;
export type Char = number;
export type SmartCardContext = number;
export type SmartCardHandle = number;
export type Long = number;
export type UnsignedLong = number;
export type Int = number;
export type UnsignedInt = number;
export type Bool = number;
export type Short = number;
export type UnsignedShort = number;
export type WordParam = number;
export type LongParam = number;
export type LongResult = number;
export type LanguageId = number;
export type UnsignedLongPointer = number;

export const HANDLE = koffi.pointer('HANDLE', koffi.opaque());
export const HWND = koffi.alias('HWND', HANDLE);
export const HINSTANCE = koffi.alias('HINSTANCE', HANDLE);
export const HMENU = koffi.alias('HMENU', HANDLE);
export const HICON = koffi.alias('HICON', HANDLE);
export const HCURSOR = koffi.alias('HCURSOR', HANDLE);
export const HBRUSH = koffi.alias('HBRUSH', HANDLE);
export const HMODULE = koffi.alias('HMODULE', HANDLE);
export const HRESULT = koffi.alias('HRESULT', 'long');

export type Handle = number;
export type WindowHandle = Handle;
export type InstanceHandle = Handle;
export type MenuHandle = Handle;
export type IconHandle = Handle;
export type CursorHandle = Handle;
export type BrushHandle = Handle;
export type ModuleHandle = Handle;

export const LPVOID = koffi.pointer('LPVOID', PVOID);
export const LPHANDLE = koffi.pointer('LPHANDLE', HANDLE);
export const LPDWORD = koffi.pointer('LPDWORD', DWORD);
export const LPTSTR = koffi.pointer('LPTSTR', WCHAR);
export const LPBYTE = koffi.pointer('LPBYTE', BYTE);
export const LPCVOID = koffi.pointer('LPCVOID', VOID);
export const LPCBYTE = koffi.pointer('LPCBYTE', 'const unsigned char*');
export const LPCWSTR = koffi.pointer('LPCWSTR', WCHAR);
export const LPCTSTR = koffi.alias('LPCTSTR', LPCWSTR);
export const LPCSTR = koffi.pointer('LPCSTR', CHAR);
export const LPWSTR = koffi.pointer('LPWSTR', WCHAR);
export const LPSTR = koffi.pointer('LPSTR', CHAR);

export const PULONG_PTR = koffi.pointer('PULONG_PTR', ULONG_PTR);

export type LongPointerToVoid = number;
export type LongPointerToHandle = number;
export type LongPointerToDoubleWord = number;
export type LongPointerToTextString = string;
export type LongPointerToByte = number;
export type LongPointerToConstantVoid = number;
export type LongPointerToConstantByte = number;
export type LongPointerToConstantWideString = string | null;
export type LongPointerToConstantTextString = string;
export type LongPointerToConstantString = string | null;
export type LongPointerToWideString = string;
export type LongPointerToString = string;

export const WNDENUMPROC = koffi.proto('__stdcall', 'WNDENUMPROC', BOOL, [HWND, LPARAM]);
export const WNDPROC = koffi.pointer(
  'WNDPROC',
  koffi.proto('__wndproc', LRESULT, [HWND, UINT, WPARAM, LPARAM]),
);

export const POINT = koffi.struct('POINT', {
  x: LONG,
  y: LONG,
});
export const LPPOINT = koffi.pointer('LPPOINT', POINT);

export const RECT = koffi.struct('RECT', {
  left: LONG,
  top: LONG,
  right: LONG,
  bottom: LONG,
});
export const LPRECT = koffi.pointer('LPRECT', RECT);

export const STARTUPINFO = koffi.struct('STARTUPINFO', {
  cb: DWORD,
  lpReserved: LPWSTR,
  lpDesktop: LPWSTR,
  lpTitle: LPWSTR,
  dwX: DWORD,
  dwY: DWORD,
  dwXSize: DWORD,
  dwYSize: DWORD,
  dwXCountChars: DWORD,
  dwYCountChars: DWORD,
  dwFillAttribute: DWORD,
  dwFlags: DWORD,
  wShowWindow: WORD,
  cbReserved2: WORD,
  lpReserved2: LPBYTE,
  hStdInput: HANDLE,
  hStdOutput: HANDLE,
  hStdError: HANDLE,
});
export const LPSTARTUPINFO = koffi.pointer('LPSTARTUPINFO', STARTUPINFO);

export const WNDCLASSEXW = koffi.struct('WNDCLASSEXW', {
  cbSize: UINT,
  style: UINT,
  lpfnWndProc: WNDPROC,
  cbClsExtra: INT,
  cbWndExtra: INT,
  hInstance: HINSTANCE,
  hIcon: HICON,
  hCursor: HCURSOR,
  hbrBackground: HBRUSH,
  lpszMenuName: LPCTSTR,
  lpszClassName: LPCTSTR,
  hIconSm: HICON,
});

export const MSG = koffi.struct('MSG', {
  hwnd: HWND,
  message: UINT,
  wParam: WPARAM,
  lParam: LPARAM,
  time: DWORD,
  pt: POINT,
});
export const LPMSG = koffi.pointer('LPMSG', MSG);

export const INITCOMMONCONTROLSEX = koffi.struct('INITCOMMONCONTROLSEX', {
  dwSize: DWORD,
  dwICC: DWORD,
});
export const LPINITCOMMONCONTROLSEX = koffi.pointer('LPINITCOMMONCONTROLSEX', INITCOMMONCONTROLSEX);
