// export enum DataType {
//   Void = 'void',
//   Int8 = 'int8',
//   Int8_T = 'int8_t',
//   UInt8 = 'uint8',
//   UInt8_T = 'uint8_t',
//   Char = 'char',
//   UChar = 'uchar',
//   UnsignedChar = 'unsigned char',
//   Char16 = 'char16',
//   Char16_T = 'char16_t',
//   Int16 = 'int16',
//   Int16_T = 'int16_t',
//   UInt16 = 'uint16',
//   UInt16_T = 'uint16_t',
//   Short = 'short',
//   UShort = 'ushort',
//   UnsignedShort = 'unsigned short',
//   Char32 = 'char32',
//   Char32_T = 'char32_t',
//   Int32 = 'int32',
//   Int32_T = 'int32_t',
//   UInt32 = 'uint32',
//   UInt32_T = 'uint32_t',
//   Int = 'int',
//   UInt = 'uint',
//   UnsignedInt = 'unsigned int',
//   Int64 = 'int64',
//   Int64_T = 'int64_t',
//   UInt64 = 'uint64',
//   UInt64_T = 'uint64_t',
//   LongLong = 'longlong',
//   LongLongAlt = 'long long',
//   ULongLong = 'ulonglong',
//   UnsignedLongLong = 'unsigned long long',
//   Float32 = 'float32',
//   Float64 = 'float64',
//   Float = 'float',
//   Double = 'double',
//   Bool = 'bool',
//   Long = 'long',
//   ULong = 'ulong',
//   UnsignedLong = 'unsigned long',
//   IntPtr = 'intptr',
//   IntPtr_T = 'intptr_t',
//   UIntPtr = 'uintptr',
//   UIntPtr_T = 'uintptr_t',
//   WChar_T = 'wchar_t',
//   Str = 'str',
//   String = 'string',
//   Str16 = 'str16',
//   String16 = 'string16',
//   Str32 = 'str32',
//   String32 = 'string32',
//   // TODO: Figure out how Koffi converts endian-sensitive C-types to JavaScript types
//   Int16_LE = 'int16_le',
//   Int16_LE_T = 'int16_le_t',
//   Int16_BE = 'int16_be',
//   Int16_BE_T = 'int16_be_t',
//   UInt16_LE = 'uint16_le',
//   UInt16_LE_T = 'uint16_le_t',
//   UInt16_BE = 'uint16_be',
//   UInt16_BE_T = 'uint16_be_t',
//   Int32_LE = 'int32_le',
//   Int32_LE_T = 'int32_le_t',
//   Int32_BE = 'int32_be',
//   Int32_BE_T = 'int32_be_t',
//   UInt32_LE = 'uint32_le',
//   UInt32_LE_T = 'uint32_le_t',
//   UInt32_BE = 'uint32_be',
//   UInt32_BE_T = 'uint32_be_t',
//   Int64_LE = 'int64_le',
//   Int64_LE_T = 'int64_le_t',
//   Int64_BE = 'int64_be',
//   Int64_BE_T = 'int64_be_t',
//   UInt64_LE = 'uint64_le',
//   UInt64_LE_T = 'uint64_le_t',
//   UInt64_BE = 'uint64_be',
//   UInt64_BE_T = 'uint64_be_t',
// }

// export type CDataTypeToTypeScriptType<T extends DataType> =
//   // Void
//   T extends DataType.Void
//     ? void
//     : // Number types
//       T extends
//           | DataType.Int8
//           | DataType.Int8_T
//           | DataType.UInt8
//           | DataType.UInt8_T
//           | DataType.Int16
//           | DataType.Int16_T
//           | DataType.UInt16
//           | DataType.UInt16_T
//           | DataType.Int32
//           | DataType.Int32_T
//           | DataType.UInt32
//           | DataType.UInt32_T
//           | DataType.Int
//           | DataType.UInt
//           | DataType.UnsignedInt
//           | DataType.Int64
//           | DataType.Int64_T
//           | DataType.UInt64
//           | DataType.UInt64_T
//           | DataType.Short
//           | DataType.UShort
//           | DataType.UnsignedShort
//           | DataType.LongLong
//           | DataType.LongLongAlt
//           | DataType.ULongLong
//           | DataType.UnsignedLongLong
//           | DataType.Float32
//           | DataType.Float64
//           | DataType.Float
//           | DataType.Double
//           | DataType.Long
//           | DataType.ULong
//           | DataType.UnsignedLong
//           | DataType.IntPtr
//           | DataType.IntPtr_T
//           | DataType.UIntPtr
//           | DataType.UIntPtr_T
//           | DataType.WChar_T
//       ? number
//       : // String types
//         T extends
//             | DataType.Char
//             | DataType.UChar
//             | DataType.UnsignedChar
//             | DataType.Char16
//             | DataType.Char16_T
//             | DataType.Char32
//             | DataType.Char32_T
//             | DataType.Str
//             | DataType.String
//             | DataType.Str16
//             | DataType.String16
//             | DataType.Str32
//             | DataType.String32
//         ? string
//         : // Boolean type
//           T extends DataType.Bool
//           ? boolean
//           : // Fallback
//             never;
