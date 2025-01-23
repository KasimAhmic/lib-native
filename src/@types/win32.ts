import koffi, { IKoffiCType } from 'koffi';

// TODO: Need to handle 32-bit vs 64-bit platforms. For now, we assume 64-bit.

/**
 * A nominal type is a type that is defined by its name, rather than its structure. This allows us to take
 * multiple C types that would otherwise map to the same TypeScript (JavaScript) type and treat them as
 * distinct types.
 *
 * For example, `int`, `unsigned int`, `long`, etc. are all distinct types with their own meaning and own
 * features in C, however in TypeScript they all map to `number`. By using nominal types, we can make
 * TypeScript display an error when you try to use an `Int` type in a function that expects an
 * `UnsignedInt` type for example.
 *
 * Note that there is no runtime safety to this! This is purely a compile-time check to help you catch errors
 * early. For example, if a C function expects an `unsigned int` and you pass in a positive `int` ignoring
 * the TypeScript error, it will work fine at runtime. If you however try to pass a negative `int`, you will
 * get a runtime error.
 *
 * You have been warned!
 *
 * @template T The underlying TypeScript type.
 * @template U The name of the nominal type.
 *
 * @example
 *
 * type Int = Nominal<number, 'INT'>;
 * type UnsignedInt = Nominal<number, 'UINT'>;
 *
 * function add(a: Int, b: Int): Int {
 *   return a + b;
 * }
 *
 * const one: Int = 123;
 * const two: Int = 456;
 * const three: UnsignedInt = 789;
 *
 * add(one, two); // OK
 * add(one, three); // Error
 */
export type Nominal<T, U> = T & { [Symbol.species]?: U; __jsType?: T };

export type Win32Type<T extends Nominal<unknown, unknown> | null> = IKoffiCType & {
  __jsType?: NonNullable<T>['__jsType'];
};

// Primitive types
export const BOOL: Win32Type<Bool> = koffi.alias('BOOL', 'int');
export const BYTE: Win32Type<Byte> = koffi.alias('BYTE', 'unsigned char');
export const CCHAR: Win32Type<ConstantChar> = koffi.alias('CCHAR', 'char*');
export const CHAR: Win32Type<Char> = koffi.alias('CHAR', 'char');
export const DWORD: Win32Type<DoubleWord> = koffi.alias('DWORD', 'unsigned long');
export const DWORDLONG: Win32Type<DoubleWordLong> = koffi.alias('DWORDLONG', 'uint64_t');
export const DWORD_PTR: Win32Type<DoubleWordPointer> = koffi.alias('DWORD_PTR', 'uint64_t');
export const DWORD32: Win32Type<DoubleWord32> = koffi.alias('DWORD32', 'unsigned int');
export const DWORD64: Win32Type<DoubleWord64> = koffi.alias('DWORD64', 'uint64_t');
export const FLOAT: Win32Type<Float> = koffi.alias('FLOAT', 'float');
export const HALF_PTR: Win32Type<HalfPointer> = koffi.alias('HALF_PTR', 'int');
export const INT: Win32Type<Int> = koffi.alias('INT', 'int');
export const INT_PTR: Win32Type<IntPointer> = koffi.alias('INT_PTR', 'int64_t');
export const INT8: Win32Type<Int8> = koffi.alias('INT8', 'char'); // TODO: This is defined as signed char in the Windows headers
export const INT16: Win32Type<Int16> = koffi.alias('INT16', 'short'); // TODO: This is defined as signed short in the Windows headers
export const INT32: Win32Type<Int32> = koffi.alias('INT32', 'int'); // TODO: This is defined as signed int in the Windows headers
export const INT64: Win32Type<Int64> = koffi.alias('INT64', 'int64_t');
export const LONG: Win32Type<Long> = koffi.alias('LONG', 'long');
export const LONGLONG: Win32Type<LongLong> = koffi.alias('LONGLONG', 'int64_t');
export const LONG_PTR: Win32Type<LongPointer> = koffi.alias('LONG_PTR', 'int64_t');
export const LONG32: Win32Type<Long32> = koffi.alias('LONG32', 'int'); // TODO: This is defined as signed int in the Windows headers
export const LONG64: Win32Type<Long64> = koffi.alias('LONG64', 'int64_t');
export const QWORD: Win32Type<QuadWord> = koffi.alias('QWORD', 'uint64_t');
export const SHORT: Win32Type<Short> = koffi.alias('SHORT', 'short');
export const TBYTE: Win32Type<TextByte> = koffi.alias('TBYTE', 'unsigned char');
export const TCHAR: Win32Type<TextChar> = koffi.alias('TCHAR', 'char');
export const UCHAR: Win32Type<UnsignedChar> = koffi.alias('UCHAR', 'unsigned char');
export const UHALF_PTR: Win32Type<UnsignedHalfPointer> = koffi.alias('UHALF_PTR', 'unsigned int');
export const UINT: Win32Type<UnsignedInt> = koffi.alias('UINT', 'unsigned int');
export const UINT_PTR: Win32Type<UnsignedIntPointer> = koffi.alias('UINT_PTR', 'uint64_t');
export const UINT8: Win32Type<UnsignedInt8> = koffi.alias('UINT8', 'unsigned char');
export const UINT16: Win32Type<UnsignedInt16> = koffi.alias('UINT16', 'unsigned short');
export const UINT32: Win32Type<UnsignedInt32> = koffi.alias('UINT32', 'unsigned int');
export const UINT64: Win32Type<UnsignedInt64> = koffi.alias('UINT64', 'uint64_t');
export const ULONG: Win32Type<UnsignedLong> = koffi.alias('ULONG', 'unsigned long');
export const ULONGLONG: Win32Type<UnsignedLongLong> = koffi.alias('ULONGLONG', 'uint64_t');
export const ULONG_PTR: Win32Type<UnsignedLongPointer> = koffi.alias('ULONG_PTR', 'uint64_t');
export const ULONG32: Win32Type<UnsignedLong32> = koffi.alias('ULONG32', 'unsigned int');
export const ULONG64: Win32Type<UnsignedLong64> = koffi.alias('ULONG64', 'uint64_t');
export const USHORT: Win32Type<UnsignedShort> = koffi.alias('USHORT', 'unsigned short');
export const WCHAR: Win32Type<WideChar> = koffi.alias('WCHAR', 'wchar_t');
export const WORD: Win32Type<Word> = koffi.alias('WORD', 'unsigned short');
export const VOID: Win32Type<Void> = koffi.alias('VOID', 'void');
export const PVOID: Win32Type<PointerToVoid> = koffi.alias('PVOID', 'void*');

