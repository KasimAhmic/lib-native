/**
 * Returns the higher 16 bits of a number.
 *
 * @param x A 32-bit number.
 *
 * @example
 *
 * highWord(0x12345678); // 0x1234
 */
export function highWord(x: number): number {
  return (x >> 16) & 0xffff;
}

/**
 * Returns the lower 16 bits of a number.
 *
 * @param x A 32-bit number.
 *
 * @example
 *
 * lowWord(0x12345678); // 0x5678
 */
export function lowWord(x: number): number {
  return x & 0xffff;
}
