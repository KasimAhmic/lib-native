const numberFormatter = new Intl.NumberFormat('en-US', { style: 'decimal', useGrouping: true });

const yellow = '\x1b[33m';
const boldGreen = '\x1b[1;32m';
const boldRed = '\x1b[1;31m';
const reset = '\x1b[0m';

const numbers = [
  0x00000001, 0x00000002, 0x00000004, 0x00000008, 0x00000010, 0x00000020, 0x00000040, 0x00000080, 0x00000100,
  0x00000200, 0x00000400, 0x00000800, 0x00001000, 0x00002000, 0x00004000, 0x00008000, 0x00010000, 0x00020000,
  0x00040000, 0x00080000, 0x00100000, 0x00200000, 0x00400000, 0x00800000, 0x01000000, 0x02000000, 0x04000000,
  0x08000000, 0x10000000, 0x20000000, 0x40000000, 0x80000000,
];

function decimalToHex(decimal: number) {
  return decimal
    .toString(16)
    .toLowerCase()
    .padStart(8, '0')
    .replace(/.{2}/g, '$& ')
    .replace(/[1-9A-F]/g, boldRed + '$&' + reset)
    .trimEnd();
}

function decimalToBinary(decimal: number) {
  return decimal
    .toString(2)
    .padStart(32, '0')
    .match(/.{4}/g)!
    .join(' ')
    .replace(/1/g, boldRed + '1' + reset);
}

/**
 * Prints a chart of numbers in decimal, hexadecimal, and binary format.
 *
 * @example
 *             1 | 00 00 00 01  | 0000 0000 0000 0000 0000 0000 0000 0001
 *             2 | 00 00 00 02  | 0000 0000 0000 0000 0000 0000 0000 0010
 *             4 | 00 00 00 04  | 0000 0000 0000 0000 0000 0000 0000 0100
 *             8 | 00 00 00 08  | 0000 0000 0000 0000 0000 0000 0000 1000
 *            16 | 00 00 00 10  | 0000 0000 0000 0000 0000 0000 0001 0000
 *            32 | 00 00 00 20  | 0000 0000 0000 0000 0000 0000 0010 0000
 *            64 | 00 00 00 40  | 0000 0000 0000 0000 0000 0000 0100 0000
 *           128 | 00 00 00 80  | 0000 0000 0000 0000 0000 0000 1000 0000
 *           256 | 00 00 01 00  | 0000 0000 0000 0000 0000 0001 0000 0000
 *           512 | 00 00 02 00  | 0000 0000 0000 0000 0000 0010 0000 0000
 *         1,024 | 00 00 04 00  | 0000 0000 0000 0000 0000 0100 0000 0000
 *         2,048 | 00 00 08 00  | 0000 0000 0000 0000 0000 1000 0000 0000
 *         4,096 | 00 00 10 00  | 0000 0000 0000 0000 0001 0000 0000 0000
 *         8,192 | 00 00 20 00  | 0000 0000 0000 0000 0010 0000 0000 0000
 *        16,384 | 00 00 40 00  | 0000 0000 0000 0000 0100 0000 0000 0000
 *        32,768 | 00 00 80 00  | 0000 0000 0000 0000 1000 0000 0000 0000
 *        65,536 | 00 01 00 00  | 0000 0000 0000 0001 0000 0000 0000 0000
 *       131,072 | 00 02 00 00  | 0000 0000 0000 0010 0000 0000 0000 0000
 *       262,144 | 00 04 00 00  | 0000 0000 0000 0100 0000 0000 0000 0000
 *       524,288 | 00 08 00 00  | 0000 0000 0000 1000 0000 0000 0000 0000
 *     1,048,576 | 00 10 00 00  | 0000 0000 0001 0000 0000 0000 0000 0000
 *     2,097,152 | 00 20 00 00  | 0000 0000 0010 0000 0000 0000 0000 0000
 *     4,194,304 | 00 40 00 00  | 0000 0000 0100 0000 0000 0000 0000 0000
 *     8,388,608 | 00 80 00 00  | 0000 0000 1000 0000 0000 0000 0000 0000
 *    16,777,216 | 01 00 00 00  | 0000 0001 0000 0000 0000 0000 0000 0000
 *    33,554,432 | 02 00 00 00  | 0000 0010 0000 0000 0000 0000 0000 0000
 *    67,108,864 | 04 00 00 00  | 0000 0100 0000 0000 0000 0000 0000 0000
 *   134,217,728 | 08 00 00 00  | 0000 1000 0000 0000 0000 0000 0000 0000
 *   268,435,456 | 10 00 00 00  | 0001 0000 0000 0000 0000 0000 0000 0000
 *   536,870,912 | 20 00 00 00  | 0010 0000 0000 0000 0000 0000 0000 0000
 * 1,073,741,824 | 40 00 00 00  | 0100 0000 0000 0000 0000 0000 0000 0000
 * 2,147,483,648 | 80 00 00 00  | 1000 0000 0000 0000 0000 0000 0000 0000
 */
function printChart() {
  for (const number of numbers) {
    const decimal = numberFormatter.format(number).padStart(13, ' ');
    const hex = decimalToHex(number);
    const binary = decimalToBinary(number);

    console.log(`${boldGreen}${decimal}${reset} | ${hex} | ${binary}`);
  }
}

/**
 * Deconstructs a number into its individual flags.
 *
 * @param number
 */
function deconstructOredNumber(number: number) {
  const decimal = numberFormatter.format(number).padStart(13, ' ');
  const hex = decimalToHex(number);
  const binary = decimalToBinary(number);

  console.log(`${boldGreen}${decimal}${reset} | ${hex} | ${binary}`);

  const deconstructed = new Set<number>();

  for (const flag of numbers) {
    if (number & flag) {
      deconstructed.add(flag);
    }
  }

  for (const flag of deconstructed) {
    const decimal = numberFormatter.format(flag).padStart(13, ' ');
    const hex = decimalToHex(flag);
    const binary = decimalToBinary(flag);

    console.log(`${yellow}${decimal}${reset} | ${hex} | ${binary}`);
  }

  const orSequence = Array.from(deconstructed)
    .map((flag) => '0x' + decimalToHex(flag).replaceAll(' ', ''))
    .join(' | ');

  console.log('\nSequence => ' + orSequence);
}

deconstructOredNumber(0x17cf0000);