// Derived/alias types
export const ATOM: Win32Type<Atom> = koffi.alias('ATOM', WORD);
export const BOOLEAN: Win32Type<Boolean> = koffi.alias('BOOLEAN', BYTE);
export const COLORREF: Win32Type<ColorReference> = koffi.alias('COLORREF', DWORD);
export const LANGID: Win32Type<LanguageId> = koffi.alias('LANGID', WORD);
export const LPARAM: Win32Type<LongParam> = koffi.alias('LPARAM', LONG_PTR);
export const LRESULT: Win32Type<LongResult> = koffi.alias('LRESULT', LONG_PTR);
export const WPARAM: Win32Type<WordParam> = koffi.alias('WPARAM', UINT_PTR);

// Handle types
export const HANDLE: Win32Type<Handle> = koffi.pointer('HANDLE', koffi.opaque());
export const HACCEL: Win32Type<Handle> = koffi.alias('HACCEL', HANDLE);
export const HBITMAP: Win32Type<BitmapHandle> = koffi.alias('HBITMAP', HANDLE);
export const HBRUSH: Win32Type<BrushHandle> = koffi.alias('HBRUSH', HANDLE);
export const HCOLORSPACE: Win32Type<ColorSpaceHandle> = koffi.alias('HCOLORSPACE', HANDLE);
export const HCONV: Win32Type<ConversationHandle> = koffi.alias('HCONV', HANDLE);
export const HCONVLIST: Win32Type<ConversationListHandle> = koffi.alias('HCONVLIST', HANDLE);
export const HCURSOR: Win32Type<CursorHandle> = koffi.alias('HCURSOR', HANDLE);
export const HDC: Win32Type<DeviceContextHandle> = koffi.alias('HDC', HANDLE);
export const HDDEDATA: Win32Type<DynamicDataExchangeDataHandle> = koffi.alias('HDDEDATA', HANDLE);
export const HDESK: Win32Type<DesktopHandle> = koffi.alias('HDESK', HANDLE);
export const HDROP: Win32Type<DropHandle> = koffi.alias('HDROP', HANDLE);
export const HDWP: Win32Type<DeferredWindowPositionHandle> = koffi.alias('HDWP', HANDLE);
export const HENHMETAFILE: Win32Type<EnhancedMetafileHandle> = koffi.alias('HENHMETAFILE', HANDLE);
export const HFILE: Win32Type<FileHandle> = koffi.alias('HFILE', 'int');
export const HFONT: Win32Type<FontHandle> = koffi.alias('HFONT', HANDLE);
export const HGDIOBJ: Win32Type<GDIObjectHandle> = koffi.alias('HGDIOBJ', HANDLE);
export const HGLOBAL: Win32Type<GlobalHandle> = koffi.alias('HGLOBAL', HANDLE);
export const HHOOK: Win32Type<HookHandle> = koffi.alias('HHOOK', HANDLE);
export const HICON: Win32Type<IconHandle> = koffi.alias('HICON', HANDLE);
export const HINSTANCE: Win32Type<InstanceHandle> = koffi.alias('HINSTANCE', HANDLE);
export const HKEY: Win32Type<KeyHandle> = koffi.alias('HKEY', HANDLE);
export const HKL: Win32Type<KeyboardLayoutHandle> = koffi.alias('HKL', HANDLE);
export const HLOCAL: Win32Type<LocalHandle> = koffi.alias('HLOCAL', HANDLE);
export const HMENU: Win32Type<MenuHandle> = koffi.alias('HMENU', HANDLE);
export const HMETAFILE: Win32Type<MetafileHandle> = koffi.alias('HMETAFILE', HANDLE);
export const HMODULE: Win32Type<ModuleHandle> = koffi.alias('HMODULE', HANDLE);
export const HMONITOR: Win32Type<MonitorHandle> = koffi.alias('HMONITOR', HANDLE);
export const HPALETTE: Win32Type<PaletteHandle> = koffi.alias('HPALETTE', HANDLE);
export const HPEN: Win32Type<PenHandle> = koffi.alias('HPEN', HANDLE);
export const HRESULT: Win32Type<ResultHandle> = koffi.alias('HRESULT', LONG);
export const HRGN: Win32Type<RegionHandle> = koffi.alias('HRGN', HANDLE);
export const HRSRC: Win32Type<ResourceHandle> = koffi.alias('HRSRC', HANDLE);
export const HSZ: Win32Type<DynamicDataExchangeStringHandle> = koffi.alias('HSZ', HANDLE);
export const HWINSTA: Win32Type<WindowStationHandle> = koffi.alias('HWINSTA', HANDLE);
export const HWND: Win32Type<WindowHandle> = koffi.alias('HWND', HANDLE);

// Pointer types
export const LPBOOL: Win32Type<LongPointerToBool> = koffi.pointer('LPBOOL', BOOL);
export const LPBYTE: Win32Type<LongPointerToByte> = koffi.pointer('LPBYTE', BYTE);
export const LPCOLORREF: Win32Type<LongPointerToColorReference> = koffi.pointer('LPCOLORREF', DWORD);
export const LPCSTR: Win32Type<LongPointerToConstantString> = koffi.pointer('LPCSTR', CHAR); // TODO: Might be incorrect
export const LPCWSTR: Win32Type<LongPointerToConstantWideString> = koffi.pointer('LPCWSTR', WCHAR);
export const LPCTSTR: Win32Type<LongPointerToConstantTextString> = koffi.alias('LPCTSTR', LPCWSTR);
export const LPCVOID: Win32Type<LongPointerToConstantVoid> = koffi.pointer('LPCVOID', 'const void*');
export const LPDWORD: Win32Type<LongPointerToDoubleWord> = koffi.pointer('LPDWORD', DWORD);
export const LPHANDLE: Win32Type<LongPointerToHandle> = koffi.pointer('LPHANDLE', HANDLE);
export const LPINT: Win32Type<LongPointerToInt> = koffi.pointer('LPINT', 'int');
export const LPLONG: Win32Type<LongPointerToLong> = koffi.pointer('LPLONG', 'long');
export const LPSTR: Win32Type<LongPointerToString> = koffi.pointer('LPSTR', CHAR);
export const LPWSTR: Win32Type<LongPointerToWideString> = koffi.pointer('LPWSTR', WCHAR);
export const LPTSTR: Win32Type<LongPointerToTextString> = koffi.pointer('LPTSTR', LPWSTR);
export const LPVOID: Win32Type<LongPointerToVoid> = koffi.pointer('LPVOID', PVOID);
export const LPWORD: Win32Type<LongPointerToWord> = koffi.pointer('LPWORD', WORD);

export const PULONG_PTR: Win32Type<PointerToUnsignedLongPointer> = koffi.pointer('PULONG_PTR', ULONG_PTR);
export const PUINT_PTR: Win32Type<PointerToUnsignedIntPointer> = koffi.pointer('PUINT_PTR', UINT_PTR);

export type Bool = Nominal<number, 'BOOL'>;
export type Byte = Nominal<number, 'BYTE'>;
export type ConstantChar = Nominal<string, 'CCHAR'>;
export type Char = Nominal<string, 'CHAR'>;
export type DoubleWord = Nominal<number, 'DWORD'>;
export type DoubleWordLong = Nominal<number, 'DWORDLONG'>;
export type DoubleWordPointer = Nominal<number, 'DWORD_PTR'>;
export type DoubleWord32 = Nominal<number, 'DWORD32'>;
export type DoubleWord64 = Nominal<number, 'DWORD64'>;
export type Float = Nominal<number, 'FLOAT'>;
export type HalfPointer = Nominal<number, 'HALF_PTR'>;
export type Int = Nominal<number, 'INT'>;
export type IntPointer = Nominal<number, 'INT_PTR'>;
export type Int8 = Nominal<number, 'INT8'>;
export type Int16 = Nominal<number, 'INT16'>;
export type Int32 = Nominal<number, 'INT32'>;
export type Int64 = Nominal<number, 'INT64'>;
export type Long = Nominal<number, 'LONG'>;
export type LongLong = Nominal<number, 'LONGLONG'>;
export type LongPointer = Nominal<number, 'LONG_PTR'>;
export type Long32 = Nominal<number, 'LONG32'>;
export type Long64 = Nominal<number, 'LONG64'>;
export type QuadWord = Nominal<number, 'QWORD'>;
export type Short = Nominal<number, 'SHORT'>;
export type TextByte = Nominal<number, 'TBYTE'>;
export type TextChar = Nominal<string, 'TCHAR'>;
export type UnsignedChar = Nominal<number, 'UCHAR'>;
export type UnsignedHalfPointer = Nominal<number, 'UHALF_PTR'>;
export type UnsignedInt = Nominal<number, 'UINT'>;
export type UnsignedIntPointer = Nominal<number, 'UINT_PTR'>;
export type UnsignedInt8 = Nominal<number, 'UINT8'>;
export type UnsignedInt16 = Nominal<number, 'UINT16'>;
export type UnsignedInt32 = Nominal<number, 'UINT32'>;
export type UnsignedInt64 = Nominal<number, 'UINT64'>;
export type UnsignedLong = Nominal<number, 'ULONG'>;
export type UnsignedLongLong = Nominal<number, 'ULONGLONG'>;
export type UnsignedLongPointer = Nominal<number | bigint, 'ULONG_PTR'>; // TODO: Not sure if BigInt is correct here, but it seems to work
export type UnsignedLong32 = Nominal<number, 'ULONG32'>;
export type UnsignedLong64 = Nominal<number, 'ULONG64'>;
export type UnsignedShort = Nominal<number, 'USHORT'>;
export type WideChar = Nominal<string, 'WCHAR'>;
export type Word = Nominal<number, 'WORD'>;
export type Void = Nominal<void, 'VOID'>;
export type PointerToVoid = Nominal<number, 'PVOID'>;

export type Atom = Nominal<number, 'ATOM'>;
export type Boolean = Nominal<number, 'BOOLEAN'>;
export type ColorReference = Nominal<number, 'COLORREF'>;
export type LanguageId = Nominal<number, 'LANGID'>;
export type LongParam = Nominal<number | bigint, 'LPARAM'>;
export type LongResult = Nominal<number, 'LRESULT'>;
export type WordParam = Nominal<number, 'WPARAM'>;

export type Handle = Nominal<number, 'HANDLE'>;
export type AcceleratorTableHandle = Nominal<Handle['__jsType'], 'HACCEL'>;
export type BitmapHandle = Nominal<Handle['__jsType'], 'HBITMAP'>;
export type BrushHandle = Nominal<Handle['__jsType'], 'HBRUSH'>;
export type ColorSpaceHandle = Nominal<Handle['__jsType'], 'HCOLORSPACE'>;
export type ConversationHandle = Nominal<Handle['__jsType'], 'HCONV'>;
export type ConversationListHandle = Nominal<Handle['__jsType'], 'HCONVLIST'>;
export type CursorHandle = Nominal<Handle['__jsType'], 'HCURSOR'>;
export type DeviceContextHandle = Nominal<Handle['__jsType'], 'HDC'>;
export type DynamicDataExchangeDataHandle = Nominal<Handle['__jsType'], 'HDDEDATA'>;
export type DesktopHandle = Nominal<Handle['__jsType'], 'HDESK'>;
export type DropHandle = Nominal<Handle['__jsType'], 'HDROP'>;
export type DeferredWindowPositionHandle = Nominal<Handle['__jsType'], 'HDWP'>;
export type EnhancedMetafileHandle = Nominal<Handle['__jsType'], 'HENHMETAFILE'>;
export type FileHandle = Nominal<Handle['__jsType'], 'HFILE'>;
export type FontHandle = Nominal<Handle['__jsType'], 'HFONT'>;
export type GDIObjectHandle = Nominal<Handle['__jsType'], 'HGDIOBJ'>;
export type GlobalHandle = Nominal<Handle['__jsType'], 'HGLOBAL'>;
export type HookHandle = Nominal<Handle['__jsType'], 'HHOOK'>;
export type IconHandle = Nominal<Handle['__jsType'], 'HICON'>;
export type InstanceHandle = Nominal<Handle['__jsType'], 'HINSTANCE'>;
export type KeyHandle = Nominal<Handle['__jsType'], 'HKEY'>;
export type KeyboardLayoutHandle = Nominal<Handle['__jsType'], 'HKL'>;
export type LocalHandle = Nominal<Handle['__jsType'], 'HLOCAL'>;
export type MenuHandle = Nominal<Handle['__jsType'], 'HMENU'>;
export type MetafileHandle = Nominal<Handle['__jsType'], 'HMETAFILE'>;
export type ModuleHandle = Nominal<Handle['__jsType'], 'HMODULE'>;
export type MonitorHandle = Nominal<Handle['__jsType'], 'HMONITOR'>;
export type PaletteHandle = Nominal<Handle['__jsType'], 'HPALETTE'>;
export type PenHandle = Nominal<Handle['__jsType'], 'HPEN'>;
export type ResultHandle = Nominal<Handle['__jsType'], 'HRESULT'>;
export type RegionHandle = Nominal<Handle['__jsType'], 'HRGN'>;
export type ResourceHandle = Nominal<Handle['__jsType'], 'HRSRC'>;
export type DynamicDataExchangeStringHandle = Nominal<Handle['__jsType'], 'HSZ'>;
export type WindowStationHandle = Nominal<Handle['__jsType'], 'HWINSTA'>;
export type WindowHandle = Nominal<Handle['__jsType'], 'HWND'>;

export type LongPointerToBool = Nominal<number, 'LPBOOL'>;
export type LongPointerToByte = Nominal<number, 'LPBYTE'>;
export type LongPointerToColorReference = Nominal<number, 'LPCOLORREF'>;
export type LongPointerToConstantString = Nominal<string, 'LPCSTR'> | null;
export type LongPointerToConstantWideString = Nominal<string, 'LPCWSTR'> | null;
export type LongPointerToConstantTextString = Nominal<string, 'LPCTSTR'>;
export type LongPointerToConstantVoid = Nominal<number, 'LPCVOID'>;
export type LongPointerToDoubleWord = Nominal<number, 'LPDWORD'>;
export type LongPointerToHandle = Nominal<number, 'LPHANDLE'>;
export type LongPointerToInt = Nominal<number, 'LPINT'>;
export type LongPointerToLong = Nominal<number, 'LPLONG'>;
export type LongPointerToString = Nominal<string, 'LPSTR'>;
export type LongPointerToWideString = Nominal<string, 'LPWSTR'>;
export type LongPointerToTextString = Nominal<string, 'LPTSTR'>;
export type LongPointerToVoid = Nominal<number, 'LPVOID'>;
export type LongPointerToWord = Nominal<number, 'LPWORD'>;

export type PointerToUnsignedLongPointer = Nominal<number | bigint, 'PULONG_PTR'>;
export type PointerToUnsignedIntPointer = Nominal<number, 'PUINT_PTR'>;

/**
 * Technically, the argument types should be the proper Win32Types, but for the sake of simplicity, we use
 * `number` here.
 */
export type WindowProcedure = Nominal<
  (windowHandle: number, message: number, wParam: number, lParam: number) => LongResult,
  'WNDPROC'
>;

// TODO: Move structs to dedicated files and convert them to classes

export const WNDENUMPROC = koffi.proto('__stdcall', 'WNDENUMPROC', BOOL, [HWND, LPARAM]);
export const WNDPROC = koffi.pointer(
  'WNDPROC',
  koffi.proto('__wndproc', LRESULT, [HWND, UINT, WPARAM, LPARAM]),
);

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
